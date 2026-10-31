import { createFileRoute } from "@tanstack/react-router";

/** Better Auth endpoints: /api/auth/sign-in/email, /get-session, /verify-email, … */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const { auth } = await import("@/lib/auth/server");
        return auth.handler(request);
      },
      POST: async ({ request }: { request: Request }) => {
        const { auth } = await import("@/lib/auth/server");
        return auth.handler(request);
      },
    },
  },
});
