"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { Content } from "@/shared/types";

type Value = { content: Content };

const ContentContext = createContext<Value | null>(null);

export function ContentProvider({
  content,
  children,
}: Value & { children: ReactNode }) {
  return (
    <ContentContext.Provider value={{ content }}>
      {children}
    </ContentContext.Provider>
  );
}

/* For client components only. Server components take the shorter route
   — `content()` in shared/content.ts. */
export function useContent() {
  const value = useContext(ContentContext);
  if (!value) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return value;
}
