import type { ReactNode } from "react";

import type { ProductPart } from "@/shared/types";

/* Line glyphs on a 24-unit box, stroked with currentColor — the same
   construction as serviceIcons, so the sets sit together. */
export const productIcons: Record<ProductPart["icon"], ReactNode> = {
  /* A chart in a frame: the back office. */
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M7.5 16.5v-3M12 16.5v-7M16.5 16.5v-5" />
    </>
  ),
  /* A handset: the app the crew carries. */
  crew: (
    <>
      <rect x="7" y="2.75" width="10" height="18.5" rx="2" />
      <path d="M10.5 18.25h3" />
    </>
  ),
  /* A ticket with its tear line. */
  customer: (
    <>
      <path d="M3.5 8.5v-2a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a3.5 3.5 0 0 0 0 7v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a3.5 3.5 0 0 0 0-7Z" />
      <path d="M14.5 5.5v2M14.5 11v2M14.5 16.5v2" />
    </>
  ),
  /* A globe: the view across every operator. */
  admin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5Z" />
    </>
  ),
};
