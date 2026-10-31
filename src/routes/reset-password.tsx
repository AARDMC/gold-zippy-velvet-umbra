import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: ResetPage,
});

function ResetPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const token = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("token");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!token) return setMsg("This reset link is invalid or has expired.");
    if (password.length < 10) return setMsg("Use a password of at least 10 characters.");
    setBusy(true);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setBusy(false);
    if (error) return setMsg("This reset link is invalid or has expired.");
    window.location.href = "/login";
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-600 p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
        <h1 className="font-display text-2xl">Choose a new password</h1>
        <input
          className="w-full min-h-11 rounded-xl bg-white/95 px-3 text-sm text-slate-900"
          type="password"
          minLength={10}
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {msg && <p role="alert" className="rounded-lg bg-red-500/30 px-3 py-2 text-sm">{msg}</p>}
        <button disabled={busy} className="min-h-11 w-full rounded-xl bg-white font-semibold text-slate-900 disabled:opacity-60">
          Save password
        </button>
      </form>
    </div>
  );
}
