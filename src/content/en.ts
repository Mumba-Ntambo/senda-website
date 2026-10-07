import {
  brand,
  milestoneMeta,
  navMeta,
  productMeta,
  reasonMeta,
  serviceMeta,
  socialMeta,
} from "@/content/shared";
import type { Content } from "@/shared/types";

const services = [
  {
    title: "Mobile apps",
    tag: "Android & iOS",
    body: "Android and iOS apps built from a single codebase, designed to feel fast and clear on any device.",
  },
  {
    title: "Web platforms",
    tag: "Sites & dashboards",
    body: "Websites, dashboards and internal tools that work as well on a phone as they do on a desktop.",
  },
  {
    title: "Backend & APIs",
    tag: "Systems & data",
    body: "The services, databases and integrations that keep a product running and its data trustworthy.",
  },
  {
    title: "Product design",
    tag: "UX & UI",
    body: "Flows, wireframes and interface design, worked out before the build so the product is clear to use from the first screen.",
  },
  {
    title: "Hosting & support",
    tag: "Run & maintain",
    body: "Deployment, monitoring, backups and ongoing changes, so the product keeps working after launch.",
  },
];

const reasons = [
  {
    title: "One team, whole product",
    body: "Design, mobile, web and backend from the same people, so the parts are built to fit each other.",
  },
  {
    title: "Built for real conditions",
    body: "Designed for the devices and networks people actually have, including slow and patchy connections.",
  },
  {
    title: "Security from day one",
    body: "Authentication, access control and secret handling are decided at the start, not patched in at the end.",
  },
  {
    title: "Tested before it ships",
    body: "Typed code, reviews and checks on every change, so problems are caught before your users find them.",
  },
  {
    title: "Made to last",
    body: "Readable code and automated deployment keep the product easy to change as it grows.",
  },
];

const products = [
  {
    name: "Yenda",
    category: "Transport",
    tagline: "Bus ticketing and revenue assurance for intercity coaches.",
    summary:
      "Yenda is a platform for Zambian intercity bus operators. It records every ticket sold and every parcel carried, so an operator can see what each trip earned and where money went missing. Passengers get a public side for booking seats and sending parcels.",
    highlights: [
      "Four apps sharing one database",
      "Tickets checked by QR code, even without a signal",
      "Every trip reconciled against what was sold",
    ],
    partsTitle: "Four apps, one platform",
    parts: [
      {
        title: "Owner dashboard",
        audience: "For operators",
        body: "Revenue overview, per-trip reconciliation, a GPS route map for each trip, fleet and route setup, a seat-map builder, parcels and staff management.",
      },
      {
        title: "Crew app",
        audience: "For conductors, inspectors and drivers",
        body: "Sell seats on a visual seat map, validate tickets at boarding, hand parcels over between depots, and track the bus while it drives.",
      },
      {
        title: "Customer app",
        audience: "For passengers",
        body: "Search trips, pick a seat on the bus layout and receive a digital ticket with a QR code. Send a parcel and follow it on a map.",
      },
      {
        title: "Admin console",
        audience: "For the platform team",
        body: "A live map across operators, fleet and parcel support tools, and checks that flag unusual patterns in sales.",
      },
    ],
    ctaLabel: "Ask about Yenda",
  },
];

const navLabels = [
  { label: "Services", children: services.map((service) => service.title) },
  { label: "Products", children: products.map((product) => product.name) },
  { label: "About", children: ["Who we are", "How we work"] },
  { label: "Why Senda", children: reasons.map((reason) => reason.title) },
  { label: "Contact Us", children: [] },
];

