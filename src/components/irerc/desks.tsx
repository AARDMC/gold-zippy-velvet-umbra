import type { ReactNode } from "react";
import {
  MEMBERS,
  ROLES,
  STATUS_LABEL,
  STATUS_TONE,
  TODAY,
  isOverdue,
  myReviewPending,
  reviewDue,
  visibleTo,
} from "@/lib/irerc/model";
import { useIrerc } from "@/lib/irerc/store";
import { Btn, Card, Chip, Empty, PageHead } from "@/components/irerc/ui";

export function ReviewsDesk() {
  const acting = useIrerc((s) => s.actingReviewer);
  const setActing = useIrerc((s) => s.setActing);
  const protocols = useIrerc((s) => s.protocols);
  const openProtocol = useIrerc((s) => s.openProtocol);
  const openModal = useIrerc((s) => s.openModal);
  const mine = protocols.filter((p) => p.reviewers.includes(acting));
  const pending = mine.filter((p) => myReviewPending(p, acting));
  const done = mine.filter((p) => p.reviews.some((r) => r.reviewer === acting));
  const names = ["Dr. Yonas Haile", "Dr. Meseret Assefa", "Dr. Solomon Girma", "Dr. Rahel Tesfaye", "Dr. Getachew Alemu", "Ato Mulugeta Bekele", "W/ro Hirut Desta"];

  return (
    <div className="rise">
      <PageHead
        title="My reviews"
        lede="Twenty ethical criteria, a recommendation, and a conflict declaration. The reviewer does not issue the committee decision."
        action={
          <label className="text-xs font-semibold tracking-wide text-muted uppercase">
            Acting reviewer
            <select className="mt-1 block min-h-11 rounded-xl border border-line bg-ink-2 px-3 text-sm font-semibold text-fg normal-case" value={acting} onChange={(e) => setActing(e.target.value)}>
              {names.map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
        }
      />
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-semibold">Pending</h2>
          <Chip tone="amber">{pending.length}</Chip>
        </div>
        <DeskRows
          rows={pending.map((p) => ({
            id: p.id,
            title: p.title,
            sub: `${p.id} · due ${reviewDue(p) || "—"}`,
            extra: isOverdue(p, acting) ? <Chip tone="rose">Overdue</Chip> : <Chip tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Chip>,
            action: <Btn kind="primary" onClick={() => openModal({ type: "assess", id: p.id })}>Assess</Btn>,
          }))}
          empty="No assessment is waiting for this reviewer."
        />
      </Card>
      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-semibold">Completed</h2>
          <Chip tone="em">{done.length}</Chip>
        </div>
        <ul className="divide-y divide-line">
          {done.map((p) => {
            const r = p.reviews.find((x) => x.reviewer === acting)!;
            return (
              <li key={p.id}>
                <button className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left hover:bg-sky/5" onClick={() => openProtocol(p.id)}>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{p.title}</span>
                    <span className="block text-xs text-muted">{p.id} · {r.date}</span>
                  </span>
                  <Chip tone={r.recommendation.includes("Not") ? "rose" : r.recommendation.includes("major") ? "amber" : "em"}>{r.recommendation}</Chip>
                </button>
              </li>
            );
          })}
          {done.length === 0 ? <Empty title="None yet" text="Completed assessments appear here." /> : null}
        </ul>
      </Card>
    </div>
  );
}

export function CommitteeDesk() {
  const role = useIrerc((s) => s.role)!;
  const protocols = useIrerc((s) => s.protocols);
  const openProtocol = useIrerc((s) => s.openProtocol);
  const openModal = useIrerc((s) => s.openModal);
  const agenda = protocols.filter((p) => p.status === "agenda" || p.status === "reviews_complete");
  const decided = protocols.filter((p) => p.status === "decided");

  return (
    <div className="rise">
      <PageHead title="Committee" lede="Meeting 10/2026 · Addis Ababa Health Bureau, Conference Room B · 30 October 2026 · 09:00." />
      <Card className="mb-4 border-sky/30 bg-sky/10 p-4 text-sm">
        Quorum is half the roster plus the people actually in the room, and it must include one lay member and one scientist. Conflicted members leave before the vote. The chair records the result; the secretariat writes the letter.
      </Card>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-semibold">Agenda</h2>
          <Chip tone="amber">{agenda.length}</Chip>
        </div>
        <DeskRows
          rows={agenda.map((p) => ({
            id: p.id,
            title: p.title,
            sub: `${p.id} · ${p.reviewers.join(", ") || "No reviewers"}`,
            extra: <Chip tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Chip>,
            action: role === "chair"
              ? <Btn kind="go" onClick={() => openModal({ type: "decide", id: p.id })}>Record decision</Btn>
              : <Btn onClick={() => openProtocol(p.id)}>Open</Btn>,
          }))}
          empty="The agenda is clear."
        />
      </Card>
      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-line px-4 py-3"><h2 className="font-semibold">Decisions waiting for a letter</h2></div>
        <DeskRows
          rows={decided.map((p) => ({
            id: p.id,
            title: p.id,
            sub: p.decision || "",
            extra: null,
            action: role === "chair" ? <Btn onClick={() => openProtocol(p.id)}>View</Btn> : <Btn kind="go" onClick={() => openModal({ type: "letter", id: p.id })}>Send letter</Btn>,
          }))}
          empty="No decision is waiting to be communicated."
        />
      </Card>
    </div>
  );
}

export function SafetyDesk() {
  const role = useIrerc((s) => s.role)!;
  const protocols = useIrerc((s) => s.protocols);
  const safety = useIrerc((s) => s.safety);
  const openModal = useIrerc((s) => s.openModal);
  const visibleIds = new Set(protocols.filter((p) => visibleTo(role, p)).map((p) => p.id));
  const rows = safety.filter((s) => visibleIds.has(s.protocolId));
  const pending = rows.filter((s) => s.status === "Pending review").length;
  const canReview = role === "chair" || role === "secretariat" || role === "reviewer";
  const ownActive = protocols.filter((p) => p.pi === ROLES.investigator.name && ["active", "reviewing", "agenda", "decided"].includes(p.status));

  return (
    <div className="rise">
      <PageHead
        title="Safety reports"
        lede="Serious, unexpected, and related events come back to the committee. Filing a report does not itself stop a study."
        action={role === "investigator" && ownActive[0] ? <Btn kind="primary" onClick={() => openModal({ type: "sae", id: ownActive[0].id })}>Report an event</Btn> : null}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Mini label="Pending" n={pending} />
        <Mini label="In this view" n={rows.length} />
        <Mini label="Reviewed" n={rows.length - pending} />
      </div>
      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {rows.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-sky">{s.id}</p>
                <p className="font-semibold">{s.event}</p>
                <p className="text-xs text-muted">{s.date} · {s.protocolId} · {s.relatedness} · {s.seriousness}</p>
                {s.note ? <p className="mt-1 text-sm text-muted">{s.note}</p> : null}
              </div>
              <Chip tone={s.status.startsWith("Pending") ? "amber" : "em"}>{s.status}</Chip>
              {canReview && s.status === "Pending review" ? <Btn kind="primary" onClick={() => openModal({ type: "safety", id: s.id })}>Review</Btn> : null}
            </li>
          ))}
          {rows.length === 0 ? <Empty title="No reports" text="Safety reports linked to your protocols appear here." /> : null}
        </ul>
      </Card>
    </div>
  );
}

