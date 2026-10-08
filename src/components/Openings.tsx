"use client";

import { useId, useMemo, useState } from "react";

import Link from "next/link";

import { useContent } from "@/shared/ContentProvider";
import type { Opening } from "@/shared/types";
import styles from "@/styles/Openings.module.css";

type FilterKey = "type" | "location" | "area";

/* The distinct values of one field, in the order they first appear. */
function options(openings: Opening[], key: FilterKey) {
  return Array.from(
    new Set(openings.map((opening) => opening[key]).filter(Boolean)),
  ) as string[];
}

/* The open roles with a search box and one row of filters per field.
   Everything is derived from the roles themselves: a field every role
   shares, or none has, gets no filter row, since there would be
   nothing to choose between. */
export function Openings({ openings }: { openings: Opening[] }) {
  const {
    content: { ui },
  } = useContent();
  const searchId = useId();

  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Partial<Record<FilterKey, string>>>({});

  const groups = useMemo(
    () =>
      (
        [
          { key: "area", label: ui.filterArea },
          { key: "type", label: ui.filterType },
          { key: "location", label: ui.filterLocation },
        ] as const
      )
        .map((group) => ({ ...group, values: options(openings, group.key) }))
        .filter((group) => group.values.length > 1),
    [openings, ui],
  );

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = openings.filter((opening) => {
    const haystack = [
      opening.title,
      opening.summary,
      opening.type,
      opening.location,
      opening.area ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return (
      words.every((word) => haystack.includes(word)) &&
      groups.every(
        (group) => !picked[group.key] || opening[group.key] === picked[group.key],
      )
    );
  });

  const filtering = words.length > 0 || Object.values(picked).some(Boolean);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.search}>
          <label className={styles.label} htmlFor={searchId}>
            {ui.searchRoles}
          </label>
          <input
            className={styles.input}
            id={searchId}
            type="search"
            value={query}
            placeholder={ui.searchRolesPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {groups.map((group) => (
          <div
            className={styles.group}
            role="group"
            aria-label={group.label}
            key={group.key}
          >
            <span className={styles.label} aria-hidden="true">
              {group.label}
            </span>
            <div className={styles.chips}>
              {/* Buttons with aria-pressed, not radios: one tap picks a
                  value and a second tap on it goes back to "All". */}
              {[undefined, ...group.values].map((value) => {
                const on = picked[group.key] === value;
                return (
                  <button
                    className={styles.chip}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setPicked((current) => ({
                        ...current,
                        [group.key]: on ? undefined : value,
                      }))
                    }
                    key={value ?? "all"}
                  >
                    {value ?? ui.filterAll}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.status}>
        {/* Announced as it changes, so a screen-reader user hears the
            result of a filter without hunting for the list. */}
        <p className={styles.count} aria-live="polite">
          {ui.rolesShown
            .replace("{shown}", String(shown.length))
            .replace("{total}", String(openings.length))}
        </p>
        {filtering ? (
          <button
            className={styles.clear}
            type="button"
            onClick={() => {
              setQuery("");
              setPicked({});
            }}
          >
            {ui.clearFilters}
          </button>
        ) : null}
      </div>

      {shown.length > 0 ? (
        <ul className={styles.list}>
          {shown.map((opening) => (
            <li className={styles.role} key={opening.id}>
              <div className={styles.roleCopy}>
                <h3 className={styles.roleTitle}>{opening.title}</h3>
                <p className={styles.roleMeta}>
                  {[opening.area, opening.type, opening.location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className={styles.roleSummary}>{opening.summary}</p>
                {opening.closesOn ? (
                  <p className={styles.roleCloses}>
                    {ui.roleCloses.replace(
                      "{date}",
                      /* Noon UTC, so the date does not slip a day in a
                         timezone behind it. */
                      new Date(`${opening.closesOn}T12:00:00Z`).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" },
                      ),
                    )}
                  </p>
                ) : null}
              </div>
              <Link className={styles.apply} href={`/careers/${opening.id}`}>
                {ui.applyForRole}
                <span className="visually-hidden">: {opening.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.none}>{ui.noMatchingRoles}</p>
      )}
    </div>
  );
}
