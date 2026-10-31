import { getSql, type Sql } from "@/lib/db";
import { env } from "@/lib/env.server";
import type { RoleKey } from "@/lib/irerc/model";

export class ForbiddenError extends Error {
  readonly status = 403;
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export type Actor = {
  userId: string;
  role: RoleKey;
  /** Name written to the audit trail and history. */
  label: string;
};

/**
 * Resolve the caller's IRERC role from the database. The browser never supplies
 * a role. First sign-in creates an `investigator`, except one verified e-mail
 * (IRERC_BOOTSTRAP_ADMIN_EMAIL) that becomes `admin` while no admin exists.
 */
export async function resolveActor(userId: string, sql?: Sql): Promise<Actor> {
  const q = sql ?? (await getSql());
  const existing = await q<{ role: RoleKey; display_name: string | null; active: boolean; name: string }>`
    select r.role, r.display_name, r.active, u.name
      from irerc_user_role r join "user" u on u.id = r.user_id
     where r.user_id = ${userId}`;
  if (existing[0]) {
    if (!existing[0].active) throw new ForbiddenError("This account has been deactivated.");
    return { userId, role: existing[0].role, label: existing[0].display_name || existing[0].name };
  }

  const users = await q<{ name: string; email: string; emailVerified: boolean }>`
    select name, email, "emailVerified" from "user" where id = ${userId}`;
  const user = users[0];
  if (!user) throw new ForbiddenError("Unknown user.");

  let role: RoleKey = "investigator";
  const bootstrap = env("IRERC_BOOTSTRAP_ADMIN_EMAIL")?.toLowerCase();
  if (bootstrap && user.emailVerified && user.email.toLowerCase() === bootstrap) {
    const admins = await q`select 1 from irerc_user_role where role = 'admin' and active limit 1`;
    if (admins.length === 0) role = "admin";
  }
  await q`insert into irerc_user_role (user_id, role, display_name)
          values (${userId}, ${role}, ${user.name}) on conflict (user_id) do nothing`;
  const again = await q<{ role: RoleKey }>`select role from irerc_user_role where user_id = ${userId}`;
  return { userId, role: again[0]?.role ?? "investigator", label: user.name };
}

export function requireRole(actor: Actor, roles: RoleKey[]): void {
  if (!roles.includes(actor.role)) throw new ForbiddenError();
}

/** Members row linked to this login (reviewers/chair), if any. */
export async function memberIdFor(userId: string, sql: Sql): Promise<string | null> {
  const rows = await sql<{ id: string }>`
    select id from irerc_member where user_id = ${userId} and active limit 1`;
  return rows[0]?.id ?? null;
}
