import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  TODAY,
  actorName,
  addDays,
  DOC_DEFS,
  FOCUS_TO_CATEGORY,
  h,
  type HistoryItem,
  myReviewPending,
  nextProtocolId,
  type Protocol,
  type ReviewType,
  type RoleKey,
  ROLES,
  requiredDocsOk,
  seedProtocols,
  seedSafety,
  type SafetyReport,
  type Status,
  type ViewKey,
} from "@/lib/irerc/model";

export type ModalState =
  | { type: "submit" }
  | { type: "assign"; id: string }
  | { type: "assess"; id: string }
  | { type: "decide"; id: string }
  | { type: "letter"; id: string }
  | { type: "classify"; id: string }
  | { type: "safety"; id: string }
  | { type: "sae"; id: string }
  | { type: "amend"; id: string }
  | { type: "continuing"; id: string }
  | null;

type Toast = { id: number; msg: string; kind: "ok" | "warn" };

type IrercState = {
  role: RoleKey | null;
  actingReviewer: string;
  view: ViewKey;
  returnView: ViewKey;
  selectedId: string | null;
  filter: string;
  query: string;
  navOpen: boolean;
  protocols: Protocol[];
  safety: SafetyReport[];
  modal: ModalState;
  toasts: Toast[];
  celebrate: number;
  login: (role: RoleKey) => void;
  logout: () => void;
  resetDemo: () => void;
  go: (view: ViewKey) => void;
  openProtocol: (id: string) => void;
  setFilter: (f: string) => void;
  setQuery: (q: string) => void;
  setNav: (open: boolean) => void;
  setActing: (name: string) => void;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  dismissToast: (id: number) => void;
  submitProtocol: (input: {
    title: string;
    type: string;
    focus: string;
    sponsor: string;
    institution: string;
    site: string;
    summary: string;
    consentLanguages: string;
    vulnerable: string;
    attached: string[];
  }) => void;
  startScreening: (id: string) => void;
  setDoc: (id: string, code: string, state: Protocol["docs"][number]["state"]) => void;
  passScreening: (id: string) => void;
  returnForCorrection: (id: string, note: string) => void;
  resubmit: (id: string) => void;
  classify: (id: string, reviewType: ReviewType) => void;
  assignReviewers: (id: string, names: string[]) => void;
  placeOnAgenda: (id: string) => void;
  saveAssessment: (id: string, recommendation: string, comments: string, conflict: boolean, failed: string[]) => void;
  saveDecision: (id: string, decision: string, note: string, votes: { for: number; against: number; abstain: number }) => void;
  sendLetter: (id: string, message: string, continuingDue: string) => void;
  reviewSafety: (id: string, action: string, note: string) => void;
  fileSae: (protocolId: string, event: string, relatedness: string, seriousness: string) => void;
  fileAmendment: (id: string, summary: string) => void;
  decideAmendment: (id: string, approved: boolean) => void;
  fileContinuing: (id: string, summary: string) => void;
  archiveProtocol: (id: string) => void;
};

let toastSeq = 1;

function toastOf(msg: string, kind: Toast["kind"] = "ok"): Toast {
  return { id: ++toastSeq, msg, kind };
}

