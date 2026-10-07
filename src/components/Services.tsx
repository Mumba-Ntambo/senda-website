import type { CSSProperties } from "react";

import { Backdrop } from "@/components/Backdrop";
import { serviceIcons } from "@/shared/serviceIcons";
import { content } from "@/shared/content";
import { SectionHeading } from "@/shared/SectionHeading";
import styles from "@/styles/Services.module.css";

/* A numbered index rather than a row of cards: one ruled line per
   service, read top to bottom. Each row is a single link to the
   contact form, so the whole line is the target, not a button tucked
   in a corner. */
export async function Services() {
  const { site, services } = await content();

  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-title"
    >
      <Backdrop className={styles.canvas} />

      <div className={styles.inner}>
        <SectionHeading
          eyebrow={site.servicesEyebrow}
          title={site.servicesTitle}
          emphasis={site.servicesTitleEmphasis}
          subtitle={site.servicesSubtitle}
          align="center"
          id="services-title"
        />

        <ol className={styles.list}>
          {services.map((service, index) => (
            <li
              className={styles.item}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              key={service.title}
            >
              <a className={styles.row} href={service.href}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.icon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {serviceIcons[service.icon]}
                  </svg>
                </span>

                <span className={styles.heading}>
                  <span className={styles.title}>{service.title}</span>
                  <span className={styles.tag}>{service.tag}</span>
                </span>

                <span className={styles.body}>{service.body}</span>

                <span className={styles.go}>
                  <span className="visually-hidden">
                    {site.servicesCardCta}: {service.title}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
