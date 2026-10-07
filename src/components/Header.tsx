import { Nav } from "@/shared/Nav";
import styles from "@/styles/Header.module.css";

/* Page chrome only — the banner landmark, its background and the
   page gutter. Everything inside it belongs to Nav. */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Nav />
      </div>

      {/* Decorative: the scrollbar already conveys position. */}
      <div className={styles.progress} aria-hidden="true" />
    </header>
  );
}
