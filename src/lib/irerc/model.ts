export const TODAY = "2026-10-30";

export type RoleKey = "investigator" | "secretariat" | "reviewer" | "chair" | "admin";

export type Status =
  | "submitted"
  | "screening"
  | "correction"
  | "complete"
  | "classified"
  | "assigned"
  | "reviewing"
  | "reviews_complete"
  | "agenda"
  | "decided"
  | "active"
  | "archived";

export type ReviewType = "Full Board Review" | "Expedited Review" | "Exemption Review";

export type DocState = "missing" | "uploaded" | "verified" | "correction";

export type CriterionResult = "Appropriate" | "Not appropriate" | "N/A";

export type Doc = {
  code: string;
  name: string;
  required: boolean;
  state: DocState;
};

export type Review = {
  reviewer: string;
  date: string;
  recommendation: string;
  comments: string;
  conflict: boolean;
};

export type HistoryItem = { date: string; actor: string; action: string; note?: string };

export type Amendment = {
  summary: string;
  date: string;
  status: "Pending review" | "Approved" | "Not approved";
};

export type Protocol = {
  id: string;
  title: string;
  type: string;
  focus: string;
  category: string;
  pi: string;
  institution: string;
  sponsor: string;
  site: string;
  submitted: string;
  status: Status;
  reviewType: ReviewType | null;
  decision: string | null;
  decisionNote: string;
  votes: { for: number; against: number; abstain: number } | null;
  reviewers: string[];
  reviews: Review[];
  docs: Doc[];
  history: HistoryItem[];
  summary: string;
  consentLanguages: string;
  vulnerable: string;
  continuingDue: string | null;
  letter: string | null;
  amendment: Amendment | null;
  assignedOn: string | null;
};

export type SafetyReport = {
  id: string;
  protocolId: string;
  event: string;
  date: string;
  relatedness: string;
  seriousness: string;
  status: string;
  note: string;
};

export type ViewKey =
  | "dashboard"
  | "protocols"
  | "detail"
  | "reviews"
  | "screening"
  | "committee"
  | "safety"
  | "monitor"
  | "archive"
  | "system"
  | "roster";

export const ROLES: Record<
  RoleKey,
  { name: string; title: string; initials: string; blurb: string }
> = {
  investigator: {
    name: "Dr. Selam Bekele",
    title: "Investigator / PI",
    initials: "SB",
    blurb: "Submits protocols, amendments, safety reports, and continuing review.",
  },
  secretariat: {
    name: "Ms. Meron Tadesse",
    title: "IRERC Secretariat",
    initials: "MT",
    blurb: "Receives, screens, assigns, schedules, communicates, and archives. No decision authority.",
  },
  reviewer: {
    name: "Dr. Yonas Haile",
    title: "IRERC Member / Reviewer",
    initials: "YH",
    blurb: "Completes the 20-point assessment for assigned protocols only.",
  },
  chair: {
    name: "Prof. Almaz Wondimu",
    title: "Chairperson",
    initials: "AW",
    blurb: "Chairs meetings, records the committee decision, and signs expedited items.",
  },
  admin: {
    name: "System Administrator",
    title: "Digital system support",
    initials: "SA",
    blurb: "Access control, audit, and document control. No independent decision authority.",
  },
};

export const MEMBERS = [
  { name: "Prof. Almaz Wondimu", category: "Public Health Expert", seat: "Chairperson", institution: "AACAHB", lay: false },
  { name: "Dr. Yonas Haile", category: "Clinical Expert", seat: "Member", institution: "Tikur Anbessa Specialized Hospital", lay: false },
  { name: "Dr. Meseret Assefa", category: "Laboratory Scientist", seat: "Member", institution: "Ethiopian Public Health Institute", lay: false },
  { name: "Dr. Solomon Girma", category: "Public Health Expert", seat: "Member", institution: "AAU School of Public Health", lay: false },
  { name: "Dr. Rahel Tesfaye", category: "Ethics / Legal Expert", seat: "Member", institution: "AAU School of Law", lay: false },
  { name: "Dr. Getachew Alemu", category: "Clinical Expert", seat: "Member", institution: "St. Paul's Hospital MMC", lay: false },
  { name: "Ato Mulugeta Bekele", category: "Community Representative", seat: "Lay member", institution: "Addis Ababa community seat", lay: true },
  { name: "W/ro Hirut Desta", category: "Community Representative", seat: "Lay member", institution: "Addis Ababa community seat", lay: true },
] as const;

