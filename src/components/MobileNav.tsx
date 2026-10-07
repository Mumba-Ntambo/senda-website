"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useContent } from "@/shared/ContentProvider";
import styles from "@/styles/MobileNav.module.css";

/* The link row hides below 64rem and, until now, nothing took its
   place — the bar was a wordmark and two icons with no way to reach
   any section. This is that way.

   The panel is PORTALLED to <body>, and it has to be. .header carries
   a backdrop-filter, and a filtered ancestor becomes the containing
   block for position:fixed descendants — so a panel rendered in place
   was sized against the header's own box, a couple of rem tall, and
   showed exactly its first row. Nothing in the CSS could fix that
   from inside; it had to leave the header.

   Sections with a panel become <details>, so the disclosure is the
   browser's own: keyboard, screen-reader announcement and the open
   state all come for free, and thirty-odd links do not arrive as one
   unbroken scroll. */
export function MobileNav() {
  const { content } = useContent();
  const { navLinks, ui } = content;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Locks the page behind the panel. Lenis drives the window scroll in
     root mode, so overflow on <html> is what actually stops it — the
     attribute is read in globals.css. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.setAttribute("data-menu-open", "");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      root.removeAttribute("data-menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Focus follows the panel in and back out again, so a keyboard or
     screen-reader user is not left behind at the top of the page. */
  useEffect(() => {
    if (open) panelRef.current?.focus();
    else toggleRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button
        className={styles.toggle}
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">{open ? ui.closeMenu : ui.menu}</span>
        <svg
          className={styles.toggleIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open
        ? createPortal(
            <div
              className={styles.panel}
              id={panelId}
              ref={panelRef}
              tabIndex={-1}
              /* Its own scroll, not the page's. */
              data-lenis-prevent=""
            >
              <nav aria-label={ui.mobileNav}>
                <ul className={styles.list}>
                  {navLinks.map((link) => (
                    <li className={styles.item} key={link.label}>
                      {link.children ? (
                        <details className={styles.group}>
                          <summary className={styles.summary}>
                            {link.label}
                            <svg
                              className={styles.chevron}
                              viewBox="0 0 20 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m2 3 8 7 8-7" />
                            </svg>
                          </summary>

                          <ul className={styles.sublist}>
                            {link.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  className={styles.sublink}
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <a
                          className={styles.link}
                          href={link.href}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
