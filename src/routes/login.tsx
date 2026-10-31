import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";
import { BRAND } from "@/lib/irerc/model";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: LoginPage,
});

function captureToken(ctx: { response: Response }) {
  const token = ctx.response.headers.get("set-auth-token");
  if (token) window.sessionStorage.setItem("grok-auth.bearer-token", token);
}

type Mode = "signin" | "signup";

const input =
  "w-full min-h-11 rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-300";

function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        if (password.length < 10) throw new Error("Use a password of at least 10 characters.");
        const { error: err } = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          fetchOptions: { onSuccess: captureToken },
        });
        if (err) throw new Error(err.message ?? "The account could not be created.");
        const session = await authClient.getSession();
        if (session.data?.user) {
          window.location.href = "/";
          return;
        }
        setNotice("Account created. Open the verification link sent to your e-mail, then sign in.");
        setMode("signin");
        setPassword("");
        return;
      }
      const { error: err } = await authClient.signIn.email({
        email: email.trim(),
        password,
        fetchOptions: { onSuccess: captureToken },
      });
      if (err) {
        if (err.status === 403) {
          throw new Error("Verify your e-mail first. A new verification link has been sent.");
        }
        throw new Error("E-mail or password is not correct.");
      }
      window.location.href = "/";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function forgot() {
    setError(null);
    setNotice(null);
    if (!email.trim()) {
      setError("Enter your e-mail address first.");
      return;
    }
    await authClient.requestPasswordReset({ email: email.trim(), redirectTo: "/reset-password" });
    setNotice("If an account exists for that address, a reset link has been sent.");
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-600 p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
        <img src="/seal.png" alt="" className="mx-auto size-16" />
        <div className="text-center">
          <h1 className="font-display text-2xl">{BRAND.short}</h1>
          <p className="text-sm text-white/80">{BRAND.portal}</p>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-white/10 p-1 text-sm font-semibold">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={`min-h-10 rounded-lg ${mode === m ? "bg-white text-slate-900" : "text-white/80"}`}
            >
              {m === "signin" ? "Sign in" : "Create PI account"}
            </button>
          ))}
        </div>
        {mode === "signup" && (
          <label className="block text-sm">
            Full name
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
          </label>
        )}
        <label className="block text-sm">
          E-mail
          <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label className="block text-sm">
          Password
          <input
            className={input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === "signup" ? 10 : undefined}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-500/30 px-3 py-2 text-sm">{error}</p>}
        {notice && <p role="status" className="rounded-lg bg-emerald-500/30 px-3 py-2 text-sm">{notice}</p>}
        <button disabled={busy} className="min-h-11 w-full rounded-xl bg-white font-semibold text-slate-900 disabled:opacity-60">
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        {mode === "signin" && (
          <button type="button" onClick={() => void forgot()} className="block w-full text-center text-sm text-white/80 underline">
            Forgot password?
          </button>
        )}
        <p className="text-center text-xs text-white/70">
          Committee members and staff receive their role from the System Administrator after signing up.
        </p>
      </form>
    </div>
  );
}
