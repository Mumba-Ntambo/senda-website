import { en } from "@/content/en";

/* The server-side half of the pair. Async so a second language can be
   added later without touching the components that await it.

   Client components use useContent() from ContentProvider instead. */
export async function content() {
  return en;
}
