import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Logo from "../components/Logo";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#community", label: "Community" },
  { href: "#business", label: "For Business" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

const panelVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled || open
          ? "bg-white/90 backdrop-blur border-b border-ink-100"
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

          <motion.button
            className="md:hidden relative inline-flex items-center justify-center h-10 w-10 rounded-lg text-ink-700 hover:bg-ink-100 overflow-hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-panel"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-ink-100 bg-white p-2 shadow-soft mb-4">
                {NAV.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    variants={itemVariants}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-ink-800 rounded-lg hover:bg-ink-50 active:bg-ink-100"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#download"
                  variants={itemVariants}
                  onClick={() => setOpen(false)}
                  className="btn-primary text-sm py-2.5 mt-1"
                >
                  Get the app
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
