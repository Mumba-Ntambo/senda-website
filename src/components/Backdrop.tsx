import styles from "@/styles/Backdrop.module.css";

/* The field behind the dark sections: a fine dot grid under two soft
   glows. Still, and pure CSS — positioned by whichever section hosts
   it, through the class it is handed. */
export function Backdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className ? `${styles.backdrop} ${className}` : styles.backdrop}
    />
  );
}
