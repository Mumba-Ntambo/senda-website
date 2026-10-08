"use client";

import { useCallback, useEffect, useState } from "react";

import { sendRejection } from "@/app/admin/actions";
import { rejectionMessage } from "@/shared/rejection";
import { browserSupabase } from "@/shared/supabase";
import styles from "@/styles/Admin.module.css";

type Status = "new" | "reviewing" | "shortlisted" | "rejected";

type Application = {
  id: string;
  created_at: string;
  role_title: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  link: string;
  note: string;
  cv_path: string;
  status: Status;
  rejection_sent_at: string | null;
};

const STATUSES: { key: Status; label: string }[] = [
  { key: "new", label: "New" },
  { key: "reviewing", label: "Reviewing" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "rejected", label: "Rejected" },
];

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/* Only http(s) links are made clickable: the field is free text from
   a stranger, and anything else stays as plain text. */
const safeLink = (link: string) => /^https?:\/\//i.test(link);

/* The same rejection as a Gmail draft, for the one that needs a
   personal word before it goes. A mailto: link would open whatever mail
   app the computer defaults to, which is rarely the admin's inbox. */
const rejectionDraft = (row: Application) => {
  const { subject, body } = rejectionMessage(row);
  const draft = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: row.email,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${draft}`;
};

/* Everyone who has applied through a role's page, newest first. */
export function Applications() {
  const [rows, setRows] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [role, setRole] = useState("all");
  const [status, setFilter] = useState<Status | "all">("all");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await browserSupabase()
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setRows(data as Application[]);
  }, []);

  useEffect(() => {
    // Fetching on mount is the point of the effect; the state it sets
    // arrives asynchronously, after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function setStatus(id: string, next: Status) {
    setError("");
    const { error } = await browserSupabase()
      .from("applications")
      .update({ status: next })
      .eq("id", id);

    if (error) setError(error.message);
    else
      setRows((current) =>
        (current ?? []).map((row) =>
          row.id === id ? { ...row, status: next } : row,
        ),
      );
  }

  /* The server sends it, as this admin: it is handed their session so
     that the database, not the server, decides whether they may. */
  async function reject(row: Application) {
    setError("");
    setSending(row.id);

    const { data } = await browserSupabase().auth.getSession();
    const result = await sendRejection(
      row.id,
      data.session?.access_token ?? "",
    ).catch(() => ({ ok: false as const, message: "Could not reach the site." }));

    setSending(null);
    if (!result.ok) setError(result.message);
    else
      setRows((current) =>
        (current ?? []).map((r) =>
          r.id === row.id ? { ...r, rejection_sent_at: result.sentAt } : r,
        ),
      );
  }

  /* The CV bucket is private, so there is no address to link to. A
     link is made on request, for this admin, and expires in a minute. */
  async function openCv(path: string) {
    setError("");
    const { data, error } = await browserSupabase()
      .storage.from("cvs")
      .createSignedUrl(path, 60);

    if (error || !data) setError(error?.message ?? "Could not open the CV.");
    else window.open(data.signedUrl, "_blank", "noopener");
  }

  /* The file goes with the record: a deleted application should not
     leave someone's CV behind in storage. */
  async function remove(row: Application) {
    setError("");
    const supabase = browserSupabase();
    const file = await supabase.storage.from("cvs").remove([row.cv_path]);
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", row.id);

    setConfirming(null);
    if (error || file.error)
      setError((error ?? file.error)?.message ?? "Could not delete.");
    if (!error) setRows((current) => (current ?? []).filter((r) => r.id !== row.id));
  }

  if (!rows) {
    return <p className={styles.note}>{error || "Loading applications…"}</p>;
  }

  const roles = Array.from(new Set(rows.map((row) => row.role_title)));
  const shown = rows.filter(
    (row) =>
      (role === "all" || row.role_title === role) &&
      (status === "all" || row.status === status),
  );

  return (
    <section aria-labelledby="applications-title">
      <div className={styles.head}>
        <h1 className={styles.title} id="applications-title">
          Applications
        </h1>
        <button className={styles.ghost} type="button" onClick={load}>
          Refresh
        </button>
      </div>

      {roles.length > 1 ? (
        <label className={styles.filter}>
          <span className={styles.label}>Role</span>
          <select
            className={styles.input}
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="all">All roles ({rows.length})</option>
            {roles.map((title) => (
              <option value={title} key={title}>
                {title} ({rows.filter((row) => row.role_title === title).length})
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className={styles.chips} role="group" aria-label="Filter by status">
        <button
          className={styles.chip}
          type="button"
          aria-pressed={status === "all"}
          onClick={() => setFilter("all")}
        >
          All ({rows.length})
        </button>
        {STATUSES.map((item) => (
          <button
            className={styles.chip}
            type="button"
            aria-pressed={status === item.key}
            onClick={() => setFilter(item.key)}
            key={item.key}
          >
            {item.label} ({rows.filter((row) => row.status === item.key).length})
          </button>
        ))}
      </div>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      {shown.length === 0 ? (
        <p className={styles.note}>
          {rows.length === 0
            ? "No applications yet. They appear here when someone applies on a role's page."
            : "Nothing matches those filters."}
        </p>
      ) : (
        <ul className={styles.list}>
          {shown.map((row) => (
            <li className={styles.item} data-status={row.status} key={row.id}>
              <div className={styles.itemHead}>
                <div className={styles.who}>
                  <h2 className={styles.itemTitle}>{row.name}</h2>
                  <p className={styles.meta}>
                    {row.role_title}
                    {row.location ? ` · ${row.location}` : ""}
                  </p>
                  <p className={styles.meta}>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                    {row.phone ? ` · ${row.phone}` : ""}
                  </p>
                  {row.link ? (
                    <p className={styles.meta}>
                      {safeLink(row.link) ? (
                        <a href={row.link} target="_blank" rel="noreferrer">
                          {row.link}
                        </a>
                      ) : (
                        row.link
                      )}
                    </p>
                  ) : null}
                </div>
                <time className={styles.when} dateTime={row.created_at}>
                  {when(row.created_at)}
                </time>
              </div>

              {row.note ? <p className={styles.message}>{row.note}</p> : null}

              <div className={styles.actions}>
                <div
                  className={styles.segmented}
                  role="group"
                  aria-label={`Status of the application from ${row.name}`}
                >
                  {STATUSES.map((item) => (
                    <button
                      className={styles.segment}
                      type="button"
                      aria-pressed={row.status === item.key}
                      onClick={() => setStatus(row.id, item.key)}
                      key={item.key}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  className={styles.primary}
                  type="button"
                  onClick={() => openCv(row.cv_path)}
                >
                  Open CV
                </button>

                {row.rejection_sent_at ? (
                  <span className={styles.when}>
                    Rejection emailed {when(row.rejection_sent_at)}
                  </span>
                ) : row.status === "rejected" ? (
                  <>
                    <button
                      className={styles.ghost}
                      type="button"
                      disabled={sending === row.id}
                      onClick={() => reject(row)}
                    >
                      {sending === row.id ? "Sending…" : "Send rejection email"}
                    </button>
                    <a
                      className={styles.ghost}
                      href={rejectionDraft(row)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Edit in Gmail
                    </a>
                  </>
                ) : null}

                {confirming === row.id ? (
                  <span className={styles.confirm}>
                    Delete with CV?
                    <button
                      className={styles.danger}
                      type="button"
                      onClick={() => remove(row)}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.ghost}
                      type="button"
                      onClick={() => setConfirming(null)}
                    >
                      Keep
                    </button>
                  </span>
                ) : (
                  <button
                    className={styles.ghost}
                    type="button"
                    onClick={() => setConfirming(row.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
