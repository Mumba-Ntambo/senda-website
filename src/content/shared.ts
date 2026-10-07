/* Everything that is NOT words: the contact details, the image paths
   and every href, written once so the copy in en.ts can be edited
   without moving a link. */

const contactEmail = "support@sendasend.com";

export const brand = {
  name: "Senda Technologies",

  ctaHref: "#services",
  whyCtaHref: "#contact",
  aboutUsCtaHref: "#services",

  address: ["Senda Technologies Ltd", "Lusaka, Zambia", "Registered with PACRA"],
  contactEmail,
  contactEmailHref: `mailto:${contactEmail}`,
} as const;

/* Structural halves of the repeated blocks. Order matters — the
   arrays in en.ts line up with these by index. */

export const serviceMeta = [
  { icon: "mobile", href: "#contact", image: "/art/mobile.svg" },
  { icon: "web", href: "#contact", image: "/art/web.svg" },
  { icon: "backend", href: "#contact", image: "/art/backend.svg" },
  { icon: "design", href: "#contact", image: "/art/design.svg" },
  { icon: "support", href: "#contact", image: "/art/run.svg" },
] as const;

export const reasonMeta = [
  { icon: "team", lead: true },
  { icon: "conditions" },
  { icon: "security" },
  { icon: "tested" },
  { icon: "lasting" },
] as const;

export const milestoneMeta = [
  { image: "/art/discover.svg" },
  { image: "/art/design.svg" },
  { image: "/art/build.svg" },
  { image: "/art/run.svg" },
] as const;

/* Empty until the company's real profiles are known. Add
   { icon, href, label } entries and the rail and the footer row both
   appear; with none, neither renders. */
export const socialMeta: readonly {
  icon: "facebook" | "instagram" | "x" | "youtube" | "linkedin" | "tiktok";
  href: string;
  label: string;
}[] = [];

/* One per product, in the order en.ts lists them. */
export const productMeta = [
  {
    slug: "yenda",
    ctaHref: "/#contact",
    partIcons: ["dashboard", "crew", "customer", "admin"],
  },
] as const;

/* The nav shape: which sections exist, what they point at, and how
   many children each has. en.ts supplies label arrays that line up
   with these. The service cards carry no ids of their own, so every
   child resolves to its parent section.

   Rooted at "/" rather than bare "#services": the same bar sits on the
   products page, where a bare hash would point at a section that is
   not on that page. */
export const navMeta = [
  { href: "/#services", children: Array.from({ length: 5 }, () => "/#services") },
  {
    href: "/products",
    children: productMeta.map((product) => `/products#${product.slug}`),
  },
  { href: "/#about-us", children: ["/#about-us", "/#about-us"] },
  { href: "/#why", children: Array.from({ length: 5 }, () => "/#why") },
  { href: "/#contact", children: [] },
] as const;
