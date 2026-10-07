import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";

import { Backdrop } from "@/components/Backdrop";
import { content } from "@/shared/content";
import styles from "@/styles/Team.module.css";

/* The team page: the products page's dark band carrying the title,
   then one card per person, each leading to that person's profile. */
export async function Team() {
  const { site, team } = await content();

  return (
    <>
      <section className={styles.hero} aria-labelledby="team-title">
        <Backdrop className={styles.canvas} />
        <div className={styles.vignette} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{site.teamEyebrow}</p>
          <h1 className={styles.headline} id="team-title">
            {site.teamTitle}
            <span className={styles.headlineEmphasis}>
              {site.teamTitleEmphasis}
            </span>
          </h1>
          <p className={styles.subhead}>{site.teamSubhead}</p>
        </div>
      </section>

      <section className={styles.team} aria-labelledby="team-title">
        <ul className={styles.people}>
          {team.map((person, index) => (
            <li
              data-reveal=""
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              key={person.slug}
            >
              {/* The whole card is the link, so the photo is as good a
                  target as the name. */}
              <Link className={styles.card} href={`/team/${person.slug}`}>
                <span className={styles.media}>
                  <Image
                    className={styles.image}
                    src={person.image}
                    alt=""
                    fill
                    sizes="(max-width: 40rem) 90vw, 20rem"
                  />
                </span>
                <span className={styles.name}>{person.name}</span>
                <span className={styles.role}>{person.role}</span>
                <span className={styles.more}>
                  {site.teamProfileLabel}
                  <svg
                    className={styles.moreIcon}
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
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
