# AAPHREML-IRERC Institutional Research Ethics Review Portal

Addis Ababa City Administration Health Bureau
Public Health Emergency Management Laboratory & Research Directorate

This React edition is the modern portal interface. It starts empty — there are
no demonstration protocols, sample safety reports or seeded committee files.

## Extracted from the official system

The Research Protocol Submission and the clearance letter were taken from the
production AAPHREML-IRERC system supplied in `AAPHREML-IRERC.zip`, not invented.

### Research Protocol Submission — eight steps

The form reproduces the production wizard:

1. **Investigator** — protocol code, college/university, department, activity
   type, education level, project outcomes/monitoring/sustainability/budget
   (conditional for projects), advisor details, PI name/phone/email.
2. **Study focus** — full title, health focus area, data-collection start/end,
   frequency.
3. **Methodology** — research approach, sample size, study design, clinical-trial
   classification (conditional), general and specific objectives.
4. **Location and population** — geographic coverage, specific site, sex/gender,
   target population.
5. **Data management** — electronic data, GPS, collection tools, cleaned-data
   formats, sharing/accessibility and restriction reason.
6. **Funding** — funding source and allocated budget.
7. **Documents** — institutional supporting letter, PI identification, complete
   proposal, investigator CV, plus the 28-section Word-document scanner. A
   proposal must reach **95%** section completeness before submission.
8. **Review and submit** — institutional data-sharing acknowledgment and the
   mandatory PI Informed Consent Declaration with electronic confirmation.

All conditional fields, option lists and validation messages follow the
production form.

### PI Informed Consent Declaration

The exact declaration supplied by the institution is presented in step 8. The
PI must tick the confirmation. The protocol record stores the declaration text,
the PI name and the acceptance timestamp.

### Clearance letter

The official **Permission to Access Facility for Approved Research** letter is
reproduced with the actual letterhead, reference fields, subject, wording,
chairperson signature and Secretary block from the production system. It is
available only after an approved decision is recorded and is printable or
saveable as PDF from the browser. It is not generated with generic or invented
institutional text.

## Themes and branding

- **Daylight is the default theme.** Seven further palettes are selectable:
  Ocean, Sand, Midnight, Graphite, Forest, Plum and Rosewood.
- The institutional name is used in the login screen, header, document titles
  and the official letter.

## Protocol detail consolidation

Protocol registration, the full research protocol content, supporting documents
and the submission/scanner checklist now appear in one **Research Protocol
Submission** module on the protocol page. Every uploaded document has **View**
and **Download** actions in every role that can open the protocol.

The PI name field is intentionally **blank** in a new submission. It is no
longer prefilled with a demonstration name.

## Members and reviewers

The committee roster starts empty. The **Secretariat** registers members and
reviewers in **Roster** and has full editing control over the name,
seat, category/expertise, institution, email, telephone and active status.
Renaming a member also updates their existing reviewer assignments. Assigned
reviewers cannot be deleted; they can be marked inactive. Other roles see the
roster read-only, and investigators cannot see it.

## Other workflow

Screening, classification, reviewer assignment, 20-point assessments, committee
decisions, safety reports, amendments, continuing review, archive and audit are
unchanged.

## Run it

```bash
npm install
npm run dev          # http://localhost:8080
npm run typecheck
npm run lint
npm run build
```

## Title similarity screening

Each proposed title is automatically compared with the titles already in the
application file. The result is visible to the Secretariat, Chairperson and
System Administrator in the protocol detail and as a badge in the protocol list.

The estimator combines TF-IDF token cosine similarity (55%), token-set Jaccard
overlap (25%) and normalized edit similarity (20%), after stop-word removal and
light stemming. It supports Latin and Ethiopic text. The score is a screening
aid, not a finding of duplicate or plagiarized research; human review remains
required.

## Document review workspace

Reviewers and internal roles can open **Document review & comments** from a
protocol. The workspace:

- renders Word `.docx` files inside the portal using the uploaded file;
- shows PDFs in an embedded viewer;
- lets a reviewer select text and add a comment or annotation;
- stores comments against the exact document version and author;
- marks comments as resolved or reopened;
- provides **Open original in new tab** and **Download** fallbacks for the PI;
- restricts downloading and opening the raw file to the PI — every other role
  views and comments inside the workspace only;
- never writes to or changes the PI's original document.

The PI can open the same workspace read-only, read every reviewer comment, and
respond through the 48-hour update or revised/final protocol workflow. The
Secretariat, Chairperson and System Administrator also have view-only access to
the comment section; only assigned reviewers can add, resolve or reopen
comments.

If the workspace says the file is not stored, the protocol was probably
submitted before document storage was enabled, or it was submitted under a
different browser origin (`localhost` versus `127.0.0.1`). The PI can re-upload
through Update Submission while the 48-hour window is open, or through the
revised/final protocol workflow. A legacy pointer record is automatically used
when only the older storage format exists.

## Profile photo

