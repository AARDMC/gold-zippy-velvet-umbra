import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ChipTone } from "@/lib/irerc/model";

const tones: Record<ChipTone, string> = {
  sky: "border-sky/30 bg-sky/15 text-sky",
  em: "border-em/30 bg-em/15 text-em",
  amber: "border-amber/30 bg-amber/15 text-amber",
  rose: "border-rose/30 bg-rose/15 text-rose",
  muted: "border-line bg-panel-2 text-muted",
};

export function Chip({ tone, children }: { tone: ChipTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

const kinds = {
  primary: "border-transparent bg-sky text-ink hover:brightness-105",
  go: "border-transparent bg-em text-ink hover:brightness-105",
  ghost: "border-line bg-ink-2/60 text-fg hover:border-line-2",
  danger: "border-rose/40 bg-rose/10 text-rose hover:bg-rose/20",
} as const;

export function Btn({
  kind = "ghost",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: keyof typeof kinds }) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${kinds[kind]} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-panel/90 shadow-card ${className}`}>{children}</section>
  );
}

export function PageHead({
  title,
  lede,
  action,
}: {
  title: string;
  lede?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">{title}</h1>
        {lede ? <p className="mt-1 max-w-3xl text-sm text-muted">{lede}</p> : null}
      </div>
      {action}
    </div>
  );
}

export const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-ink-2 px-3 py-2.5 text-sm text-fg outline-none ring-sky/30 focus:border-sky focus:ring-2";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-3 block text-xs font-semibold tracking-wide text-muted uppercase">
      {label}
      {children}
    </label>
  );
}

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="font-display text-lg text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/75 p-3 backdrop-blur-sm sm:items-center" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-2 bg-ink-2 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="ml-auto grid size-11 place-items-center rounded-xl border border-line text-muted hover:text-fg" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer ? <div className="flex flex-wrap justify-end gap-2 border-t border-line px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
