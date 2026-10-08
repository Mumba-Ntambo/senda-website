import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Role } from "@/components/Role";
import { publishedOpening } from "@/shared/openings";

export async function generateMetadata({
  params,
}: PageProps<"/careers/[id]">): Promise<Metadata> {
  const { id } = await params;
  const opening = await publishedOpening(id);
  if (!opening) return {};

  return { title: opening.title, description: opening.summary };
}

export default async function RolePage({
  params,
}: PageProps<"/careers/[id]">) {
  const { id } = await params;
  const opening = await publishedOpening(id);
  if (!opening) notFound();

  /* No site header: the role page carries its own plain bar. */
  return (
    <>
      <Role opening={opening} />
      <Footer />
    </>
  );
}
