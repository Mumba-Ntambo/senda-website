"use client";

import { useCallback, useEffect, useState } from "react";

import { browserSupabase } from "@/shared/supabase";
import styles from "@/styles/Admin.module.css";

type Status = "new" | "read" | "done";

type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  services: string[];
  message: string;
  status: Status;
};

const STATUSES: { key: Status; label: string }[] = [
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "done", label: "Done" },
];

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/* Everything sent through the site's contact form, newest first. */
export function Enquiries() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [confirming, setConfirming] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await browserSupabase()
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setRows(data as Enquiry[]);
  }, []);

  useEffect(() => {
    // Fetching on mount is the point of the effect; the state it sets
    // arrives asynchronously, after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function setStatus(id: string, status: Status) {
    setError("");
    const { error } = await browserSupabase()
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (error) setError(error.message);
    else
      setRows((current) =>
        (current ?? []).map((row) => (row.id === id ? { ...row, status } : row)),
      );
  }

  async function remove(id: string) {
    setError("");
    const { error } = await browserSupabase()
      .from("enquiries")
      .delete()
      .eq("id", id);

    setConfirming(null);
    if (error) setError(error.message);
    else setRows((current) => (current ?? []).filter((row) => row.id !== id));
  }

  if (!rows) {
    return <p className={styles.note}>{error || "Loading enquiries…"}</p>;
  }

  const count = (status: Status) =>
    rows.filter((row) => row.status === status).length;
  const shown =
    filter === "all" ? rows : rows.filter((row) => row.status === filter);

  return (
    <section aria-labelledby="enquiries-title">
      <div className={styles.head}>
        <h1 className={styles.title} id="enquiries-title">
          Enquiries
        </h1>
        <button className={styles.ghost} type="button" onClick={load}>
          Refresh
        </button>
      </div>

      <div className={styles.chips} role="group" aria-label="Filter by status">
        <button
          className={styles.chip}
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All ({rows.length})
        </button>
        {STATUSES.map((status) => (
          <button
            className={styles.chip}
            type="button"
            aria-pressed={filter === status.key}
            onClick={() => setFilter(status.key)}
            key={status.key}
          >
            {status.label} ({count(status.key)})
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
            ? "No enquiries yet. Messages sent from the contact form appear here."
            : "Nothing with that status."}
        </p>
      ) : (
        <ul className={styles.list}>
          {shown.map((row) => (
            <li className={styles.item} data-status={row.status} key={row.id}>
              <div className={styles.itemHead}>
                <div className={styles.who}>
                  <h2 className={styles.itemTitle}>{row.name}</h2>
                  <p className={styles.meta}>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                    {row.company ? ` · ${row.company}` : ""}
                  </p>
                </div>
                <time className={styles.when} dateTime={row.created_at}>
                  {when(row.created_at)}
                </time>
              </div>

              {row.services.length > 0 ? (
                <p className={styles.tags}>
                  {row.services.map((service) => (
                    <span className={styles.tag} key={service}>
                      {service}
                    </span>
                  ))}
                </p>
              ) : null}

              <p className={styles.message}>{row.message}</p>

              <div className={styles.actions}>
                <div
                  className={styles.segmented}
                  role="group"
                  aria-label={`Status of the enquiry from ${row.name}`}
                >
                  {STATUSES.map((status) => (
                    <button
                      className={styles.segment}
                      type="button"
                      aria-pressed={row.status === status.key}
                      onClick={() => setStatus(row.id, status.key)}
                      key={status.key}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>

                {/* Two steps, in place: a delete cannot be undone, and
                    a browser confirm box would block the page. */}
                {confirming === row.id ? (
                  <span className={styles.confirm}>
                    Delete for good?
                    <button
                      className={styles.danger}
                      type="button"
                      onClick={() => remove(row.id)}
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
