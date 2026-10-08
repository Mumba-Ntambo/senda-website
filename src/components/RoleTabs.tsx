"use client";

import { useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { useContent } from "@/shared/ContentProvider";
import styles from "@/styles/Role.module.css";

type Tab = "overview" | "application";
const ORDER: Tab[] = ["overview", "application"];

/* The advert and the application form as two tabs. Both panels stay
   mounted and one is hidden, so a half-filled form survives a look
   back at the advert. */
export function RoleTabs({
  overview,
  application,
}: {
  overview: ReactNode;
  application: ReactNode;
}) {
  const {
    content: { apply },
  } = useContent();
  const id = useId();
  const [tab, setTab] = useState<Tab>("overview");

  const labels: Record<Tab, string> = {
    overview: apply.overviewTab,
    application: apply.applicationTab,
  };

  /* Arrow keys move between tabs, as the tab pattern expects; only
     the selected tab is in the Tab-key order. */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const next = ORDER[(ORDER.indexOf(tab) + 1) % ORDER.length];
    setTab(next);
    document.getElementById(`${id}-${next}-tab`)?.focus();
  }

  return (
    <div className={styles.content}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label={apply.backToRoles}
        onKeyDown={onKeyDown}
      >
        {ORDER.map((key) => (
          <button
            className={styles.tab}
            type="button"
            role="tab"
            id={`${id}-${key}-tab`}
            aria-selected={tab === key}
            aria-controls={`${id}-${key}-panel`}
            tabIndex={tab === key ? 0 : -1}
            onClick={() => setTab(key)}
            key={key}
          >
            {labels[key]}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-overview-panel`}
        aria-labelledby={`${id}-overview-tab`}
        hidden={tab !== "overview"}
      >
        {overview}
        <button
          className={styles.applyNow}
          type="button"
          onClick={() => {
            setTab("application");
            window.scrollTo({ top: 0 });
          }}
        >
          {apply.applyNow}
        </button>
      </div>

      <div
        role="tabpanel"
        id={`${id}-application-panel`}
        aria-labelledby={`${id}-application-tab`}
        hidden={tab !== "application"}
      >
        {application}
      </div>
    </div>
  );
}
