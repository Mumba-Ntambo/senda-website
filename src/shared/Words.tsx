import { Fragment } from "react";
import type { CSSProperties } from "react";

/* Splits a string into per-word spans so each can be animated on its
   own delay. Server-rendered — the words are in the HTML, not built
   by script, so the text is there whether or not JS runs.

   The space between words is a real text node OUTSIDE the span rather
   than inside it: an inline-block's trailing whitespace collapses, and
   putting a non-breaking space in instead would stop the line wrapping
   altogether. This way the browser breaks lines normally.

   Inline spans do not change the accessibility tree — the accessible
   name concatenates the text nodes, so a screen reader still reads one
   continuous sentence. */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <span
            data-word=""
            style={{ "--word-index": index } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
