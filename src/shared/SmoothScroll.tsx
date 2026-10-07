"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

/* Lenis wraps the browser's own scroll rather than transforming a
   wrapper element, so native behaviour survives: the fixed social
   rail stays put, anchor links work, and the scroll-driven reveals
   in globals.css keep tracking — they just follow the eased
   position now instead of the raw one.

   Smoothing disables itself under prefers-reduced-motion, so there
   is no separate opt-out to maintain here. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        /* Seconds to settle. Lower is snappier; much above ~1.2 and
           the page starts to feel detached from the input. */
        duration: 1.05,
        /* Route in-page #links through Lenis so they ease rather
           than jumping. */
        anchors: true,
        /* Lets the services track take a horizontal swipe instead of
           Lenis treating every touch as page scroll. */
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
