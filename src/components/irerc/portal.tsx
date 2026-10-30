import { useEffect, useState } from "react";
import {
  Activity,
  Archive,
  ClipboardCheck,
  Files,
  LayoutDashboard,
  LogOut,
  Menu,
  PenLine,
  RotateCcw,
  Scale,
  Search,
  Settings,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import {
  NAV,
  ROLES,
  type RoleKey,
  type ViewKey,
  myReviewPending,
  visibleTo,
} from "@/lib/irerc/model";
import { useIrerc } from "@/lib/irerc/store";
import { Dashboard, workItems } from "@/components/irerc/dashboard";
import { ProtocolList } from "@/components/irerc/protocols";
import { ProtocolDetail } from "@/components/irerc/detail";
import { ArchiveDesk, CommitteeDesk, MonitorDesk, ReviewsDesk, RosterDesk, SafetyDesk, SystemDesk } from "@/components/irerc/desks";
import { ModalHost } from "@/components/irerc/modals";

const ICONS: Record<ViewKey, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  protocols: Files,
  detail: Files,
  reviews: PenLine,
  screening: ClipboardCheck,
  committee: Scale,
  safety: ShieldAlert,
  monitor: Activity,
  archive: Archive,
  system: Settings,
  roster: Users,
};

const ROLE_ICON: Record<RoleKey, typeof LayoutDashboard> = {
  investigator: ClipboardCheck,
  secretariat: Files,
  reviewer: PenLine,
  chair: Scale,
  admin: Settings,
};

export function Portal() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const done = () => setReady(true);
    const unsub = useIrerc.persist.onFinishHydration(done);
    if (useIrerc.persist.hasHydrated()) done();
    return unsub;
  }, []);
  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink text-fg">
        <p className="font-display text-2xl">AAPHREML-IRERC</p>
      </div>
    );
  }
  return <Gate />;
}

function Gate() {
  const role = useIrerc((s) => s.role);
  if (!role) return <RoleGate />;
  return <Shell />;
}

