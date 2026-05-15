import Logo from "../components/Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { l: "Features", h: "#features" },
      { l: "Community", h: "#community" },
      { l: "For Business", h: "#business" },
      { l: "FAQ", h: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { l: "About", h: "#" },
      { l: "Careers", h: "#" },
      { l: "Press", h: "#" },
      { l: "Contact", h: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { l: "Privacy", h: "#" },
      { l: "Terms", h: "#" },
      { l: "Security", h: "#" },
      { l: "Compliance", h: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <Logo variant="light" className="h-12" />
            </div>
            <p className="mt-4 text-sm text-ink-300 max-w-xs leading-relaxed">
              Modern mobile money for Zambia. Send to a @username, save together,
              run Chilimba and Village Banking, digitally.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.l}>
                    <a
                      href={l.h}
                      className="text-sm text-ink-300 hover:text-white transition"
                    >
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-400">
          <div>© {new Date().getFullYear()} Senda. Made in Lusaka.</div>
          <div>
            Senda is in pre-launch · pending Bank of Zambia authorisation.
          </div>
        </div>
      </div>
    </footer>
  );
}
