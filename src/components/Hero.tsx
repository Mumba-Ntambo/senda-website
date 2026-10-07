import { Backdrop } from "@/components/Backdrop";
import { content } from "@/shared/content";
import styles from "@/styles/Hero.module.css";

export async function Hero() {
  const { site } = await content();

  return (
    <section className={styles.hero} id="home">
      <Backdrop className={styles.canvas} />
      <div className={styles.vignette} />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          {site.headline}
          <span className={styles.headlineEmphasis}>
            {site.headlineEmphasis}
          </span>
        </h1>
        <p className={styles.subhead}>{site.subhead}</p>

        <a className={styles.cta} href={site.ctaHref}>
          <svg
            className={styles.ctaIcon}
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="15" />
            <path d="m14 11 6 5-6 5" strokeLinecap="round" />
          </svg>
          <span className={styles.ctaLabel}>{site.ctaLabel}</span>
        </a>
      </div>
    </section>
  );
}
