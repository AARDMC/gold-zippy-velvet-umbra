/**
 * Standalone Better Auth for AAPHREML-IRERC (server-only).
 *
 * Replaces the platform-brokered sign-in that shipped in the export (it needed
 * GROK_AUTH_* credentials that only exist on that platform). This version needs
 * only DATABASE_URL (Neon), BETTER_AUTH_SECRET and BETTER_AUTH_URL, and signs
 * users in with e-mail + password, verified by e-mail (see ./mailer.server).
 * The original file is kept in git history.
 *
 * NEVER import this from client code.
 */
import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { getCookie } from "@tanstack/react-start/server";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";
import { ensureDbReady, getPglite } from "../db";
import { pgliteDialect } from "./pglite-dialect";
import { resetEmail, sendMail, verificationEmail } from "./mailer.server";

void ensureDbReady();

const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const isProd = process.env.NODE_ENV === "production";

/** Real auth is on unless explicitly disabled for local demo mode. */
export const authConfigured = env("VITE_AUTH_ENABLED") !== "false";

const globalRef = globalThis as typeof globalThis & { __irercDevSecret__?: string };
function secret(): string {
  const s = env("BETTER_AUTH_SECRET");
  if (s) return s;
  if (isProd) throw new Error("BETTER_AUTH_SECRET must be set in production.");
  globalRef.__irercDevSecret__ ??= randomBytes(32).toString("hex");
  return globalRef.__irercDevSecret__;
}

// Vercel exposes the production host; BETTER_AUTH_URL always wins.
const vercelHost = env("VERCEL_PROJECT_PRODUCTION_URL") ?? env("VERCEL_URL");
const baseURL =
  env("BETTER_AUTH_URL") ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:8080");

const trustedOrigins = [
  baseURL,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  ...(env("VERCEL_URL") ? [`https://${env("VERCEL_URL")}`] : []),
];

const mailConfigured = Boolean(env("RESEND_API_KEY") && env("IRERC_MAIL_FROM"));
const databaseUrl = env("DATABASE_URL");
const database = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

export const SESSION_TOKEN_COOKIE = isProd
  ? "__Secure-irerc-auth.session_token"
  : "irerc-auth.session_token";

export const auth = betterAuth({
  baseURL,
  secret: secret(),
  database,
  trustedOrigins,

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    requireEmailVerification: mailConfigured,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendMail(user.email, "Reset your AAPHREML-IRERC password", resetEmail(user.name, url), url);
    },
  },

  emailVerification: {
    sendOnSignUp: mailConfigured,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail(user.email, "Verify your AAPHREML-IRERC account", verificationEmail(user.name, url), url);
    },
  },

  session: { expiresIn: 60 * 60 * 12, updateAge: 60 * 30, cookieCache: { enabled: true, maxAge: 300 } },

  advanced: {
    useSecureCookies: isProd,
    defaultCookieAttributes: { sameSite: "lax", path: "/", httpOnly: true },
    cookies: { session_token: { name: SESSION_TOKEN_COOKIE } },
  },

  plugins: [bearer(), tanstackStartCookies()],
});

export function readSessionToken(): string | null {
  return getCookie(SESSION_TOKEN_COOKIE) ?? null;
}

// Kept so existing imports keep compiling; no brokered providers exist any more.
export { GROK_PROVIDERS } from "./providers";
