import type { Metadata } from "next";

import { Careers } from "@/components/Careers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { en } from "@/content/en";
import { Social } from "@/shared/Social";

export const metadata: Metadata = {
  title: en.site.careersEyebrow,
  description: en.site.careersSubhead,
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <Careers />
      </main>
      <Footer />
      <Social />
    </>
  );
}
