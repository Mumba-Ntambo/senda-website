import type { CSSProperties } from "react";

import Link from "next/link";

import { MobileNav } from "@/components/MobileNav";
import { content } from "@/shared/content";
import { Logo } from "@/shared/Logo";
import styles from "@/styles/Nav.module.css";

/* Rows of at most three, columns filled as evenly as the count
   allows. Returns the column count for a panel of `count` links. */
function menuColumns(count: number) {
  if (count <= 4) return count;
  if (count <= 8) return Math.ceil(count / 2);
  return Math.ceil(count / 3);
}

/* The full header navigation, in two rows: a utility strip
   carrying the contact address, and beneath it the main bar with the
   wordmark opposite the link row. */
export async function Nav() {
  const { site, navLinks, ui } = await content();

  return (
    <nav className={styles.nav} aria-label={ui.nav}>
      <div className={styles.topbar}>
        <a className={styles.utility} href={site.contactEmailHref}>
          {site.contactEmail}
        </a>
      </div>

      <div className={styles.bar}>
        <Link className={styles.wordmark} href="/" aria-label={site.name}>
          <Logo name={site.name} />
        </Link>

        <div className={styles.actions}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              /* Keyed by label, not href: the About panel repeats
                 #about-us across several of its entries. */
              <li
                className={link.children ? styles.hasMenu : undefined}
                key={link.label}
              >
                {/* "/#services" -> --services-s, the timeline that
                    section names. The link lights itself up when
                    that section is in view — no observers. A link
                    with no hash, like the products page, names no
                    timeline and simply stays untinted. */}
                <a
                  className={styles.navLink}
                  href={link.href}
                  style={
                    link.href.includes("#")
                      ? ({
                          "--at": `--${link.href.split("#")[1]}-s`,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  {link.label}
                </a>

                {/* The hover panel. No JS and no aria-expanded: it is
                    shown by :hover and :focus-within, and hidden with
                    visibility, which takes it out of the tab order and
                    the accessibility tree while closed. Focusing the
                    parent link opens it, so the keyboard reaches the
                    same links the pointer does. */}
                {link.children ? (
                  <div className={styles.menu}>
                    <ul
                      className={styles.menuList}
                      /* Column count follows the item count so no panel
                         runs more than three rows deep and none leaves
                         a mostly-empty last row: up to 4 entries sit on
                         one line, up to 8 on two, the rest on three.
                         Twelve services become 4x3, six About entries
                         3x2, three Partners 3x1. */
                      style={
                        { "--menu-cols": menuColumns(link.children.length) } as CSSProperties
                      }
                    >
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a className={styles.menuLink} href={child.href}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