function RoleGate() {
  const login = useIrerc((s) => s.login);
  const order: RoleKey[] = ["investigator", "secretariat", "reviewer", "chair", "admin"];
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-fg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(60,180,232,0.16),transparent_55%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2">
        <div>
          <img src="/seal.png" alt="Addis Ababa City Administration Health Bureau seal" className="mb-5 size-20 rounded-full bg-fg/90 object-contain p-1" />
          <p className="text-xs font-semibold tracking-widest text-sky uppercase">Addis Ababa City Administration Health Bureau</p>
          <h1 className="mt-3 max-w-xl text-4xl leading-tight font-semibold md:text-5xl">AAPHREML-IRERC ethics review</h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Screen a submission, assign reviewers, complete the 20-point assessment, record the committee decision, and issue the action letter. Each role only sees the duties the SOP gives it.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>Secretariat checks the file. It does not approve the study.</li>
            <li>Reviewers assess. The chair records the vote.</li>
            <li>Clearance then needs amendments, safety reports, and continuing review.</li>
          </ul>
          <p className="mt-8 max-w-lg text-xs leading-relaxed text-muted">
            Demonstration records only. Names and protocols on this screen are fictitious and are not an ethics determination, not the live committee file, and not evidence of approval.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-panel/80 p-5 shadow-card md:p-6">
          <h2 className="text-2xl font-semibold">Choose a role</h2>
          <p className="mt-1 text-sm text-muted">Switch later to walk the same protocol through the next duty.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {order.map((key) => {
              const role = ROLES[key];
              const Icon = ROLE_ICON[key];
              return (
                <button key={key} className="rounded-2xl border border-line bg-ink-2/50 p-4 text-left transition hover:-translate-y-0.5 hover:border-sky/50" onClick={() => login(key)}>
                  <span className="grid size-10 place-items-center rounded-xl bg-panel-2 text-sky"><Icon className="size-5" /></span>
                  <span className="mt-3 block font-semibold">{role.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{role.blurb}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Shell() {
  const role = useIrerc((s) => s.role)!;
  const view = useIrerc((s) => s.view);
  const go = useIrerc((s) => s.go);
  const logout = useIrerc((s) => s.logout);
  const resetDemo = useIrerc((s) => s.resetDemo);
  const query = useIrerc((s) => s.query);
  const setQuery = useIrerc((s) => s.setQuery);
  const navOpen = useIrerc((s) => s.navOpen);
  const setNav = useIrerc((s) => s.setNav);
  const protocols = useIrerc((s) => s.protocols);
  const safety = useIrerc((s) => s.safety);
  const acting = useIrerc((s) => s.actingReviewer);
  const toasts = useIrerc((s) => s.toasts);
  const celebrate = useIrerc((s) => s.celebrate);
  const closeModal = useIrerc((s) => s.closeModal);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const badges = badgeMap(role, acting, protocols, safety);
  const items = NAV.filter((n) => n.roles.includes(role));

  return (
    <div className="min-h-screen bg-ink text-fg">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-ink/85 px-3 backdrop-blur md:px-5">
        <button className="grid size-11 place-items-center rounded-xl border border-line md:hidden" onClick={() => setNav(true)} aria-label="Open menu">
          <Menu className="size-5" />
        </button>
        <img src="/seal.png" alt="" className="size-9 rounded-full bg-fg/90 object-contain p-0.5" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">AAPHREML-IRERC</p>
          <p className="hidden text-xs tracking-widest text-muted uppercase sm:block">Ethics review</p>
        </div>
        <label className="relative ml-auto hidden min-w-0 flex-1 md:block md:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (view !== "protocols" && view !== "detail") go("protocols"); }}
            placeholder="Search protocol, investigator, site"
            className="min-h-11 w-full rounded-xl border border-line bg-ink-2 pr-3 pl-9 text-sm outline-none focus:border-sky"
          />
        </label>
        <div className="ml-auto text-right md:ml-0">
          <p className="text-sm font-semibold">{ROLES[role].name}</p>
          <p className="text-xs tracking-wide text-muted uppercase">{ROLES[role].title}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-full bg-sky text-xs font-bold text-ink">{ROLES[role].initials}</div>
        <button className="hidden min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm md:inline-flex" onClick={() => { if (window.confirm("Restore the original demonstration records?")) resetDemo(); }}>
          <RotateCcw className="size-4" /> Reset
        </button>
        <button className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm" onClick={logout}>
          <LogOut className="size-4" /> <span className="hidden sm:inline">Switch role</span>
        </button>
      </header>
      <div className="border-b border-line px-3 py-2 md:hidden">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (view !== "protocols") go("protocols"); }}
            placeholder="Search"
            className="min-h-11 w-full rounded-xl border border-line bg-ink-2 pr-3 pl-9 text-sm outline-none focus:border-sky"
          />
        </label>
      </div>
      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-line p-3 md:block">
          <NavItems items={items} view={view} badges={badges} onGo={go} />
        </aside>
        {navOpen ? (
          <div className="fixed inset-0 z-40 md:hidden">
            <button className="absolute inset-0 bg-ink/70" aria-label="Close menu" onClick={() => setNav(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-line bg-ink-2 p-3">
              <div className="mb-2 flex justify-end">
                <button className="grid size-11 place-items-center" onClick={() => setNav(false)} aria-label="Close"><X /></button>
              </div>
              <NavItems items={items} view={view} badges={badges} onGo={go} />
              <button className="mt-4 flex min-h-11 w-full items-center gap-2 rounded-xl border border-line px-3 text-sm" onClick={() => { if (window.confirm("Restore the original demonstration records?")) resetDemo(); }}>
                <RotateCcw className="size-4" /> Reset demonstration
              </button>
            </aside>
          </div>
        ) : null}
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">
          {view === "dashboard" ? <Dashboard /> : null}
          {view === "protocols" ? <ProtocolList /> : null}
          {view === "screening" ? <ProtocolList preset={["submitted", "screening", "correction", "complete"]} /> : null}
          {view === "detail" ? <ProtocolDetail /> : null}
          {view === "reviews" ? <ReviewsDesk /> : null}
          {view === "committee" ? <CommitteeDesk /> : null}
          {view === "safety" ? <SafetyDesk /> : null}
          {view === "monitor" ? <MonitorDesk /> : null}
          {view === "archive" ? <ArchiveDesk /> : null}
          {view === "system" ? <SystemDesk /> : null}
          {view === "roster" ? <RosterDesk /> : null}
        </main>
      </div>
      <ModalHost />
      <Confetti n={celebrate} />
      <div className="pointer-events-none fixed right-3 bottom-3 z-50 flex w-[min(100%-1.5rem,22rem)] flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm font-semibold shadow-card ${t.kind === "warn" ? "border-amber/40 bg-amber text-ink" : "border-em/40 bg-em text-ink"}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

function NavItems({
  items,
  view,
  badges,
  onGo,
}: {
  items: typeof NAV;
  view: ViewKey;
  badges: Partial<Record<ViewKey, number>>;
  onGo: (v: ViewKey) => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = ICONS[item.key];
        const active = view === item.key || (view === "detail" && item.key === "protocols");
        const count = badges[item.key];
        return (
          <button
            key={item.key}
            onClick={() => onGo(item.key)}
            className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold ${active ? "bg-sky/15 text-fg ring-1 ring-sky/40" : "text-muted hover:bg-panel hover:text-fg"}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {count ? <span className="rounded-full bg-amber px-2 py-0.5 text-xs font-bold text-ink tabular-nums">{count}</span> : null}
          </button>
        );
      })}
    </nav>
  );
}

function badgeMap(role: RoleKey, acting: string, protocols: ReturnType<typeof useIrerc.getState>["protocols"], safety: ReturnType<typeof useIrerc.getState>["safety"]) {
  const list = protocols.filter((p) => visibleTo(role, p));
  const queue = workItems(role, acting, protocols).length;
  const pendingSafety = safety.filter((s) => s.status === "Pending review" && list.some((p) => p.id === s.protocolId)).length;
  const map: Partial<Record<ViewKey, number>> = {};
  if (queue) map.dashboard = queue;
  if (role === "secretariat" || role === "admin") {
    const n = list.filter((p) => ["submitted", "screening", "correction", "complete"].includes(p.status)).length;
    if (n) map.screening = n;
  }
  if (role === "reviewer") {
    const n = list.filter((p) => myReviewPending(p, acting)).length;
    if (n) map.reviews = n;
  }
  if (role === "chair" || role === "secretariat") {
    const n = protocols.filter((p) => p.status === "agenda" || p.status === "reviews_complete" || (role !== "chair" && p.status === "decided")).length;
    if (n) map.committee = n;
  }
  if (pendingSafety) map.safety = pendingSafety;
  const monitor = list.filter((p) => p.status === "active" && p.continuingDue && p.continuingDue <= "2026-11-30").length
    + list.filter((p) => p.amendment?.status === "Pending review").length;
  if (monitor) map.monitor = monitor;
  return map;
}

function Confetti({ n }: { n: number }) {
  const [bits, setBits] = useState<{ id: string; left: number; delay: number; dur: number; color: string }[]>([]);
  useEffect(() => {
    if (!n) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["var(--color-sky)", "var(--color-em)", "var(--color-amber)", "var(--color-rose)"];
    setBits(Array.from({ length: 42 }, (_, i) => ({
      id: `${n}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.25,
      dur: 1.5 + Math.random() * 1.2,
      color: colors[i % colors.length]!,
    })));
    const t = window.setTimeout(() => setBits([]), 3200);
    return () => window.clearTimeout(t);
  }, [n]);
  return (
    <>
      {bits.map((b) => (
        <span
          key={b.id}
          className="confetti-bit"
          style={{
            left: `${b.left}vw`,
            background: b.color,
            width: 8,
            height: 12,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </>
  );
}
