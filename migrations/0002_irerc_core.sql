-- AAPHREML-IRERC core schema (shared, server-authoritative data).
-- Replaces the browser-only localStorage / IndexedDB stores.
-- Depends on 0001_auth.sql ("user" table). Never edit once applied; add 0003_*.sql instead.

-- ---------------------------------------------------------------- roles
-- Roles are decided here on the server, never taken from the browser.
create table if not exists irerc_user_role (
  user_id      text primary key references "user" ("id") on delete cascade,
  role         text not null check (role in ('investigator','secretariat','reviewer','chair','admin')),
  display_name text,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Committee roster (a member may or may not have a login yet).
create table if not exists irerc_member (
  id          text primary key,
  user_id     text references "user" ("id") on delete set null,
  name        text not null,
  category    text not null,
  seat        text not null check (seat in ('Chairperson','Member','Lay member')),
  institution text not null default '',
  email       text not null default '',
  phone       text not null default '',
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists irerc_member_user_idx on irerc_member (user_id);

-- ------------------------------------------------------------ protocols
-- Race-free protocol numbering: AAPHREML-IRERC-<year>-<0001>.
create table if not exists irerc_protocol_counter (
  year int primary key,
  last int not null default 0
);

create table if not exists irerc_protocol (
  id                       text primary key,
  pi_user_id               text not null references "user" ("id"),
  title                    text not null,
  status                   text not null,
  review_type              text,
  decision                 text,
  submitted_at             timestamptz not null default now(),
  submission_update_until  timestamptz,
  submission_updated_at    timestamptz,
  initial_protocol_locked_at timestamptz,
  -- Full Protocol object the UI renders (submission form, docs, reviews, votes,
  -- revision, amendment, ...). Queryable fields are mirrored in the columns above.
  data                     jsonb not null,
  row_version              integer not null default 1,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);
create index if not exists irerc_protocol_pi_idx     on irerc_protocol (pi_user_id);
create index if not exists irerc_protocol_status_idx on irerc_protocol (status);

-- Reviewer assignment: this is what scopes a reviewer to "assigned protocols only".
create table if not exists irerc_protocol_reviewer (
  protocol_id text not null references irerc_protocol (id) on delete cascade,
  member_id   text not null references irerc_member (id),
  assigned_at timestamptz not null default now(),
  primary key (protocol_id, member_id)
);

-- ------------------------------------------------------------ documents
-- Files are stored in Postgres (bytea) for now; 15 MB per file is enforced in code.
-- Move to a private object store later by adding a storage_key column.
create table if not exists irerc_document (
  id          uuid primary key default gen_random_uuid(),
  protocol_id text not null references irerc_protocol (id) on delete cascade,
  code        text not null,
  version     integer not null,
  name        text not null,
  mime        text not null default 'application/octet-stream',
  size        integer not null,
  sha256      text not null,
  content     bytea not null,
  uploaded_by text not null references "user" ("id"),
  uploaded_by_label text not null default '',
  note        text not null default '',
  uploaded_at timestamptz not null default now(),
  unique (protocol_id, code, version)
);

create table if not exists irerc_document_comment (
  id          text primary key,
  protocol_id text not null references irerc_protocol (id) on delete cascade,
  code        text not null,
  version     integer not null,
  author_id   text not null references "user" ("id"),
  author      text not null,
  author_role text not null,
  body        text not null,
  quote       text not null default '',
  resolved    boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists irerc_doc_comment_protocol_idx on irerc_document_comment (protocol_id);

-- ------------------------------------------------- safety, notifications
create table if not exists irerc_safety_report (
  id          text primary key,
  protocol_id text not null references irerc_protocol (id) on delete cascade,
  event       text not null,
  event_date  date not null,
  relatedness text not null,
  seriousness text not null,
  status      text not null,
  note        text not null default '',
  filed_by    text references "user" ("id"),
  created_at  timestamptz not null default now()
);

create table if not exists irerc_notification (
  id             text primary key,
  protocol_id    text references irerc_protocol (id) on delete cascade,
  recipient_role text not null,          -- a role key, or 'all'
  recipient_user text references "user" ("id") on delete cascade, -- null = whole role
  type           text not null,
  priority       text not null default 'normal',
  title          text not null,
  body           text not null,
  created_at     timestamptz not null default now()
);
create index if not exists irerc_notification_role_idx on irerc_notification (recipient_role, created_at desc);

create table if not exists irerc_notification_read (
  notification_id text not null references irerc_notification (id) on delete cascade,
  user_id         text not null references "user" ("id") on delete cascade,
  read_at         timestamptz not null default now(),
  primary key (notification_id, user_id)
);

-- ------------------------------------------------------------ audit trail
-- Append-only. Updates and deletes are rejected by trigger.
create table if not exists irerc_audit (
  id          bigserial primary key,
  protocol_id text,
  at          timestamptz not null default now(),
  actor_id    text,
  actor_label text not null,
  role        text,
  action      text not null,
  note        text not null default ''
);
create index if not exists irerc_audit_protocol_idx on irerc_audit (protocol_id, at);

create or replace function irerc_audit_immutable() returns trigger as $$
begin
  raise exception 'irerc_audit is append-only';
end;
$$ language plpgsql;

drop trigger if exists irerc_audit_no_update on irerc_audit;
create trigger irerc_audit_no_update
  before update or delete on irerc_audit
  for each row execute function irerc_audit_immutable();
