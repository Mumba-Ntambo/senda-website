import type { CSSProperties } from "react";

import { Backdrop } from "@/components/Backdrop";
import { Openings } from "@/components/Openings";
import { content } from "@/shared/content";
import { publishedOpenings } from "@/shared/openings";
import styles from "@/styles/Careers.module.css";

/* The careers page: the products page's dark band carrying the title,
   then the work beside the open application, and the open roles —
   with their search and filters — across the full width beneath. */
export async function Careers() {
  const { site, services } = await content();
  const openings = await publishedOpenings();

  return (
    <>
      <section className={styles.hero} aria-labelledby="careers-title">
        <Backdrop className={styles.canvas} />
        <div className={styles.vignette} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{site.careersEyebrow}</p>
          <h1 className={styles.headline} id="careers-title">
            {site.careersTitle}
            <span className={styles.headlineEmphasis}>
              {site.careersTitleEmphasis}
            </span>
          </h1>
          <p className={styles.subhead}>{site.careersSubhead}</p>
        </div>
      </section>

      <section className={styles.careers} aria-label={site.careersEyebrow}>
        <div className={styles.inner}>
          <div className={styles.copy} data-reveal="left">
            <h2 className={styles.title}>{site.careersWorkTitle}</h2>
            <p className={styles.body}>{site.careersWorkBody}</p>

            {/* The services, not a second list: the areas someone
                could work in are the things the company does. */}
            <h3 className={styles.label}>{site.careersAreasTitle}</h3>
            <ul className={styles.areas}>
              {services.map((service) => (
                <li className={styles.area} key={service.title}>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={styles.roles}
            data-reveal="right"
            style={{ "--reveal-delay": "140ms" } as CSSProperties}
          >
            <h2 className={styles.rolesTitle}>{site.careersApplyTitle}</h2>
            <p className={styles.apply}>{site.careersApplyBody}</p>
            <a className={styles.cta} href={site.careersApplyHref}>
              {site.careersApplyLabel}
            </a>
            <p className={styles.address}>{site.contactEmail}</p>
          </div>

          <div className={styles.openings} id="open-roles">
            <h2 className={styles.title}>{site.careersOpeningsTitle}</h2>
            {openings.length > 0 ? (
              <Openings openings={openings} />
            ) : (
              <p className={styles.empty}>{site.careersOpeningsEmpty}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
