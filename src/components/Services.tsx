import type { CSSProperties } from "react";

import Image from "next/image";

import { Backdrop } from "@/components/Backdrop";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { serviceIcons } from "@/shared/serviceIcons";
import { content } from "@/shared/content";
import { SectionHeading } from "@/shared/SectionHeading";
import styles from "@/styles/Services.module.css";

export async function Services() {
  const { site, services, ui } = await content();

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

        {/* Even row of cards — no spans. Each follows the Material
            anatomy: avatar + title + secondary, media, supporting
            text, actions. */}
        <ServicesCarousel label={site.servicesEyebrow} ui={ui}>
          {services.map((service, index) => (
            <li
              className={styles.item}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
              key={service.title}
            >
              <article className={styles.card}>
                {/* The photo runs behind the header rather than
                    sitting in a band beneath it. alt="" on purpose:
                    it illustrates a service the title and supporting
                    text already name, so describing it again would
                    only add a redundant announcement. */}
                <div className={styles.banner}>
                  <Image
                    className={styles.image}
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
                  />

                  <header className={styles.head}>
                    <span className={styles.avatar} aria-hidden="true">
                      <svg
                        className={styles.avatarIcon}
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

                    <div className={styles.headText}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.secondary}>{service.tag}</p>
                    </div>
                  </header>
                </div>

                <p className={styles.supporting}>{service.body}</p>

              </article>

              {/* Outside the card, not inside it: the card is masked to
                  cut the notch, and a mask applies to descendants too —
                  a button within it would be cut away along with the
                  corner. It sits in the notch as a sibling instead. */}
              <a className={styles.action} href={service.href}>
                {site.servicesCardCta}
                <span className="visually-hidden">: {service.title}</span>
              </a>
            </li>
          ))}
        </ServicesCarousel>
      </div>
    </section>
  );
}
