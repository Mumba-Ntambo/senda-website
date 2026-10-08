export type NavLink = {
  label: string;
  href: string;
  /* Present only on a nav item that opens the header's hover panel.
     The parent keeps its own href, so the panel is an extra way in
     rather than the only one. */
  children?: NavLink[];
};

export type SocialLink = {
  /** Used as the accessible name — no visible label in the rail. */
  label: string;
  href: string;
  /** Key into the icon map in Social.tsx. */
  icon: "facebook" | "instagram" | "x" | "youtube" | "linkedin" | "tiktok";
};

/* One point in the "Why Senda" grid. Deliberately unnumbered:
   these are parallel reasons, not a sequence, and a numeral would
   imply an order that does not exist. */
export type Reason = {
  /** Key into the icon map in reasonIcons.tsx. */
  icon: "team" | "tested" | "conditions" | "lasting" | "security";
  title: string;
  body: string;
  /** The lead reason runs wide and carries the accent treatment. */
  lead?: boolean;
};

export type Service = {
  title: string;
  body: string;
  /** Key into the icon map in serviceIcons.tsx. */
  icon: "mobile" | "web" | "backend" | "design" | "support";
  href: string;
  /** The short label under the name, also used on the contact form's chips. */
  tag: string;
};

/* One part of a product — for Yenda, one of its apps. */
export type ProductPart = {
  /** Key into the icon map in productIcons.tsx. */
  icon: "dashboard" | "crew" | "customer" | "admin";
  title: string;
  audience: string;
  body: string;
  /** Where this part lives, when it has a public address. */
  href?: string;
};

/* One entry on the products page. */
export type Product = {
  /** Used as the section's id, so the nav can link straight to it. */
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  partsTitle: string;
  parts: ProductPart[];
  ctaLabel: string;
  ctaHref: string;
  /** The product's own website. */
  siteLabel: string;
  siteHref: string;
};

/* One person on the team, and the whole of their profile page. */
export type Person = {
  /** The last segment of the page's address: /team/<slug>. */
  slug: string;
  name: string;
  role: string;
  /** Path under /public. */
  image: string;
  lead: string;
  bio: string[];
  interests: string[];
};

/* One open role on the careers page. Roles are posted from the admin
   dashboard and read from the database — see shared/openings.ts. */
export type Opening = {
  id: string;
  title: string;
  /** Full-time, contract, internship and so on. */
  type: string;
  location: string;
  summary: string;
  /** Which service the role works in, when it belongs to one. */
  area?: string;
  /** Last day to apply, as YYYY-MM-DD. */
  closesOn?: string;
  /** On-site, hybrid or remote. */
  workMode?: string;
  /** Free text, e.g. a range and what it includes. */
  compensation?: string;
  /** The full advert, shown on the role's own page. Plain text; a
      blank line starts a new paragraph. */
  description?: string;
};

/* One line of the "what to tell us" list beside the contact form.
   `term` names the kind of detail, `detail` says what is useful. */
export type ContactAsk = {
  term: string;
  detail: string;
};

/* A figure in the About Us stat grid. `value` is the large numeral,
   `label` the line beneath it. */
export type Stat = {
  value: string;
  label: string;
};

/* One slide of the About Us carousel. For Senda these are the steps
   of how a project runs rather than dates in a company history, so
   `year` carries the step number. */
export type Milestone = {
  year: string;
  title: string;
  body: string;
  /* Path under /public. Rendered decorative — the caption carries the
     meaning. */
  image: string;
};

/* Everything on the page that is words, plus the few facts that sit
   alongside them. The facts — hrefs, icon keys, image paths, the
   contact address — live in src/content/shared.ts. */
export type Content = {
  site: {
    name: string;
    headline: string;
    headlineEmphasis: string;
    subhead: string;
    ctaLabel: string;
    ctaHref: string;

    whyEyebrow: string;
    whyTitle: string;
    whyTitleEmphasis: string;
    whySubtitle: string;
    whyCtaLabel: string;
    whyCtaHref: string;

    servicesEyebrow: string;
    servicesTitle: string;
    servicesTitleEmphasis: string;
    servicesSubtitle: string;
    servicesCardCta: string;

    aboutUsTitle: string;
    aboutUsLead: string;
    aboutUsSupport: string;
    aboutUsCtaLabel: string;
    aboutUsCtaHref: string;
    milestonesLabel: string;

    contactEyebrow: string;
    contactTitle: string;
    contactTitleEmphasis: string;
    contactBody: string;
    contactFormTitle: string;

    address: readonly string[];
    contactEmail: string;
    contactEmailHref: string;

    productsEyebrow: string;
    productsTitle: string;
    productsTitleEmphasis: string;
    productsSubhead: string;

    teamEyebrow: string;
    teamTitle: string;
    teamTitleEmphasis: string;
    teamSubhead: string;
    teamProfileLabel: string;
    teamInterestsTitle: string;
    teamCtaLabel: string;
    teamCtaHref: string;

    careersEyebrow: string;
    careersTitle: string;
    careersTitleEmphasis: string;
    careersSubhead: string;
    careersOpeningsTitle: string;
    careersOpeningsEmpty: string;

    footerTagline: string;
  };
  navLinks: NavLink[];
  contactAsk: ContactAsk[];
  socialLinks: SocialLink[];
  reasons: Reason[];
  services: Service[];
  products: Product[];
  team: Person[];
  milestones: Milestone[];
  aboutStats: Stat[];
  footerLinks: NavLink[];
  /* The application form on a role's page. */
  apply: {
    title: string;
    intro: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    link: string;
    linkHint: string;
    cv: string;
    cvHint: string;
    note: string;
    noteHint: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    failed: string;
    missing: string;
    badEmail: string;
    badFile: string;
    privacy: string;
    backToRoles: string;
    overviewTab: string;
    applicationTab: string;
    applyNow: string;
    placeholder: string;
    uploadFile: string;
    changeFile: string;
    factLocation: string;
    factType: string;
    factWorkMode: string;
    factArea: string;
    factCompensation: string;
    factCloses: string;
    factAbout: string;
  };
  /* Labels for the form controls and other chrome that is not part of
     any section's copy. */
  ui: {
    nav: string;
    mobileNav: string;
    menu: string;
    closeMenu: string;
    footerNav: string;
    socialNav: string;
    name: string;
    email: string;
    company: string;
    optional: string;
    servicesQuestion: string;
    messageQuestion: string;
    send: string;
    sending: string;
    play: string;
    pause: string;
    allRightsReserved: string;
    openMenuLabel: string;
    searchRoles: string;
    searchRolesPlaceholder: string;
    filterType: string;
    filterLocation: string;
    filterArea: string;
    filterAll: string;
    clearFilters: string;
    noMatchingRoles: string;
    rolesShown: string;
    applyForRole: string;
    roleCloses: string;
  };
};