export const en: Content = {
  site: {
    ...brand,

    headline: "Mobile apps, web platforms and the systems behind them, ",
    headlineEmphasis: "built by one team.",
    subhead:
      "Senda Technologies is a technology company in Lusaka, Zambia. We design, build and run software, from the first sketch to a product in production.",
    ctaLabel: "What we do",

    whyEyebrow: "Why Senda",
    whyTitle: "Software you can ",
    whyTitleEmphasis: "depend on.",
    whySubtitle:
      "One team across design, mobile, web and backend, with security and maintainability treated as part of the build.",
    whyCtaLabel: "Talk to us",

    servicesEyebrow: "Services",
    servicesTitle: "From the first sketch to ",
    servicesTitleEmphasis: "a product in production.",
    servicesSubtitle:
      "Design, mobile, web, backend and support. Take the whole build or the one part you are missing.",
    servicesCardCta: "Get in touch",

    aboutUsTitle: "About Us",
    aboutUsLead:
      "Senda Technologies Ltd is a technology company based in Lusaka, Zambia, and registered with the Patents and Companies Registration Agency (PACRA). We design, build and run software: the apps people hold in their hands, the web platforms teams work in, and the services and data that sit behind both.",
    aboutUsSupport:
      "We care about the whole product, not just the code: how it looks, how it behaves on a slow connection, and whether it is still easy to change a year from now.",
    aboutUsCtaLabel: "Our services",
    milestonesLabel: "How we work",

    contactEyebrow: "Contact",
    contactTitle: "Tell us what ",
    contactTitleEmphasis: "you want to build.",
    contactBody:
      "A short note is enough. Tell us the problem you are trying to solve and we will come back to you.",
    contactFormTitle: "Send us the details",

    productsEyebrow: "Products",
    productsTitle: "Software we build ",
    productsTitleEmphasis: "and run ourselves.",
    productsSubhead:
      "Products designed, built and operated by Senda Technologies.",

    footerTagline: "Software, end to end, from Lusaka.",
  },

  navLinks: navMeta.map((meta, i) => ({
    label: navLabels[i].label,
    href: meta.href,
    ...(meta.children.length > 0
      ? {
          children: meta.children.map((href, j) => ({
            label: navLabels[i].children[j],
            href,
          })),
        }
      : {}),
  })),

  contactAsk: [
    {
      term: "The idea",
      detail: "What you want to build and who it is for.",
    },
    {
      term: "The starting point",
      detail: "A new product, or software that already exists and needs work.",
    },
    {
      term: "The timing",
      detail: "When you would like to start, and any date you are working towards.",
    },
  ],

  socialLinks: socialMeta.map((meta) => ({ ...meta })),

  reasons: reasonMeta.map((meta, i) => ({ ...meta, ...reasons[i] })),

  services: serviceMeta.map((meta, i) => ({ ...meta, ...services[i] })),

  products: productMeta.map((meta, i) => {
    const { partIcons, ...rest } = meta;
    const { parts, ...copy } = products[i];
    return {
      ...rest,
      ...copy,
      parts: parts.map((part, j) => ({ ...part, icon: partIcons[j] })),
    };
  }),

  /* Steps, not dates: `year` carries the step number. */
  milestones: milestoneMeta.map((meta, i) => ({
    ...meta,
    ...[
      {
        year: "01",
        title: "Discover",
        body: "We start with the problem: who the product is for, what it has to do, and what can wait.",
      },
      {
        year: "02",
        title: "Design",
        body: "Flows and screens are worked out and agreed before any of it is built.",
      },
      {
        year: "03",
        title: "Build",
        body: "The product is built in short cycles, with something working to look at throughout.",
      },
      {
        year: "04",
        title: "Launch & run",
        body: "We release it, monitor it and keep improving it once real people are using it.",
      },
    ][i],
  })),

  aboutStats: [
    { value: "5", label: "Services under one roof" },
    { value: "4", label: "Steps from idea to launch" },
    { value: "PACRA", label: "Registered company in Zambia" },
    { value: "Lusaka", label: "Based in Zambia" },
  ],

  /* None of these pages exist yet, so nothing is listed. */
  footerLinks: [],

  ui: {
    nav: "Main",
    mobileNav: "Mobile",
    menu: "Menu",
    closeMenu: "Close menu",
    footerNav: "Footer",
    socialNav: "Social media",
    name: "Name",
    email: "Email",
    company: "Company",
    optional: "(optional)",
    servicesQuestion: "What do you need?",
    messageQuestion: "What do you want to build?",
    send: "Send message",
    sending: "Sending…",
    play: "Play",
    pause: "Pause",
    allRightsReserved: "All rights reserved.",
    openMenuLabel: "Menu",
  },
};
