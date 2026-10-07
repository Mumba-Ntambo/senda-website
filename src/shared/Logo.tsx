import styles from "@/styles/Logo.module.css";

/* The mark beside the company name set in type. The name takes its
   colour from whatever it sits in, so it follows the header's hover
   flip and the footer's light surface without a second variant; the
   mark keeps its own green tile on every surface. */
export function Logo({ name }: { name: string }) {
  return (
    <span className={styles.logo}>
      <svg
        className={styles.mark}
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        focusable="false"
      >
        <rect className={styles.tile} width="1024" height="1024" rx="230" />
        <path
          className={styles.glyph}
          d="M754 285H406l212 454H270"
          fill="none"
          strokeWidth="152"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.name}>{name}</span>
    </span>
  );
}
