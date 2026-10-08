"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useContent } from "@/shared/ContentProvider";
import { browserSupabase } from "@/shared/supabase";
import styles from "@/styles/Admin.module.css";

type Job = {
  id: string;
  created_at: string;
  title: string;
  type: string;
  location: string;
  area: string;
  summary: string;
  description: string;
  work_mode: string;
  compensation: string;
  closes_on: string | null;
  is_published: boolean;
};

const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["On-site", "Hybrid", "Remote"];

const today = () => new Date().toISOString().slice(0, 10);

/* Where a role stands, in the words the list shows. A published role
   past its closing date is already off the site, so it is not "live". */
function standing(job: Job) {
  if (!job.is_published) return { key: "draft", label: "Draft" };
  if (job.closes_on && job.closes_on < today())
    return { key: "closed", label: "Closed" };
  return { key: "live", label: "Live" };
}

/* The roles on the careers page: add, edit, publish, take down. */
export function Jobs() {
  const {
    content: { services },
  } = useContent();
  const [rows, setRows] = useState<Job[] | null>(null);
  const [error, setError] = useState("");
  /* null: form closed. "new": adding. Otherwise the role being edited. */
  const [editing, setEditing] = useState<Job | "new" | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await browserSupabase()
      .from("openings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setRows(data as Job[]);
  }, []);

  useEffect(() => {
    // Fetching on mount is the point of the effect; the state it sets
    // arrives asynchronously, after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "").trim();

    const values = {
      title: text("title"),
      type: text("type"),
      location: text("location"),
      area: text("area"),
      summary: text("summary"),
      description: text("description"),
      work_mode: text("work_mode"),
      compensation: text("compensation"),
      closes_on: text("closes_on") || null,
      is_published: form.get("is_published") === "on",
    };

    setBusy(true);
    setError("");
    const table = browserSupabase().from("openings");
    const { error } =
      editing && editing !== "new"
        ? await table.update(values).eq("id", editing.id)
        : await table.insert(values);
    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }
    setEditing(null);
    load();
  }

  async function publish(job: Job, is_published: boolean) {
    setError("");
    const { error } = await browserSupabase()
      .from("openings")
      .update({ is_published })
      .eq("id", job.id);

    if (error) setError(error.message);
    else load();
  }

  async function remove(id: string) {
    setError("");
    const { error } = await browserSupabase()
      .from("openings")
      .delete()
      .eq("id", id);

    setConfirming(null);
    if (error) setError(error.message);
    else load();
  }

  if (!rows) {
    return <p className={styles.note}>{error || "Loading job postings…"}</p>;
  }

  const current = editing && editing !== "new" ? editing : null;

  return (
    <section aria-labelledby="jobs-title">
      <div className={styles.head}>
        <h1 className={styles.title} id="jobs-title">
          Job postings
        </h1>
        {editing ? null : (
          <button
            className={styles.primary}
            type="button"
            onClick={() => setEditing("new")}
          >
            New role
          </button>
        )}
      </div>

      <p className={styles.note}>
        Live roles appear on the careers page within about a minute of a
        change. Each has its own page with an application form.
      </p>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      {editing ? (
        /* Keyed by the role, so opening a different one starts the
           form from that role's values rather than the last one's. */
        <form
          className={styles.form}
          onSubmit={save}
          key={current?.id ?? "new"}
        >
          <h2 className={styles.formTitle}>
            {current ? "Edit role" : "New role"}
          </h2>

          <label className={styles.field}>
            <span className={styles.label}>Job title</span>
            <input
              className={styles.input}
              name="title"
              defaultValue={current?.title}
              maxLength={160}
              required
            />
          </label>

          <div className={styles.pair}>
            <label className={styles.field}>
              <span className={styles.label}>Type</span>
              <select
                className={styles.input}
                name="type"
                defaultValue={current?.type ?? TYPES[0]}
              >
                {TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Location</span>
              <input
                className={styles.input}
                name="location"
                defaultValue={current?.location ?? "Lusaka"}
                maxLength={120}
                required
              />
            </label>
          </div>

          <div className={styles.pair}>
            <label className={styles.field}>
              <span className={styles.label}>Area (optional)</span>
              <select
                className={styles.input}
                name="area"
                defaultValue={current?.area ?? ""}
              >
                <option value="">None</option>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Closing date (optional)</span>
              <input
                className={styles.input}
                type="date"
                name="closes_on"
                defaultValue={current?.closes_on ?? ""}
              />
            </label>
          </div>

          <div className={styles.pair}>
            <label className={styles.field}>
              <span className={styles.label}>Location type (optional)</span>
              <select
                className={styles.input}
                name="work_mode"
                defaultValue={current?.work_mode ?? ""}
              >
                <option value="">Not shown</option>
                {WORK_MODES.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Compensation (optional)</span>
              <input
                className={styles.input}
                name="compensation"
                defaultValue={current?.compensation}
                maxLength={200}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Summary (one or two lines)</span>
            <textarea
              className={styles.input}
              name="summary"
              rows={4}
              defaultValue={current?.summary}
              maxLength={1000}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Full description (optional)</span>
            <textarea
              className={styles.input}
              name="description"
              rows={10}
              defaultValue={current?.description}
              maxLength={20000}
              aria-describedby="job-description-hint"
            />
            <span className={styles.hint} id="job-description-hint">
              Shown on the role&apos;s own page, above the application form.
              Leave a blank line between paragraphs.
            </span>
          </label>

          <label className={styles.check}>
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={current?.is_published ?? false}
            />
            Show on the careers page
          </label>

          <div className={styles.actions}>
            <button className={styles.primary} type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save role"}
            </button>
            <button
              className={styles.ghost}
              type="button"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {rows.length === 0 ? (
        <p className={styles.note}>No roles yet.</p>
      ) : (
        <ul className={styles.list}>
          {rows.map((job) => {
            const state = standing(job);
            return (
              <li className={styles.item} key={job.id}>
                <div className={styles.itemHead}>
                  <div className={styles.who}>
                    <h2 className={styles.itemTitle}>{job.title}</h2>
                    <p className={styles.meta}>
                      {[job.area, job.type, job.location]
                        .filter(Boolean)
                        .join(" · ")}
                      {job.closes_on ? ` · closes ${job.closes_on}` : ""}
                    </p>
                  </div>
                  <span className={styles.state} data-state={state.key}>
                    {state.label}
                  </span>
                </div>

                <p className={styles.message}>{job.summary}</p>

                <div className={styles.actions}>
                  <button
                    className={styles.ghost}
                    type="button"
                    onClick={() => setEditing(job)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.ghost}
                    type="button"
                    onClick={() => publish(job, !job.is_published)}
                  >
                    {job.is_published ? "Take down" : "Publish"}
                  </button>

                  {confirming === job.id ? (
                    <span className={styles.confirm}>
                      Delete for good?
                      <button
                        className={styles.danger}
                        type="button"
                        onClick={() => remove(job.id)}
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
                      onClick={() => setConfirming(job.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
