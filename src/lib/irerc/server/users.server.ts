import { getSql, withTransaction } from "@/lib/db";
import type { RoleKey } from "@/lib/irerc/model";
import { ForbiddenError, requireRole, type Actor } from "./access.server";

export type ManagedUser = {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: RoleKey;
  active: boolean;
};

export async function listUsers(actor: Actor): Promise<ManagedUser[]> {
  requireRole(actor, ["admin"]);
  const sql = await getSql();
  const rows = await sql<{ id: string; name: string; email: string; emailVerified: boolean; role: RoleKey | null; active: boolean | null }>`
    select u.id, u.name, u.email, u."emailVerified", r.role, r.active
      from "user" u left join irerc_user_role r on r.user_id = u.id
     order by u."createdAt" desc`;
  return rows.map((r) => ({
    userId: r.id,
    name: r.name,
    email: r.email,
    emailVerified: r.emailVerified,
    role: r.role ?? "investigator",
    active: r.active ?? true,
  }));
}

/** Admin assigns a role. Reviewers and the chair also get a roster seat so their access can be scoped. */
export async function setUserRole(
  actor: Actor,
  input: { userId: string; role: RoleKey; active: boolean; category?: string },
): Promise<void> {
  requireRole(actor, ["admin"]);
  if (input.userId === actor.userId) throw new ForbiddenError("You cannot change your own role.");

  await withTransaction(async (sql) => {
    const users = await sql<{ name: string; email: string; emailVerified: boolean }>`
      select name, email, "emailVerified" from "user" where id = ${input.userId}`;
    const user = users[0];
    if (!user) throw new Error("User not found.");
    const mailConfigured = Boolean(process.env.RESEND_API_KEY?.trim() && process.env.IRERC_MAIL_FROM?.trim());
    if (input.role !== "investigator" && !user.emailVerified && mailConfigured) {
      throw new Error("The user must verify their e-mail address before receiving a committee or staff role.");
    }

    const current = await sql<{ role: RoleKey; active: boolean }>`
      select role, active from irerc_user_role where user_id = ${input.userId} for update`;
    const wasAdmin = current[0]?.role === "admin" && current[0].active;
    if (wasAdmin && (input.role !== "admin" || !input.active)) {
      const others = await sql<{ n: number }>`
        select count(*)::int as n from irerc_user_role
         where role = 'admin' and active and user_id <> ${input.userId}`;
      if (!others[0] || others[0].n < 1) throw new Error("At least one active System Administrator must remain.");
    }

    await sql`insert into irerc_user_role (user_id, role, display_name, active)
              values (${input.userId}, ${input.role}, ${user.name}, ${input.active})
              on conflict (user_id) do update
                set role = excluded.role, active = excluded.active, updated_at = now()`;

    if (input.role === "reviewer" || input.role === "chair") {
      const seat = input.role === "chair" ? "Chairperson" : "Member";
      const mid = `M-${input.userId.slice(0, 12)}`;
      await sql`insert into irerc_member (id, user_id, name, category, seat, email, active)
                values (${mid}, ${input.userId}, ${user.name}, ${input.category || "Public Health Expert"}, ${seat}, ${user.email}, ${input.active})
                on conflict (id) do update
                  set seat = excluded.seat, category = excluded.category, active = excluded.active, updated_at = now()`;
    } else {
      await sql`update irerc_member set active = false, updated_at = now() where user_id = ${input.userId}`;
    }

    await sql`insert into irerc_audit (actor_id, actor_label, role, action, note)
              values (${actor.userId}, ${actor.label}, ${actor.role}, 'Role changed',
                      ${`${user.email}: ${current[0]?.role ?? "none"} → ${input.role}${input.active ? "" : " (deactivated)"}`})`;
  });
}
