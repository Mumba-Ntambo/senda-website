"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

/* Canva-style entrances: an element crosses into view once, then
   plays a timed, eased animation on its own clock. That is the part
   a scroll-linked animation cannot do — `animation-timeline` welds
   progress to scroll position, so the motion only advances while the
   wheel does and has no duration of its own.

   Deliberately not `animation-timeline`, which is also why this
   works in Firefox and older Safari where that property does not
   exist at all.

   Mounted once. It watches the whole document rather than wrapping
   each element, so server components stay server components and
   opting in is just an attribute on the markup: `data-reveal` fades
   the element itself, `data-reveal-words` leaves it alone and lets its
   per-word spans cascade instead. Both get the same .is-revealed
   class — only the CSS differs.

   Keyed on the pathname: the layout this sits in survives a
   client-side navigation, so without it the effect would run for the
   first page only and every page reached through a <Link> would keep
   its reveal elements hidden until a full reload. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Only now, with JS confirmed running, is it safe for the CSS to
    // hide anything. Without this a failed bundle leaves the page
    // blank instead of merely unanimated.
    root.classList.add("js-reveal");

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-words]",
      ),
    );

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          // Entrances play once, the way a Canva element does.
          observer.unobserve(entry.target);
        });
      },
      {
        // Waits until the element is a little way up the screen
        // rather than firing the instant its first pixel clears the
        // fold, which is what made the earlier version look like it
        // had already finished by the time you looked at it.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.1,
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