export const REVIEWER_POOL = MEMBERS.filter((m) => m.seat === "Member" || m.seat === "Lay member");

export const DOC_DEFS: { code: string; name: string; required: boolean }[] = [
  { code: "DOC_PROTOCOL", name: "Research Protocol", required: true },
  { code: "DOC_CONSENT", name: "Informed Consent Form", required: true },
  { code: "DOC_TOOLS", name: "Data Collection Tools", required: true },
  { code: "DOC_PIS", name: "Participant Information Sheet", required: true },
  { code: "DOC_CV", name: "Investigator CV", required: true },
  { code: "DOC_ETHICS_CERT", name: "Ethical Training Certificate", required: true },
  { code: "DOC_BUDGET", name: "Detailed Budget", required: true },
  { code: "DOC_TIMELINE", name: "Study Timeline & Workplan", required: true },
  { code: "DOC_INST_SUPPORT", name: "Institutional Support Letter", required: false },
  { code: "DOC_OTHER", name: "Other Attachments", required: false },
];

export const CRITERIA: { code: string; section: string; question: string }[] = [
  { code: "CRIT_01", section: "Science", question: "Is the research rationale clearly described and scientifically sound?" },
  { code: "CRIT_02", section: "Science", question: "Is the study design appropriate to the stated objectives?" },
  { code: "CRIT_03", section: "Science", question: "Is the sample size justified?" },
  { code: "CRIT_04", section: "Science", question: "Are inclusion and exclusion criteria clear and fair?" },
  { code: "CRIT_05", section: "Science", question: "Are data collection tools and procedures appropriate?" },
  { code: "CRIT_06", section: "Science", question: "Are data verification and quality controls adequate?" },
  { code: "CRIT_07", section: "Consent", question: "Is informed consent voluntary, comprehensible, and properly documented?" },
  { code: "CRIT_08", section: "Consent", question: "Are information sheets and consent forms accurate in local languages?" },
  { code: "CRIT_09", section: "Risk", question: "Are physical, psychological, social, and legal risks identified and minimized?" },
  { code: "CRIT_10", section: "Risk", question: "Are risks reasonable relative to anticipated benefits?" },
  { code: "CRIT_11", section: "Risk", question: "Are vulnerable participants adequately safeguarded?" },
  { code: "CRIT_12", section: "Protection", question: "Are privacy, de-identification, and confidentiality provisions adequate?" },
  { code: "CRIT_13", section: "Protection", question: "Is compensation fair and non-coercive?" },
  { code: "CRIT_14", section: "Protection", question: "Are investigator qualifications and ethics training documented?" },
  { code: "CRIT_15", section: "Protection", question: "Are the proposed sites adequate?" },
  { code: "CRIT_16", section: "Oversight", question: "Is community engagement or local dissemination planned?" },
  { code: "CRIT_17", section: "Oversight", question: "Are conflicts of interest disclosed and managed?" },
  { code: "CRIT_18", section: "Oversight", question: "Is the timeline feasible?" },
  { code: "CRIT_19", section: "Oversight", question: "Is the budget itemized and free of coercive inducements?" },
  { code: "CRIT_20", section: "Oversight", question: "Does the study meet Ethiopian research guidance and the Declaration of Helsinki?" },
];

export const SECTIONS = ["Science", "Consent", "Risk", "Protection", "Oversight"] as const;

