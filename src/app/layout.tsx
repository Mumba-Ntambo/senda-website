import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nunito } from "next/font/google";

import { en } from "@/content/en";
import { ContentProvider } from "@/shared/ContentProvider";
import { RevealObserver } from "@/shared/RevealObserver";
import { SmoothScroll } from "@/shared/SmoothScroll";
import "@/styles/globals.css";

/* Nunito: rounded terminals, variable 200-1000. Drives the whole
   page — see --font-sans in tokens.css. */
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: en.site.name, template: `%s · ${en.site.name}` },
  description: en.site.subhead,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        {/* Client components cannot import the content module's server
            half, so the content crosses the boundary once here instead
            of being threaded through every one of them. */}
        <ContentProvider content={en}>
          <SmoothScroll>{children}</SmoothScroll>
        </ContentProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
