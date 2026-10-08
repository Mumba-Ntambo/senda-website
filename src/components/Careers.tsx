import { Backdrop } from "@/components/Backdrop";
import { Openings } from "@/components/Openings";
import { content } from "@/shared/content";
import { publishedOpenings } from "@/shared/openings";
import styles from "@/styles/Careers.module.css";

/* The careers page: the products page's dark band carrying the title,
   then the open roles with their search and filters. */
export async function Careers() {
  const { site } = await content();
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
