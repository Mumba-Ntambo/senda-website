import type { CSSProperties } from "react";

import Image from "next/image";

import { Backdrop } from "@/components/Backdrop";
import { content } from "@/shared/content";
import type { Person } from "@/shared/types";
import styles from "@/styles/Profile.module.css";

/* One person's page: the products page's dark band carrying the name,
   then a light section with the portrait beside the words. */
export async function Profile({ person }: { person: Person }) {
  const { site } = await content();

  return (
    <>
      <section className={styles.hero} aria-labelledby="profile-title">
        <Backdrop className={styles.canvas} />
        <div className={styles.vignette} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{site.teamEyebrow}</p>
          <h1 className={styles.headline} id="profile-title">
            {person.name}
          </h1>
          <p className={styles.subhead}>{person.role}</p>
        </div>
      </section>

      <section className={styles.profile} aria-label={person.name}>
        <div className={styles.inner}>
          <figure className={styles.media} data-reveal="left">
            <Image
              className={styles.image}
              src={person.image}
              alt={person.name}
              fill
              sizes="(max-width: 64rem) 90vw, 26rem"
              priority
            />
          </figure>

          <div
            className={styles.copy}
            data-reveal="right"
            style={{ "--reveal-delay": "140ms" } as CSSProperties}
          >
            <p className={styles.lead}>{person.lead}</p>

            {person.bio.map((paragraph) => (
              <p className={styles.body} key={paragraph}>
                {paragraph}
              </p>
            ))}

            <h2 className={styles.interestsTitle}>
              {site.teamInterestsTitle}
            </h2>
            <ul className={styles.interests}>
              {person.interests.map((interest) => (
                <li className={styles.interest} key={interest}>
                  {interest}
                </li>
              ))}
            </ul>

            <a className={styles.cta} href={site.teamCtaHref}>
              {site.teamCtaLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
