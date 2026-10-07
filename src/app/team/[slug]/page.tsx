import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { en } from "@/content/en";
import { Social } from "@/shared/Social";

/* Only the people in the content exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return en.team.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const person = en.team.find((entry) => entry.slug === slug);
  if (!person) return {};

  return {
    title: `${person.name}, ${person.role}`,
    description: person.lead,
  };
}

export default async function ProfilePage({
  params,
}: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const person = en.team.find((entry) => entry.slug === slug);
  if (!person) notFound();

  return (
    <>
      <Header />
      <main>
        <Profile person={person} />
      </main>
      <Footer />
      <Social />
    </>
  );
}