Every role can open **Settings & role guide** and upload a profile photo from
the device gallery. The image is cropped to a square profile thumbnail and shown
in the header for that role. It is stored in this browser with the role
workspace.

## Protocol form — no leading defaults

New protocol submissions do not preselect answers for activity type, education
level, frequency, research approach, study design, geographic coverage, gender,
target group, electronic data, GPS, tools, data format, accessibility or funding.
The user must make each choice explicitly.

## Role settings and instructions

Every role has a **Settings & role guide** page, available from the sidebar and
the header gear button. It shows the role's mandatory operating instructions,
role boundaries, notification status, theme preference and a printable guide.
These instructions are role-specific: PI submission and revision duties,
Secretariat screening and roster duties, reviewer assessment duties, Chair
decision duties and administrator access/audit duties.

## Update Submission — 48-hour correction window

The PI now has a clearly visible **Update Submission** option on a new
application. It is available for **48 hours from submission** and allows the PI
to:

- edit any submitted answer through the same eight-step form;
- replace the supporting letter, PI identification, CV or initial proposal;
- save updates without creating a new application ID;
- see the remaining time and the last update time.

Every replaced document receives a new version number and is recorded in the
activity trail. After the file is forwarded to reviewers, the initial protocol
PDF becomes read-only, but the PI can still correct the submitted answers and
supporting documents until the 48-hour window closes. Reviewers are notified and
the assessment is reset so the current version is reviewed. Protocol changes
after forwarding use the revised/final protocol PDF workflow.

## Initial and revised protocol workflows

The application now keeps two separate document workflows under the same
application ID:

- **Initial research protocol** — locked at submission. It is read-only from
  that point: the PI cannot replace, delete or version it. The original file and
  its timestamp remain available for every role.
- **Revised/final research protocol** — an independent PDF-only workflow. After
  a reviewer revision request, the PI can upload a new PDF at any time and
  submit it to the reviewers. It has its own versions, status, upload and
  submission timestamps. It never overwrites the initial protocol.

The 48-hour window continues to apply to revised supporting documents. The
revised/final research protocol PDF itself has **no time limit**.

## Revision workflow

After all assigned assessments are received, the Secretariat or Chairperson can
open **Request revisions (48h)** on the protocol. This:

- sends the PI a high-priority notification containing the reviewer comments and
  required changes;
- opens a **48-hour revision window** and shows the remaining time;
- lets the PI upload new versions of the supporting letter, PI identification,
  proposal and CV without administrator intervention;
- keeps every previous file version available through **Version history**;
- logs every upload, timestamp and revision request in the activity trail;
- lets the PI submit the revised package back to the reviewers for reassessment.

When the window expires, uploading is restricted automatically. The System
Administrator can extend the window by 48 hours from the protocol page. A
"Modifications Required" or "Deferred" decision letter also opens a new 48-hour
revision window.

## Notifications and activity

- A notification bell in the header shows unread items for the current role.
- The dashboard has a notification card and an activity timeline.
- Notifications carry a type, priority, read/unread state and relative/absolute
  date, and open the related protocol when selected.
- The latest activity is highlighted in the dashboard and protocol audit trail.

## Visual updates

- More legible question labels, larger answer controls and clearer spacing in
  the submission form.
- A brighter, higher-contrast Daylight palette with modern cards and buttons.
- Interactive submission-trend and workflow-mix charts on the dashboard.

## Important limitations at this stage

- **No real registration or login yet.** The role selector is still a workspace
  switch, not an authenticated account system. Google/LinkedIn sign-in, the
  administrator-created internal accounts and database-backed role permissions
  require the OAuth credentials and shared database described in the
  implementation plan.
- **The 48-hour window and notifications are enforced in this browser.** They
  will move to the shared server database when login is connected. A determined
  user can alter browser data, so this is not an audit-grade deadline until the
  server layer is in place. The revised/final protocol PDF workflow has no time
  limit, as specified.
- **Documents, revision comments and versions are stored in this browser's
  IndexedDB**, not on a shared server. Uploaded files, revised versions and the
  reviewer comments are visible to every role in this browser, but they will not
  appear to a reviewer on another computer or after clearing browser data. A
  shared database and file store are still required for cross-device review.
- **The roster is stored in this browser**, so members registered by the
  Secretariat are local to this browser until the shared database is connected.
- Protocols and safety reports are stored in this browser's `localStorage`
  under `aaphreml-irerc-portal-v3`. That avoids putting identifiable research
  data in a public database, but it is a single-browser workspace. The Google
  Apps Script edition remains the shared production system.
- The official clearance letter is printable. Email delivery requires a mail
  provider and is not enabled in this local build.
- The dependency/security note and deployment checklist are in `DEPLOYMENT.md`.

## Assets

`public/logo.png`, `public/signature.png` and `public/seal.png` are the
institutional letterhead assets. The signature is used by the clearance letter;
it should be moved behind authenticated storage before this edition is used as
an official system.
