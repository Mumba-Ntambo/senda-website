"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";

import { useContent } from "@/shared/ContentProvider";
import { browserSupabase, supabaseConfigured } from "@/shared/supabase";
import styles from "@/styles/Role.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

type Errors = Partial<Record<"name" | "email" | "cv", string>>;

/* The application for one role. The CV goes straight from the browser
   into private storage and the details into the applications table —
   both as an anonymous visitor, who may add and may not read. The
   limits checked here are a courtesy; the database and the storage
   bucket enforce the same ones for real. */
export function ApplyForm({
  openingId,
  roleTitle,
}: {
  openingId: string;
  roleTitle: string;
}) {
  const {
    content: { apply, ui },
  } = useContent();
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const [fileName, setFileName] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "").trim();
    const cv = form.get("cv");

    const found: Errors = {};
    if (!text("name")) found.name = apply.missing;
    if (!text("email")) found.email = apply.missing;
    else if (!EMAIL.test(text("email"))) found.email = apply.badEmail;
    if (
      !(cv instanceof File) ||
      cv.size === 0 ||
      cv.size > MAX_BYTES ||
      !TYPES.includes(cv.type)
    )
      found.cv = apply.badFile;

    setErrors(found);
    if (Object.keys(found).length > 0 || !(cv instanceof File)) return;

    /* The hidden trap field was filled in, so this is a bot. It is
       shown success and nothing is stored. */
    if (text("website")) {
      setState("sent");
      return;
    }

    if (!supabaseConfigured) {
      setState("failed");
      return;
    }

    setState("sending");
    const supabase = browserSupabase();

    /* A random folder, so one applicant's file cannot be found from
       another's, and the original name survives for whoever reads it. */
    const safeName = cv.name.replace(/[^\w.\-]+/g, "_").slice(-80);
    const path = `${crypto.randomUUID()}/${safeName}`;

    const upload = await supabase.storage
      .from("cvs")
      .upload(path, cv, { contentType: cv.type });
    if (upload.error) {
      setState("failed");
      return;
    }

    const { error } = await supabase.from("applications").insert({
      opening_id: openingId,
      role_title: roleTitle,
      name: text("name").slice(0, 200),
      email: text("email").slice(0, 320),
      phone: text("phone").slice(0, 40),
      location: text("location").slice(0, 120),
      link: text("link").slice(0, 300),
      note: text("note").slice(0, 5000),
      cv_path: path,
    });

    setState(error ? "failed" : "sent");
  }

  if (state === "sent") {
    return (
      <div className={styles.sent} id="apply" role="status">
        <h2 className={styles.sentTitle}>{apply.sentTitle}</h2>
        <p className={styles.hint}>{apply.sentBody}</p>
      </div>
    );
  }

  const invalid = (name: "name" | "email" | "cv") => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  const problem = (name: "name" | "email" | "cv") =>
    errors[name] ? (
      <p className={styles.error} id={`${id}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const star = (
    <span className={styles.star} aria-hidden="true">
      *
    </span>
  );

  return (
    <form
      className={styles.form}
      id="apply"
      onSubmit={submit}
      /* A field's complaint goes as soon as the field is touched
         again, rather than sitting there until the next submit. */
      onChange={(event) => {
        const name = (event.target as { name?: string }).name ?? "";
        if (name in errors) setErrors({ ...errors, [name]: undefined });
      }}
      noValidate
    >
      {/* A trap for form-filling bots: people never see or reach it. */}
      <input
        className="visually-hidden"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* The CV first, in its own box. The real file input is kept in
          the page, under the button that stands for it, so it stays
          focusable and is announced as what it is. */}
      <div className={styles.upload} data-invalid={errors.cv ? "" : undefined}>
        <div className={styles.uploadCopy}>
          <p className={styles.uploadTitle}>
            {apply.title}
            {star}
          </p>
          <p className={styles.hint} id={`${id}-cv-hint`}>
            {fileName || `${apply.intro} ${apply.cvHint}`}
          </p>
          {problem("cv")}
        </div>
        <label className={styles.uploadButton}>
          <input
            className={styles.fileInput}
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            aria-label={apply.cv}
            aria-invalid={errors.cv ? true : undefined}
            aria-describedby={
              errors.cv ? `${id}-cv-error` : `${id}-cv-hint`
            }
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? "")
            }
          />
          {fileName ? apply.changeFile : apply.uploadFile}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-name`}>
          {apply.name}
          {star}
        </label>
        <input
          className={styles.input}
          id={`${id}-name`}
          type="text"
          name="name"
          autoComplete="name"
          placeholder={apply.placeholder}
          required
          {...invalid("name")}
        />
        {problem("name")}
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-email`}>
          {apply.email}
          {star}
        </label>
        <input
          className={styles.input}
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={apply.placeholder}
          required
          {...invalid("email")}
        />
        {problem("email")}
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-phone`}>
          {apply.phone} <span className={styles.optional}>{ui.optional}</span>
        </label>
        <input
          className={styles.input}
          id={`${id}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder={apply.placeholder}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-location`}>
          {apply.location}{" "}
          <span className={styles.optional}>{ui.optional}</span>
        </label>
        <input
          className={styles.input}
          id={`${id}-location`}
          type="text"
          name="location"
          autoComplete="address-level2"
          placeholder={apply.placeholder}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-link`}>
          {apply.link} <span className={styles.optional}>{ui.optional}</span>
        </label>
        <p className={styles.hint} id={`${id}-link-hint`}>
          {apply.linkHint}
        </p>
        <input
          className={styles.input}
          id={`${id}-link`}
          type="url"
          name="link"
          autoComplete="url"
          placeholder={apply.placeholder}
          aria-describedby={`${id}-link-hint`}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor={`${id}-note`}>
          {apply.note} <span className={styles.optional}>{ui.optional}</span>
        </label>
        <p className={styles.hint} id={`${id}-note-hint`}>
          {apply.noteHint}
        </p>
        <textarea
          className={styles.input}
          id={`${id}-note`}
          name="note"
          rows={6}
          placeholder={apply.placeholder}
          aria-describedby={`${id}-note-hint`}
        />
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? apply.sending : apply.submit}
      </button>

      <p className={styles.status} role="status" aria-live="polite">
        {state === "failed" ? apply.failed : ""}
      </p>

      <p className={styles.hint}>{apply.privacy}</p>
    </form>
  );
}
