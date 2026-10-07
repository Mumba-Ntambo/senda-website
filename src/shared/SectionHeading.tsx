import styles from "@/styles/SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: string;
  /** Rendered at the heavier weight the reference gives its <span>. */
  emphasis: string;
  id?: string;
  subtitle?: string;
  /** Centred headings sit above full-width grids. */
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  id,
  subtitle,
  align = "start",
}: Props) {
  return (
    <header
      className={`${styles.heading} ${align === "center" ? styles.center : ""}`}
      data-reveal=""
    >
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title} id={id}>
        {title}
        <span className={styles.emphasis}>{emphasis}</span>
      </h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
