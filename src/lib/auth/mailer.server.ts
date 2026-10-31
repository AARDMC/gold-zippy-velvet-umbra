import { env } from "@/lib/env.server";

/**
 * Transactional e-mail through Resend's HTTP API (no extra dependency).
 * Set RESEND_API_KEY and IRERC_MAIL_FROM (a verified sender, e.g.
 * "AAPHREML-IRERC <irerc@yourdomain.org>"). Without a key, links are printed to
 * the server log in development and an error is logged in production.
 */
export async function sendMail(to: string, subject: string, html: string, devLink?: string): Promise<void> {
  const key = env("RESEND_API_KEY");
  const from = env("IRERC_MAIL_FROM");
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[mail:dev] to=${to} subject="${subject}"${devLink ? ` link=${devLink}` : ""}`);
    } else {
      console.error("[mail] RESEND_API_KEY / IRERC_MAIL_FROM are not set — e-mail was NOT sent.");
    }
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    console.error(`[mail] Resend rejected the message (${res.status}).`);
  }
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function verificationEmail(name: string, url: string) {
  return `<p>Dear ${esc(name)},</p><p>Confirm your e-mail address to activate your AAPHREML-IRERC account:</p><p><a href="${esc(url)}">Verify e-mail address</a></p><p>If you did not create this account, ignore this message.</p>`;
}

export function resetEmail(name: string, url: string) {
  return `<p>Dear ${esc(name)},</p><p>Use the link below to choose a new password. It expires in one hour.</p><p><a href="${esc(url)}">Reset password</a></p><p>If you did not ask for this, ignore this message.</p>`;
}
