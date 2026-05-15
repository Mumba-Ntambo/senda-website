import {
  AtSign,
  QrCode,
  Wallet,
  PiggyBank,
  Users,
  Receipt,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealStagger, itemVariants } from "../components/Reveal";

const PRIMARY = [
  {
    icon: AtSign,
    title: "Send to a @username",
    body:
      "Memorable handles, real-time autocomplete, and a big visual confirmation before money moves. No more typing 0976...",
    accent: "bg-senda-600 text-white",
  },
  {
    icon: QrCode,
    title: "QR codes that just work",
    body:
      "Generate your personal QR, scan to pay, or create a payment-request QR for a specific amount. Works offline too.",
    accent: "bg-ink-900 text-white",
  },
  {
    icon: Wallet,
    title: "Spending + Savings wallet",
    body:
      "Two distinct wallets, one tap to move between them. Set rules like \"save 10% of every payment\" and watch it grow.",
    accent: "bg-senda-50 text-senda-800 border border-senda-200",
  },
];

const SECONDARY = [
  {
    icon: Receipt,
    title: "Split the bill",
    body:
      "Split a payment with up to 10 people, equally or by item. Each person approves, the merchant gets one clean payment.",
  },
  {
    icon: PiggyBank,
    title: "Savings goals & locks",
    body:
      "Name a goal, set a deadline, watch the bar fill. Lock for 7 to 365 days for higher interest if you want commitment.",
  },
  {
    icon: Zap,
    title: "Under 10 seconds",
    body:
      "Search, confirm, send. Done. Built for speed even on patchy networks across Lusaka, Kitwe and Ndola.",
  },
  {
    icon: ShieldCheck,
    title: "PIN + biometrics",
    body:
      "Fingerprint or face on every device, PIN as fallback. Bigger payments require fresh re-authentication.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            Core features
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Money the way you actually use it.
          </h2>
          <p className="mt-3 text-ink-600">
            Senda is rebuilt around how Zambians live: socially, in groups, with
            shared bills and shared savings.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid lg:grid-cols-3 gap-5">
          {PRIMARY.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card p-6 sm:p-7 group"
            >
              <motion.div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.accent}`}
                whileHover={{ rotate: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <f.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">
                {f.title}
              </h3>
              <p className="mt-2 text-ink-600 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </RevealStagger>

        <RevealStagger className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECONDARY.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card p-6 group"
            >
              <motion.div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-senda-50 text-senda-700"
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
              >
                <f.icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                {f.body}
              </p>
            </motion.div>
          ))}
        </RevealStagger>

        <Reveal delay={0.05}>
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-senda-700 to-senda-900 text-white p-7 sm:p-10 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-semibold">
                <Users className="h-3.5 w-3.5" />
                For groups & communities
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                Chilimba and Village Banking, finally digital.
              </h3>
              <p className="mt-3 text-senda-100 max-w-xl">
                Run rotating savings and VSLA groups without the paper books and
                WhatsApp threads. Members contribute automatically, payouts
                rotate on schedule, and every cobwa is on the same page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#community"
                  className="btn-secondary text-sm bg-white text-ink-900 border-transparent hover:bg-ink-50"
                >
                  Explore community tools
                </a>
                <a
                  href="#download"
                  className="btn-ghost text-sm text-white hover:bg-white/10"
                >
                  Get notified at launch →
                </a>
              </div>
            </div>

            <RevealStagger className="grid grid-cols-2 gap-3" stagger={0.06}>
              <Mini t="10" l="members per Chilimba" />
              <Mini t="ZMW 100" l="weekly contribution" />
              <Mini t="12 mo" l="VSLA share-out cycle" />
              <Mini t="3×" l="loan-to-savings ratio" />
            </RevealStagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mini({ t, l }: { t: string; l: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4"
    >
      <div className="text-xl font-bold">{t}</div>
      <div className="text-xs text-senda-100">{l}</div>
    </motion.div>
  );
}
