import type { ReactNode } from "react";

import styles from "@/styles/RichText.module.css";

type Block =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBER = /^\s*\d+[.)]\s+(.*)$/;
const HEADING = /^\s*#{1,6}\s+(.*)$/;

/* Splits a role's description into headings, lists and paragraphs.
   The format is the handful of Markdown marks someone writing an
   advert would reach for — "## Heading", "- item", "1. item" — and
   nothing else. It is parsed into elements rather than set as HTML, so
   whatever is typed can only ever come out as text. */
function parse(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  for (const line of source.replace(/\r/g, "").split("\n")) {
    const heading = HEADING.exec(line);
    const bullet = BULLET.exec(line);
    const number = NUMBER.exec(line);
    const item = bullet ?? number;

    if (!line.trim()) {
      flush();
    } else if (heading) {
      flush();
      blocks.push({ kind: "heading", text: heading[1].trim() });
    } else if (item) {
      flush();
      const ordered = !bullet;
      const last = blocks[blocks.length - 1];
      /* Consecutive items of the same kind are one list. */
      if (last?.kind === "list" && last.ordered === ordered)
        last.items.push(item[1].trim());
      else blocks.push({ kind: "list", ordered, items: [item[1].trim()] });
    } else {
      paragraph.push(line.trim());
    }
  }
  flush();

  return blocks;
}

/* **bold** is the one inline mark. */
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

export function RichText({ source }: { source: string }) {
  return (
    <div className={styles.rich}>
      {parse(source).map((block, index) => {
        if (block.kind === "heading")
          return (
            <h3 className={styles.heading} key={index}>
              {inline(block.text)}
            </h3>
          );

        if (block.kind === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List className={styles.list} key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{inline(item)}</li>
              ))}
            </List>
          );
        }

        return (
          <p className={styles.paragraph} key={index}>
            {inline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
