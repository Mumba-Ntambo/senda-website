import { content } from "@/shared/content";
import { socialIcons } from "@/shared/socialIcons";
import styles from "@/styles/Social.module.css";

/* Fixed rail on the right edge: a 60px strip of stacked icon
   links with the outer corners rounded. Hovering flips it the same
   way the navbar does, so the two read as one piece of chrome. */
export async function Social() {
  const { socialLinks, ui } = await content();

  /* No profiles listed, no rail — an empty pill on the edge of the
     page would be worse than nothing. */
  if (socialLinks.length === 0) return null;

  return (
    <aside className={styles.rail} aria-label={ui.socialNav}>
      <ul className={styles.list}>
        {socialLinks.map((link) => (
          <li key={link.icon}>
            <a
              className={styles.link}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                {socialIcons[link.icon]}
              </svg>
              <span className="visually-hidden">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
