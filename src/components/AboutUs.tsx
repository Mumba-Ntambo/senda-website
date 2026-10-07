import type { CSSProperties } from "react";

import { Milestones } from "@/components/Milestones";
import { content } from "@/shared/content";
import { Words } from "@/shared/Words";
import styles from "@/styles/AboutUs.module.css";

/* A split panel: all the copy on one side, the "how we work" carousel
   on the other, divided by a rule running the section's full height.

   The rule is why every piece of text sits in one column. A line can
   only split the section if nothing crosses it, so the intro cannot run
   full width the way the reference has it. */
export async function AboutUs() {
  const { site, aboutStats } = await content();

  return (
    <section
      className={styles.section}
      id="about-us"
      aria-labelledby="about-us-title"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2
            className={styles.title}
            id="about-us-title"
            data-reveal-words=""
            style={{ "--word-step": "90ms" } as CSSProperties}
          >
            <Words text={site.aboutUsTitle} />
          </h2>

          <p
            className={styles.lead}
            data-reveal-words=""
            style={
              { "--word-base": "180ms", "--word-step": "22ms" } as CSSProperties
            }
          >
            <Words text={site.aboutUsLead} />
          </p>

          {/* Indented from the heading above, which is what gives the
              block its stepped left edge rather than a flat margin. */}
          <div className={styles.aside}>
            <p className={styles.support} data-reveal="left">
              {site.aboutUsSupport}
            </p>

            <a
              className={styles.cta}
              href={site.aboutUsCtaHref}
              data-reveal="left"
              style={{ "--reveal-delay": "140ms" } as CSSProperties}
            >
              <span>{site.aboutUsCtaLabel}</span>
              <svg
                className={styles.ctaIcon}
                viewBox="0 0 20 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 6h17M13 1l5 5-5 5" />
              </svg>
            </a>

            <ul className={styles.stats}>
              {aboutStats.map((stat, index) => (
                <li
                  className={styles.stat}
                  data-reveal="left"
                  style={
                    { "--reveal-delay": `${260 + index * 90}ms` } as CSSProperties
                  }
                  key={stat.label}
                >
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The panel's own left edge is the dividing line now — a grey
            hairline, then a gap, then an orange field would read as two
            separate divisions rather than one split. */}
        <div className={styles.panel}>
          {/* Enters from the opposite edge to the copy, so the two
              halves converge as the panel rides up over the hero. The
              wrapper exists only to carry the reveal — the panel
              itself must not move, or its full-bleed orange would pull
              away from the viewport edge. */}
          <div
            data-reveal="right"
            style={{ "--reveal-delay": "200ms" } as CSSProperties}
          >
            <Milestones label={site.milestonesLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
