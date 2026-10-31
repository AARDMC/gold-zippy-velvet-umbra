/**
 * Server-backed mode. Off (default): the portal is the single-browser demo
 * (localStorage + IndexedDB). On (`VITE_REMOTE_STORE=true`): protocols and
 * documents live in Neon through the server functions in `./api`.
 * Turn it on only together with `VITE_AUTH_ENABLED=true` and a DATABASE_URL.
 */
export const REMOTE = import.meta.env.VITE_REMOTE_STORE === "true";
