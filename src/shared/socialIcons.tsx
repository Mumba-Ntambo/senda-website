import type { ReactNode } from "react";

import type { SocialLink } from "@/shared/types";

/* Simplified glyphs drawn to a 24-unit box — recognisable at rail
   size, but not the official brand marks. Swap in a proper icon
   set (simple-icons et al.) if pixel-accurate logos matter. */
export const socialIcons: Record<SocialLink["icon"], ReactNode> = {
  facebook: (
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.4 1.5-1.4h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3H10v8h3.5Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path d="M17.5 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-5.8L6.3 21H3.5l6.6-7.5L3.2 3h5.8l4 5.3L17.5 3Zm-1 16.2h1.6L7.6 4.7H5.9l10.6 14.5Z" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <circle cx="5" cy="4.5" r="1.9" fill="currentColor" stroke="none" />
      <path d="M3.3 9h3.4v12H3.3V9Zm5.6 0h3.3v1.7c.6-1 1.8-2 3.6-2 3.1 0 4.2 2 4.2 5.1V21h-3.4v-6.2c0-1.5-.5-2.5-1.9-2.5-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1V21H8.9V9Z" />
    </>
  ),
  tiktok: (
    <path d="M16.2 3c.3 2 1.5 3.5 3.5 3.8v2.7c-1.2.1-2.3-.2-3.4-.8v5.7a5.4 5.4 0 1 1-4.7-5.4v2.8a2.7 2.7 0 1 0 1.9 2.6V3h2.7Z" />
  ),
};
