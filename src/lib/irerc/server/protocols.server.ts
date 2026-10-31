import { createHash } from "node:crypto";
import { getSql, withTransaction, type Sql } from "@/lib/db";
import {
  DOC_CODE_BY_FILE,
  DOC_DEFS,
  FOCUS_TO_CATEGORY,
  isSubmissionUpdateOpen,
  type DocumentVersion,
  type OfficialSubmission,
  type Protocol,
  type ScanResult,
} from "@/lib/irerc/model";
import { scanProtocolText } from "@/lib/irerc/scanner";
import { assessTitleSimilarity } from "@/lib/irerc/title-similarity";
import { DECLARATION_TEXT } from "@/lib/irerc/submission-template";
import { ForbiddenError, memberIdFor, requireRole, type Actor } from "./access.server";

/** Vercel functions reject request bodies over ~4.5 MB and base64 adds a third. */
export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const UPDATE_WINDOW_MS = 48 * 60 * 60 * 1000;
const ALLOWED_CODES = new Set<string>([...Object.values(DOC_CODE_BY_FILE), "DOC_FINAL_PROTOCOL"]);

const today = () => new Date().toISOString().slice(0, 10);
const other = (v: string, o: string) => (v === "Other:" ? o.trim() : v);

type Row = {
  id: string;
  status: string;
  review_type: string | null;
  decision: string | null;
  submitted_at: string;
  submission_update_until: string | null;
  submission_updated_at: string | null;
  initial_protocol_locked_at: string | null;
  pi_user_id: string;
  data: Protocol;
};

/** Columns are authoritative for workflow fields; `data` carries the rest. */
function toProtocol(r: Row): Protocol {
  return {
    ...r.data,
    id: r.id,
    status: r.status as Protocol["status"],
    reviewType: r.review_type as Protocol["reviewType"],
    decision: r.decision,
    submissionUpdateUntil: r.submission_update_until ? new Date(r.submission_update_until).toISOString() : null,
    submissionUpdatedAt: r.submission_updated_at ? new Date(r.submission_updated_at).toISOString() : null,
    initialProtocolLockedAt: r.initial_protocol_locked_at
      ? new Date(r.initial_protocol_locked_at).toISOString()
      : null,
  };
}

async function audit(sql: Sql, actor: Actor, protocolId: string | null, action: string, note = "") {
  await sql`insert into irerc_audit (protocol_id, actor_id, actor_label, role, action, note)
            values (${protocolId}, ${actor.userId}, ${actor.label}, ${actor.role}, ${action}, ${note})`;
}

