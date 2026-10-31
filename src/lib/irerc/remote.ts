import { REMOTE } from "./remote-flag";
import { useIrerc } from "./store";
import {
  createDraftFn,
  downloadDocumentFn,
  getMe,
  listProtocolsFn,
  submitProtocolFn,
  updateSubmissionFn,
  uploadDocumentFn,
} from "./api";
import type { OfficialSubmission, Protocol } from "./model";

export { REMOTE };

export async function fileToBase64(file: Blob): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToBlob(base64: string, mime: string): Blob {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/** Signed-in identity + role from the server, then the caller's protocols. */
export async function bootstrapRemoteSession(): Promise<void> {
  const me = await getMe();
  useIrerc.setState({ role: me.role, actingReviewer: me.role === "reviewer" ? me.label : "" });
  await refreshProtocols();
}

export async function refreshProtocols(): Promise<void> {
  const protocols = await listProtocolsFn();
  useIrerc.setState({ protocols });
}

export function ingestProtocol(protocol: Protocol): void {
  useIrerc.setState((s) => ({
    protocols: [protocol, ...s.protocols.filter((p) => p.id !== protocol.id)],
  }));
}

export async function uploadRemote(protocolId: string, code: string, file: File, note?: string) {
  return uploadDocumentFn({
    data: { protocolId, code, name: file.name, mime: file.type, base64: await fileToBase64(file), note },
  });
}

/** Draft -> upload every file -> server validates, re-scans and submits. */
export async function submitRemote(
  form: OfficialSubmission,
  files: Record<string, File | null | undefined>,
  codes: Record<string, string>,
  draftId?: string | null,
  onDraft?: (id: string) => void,
): Promise<Protocol> {
  const protocolId = draftId ?? (await createDraftFn()).protocolId;
  onDraft?.(protocolId);
  for (const key of Object.keys(files)) {
    const file = files[key];
    if (file) await uploadRemote(protocolId, codes[key]!, file);
  }
  const protocol = await submitProtocolFn({ data: { protocolId, form: { ...form, code: protocolId } } });
  ingestProtocol(protocol);
  return protocol;
}

export async function updateRemote(
  protocolId: string,
  form: OfficialSubmission,
  files: Record<string, File | null | undefined>,
  codes: Record<string, string>,
): Promise<Protocol> {
  for (const key of Object.keys(files)) {
    const file = files[key];
    if (file) await uploadRemote(protocolId, codes[key]!, file, "Submission update");
  }
  const protocol = await updateSubmissionFn({ data: { protocolId, form } });
  ingestProtocol(protocol);
  return protocol;
}

export async function fetchRemoteDocument(protocolId: string, code: string, version?: number) {
  const doc = await downloadDocumentFn({ data: { protocolId, code, version } });
  return { name: doc.name, mime: doc.mime, blob: base64ToBlob(doc.base64, doc.mime) };
}
