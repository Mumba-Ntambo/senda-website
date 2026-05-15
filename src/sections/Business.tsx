import {
  Store,
  BarChart3,
  Users,
  Receipt,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealStagger, itemVariants } from "../components/Reveal";

const PERKS = [
  {
    icon: Store,
    title: "One QR for every customer",
    body:
      "A single Senda QR accepts payments from any Senda user. Print it, stick it, you're open for business.",
  },
  {
    icon: Receipt,
    title: "Lightweight POS",
    body:
      "Build orders, apply discounts, send digital receipts. Add staff with role-based permissions.",
  },
  {
    icon: BarChart3,
    title: "AI-powered SmartSales",
    body:
      "\"Tuesday afternoons are 40% slower. Try a lunch special.\" Plain-English forecasts from your own sales.",
  },
  {
    icon: Users,
    title: "CustomerIQ profiles",
    body:
      "See who your regulars are, what they buy, and who hasn't visited in a while. Privacy-respecting.",
  },
];

export default function Business() {
  return (
    <section id="business" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
        <Reveal>
          <div className="rounded-3xl bg-ink-900 text-white overflow-hidden relative">
            <img
              src="https://images.pexels.com/photos/20177672/pexels-photo-20177672.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              loading="lazy"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40"
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-30"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(95,160,105,0.5), transparent 40%), radial-gradient(circle at 10% 90%, rgba(95,160,105,0.35), transparent 45%)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 p-7 sm:p-10 lg:p-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Senda for Business
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
                  The CFO every Zambian merchant deserves.
                </h2>
                <p className="mt-3 text-ink-200 max-w-xl">
                  From a single market stall to a chain of urban shops, accept
                  payments, see who your customers are, and get AI-powered
                  insights that actually move the needle.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#download"
                    className="btn-primary text-base bg-senda-500 hover:bg-senda-400"
                  >
                    Become a merchant
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#features"
                    className="btn-ghost text-base text-white hover:bg-white/10"
                  >
                    Read the merchant brief
                  </a>
                </div>
              </div>

              <RevealStagger className="grid sm:grid-cols-2 gap-3" stagger={0.07}>
                {PERKS.map((p) => (
                  <motion.div
                    key={p.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -6 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 16,
                      }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-senda-500/20 text-senda-200 ring-1 ring-senda-500/30"
                    >
                      <p.icon className="h-5 w-5" />
                    </motion.div>
                    <h3 className="mt-4 font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-200 leading-relaxed">
                      {p.body}
                    </p>
                  </motion.div>
                ))}
              </RevealStagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