export function MonitorDesk() {
  const role = useIrerc((s) => s.role)!;
  const protocols = useIrerc((s) => s.protocols);
  const openProtocol = useIrerc((s) => s.openProtocol);
  const list = protocols.filter((p) => visibleTo(role, p) && (p.status === "active" || p.amendment || p.continuingDue));
  return (
    <div className="rise">
      <PageHead title="After clearance" lede="Amendments, continuing review, and close-out. An approved study is not a finished file." />
      <div className="grid gap-3">
        {list.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-sky">{p.id}</p>
                <h2 className="mt-1 text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-muted">{p.pi}</p>
              </div>
              <Btn onClick={() => openProtocol(p.id)}>Open file</Btn>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Chip>
              {p.continuingDue ? <Chip tone={p.continuingDue <= "2026-11-30" ? "amber" : "muted"}>Continuing review {p.continuingDue}</Chip> : null}
              {p.amendment ? <Chip tone={p.amendment.status === "Approved" ? "em" : p.amendment.status === "Pending review" ? "amber" : "rose"}>{p.amendment.status}</Chip> : null}
            </div>
          </Card>
        ))}
        {list.length === 0 ? <Card><Empty title="No active clearances" text="Approved studies that are still running show up here." /></Card> : null}
      </div>
    </div>
  );
}

export function ArchiveDesk() {
  const protocols = useIrerc((s) => s.protocols);
  const openProtocol = useIrerc((s) => s.openProtocol);
  const closed = protocols.filter((p) => p.status === "archived");
  return (
    <div className="rise">
      <PageHead title="Archive" lede="Active files move here after close-out. Retrieval stays with the secretariat." />
      <Card className="mb-4 border-amber/30 bg-amber/10 p-4 text-sm text-amber">
        Retention is not settled in the source package: indefinite storage and a minimum period after completion both appear. One schedule has to be formally approved before this workspace is used for real records.
      </Card>
      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {closed.map((p) => (
            <li key={p.id}>
              <button className="w-full px-4 py-3 text-left hover:bg-sky/5" onClick={() => openProtocol(p.id)}>
                <span className="font-mono text-xs text-sky">{p.id}</span>
                <span className="mt-1 block font-semibold">{p.title}</span>
                <span className="mt-1 block text-xs text-muted">{p.decision} · last event {p.history[p.history.length - 1]?.date}</span>
              </button>
            </li>
          ))}
          {closed.length === 0 ? <Empty title="Archive is empty" text="Closed studies will be listed here." /> : null}
        </ul>
      </Card>
    </div>
  );
}

