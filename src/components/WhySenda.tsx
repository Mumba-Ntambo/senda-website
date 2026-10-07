import type { CSSProperties } from "react";

import { reasonIcons } from "@/shared/reasonIcons";
import { SectionHeading } from "@/shared/SectionHeading";
import { content } from "@/shared/content";
import styles from "@/styles/WhySenda.module.css";

/* Centred heading, then the four supporting reasons split either side
   of the lead reason, which takes the middle. Parallel claims, so <ul>
   rather than <ol> — numbering them would promise a sequence. */
export async function WhySenda() {
  const { site, reasons } = await content();

  const lead = reasons.find((reason) => reason.lead);
  const rest = reasons.filter((reason) => !reason.lead);
  const columns = [rest.slice(0, 2), rest.slice(2)];

  return (
    <section className={styles.section} id="why" aria-labelledby="why-title">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={site.whyEyebrow}
          title={site.whyTitle}
          emphasis={site.whyTitleEmphasis}
          subtitle={site.whySubtitle}
          align="center"
          id="why-title"
        />

        <div className={styles.layout}>
          {columns.map((column, side) => (
            <ul className={styles.column} key={side === 0 ? "left" : "right"}>
              {column.map((reason, index) => (
                <li
                  className={styles.item}
                  data-reveal={side === 0 ? "left" : "right"}
                  style={
                    { "--reveal-delay": `${index * 110}ms` } as CSSProperties
                  }
                  key={reason.title}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {reasonIcons[reason.icon]}
                    </svg>
                  </span>
                  <h3 className={styles.title}>{reason.title}</h3>
                  <p className={styles.body}>{reason.body}</p>
                </li>
              ))}
            </ul>
          ))}

          {/* Source order puts this last so the two reason columns read
              in sequence to a screen reader; grid-column places it in
              the middle visually. */}
          {lead ? (
            <div className={styles.centre} data-reveal="">
              <article className={styles.card}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {reasonIcons[lead.icon]}
                  </svg>
                </span>
                <h3 className={styles.cardTitle}>{lead.title}</h3>
                <p className={styles.cardBody}>{lead.body}</p>
              </article>
            </div>
          ) : null}
        </div>

        <div className={styles.actions}>
          <a className={styles.cta} href={site.whyCtaHref} data-reveal="">
            {site.whyCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