export const useIrerc = create<IrercState>()(
  persist(
    (set, get) => {
      const push = (msg: string, kind: Toast["kind"] = "ok") => {
        const t = toastOf(msg, kind);
        set((s) => ({ toasts: [...s.toasts, t] }));
        setTimeout(() => get().dismissToast(t.id), 3600);
      };

      const patch = (id: string, fn: (p: Protocol) => Protocol) => {
        set((s) => ({
          protocols: s.protocols.map((p) => (p.id === id ? fn(p) : p)),
        }));
      };

      const actor = () => {
        const s = get();
        return s.role ? actorName(s.role, s.actingReviewer) : "System";
      };

      const note = (p: Protocol, action: string, extra = ""): Protocol => ({
        ...p,
        history: [...p.history, h(TODAY, actor(), action, extra)],
      });

      return {
        role: null,
        actingReviewer: "Dr. Yonas Haile",
        view: "dashboard",
        returnView: "protocols",
        selectedId: null,
        filter: "all",
        query: "",
        navOpen: false,
        protocols: seedProtocols(),
        safety: seedSafety(),
        modal: null,
        toasts: [],
        celebrate: 0,
        login: (role) => {
          set({
            role,
            view: "dashboard",
            selectedId: null,
            filter: "all",
            query: "",
            modal: null,
            navOpen: false,
            actingReviewer: role === "reviewer" ? "Dr. Yonas Haile" : get().actingReviewer,
          });
          push(`Signed in as ${ROLES[role].title}`);
        },
        logout: () => set({ role: null, modal: null, navOpen: false, view: "dashboard" }),
        resetDemo: () => {
          set({
            protocols: seedProtocols(),
            safety: seedSafety(),
            view: "dashboard",
            selectedId: null,
            filter: "all",
            query: "",
            modal: null,
            celebrate: 0,
          });
          push("Demonstration records restored");
        },
        go: (view) => set({ view, navOpen: false }),
        openProtocol: (id) => {
          const view = get().view;
          set({
            selectedId: id,
            view: "detail",
            returnView: view === "detail" ? get().returnView : view,
            navOpen: false,
          });
        },
        setFilter: (filter) => set({ filter }),
        setQuery: (query) => set({ query }),
        setNav: (navOpen) => set({ navOpen }),
        setActing: (actingReviewer) => set({ actingReviewer }),
        openModal: (modal) => set({ modal }),
        closeModal: () => set({ modal: null }),
        dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
        submitProtocol: (input) => {
          const title = input.title.trim();
          if (!title) {
            push("A protocol title is required", "warn");
            return;
          }
          const attached = new Set(input.attached);
          const id = nextProtocolId(get().protocols);
          const protocol: Protocol = {
            id,
            title,
            type: input.type,
            focus: input.focus,
            category: FOCUS_TO_CATEGORY[input.focus] ?? "Public Health & Health Systems",
            pi: ROLES.investigator.name,
            institution: input.institution.trim() || "—",
            sponsor: input.sponsor.trim() || "—",
            site: input.site.trim() || "—",
            submitted: TODAY,
            status: "submitted",
            reviewType: null,
            decision: null,
            decisionNote: "",
            votes: null,
            reviewers: [],
            reviews: [],
            docs: DOC_DEFS.map((d) => ({
              ...d,
              state: attached.has(d.code) ? "uploaded" : "missing",
            })),
            history: [h(TODAY, actor(), "Protocol submitted", "Submitted in the review workspace")],
            summary: input.summary.trim(),
            consentLanguages: input.consentLanguages.trim() || "—",
            vulnerable: input.vulnerable.trim() || "—",
            continuingDue: null,
            letter: null,
            amendment: null,
            assignedOn: null,
          };
          set((s) => ({
            protocols: [protocol, ...s.protocols],
            modal: null,
            selectedId: id,
            view: "detail",
            returnView: "protocols",
          }));
          push("Protocol submitted — awaiting secretariat screening");
        },
        startScreening: (id) => {
          patch(id, (p) => {
            if (p.status !== "submitted") return p;
            return note({ ...p, status: "screening" }, "Administrative check started");
          });
          push("Administrative check started");
        },
        setDoc: (id, code, state) => {
          patch(id, (p) => ({
            ...p,
            docs: p.docs.map((d) => (d.code === code ? { ...d, state } : d)),
          }));
        },
        passScreening: (id) => {
          const p = get().protocols.find((x) => x.id === id);
          if (!p) return;
          if (!requiredDocsOk(p)) {
            push("Verify every required document before completing screening", "warn");
            return;
          }
          patch(id, (row) => note({ ...row, status: "complete" }, "Completeness verified", "All required documents verified"));
          push("Submission marked complete");
        },
        returnForCorrection: (id, noteText) => {
          const text = noteText.trim();
          if (!text) {
            push("Say what must be corrected", "warn");
            return;
          }
          patch(id, (p) => note({ ...p, status: "correction" }, "Returned for correction", text));
          set({ modal: null });
          push("Returned to the investigator");
        },
        resubmit: (id) => {
          patch(id, (p) =>
            note(
              {
                ...p,
                status: "screening",
                docs: p.docs.map((d) => (d.state === "correction" ? { ...d, state: "uploaded" } : d)),
              },
              "Corrected package resubmitted",
            ),
          );
          push("Resubmitted for screening");
        },
        classify: (id, reviewType) => {
          patch(id, (p) => {
            const status: Status = p.status === "complete" || p.status === "classified" ? "classified" : p.status;
            return note({ ...p, reviewType, status }, "Review type classified", reviewType);
          });
          set({ modal: null });
          push(`Classified as ${reviewType}`);
        },
        assignReviewers: (id, names) => {
          const p = get().protocols.find((x) => x.id === id);
          if (!p) return;
          const min = p.reviewType === "Full Board Review" ? 2 : 1;
          if (names.length < min) {
            push(
              p.reviewType === "Full Board Review"
                ? "Full board review needs at least two reviewers, including a lay member when possible"
                : "Select at least one reviewer",
              "warn",
            );
            return;
          }
          const lay = names.some((n) => n.startsWith("Ato ") || n.startsWith("W/ro "));
          patch(id, (row) =>
            note(
              { ...row, reviewers: names, status: "assigned", assignedOn: TODAY, reviews: [] },
              "Reviewers assigned",
              names.join(", "),
            ),
          );
          set({ modal: null });
          push(lay ? "Reviewers assigned" : "Assigned — consider adding a lay member", lay ? "ok" : "warn");
        },
        placeOnAgenda: (id) => {
          patch(id, (p) => note({ ...p, status: "agenda" }, "Placed on committee agenda", "Meeting 10/2026"));
          push("Added to Meeting 10/2026");
        },
        saveAssessment: (id, recommendation, comments, conflict, failed) => {
          if (!conflict) {
            push("Declare that you have no unmanaged conflict before submitting", "warn");
            return;
          }
          if (failed.length && !comments.trim()) {
            push("Comment on every criterion marked not appropriate", "warn");
            return;
          }
          const who = get().actingReviewer;
          let advanced = false;
          patch(id, (p) => {
            if (!myReviewPending(p, who)) return p;
            const reviews = [
              ...p.reviews,
              { reviewer: who, date: TODAY, recommendation, comments: comments.trim(), conflict: false },
            ];
            let status: Status = p.status === "assigned" ? "reviewing" : p.status;
            let history: HistoryItem[] = [...p.history, h(TODAY, who, "Assessment submitted", recommendation)];
            if (p.reviewers.length > 0 && reviews.length >= p.reviewers.length) {
              status = "reviews_complete";
              advanced = true;
              history = [
                ...history,
                h(TODAY, "System", "All assigned assessments received", "Ready for the committee agenda. The system does not decide."),
              ];
            }
            return { ...p, reviews, status, history };
          });
          set({ modal: null });
          push(advanced ? "Assessment submitted — file is ready for agenda" : "Assessment submitted");
        },
        saveDecision: (id, decision, noteText, votes) => {
          const total = votes.for + votes.against + votes.abstain;
          if (total < 4) {
            push("Quorum is not met — at least half the committee must vote", "warn");
            return;
          }
          if (!decision) {
            push("Choose a decision", "warn");
            return;
          }
          patch(id, (p) =>
            note(
              { ...p, decision, decisionNote: noteText.trim(), votes, status: "decided" },
              "Committee decision recorded",
              `${decision} · ${votes.for} for, ${votes.against} against, ${votes.abstain} abstained`,
            ),
          );
          const approved = decision.startsWith("Approved");
          set((s) => ({ modal: null, celebrate: approved ? s.celebrate + 1 : s.celebrate }));
          push("Decision recorded — secretariat must issue the action letter");
        },
        sendLetter: (id, message, continuingDue) => {
          const p = get().protocols.find((x) => x.id === id);
          if (!p?.decision) return;
          const text = message.trim();
          if (!text) {
            push("The action letter needs a message", "warn");
            return;
          }
          let status: Status = "archived";
          let due: string | null = null;
          let action = "Action letter issued";
          if (p.decision === "Approved" || p.decision === "Approved with Conditions") {
            status = "active";
            due = continuingDue || addDays(TODAY, 365);
            action = "Action letter issued — clearance active";
          } else if (p.decision === "Modifications Required" || p.decision === "Deferred") {
            status = "correction";
            action = "Action letter issued — returned to the investigator";
          }
          patch(id, (row) =>
            note(
              { ...row, status, continuingDue: due, letter: text },
              action,
              due ? `Continuing review ${due}` : row.decision || "",
            ),
          );
          const celebrate = status === "active";
          set((s) => ({ modal: null, celebrate: celebrate ? s.celebrate + 1 : s.celebrate }));
          push(status === "active" ? "Clearance letter sent" : "Action letter sent");
        },
        reviewSafety: (id, action, noteText) => {
          set((s) => ({
            safety: s.safety.map((r) =>
              r.id === id ? { ...r, status: `Reviewed — ${action}`, note: noteText.trim() } : r,
            ),
            modal: null,
          }));
          const report = get().safety.find((r) => r.id === id);
          if (report) {
            patch(report.protocolId, (p) =>
              note(p, "Safety report reviewed", `${report.id}: ${action}`),
            );
          }
          push("Safety action recorded");
        },
        fileSae: (protocolId, event, relatedness, seriousness) => {
          if (!event.trim()) {
            push("Describe the event", "warn");
            return;
          }
          const n = get().safety.length + 1;
          const id = `SAE-${String(n).padStart(3, "0")}`;
          const report: SafetyReport = {
            id,
            protocolId,
            event: event.trim(),
            date: TODAY,
            relatedness,
            seriousness,
            status: "Pending review",
            note: "",
          };
          set((s) => ({ safety: [report, ...s.safety], modal: null }));
          patch(protocolId, (p) => note(p, "Safety report filed", `${id}: ${event.trim()}`));
          push("Safety report filed for committee review");
        },
        fileAmendment: (id, summary) => {
          if (!summary.trim()) {
            push("Describe the amendment", "warn");
            return;
          }
          patch(id, (p) =>
            note(
              { ...p, amendment: { summary: summary.trim(), date: TODAY, status: "Pending review" } },
              "Amendment submitted",
              "Not to be implemented before approval",
            ),
          );
          set({ modal: null });
          push("Amendment submitted to the secretariat");
        },
        decideAmendment: (id, approved) => {
          patch(id, (p) => {
            if (!p.amendment) return p;
            return note(
              {
                ...p,
                amendment: { ...p.amendment, status: approved ? "Approved" : "Not approved" },
              },
              approved ? "Amendment approved" : "Amendment not approved",
              p.amendment.summary,
            );
          });
          if (approved) set((s) => ({ celebrate: s.celebrate + 1 }));
          push(approved ? "Amendment approved" : "Amendment not approved");
        },
        fileContinuing: (id, summary) => {
          if (!summary.trim()) {
            push("Summarise progress since the last review", "warn");
            return;
          }
          patch(id, (p) =>
            note(
              { ...p, continuingDue: addDays(TODAY, 365) },
              "Continuing review report submitted",
              summary.trim(),
            ),
          );
          set({ modal: null });
          push("Continuing review filed — next due in one year");
        },
        archiveProtocol: (id) => {
          patch(id, (p) => note({ ...p, status: "archived", continuingDue: null }, "Study archived", "Active file moved to the archive"));
          push("Protocol archived");
        },
      };
    },
    {
      name: "aaphreml-irerc-demo-v1",
      partialize: (s) => ({
        role: s.role,
        actingReviewer: s.actingReviewer,
        protocols: s.protocols,
        safety: s.safety,
      }),
    },
  ),
);

export function useProtocol(id: string | null) {
  return useIrerc((s) => s.protocols.find((p) => p.id === id) ?? null);
}
