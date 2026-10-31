# Deployment readiness

## What is ready

- Production build: `npm run build`
- Type checking: `npm run typecheck`
- Lint: `npm run lint` (no errors; three Fast Refresh warnings)
- Auth invariant check: `npm run check:auth` (sign-in is intentionally off)
- Browser assets: `public/seal.png`, `public/logo.png`, `public/signature.png`
- Favicon and Apple touch icon: `/seal.png`
- Vercel-compatible TanStack Start/Nitro build

## Current mode — important

This build is a **single-browser portal**:

- records are stored in `localStorage` under `aaphreml-irerc-portal-v3`;
- uploaded documents and comments are stored in browser IndexedDB;
- the role selector is not authenticated sign-in;
- `VITE_AUTH_ENABLED` is `false`;
- there is no shared database or server-side file storage.

Therefore it is suitable for preview, demonstration and single-device evaluation.
It is **not ready for live identifiable research data** or multi-user review on
different computers.

## Before official production use

1. Connect Neon/Postgres with `DATABASE_URL`.
2. Enable Better Auth and configure Google/LinkedIn providers for PIs.
3. Create the initial System Administrator account through a one-time secure
   bootstrap; never commit the password.
4. Move document storage to a shared private object store.
5. Add the email provider for clearance letters.
6. Replace or protect the public signature image.
7. Run the full multi-user acceptance test: submission, screening, assignment,
   review, comments, revision, final PDF, decision, letter and audit trail.

## Secrets

The old `env.txt` file has been moved out of the public path and added to
`.gitignore`. Do not commit database passwords. Rotate any credential that was
previously committed to a public repository.

## Known limitations

- Cross-device review/comments are not shared yet.
- The 48-hour update/revision windows are browser-enforced.
- No email delivery from this React build.
- The Apps Script edition remains the shared production system.


## Server mode (Neon) — phase 1 status

Added: `migrations/0001_auth.sql` (moved up from `migrations/auth/` so it is applied),
`migrations/0002_irerc_core.sql` (roles, members, protocols, reviewers, documents,
comments, safety, notifications, append-only audit), server functions in
`src/lib/irerc/api.ts`, server logic in `src/lib/irerc/server/`, and a client adapter
(`remote.ts`). It is off unless `VITE_REMOTE_STORE=true`.

Server-backed now: role lookup, protocol listing (PI own / reviewer assigned / staff all),
draft -> document upload -> submit (server re-scans the proposal at 95%), the 48-hour
update, document download, audit rows, submission notifications.

Still browser-only (phase 2, do not use in server mode yet): screening, classification,
reviewer assignment, assessments, committee decision, clearance letter, revision/final
protocol, safety, amendments, members roster, notifications list, sign-in page and
admin role assignment.

Limits: files are capped at 3 MB each (Vercel request-body limit); move to a private
object store before accepting large files. `.grok/app-env.json` is a workspace file; on
Vercel set `VITE_AUTH_ENABLED` and `VITE_REMOTE_STORE` in project environment variables.
