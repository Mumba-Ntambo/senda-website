"use client";

import { useActionState, useId } from "react";

import { submitContact } from "@/app/actions";
import { Backdrop } from "@/components/Backdrop";
import { contactInitialState } from "@/shared/contact";
import { SectionHeading } from "@/shared/SectionHeading";
import { useContent } from "@/shared/ContentProvider";
import styles from "@/styles/Contact.module.css";

export function Contact() {
  const { content } = useContent();
  const { site, services, contactAsk, ui } = content;
  const [state, formAction, pending] = useActionState(
    submitContact,
    contactInitialState,
  );
  const id = useId();

  const field = (name: "name" | "email" | "company" | "message") => {
    const error = state.fieldErrors[name];
    return {
      id: `${id}-${name}`,
      name,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-${name}-error` : undefined,
    };
  };

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
    >
      {/* The same field as the hero, so the page closes on what it
          opened with. The slab above it is opaque, so the backdrop
          reads as the border around it rather than as texture behind
          the form. */}
      <Backdrop className={styles.canvas} />

      <div className={styles.inner}>
        {/* The two halves butt together inside one rounded block: a
            orange field and a white one, flush, so they read as a single
            object rather than two cards that happen to be adjacent. */}
        <div className={styles.panels}>
          <div className={styles.intro}>
            <SectionHeading
              eyebrow={site.contactEyebrow}
              title={site.contactTitle}
              emphasis={site.contactTitleEmphasis}
              id="contact-title"
            />
            <p className={styles.blurb}>{site.contactBody}</p>

            {/* The column was heading and nothing else, which is what
              left the section lopsided. These are the three details
              that make an enquiry answerable — useful to read before
              writing, so they belong beside the form rather than in
              placeholder text inside it. */}
            <dl className={styles.ask}>
              {contactAsk.map((item) => (
                <div className={styles.askItem} key={item.term}>
                  <dt className={styles.askTerm}>{item.term}</dt>
                  <dd className={styles.askDetail}>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <form className={styles.form} action={formAction} noValidate>
            <p className={styles.formTitle}>{site.contactFormTitle}</p>

            {/* A trap for form-filling bots: people never see or reach
                this field, so anything in it marks the submission as
                automated. See submitContact. */}
            <input
              className="visually-hidden"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Who is writing. Name and email share a row — both are
              short and both are about the sender, so pairing them
              stops the panel reading as five identical boxes. */}
            <div className={styles.group}>
              <div className={styles.pair}>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor={`${id}-name`}>
                    {ui.name}
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    {...field("name")}
                  />
                  {state.fieldErrors.name ? (
                    <p className={styles.error} id={`${id}-name-error`}>
                      {state.fieldErrors.name}
                    </p>
                  ) : null}
                </div>

                <div className={styles.row}>
                  <label className={styles.label} htmlFor={`${id}-email`}>
                    {ui.email}
                  </label>
                  <input
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    {...field("email")}
                  />
                  {state.fieldErrors.email ? (
                    <p className={styles.error} id={`${id}-email-error`}>
                      {state.fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.row}>
                <label className={styles.label} htmlFor={`${id}-company`}>
                  {ui.company}{" "}
                <span className={styles.optional}>{ui.optional}</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  autoComplete="organization"
                  {...field("company")}
                />
              </div>
            </div>

            {/* The hairline is the break between who you are and what
              you need — two genuinely different questions, so
              the rule carries information rather than decorating. */}
            <div className={`${styles.group} ${styles.groupSplit}`}>
              {/* Checkboxes, not a select: a project often needs more
                  than one service, and an app plus its backend is a
                  normal pairing rather than an edge case. A fieldset because the
                  legend has to name the whole group — a plain label
                  would only name whichever box followed it.

                  Optional on purpose. Someone with only an idea does
                  not yet know which service they need, and that is
                  exactly the person who should still be able to send
                  the form. */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>
                  {ui.servicesQuestion}{" "}
                  <span className={styles.optional}>{ui.optional}</span>
                </legend>

                <div className={styles.chips}>
                  {services.map((service) => (
                    <label className={styles.chip} key={service.title}>
                      <input
                        className={styles.chipInput}
                        type="checkbox"
                        name="services"
                        value={service.title}
                      />
                      <span className={styles.chipLabel}>{service.tag}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.row}>
                <label className={styles.label} htmlFor={`${id}-message`}>
                  {ui.messageQuestion}
                </label>
                <textarea
                  className={styles.textarea}
                  rows={6}
                  {...field("message")}
                />
                {state.fieldErrors.message ? (
                  <p className={styles.error} id={`${id}-message-error`}>
                    {state.fieldErrors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.submit}
                type="submit"
                disabled={pending}
              >
                {pending ? ui.sending : ui.send}
              </button>

              {/* Announced on change rather than on render. data-status
                lets the unconfigured case read as a warning without
                the copy having to say so twice. */}
              <p
                className={styles.status}
                data-status={state.message ? state.status : undefined}
                role="status"
                aria-live="polite"
              >
                {state.message}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