export const FOCUS_TO_CATEGORY: Record<string, string> = {
  "Communicable diseases": "Biomedical & Laboratory",
  "Non-communicable diseases": "Clinical Trial / Interventional",
  "Reproductive, maternal, newborn, and child health": "Observational / Epidemiological",
  "Food and nutrition": "Public Health & Health Systems",
  "Neglected tropical diseases": "Biomedical & Laboratory",
  "Water, Sanitation & Hygiene": "Environmental & Occupational Health",
  "Mental health and well-being": "Socio-behavioral & Qualitative",
  "Environmental and workplace health": "Environmental & Occupational Health",
  "Health systems and services": "Health Systems & Policy",
  "Biomedical / laboratory research": "Biomedical & Laboratory",
};

export const CATEGORY_EXPERTISE: Record<string, string> = {
  "Biomedical & Laboratory": "Laboratory Scientist",
  "Clinical Trial / Interventional": "Clinical Expert",
  "Observational / Epidemiological": "Public Health Expert",
  "Public Health & Health Systems": "Public Health Expert",
  "Environmental & Occupational Health": "Environmental Health Professional",
  "Health Systems & Policy": "Public Health Expert",
  "Socio-behavioral & Qualitative": "Ethics / Legal Expert",
};

export const STUDY_TYPES = [
  "Clinical Trial — Phase I",
  "Clinical Trial — Phase II",
  "Clinical Trial — Phase III",
  "Observational — Cohort",
  "Observational — Community Survey",
  "Genetic Study — Stored Specimens",
  "Medical Device Study — NSR",
  "Medical Device Study — SR",
  "Community Intervention",
  "Socio-behavioral Study",
];

export const DECISIONS = [
  "Approved",
  "Approved with Conditions",
  "Modifications Required",
  "Deferred",
  "Not Approved",
] as const;

export const RECOMMENDATIONS = [
  "Approved",
  "Approved with minor modification",
  "Approved with major modification",
  "Not Approved",
] as const;

export const PIPE: { key: string; label: string; match: Status[] }[] = [
  { key: "in", label: "Submitted", match: ["submitted"] },
  { key: "screen", label: "Screening", match: ["screening", "correction"] },
  { key: "class", label: "Classified", match: ["complete", "classified"] },
  { key: "assign", label: "Assigned", match: ["assigned"] },
  { key: "review", label: "Review", match: ["reviewing", "reviews_complete"] },
  { key: "agenda", label: "Agenda", match: ["agenda"] },
  { key: "decide", label: "Decision", match: ["decided"] },
  { key: "live", label: "Clearance", match: ["active", "archived"] },
];

export const STATUS_LABEL: Record<Status, string> = {
  submitted: "Submitted",
  screening: "Administrative check",
  correction: "Correction required",
  complete: "Submission complete",
  classified: "Review type set",
  assigned: "Reviewers assigned",
  reviewing: "Under review",
  reviews_complete: "Reviews complete",
  agenda: "On committee agenda",
  decided: "Decision recorded",
  active: "Clearance active",
  archived: "Archived",
};

export type ChipTone = "sky" | "em" | "amber" | "rose" | "muted";

export const STATUS_TONE: Record<Status, ChipTone> = {
  submitted: "muted",
  screening: "sky",
  correction: "rose",
  complete: "sky",
  classified: "sky",
  assigned: "sky",
  reviewing: "amber",
  reviews_complete: "em",
  agenda: "amber",
  decided: "sky",
  active: "em",
  archived: "muted",
};

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function h(date: string, actor: string, action: string, note = ""): HistoryItem {
  return { date, actor, action, note };
}

function docs(mode: "verified" | "uploaded", extra: Partial<Record<string, DocState>> = {}): Doc[] {
  return DOC_DEFS.map((d) => ({
    ...d,
    state: extra[d.code] ?? (mode === "verified" ? "verified" : d.required ? "uploaded" : "missing"),
  }));
}

