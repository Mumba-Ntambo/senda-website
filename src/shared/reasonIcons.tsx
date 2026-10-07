import type { ReactNode } from "react";

import type { Reason } from "@/shared/types";

/* Line glyphs on a 24-unit box, stroked with currentColor — the same
   construction as serviceIcons, so the two sets sit together. */
export const reasonIcons: Record<Reason["icon"], ReactNode> = {
  /* A seal, ticked: checked before release. */
  tested: (
    <>
      <circle cx="12" cy="9.5" r="5.25" />
      <path d="m9.9 9.6 1.5 1.5 2.9-3" />
      <path d="M8.9 14.2 8 21.3l4-2 4 2-.9-7.1" />
    </>
  ),
  /* A clock: built to hold up over time. */
  lasting: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.75v5.5l3.5 2" />
    </>
  ),
  /* A globe: the devices and networks out in the world. */
  conditions: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5Z" />
    </>
  ),
  /* Four panes: the disciplines that one team covers. */
  team: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.25" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.25" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.25" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.25" />
    </>
  ),
  /* A shield, ticked. */
  security: (
    <>
      <path d="M12 2.9 19.75 5.6v6.05c0 4.3-3 7.7-7.75 9.3-4.75-1.6-7.75-5-7.75-9.3V5.6Z" />
      <path d="m9.1 11.9 2.15 2.15 4.2-4.3" />
    </>
  ),
};
