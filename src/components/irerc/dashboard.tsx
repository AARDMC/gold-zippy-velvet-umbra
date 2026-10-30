import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import {
  MONTHS,
  PIPE,
  ROLES,
  STATUS_LABEL,
  STATUS_TONE,
  TODAY,
  type Protocol,
  type RoleKey,
  myReviewPending,
  visibleTo,
} from "@/lib/irerc/model";
import { useIrerc } from "@/lib/irerc/store";
import { Card, Chip, PageHead } from "@/components/irerc/ui";

function useCount(n: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 700);
      setV(Math.round(n * (1 - (1 - k) ** 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return v;
}

export function workItems(role: RoleKey, acting: string, list: Protocol[]) {
  const items: { id: string; label: string; hint: string }[] = [];
  for (const p of list) {
    if (!visibleTo(role, p)) continue;
    if ((role === "secretariat" || role === "admin") && p.status === "submitted")
      items.push({ id: p.id, label: `Screen ${p.id}`, hint: p.title });
    else if ((role === "secretariat" || role === "admin") && p.status === "screening")
      items.push({ id: p.id, label: `Finish screening ${p.id}`, hint: p.title });
    else if ((role === "secretariat" || role === "admin") && p.status === "complete")
      items.push({ id: p.id, label: `Classify review type ${p.id}`, hint: p.title });
    else if ((role === "secretariat" || role === "chair" || role === "admin") && p.status === "classified")
      items.push({ id: p.id, label: `Assign reviewers ${p.id}`, hint: p.reviewType || p.title });
    else if ((role === "secretariat" || role === "admin") && p.status === "reviews_complete")
      items.push({ id: p.id, label: `Place on agenda ${p.id}`, hint: p.title });
    else if (role === "chair" && (p.status === "agenda" || p.status === "reviews_complete"))
      items.push({ id: p.id, label: `Record decision ${p.id}`, hint: p.title });
    else if (role === "chair" && (p.reviewType === "Expedited Review" || p.reviewType === "Exemption Review") && ["classified", "assigned", "reviewing"].includes(p.status))
      items.push({ id: p.id, label: `Expedited decision ${p.id}`, hint: p.title });
    else if ((role === "secretariat" || role === "admin") && p.status === "decided")
      items.push({ id: p.id, label: `Send action letter ${p.id}`, hint: p.decision || p.title });
    else if (role === "reviewer" && myReviewPending(p, acting))
      items.push({ id: p.id, label: `Assess ${p.id}`, hint: p.title });
    else if (role === "investigator" && p.pi === ROLES.investigator.name && p.status === "correction")
      items.push({ id: p.id, label: `Resubmit ${p.id}`, hint: p.title });
    else if (role === "chair" && p.amendment?.status === "Pending review")
      items.push({ id: p.id, label: `Amendment ${p.id}`, hint: p.amendment.summary });
    else if ((role === "investigator" || role === "secretariat") && p.status === "active" && p.continuingDue && p.continuingDue <= "2026-11-30" && (role !== "investigator" || p.pi === ROLES.investigator.name))
      items.push({ id: p.id, label: `Continuing review ${p.id}`, hint: `Due ${p.continuingDue}` });
  }
  return items.slice(0, 6);
}

export function Dashboard() {
  const role = useIrerc((s) => s.role)!;
  const acting = useIrerc((s) => s.actingReviewer);
  const protocols = useIrerc((s) => s.protocols);
  const safety = useIrerc((s) => s.safety);
  const openProtocol = useIrerc((s) => s.openProtocol);
  const list = protocols.filter((p) => visibleTo(role, p));
  const queue = workItems(role, acting, protocols);
  const approved = list.filter((p) => p.decision?.startsWith("Approved")).length;
  const openSafety = safety.filter((s) => s.status === "Pending review" && list.some((p) => p.id === s.protocolId)).length;
  const counts = PIPE.map((stage) => ({
    ...stage,
    n: list.filter((p) => stage.match.includes(p.status)).length,
  }));
  const activity = list
    .flatMap((p) => p.history.map((x) => ({ ...x, pid: p.id })))
    .sort((a, b) => b.date.localeCompare(a.date) || b.action.localeCompare(a.action))
    .slice(0, 6);
  const maxM = Math.max(...MONTHS.map((m) => m.n));

  return (
    <div className="rise">
      <PageHead
        title="Dashboard"
        lede={`${ROLES[role].name} · ${ROLES[role].title}. Committee date ${TODAY}. The committee decides; the secretariat administers; the system only records.`}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi tone="sky" label="Protocols in view" value={list.length} hint={role === "investigator" ? "Submitted by you" : "Committee file"} />
        <Kpi tone="amber" label="Awaiting you" value={queue.length} hint="From your SOP duties" />
        <Kpi tone="em" label="Approved" value={approved} hint="Including approval with conditions" />
        <Kpi tone="rose" label="Open safety reports" value={openSafety} hint="AE, SAE, and unanticipated events" />
      </div>

      <Card className="mt-4 p-4 md:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">Workflow</h2>
          <p className="text-xs text-muted">Screening → classification → review → agenda → decision → letter</p>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-8">
          {counts.map((s) => (
            <div key={s.key} className="text-center">
              <div className={`mx-auto grid size-12 place-items-center rounded-2xl border text-lg font-bold tabular-nums ${s.n ? "pulse-ring border-sky/50 bg-sky/15 text-fg" : "border-line bg-ink-2 text-muted"}`}>
                {s.n}
              </div>
              <p className="mt-2 truncate text-xs font-semibold tracking-wide text-muted uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
        <Card className="p-4 md:p-5">
          <h2 className="text-lg font-semibold">Your next actions</h2>
          <p className="text-sm text-muted">Only the steps this role is allowed to take.</p>
          <div className="mt-3 divide-y divide-line">
            {queue.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">Nothing is waiting on you.</p>
            ) : (
              queue.map((q) => (
                <div key={q.label} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{q.label}</p>
                    <p className="truncate text-xs text-muted">{q.hint}</p>
                  </div>
                  <button className="min-h-11 shrink-0 rounded-xl bg-sky px-3 text-sm font-semibold text-ink" onClick={() => openProtocol(q.id)}>
                    Open
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-4 md:p-5">
          <h2 className="text-lg font-semibold">Submissions by month</h2>
          <div className="mt-3 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHS.map((m) => ({ ...m, width: (m.n / maxM) * 100 }))}>
                <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "var(--color-panel-2)" }}
                  contentStyle={{ background: "var(--color-panel)", border: "1px solid var(--color-line)", borderRadius: 12, color: "var(--color-fg)" }}
                />
                <Bar dataKey="n" fill="var(--color-sky)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h2 className="mt-2 text-lg font-semibold">Recent activity</h2>
          <ol className="mt-3 space-y-3 border-l border-line pl-4">
            {activity.map((a, i) => (
              <li key={`${a.pid}-${a.date}-${i}`} className="relative">
                <span className="absolute -left-[1.2rem] top-1 size-2.5 rounded-full border-2 border-sky bg-ink" />
                <p className="text-xs font-semibold text-muted">{a.date} · {a.pid}</p>
                <p className="text-sm">{a.action}</p>
                <p className="text-xs text-muted">{a.actor}{a.note ? ` — ${a.note}` : ""}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
      <p className="mt-4 text-xs text-muted">
        Status key: {Object.entries(STATUS_LABEL).slice(0, 4).map(([k, label]) => (
          <span key={k} className="mr-2 inline-flex items-center gap-1">
            <Chip tone={STATUS_TONE[k as Protocol["status"]]}>{label}</Chip>
          </span>
        ))}
      </p>
    </div>
  );
}

function Kpi({ label, value, hint, tone }: { label: string; value: number; hint: string; tone: "sky" | "amber" | "em" | "rose" }) {
  const n = useCount(value);
  const bar = { sky: "bg-sky", amber: "bg-amber", em: "bg-em", rose: "bg-rose" }[tone];
  return (
    <Card className="relative overflow-hidden p-4">
      <span className={`absolute inset-x-0 top-0 h-1 ${bar}`} />
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-2 text-4xl font-bold tabular-nums">{n}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </Card>
  );
}
