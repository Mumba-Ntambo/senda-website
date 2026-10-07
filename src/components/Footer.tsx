import Link from "next/link";

import { content } from "@/shared/content";
import { Logo } from "@/shared/Logo";
import { socialIcons } from "@/shared/socialIcons";
import styles from "@/styles/Footer.module.css";

/* White, and opposite the header in weight — the bar runs 700,
   everything here runs light.

   It used to print the six top-level labels in one flat row, which
   made it the only place on the site that knew nothing about the five
   nav panels behind them. Now it mirrors them: one column per section,
   the section's own link as its head. A footer is where the whole map
   is supposed to be legible at once.

   Services carries twelve entries against Partners' three, so a group
   past eight takes two tracks and splits its list across them rather
   than running down the page on its own. */
export async function Footer() {
  const { site, navLinks, footerLinks, socialLinks, ui } = await content();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link className={styles.wordmark} href="/" aria-label={site.name}>
              <Logo name={site.name} />
            </Link>

            <p className={styles.tagline}>{site.footerTagline}</p>

            <address className={styles.address}>
              {site.address.map((line) => (
                <span className={styles.addressLine} key={line}>
                  {line}
                </span>
              ))}
            </address>

            <a className={styles.email} href={site.contactEmailHref}>
              {site.contactEmail}
            </a>
          </div>

          <nav className={styles.sitemap} aria-label={ui.footerNav}>
            {navLinks.map((group) => (
              <div
                className={styles.group}
                data-wide={
                  group.children && group.children.length > 8 ? "" : undefined
                }
                key={group.label}
              >
                <p className={styles.groupTitle}>
                  <a className={styles.groupLink} href={group.href}>
                    {group.label}
                  </a>
                </p>

                {group.children ? (
                  <ul className={styles.groupLinks}>
                    {group.children.map((child) => (
                      /* Keyed by label: the panels repeat hrefs. */
                      <li key={child.label}>
                        <a className={styles.link} href={child.href}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          {/* Baked at build time — a static page will not roll this
              over on its own each January. */}
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {site.name}. {ui.allRightsReserved}
          </p>

          {/* Legal sits down here rather than beside the sections
              above: it is utility, not part of the map. */}
          <ul className={styles.legal}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className={styles.social}>
            {socialLinks.map((link) => (
              <li key={link.icon}>
                <a
                  className={styles.socialLink}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className={styles.socialIcon}
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
        </div>
      </div>
    </footer>
  );
}