async function notify(
  sql: Sql,
  n: { protocolId: string; role: string; type: string; priority: string; title: string; body: string; user?: string },
) {
  const id = `N-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  await sql`insert into irerc_notification (id, protocol_id, recipient_role, recipient_user, type, priority, title, body)
            values (${id}, ${n.protocolId}, ${n.role}, ${n.user ?? null}, ${n.type}, ${n.priority}, ${n.title}, ${n.body})`;
}

/** Row access rules: PI sees own; reviewer sees assigned; staff see all. Drafts are PI-only. */
async function loadForActor(sql: Sql, actor: Actor, id: string, lock = false): Promise<Row> {
  const rows = await sql.query<Row>(
    `select * from irerc_protocol where id = $1${lock ? " for update" : ""}`,
    [id],
  );
  const row = rows[0];
  if (!row) throw new ForbiddenError("Protocol not found.");
  if (row.status === "draft" && row.pi_user_id !== actor.userId) throw new ForbiddenError("Protocol not found.");
  if (actor.role === "investigator" && row.pi_user_id !== actor.userId) throw new ForbiddenError("Protocol not found.");
  if (actor.role === "reviewer") {
    const mid = await memberIdFor(actor.userId, sql);
    const assigned = mid
      ? await sql`select 1 from irerc_protocol_reviewer where protocol_id = ${id} and member_id = ${mid}`
      : [];
    if (assigned.length === 0) throw new ForbiddenError("Protocol not found.");
  }
  return row;
}

export async function listProtocols(actor: Actor): Promise<Protocol[]> {
  const sql = await getSql();
  let rows: Row[];
  if (actor.role === "investigator") {
    rows = await sql<Row>`select * from irerc_protocol
      where pi_user_id = ${actor.userId} and status <> 'draft' order by submitted_at desc`;
  } else if (actor.role === "reviewer") {
    const mid = await memberIdFor(actor.userId, sql);
    rows = mid
      ? await sql<Row>`select p.* from irerc_protocol p
          join irerc_protocol_reviewer r on r.protocol_id = p.id
          where r.member_id = ${mid} and p.status <> 'draft' order by p.submitted_at desc`
      : [];
  } else {
    rows = await sql<Row>`select * from irerc_protocol where status <> 'draft' order by submitted_at desc`;
  }
  return rows.map(toProtocol);
}

export async function createDraft(actor: Actor): Promise<{ protocolId: string }> {
  requireRole(actor, ["investigator"]);
  return withTransaction(async (sql) => {
    const year = new Date().getFullYear();
    const c = await sql<{ last: number }>`
      insert into irerc_protocol_counter (year, last) values (${year}, 1)
      on conflict (year) do update set last = irerc_protocol_counter.last + 1
      returning last`;
    const id = `AAPHREML-IRERC-${year}-${String(c[0]!.last).padStart(4, "0")}`;
    await sql`insert into irerc_protocol (id, pi_user_id, title, status, data)
              values (${id}, ${actor.userId}, '', 'draft', '{}'::jsonb)`;
    return { protocolId: id };
  });
}

export async function uploadDocument(
  actor: Actor,
  input: { protocolId: string; code: string; name: string; mime: string; base64: string; note?: string },
): Promise<DocumentVersion> {
  requireRole(actor, ["investigator"]);
  if (!ALLOWED_CODES.has(input.code)) throw new Error("Unknown document type.");
  const bytes = Buffer.from(input.base64, "base64");
  if (bytes.length === 0) throw new Error("The file is empty.");
  if (bytes.length > MAX_FILE_BYTES) {
    throw new Error(`Files are limited to ${MAX_FILE_BYTES / 1024 / 1024} MB for now.`);
  }
  const sha256 = createHash("sha256").update(bytes).digest("hex");

  return withTransaction(async (sql) => {
    const row = await loadForActor(sql, actor, input.protocolId, true);
    if (row.pi_user_id !== actor.userId) throw new ForbiddenError();
    const isDraft = row.status === "draft";
    if (!isDraft && input.code !== "DOC_FINAL_PROTOCOL") {
      if (!isSubmissionUpdateOpen(toProtocol(row))) {
        throw new ForbiddenError("The 48-hour submission update window has closed.");
      }
      if (row.initial_protocol_locked_at && input.code === "DOC_PROTOCOL") {
        throw new ForbiddenError("The initial protocol is locked. Use the revised/final protocol workflow.");
      }
    }
    const v = await sql<{ next: number }>`
      select coalesce(max(version), 0) + 1 as next from irerc_document
       where protocol_id = ${input.protocolId} and code = ${input.code}`;
    const version = Number(v[0]!.next);
    const note = input.note?.trim() || (isDraft ? "Initial submission" : "Replacement");
    await sql`insert into irerc_document
      (protocol_id, code, version, name, mime, size, sha256, content, uploaded_by, uploaded_by_label, note)
      values (${input.protocolId}, ${input.code}, ${version}, ${input.name}, ${input.mime || "application/octet-stream"},
              ${bytes.length}, ${sha256}, ${bytes}, ${actor.userId}, ${actor.label}, ${note})`;
    await audit(sql, actor, input.protocolId, "Document uploaded", `${input.code} v${version} · ${input.name} · sha256 ${sha256.slice(0, 12)}`);
    return {
      code: input.code,
      version,
      name: input.name,
      size: bytes.length,
      type: input.mime,
      uploadedAt: new Date().toISOString(),
      uploadedBy: actor.label,
      note,
    };
  });
}

export async function downloadDocument(
  actor: Actor,
  input: { protocolId: string; code: string; version?: number },
): Promise<{ name: string; mime: string; base64: string }> {
  const sql = await getSql();
  await loadForActor(sql, actor, input.protocolId);
  const rows = await sql.query<{ name: string; mime: string; content: Buffer }>(
    `select name, mime, content from irerc_document
      where protocol_id = $1 and code = $2
      ${input.version ? "and version = $3" : ""}
      order by version desc limit 1`,
    input.version ? [input.protocolId, input.code, input.version] : [input.protocolId, input.code],
  );
  const doc = rows[0];
  if (!doc) throw new Error("Document not found.");
  await audit(sql, actor, input.protocolId, "Document opened", `${input.code}${input.version ? ` v${input.version}` : ""}`);
  return { name: doc.name, mime: doc.mime, base64: Buffer.from(doc.content).toString("base64") };
}

/** Re-scan the stored proposal on the server — the browser's score is never trusted. */
async function scanStoredProposal(sql: Sql, protocolId: string): Promise<ScanResult> {
  const rows = await sql<{ name: string; content: Buffer }>`
    select name, content from irerc_document
     where protocol_id = ${protocolId} and code = 'DOC_PROTOCOL' order by version desc limit 1`;
  const doc = rows[0];
  if (!doc) throw new Error("Upload the complete proposal document first.");
  const buf = Buffer.from(doc.content);
  let text = "";
  if (/\.docx$/i.test(doc.name)) {
    const mammoth = (await import("mammoth")).default;
    text = (await mammoth.extractRawText({ buffer: buf })).value?.trim() ?? "";
  } else if (/\.(txt|md)$/i.test(doc.name)) {
    text = buf.toString("utf8").trim();
  } else {
    throw new Error("The complete proposal must be a .docx or .txt file so it can be scanned.");
  }
  if (text.length < 100) throw new Error("The proposal appears empty or unreadable.");
  return scanProtocolText(text, doc.name);
}

function derived(form: OfficialSubmission) {
  const focus = other(form.healthFocus, form.healthFocusOther);
  return {
    college: other(form.college, form.collegeOther),
    design: other(form.studyDesign, form.studyDesignOther),
    focus,
    funding: other(form.funding, form.fundingOther),
    target: other(form.targetGroup, form.targetGroupOther),
    category: FOCUS_TO_CATEGORY[focus] ?? "Public Health & Health Systems",
  };
}

function assertSubmissionFields(form: OfficialSubmission) {
  if (!form.studyTitle?.trim() || !form.piName?.trim() || !form.piEmail?.trim() || !form.college) {
    throw new Error("Complete the protocol, investigator and institution fields before submitting.");
  }
}

export async function submitProtocol(
  actor: Actor,
  input: { protocolId: string; form: OfficialSubmission },
): Promise<Protocol> {
  requireRole(actor, ["investigator"]);
  const form = input.form;
  assertSubmissionFields(form);
  if (!form.acknowledge || !form.declarationAccepted) {
    throw new Error("Confirm the data sharing terms and the PI declaration before submitting.");
  }

  return withTransaction(async (sql) => {
    const row = await loadForActor(sql, actor, input.protocolId, true);
    if (row.pi_user_id !== actor.userId || row.status !== "draft") {
      throw new ForbiddenError("This submission has already been sent.");
    }
    const have = await sql<{ code: string }>`
      select distinct code from irerc_document where protocol_id = ${input.protocolId}`;
    const present = new Set(have.map((d) => d.code));
    const missing = DOC_DEFS.filter((d) => d.required && !present.has(d.code)).map((d) => d.name);
    if (missing.length) throw new Error(`Missing required document(s): ${missing.join(", ")}.`);

    const scan = await scanStoredProposal(sql, input.protocolId);
    if (scan.completeness < 95) {
      throw new Error(`The complete proposal must pass the 28-section check at 95% or above (got ${scan.completeness}%).`);
    }

    const title = form.studyTitle.trim();
    const d = derived(form);
    const corpus = await sql<{ id: string; title: string }>`
      select id, title from irerc_protocol where status <> 'draft' and id <> ${input.protocolId}`;
    const similarity = assessTitleSimilarity(title, corpus);
    const now = new Date();
    const acceptedAt = now.toISOString();

    const versions = await sql<{ code: string; version: number; name: string; size: number; mime: string; note: string; uploaded_at: string }>`
      select code, version, name, size, mime, note, uploaded_at from irerc_document
       where protocol_id = ${input.protocolId} order by code, version`;
    const documentVersions: DocumentVersion[] = versions.map((v) => ({
      code: v.code,
      version: v.version,
      name: v.name,
      size: v.size,
      type: v.mime,
      uploadedAt: new Date(v.uploaded_at).toISOString(),
      uploadedBy: actor.label,
      note: v.note,
    }));
    const until = new Date(now.getTime() + UPDATE_WINDOW_MS).toISOString();
    const t = today();

    const protocol: Protocol = {
      id: input.protocolId,
      title,
      type: d.design,
      focus: d.focus,
      category: d.category,
      pi: form.piName.trim(),
      institution: d.college,
      sponsor: d.funding || "—",
      site: form.specificSite.trim() || "—",
      submitted: t,
      status: "submitted",
      reviewType: null,
      decision: null,
      decisionNote: "",
      votes: null,
      reviewers: [],
      reviews: [],
      docs: DOC_DEFS.map((doc) => ({ ...doc, state: "uploaded" as const })),
      history: [
        {
          date: t,
          at: acceptedAt,
          actor: actor.label,
          action: "Protocol submitted",
          note: `Proposal scanned at ${scan.completeness}% (${scan.fileName}); PI declaration accepted ${acceptedAt}; title similarity ${Math.round(similarity.score * 100)}% against ${similarity.corpusSize} existing title(s)`,
        },
      ],
      summary: form.generalObjective.trim(),
      consentLanguages: "—",
      vulnerable: d.target || "—",
      continuingDue: null,
      letter: null,
      amendment: null,
      assignedOn: null,
      submission: form,
      declaration: { accepted: true, acceptedAt, piName: form.piName.trim(), text: DECLARATION_TEXT },
      scan,
      revision: null,
      documentVersions,
      documentComments: [],
      titleSimilarity: similarity,
      initialProtocolLockedAt: null,
      submissionUpdateUntil: until,
      submissionUpdatedAt: null,
      finalProtocol: null,
    };

    await sql`update irerc_protocol set
        title = ${title}, status = 'submitted', submitted_at = ${acceptedAt},
        submission_update_until = ${until}, data = ${JSON.stringify(protocol)}::jsonb,
        row_version = row_version + 1, updated_at = now()
      where id = ${input.protocolId}`;
    await audit(sql, actor, input.protocolId, "Protocol submitted", protocol.history[0]!.note ?? "");
    await notify(sql, {
      protocolId: input.protocolId, role: "secretariat", type: "submission", priority: "high",
      title: "New protocol submitted", body: `${input.protocolId} — ${title}. Screening is required.`,
    });
    await notify(sql, {
      protocolId: input.protocolId, role: "investigator", user: actor.userId, type: "submission", priority: "normal",
      title: "Submission received", body: `${input.protocolId} has been received and is awaiting secretariat screening.`,
    });
    return protocol;
  });
}

/** PI edits within the 48-hour window. New files go through uploadDocument first. */
export async function updateSubmission(
  actor: Actor,
  input: { protocolId: string; form: OfficialSubmission; expectedVersion?: number },
): Promise<Protocol> {
  requireRole(actor, ["investigator"]);
  assertSubmissionFields(input.form);

  return withTransaction(async (sql) => {
    const row = await loadForActor(sql, actor, input.protocolId, true);
    if (row.pi_user_id !== actor.userId) throw new ForbiddenError();
    const p = toProtocol(row);
    if (!isSubmissionUpdateOpen(p)) {
      throw new ForbiddenError("The 48-hour submission update window has closed or the application has been forwarded.");
    }
    if (input.expectedVersion !== undefined) {
      const rv = await sql<{ row_version: number }>`select row_version from irerc_protocol where id = ${input.protocolId}`;
      if (Number(rv[0]!.row_version) !== input.expectedVersion) {
        throw new Error("This submission changed since you opened it. Reload and try again.");
      }
    }

    const scan = await scanStoredProposal(sql, input.protocolId);
    if (scan.completeness < 95) {
      throw new Error("The proposal must still pass the 28-section check at 95% or above.");
    }
    const d = derived(input.form);
    const title = input.form.studyTitle.trim();
    const corpus = await sql<{ id: string; title: string }>`
      select id, title from irerc_protocol where status <> 'draft' and id <> ${input.protocolId}`;
    const similarity = assessTitleSimilarity(title, corpus);
    const docs = await sql<{ code: string; version: number; name: string; size: number; mime: string; note: string; uploaded_at: string }>`
      select code, version, name, size, mime, note, uploaded_at from irerc_document
       where protocol_id = ${input.protocolId} order by code, version`;
    const documentVersions: DocumentVersion[] = docs.map((v) => ({
      code: v.code, version: v.version, name: v.name, size: v.size, type: v.mime,
      uploadedAt: new Date(v.uploaded_at).toISOString(), uploadedBy: actor.label, note: v.note,
    }));
    const underReview = p.status === "assigned" || p.status === "reviewing";
    const status = underReview ? "reviewing" : p.status === "correction" ? "submitted" : p.status;
    const updatedAt = new Date().toISOString();

    const next: Protocol = {
      ...p,
      title,
      type: d.design,
      focus: d.focus,
      category: d.category,
      institution: d.college,
      sponsor: d.funding || "—",
      site: input.form.specificSite.trim() || "—",
      summary: input.form.generalObjective.trim(),
      vulnerable: d.target || "—",
      submission: input.form,
      scan,
      documentVersions,
      titleSimilarity: similarity,
      docs: p.docs.map((doc) => ({ ...doc, state: "uploaded" as const })),
      status,
      reviews: underReview ? [] : p.reviews,
      assignedOn: underReview ? today() : p.assignedOn,
      submissionUpdatedAt: updatedAt,
      history: [
        ...p.history,
        { date: today(), at: updatedAt, actor: actor.label, action: "Submission updated", note: `submission ${p.id}` },
      ],
    };
    await sql`update irerc_protocol set
        title = ${title}, status = ${status}, submission_updated_at = ${updatedAt},
        data = ${JSON.stringify(next)}::jsonb, row_version = row_version + 1, updated_at = now()
      where id = ${input.protocolId}`;
    await audit(sql, actor, input.protocolId, "Submission updated", underReview ? "reviews reset" : "");
    await notify(sql, {
      protocolId: input.protocolId, role: "secretariat", type: "submission", priority: "normal",
      title: "Submission updated", body: `${p.id} was updated by the PI within the 48-hour window.`,
    });
    return next;
  });
}