export function requiredDocsOk(p: Protocol) {
  return p.docs.filter((d) => d.required).every((d) => d.state === "verified");
}

export function stageIndex(status: Status) {
  const i = PIPE.findIndex((s) => s.match.includes(status));
  return i < 0 ? 0 : i;
}

export function reviewDue(p: Protocol) {
  if (!p.assignedOn) return null;
  return addDays(p.assignedOn, 9);
}

export function isOverdue(p: Protocol, reviewer: string) {
  const due = reviewDue(p);
  if (!due) return false;
  if (!["assigned", "reviewing"].includes(p.status)) return false;
  if (p.reviews.some((r) => r.reviewer === reviewer)) return false;
  return due < TODAY;
}

export function myReviewPending(p: Protocol, name: string) {
  return (
    p.reviewers.includes(name) &&
    !p.reviews.some((r) => r.reviewer === name) &&
    (p.status === "assigned" || p.status === "reviewing")
  );
}

export function visibleTo(role: RoleKey, p: Protocol) {
  if (role === "investigator") return p.pi === ROLES.investigator.name;
  return true;
}

export function actorName(role: RoleKey, acting: string) {
  if (role === "reviewer") return acting;
  return ROLES[role].name;
}

export const NAV: { key: ViewKey; label: string; roles: RoleKey[] }[] = [
  { key: "dashboard", label: "Dashboard", roles: ["investigator", "secretariat", "reviewer", "chair", "admin"] },
  { key: "protocols", label: "Protocols", roles: ["investigator", "secretariat", "reviewer", "chair", "admin"] },
  { key: "screening", label: "Screening desk", roles: ["secretariat", "admin"] },
  { key: "reviews", label: "My reviews", roles: ["reviewer"] },
  { key: "committee", label: "Committee", roles: ["chair", "secretariat", "admin"] },
  { key: "safety", label: "Safety reports", roles: ["investigator", "secretariat", "reviewer", "chair", "admin"] },
  { key: "monitor", label: "After clearance", roles: ["investigator", "secretariat", "chair", "admin"] },
  { key: "archive", label: "Archive", roles: ["secretariat", "chair", "admin"] },
  { key: "system", label: "System & audit", roles: ["admin", "secretariat"] },
  { key: "roster", label: "Roles & roster", roles: ["investigator", "secretariat", "reviewer", "chair", "admin"] },
];

const base = (
  partial: Omit<Protocol, "docs" | "letter" | "amendment" | "votes" | "continuingDue" | "decision" | "decisionNote" | "reviewType" | "reviewers" | "reviews" | "assignedOn"> &
    Partial<Protocol>,
): Protocol => ({
  reviewType: null,
  decision: null,
  decisionNote: "",
  votes: null,
  reviewers: [],
  reviews: [],
  docs: docs("verified"),
  continuingDue: null,
  letter: null,
  amendment: null,
  assignedOn: null,
  ...partial,
});