export function SystemDesk() {
  const protocols = useIrerc((s) => s.protocols);
  const events = protocols.flatMap((p) => p.history.map((x) => ({ ...x, pid: p.id }))).sort((a, b) => b.date.localeCompare(a.date) || b.action.localeCompare(a.action));
  const matrix: [string, string, string, string, string][] = [
    ["Submit protocol", "Yes", "—", "—", "—"],
    ["Screen completeness", "—", "Yes", "—", "—"],
    ["Classify review type", "—", "Yes", "—", "Yes"],
    ["Assign reviewers", "—", "Yes", "—", "Yes"],
    ["Submit assessment", "—", "—", "Yes", "—"],
    ["Record decision", "—", "—", "—", "Yes"],
    ["Send action letter", "—", "Yes", "—", "—"],
    ["Archive", "—", "Yes", "—", "—"],
  ];
  return (
    <div className="rise">
      <PageHead title="System and audit" lede="The digital system records and enforces access. It has no authority to approve, defer, or reject a protocol." />
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <h2 className="border-b border-line px-4 py-3 font-semibold">Who may do what</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs tracking-wide text-muted uppercase">
                  {["Function", "PI", "Secretariat", "Reviewer", "Chair"].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row[0]} className="border-t border-line">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-3 py-2 ${cell === "Yes" ? "font-semibold text-em" : i ? "text-muted" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Document control</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-xs text-muted uppercase">Numbering</dt><dd className="font-mono">AAPHREML-IRERC-YYYY-NNNN</dd></div>
            <div><dt className="text-xs text-muted uppercase">Review clock</dt><dd>7 working days</dd></div>
            <div><dt className="text-xs text-muted uppercase">Assessment</dt><dd>20 criteria</dd></div>
            <div><dt className="text-xs text-muted uppercase">Quorum floor</dt><dd>4 votes in this demo</dd></div>
          </dl>
          <p className="mt-4 text-sm text-muted">
            Committee date in this workspace is {TODAY}. Records are fictitious and stay in this browser. They are not written to the institutional spreadsheet or Drive folder.
          </p>
        </Card>
      </div>
      <Card className="mt-4 overflow-hidden">
        <h2 className="border-b border-line px-4 py-3 font-semibold">Audit trail</h2>
        <ul className="max-h-[28rem] divide-y divide-line overflow-y-auto">
          {events.map((e, i) => (
            <li key={`${e.pid}-${i}`} className="grid gap-1 px-4 py-3 text-sm md:grid-cols-[7rem_1fr]">
              <span className="text-xs text-muted tabular-nums">{e.date}</span>
              <span><span className="font-mono text-xs text-sky">{e.pid}</span> · {e.actor} — {e.action}{e.note ? <span className="text-muted"> — {e.note}</span> : null}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function RosterDesk() {
  const duties: [string, string][] = [
    ["Investigator", "Submits a complete package, conducts the study as approved, requests amendments before changing the protocol, and reports safety, deviations, progress, and close-out on time."],
    ["Secretariat", "Receives, screens, numbers, assigns, builds the agenda, issues action letters, and keeps the archive. No authority to approve a study."],
    ["Reviewer", "Reviews only assigned protocols, completes the assessment, declares conflicts, and presents at the meeting."],
    ["Chairperson", "Maintains quorum, calls the vote, signs the decision, and may approve items the SOP allows by expedited or exemption review."],
    ["System", "Access control, version history, and the audit trail. Support only — never a voter."],
  ];
  return (
    <div className="rise">
      <PageHead title="Roles and roster" lede="Duties follow the committee’s SOP. The seat, not the software, carries the authority." />
      <div className="grid gap-3 md:grid-cols-2">
        {duties.map(([title, text]) => (
          <Card key={title} className="p-4">
            <h2 className="text-lg font-semibold text-sky">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-4 overflow-hidden">
        <h2 className="border-b border-line px-4 py-3 font-semibold">Committee roster</h2>
        <ul className="divide-y divide-line">
          {MEMBERS.map((m) => (
            <li key={m.name} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="grid size-10 place-items-center rounded-full bg-panel-2 text-xs font-bold">{initials(m.name)}</div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-muted">{m.institution}</p>
              </div>
              <Chip tone={m.lay ? "amber" : "sky"}>{m.category}</Chip>
              <span className="text-xs text-muted">{m.seat}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function initials(name: string) {
  const parts = name.replace(/^(Dr\.|Prof\.|Ato|W\/ro)\s+/i, "").split(" ");
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
}

function Mini({ label, n }: { label: string; n: number }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{n}</p>
    </Card>
  );
}

function DeskRows({
  rows,
  empty,
}: {
  rows: { id: string; title: string; sub: string; extra: ReactNode; action: ReactNode }[];
  empty: string;
}) {
  if (!rows.length) return <Empty title="Clear" text={empty} />;
  return (
    <ul className="divide-y divide-line">
      {rows.map((r) => (
        <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{r.title}</p>
            <p className="text-xs text-muted">{r.sub}</p>
          </div>
          {r.extra}
          {r.action}
        </li>
      ))}
    </ul>
  );
}
