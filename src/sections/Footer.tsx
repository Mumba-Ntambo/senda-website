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
      { l: "About", h: "#about" },
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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-14">
        <div className="grid lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-10 lg:gap-10">
          <div>
            <Logo variant="light" className="h-10 sm:h-12" />
            <p className="mt-4 text-sm text-ink-300 max-w-sm leading-relaxed">
              Modern mobile money for Zambia. Send to a @username, save together,
              run Chilimba and Village Banking, digitally.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:contents">
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
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-xs text-ink-400">
          <div>© {new Date().getFullYear()} Senda. Made in Lusaka.</div>
          <div>
            Senda is in pre-launch · pending Bank of Zambia authorisation.
          </div>
        </div>
      </div>
    </footer>
  );
}
