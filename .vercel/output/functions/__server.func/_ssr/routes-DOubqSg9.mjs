import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Settings, c as RotateCcw, d as LogOut, f as LayoutDashboard, g as Activity, h as Archive, i as ShieldAlert, l as PenLine, m as ClipboardCheck, n as Users, o as Search, p as Files, s as Scale, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DOubqSg9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TODAY = "2026-10-30";
var ROLES = {
	investigator: {
		name: "Dr. Selam Bekele",
		title: "Investigator / PI",
		initials: "SB",
		blurb: "Submits protocols, amendments, safety reports, and continuing review."
	},
	secretariat: {
		name: "Ms. Meron Tadesse",
		title: "IRERC Secretariat",
		initials: "MT",
		blurb: "Receives, screens, assigns, schedules, communicates, and archives. No decision authority."
	},
	reviewer: {
		name: "Dr. Yonas Haile",
		title: "IRERC Member / Reviewer",
		initials: "YH",
		blurb: "Completes the 20-point assessment for assigned protocols only."
	},
	chair: {
		name: "Prof. Almaz Wondimu",
		title: "Chairperson",
		initials: "AW",
		blurb: "Chairs meetings, records the committee decision, and signs expedited items."
	},
	admin: {
		name: "System Administrator",
		title: "Digital system support",
		initials: "SA",
		blurb: "Access control, audit, and document control. No independent decision authority."
	}
};
var MEMBERS = [
	{
		name: "Prof. Almaz Wondimu",
		category: "Public Health Expert",
		seat: "Chairperson",
		institution: "AACAHB",
		lay: false
	},
	{
		name: "Dr. Yonas Haile",
		category: "Clinical Expert",
		seat: "Member",
		institution: "Tikur Anbessa Specialized Hospital",
		lay: false
	},
	{
		name: "Dr. Meseret Assefa",
		category: "Laboratory Scientist",
		seat: "Member",
		institution: "Ethiopian Public Health Institute",
		lay: false
	},
	{
		name: "Dr. Solomon Girma",
		category: "Public Health Expert",
		seat: "Member",
		institution: "AAU School of Public Health",
		lay: false
	},
	{
		name: "Dr. Rahel Tesfaye",
		category: "Ethics / Legal Expert",
		seat: "Member",
		institution: "AAU School of Law",
		lay: false
	},
	{
		name: "Dr. Getachew Alemu",
		category: "Clinical Expert",
		seat: "Member",
		institution: "St. Paul's Hospital MMC",
		lay: false
	},
	{
		name: "Ato Mulugeta Bekele",
		category: "Community Representative",
		seat: "Lay member",
		institution: "Addis Ababa community seat",
		lay: true
	},
	{
		name: "W/ro Hirut Desta",
		category: "Community Representative",
		seat: "Lay member",
		institution: "Addis Ababa community seat",
		lay: true
	}
];
var REVIEWER_POOL = MEMBERS.filter((m) => m.seat === "Member" || m.seat === "Lay member");
var DOC_DEFS = [
	{
		code: "DOC_PROTOCOL",
		name: "Research Protocol",
		required: true
	},
	{
		code: "DOC_CONSENT",
		name: "Informed Consent Form",
		required: true
	},
	{
		code: "DOC_TOOLS",
		name: "Data Collection Tools",
		required: true
	},
	{
		code: "DOC_PIS",
		name: "Participant Information Sheet",
		required: true
	},
	{
		code: "DOC_CV",
		name: "Investigator CV",
		required: true
	},
	{
		code: "DOC_ETHICS_CERT",
		name: "Ethical Training Certificate",
		required: true
	},
	{
		code: "DOC_BUDGET",
		name: "Detailed Budget",
		required: true
	},
	{
		code: "DOC_TIMELINE",
		name: "Study Timeline & Workplan",
		required: true
	},
	{
		code: "DOC_INST_SUPPORT",
		name: "Institutional Support Letter",
		required: false
	},
	{
		code: "DOC_OTHER",
		name: "Other Attachments",
		required: false
	}
];
var CRITERIA = [
	{
		code: "CRIT_01",
		section: "Science",
		question: "Is the research rationale clearly described and scientifically sound?"
	},
	{
		code: "CRIT_02",
		section: "Science",
		question: "Is the study design appropriate to the stated objectives?"
	},
	{
		code: "CRIT_03",
		section: "Science",
		question: "Is the sample size justified?"
	},
	{
		code: "CRIT_04",
		section: "Science",
		question: "Are inclusion and exclusion criteria clear and fair?"
	},
	{
		code: "CRIT_05",
		section: "Science",
		question: "Are data collection tools and procedures appropriate?"
	},
	{
		code: "CRIT_06",
		section: "Science",
		question: "Are data verification and quality controls adequate?"
	},
	{
		code: "CRIT_07",
		section: "Consent",
		question: "Is informed consent voluntary, comprehensible, and properly documented?"
	},
	{
		code: "CRIT_08",
		section: "Consent",
		question: "Are information sheets and consent forms accurate in local languages?"
	},
	{
		code: "CRIT_09",
		section: "Risk",
		question: "Are physical, psychological, social, and legal risks identified and minimized?"
	},
	{
		code: "CRIT_10",
		section: "Risk",
		question: "Are risks reasonable relative to anticipated benefits?"
	},
	{
		code: "CRIT_11",
		section: "Risk",
		question: "Are vulnerable participants adequately safeguarded?"
	},
	{
		code: "CRIT_12",
		section: "Protection",
		question: "Are privacy, de-identification, and confidentiality provisions adequate?"
	},
	{
		code: "CRIT_13",
		section: "Protection",
		question: "Is compensation fair and non-coercive?"
	},
	{
		code: "CRIT_14",
		section: "Protection",
		question: "Are investigator qualifications and ethics training documented?"
	},
	{
		code: "CRIT_15",
		section: "Protection",
		question: "Are the proposed sites adequate?"
	},
	{
		code: "CRIT_16",
		section: "Oversight",
		question: "Is community engagement or local dissemination planned?"
	},
	{
		code: "CRIT_17",
		section: "Oversight",
		question: "Are conflicts of interest disclosed and managed?"
	},
	{
		code: "CRIT_18",
		section: "Oversight",
		question: "Is the timeline feasible?"
	},
	{
		code: "CRIT_19",
		section: "Oversight",
		question: "Is the budget itemized and free of coercive inducements?"
	},
	{
		code: "CRIT_20",
		section: "Oversight",
		question: "Does the study meet Ethiopian research guidance and the Declaration of Helsinki?"
	}
];
var SECTIONS = [
	"Science",
	"Consent",
	"Risk",
	"Protection",
	"Oversight"
];
var FOCUS_TO_CATEGORY = {
	"Communicable diseases": "Biomedical & Laboratory",
	"Non-communicable diseases": "Clinical Trial / Interventional",
	"Reproductive, maternal, newborn, and child health": "Observational / Epidemiological",
	"Food and nutrition": "Public Health & Health Systems",
	"Neglected tropical diseases": "Biomedical & Laboratory",
	"Water, Sanitation & Hygiene": "Environmental & Occupational Health",
	"Mental health and well-being": "Socio-behavioral & Qualitative",
	"Environmental and workplace health": "Environmental & Occupational Health",
	"Health systems and services": "Health Systems & Policy",
	"Biomedical / laboratory research": "Biomedical & Laboratory"
};
var CATEGORY_EXPERTISE = {
	"Biomedical & Laboratory": "Laboratory Scientist",
	"Clinical Trial / Interventional": "Clinical Expert",
	"Observational / Epidemiological": "Public Health Expert",
	"Public Health & Health Systems": "Public Health Expert",
	"Environmental & Occupational Health": "Environmental Health Professional",
	"Health Systems & Policy": "Public Health Expert",
	"Socio-behavioral & Qualitative": "Ethics / Legal Expert"
};
var STUDY_TYPES = [
	"Clinical Trial — Phase I",
	"Clinical Trial — Phase II",
	"Clinical Trial — Phase III",
	"Observational — Cohort",
	"Observational — Community Survey",
	"Genetic Study — Stored Specimens",
	"Medical Device Study — NSR",
	"Medical Device Study — SR",
	"Community Intervention",
	"Socio-behavioral Study"
];
var DECISIONS = [
	"Approved",
	"Approved with Conditions",
	"Modifications Required",
	"Deferred",
	"Not Approved"
];
var RECOMMENDATIONS = [
	"Approved",
	"Approved with minor modification",
	"Approved with major modification",
	"Not Approved"
];
var PIPE = [
	{
		key: "in",
		label: "Submitted",
		match: ["submitted"]
	},
	{
		key: "screen",
		label: "Screening",
		match: ["screening", "correction"]
	},
	{
		key: "class",
		label: "Classified",
		match: ["complete", "classified"]
	},
	{
		key: "assign",
		label: "Assigned",
		match: ["assigned"]
	},
	{
		key: "review",
		label: "Review",
		match: ["reviewing", "reviews_complete"]
	},
	{
		key: "agenda",
		label: "Agenda",
		match: ["agenda"]
	},
	{
		key: "decide",
		label: "Decision",
		match: ["decided"]
	},
	{
		key: "live",
		label: "Clearance",
		match: ["active", "archived"]
	}
];
var STATUS_LABEL = {
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
	archived: "Archived"
};
var STATUS_TONE = {
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
	archived: "muted"
};
function addDays(iso, days) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + days);
	return d.toISOString().slice(0, 10);
}
function h(date, actor, action, note = "") {
	return {
		date,
		actor,
		action,
		note
	};
}
function docs(mode, extra = {}) {
	return DOC_DEFS.map((d) => ({
		...d,
		state: extra[d.code] ?? (mode === "verified" ? "verified" : d.required ? "uploaded" : "missing")
	}));
}
function requiredDocsOk(p) {
	return p.docs.filter((d) => d.required).every((d) => d.state === "verified");
}
function stageIndex(status) {
	const i = PIPE.findIndex((s) => s.match.includes(status));
	return i < 0 ? 0 : i;
}
function reviewDue(p) {
	if (!p.assignedOn) return null;
	return addDays(p.assignedOn, 9);
}
function isOverdue(p, reviewer) {
	const due = reviewDue(p);
	if (!due) return false;
	if (!["assigned", "reviewing"].includes(p.status)) return false;
	if (p.reviews.some((r) => r.reviewer === reviewer)) return false;
	return due < TODAY;
}
function myReviewPending(p, name) {
	return p.reviewers.includes(name) && !p.reviews.some((r) => r.reviewer === name) && (p.status === "assigned" || p.status === "reviewing");
}
function visibleTo(role, p) {
	if (role === "investigator") return p.pi === ROLES.investigator.name;
	return true;
}
function actorName(role, acting) {
	if (role === "reviewer") return acting;
	return ROLES[role].name;
}
var NAV = [
	{
		key: "dashboard",
		label: "Dashboard",
		roles: [
			"investigator",
			"secretariat",
			"reviewer",
			"chair",
			"admin"
		]
	},
	{
		key: "protocols",
		label: "Protocols",
		roles: [
			"investigator",
			"secretariat",
			"reviewer",
			"chair",
			"admin"
		]
	},
	{
		key: "screening",
		label: "Screening desk",
		roles: ["secretariat", "admin"]
	},
	{
		key: "reviews",
		label: "My reviews",
		roles: ["reviewer"]
	},
	{
		key: "committee",
		label: "Committee",
		roles: [
			"chair",
			"secretariat",
			"admin"
		]
	},
	{
		key: "safety",
		label: "Safety reports",
		roles: [
			"investigator",
			"secretariat",
			"reviewer",
			"chair",
			"admin"
		]
	},
	{
		key: "monitor",
		label: "After clearance",
		roles: [
			"investigator",
			"secretariat",
			"chair",
			"admin"
		]
	},
	{
		key: "archive",
		label: "Archive",
		roles: [
			"secretariat",
			"chair",
			"admin"
		]
	},
	{
		key: "system",
		label: "System & audit",
		roles: ["admin", "secretariat"]
	},
	{
		key: "roster",
		label: "Roles & roster",
		roles: [
			"investigator",
			"secretariat",
			"reviewer",
			"chair",
			"admin"
		]
	}
];
var base = (partial) => ({
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
	...partial
});
function seedProtocols() {
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
			votes: {
				for: 6,
				against: 0,
				abstain: 1
			},
			reviewers: ["Dr. Yonas Haile", "Dr. Meseret Assefa"],
			reviews: [{
				reviewer: "Dr. Yonas Haile",
				date: "2026-01-20",
				recommendation: "Approved",
				comments: "Risk and benefit are acceptable. Consent is adequate in Amharic and Afaan Oromoo.",
				conflict: false
			}, {
				reviewer: "Dr. Meseret Assefa",
				date: "2026-01-21",
				recommendation: "Approved",
				comments: "No ethical concerns. The data monitoring plan is adequate.",
				conflict: false
			}],
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
				h("2026-09-12", "Ms. Meron Tadesse", "Study archived", "Close-out accepted")
			]
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
			reviews: [{
				reviewer: "Dr. Solomon Girma",
				date: "2026-09-18",
				recommendation: "Approved with minor modification",
				comments: "Add a referral pathway for participants with elevated blood pressure.",
				conflict: false
			}, {
				reviewer: "Dr. Rahel Tesfaye",
				date: "2026-09-19",
				recommendation: "Approved with minor modification",
				comments: "Clarify consent for participants who cannot read.",
				conflict: false
			}],
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
				h("2026-10-02", "Ms. Meron Tadesse", "Placed on committee agenda", "Meeting 10/2026")
			]
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
			reviews: [{
				reviewer: "Dr. Yonas Haile",
				date: "2026-10-08",
				recommendation: "Approved with major modification",
				comments: "Safety monitoring must be strengthened for infants under six weeks.",
				conflict: false
			}],
			assignedOn: "2026-09-20",
			summary: "Phase II safety and immunogenicity study in infants, with active SAE surveillance.",
			consentLanguages: "Amharic",
			vulnerable: "Infants — parental consent",
			history: [
				h("2026-09-16", "Dr. Hanna Girma", "Protocol submitted"),
				h("2026-09-17", "Ms. Meron Tadesse", "Completeness verified"),
				h("2026-09-18", "Prof. Almaz Wondimu", "Review type classified", "Full Board Review"),
				h("2026-09-20", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Yonas Haile, Dr. Getachew Alemu"),
				h("2026-10-08", "Dr. Yonas Haile", "Assessment submitted", "Approved with major modification")
			]
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
				h("2026-10-09", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Meseret Assefa, Ato Mulugeta Bekele")
			]
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
				h("2026-10-22", "Ms. Meron Tadesse", "Reviewers assigned", "Dr. Yonas Haile")
			]
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
			docs: docs("uploaded", {
				DOC_ETHICS_CERT: "missing",
				DOC_INST_SUPPORT: "missing"
			}),
			summary: "Cluster intervention measuring stunting after a community nutrition package.",
			consentLanguages: "Amharic",
			vulnerable: "Children — caregiver consent",
			history: [h("2026-10-24", "Dr. Selam Bekele", "Protocol submitted", "Awaiting secretariat screening")]
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
			votes: {
				for: 5,
				against: 0,
				abstain: 1
			},
			reviewers: ["Dr. Rahel Tesfaye", "Dr. Solomon Girma"],
			reviews: [{
				reviewer: "Dr. Rahel Tesfaye",
				date: "2026-08-28",
				recommendation: "Approved with minor modification",
				comments: "Consent form is missing IRERC contact information.",
				conflict: false
			}, {
				reviewer: "Dr. Solomon Girma",
				date: "2026-08-29",
				recommendation: "Approved with minor modification",
				comments: "Agrees with the primary reviewer.",
				conflict: false
			}],
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
				h("2026-10-16", "Prof. Almaz Wondimu", "Committee decision recorded", "Approved with Conditions")
			]
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
			docs: docs("verified", {
				DOC_CONSENT: "correction",
				DOC_PIS: "correction"
			}),
			summary: "Qualitative interviews with women receiving perinatal mental health care.",
			consentLanguages: "Amharic — translation still under revision",
			vulnerable: "Pregnant and postpartum women",
			history: [
				h("2026-10-01", "Dr. Selam Bekele", "Protocol submitted"),
				h("2026-10-03", "Ms. Meron Tadesse", "Administrative check started"),
				h("2026-10-04", "Ms. Meron Tadesse", "Returned for correction", "Consent and information sheet need plainer Amharic and a distress protocol.")
			]
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
			votes: {
				for: 6,
				against: 0,
				abstain: 0
			},
			reviewers: ["Dr. Solomon Girma", "W/ro Hirut Desta"],
			reviews: [{
				reviewer: "Dr. Solomon Girma",
				date: "2026-02-24",
				recommendation: "Approved",
				comments: "Community referral for dehydration is described.",
				conflict: false
			}, {
				reviewer: "W/ro Hirut Desta",
				date: "2026-02-25",
				recommendation: "Approved",
				comments: "Lay review: the information sheet is understandable.",
				conflict: false
			}],
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
				h("2026-03-06", "Ms. Meron Tadesse", "Action letter issued", "Continuing review 2026-11-12")
			]
		})
	];
}
function seedSafety() {
	return [
		{
			id: "SAE-001",
			protocolId: "AAPHREML-IRERC-2026-0001",
			event: "Severe anaemia requiring transfusion",
			date: "2026-02-14",
			relatedness: "Possibly related",
			seriousness: "Hospitalization",
			status: "Reviewed — No further action",
			note: "Consistent with background malaria. No protocol change."
		},
		{
			id: "SAE-002",
			protocolId: "AAPHREML-IRERC-2026-0003",
			event: "Febrile seizure in a six-week-old infant",
			date: "2026-10-02",
			relatedness: "Probably related",
			seriousness: "Life-threatening",
			status: "Pending review",
			note: ""
		},
		{
			id: "SAE-003",
			protocolId: "AAPHREML-IRERC-2026-0003",
			event: "Suspected intussusception",
			date: "2026-10-11",
			relatedness: "Unknown",
			seriousness: "Hospitalization",
			status: "Pending review",
			note: ""
		},
		{
			id: "AE-004",
			protocolId: "AAPHREML-IRERC-2026-0002",
			event: "Hypertensive urgency found at screening",
			date: "2026-10-05",
			relatedness: "Not related",
			seriousness: "Non-serious",
			status: "Reviewed — No further action",
			note: "Participant referred the same day."
		}
	];
}
var MONTHS = [
	{
		label: "May",
		n: 2
	},
	{
		label: "Jun",
		n: 3
	},
	{
		label: "Jul",
		n: 2
	},
	{
		label: "Aug",
		n: 4
	},
	{
		label: "Sep",
		n: 5
	},
	{
		label: "Oct",
		n: 4
	}
];
function nextProtocolId(list) {
	const n = list.reduce((max, p) => {
		const m = /(\d+)$/.exec(p.id);
		return Math.max(max, m ? Number(m[1]) : 0);
	}, 0);
	return `AAPHREML-IRERC-2026-${String(n + 1).padStart(4, "0")}`;
}
var toastSeq = 1;
function toastOf(msg, kind = "ok") {
	return {
		id: ++toastSeq,
		msg,
		kind
	};
}
var useIrerc = create()(persist((set, get) => {
	const push = (msg, kind = "ok") => {
		const t = toastOf(msg, kind);
		set((s) => ({ toasts: [...s.toasts, t] }));
		setTimeout(() => get().dismissToast(t.id), 3600);
	};
	const patch = (id, fn) => {
		set((s) => ({ protocols: s.protocols.map((p) => p.id === id ? fn(p) : p) }));
	};
	const actor = () => {
		const s = get();
		return s.role ? actorName(s.role, s.actingReviewer) : "System";
	};
	const note = (p, action, extra = "") => ({
		...p,
		history: [...p.history, h(TODAY, actor(), action, extra)]
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
				actingReviewer: role === "reviewer" ? "Dr. Yonas Haile" : get().actingReviewer
			});
			push(`Signed in as ${ROLES[role].title}`);
		},
		logout: () => set({
			role: null,
			modal: null,
			navOpen: false,
			view: "dashboard"
		}),
		resetDemo: () => {
			set({
				protocols: seedProtocols(),
				safety: seedSafety(),
				view: "dashboard",
				selectedId: null,
				filter: "all",
				query: "",
				modal: null,
				celebrate: 0
			});
			push("Demonstration records restored");
		},
		go: (view) => set({
			view,
			navOpen: false
		}),
		openProtocol: (id) => {
			const view = get().view;
			set({
				selectedId: id,
				view: "detail",
				returnView: view === "detail" ? get().returnView : view,
				navOpen: false
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
			const protocol = {
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
					state: attached.has(d.code) ? "uploaded" : "missing"
				})),
				history: [h(TODAY, actor(), "Protocol submitted", "Submitted in the review workspace")],
				summary: input.summary.trim(),
				consentLanguages: input.consentLanguages.trim() || "—",
				vulnerable: input.vulnerable.trim() || "—",
				continuingDue: null,
				letter: null,
				amendment: null,
				assignedOn: null
			};
			set((s) => ({
				protocols: [protocol, ...s.protocols],
				modal: null,
				selectedId: id,
				view: "detail",
				returnView: "protocols"
			}));
			push("Protocol submitted — awaiting secretariat screening");
		},
		startScreening: (id) => {
			patch(id, (p) => {
				if (p.status !== "submitted") return p;
				return note({
					...p,
					status: "screening"
				}, "Administrative check started");
			});
			push("Administrative check started");
		},
		setDoc: (id, code, state) => {
			patch(id, (p) => ({
				...p,
				docs: p.docs.map((d) => d.code === code ? {
					...d,
					state
				} : d)
			}));
		},
		passScreening: (id) => {
			const p = get().protocols.find((x) => x.id === id);
			if (!p) return;
			if (!requiredDocsOk(p)) {
				push("Verify every required document before completing screening", "warn");
				return;
			}
			patch(id, (row) => note({
				...row,
				status: "complete"
			}, "Completeness verified", "All required documents verified"));
			push("Submission marked complete");
		},
		returnForCorrection: (id, noteText) => {
			const text = noteText.trim();
			if (!text) {
				push("Say what must be corrected", "warn");
				return;
			}
			patch(id, (p) => note({
				...p,
				status: "correction"
			}, "Returned for correction", text));
			set({ modal: null });
			push("Returned to the investigator");
		},
		resubmit: (id) => {
			patch(id, (p) => note({
				...p,
				status: "screening",
				docs: p.docs.map((d) => d.state === "correction" ? {
					...d,
					state: "uploaded"
				} : d)
			}, "Corrected package resubmitted"));
			push("Resubmitted for screening");
		},
		classify: (id, reviewType) => {
			patch(id, (p) => {
				const status = p.status === "complete" || p.status === "classified" ? "classified" : p.status;
				return note({
					...p,
					reviewType,
					status
				}, "Review type classified", reviewType);
			});
			set({ modal: null });
			push(`Classified as ${reviewType}`);
		},
		assignReviewers: (id, names) => {
			const p = get().protocols.find((x) => x.id === id);
			if (!p) return;
			const min = p.reviewType === "Full Board Review" ? 2 : 1;
			if (names.length < min) {
				push(p.reviewType === "Full Board Review" ? "Full board review needs at least two reviewers, including a lay member when possible" : "Select at least one reviewer", "warn");
				return;
			}
			const lay = names.some((n) => n.startsWith("Ato ") || n.startsWith("W/ro "));
			patch(id, (row) => note({
				...row,
				reviewers: names,
				status: "assigned",
				assignedOn: TODAY,
				reviews: []
			}, "Reviewers assigned", names.join(", ")));
			set({ modal: null });
			push(lay ? "Reviewers assigned" : "Assigned — consider adding a lay member", lay ? "ok" : "warn");
		},
		placeOnAgenda: (id) => {
			patch(id, (p) => note({
				...p,
				status: "agenda"
			}, "Placed on committee agenda", "Meeting 10/2026"));
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
				const reviews = [...p.reviews, {
					reviewer: who,
					date: TODAY,
					recommendation,
					comments: comments.trim(),
					conflict: false
				}];
				let status = p.status === "assigned" ? "reviewing" : p.status;
				let history = [...p.history, h(TODAY, who, "Assessment submitted", recommendation)];
				if (p.reviewers.length > 0 && reviews.length >= p.reviewers.length) {
					status = "reviews_complete";
					advanced = true;
					history = [...history, h(TODAY, "System", "All assigned assessments received", "Ready for the committee agenda. The system does not decide.")];
				}
				return {
					...p,
					reviews,
					status,
					history
				};
			});
			set({ modal: null });
			push(advanced ? "Assessment submitted — file is ready for agenda" : "Assessment submitted");
		},
		saveDecision: (id, decision, noteText, votes) => {
			if (votes.for + votes.against + votes.abstain < 4) {
				push("Quorum is not met — at least half the committee must vote", "warn");
				return;
			}
			if (!decision) {
				push("Choose a decision", "warn");
				return;
			}
			patch(id, (p) => note({
				...p,
				decision,
				decisionNote: noteText.trim(),
				votes,
				status: "decided"
			}, "Committee decision recorded", `${decision} · ${votes.for} for, ${votes.against} against, ${votes.abstain} abstained`));
			const approved = decision.startsWith("Approved");
			set((s) => ({
				modal: null,
				celebrate: approved ? s.celebrate + 1 : s.celebrate
			}));
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
			let status = "archived";
			let due = null;
			let action = "Action letter issued";
			if (p.decision === "Approved" || p.decision === "Approved with Conditions") {
				status = "active";
				due = continuingDue || addDays("2026-10-30", 365);
				action = "Action letter issued — clearance active";
			} else if (p.decision === "Modifications Required" || p.decision === "Deferred") {
				status = "correction";
				action = "Action letter issued — returned to the investigator";
			}
			patch(id, (row) => note({
				...row,
				status,
				continuingDue: due,
				letter: text
			}, action, due ? `Continuing review ${due}` : row.decision || ""));
			const celebrate = status === "active";
			set((s) => ({
				modal: null,
				celebrate: celebrate ? s.celebrate + 1 : s.celebrate
			}));
			push(status === "active" ? "Clearance letter sent" : "Action letter sent");
		},
		reviewSafety: (id, action, noteText) => {
			set((s) => ({
				safety: s.safety.map((r) => r.id === id ? {
					...r,
					status: `Reviewed — ${action}`,
					note: noteText.trim()
				} : r),
				modal: null
			}));
			const report = get().safety.find((r) => r.id === id);
			if (report) patch(report.protocolId, (p) => note(p, "Safety report reviewed", `${report.id}: ${action}`));
			push("Safety action recorded");
		},
		fileSae: (protocolId, event, relatedness, seriousness) => {
			if (!event.trim()) {
				push("Describe the event", "warn");
				return;
			}
			const n = get().safety.length + 1;
			const id = `SAE-${String(n).padStart(3, "0")}`;
			const report = {
				id,
				protocolId,
				event: event.trim(),
				date: TODAY,
				relatedness,
				seriousness,
				status: "Pending review",
				note: ""
			};
			set((s) => ({
				safety: [report, ...s.safety],
				modal: null
			}));
			patch(protocolId, (p) => note(p, "Safety report filed", `${id}: ${event.trim()}`));
			push("Safety report filed for committee review");
		},
		fileAmendment: (id, summary) => {
			if (!summary.trim()) {
				push("Describe the amendment", "warn");
				return;
			}
			patch(id, (p) => note({
				...p,
				amendment: {
					summary: summary.trim(),
					date: TODAY,
					status: "Pending review"
				}
			}, "Amendment submitted", "Not to be implemented before approval"));
			set({ modal: null });
			push("Amendment submitted to the secretariat");
		},
		decideAmendment: (id, approved) => {
			patch(id, (p) => {
				if (!p.amendment) return p;
				return note({
					...p,
					amendment: {
						...p.amendment,
						status: approved ? "Approved" : "Not approved"
					}
				}, approved ? "Amendment approved" : "Amendment not approved", p.amendment.summary);
			});
			if (approved) set((s) => ({ celebrate: s.celebrate + 1 }));
			push(approved ? "Amendment approved" : "Amendment not approved");
		},
		fileContinuing: (id, summary) => {
			if (!summary.trim()) {
				push("Summarise progress since the last review", "warn");
				return;
			}
			patch(id, (p) => note({
				...p,
				continuingDue: addDays(TODAY, 365)
			}, "Continuing review report submitted", summary.trim()));
			set({ modal: null });
			push("Continuing review filed — next due in one year");
		},
		archiveProtocol: (id) => {
			patch(id, (p) => note({
				...p,
				status: "archived",
				continuingDue: null
			}, "Study archived", "Active file moved to the archive"));
			push("Protocol archived");
		}
	};
}, {
	name: "aaphreml-irerc-demo-v1",
	partialize: (s) => ({
		role: s.role,
		actingReviewer: s.actingReviewer,
		protocols: s.protocols,
		safety: s.safety
	})
}));
var tones = {
	sky: "border-sky/30 bg-sky/15 text-sky",
	em: "border-em/30 bg-em/15 text-em",
	amber: "border-amber/30 bg-amber/15 text-amber",
	rose: "border-rose/30 bg-rose/15 text-rose",
	muted: "border-line bg-panel-2 text-muted"
};
function Chip({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`,
		children
	});
}
var kinds = {
	primary: "border-transparent bg-sky text-ink hover:brightness-105",
	go: "border-transparent bg-em text-ink hover:brightness-105",
	ghost: "border-line bg-ink-2/60 text-fg hover:border-line-2",
	danger: "border-rose/40 bg-rose/10 text-rose hover:bg-rose/20"
};
function Btn({ kind = "ghost", className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${kinds[kind]} ${className}`
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `rounded-2xl border border-line bg-panel/90 shadow-card ${className}`,
		children
	});
}
function PageHead({ title, lede, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold tracking-tight text-fg",
			children: title
		}), lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-3xl text-sm text-muted",
			children: lede
		}) : null] }), action]
	});
}
var fieldClass = "mt-1.5 w-full rounded-xl border border-line bg-ink-2 px-3 py-2.5 text-sm text-fg outline-none ring-sky/30 focus:border-sky focus:ring-2";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block text-xs font-semibold tracking-wide text-muted uppercase",
		children: [label, children]
	});
}
function Empty({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: text
		})]
	});
}
function Modal({ title, onClose, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/75 p-3 backdrop-blur-sm sm:items-center",
		role: "presentation",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-2 bg-ink-2 shadow-card",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "ml-auto grid size-11 place-items-center rounded-xl border border-line text-muted hover:text-fg",
						onClick: onClose,
						"aria-label": "Close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-y-auto px-5 py-4",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-end gap-2 border-t border-line px-5 py-4",
					children: footer
				}) : null
			]
		})
	});
}
function useCount(n) {
	const [v, setV] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const t0 = performance.now();
		const step = (t) => {
			const k = Math.min(1, (t - t0) / 700);
			setV(Math.round(n * (1 - (1 - k) ** 3)));
			if (k < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [n]);
	return v;
}
function workItems(role, acting, list) {
	const items = [];
	for (const p of list) {
		if (!visibleTo(role, p)) continue;
		if ((role === "secretariat" || role === "admin") && p.status === "submitted") items.push({
			id: p.id,
			label: `Screen ${p.id}`,
			hint: p.title
		});
		else if ((role === "secretariat" || role === "admin") && p.status === "screening") items.push({
			id: p.id,
			label: `Finish screening ${p.id}`,
			hint: p.title
		});
		else if ((role === "secretariat" || role === "admin") && p.status === "complete") items.push({
			id: p.id,
			label: `Classify review type ${p.id}`,
			hint: p.title
		});
		else if ((role === "secretariat" || role === "chair" || role === "admin") && p.status === "classified") items.push({
			id: p.id,
			label: `Assign reviewers ${p.id}`,
			hint: p.reviewType || p.title
		});
		else if ((role === "secretariat" || role === "admin") && p.status === "reviews_complete") items.push({
			id: p.id,
			label: `Place on agenda ${p.id}`,
			hint: p.title
		});
		else if (role === "chair" && (p.status === "agenda" || p.status === "reviews_complete")) items.push({
			id: p.id,
			label: `Record decision ${p.id}`,
			hint: p.title
		});
		else if (role === "chair" && (p.reviewType === "Expedited Review" || p.reviewType === "Exemption Review") && [
			"classified",
			"assigned",
			"reviewing"
		].includes(p.status)) items.push({
			id: p.id,
			label: `Expedited decision ${p.id}`,
			hint: p.title
		});
		else if ((role === "secretariat" || role === "admin") && p.status === "decided") items.push({
			id: p.id,
			label: `Send action letter ${p.id}`,
			hint: p.decision || p.title
		});
		else if (role === "reviewer" && myReviewPending(p, acting)) items.push({
			id: p.id,
			label: `Assess ${p.id}`,
			hint: p.title
		});
		else if (role === "investigator" && p.pi === ROLES.investigator.name && p.status === "correction") items.push({
			id: p.id,
			label: `Resubmit ${p.id}`,
			hint: p.title
		});
		else if (role === "chair" && p.amendment?.status === "Pending review") items.push({
			id: p.id,
			label: `Amendment ${p.id}`,
			hint: p.amendment.summary
		});
		else if ((role === "investigator" || role === "secretariat") && p.status === "active" && p.continuingDue && p.continuingDue <= "2026-11-30" && (role !== "investigator" || p.pi === ROLES.investigator.name)) items.push({
			id: p.id,
			label: `Continuing review ${p.id}`,
			hint: `Due ${p.continuingDue}`
		});
	}
	return items.slice(0, 6);
}
function Dashboard() {
	const role = useIrerc((s) => s.role);
	const acting = useIrerc((s) => s.actingReviewer);
	const protocols = useIrerc((s) => s.protocols);
	const safety = useIrerc((s) => s.safety);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const list = protocols.filter((p) => visibleTo(role, p));
	const queue = workItems(role, acting, protocols);
	const approved = list.filter((p) => p.decision?.startsWith("Approved")).length;
	const openSafety = safety.filter((s) => s.status === "Pending review" && list.some((p) => p.id === s.protocolId)).length;
	const counts = PIPE.map((stage) => ({
		...stage,
		n: list.filter((p) => stage.match.includes(p.status)).length
	}));
	const activity = list.flatMap((p) => p.history.map((x) => ({
		...x,
		pid: p.id
	}))).sort((a, b) => b.date.localeCompare(a.date) || b.action.localeCompare(a.action)).slice(0, 6);
	const maxM = Math.max(...MONTHS.map((m) => m.n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Dashboard",
				lede: `${ROLES[role].name} · ${ROLES[role].title}. Committee date ${TODAY}. The committee decides; the secretariat administers; the system only records.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "sky",
						label: "Protocols in view",
						value: list.length,
						hint: role === "investigator" ? "Submitted by you" : "Committee file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "amber",
						label: "Awaiting you",
						value: queue.length,
						hint: "From your SOP duties"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "em",
						label: "Approved",
						value: approved,
						hint: "Including approval with conditions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						tone: "rose",
						label: "Open safety reports",
						value: openSafety,
						hint: "AE, SAE, and unanticipated events"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 p-4 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Workflow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Screening → classification → review → agenda → decision → letter"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-4 gap-2 md:grid-cols-8",
					children: counts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `mx-auto grid size-12 place-items-center rounded-2xl border text-lg font-bold tabular-nums ${s.n ? "pulse-ring border-sky/50 bg-sky/15 text-fg" : "border-line bg-ink-2 text-muted"}`,
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-xs font-semibold tracking-wide text-muted uppercase",
							children: s.label
						})]
					}, s.key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid items-start gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 md:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Your next actions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Only the steps this role is allowed to take."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 divide-y divide-line",
							children: queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-sm text-muted",
								children: "Nothing is waiting on you."
							}) : queue.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-semibold",
										children: q.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted",
										children: q.hint
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "min-h-11 shrink-0 rounded-xl bg-sky px-3 text-sm font-semibold text-ink",
									onClick: () => openProtocol(q.id),
									children: "Open"
								})]
							}, q.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 md:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Submissions by month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: MONTHS.map((m) => ({
										...m,
										width: m.n / maxM * 100
									})),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "label",
											tick: {
												fill: "var(--color-muted)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											cursor: { fill: "var(--color-panel-2)" },
											contentStyle: {
												background: "var(--color-panel)",
												border: "1px solid var(--color-line)",
												borderRadius: 12,
												color: "var(--color-fg)"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "n",
											fill: "var(--color-sky)",
											radius: [
												6,
												6,
												0,
												0
											]
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-lg font-semibold",
							children: "Recent activity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-3 space-y-3 border-l border-line pl-4",
							children: activity.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.2rem] top-1 size-2.5 rounded-full border-2 border-sky bg-ink" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold text-muted",
										children: [
											a.date,
											" · ",
											a.pid
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: a.action
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [a.actor, a.note ? ` — ${a.note}` : ""]
									})
								]
							}, `${a.pid}-${a.date}-${i}`))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: ["Status key: ", Object.entries(STATUS_LABEL).slice(0, 4).map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-2 inline-flex items-center gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: STATUS_TONE[k],
						children: label
					})
				}, k))]
			})
		]
	});
}
function Kpi({ label, value, hint, tone }) {
	const n = useCount(value);
	const bar = {
		sky: "bg-sky",
		amber: "bg-amber",
		em: "bg-em",
		rose: "bg-rose"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "relative overflow-hidden p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inset-x-0 top-0 h-1 ${bar}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-4xl font-bold tabular-nums",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
function matches(p, q) {
	const s = q.trim().toLowerCase();
	if (!s) return true;
	return [
		p.id,
		p.title,
		p.pi,
		p.institution,
		p.type,
		p.focus,
		STATUS_LABEL[p.status]
	].join(" ").toLowerCase().includes(s);
}
function ProtocolList({ preset }) {
	const role = useIrerc((s) => s.role);
	const query = useIrerc((s) => s.query);
	const filter = useIrerc((s) => s.filter);
	const setFilter = useIrerc((s) => s.setFilter);
	const protocols = useIrerc((s) => s.protocols);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const openModal = useIrerc((s) => s.openModal);
	const acting = useIrerc((s) => s.actingReviewer);
	const list = protocols.filter((p) => visibleTo(role, p) && matches(p, query));
	const scoped = preset ? list.filter((p) => preset.includes(p.status)) : list;
	const stage = PIPE.find((s) => s.key === filter);
	const shown = !preset && filter !== "all" ? scoped.filter((p) => stage?.match.includes(p.status)) : scoped;
	const waiting = new Set(workItems(role, acting, protocols).map((w) => w.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: preset ? "Screening desk" : role === "investigator" ? "My protocols" : "Protocols",
				lede: preset ? "Verify the submission checklist before a protocol is numbered into review." : "Open a file to see documents, reviewers, the decision, and the audit trail.",
				action: role === "investigator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "primary",
					onClick: () => openModal({ type: "submit" }),
					children: "New submission"
				}) : null
			}),
			!preset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === "all",
					onClick: () => setFilter("all"),
					label: `All ${list.length}`
				}), PIPE.map((stage) => {
					const n = list.filter((p) => stage.match.includes(p.status)).length;
					const on = filter === stage.key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: on,
						onClick: () => setFilter(stage.key),
						label: `${stage.label} ${n}`
					}, stage.key);
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:hidden",
				children: [shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-2xl border border-line bg-panel p-4 text-left",
					onClick: () => openProtocol(p.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowBody, {
						p,
						hot: waiting.has(p.id)
					})
				}, p.id)), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "Nothing in this view",
					text: "Try another filter or submit a protocol."
				}) }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "hidden overflow-hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-xs tracking-wide text-muted uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: "Protocol"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: "Submitted"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "cursor-pointer border-b border-line/70 hover:bg-sky/5",
						onClick: () => openProtocol(p.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowBody, {
									p,
									hot: waiting.has(p.id)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-sm text-muted",
								children: p.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: STATUS_TONE[p.status],
									children: STATUS_LABEL[p.status]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-sm tabular-nums text-muted",
								children: p.submitted
							})
						]
					}, p.id)), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
							title: "Nothing in this view",
							text: "Try another filter or submit a protocol."
						})
					}) }) : null] })]
				})
			})
		]
	});
}
function RowBody({ p, hot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs text-sky",
			children: p.id
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-semibold leading-snug",
			children: p.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs text-muted",
			children: [
				p.pi,
				" · ",
				p.institution
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center gap-2 md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: STATUS_TONE[p.status],
				children: STATUS_LABEL[p.status]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: p.submitted
			})]
		}),
		hot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs font-semibold text-amber",
			children: "Waiting on you"
		}) : null
	] });
}
function FilterChip({ active, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `min-h-11 shrink-0 rounded-full px-3 text-xs font-semibold ${active ? "bg-sky text-ink" : "border border-line bg-panel text-muted"}`,
		children: label
	});
}
function ProtocolDetail() {
	const id = useIrerc((s) => s.selectedId);
	const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id) ?? null);
	const go = useIrerc((s) => s.go);
	const returnView = useIrerc((s) => s.returnView);
	if (!protocol) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
		onClick: () => go("protocols"),
		children: "Back"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-muted",
		children: "That protocol is not in the file."
	})] });
	const idx = stageIndex(protocol.status);
	const pct = protocol.reviewers.length ? Math.round(protocol.reviews.length / protocol.reviewers.length * 100) : 0;
	const due = reviewDue(protocol);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mb-3 text-sm font-semibold text-sky",
				onClick: () => go(returnView === "detail" ? "protocols" : returnView),
				children: "← Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: protocol.title,
				lede: `${protocol.id} · ${protocol.focus}`,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: STATUS_TONE[protocol.status],
					children: STATUS_LABEL[protocol.status]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 grid grid-cols-4 gap-2 md:grid-cols-8",
				children: PIPE.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mb-1 h-1.5 rounded-full ${i < idx ? "bg-em" : i === idx ? "bg-sky" : "bg-panel-2"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `truncate text-xs font-semibold tracking-wide uppercase ${i === idx ? "text-sky" : i < idx ? "text-em" : "text-muted"}`,
					children: s.label
				})] }, s.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Protocol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Principal investigator",
											v: protocol.pi
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Institution",
											v: protocol.institution
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Site",
											v: protocol.site
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Study type",
											v: protocol.type
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Sponsor",
											v: protocol.sponsor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Category",
											v: protocol.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Consent languages",
											v: protocol.consentLanguages
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Vulnerable participants",
											v: protocol.vulnerable
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
											k: "Review type",
											v: protocol.reviewType || "Not classified"
										})
									]
								}),
								protocol.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm leading-relaxed text-muted",
									children: protocol.summary
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-muted",
									children: [
										"Suggested expertise: ",
										CATEGORY_EXPERTISE[protocol.category] || "Public Health Expert",
										". Review deadline is 7 working days from assignment",
										due ? ` (due ${due})` : "",
										"."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Submission checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Secretariat verifies each required document. The system does not accept a file into review while one is missing."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocList, { protocol })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold",
										children: "Assessments"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm tabular-nums text-muted",
										children: [
											protocol.reviews.length,
											"/",
											protocol.reviewers.length || 0
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-2 overflow-hidden rounded-full bg-panel-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-sky",
										style: { width: `${pct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 space-y-3",
									children: [protocol.reviewers.map((name) => {
										const review = protocol.reviews.find((r) => r.reviewer === name);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-xl border border-line bg-ink-2/50 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold",
														children: name
													}),
													review ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
														tone: review.recommendation.includes("Not") ? "rose" : review.recommendation.includes("major") ? "amber" : "em",
														children: review.recommendation
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
														tone: isOverdue(protocol, name) ? "rose" : "amber",
														children: isOverdue(protocol, name) ? "Overdue" : "Pending"
													}),
													review ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-auto text-xs text-muted",
														children: review.date
													}) : null
												]
											}), review?.comments ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: review.comments
											}) : null]
										}, name);
									}), protocol.reviewers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-sm text-muted",
										children: "No reviewers assigned yet."
									}) : null]
								})
							]
						}),
						protocol.decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Committee decision"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-xl border border-em/30 bg-em/10 p-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-em",
											children: protocol.decision
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-fg",
											children: protocol.decisionNote || "Recorded in the minutes."
										}),
										protocol.votes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs text-muted tabular-nums",
											children: [
												"Votes ",
												protocol.votes.for,
												" for · ",
												protocol.votes.against,
												" against · ",
												protocol.votes.abstain,
												" abstained"
											]
										}) : null
									]
								}),
								protocol.letter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted",
									children: protocol.letter
								}) : null,
								protocol.continuingDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm",
									children: ["Continuing review due ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold tabular-nums",
										children: protocol.continuingDue
									})]
								}) : null
							]
						}) : null,
						protocol.amendment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Amendment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: protocol.amendment.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted",
									children: [
										protocol.amendment.date,
										" · ",
										protocol.amendment.status
									]
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 md:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Audit trail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-4 space-y-4 border-l border-line pl-4",
								children: [...protocol.history].reverse().map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.2rem] top-1 size-2.5 rounded-full border-2 border-sky bg-ink" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-muted",
											children: x.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: x.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [x.actor, x.note ? ` — ${x.note}` : ""]
										})
									]
								}, `${x.date}-${x.action}-${i}`))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, { protocol })]
			})
		]
	});
}
function Meta({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs font-semibold tracking-wide text-muted uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm font-semibold",
		children: v
	})] });
}
function DocList({ protocol }) {
	const role = useIrerc((s) => s.role);
	const setDoc = useIrerc((s) => s.setDoc);
	const editable = (role === "secretariat" || role === "admin") && protocol.status === "screening";
	const tone = {
		verified: "em",
		uploaded: "sky",
		missing: "rose",
		correction: "amber"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 divide-y divide-line",
		children: protocol.docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center gap-2 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [d.name, d.required ? "" : " (optional)"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: tone[d.state],
					children: d.state
				}),
				editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "px-3",
						onClick: () => setDoc(protocol.id, d.code, "verified"),
						children: "Verify"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "px-3",
						kind: "danger",
						onClick: () => setDoc(protocol.id, d.code, "correction"),
						children: "Correct"
					})]
				}) : null
			]
		}, d.code))
	});
}
function Actions({ protocol: p }) {
	const role = useIrerc((s) => s.role);
	const acting = useIrerc((s) => s.actingReviewer);
	const startScreening = useIrerc((s) => s.startScreening);
	const passScreening = useIrerc((s) => s.passScreening);
	const returnForCorrection = useIrerc((s) => s.returnForCorrection);
	const resubmit = useIrerc((s) => s.resubmit);
	const placeOnAgenda = useIrerc((s) => s.placeOnAgenda);
	const openModal = useIrerc((s) => s.openModal);
	const decideAmendment = useIrerc((s) => s.decideAmendment);
	const archiveProtocol = useIrerc((s) => s.archiveProtocol);
	const [note, setNote] = (0, import_react.useState)("");
	const staff = role === "secretariat" || role === "admin";
	const own = p.pi === ROLES.investigator.name;
	const buttons = [];
	if (staff && p.status === "submitted") buttons.push({
		key: "start",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => startScreening(p.id),
			children: "Start administrative check"
		})
	});
	if (staff && p.status === "screening") buttons.push({
		key: "pass",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			disabled: !requiredDocsOk(p),
			onClick: () => passScreening(p.id),
			children: "Mark submission complete"
		})
	});
	if ((staff || role === "chair") && (p.status === "complete" || p.status === "classified")) buttons.push({
		key: "class",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => openModal({
				type: "classify",
				id: p.id
			}),
			children: p.reviewType ? "Change review type" : "Classify review type"
		})
	});
	if ((staff || role === "chair") && p.status === "classified" && p.reviewType !== "Exemption Review") buttons.push({
		key: "assign",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => openModal({
				type: "assign",
				id: p.id
			}),
			children: "Assign reviewers"
		})
	});
	if (role === "reviewer" && myReviewPending(p, acting)) buttons.push({
		key: "assess",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => openModal({
				type: "assess",
				id: p.id
			}),
			children: "Open assessment form"
		})
	});
	if (staff && p.status === "reviews_complete") buttons.push({
		key: "agenda",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => placeOnAgenda(p.id),
			children: "Place on agenda"
		})
	});
	if (canDecide(role, p)) buttons.push({
		key: "decide",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "go",
			onClick: () => openModal({
				type: "decide",
				id: p.id
			}),
			children: "Record committee decision"
		})
	});
	if (staff && p.status === "decided") buttons.push({
		key: "letter",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "go",
			onClick: () => openModal({
				type: "letter",
				id: p.id
			}),
			children: "Send action letter"
		})
	});
	if (role === "investigator" && own && p.status === "correction") buttons.push({
		key: "resub",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => resubmit(p.id),
			children: "Resubmit corrected package"
		})
	});
	if (role === "investigator" && own && (p.status === "active" || p.status === "reviewing" || p.status === "agenda")) buttons.push({
		key: "sae",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => openModal({
				type: "sae",
				id: p.id
			}),
			children: "Report a safety event"
		})
	});
	if (role === "investigator" && own && p.status === "active") {
		buttons.push({
			key: "amend",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => openModal({
					type: "amend",
					id: p.id
				}),
				children: "Submit amendment"
			})
		});
		buttons.push({
			key: "cont",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => openModal({
					type: "continuing",
					id: p.id
				}),
				children: "File continuing review"
			})
		});
	}
	if (role === "chair" && p.amendment?.status === "Pending review") {
		buttons.push({
			key: "am-y",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				kind: "go",
				onClick: () => decideAmendment(p.id, true),
				children: "Approve amendment"
			})
		});
		buttons.push({
			key: "am-n",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				kind: "danger",
				onClick: () => decideAmendment(p.id, false),
				children: "Do not approve amendment"
			})
		});
	}
	if (staff && p.status === "active") buttons.push({
		key: "arch",
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => archiveProtocol(p.id),
			children: "Archive after close-out"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4 md:p-5 lg:sticky lg:top-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Your actions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: ROLES[role].title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [buttons.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: b.node }, b.key)), buttons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-line bg-ink-2/40 p-3 text-sm text-muted",
					children: [
						"Nothing for ",
						ROLES[role].title,
						" at this stage. ",
						p.status === "archived" ? "The file is archived." : "The next step belongs to another role."
					]
				}) : null]
			}),
			staff && p.status === "screening" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-semibold tracking-wide text-muted uppercase",
					children: ["Return note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: fieldClass,
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "What the investigator must fix"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-2 w-full",
					kind: "danger",
					onClick: () => returnForCorrection(p.id, note),
					children: "Return for correction"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: "Decisions are taken by the committee or the chair where the SOP allows expedited or exemption review. Secretariat and the digital system cannot approve a protocol."
			})
		]
	});
}
function canDecide(role, p) {
	if (role !== "chair") return false;
	if (p.status === "agenda" || p.status === "reviews_complete") return true;
	if (p.reviewType === "Exemption Review" && (p.status === "classified" || p.status === "complete")) return true;
	if (p.reviewType === "Expedited Review" && [
		"classified",
		"assigned",
		"reviewing",
		"reviews_complete"
	].includes(p.status)) return true;
	return false;
}
function ReviewsDesk() {
	const acting = useIrerc((s) => s.actingReviewer);
	const setActing = useIrerc((s) => s.setActing);
	const protocols = useIrerc((s) => s.protocols);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const openModal = useIrerc((s) => s.openModal);
	const mine = protocols.filter((p) => p.reviewers.includes(acting));
	const pending = mine.filter((p) => myReviewPending(p, acting));
	const done = mine.filter((p) => p.reviews.some((r) => r.reviewer === acting));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "My reviews",
				lede: "Twenty ethical criteria, a recommendation, and a conflict declaration. The reviewer does not issue the committee decision.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-semibold tracking-wide text-muted uppercase",
					children: ["Acting reviewer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1 block min-h-11 rounded-xl border border-line bg-ink-2 px-3 text-sm font-semibold text-fg normal-case",
						value: acting,
						onChange: (e) => setActing(e.target.value),
						children: [
							"Dr. Yonas Haile",
							"Dr. Meseret Assefa",
							"Dr. Solomon Girma",
							"Dr. Rahel Tesfaye",
							"Dr. Getachew Alemu",
							"Ato Mulugeta Bekele",
							"W/ro Hirut Desta"
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: n }, n))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Pending"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "amber",
						children: pending.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskRows, {
					rows: pending.map((p) => ({
						id: p.id,
						title: p.title,
						sub: `${p.id} · due ${reviewDue(p) || "—"}`,
						extra: isOverdue(p, acting) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: "rose",
							children: "Overdue"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: STATUS_TONE[p.status],
							children: STATUS_LABEL[p.status]
						}),
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "primary",
							onClick: () => openModal({
								type: "assess",
								id: p.id
							}),
							children: "Assess"
						})
					})),
					empty: "No assessment is waiting for this reviewer."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Completed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "em",
						children: done.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-line",
					children: [done.map((p) => {
						const r = p.reviews.find((x) => x.reviewer === acting);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left hover:bg-sky/5",
							onClick: () => openProtocol(p.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted",
									children: [
										p.id,
										" · ",
										r.date
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: r.recommendation.includes("Not") ? "rose" : r.recommendation.includes("major") ? "amber" : "em",
								children: r.recommendation
							})]
						}) }, p.id);
					}), done.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "None yet",
						text: "Completed assessments appear here."
					}) : null]
				})]
			})
		]
	});
}
function CommitteeDesk() {
	const role = useIrerc((s) => s.role);
	const protocols = useIrerc((s) => s.protocols);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const openModal = useIrerc((s) => s.openModal);
	const agenda = protocols.filter((p) => p.status === "agenda" || p.status === "reviews_complete");
	const decided = protocols.filter((p) => p.status === "decided");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Committee",
				lede: "Meeting 10/2026 · Addis Ababa Health Bureau, Conference Room B · 30 October 2026 · 09:00."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-4 border-sky/30 bg-sky/10 p-4 text-sm",
				children: "Quorum is half the roster plus the people actually in the room, and it must include one lay member and one scientist. Conflicted members leave before the vote. The chair records the result; the secretariat writes the letter."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Agenda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "amber",
						children: agenda.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskRows, {
					rows: agenda.map((p) => ({
						id: p.id,
						title: p.title,
						sub: `${p.id} · ${p.reviewers.join(", ") || "No reviewers"}`,
						extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: STATUS_TONE[p.status],
							children: STATUS_LABEL[p.status]
						}),
						action: role === "chair" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "go",
							onClick: () => openModal({
								type: "decide",
								id: p.id
							}),
							children: "Record decision"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => openProtocol(p.id),
							children: "Open"
						})
					})),
					empty: "The agenda is clear."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-line px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Decisions waiting for a letter"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskRows, {
					rows: decided.map((p) => ({
						id: p.id,
						title: p.id,
						sub: p.decision || "",
						extra: null,
						action: role === "chair" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => openProtocol(p.id),
							children: "View"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "go",
							onClick: () => openModal({
								type: "letter",
								id: p.id
							}),
							children: "Send letter"
						})
					})),
					empty: "No decision is waiting to be communicated."
				})]
			})
		]
	});
}
function SafetyDesk() {
	const role = useIrerc((s) => s.role);
	const protocols = useIrerc((s) => s.protocols);
	const safety = useIrerc((s) => s.safety);
	const openModal = useIrerc((s) => s.openModal);
	const visibleIds = new Set(protocols.filter((p) => visibleTo(role, p)).map((p) => p.id));
	const rows = safety.filter((s) => visibleIds.has(s.protocolId));
	const pending = rows.filter((s) => s.status === "Pending review").length;
	const canReview = role === "chair" || role === "secretariat" || role === "reviewer";
	const ownActive = protocols.filter((p) => p.pi === ROLES.investigator.name && [
		"active",
		"reviewing",
		"agenda",
		"decided"
	].includes(p.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Safety reports",
				lede: "Serious, unexpected, and related events come back to the committee. Filing a report does not itself stop a study.",
				action: role === "investigator" && ownActive[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "primary",
					onClick: () => openModal({
						type: "sae",
						id: ownActive[0].id
					}),
					children: "Report an event"
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Pending",
						n: pending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "In this view",
						n: rows.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Reviewed",
						n: rows.length - pending
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-line",
					children: [rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-sky",
										children: s.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: s.event
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											s.date,
											" · ",
											s.protocolId,
											" · ",
											s.relatedness,
											" · ",
											s.seriousness
										]
									}),
									s.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: s.note
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: s.status.startsWith("Pending") ? "amber" : "em",
								children: s.status
							}),
							canReview && s.status === "Pending review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "primary",
								onClick: () => openModal({
									type: "safety",
									id: s.id
								}),
								children: "Review"
							}) : null
						]
					}, s.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "No reports",
						text: "Safety reports linked to your protocols appear here."
					}) : null]
				})
			})
		]
	});
}
function MonitorDesk() {
	const role = useIrerc((s) => s.role);
	const protocols = useIrerc((s) => s.protocols);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const list = protocols.filter((p) => visibleTo(role, p) && (p.status === "active" || p.amendment || p.continuingDue));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "After clearance",
			lede: "Amendments, continuing review, and close-out. An approved study is not a finished file."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-sky",
							children: p.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: p.pi
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => openProtocol(p.id),
						children: "Open file"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: STATUS_TONE[p.status],
							children: STATUS_LABEL[p.status]
						}),
						p.continuingDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							tone: p.continuingDue <= "2026-11-30" ? "amber" : "muted",
							children: ["Continuing review ", p.continuingDue]
						}) : null,
						p.amendment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: p.amendment.status === "Approved" ? "em" : p.amendment.status === "Pending review" ? "amber" : "rose",
							children: p.amendment.status
						}) : null
					]
				})]
			}, p.id)), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No active clearances",
				text: "Approved studies that are still running show up here."
			}) }) : null]
		})]
	});
}
function ArchiveDesk() {
	const protocols = useIrerc((s) => s.protocols);
	const openProtocol = useIrerc((s) => s.openProtocol);
	const closed = protocols.filter((p) => p.status === "archived");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Archive",
				lede: "Active files move here after close-out. Retrieval stays with the secretariat."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-4 border-amber/30 bg-amber/10 p-4 text-sm text-amber",
				children: "Retention is not settled in the source package: indefinite storage and a minimum period after completion both appear. One schedule has to be formally approved before this workspace is used for real records."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-line",
					children: [closed.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "w-full px-4 py-3 text-left hover:bg-sky/5",
						onClick: () => openProtocol(p.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-sky",
								children: p.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-semibold",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-muted",
								children: [
									p.decision,
									" · last event ",
									p.history[p.history.length - 1]?.date
								]
							})
						]
					}) }, p.id)), closed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						title: "Archive is empty",
						text: "Closed studies will be listed here."
					}) : null]
				})
			})
		]
	});
}
function SystemDesk() {
	const events = useIrerc((s) => s.protocols).flatMap((p) => p.history.map((x) => ({
		...x,
		pid: p.id
	}))).sort((a, b) => b.date.localeCompare(a.date) || b.action.localeCompare(a.action));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "System and audit",
				lede: "The digital system records and enforces access. It has no authority to approve, defer, or reject a protocol."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "border-b border-line px-4 py-3 font-semibold",
						children: "Who may do what"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "text-xs tracking-wide text-muted uppercase",
								children: [
									"Function",
									"PI",
									"Secretariat",
									"Reviewer",
									"Chair"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-semibold",
									children: h
								}, h))
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
								[
									"Submit protocol",
									"Yes",
									"—",
									"—",
									"—"
								],
								[
									"Screen completeness",
									"—",
									"Yes",
									"—",
									"—"
								],
								[
									"Classify review type",
									"—",
									"Yes",
									"—",
									"Yes"
								],
								[
									"Assign reviewers",
									"—",
									"Yes",
									"—",
									"Yes"
								],
								[
									"Submit assessment",
									"—",
									"—",
									"Yes",
									"—"
								],
								[
									"Record decision",
									"—",
									"—",
									"—",
									"Yes"
								],
								[
									"Send action letter",
									"—",
									"Yes",
									"—",
									"—"
								],
								[
									"Archive",
									"—",
									"Yes",
									"—",
									"—"
								]
							].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-line",
								children: row.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `px-3 py-2 ${cell === "Yes" ? "font-semibold text-em" : i ? "text-muted" : ""}`,
									children: cell
								}, i))
							}, row[0])) })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Document control"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted uppercase",
									children: "Numbering"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono",
									children: "AAPHREML-IRERC-YYYY-NNNN"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted uppercase",
									children: "Review clock"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "7 working days" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted uppercase",
									children: "Assessment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "20 criteria" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted uppercase",
									children: "Quorum floor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "4 votes in this demo" })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted",
							children: [
								"Committee date in this workspace is ",
								TODAY,
								". Records are fictitious and stay in this browser. They are not written to the institutional spreadsheet or Drive folder."
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line px-4 py-3 font-semibold",
					children: "Audit trail"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-[28rem] divide-y divide-line overflow-y-auto",
					children: events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-1 px-4 py-3 text-sm md:grid-cols-[7rem_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted tabular-nums",
							children: e.date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-sky",
								children: e.pid
							}),
							" · ",
							e.actor,
							" — ",
							e.action,
							e.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" — ", e.note]
							}) : null
						] })]
					}, `${e.pid}-${i}`))
				})]
			})
		]
	});
}
function RosterDesk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				title: "Roles and roster",
				lede: "Duties follow the committee’s SOP. The seat, not the software, carries the authority."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					["Investigator", "Submits a complete package, conducts the study as approved, requests amendments before changing the protocol, and reports safety, deviations, progress, and close-out on time."],
					["Secretariat", "Receives, screens, numbers, assigns, builds the agenda, issues action letters, and keeps the archive. No authority to approve a study."],
					["Reviewer", "Reviews only assigned protocols, completes the assessment, declares conflicts, and presents at the meeting."],
					["Chairperson", "Maintains quorum, calls the vote, signs the decision, and may approve items the SOP allows by expedited or exemption review."],
					["System", "Access control, version history, and the audit trail. Support only — never a voter."]
				].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold text-sky",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: text
					})]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line px-4 py-3 font-semibold",
					children: "Committee roster"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: MEMBERS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-full bg-panel-2 text-xs font-bold",
								children: initials(m.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: m.institution
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: m.lay ? "amber" : "sky",
								children: m.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: m.seat
							})
						]
					}, m.name))
				})]
			})
		]
	});
}
function initials(name) {
	const parts = name.replace(/^(Dr\.|Prof\.|Ato|W\/ro)\s+/i, "").split(" ");
	return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
}
function Mini({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-3xl font-bold tabular-nums",
			children: n
		})]
	});
}
function DeskRows({ rows, empty }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "Clear",
		text: empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: r.sub
					})]
				}),
				r.extra,
				r.action
			]
		}, r.id))
	});
}
function ModalHost() {
	const modal = useIrerc((s) => s.modal);
	const close = useIrerc((s) => s.closeModal);
	if (!modal) return null;
	if (modal.type === "submit") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitModal, { onClose: close });
	if (modal.type === "assign") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "assess") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "decide") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecideModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "letter") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "classify") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassifyModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "safety") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "sae") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaeModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "amend") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmendModal, {
		id: modal.id,
		onClose: close
	});
	if (modal.type === "continuing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinuingModal, {
		id: modal.id,
		onClose: close
	});
	return null;
}
function SubmitModal({ onClose }) {
	const submit = useIrerc((s) => s.submitProtocol);
	const [title, setTitle] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)(STUDY_TYPES[2]);
	const [focus, setFocus] = (0, import_react.useState)("Food and nutrition");
	const [sponsor, setSponsor] = (0, import_react.useState)("");
	const [institution, setInstitution] = (0, import_react.useState)("Addis Ababa University, School of Public Health");
	const [site, setSite] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)("");
	const [consentLanguages, setConsent] = (0, import_react.useState)("Amharic");
	const [vulnerable, setVulnerable] = (0, import_react.useState)("");
	const [attached, setAttached] = (0, import_react.useState)(DOC_DEFS.filter((d) => d.required).map((d) => d.code));
	const category = FOCUS_TO_CATEGORY[focus];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "New protocol submission",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => submit({
				title,
				type,
				focus,
				sponsor,
				institution,
				site,
				summary,
				consentLanguages,
				vulnerable,
				attached
			}),
			children: "Submit protocol"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The secretariat screens the package before reviewers see it. A number is assigned now so the file can be tracked; review does not start until screening is complete."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Protocol title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Short scientific title"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Study type",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: type,
						onChange: (e) => setType(e.target.value),
						children: STUDY_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Health focus",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: focus,
						onChange: (e) => setFocus(e.target.value),
						children: Object.keys(FOCUS_TO_CATEGORY).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Mapped category: ",
					category,
					". Suggested reviewer expertise: ",
					CATEGORY_EXPERTISE[category],
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Sponsor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: sponsor,
					onChange: (e) => setSponsor(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Institution",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: institution,
					onChange: (e) => setInstitution(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Study site",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					value: site,
					onChange: (e) => setSite(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Summary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					value: summary,
					onChange: (e) => setSummary(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Consent languages",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: consentLanguages,
						onChange: (e) => setConsent(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Vulnerable participants",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: vulnerable,
						onChange: (e) => setVulnerable(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-semibold tracking-wide text-muted uppercase",
				children: "Documents included"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: DOC_DEFS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-3 rounded-xl border border-line px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: attached.includes(d.code),
							onChange: (e) => setAttached((cur) => e.target.checked ? [...cur, d.code] : cur.filter((c) => c !== d.code))
						}),
						d.name,
						d.required ? "" : " — optional"
					]
				}) }, d.code))
			})
		]
	});
}
function AssignModal({ id, onClose }) {
	const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id));
	const assign = useIrerc((s) => s.assignReviewers);
	const suggested = protocol ? CATEGORY_EXPERTISE[protocol.category] : "";
	const initial = (0, import_react.useMemo)(() => {
		const match = REVIEWER_POOL.filter((m) => m.category === suggested).map((m) => m.name);
		const lay = REVIEWER_POOL.find((m) => m.lay)?.name;
		const picked = [...match];
		if (lay && !picked.includes(lay)) picked.push(lay);
		return picked.slice(0, 2);
	}, [suggested]);
	const [picked, setPicked] = (0, import_react.useState)(initial);
	if (!protocol) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Assign reviewers",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => assign(id, picked),
			children: "Assign"
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [protocol.reviewType === "Full Board Review" ? "Full board review uses two primary reviewers. Include a lay member when you can. The whole committee still receives the package." : "Expedited review can proceed with one qualified reviewer. The chair still records the decision.", suggested ? ` Suggested expertise: ${suggested}.` : ""]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: REVIEWER_POOL.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-center gap-3 rounded-xl border border-line px-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: picked.includes(m.name),
					onChange: (e) => setPicked((cur) => e.target.checked ? [...cur, m.name] : cur.filter((n) => n !== m.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: m.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-0.5 block text-xs text-muted",
					children: [
						m.category,
						m.lay ? " · lay member" : "",
						m.category === suggested ? " · suggested" : ""
					]
				})] })]
			}) }, m.name))
		})]
	});
}
function AssessModal({ id, onClose }) {
	const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id));
	const save = useIrerc((s) => s.saveAssessment);
	const [scores, setScores] = (0, import_react.useState)(() => Object.fromEntries(CRITERIA.map((c) => [c.code, "Appropriate"])));
	const [recommendation, setRec] = (0, import_react.useState)(RECOMMENDATIONS[1]);
	const [comments, setComments] = (0, import_react.useState)("");
	const [conflict, setConflict] = (0, import_react.useState)(false);
	if (!protocol) return null;
	const failed = CRITERIA.filter((c) => scores[c.code] === "Not appropriate").map((c) => c.code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Assessment form",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => save(id, recommendation, comments, conflict, failed),
			children: "Submit assessment"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: protocol.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: protocol.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-96 space-y-4 overflow-y-auto pr-1",
				children: SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-muted uppercase",
						children: section
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-xs font-semibold text-sky",
						onClick: () => setScores((cur) => {
							const next = { ...cur };
							CRITERIA.filter((c) => c.section === section).forEach((c) => {
								next[c.code] = "Appropriate";
							});
							return next;
						}),
						children: "Mark section appropriate"
					})]
				}), CRITERIA.filter((c) => c.section === section).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 rounded-xl border border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							CRITERIA.findIndex((x) => x.code === c.code) + 1,
							". ",
							c.question
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							"Appropriate",
							"Not appropriate",
							"N/A"
						].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-xs font-semibold ${scores[c.code] === opt ? "border-sky bg-sky/15 text-sky" : "border-line text-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								className: "sr-only",
								name: c.code,
								checked: scores[c.code] === opt,
								onChange: () => setScores((cur) => ({
									...cur,
									[c.code]: opt
								}))
							}), opt]
						}, opt))
					})]
				}, c.code))] }, section))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Recommendation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: fieldClass,
					value: recommendation,
					onChange: (e) => setRec(e.target.value),
					children: RECOMMENDATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Comments to the committee",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					value: comments,
					onChange: (e) => setComments(e.target.value),
					placeholder: "Required if any criterion is not appropriate"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex min-h-11 items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: conflict,
					onChange: (e) => setConflict(e.target.checked)
				}), "I have no unmanaged conflict of interest on this protocol."]
			})
		]
	});
}
function DecideModal({ id, onClose }) {
	const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id));
	const save = useIrerc((s) => s.saveDecision);
	const [decision, setDecision] = (0, import_react.useState)(DECISIONS[0]);
	const [note, setNote] = (0, import_react.useState)("");
	const [votes, setVotes] = (0, import_react.useState)({
		for: 6,
		against: 0,
		abstain: 1
	});
	if (!protocol) return null;
	const setVote = (k, raw) => {
		const n = Math.max(0, Number(raw) || 0);
		setVotes((v) => ({
			...v,
			[k]: n
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Committee decision",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "go",
			onClick: () => save(id, decision, note, votes),
			children: "Record decision"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: protocol.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: protocol.title
			}),
			protocol.reviews.length < protocol.reviewers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 rounded-xl border border-amber/40 bg-amber/10 p-3 text-sm text-amber",
				children: "Not every assigned assessment is in. Expedited or exemption items may still be decided by the chair; full board items should wait for both reviews."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Decision",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: fieldClass,
					value: decision,
					onChange: (e) => setDecision(e.target.value),
					children: DECISIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Votes for",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "numeric",
							value: votes.for,
							onChange: (e) => setVote("for", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Against",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "numeric",
							value: votes.against,
							onChange: (e) => setVote("against", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Abstentions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "numeric",
							value: votes.abstain,
							onChange: (e) => setVote("abstain", e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Conditions or reasons for the minutes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					value: note,
					onChange: (e) => setNote(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					"Quorum is at least half of ",
					MEMBERS.length,
					" members, with a lay member and a scientist present. Members with a conflict leave the room. Total votes must be at least 4."
				]
			})
		]
	});
}
function LetterModal({ id, onClose }) {
	const protocol = useIrerc((s) => s.protocols.find((p) => p.id === id));
	const send = useIrerc((s) => s.sendLetter);
	const [date, setDate] = (0, import_react.useState)(addDays(TODAY, 365));
	const [message, setMessage] = (0, import_react.useState)("");
	if (!protocol) return null;
	const body = message || defaultLetter(protocol.decision || "the recorded outcome", protocol.pi, date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Action letter",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "go",
			onClick: () => send(id, body, date),
			children: "Send letter"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The secretariat prepares the letter. It lists the decision, continuing-review date when clearance is granted, and the appeal route. It does not change the committee’s decision."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Decision",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					readOnly: true,
					value: protocol.decision || ""
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Continuing review due",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: fieldClass,
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Message",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${fieldClass} min-h-40`,
					value: body,
					onChange: (e) => setMessage(e.target.value)
				})
			})
		]
	});
}
function defaultLetter(decision, pi, date) {
	return `${pi},

AAPHREML-IRERC has completed review of your protocol. The decision is: ${decision}.

If clearance is granted, continuing review is due on ${date}. Do not implement an amendment before the committee approves it. Report serious and unanticipated events within the SOP timelines.

To appeal, write to the Chairperson with the reasons and any new information. This letter is an administrative communication of a committee decision.`;
}
function ClassifyModal({ id, onClose }) {
	const classify = useIrerc((s) => s.classify);
	const current = useIrerc((s) => s.protocols.find((p) => p.id === id)?.reviewType);
	const [value, setValue] = (0, import_react.useState)(current || "Full Board Review");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "Review type",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => classify(id, value),
			children: "Save classification"
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: [
				["Full Board Review", "Convened meeting. Two primary reviewers. Quorum, including a lay member, throughout the vote."],
				["Expedited Review", "Minimal risk, for example a non-significant-risk device. One reviewer may assess. The chair records the decision."],
				["Exemption Review", "Fits an exemption category. The chair records the determination. It is still logged."]
			].map(([label, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: `block rounded-xl border p-3 ${value === label ? "border-sky bg-sky/10" : "border-line"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						checked: value === label,
						onChange: () => setValue(label)
					}), label]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted",
					children: text
				})]
			}, label))
		})
	});
}
function SafetyModal({ id, onClose }) {
	const report = useIrerc((s) => s.safety.find((r) => r.id === id));
	const save = useIrerc((s) => s.reviewSafety);
	const [action, setAction] = (0, import_react.useState)("No further action");
	const [note, setNote] = (0, import_react.useState)("");
	if (!report) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: `Review ${report.id}`,
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => save(id, action, note),
			children: "Record action"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: report.event
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					report.protocolId,
					" · ",
					report.date,
					" · ",
					report.relatedness,
					" · ",
					report.seriousness
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Action",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: fieldClass,
					value: action,
					onChange: (e) => setAction(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "No further action" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Request information" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Recommend further action" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Note for the minutes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					value: note,
					onChange: (e) => setNote(e.target.value)
				})
			})
		]
	});
}
function SaeModal({ id, onClose }) {
	const file = useIrerc((s) => s.fileSae);
	const [event, setEvent] = (0, import_react.useState)("");
	const [relatedness, setRel] = (0, import_react.useState)("Unknown");
	const [seriousness, setSer] = (0, import_react.useState)("Hospitalization");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Safety report",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => file(id, event, relatedness, seriousness),
			children: "File report"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "File within the SOP timeline. This does not suspend the study by itself."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Event",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: fieldClass,
					value: event,
					onChange: (e) => setEvent(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Relatedness",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: relatedness,
						onChange: (e) => setRel(e.target.value),
						children: [
							"Not related",
							"Possibly related",
							"Probably related",
							"Unknown"
						].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Seriousness",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: fieldClass,
						value: seriousness,
						onChange: (e) => setSer(e.target.value),
						children: [
							"Non-serious",
							"Hospitalization",
							"Life-threatening",
							"Death",
							"Disability"
						].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
					})
				})]
			})
		]
	});
}
function AmendModal({ id, onClose }) {
	const file = useIrerc((s) => s.fileAmendment);
	const [summary, setSummary] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Protocol amendment",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => file(id, summary),
			children: "Submit amendment"
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Do not implement the change until the chair records approval."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "What is changing, and why",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: fieldClass,
				value: summary,
				onChange: (e) => setSummary(e.target.value)
			})
		})]
	});
}
function ContinuingModal({ id, onClose }) {
	const file = useIrerc((s) => s.fileContinuing);
	const [summary, setSummary] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: "Continuing review",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "primary",
			onClick: () => file(id, summary),
			children: "Submit report"
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Enrolment, safety, deviations, and whether the risk-benefit balance has changed."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Progress since the last review",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: fieldClass,
				value: summary,
				onChange: (e) => setSummary(e.target.value)
			})
		})]
	});
}
var ICONS = {
	dashboard: LayoutDashboard,
	protocols: Files,
	detail: Files,
	reviews: PenLine,
	screening: ClipboardCheck,
	committee: Scale,
	safety: ShieldAlert,
	monitor: Activity,
	archive: Archive,
	system: Settings,
	roster: Users
};
var ROLE_ICON = {
	investigator: ClipboardCheck,
	secretariat: Files,
	reviewer: PenLine,
	chair: Scale,
	admin: Settings
};
function Portal() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const done = () => setReady(true);
		const unsub = useIrerc.persist.onFinishHydration(done);
		if (useIrerc.persist.hasHydrated()) done();
		return unsub;
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-ink text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "AAPHREML-IRERC"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {});
}
function Gate() {
	if (!useIrerc((s) => s.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
function RoleGate() {
	const login = useIrerc((s) => s.login);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-ink text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(60,180,232,0.16),transparent_55%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/seal.png",
					alt: "Addis Ababa City Administration Health Bureau seal",
					className: "mb-5 size-20 rounded-full bg-fg/90 object-contain p-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-sky uppercase",
					children: "Addis Ababa City Administration Health Bureau"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-xl text-4xl leading-tight font-semibold md:text-5xl",
					children: "AAPHREML-IRERC ethics review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-base leading-relaxed text-muted",
					children: "Screen a submission, assign reviewers, complete the 20-point assessment, record the committee decision, and issue the action letter. Each role only sees the duties the SOP gives it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Secretariat checks the file. It does not approve the study." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reviewers assess. The chair records the vote." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clearance then needs amendments, safety reports, and continuing review." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-lg text-xs leading-relaxed text-muted",
					children: "Demonstration records only. Names and protocols on this screen are fictitious and are not an ethics determination, not the live committee file, and not evidence of approval."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-line bg-panel/80 p-5 shadow-card md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "Choose a role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Switch later to walk the same protocol through the next duty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							"investigator",
							"secretariat",
							"reviewer",
							"chair",
							"admin"
						].map((key) => {
							const role = ROLES[key];
							const Icon = ROLE_ICON[key];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "rounded-2xl border border-line bg-ink-2/50 p-4 text-left transition hover:-translate-y-0.5 hover:border-sky/50",
								onClick: () => login(key),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-xl bg-panel-2 text-sky",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 block font-semibold",
										children: role.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-xs leading-relaxed text-muted",
										children: role.blurb
									})
								]
							}, key);
						})
					})
				]
			})]
		})]
	});
}
function Shell() {
	const role = useIrerc((s) => s.role);
	const view = useIrerc((s) => s.view);
	const go = useIrerc((s) => s.go);
	const logout = useIrerc((s) => s.logout);
	const resetDemo = useIrerc((s) => s.resetDemo);
	const query = useIrerc((s) => s.query);
	const setQuery = useIrerc((s) => s.setQuery);
	const navOpen = useIrerc((s) => s.navOpen);
	const setNav = useIrerc((s) => s.setNav);
	const protocols = useIrerc((s) => s.protocols);
	const safety = useIrerc((s) => s.safety);
	const acting = useIrerc((s) => s.actingReviewer);
	const toasts = useIrerc((s) => s.toasts);
	const celebrate = useIrerc((s) => s.celebrate);
	const closeModal = useIrerc((s) => s.closeModal);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [closeModal]);
	const badges = badgeMap(role, acting, protocols, safety);
	const items = NAV.filter((n) => n.roles.includes(role));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-ink/85 px-3 backdrop-blur md:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid size-11 place-items-center rounded-xl border border-line md:hidden",
						onClick: () => setNav(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/seal.png",
						alt: "",
						className: "size-9 rounded-full bg-fg/90 object-contain p-0.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: "AAPHREML-IRERC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs tracking-widest text-muted uppercase sm:block",
							children: "Ethics review"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative ml-auto hidden min-w-0 flex-1 md:block md:max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => {
								setQuery(e.target.value);
								if (view !== "protocols" && view !== "detail") go("protocols");
							},
							placeholder: "Search protocol, investigator, site",
							className: "min-h-11 w-full rounded-xl border border-line bg-ink-2 pr-3 pl-9 text-sm outline-none focus:border-sky"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto text-right md:ml-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: ROLES[role].name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: ROLES[role].title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-full bg-sky text-xs font-bold text-ink",
						children: ROLES[role].initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "hidden min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm md:inline-flex",
						onClick: () => {
							if (window.confirm("Restore the original demonstration records?")) resetDemo();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm",
						onClick: logout,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Switch role"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line px-3 py-2 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => {
							setQuery(e.target.value);
							if (view !== "protocols") go("protocols");
						},
						placeholder: "Search",
						className: "min-h-11 w-full rounded-xl border border-line bg-ink-2 pr-3 pl-9 text-sm outline-none focus:border-sky"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-line p-3 md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItems, {
							items,
							view,
							badges,
							onGo: go
						})
					}),
					navOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-0 z-40 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute inset-0 bg-ink/70",
							"aria-label": "Close menu",
							onClick: () => setNav(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-line bg-ink-2 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "grid size-11 place-items-center",
										onClick: () => setNav(false),
										"aria-label": "Close",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItems, {
									items,
									view,
									badges,
									onGo: go
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mt-4 flex min-h-11 w-full items-center gap-2 rounded-xl border border-line px-3 text-sm",
									onClick: () => {
										if (window.confirm("Restore the original demonstration records?")) resetDemo();
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset demonstration"]
								})
							]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "min-w-0 flex-1 px-4 py-6 md:px-8",
						children: [
							view === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : null,
							view === "protocols" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtocolList, {}) : null,
							view === "screening" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtocolList, { preset: [
								"submitted",
								"screening",
								"correction",
								"complete"
							] }) : null,
							view === "detail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtocolDetail, {}) : null,
							view === "reviews" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsDesk, {}) : null,
							view === "committee" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeDesk, {}) : null,
							view === "safety" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyDesk, {}) : null,
							view === "monitor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorDesk, {}) : null,
							view === "archive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveDesk, {}) : null,
							view === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemDesk, {}) : null,
							view === "roster" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterDesk, {}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, { n: celebrate }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed right-3 bottom-3 z-50 flex w-[min(100%-1.5rem,22rem)] flex-col gap-2",
				children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `pointer-events-auto rounded-xl border px-4 py-3 text-sm font-semibold shadow-card ${t.kind === "warn" ? "border-amber/40 bg-amber text-ink" : "border-em/40 bg-em text-ink"}`,
					children: t.msg
				}, t.id))
			})
		]
	});
}
function NavItems({ items, view, badges, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "space-y-1",
		children: items.map((item) => {
			const Icon = ICONS[item.key];
			const active = view === item.key || view === "detail" && item.key === "protocols";
			const count = badges[item.key];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onGo(item.key),
				className: `flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold ${active ? "bg-sky/15 text-fg ring-1 ring-sky/40" : "text-muted hover:bg-panel hover:text-fg"}`,
				"aria-current": active ? "page" : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: item.label
					}),
					count ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-amber px-2 py-0.5 text-xs font-bold text-ink tabular-nums",
						children: count
					}) : null
				]
			}, item.key);
		})
	});
}
function badgeMap(role, acting, protocols, safety) {
	const list = protocols.filter((p) => visibleTo(role, p));
	const queue = workItems(role, acting, protocols).length;
	const pendingSafety = safety.filter((s) => s.status === "Pending review" && list.some((p) => p.id === s.protocolId)).length;
	const map = {};
	if (queue) map.dashboard = queue;
	if (role === "secretariat" || role === "admin") {
		const n = list.filter((p) => [
			"submitted",
			"screening",
			"correction",
			"complete"
		].includes(p.status)).length;
		if (n) map.screening = n;
	}
	if (role === "reviewer") {
		const n = list.filter((p) => myReviewPending(p, acting)).length;
		if (n) map.reviews = n;
	}
	if (role === "chair" || role === "secretariat") {
		const n = protocols.filter((p) => p.status === "agenda" || p.status === "reviews_complete" || role !== "chair" && p.status === "decided").length;
		if (n) map.committee = n;
	}
	if (pendingSafety) map.safety = pendingSafety;
	const monitor = list.filter((p) => p.status === "active" && p.continuingDue && p.continuingDue <= "2026-11-30").length + list.filter((p) => p.amendment?.status === "Pending review").length;
	if (monitor) map.monitor = monitor;
	return map;
}
function Confetti({ n }) {
	const [bits, setBits] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!n) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const colors = [
			"var(--color-sky)",
			"var(--color-em)",
			"var(--color-amber)",
			"var(--color-rose)"
		];
		setBits(Array.from({ length: 42 }, (_, i) => ({
			id: `${n}-${i}`,
			left: Math.random() * 100,
			delay: Math.random() * .25,
			dur: 1.5 + Math.random() * 1.2,
			color: colors[i % colors.length]
		})));
		const t = window.setTimeout(() => setBits([]), 3200);
		return () => window.clearTimeout(t);
	}, [n]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: bits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "confetti-bit",
		style: {
			left: `${b.left}vw`,
			background: b.color,
			width: 8,
			height: 12,
			animationDuration: `${b.dur}s`,
			animationDelay: `${b.delay}s`
		}
	}, b.id)) });
}
var SplitComponent = Portal;
//#endregion
export { SplitComponent as component };
