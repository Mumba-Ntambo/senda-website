import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../components/Logo";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#community", label: "Community" },
  { href: "#business", label: "For Business" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-white/85 backdrop-blur border-b border-ink-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center">
            <Logo />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 rounded-lg hover:bg-ink-100 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href="#download" className="btn-ghost text-sm">
              Sign in
            </a>
            <a href="#download" className="btn-primary text-sm py-2">
              Get the app
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-ink-700 hover:bg-ink-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1 rounded-2xl border border-ink-100 bg-white p-2 shadow-soft">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-ink-800 rounded-lg hover:bg-ink-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm py-2.5 mt-1"
              >
                Get the app
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
