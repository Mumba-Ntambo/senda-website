import styles from "@/styles/Logo.module.css";

/* The company name set in type. It takes its colour from whatever it
   sits in, so it follows the header's hover flip and the footer's
   light surface without a second variant. */
export function Logo({ name }: { name: string }) {
  return <span className={styles.name}>{name}</span>;
}
