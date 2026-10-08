import Link from "next/link";

import { ApplyForm } from "@/components/ApplyForm";
import { RoleTabs } from "@/components/RoleTabs";
import { content } from "@/shared/content";
import { Logo } from "@/shared/Logo";
import { RichText } from "@/shared/RichText";
import type { Opening } from "@/shared/types";
import styles from "@/styles/Role.module.css";

/* One role's own page, laid out as a plain working page rather than a
   marketing one: a bare bar with the way back and the logo, the title,
   the facts down the side, and the advert and the application form as
   two tabs beside them. */
export async function Role({ opening }: { opening: Opening }) {
  const { site, apply } = await content();

  const facts = [
    { label: apply.factLocation, value: opening.location },
    { label: apply.factType, value: opening.type },
    { label: apply.factWorkMode, value: opening.workMode },
    { label: apply.factArea, value: opening.area },
    { label: apply.factCompensation, value: opening.compensation },
    {
      label: apply.factCloses,
      value: opening.closesOn
        ? /* Noon UTC, so the date does not slip a day in a timezone
             behind it. */
          new Date(`${opening.closesOn}T12:00:00Z`).toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "long", year: "numeric" },
          )
        : undefined,
    },
  ].filter((fact) => fact.value);

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <Link
          className={styles.back}
          href="/careers#open-roles"
          aria-label={apply.backToRoles}
        >
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 12H4M10 6l-6 6 6 6" />
          </svg>
        </Link>
        <Link className={styles.brand} href="/" aria-label={site.name}>
          <Logo name={site.name} />
        </Link>
      </header>

      <main className={styles.inner}>
        <h1 className={styles.title}>{opening.title}</h1>

        <div className={styles.columns}>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}

            {/* The role in a few lines, beside the form: someone
                filling in the Application tab should not have to
                switch back to remember what they are applying for. */}
            <div className={`${styles.fact} ${styles.about}`}>
              <dt className={styles.factLabel}>{apply.factAbout}</dt>
              <dd className={styles.factNote}>{opening.summary}</dd>
            </div>
          </dl>

          <RoleTabs
            overview={
              <>
                <p className={styles.summary}>{opening.summary}</p>
                {opening.description ? (
                  <RichText source={opening.description} />
                ) : null}
              </>
            }
            application={
              <ApplyForm openingId={opening.id} roleTitle={opening.title} />
            }
          />
        </div>
      </main>
    </div>
  );
}
