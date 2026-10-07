"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useContent } from "@/shared/ContentProvider";
import styles from "@/styles/Milestones.module.css";

/* Between advances. Still long enough to read a caption, but 6s left
   the panel feeling stalled. The carousel runs indefinitely either
   way, so WCAG 2.2.2 requires the pause control below regardless of
   what this is set to. */
const INTERVAL = 3500;

/* The wait before the FIRST advance after starting or resuming. A full
   interval of stillness on arrival read as broken rather than
   considered, since the panel is usually still sliding into view when
   the timer starts. */
const LEAD_IN = 1200;

/* How long a hands-on interruption holds before autoplay picks up
   again. Long enough to read at your own pace, short enough that the
   panel does not sit dead for the rest of the visit. The toggle is
   still a hard stop — that one never resumes on its own. */
const RESUME_AFTER = 10000;

/* The carousel itself is still CSS — dots from ::scroll-marker, arrows
   from ::scroll-button(), the focus effect from a scroll-state
   container query. The only thing script does here is advance the
   scroll position on a timer.

   It suspends whenever moving would be wrong: focus inside it, the
   panel off screen, the user having pressed pause, or the user having
   taken control by touching the track.

   Deliberately NOT on hover. The usual pause-on-hover convention comes
   from small inline carousels; this one fills the right half of the
   screen, so a resting cursor anywhere over there would hold it
   forever — which reads as the autoplay being broken rather than as
   being considerate.

   Under prefers-reduced-motion it never starts at all, and the toggle
   is not rendered — there is nothing to pause. */
export function Milestones({ label }: { label: string }) {
  const { content } = useContent();
  const { milestones, ui } = content;
  const trackRef = useRef<HTMLOListElement>(null);
  const [enabled, setEnabled] = useState(false);
  /* Two kinds of stop. `paused` is the toggle: explicit, and it holds
     until pressed again. `interruptedAt` is the person taking the
     track in hand, which expires on its own. */
  const [paused, setPaused] = useState(false);
  const [interruptedAt, setInterruptedAt] = useState<number | null>(null);
  const [suspended, setSuspended] = useState(false);

  const interrupt = useCallback(() => setInterruptedAt(Date.now()), []);

  useEffect(() => {
    // Autoplay is opt-in on capability: only after mount, and never
    // for someone who has asked for less motion.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Nothing should be scrolling while it is off screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSuspended(!entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /* Steps by slide index rather than by arithmetic on scrollLeft.
     The slides snap on their CENTRE and the track carries side
     padding, so the last slide's ideal position sits past the end of
     the scrollable range and can never be reached exactly. Adding a
     fixed step and testing it against the maximum therefore wrapped
     one slide early — the final milestone never showed. Measuring
     where each slide actually is avoids that, and is indifferent to
     gap, padding and slide widths. */
  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;

    const trackLeft = track.getBoundingClientRect().left;
    // Each slide's centre, in the track's own scroll coordinates.
    const centreOf = (item: HTMLElement) =>
      item.getBoundingClientRect().left -
      trackLeft +
      track.scrollLeft +
      item.offsetWidth / 2;

    const viewCentre = track.scrollLeft + track.clientWidth / 2;
    let index = 0;
    let nearest = Infinity;
    items.forEach((item, i) => {
      const distance = Math.abs(centreOf(item) - viewCentre);
      if (distance < nearest) {
        nearest = distance;
        index = i;
      }
    });

    // Wraps on the count, so it reads as a loop and every slide is
    // reached on the way round.
    const next = items[(index + 1) % items.length];
    const target = centreOf(next) - track.clientWidth / 2;
    const max = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: "smooth",
    });
  }, []);

  // An interruption expires; re-interrupting restarts the clock.
  useEffect(() => {
    if (interruptedAt === null) return;
    const id = window.setTimeout(() => setInterruptedAt(null), RESUME_AFTER);
    return () => window.clearTimeout(id);
  }, [interruptedAt]);

  useEffect(() => {
    if (!enabled || paused || suspended || interruptedAt !== null) return;
    let interval = 0;
    const lead = window.setTimeout(() => {
      advance();
      interval = window.setInterval(advance, INTERVAL);
    }, LEAD_IN);
    return () => {
      window.clearTimeout(lead);
      window.clearInterval(interval);
    };
  }, [enabled, paused, suspended, interruptedAt, advance]);

  return (
    <div
      className={styles.wrap}
      onFocusCapture={() => setSuspended(true)}
      onBlurCapture={() => setSuspended(false)}
    >
      <ol
        className={styles.carousel}
        ref={trackRef}
        aria-label={label}
        /* Taking the track in hand stops it advancing rather than
           fighting the person for the scroll position. It resumes by
           itself once they are done. */
        onPointerDown={interrupt}
        /* Only a sideways wheel. This panel fills the right half of
           the screen, so treating a vertical wheel as intent would
           kill autoplay for anyone who scrolled the page with their
           cursor resting over it — which is most people. */
        onWheel={(event) => {
          if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) interrupt();
        }}
      >
        {milestones.map((milestone, index) => (
          <li
            className={styles.slide}
            data-scroll-start={index === 0 ? "" : undefined}
            key={`${milestone.year}-${milestone.title}`}
          >
            <div className={styles.media}>
              <Image
                className={styles.image}
                src={milestone.image}
                alt=""
                fill
                sizes="(max-width: 64rem) 80vw, 22vw"
              />
            </div>

            <p className={styles.year}>{milestone.year}</p>
            <h3 className={styles.title}>{milestone.title}</h3>
            <p className={styles.body}>{milestone.body}</p>
          </li>
        ))}
      </ol>

      {enabled ? (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => {
            setPaused((p) => !p);
            // Pressing play should start it now, not in ten seconds.
            setInterruptedAt(null);
          }}
          aria-label={paused ? `${ui.play}: ${label}` : `${ui.pause}: ${label}`}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {paused ? (
              <path d="M5 3.5v9l8-4.5-8-4.5Z" />
            ) : (
              <path d="M5 3h2.2v10H5V3Zm3.8 0H11v10H8.8V3Z" />
            )}
          </svg>
        </button>
      ) : null}
    </div>
  );
}
