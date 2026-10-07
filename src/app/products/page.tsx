import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Products } from "@/components/Products";
import { en } from "@/content/en";
import { Social } from "@/shared/Social";

export const metadata: Metadata = {
  title: en.site.productsEyebrow,
  description: en.site.productsSubhead,
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
      <Social />
    </>
  );
}
