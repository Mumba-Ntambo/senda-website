import type { ReactNode } from "react";

import type { Service } from "@/shared/types";

/* Line glyphs on a 24-unit box, stroked with currentColor so they
   inherit whichever accent the surrounding section sets. */
export const serviceIcons: Record<Service["icon"], ReactNode> = {
  /* A handset. */
  mobile: (
    <>
      <rect x="7" y="2.75" width="10" height="18.5" rx="2" />
      <path d="M10.5 18.25h3" />
    </>
  ),
  /* A browser window with its title bar. */
  web: (
    <>
      <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="1.5" />
      <path d="M2.75 8.75h18.5M5.75 6.5h.01M8.25 6.5h.01" />
    </>
  ),
  /* A database: the stacked cylinder. */
  backend: (
    <>
      <ellipse cx="12" cy="6" rx="7.25" ry="2.75" />
      <path d="M4.75 6v6c0 1.5 3.25 2.75 7.25 2.75s7.25-1.25 7.25-2.75V6" />
      <path d="M4.75 12v6c0 1.5 3.25 2.75 7.25 2.75s7.25-1.25 7.25-2.75v-6" />
    </>
  ),
  /* A wireframe: frame, header and two columns. */
  design: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M3.5 9h17M10 9v11.5" />
    </>
  ),
  /* A pulse line: the product being watched while it runs. */
  support: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6.5 12h3l1.5-3.5 2.25 7 1.5-3.5h2.75" />
    </>
  ),
};
