import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Team } from "@/components/Team";
import { en } from "@/content/en";
import { Social } from "@/shared/Social";

export const metadata: Metadata = {
  title: en.site.teamEyebrow,
  description: en.site.teamSubhead,
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <Team />
      </main>
      <Footer />
      <Social />
    </>
  );
}