export function seedProtocols(): Protocol[] {
  return [
    base({
      id: "AAPHREML-IRERC-2026-0001",
      title: "Efficacy and safety of artemether–lumefantrine for uncomplicated falciparum malaria in children under five",
      type: "Clinical Trial — Phase III",
      focus: "Communicable diseases",
      category: "Biomedical & Laboratory",
      pi: "Dr. Selam Bekele",
      institution: "Addis Ababa University, College of Health Sciences",
      sponsor: "National Malaria Control Program",
      site: "Selected health centres, Addis Ababa",
      submitted: "2026-01-08",
      status: "archived",
      reviewType: "Full Board Review",
      decision: "Approved",
      decisionNote: "Approved with no modifications. Annual continuing review was completed and the file archived after close-out.",
      votes: { for: 6, against: 0, abstain: 1 },
      reviewers: ["Dr. Yonas Haile", "Dr. Meseret Assefa"],
      reviews: [
        { reviewer: "Dr. Yonas Haile", date: "2026-01-20", recommendation: "Approved", comments: "Risk and benefit are acceptable. Consent is adequate in Amharic and Afaan Oromoo.", conflict: false },
        { reviewer: "Dr. Meseret Assefa", date: "2026-01-21", recommendation: "Approved", comments: "No ethical concerns. The data monitoring plan is adequate.", conflict: false },
      ],
      assignedOn: "2026-01-10",
      continuingDue: null,
      letter: "Clearance was issued on 30 January 2026. The study has since been closed and archived.",
      summary: "Phase III comparison of first-line antimalarial therapy in children under five attending public facilities.",
      consentLanguages: "Amharic, Afaan Oromoo",
      vulnerable: "Children under five — parent or guardian consent",
      history: [
        h("2026-01-08", "Dr. Selam Bekele", "Protocol submitted", "Initial package"),
        h("2026-01-09", "Ms. Meron Tadesse", "Completeness verified", "Checklist complete"),
        h("2026-01-09", "Ms. Meron Tadesse", "Review type classified", "Full Board Review"),
        h("2026-01-10", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Yonas Haile, Dr. Meseret Assefa"),
        h("2026-01-21", "Reviewers", "Assessments completed", "Both recommended approval"),
        h("2026-01-22", "Ms. Meron Tadesse", "Placed on committee agenda", "Meeting 01/2026"),
        h("2026-01-28", "Prof. Almaz Wondimu", "Committee decision recorded", "Approved"),
        h("2026-01-30", "Ms. Meron Tadesse", "Action letter issued", "Clearance active"),
        h("2026-09-12", "Ms. Meron Tadesse", "Study archived", "Close-out accepted"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0002",
      title: "Prevalence and risk factors of hypertension among adults in Addis Ababa: a community survey",
      type: "Observational — Community Survey",
      focus: "Non-communicable diseases",
      category: "Observational / Epidemiological",
      pi: "Dr. Abebe Tesfaye",
      institution: "St. Paul's Hospital Millennium Medical College",
      sponsor: "Addis Ababa Health Bureau",
      site: "Community clusters, Addis Ababa",
      submitted: "2026-09-04",
      status: "agenda",
      reviewType: "Full Board Review",
      reviewers: ["Dr. Solomon Girma", "Dr. Rahel Tesfaye"],
      reviews: [
        { reviewer: "Dr. Solomon Girma", date: "2026-09-18", recommendation: "Approved with minor modification", comments: "Add a referral pathway for participants with elevated blood pressure.", conflict: false },
        { reviewer: "Dr. Rahel Tesfaye", date: "2026-09-19", recommendation: "Approved with minor modification", comments: "Clarify consent for participants who cannot read.", conflict: false },
      ],
      assignedOn: "2026-09-08",
      summary: "Cross-sectional blood pressure survey with immediate referral for urgent readings.",
      consentLanguages: "Amharic",
      vulnerable: "None specifically targeted",
      history: [
        h("2026-09-04", "Dr. Abebe Tesfaye", "Protocol submitted"),
        h("2026-09-05", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-09-05", "Ms. Meron Tadesse", "Review type classified", "Full Board Review"),
        h("2026-09-08", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Solomon Girma, Dr. Rahel Tesfaye"),
        h("2026-09-19", "Reviewers", "Assessments completed"),
        h("2026-10-02", "Ms. Meron Tadesse", "Placed on committee agenda", "Meeting 10/2026"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0003",
      title: "A phase II trial of a novel rotavirus vaccine candidate in infants",
      type: "Clinical Trial — Phase II",
      focus: "Communicable diseases",
      category: "Clinical Trial / Interventional",
      pi: "Dr. Hanna Girma",
      institution: "Armauer Hansen Research Institute",
      sponsor: "International Vaccine Institute (fictitious sponsor)",
      site: "Infant clinics, Addis Ababa",
      submitted: "2026-09-16",
      status: "reviewing",
      reviewType: "Full Board Review",
      reviewers: ["Dr. Yonas Haile", "Dr. Getachew Alemu"],
      reviews: [
        { reviewer: "Dr. Yonas Haile", date: "2026-10-08", recommendation: "Approved with major modification", comments: "Safety monitoring must be strengthened for infants under six weeks.", conflict: false },
      ],
      assignedOn: "2026-09-20",
      summary: "Phase II safety and immunogenicity study in infants, with active SAE surveillance.",
      consentLanguages: "Amharic",
      vulnerable: "Infants — parental consent",
      history: [
        h("2026-09-16", "Dr. Hanna Girma", "Protocol submitted"),
        h("2026-09-17", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-09-18", "Prof. Almaz Wondimu", "Review type classified", "Full Board Review"),
        h("2026-09-20", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Yonas Haile, Dr. Getachew Alemu"),
        h("2026-10-08", "Dr. Yonas Haile", "Assessment submitted", "Approved with major modification"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0004",
      title: "Whole-genome sequencing of drug-resistant Mycobacterium tuberculosis isolates",
      type: "Genetic Study — Stored Specimens",
      focus: "Biomedical / laboratory research",
      category: "Biomedical & Laboratory",
      pi: "Dr. Dawit Mekonnen",
      institution: "Black Lion Hospital, Department of Internal Medicine",
      sponsor: "Ethiopian Public Health Institute",
      site: "EPHI tuberculosis reference laboratory",
      submitted: "2026-10-06",
      status: "assigned",
      reviewType: "Full Board Review",
      reviewers: ["Dr. Meseret Assefa", "Ato Mulugeta Bekele"],
      assignedOn: "2026-10-09",
      summary: "Sequencing of stored isolates with a separate biobank consent and coded linkage.",
      consentLanguages: "Amharic",
      vulnerable: "People with tuberculosis — coded specimens",
      history: [
        h("2026-10-06", "Dr. Dawit Mekonnen", "Protocol submitted", "Separate biobank consent included"),
        h("2026-10-07", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-10-07", "Ms. Meron Tadesse", "Review type classified", "Full Board Review"),
        h("2026-10-09", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Meseret Assefa, Ato Mulugeta Bekele"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0005",
      title: "Evaluation of a portable ECG monitor for community cardiovascular screening",
      type: "Medical Device Study — NSR",
      focus: "Non-communicable diseases",
      category: "Clinical Trial / Interventional",
      pi: "Dr. Tigist Alemu",
      institution: "Addis Ababa Health Bureau, Non-Communicable Disease Unit",
      sponsor: "MedTech East Africa (fictitious)",
      site: "NCD screening posts",
      submitted: "2026-10-18",
      status: "assigned",
      reviewType: "Expedited Review",
      reviewers: ["Dr. Yonas Haile"],
      assignedOn: "2026-10-22",
      docs: docs("verified"),
      summary: "Non-significant-risk device study comparing a portable ECG with standard clinic measurement.",
      consentLanguages: "Amharic",
      vulnerable: "Adults with possible heart disease — referral pathway required",
      history: [
        h("2026-10-18", "Dr. Tigist Alemu", "Protocol submitted", "Device description and risk assessment attached"),
        h("2026-10-20", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-10-21", "Ms. Meron Tadesse", "Review type classified", "Expedited Review — non-significant risk device"),
        h("2026-10-22", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Yonas Haile"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0006",
      title: "Impact of a community nutrition intervention on child stunting in peri-urban districts",
      type: "Community Intervention",
      focus: "Food and nutrition",
      category: "Public Health & Health Systems",
      pi: "Dr. Selam Bekele",
      institution: "Addis Ababa University, School of Public Health",
      sponsor: "UNICEF Ethiopia (fictitious programme link)",
      site: "Peri-urban woredas",
      submitted: "2026-10-24",
      status: "submitted",
      docs: docs("uploaded", { DOC_ETHICS_CERT: "missing", DOC_INST_SUPPORT: "missing" }),
      summary: "Cluster intervention measuring stunting after a community nutrition package.",
      consentLanguages: "Amharic",
      vulnerable: "Children — caregiver consent",
      history: [h("2026-10-24", "Dr. Selam Bekele", "Protocol submitted", "Awaiting secretariat screening")],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0007",
      title: "Post-marketing surveillance of antiretroviral therapy adherence in Addis Ababa health centres",
      type: "Observational — Cohort",
      focus: "Communicable diseases",
      category: "Observational / Epidemiological",
      pi: "Dr. Abebe Tesfaye",
      institution: "St. Paul's Hospital Millennium Medical College",
      sponsor: "Ministry of Health",
      site: "ART clinics",
      submitted: "2026-08-12",
      status: "decided",
      reviewType: "Full Board Review",
      decision: "Approved with Conditions",
      decisionNote: "Revise the consent form to include the IRERC secretariat contact and the appeal route.",
      votes: { for: 5, against: 0, abstain: 1 },
      reviewers: ["Dr. Rahel Tesfaye", "Dr. Solomon Girma"],
      reviews: [
        { reviewer: "Dr. Rahel Tesfaye", date: "2026-08-28", recommendation: "Approved with minor modification", comments: "Consent form is missing IRERC contact information.", conflict: false },
        { reviewer: "Dr. Solomon Girma", date: "2026-08-29", recommendation: "Approved with minor modification", comments: "Agrees with the primary reviewer.", conflict: false },
      ],
      assignedOn: "2026-08-16",
      summary: "Cohort of people on ART assessing adherence and retention.",
      consentLanguages: "Amharic",
      vulnerable: "People living with HIV — confidentiality is central",
      history: [
        h("2026-08-12", "Dr. Abebe Tesfaye", "Protocol submitted"),
        h("2026-08-13", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-08-14", "Ms. Meron Tadesse", "Review type classified", "Full Board Review"),
        h("2026-08-16", "Ms. Meron Tadesse", "Reviewers assigned"),
        h("2026-08-29", "Reviewers", "Assessments completed"),
        h("2026-09-10", "Ms. Meron Tadesse", "Placed on committee agenda"),
        h("2026-10-16", "Prof. Almaz Wondimu", "Committee decision recorded", "Approved with Conditions"),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0008",
      title: "Lived experience of perinatal mental health care in Addis Ababa public hospitals",
      type: "Socio-behavioral Study",
      focus: "Mental health and well-being",
      category: "Socio-behavioral & Qualitative",
      pi: "Dr. Selam Bekele",
      institution: "Addis Ababa University, School of Public Health",
      sponsor: "Addis Ababa Health Bureau",
      site: "Three public hospitals",
      submitted: "2026-10-01",
      status: "correction",
      docs: docs("verified", { DOC_CONSENT: "correction", DOC_PIS: "correction" }),
      summary: "Qualitative interviews with women receiving perinatal mental health care.",
      consentLanguages: "Amharic — translation still under revision",
      vulnerable: "Pregnant and postpartum women",
      history: [
        h("2026-10-01", "Dr. Selam Bekele", "Protocol submitted"),
        h("2026-10-03", "Ms. Meron Tadesse", "Administrative check started"),
        h("2026-10-04", "Ms. Meron Tadesse", "Returned for correction", "Consent and information sheet need plainer Amharic and a distress protocol."),
      ],
    }),
    base({
      id: "AAPHREML-IRERC-2026-0009",
      title: "Household water treatment and diarrhoeal disease in two Addis Ababa sub-cities",
      type: "Observational — Community Survey",
      focus: "Water, Sanitation & Hygiene",
      category: "Environmental & Occupational Health",
      pi: "Dr. Selam Bekele",
      institution: "Addis Ababa University, School of Public Health",
      sponsor: "AACAHB Public Health Emergency Directorate",
      site: "Two sub-cities",
      submitted: "2026-02-11",
      status: "active",
      reviewType: "Full Board Review",
      decision: "Approved",
      decisionNote: "Approved. Continuing review is due in November 2026.",
      votes: { for: 6, against: 0, abstain: 0 },
      reviewers: ["Dr. Solomon Girma", "W/ro Hirut Desta"],
      reviews: [
        { reviewer: "Dr. Solomon Girma", date: "2026-02-24", recommendation: "Approved", comments: "Community referral for dehydration is described.", conflict: false },
        { reviewer: "W/ro Hirut Desta", date: "2026-02-25", recommendation: "Approved", comments: "Lay review: the information sheet is understandable.", conflict: false },
      ],
      assignedOn: "2026-02-14",
      continuingDue: "2026-11-12",
      letter: "Your protocol was approved on 4 March 2026. Continuing review is due on 12 November 2026. Submit any amendment before you implement it.",
      summary: "Household survey of water treatment practices and reported diarrhoea.",
      consentLanguages: "Amharic",
      vulnerable: "Households with young children",
      history: [
        h("2026-02-11", "Dr. Selam Bekele", "Protocol submitted"),
        h("2026-02-12", "Ms. Meron Tadesse", "Completeness verified"),
        h("2026-02-13", "Ms. Meron Tadesse", "Review type classified", "Full Board Review"),
        h("2026-02-14", "Ms. Meron Tadesse", "Reviewers assigned"),
        h("2026-02-25", "Reviewers", "Assessments completed"),
        h("2026-03-02", "Ms. Meron Tadesse", "Placed on committee agenda"),
        h("2026-03-04", "Prof. Almaz Wondimu", "Committee decision recorded", "Approved"),
        h("2026-03-06", "Ms. Meron Tadesse", "Action letter issued", "Continuing review 2026-11-12"),
      ],
    }),
  ];
}

export function seedSafety(): SafetyReport[] {
  return [
    {
      id: "SAE-001",
      protocolId: "AAPHREML-IRERC-2026-0001",
      event: "Severe anaemia requiring transfusion",
      date: "2026-02-14",
      relatedness: "Possibly related",
      seriousness: "Hospitalization",
      status: "Reviewed — No further action",
      note: "Consistent with background malaria. No protocol change.",
    },
    {
      id: "SAE-002",
      protocolId: "AAPHREML-IRERC-2026-0003",
      event: "Febrile seizure in a six-week-old infant",
      date: "2026-10-02",
      relatedness: "Probably related",
      seriousness: "Life-threatening",
      status: "Pending review",
      note: "",
    },
    {
      id: "SAE-003",
      protocolId: "AAPHREML-IRERC-2026-0003",
      event: "Suspected intussusception",
      date: "2026-10-11",
      relatedness: "Unknown",
      seriousness: "Hospitalization",
      status: "Pending review",
      note: "",
    },
    {
      id: "AE-004",
      protocolId: "AAPHREML-IRERC-2026-0002",
      event: "Hypertensive urgency found at screening",
      date: "2026-10-05",
      relatedness: "Not related",
      seriousness: "Non-serious",
      status: "Reviewed — No further action",
      note: "Participant referred the same day.",
    },
  ];
}

export const MONTHS = [
  { label: "May", n: 2 },
  { label: "Jun", n: 3 },
  { label: "Jul", n: 2 },
  { label: "Aug", n: 4 },
  { label: "Sep", n: 5 },
  { label: "Oct", n: 4 },
];

export function nextProtocolId(list: Protocol[]) {
  const n = list.reduce((max, p) => {
    const m = /(\d+)$/.exec(p.id);
    return Math.max(max, m ? Number(m[1]) : 0);
  }, 0);
  return `AAPHREML-IRERC-2026-${String(n + 1).padStart(4, "0")}`;
}

export function clone<T>(v: T): T {
  return structuredClone(v);
}
