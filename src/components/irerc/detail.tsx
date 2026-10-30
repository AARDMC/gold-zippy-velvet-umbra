import { useState, type ReactNode } from "react";
import {
  CATEGORY_EXPERTISE,
  PIPE,
  ROLES,
  STATUS_LABEL,
  STATUS_TONE,
  isOverdue,
  myReviewPending,
  requiredDocsOk,
  reviewDue,
  stageIndex,
  type Protocol,
  type RoleKey,
} from "@/lib/irerc/model";
import { useIrerc } from "@/lib/irerc/store";
import { Btn, Card, Chip, PageHead, fieldClass } from "@/components/irerc/ui";

export function ProtocolDetail() {
  const id = useIrerc((s) => s.selectedId);
  const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id) ?? null);
  const go = useIrerc((s) => s.go);
  const returnView = useIrerc((s) => s.returnView);
  if (!protocol) {
    return (
      <div>
        <Btn onClick={() => go("protocols")}>Back</Btn>
        <p className="mt-6 text-muted">That protocol is not in the file.</p>
      </div>
    );
  }
  const idx = stageIndex(protocol.status);
  const pct = protocol.reviewers.length ? Math.round((protocol.reviews.length / protocol.reviewers.length) * 100) : 0;
  const due = reviewDue(protocol);

  return (
    <div className="rise">
      <button className="mb-3 text-sm font-semibold text-sky" onClick={() => go(returnView === "detail" ? "protocols" : returnView)}>
        ← Back
      </button>
      <PageHead
        title={protocol.title}
        lede={`${protocol.id} · ${protocol.focus}`}
        action={<Chip tone={STATUS_TONE[protocol.status]}>{STATUS_LABEL[protocol.status]}</Chip>}
      />
      <div className="mb-5 grid grid-cols-4 gap-2 md:grid-cols-8">
        {PIPE.map((s, i) => (
          <div key={s.key}>
            <div className={`mb-1 h-1.5 rounded-full ${i < idx ? "bg-em" : i === idx ? "bg-sky" : "bg-panel-2"}`} />
            <p className={`truncate text-xs font-semibold tracking-wide uppercase ${i === idx ? "text-sky" : i < idx ? "text-em" : "text-muted"}`}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-4">
          <Card className="p-4 md:p-5">
            <h2 className="text-lg font-semibold">Protocol</h2>
            <dl className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Meta k="Principal investigator" v={protocol.pi} />
              <Meta k="Institution" v={protocol.institution} />
              <Meta k="Site" v={protocol.site} />
              <Meta k="Study type" v={protocol.type} />
              <Meta k="Sponsor" v={protocol.sponsor} />
              <Meta k="Category" v={protocol.category} />
              <Meta k="Consent languages" v={protocol.consentLanguages} />
              <Meta k="Vulnerable participants" v={protocol.vulnerable} />
              <Meta k="Review type" v={protocol.reviewType || "Not classified"} />
            </dl>
            {protocol.summary ? <p className="mt-4 text-sm leading-relaxed text-muted">{protocol.summary}</p> : null}
            <p className="mt-3 text-xs text-muted">
              Suggested expertise: {CATEGORY_EXPERTISE[protocol.category] || "Public Health Expert"}. Review deadline is 7 working days from assignment{due ? ` (due ${due})` : ""}.
            </p>
          </Card>

          <Card className="p-4 md:p-5">
            <h2 className="text-lg font-semibold">Submission checklist</h2>
            <p className="text-sm text-muted">Secretariat verifies each required document. The system does not accept a file into review while one is missing.</p>
            <DocList protocol={protocol} />
          </Card>

          <Card className="p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Assessments</h2>
              <p className="text-sm tabular-nums text-muted">{protocol.reviews.length}/{protocol.reviewers.length || 0}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-panel-2">
              <div className="h-full rounded-full bg-sky" style={{ width: `${pct}%` }} />
            </div>
            <ul className="mt-4 space-y-3">
              {protocol.reviewers.map((name) => {
                const review = protocol.reviews.find((r) => r.reviewer === name);
                return (
                  <li key={name} className="rounded-xl border border-line bg-ink-2/50 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{name}</p>
                      {review ? (
                        <Chip tone={review.recommendation.includes("Not") ? "rose" : review.recommendation.includes("major") ? "amber" : "em"}>{review.recommendation}</Chip>
                      ) : (
                        <Chip tone={isOverdue(protocol, name) ? "rose" : "amber"}>{isOverdue(protocol, name) ? "Overdue" : "Pending"}</Chip>
                      )}
                      {review ? <span className="ml-auto text-xs text-muted">{review.date}</span> : null}
                    </div>
                    {review?.comments ? <p className="mt-2 text-sm text-muted">{review.comments}</p> : null}
                  </li>
                );
              })}
              {protocol.reviewers.length === 0 ? <li className="text-sm text-muted">No reviewers assigned yet.</li> : null}
            </ul>
          </Card>

          {protocol.decision ? (
            <Card className="p-4 md:p-5">
              <h2 className="text-lg font-semibold">Committee decision</h2>
              <div className="mt-3 rounded-xl border border-em/30 bg-em/10 p-3 text-sm">
                <p className="font-semibold text-em">{protocol.decision}</p>
                <p className="mt-1 text-fg">{protocol.decisionNote || "Recorded in the minutes."}</p>
                {protocol.votes ? (
                  <p className="mt-2 text-xs text-muted tabular-nums">
                    Votes {protocol.votes.for} for · {protocol.votes.against} against · {protocol.votes.abstain} abstained
                  </p>
                ) : null}
              </div>
              {protocol.letter ? <p className="mt-3 text-sm leading-relaxed text-muted">{protocol.letter}</p> : null}
              {protocol.continuingDue ? <p className="mt-2 text-sm">Continuing review due <span className="font-semibold tabular-nums">{protocol.continuingDue}</span></p> : null}
            </Card>
          ) : null}

          {protocol.amendment ? (
            <Card className="p-4 md:p-5">
              <h2 className="text-lg font-semibold">Amendment</h2>
              <p className="mt-2 text-sm">{protocol.amendment.summary}</p>
              <p className="mt-2 text-xs text-muted">{protocol.amendment.date} · {protocol.amendment.status}</p>
            </Card>
          ) : null}

          <Card className="p-4 md:p-5">
            <h2 className="text-lg font-semibold">Audit trail</h2>
            <ol className="mt-4 space-y-4 border-l border-line pl-4">
              {[...protocol.history].reverse().map((x, i) => (
                <li key={`${x.date}-${x.action}-${i}`} className="relative">
                  <span className="absolute -left-[1.2rem] top-1 size-2.5 rounded-full border-2 border-sky bg-ink" />
                  <p className="text-xs font-semibold text-muted">{x.date}</p>
                  <p className="text-sm font-semibold">{x.action}</p>
                  <p className="text-xs text-muted">{x.actor}{x.note ? ` — ${x.note}` : ""}</p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <Actions protocol={protocol} />
      </div>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{k}</dt>
      <dd className="mt-1 text-sm font-semibold">{v}</dd>
    </div>
  );
}

function DocList({ protocol }: { protocol: Protocol }) {
  const role = useIrerc((s) => s.role)!;
  const setDoc = useIrerc((s) => s.setDoc);
  const editable = (role === "secretariat" || role === "admin") && protocol.status === "screening";
  const tone = { verified: "em", uploaded: "sky", missing: "rose", correction: "amber" } as const;
  return (
    <ul className="mt-3 divide-y divide-line">
      {protocol.docs.map((d) => (
        <li key={d.code} className="flex flex-wrap items-center gap-2 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{d.name}{d.required ? "" : " (optional)"}</p>
          </div>
          <Chip tone={tone[d.state]}>{d.state}</Chip>
          {editable ? (
            <div className="flex gap-2">
              <Btn className="px-3" onClick={() => setDoc(protocol.id, d.code, "verified")}>Verify</Btn>
              <Btn className="px-3" kind="danger" onClick={() => setDoc(protocol.id, d.code, "correction")}>Correct</Btn>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function Actions({ protocol: p }: { protocol: Protocol }) {
  const role = useIrerc((s) => s.role)!;
  const acting = useIrerc((s) => s.actingReviewer);
  const startScreening = useIrerc((s) => s.startScreening);
  const passScreening = useIrerc((s) => s.passScreening);
  const returnForCorrection = useIrerc((s) => s.returnForCorrection);
  const resubmit = useIrerc((s) => s.resubmit);
  const placeOnAgenda = useIrerc((s) => s.placeOnAgenda);
  const openModal = useIrerc((s) => s.openModal);
  const decideAmendment = useIrerc((s) => s.decideAmendment);
  const archiveProtocol = useIrerc((s) => s.archiveProtocol);
  const [note, setNote] = useState("");
  const staff = role === "secretariat" || role === "admin";
  const own = p.pi === ROLES.investigator.name;
  const buttons: { key: string; node: ReactNode }[] = [];

  if (staff && p.status === "submitted")
    buttons.push({ key: "start", node: <Btn kind="primary" onClick={() => startScreening(p.id)}>Start administrative check</Btn> });
  if (staff && p.status === "screening") {
    buttons.push({ key: "pass", node: <Btn kind="primary" disabled={!requiredDocsOk(p)} onClick={() => passScreening(p.id)}>Mark submission complete</Btn> });
  }
  if ((staff || role === "chair") && (p.status === "complete" || p.status === "classified"))
    buttons.push({ key: "class", node: <Btn kind="primary" onClick={() => openModal({ type: "classify", id: p.id })}>{p.reviewType ? "Change review type" : "Classify review type"}</Btn> });
  if ((staff || role === "chair") && p.status === "classified" && p.reviewType !== "Exemption Review")
    buttons.push({ key: "assign", node: <Btn kind="primary" onClick={() => openModal({ type: "assign", id: p.id })}>Assign reviewers</Btn> });
  if (role === "reviewer" && myReviewPending(p, acting))
    buttons.push({ key: "assess", node: <Btn kind="primary" onClick={() => openModal({ type: "assess", id: p.id })}>Open assessment form</Btn> });
  if (staff && p.status === "reviews_complete")
    buttons.push({ key: "agenda", node: <Btn kind="primary" onClick={() => placeOnAgenda(p.id)}>Place on agenda</Btn> });
  if (canDecide(role, p))
    buttons.push({ key: "decide", node: <Btn kind="go" onClick={() => openModal({ type: "decide", id: p.id })}>Record committee decision</Btn> });
  if (staff && p.status === "decided")
    buttons.push({ key: "letter", node: <Btn kind="go" onClick={() => openModal({ type: "letter", id: p.id })}>Send action letter</Btn> });
  if (role === "investigator" && own && p.status === "correction")
    buttons.push({ key: "resub", node: <Btn kind="primary" onClick={() => resubmit(p.id)}>Resubmit corrected package</Btn> });
  if (role === "investigator" && own && (p.status === "active" || p.status === "reviewing" || p.status === "agenda"))
    buttons.push({ key: "sae", node: <Btn onClick={() => openModal({ type: "sae", id: p.id })}>Report a safety event</Btn> });
  if (role === "investigator" && own && p.status === "active") {
    buttons.push({ key: "amend", node: <Btn onClick={() => openModal({ type: "amend", id: p.id })}>Submit amendment</Btn> });
    buttons.push({ key: "cont", node: <Btn onClick={() => openModal({ type: "continuing", id: p.id })}>File continuing review</Btn> });
  }
  if (role === "chair" && p.amendment?.status === "Pending review") {
    buttons.push({ key: "am-y", node: <Btn kind="go" onClick={() => decideAmendment(p.id, true)}>Approve amendment</Btn> });
    buttons.push({ key: "am-n", node: <Btn kind="danger" onClick={() => decideAmendment(p.id, false)}>Do not approve amendment</Btn> });
  }
  if (staff && p.status === "active")
    buttons.push({ key: "arch", node: <Btn onClick={() => archiveProtocol(p.id)}>Archive after close-out</Btn> });

  return (
    <Card className="p-4 md:p-5 lg:sticky lg:top-20">
      <h2 className="text-lg font-semibold">Your actions</h2>
      <p className="text-sm text-muted">{ROLES[role].title}</p>
      <div className="mt-4 flex flex-col gap-2">
        {buttons.map((b) => <div key={b.key}>{b.node}</div>)}
        {buttons.length === 0 ? (
          <p className="rounded-xl border border-line bg-ink-2/40 p-3 text-sm text-muted">
            Nothing for {ROLES[role].title} at this stage. {p.status === "archived" ? "The file is archived." : "The next step belongs to another role."}
          </p>
        ) : null}
      </div>
      {staff && p.status === "screening" ? (
        <div className="mt-4">
          <label className="text-xs font-semibold tracking-wide text-muted uppercase">
            Return note
            <textarea className={fieldClass} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What the investigator must fix" />
          </label>
          <Btn className="mt-2 w-full" kind="danger" onClick={() => returnForCorrection(p.id, note)}>Return for correction</Btn>
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Decisions are taken by the committee or the chair where the SOP allows expedited or exemption review. Secretariat and the digital system cannot approve a protocol.
      </p>
    </Card>
  );
}

function canDecide(role: RoleKey, p: Protocol) {
  if (role !== "chair") return false;
  if (p.status === "agenda" || p.status === "reviews_complete") return true;
  if (p.reviewType === "Exemption Review" && (p.status === "classified" || p.status === "complete")) return true;
  if (p.reviewType === "Expedited Review" && ["classified", "assigned", "reviewing", "reviews_complete"].includes(p.status)) return true;
  return false;
}
