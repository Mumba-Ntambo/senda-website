"use client";

import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import type { Content } from "@/shared/types";
import styles from "@/styles/Services.module.css";

/* Pixels per second. Slow enough to read a card as it passes; the
   whole point is that it never stops on a beat, so this is the only
   speed control there is. */
const SPEED = 34;

/* How sharply the drift eases in and out when the pointer arrives or
   leaves. Higher stops sooner; this lands at roughly 200ms. */
const EASE = 14;

/* Wraps the card row in a horizontal scroller that drifts continuously
   rather than stepping from card to card.

   The cards are rendered twice and the scroll position wraps by
   exactly one set, which is what makes the loop seamless — there is no
   jump to hide because the second set is already in place when the
   first runs out. The duplicates are inert and hidden from assistive
   tech, so the services are announced once.

   The track stays a real scroll container rather than a transformed
   strip, so a trackpad swipe, a shift+wheel and keyboard scrolling all
   keep working, and the arrows nudge it by a card. */
export function ServicesCarousel({
  children,
  label,
  ui,
}: {
  children: ReactNode;
  label: string;
  /* Only the four control labels, not the whole dictionary — this is a
     client component, and every field handed across the boundary is
     serialised into the page. */
  ui: Pick<Content["ui"], "previous" | "next" | "play" | "pause">;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const loopRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [suspended, setSuspended] = useState(false);
  /* A ref, not state. Hover used to be a dependency of the drift
     effect, so pointing at a card tore the whole rAF loop down and
     rebuilt it on leaving — which is exactly the dead stop you feel.
     Nothing in the render reads it, so it has no business being
     state. */
  const hoverRef = useRef(false);
  /* Touch-drag and the arrow buttons. The rAF loop writes scrollLeft
     every frame, which would otherwise overwrite a swipe and cancel
     a smooth scrollTo from the arrows — on a phone that reads as
     the cards refusing to move. */
  const restRef = useRef(false);
  const restTimer = useRef(0);

  const rest = (ms = 0) => {
    restRef.current = true;
    window.clearTimeout(restTimer.current);
    if (ms > 0) {
      restTimer.current = window.setTimeout(() => {
        restRef.current = false;
      }, ms);
    }
  };

  const release = () => {
    window.clearTimeout(restTimer.current);
    restRef.current = false;
  };

  useEffect(() => () => window.clearTimeout(restTimer.current), []);

  const count = Children.count(children);

  // Never for someone who has asked for less motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* One full cycle is the distance from the first card to its own
     duplicate — which folds in the gaps rather than assuming half the
     scroll width, where the padding and trailing gap would drift. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.children;
    const first = items[0] as HTMLElement | undefined;
    const clone = items[count] as HTMLElement | undefined;
    loopRef.current =
      first && clone
        ? clone.getBoundingClientRect().left - first.getBoundingClientRect().left
        : 0;
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    if (track.firstElementChild) observer.observe(track.firstElementChild);
    return () => observer.disconnect();
  }, [measure]);

  // Nothing should be moving while it is off screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSuspended(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled || paused || suspended) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let last = 0;
    /* 0 to 1, eased toward whichever the pointer calls for. The track
       slows to a halt over about a fifth of a second and picks back up
       the same way, rather than cutting out mid-stride. */
    let rate = 1;

    const tick = (now: number) => {
      if (last) {
        // Clamped so a dropped frame cannot lurch the track forward.
        const dt = Math.min((now - last) / 1000, 0.05);
        const target = hoverRef.current || restRef.current ? 0 : 1;
        // Framerate-independent: the same curve at 60Hz and at 120.
        rate += (target - rate) * (1 - Math.exp(-dt * EASE));

        if (rate > 0.002) {
          const loop = loopRef.current;
          let next = track.scrollLeft + SPEED * rate * dt;
          if (loop > 0 && next >= loop) next -= loop;
          track.scrollLeft = next;
        }
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, paused, suspended]);

  /* Focus must not land on a copy: it is aria-hidden, so a screen
     reader would announce nothing while the ring sat on a visible
     link. Done here rather than with `inert` because inert would take
     the pointer with it. Re-runs when the card count changes. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track
      .querySelectorAll<HTMLElement>("[data-duplicate] a, [data-duplicate] button")
      .forEach((node) => {
        node.tabIndex = -1;
      });
  }, [count]);

  /* A swipe runs into the ends too, and unlike the drift it can go
     left — at scrollLeft 0 there is nothing to its left and the row
     stops dead against the first card.

     Same trick as the arrows, applied after the fact: once the scroll
     settles, shift the position by a whole cycle if it has come to
     rest without room on one side. The cards at the new offset are the
     same cards, so nothing moves on screen.

     After it settles, never during — repositioning mid-gesture fights
     the momentum and reads as the track snatching itself away. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timer = 0;
    const settle = () => {
      /* Not while the pointer is on the track. Shifting by a cycle
         swaps the element under the cursor for its twin, and the hover
         state goes with it — which is why hover held for a moment and
         then died about a sixth of a second after the drift stopped.
         Retry rather than skip, so a swipe that ends with the pointer
         still resting on a card is not left unwrapped. */
      if (hoverRef.current || restRef.current) {
        timer = window.setTimeout(settle, 400);
        return;
      }

      const loop = loopRef.current;
      if (loop <= 0) return;
      const first = track.firstElementChild as HTMLElement | null;
      const edge = first ? first.getBoundingClientRect().width : 0;
      const max = track.scrollWidth - track.clientWidth;
      const at = track.scrollLeft;

      if (at < edge && at + loop <= max) track.scrollLeft = at + loop;
      else if (at >= loop && at - loop >= edge) track.scrollLeft = at - loop;
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 160);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  /* The arrows wrap, like the drift does. scrollBy alone walked into
     the end of the track and stopped on the last card — the loop only
     held while the animation was driving.

     Both sets are identical, so shifting the position by exactly one
     cycle changes nothing on screen. That is what buys the arrows room
     at either end: normalise into the first cycle, and if a backward
     step would cross zero, jump a whole cycle forward first. The
     scroll is then always a plain step into space that exists. */
  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    /* Hold the drift until the smooth step finishes, otherwise the
       next animation frame writes over scrollTo and the button looks
       dead. */
    rest(enabled ? 700 : 0);
    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first
      ? first.getBoundingClientRect().width + gap
      : track.clientWidth;

    const loop = loopRef.current;
    let from = track.scrollLeft;

    if (loop > 0) {
      from = ((from % loop) + loop) % loop;
      if (direction === -1 && from < step) from += loop;
      // Silent reposition, so the smooth scroll below starts from here
      // rather than animating across the jump.
      if (from !== track.scrollLeft) track.scrollLeft = from;
    }

    track.scrollTo({
      left: from + step * direction,
      // What the note on .grid in Services.module.css means by setting
      // this per call: `enabled` is false when reduced motion is asked
      // for, and the step should land rather than glide.
      behavior: enabled ? "smooth" : "auto",
    });
  };

  /* The duplicate set: same cards, announced once.
 
     `inert` used to do the hiding, and it did too much — an inert
     subtree is skipped by hit testing, so half the track could not be
     hovered or clicked at all. Once the drift carried you into the
     second set, the cards went dead.

     aria-hidden keeps them out of the accessibility tree, and the
     effect below takes their links out of the tab order. Pointer
     interaction is left alone, which is the whole difference. */
  const duplicates = Children.map(children, (child, index) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, {
          key: `duplicate-${index}`,
          "aria-hidden": true,
          "data-duplicate": "",
        })
      : child,
  );

  return (
    <>
      <ul
        className={styles.grid}
        ref={trackRef}
        tabIndex={0}
        aria-label={label}
        /* Keyed to autoplay being ON, not to the track currently
           moving. Including `hovered` here meant mandatory snap came
           back the instant the pointer touched a card, and snap then
           yanked the track to the nearest one — the content jumped out
           from under the cursor, which is what made the hover flicker.
           Snap returns when the toggle is pressed or motion is
           reduced, where manual scrolling is all there is. */
        data-drifting={enabled && !paused ? "" : undefined}
        data-lenis-prevent=""
        data-lenis-prevent-horizontal=""
        /* Mouse only. A touch fires pointerenter on every tap, so on a
           phone the first tap stopped the drift for good — and
           pointerleave after a touch is unreliable enough that it
           often never came back. There is no hovering on a touch
           screen for this to be the considerate behaviour it is with a
           cursor. */
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hoverRef.current = true;
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hoverRef.current = false;
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          /* Capture so pointerup still fires if the finger leaves the
             track mid-swipe — otherwise rest stays on and drift dies. */
          event.currentTarget.setPointerCapture(event.pointerId);
          rest();
        }}
        onPointerUp={(event) => {
          if (event.pointerType === "mouse") return;
          /* Brief hold after lift so momentum scrolling can finish
             without the drift snatching the track back. */
          rest(400);
        }}
        /* A gesture the browser takes over — a page scroll begun on the
           track — ends in cancel rather than leave. Without this the
           flag could stick on a hybrid device. */
        onPointerCancel={() => {
          hoverRef.current = false;
          release();
        }}
        onFocusCapture={() => {
          hoverRef.current = true;
        }}
        onBlurCapture={() => {
          hoverRef.current = false;
        }}
      >
        {children}
        {duplicates}
      </ul>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => nudge(-1)}
          aria-label={`${ui.previous}: ${label}`}
        >
          <Chevron direction="left" />
          <span className={styles.arrowLabel}>{ui.previous}</span>
        </button>

        {enabled ? (
          <button
            type="button"
            className={styles.playToggle}
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused ? `${ui.play}: ${label}` : `${ui.pause}: ${label}`
            }
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

        <button
          type="button"
          className={styles.arrow}
          onClick={() => nudge(1)}
          aria-label={`${ui.next}: ${label}`}
        >
          <span className={styles.arrowLabel}>{ui.next}</span>
          <Chevron direction="right" />
        </button>
      </div>
    </>
  );
}

/* Bare stroke, no enclosing disc — the pill border is the shape.
   Matches the hero CTA's chevron path so the two read as one family. */
function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={styles.arrowIcon}
      viewBox="0 0 12 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "right" ? "m2 2 8 8-8 8" : "m10 2-8 8 8 8"} />
    </svg>
  );
}
