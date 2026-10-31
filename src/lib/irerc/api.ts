import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import type { DocumentVersion, OfficialSubmission, Protocol, RoleKey } from "@/lib/irerc/model";

/**
 * Client-callable IRERC API. Every function authenticates the caller, resolves
 * the IRERC role from the database (never from the browser) and enforces access
 * in the server module. Server modules are imported dynamically so none of the
 * database code reaches the client bundle.
 */

const code = z.string().min(1).max(40);
const protocolId = z.string().regex(/^AAPHREML-IRERC-\d{4}-\d{4,}$/);

// The form is large and owned by the UI; the server validates the fields it relies on.
const form = z
  .object({
    studyTitle: z.string().max(500),
    piName: z.string().max(200),
    piEmail: z.string().max(200),
    college: z.string().max(300),
    acknowledge: z.boolean(),
    declarationAccepted: z.boolean(),
  })
  .passthrough();

export type Me = { role: RoleKey; label: string };

export const getMe = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Me> => {
    const { resolveActor } = await import("./server/access.server");
    const a = await resolveActor(context.userId);
    return { role: a.role, label: a.label };
  });

export const listProtocolsFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Protocol[]> => {
    const { resolveActor } = await import("./server/access.server");
    const { listProtocols } = await import("./server/protocols.server");
    return listProtocols(await resolveActor(context.userId));
  });

export const createDraftFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<{ protocolId: string }> => {
    const { resolveActor } = await import("./server/access.server");
    const { createDraft } = await import("./server/protocols.server");
    return createDraft(await resolveActor(context.userId));
  });

export const uploadDocumentFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((d: unknown) =>
    z
      .object({
        protocolId,
        code,
        name: z.string().min(1).max(300),
        mime: z.string().max(200),
        base64: z.string().min(1),
        note: z.string().max(500).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }): Promise<DocumentVersion> => {
    const { resolveActor } = await import("./server/access.server");
    const { uploadDocument } = await import("./server/protocols.server");
    return uploadDocument(await resolveActor(context.userId), data);
  });

export const downloadDocumentFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((d: unknown) =>
    z.object({ protocolId, code, version: z.number().int().positive().optional() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const { resolveActor } = await import("./server/access.server");
    const { downloadDocument } = await import("./server/protocols.server");
    return downloadDocument(await resolveActor(context.userId), data);
  });

export const submitProtocolFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((d: unknown) => z.object({ protocolId, form }).parse(d))
  .handler(async ({ context, data }): Promise<Protocol> => {
    const { resolveActor } = await import("./server/access.server");
    const { submitProtocol } = await import("./server/protocols.server");
    return submitProtocol(await resolveActor(context.userId), {
      protocolId: data.protocolId,
      form: data.form as unknown as OfficialSubmission,
    });
  });

export const updateSubmissionFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((d: unknown) =>
    z.object({ protocolId, form, expectedVersion: z.number().int().optional() }).parse(d),
  )
  .handler(async ({ context, data }): Promise<Protocol> => {
    const { resolveActor } = await import("./server/access.server");
    const { updateSubmission } = await import("./server/protocols.server");
    return updateSubmission(await resolveActor(context.userId), {
      protocolId: data.protocolId,
      form: data.form as unknown as OfficialSubmission,
      expectedVersion: data.expectedVersion,
    });
  });

export const listUsersFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { resolveActor } = await import("./server/access.server");
    const { listUsers } = await import("./server/users.server");
    return listUsers(await resolveActor(context.userId));
  });

export const setUserRoleFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((d: unknown) =>
    z
      .object({
        userId: z.string().min(1).max(100),
        role: z.enum(["investigator", "secretariat", "reviewer", "chair", "admin"]),
        active: z.boolean(),
        category: z.string().max(100).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const { resolveActor } = await import("./server/access.server");
    const { setUserRole } = await import("./server/users.server");
    await setUserRole(await resolveActor(context.userId), data);
    return { ok: true };
  });
