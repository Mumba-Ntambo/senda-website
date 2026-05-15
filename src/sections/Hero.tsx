import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import PhoneMockup from "../components/PhoneMockup";
import Counter from "../components/Counter";

const HERO_IMAGE =
  "https://images.pexels.com/photos/33569519/pexels-photo-33569519.jpeg?auto=compress&cs=tinysrgb&w=1920";

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-50" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-16 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerV}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.div variants={itemV}>
              <div className="inline-flex items-center gap-2 rounded-full border border-senda-200 bg-white/80 backdrop-blur px-3 py-1 text-xs font-semibold text-senda-800">
                <Sparkles className="h-3.5 w-3.5" />
                Built for Zambia · Launching Q2 2026
              </div>
            </motion.div>

            <motion.h1
              variants={itemV}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 leading-[1.05] [text-shadow:_0_2px_24px_rgba(255,255,255,0.95),_0_1px_2px_rgba(255,255,255,0.9)]"
            >
              Modern mobile money
              <span className="block text-senda-700">
                that moves like you do.
              </span>
            </motion.h1>

            <motion.p
              variants={itemV}
              className="mt-5 text-lg text-ink-800 max-w-xl [text-shadow:_0_1px_12px_rgba(255,255,255,0.95)]"
            >
              Send to a{" "}
              <span className="font-semibold text-ink-900">@username</span>,
              save with a goal, split the bill in seconds, and run your{" "}
              <span className="font-semibold text-ink-900">Chilimba</span> or
              Village Banking group, all from one app.
            </motion.p>

            <motion.div
              variants={itemV}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a href="#download" className="btn-primary text-base">
                Get early access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className="btn-secondary text-base">
                See how it works
              </a>
            </motion.div>

            <motion.div
              variants={itemV}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-800 [text-shadow:_0_1px_8px_rgba(255,255,255,0.95)]"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-senda-700" />
                Bank-grade security
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-senda-600" />
                ZMW-native
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-senda-600" />
                No 10-digit numbers
              </span>
            </motion.div>

            <motion.dl
              variants={itemV}
              className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-md"
            >
              <Stat n={<><Counter to={12.3} decimals={1} />M</>} l="mobile money users in Zambia" />
              <Stat n={<>&lt;<Counter to={10} />s</>} l="to send money" />
              <Stat n={<><Counter to={500} />K+</>} l="in Chilimba & VSLA groups" />
            </motion.dl>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { y: [0, -10, 0] }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div>
      <dt className="text-xl sm:text-2xl font-bold text-ink-900 [text-shadow:_0_1px_10px_rgba(255,255,255,0.95)]">
        {n}
      </dt>
      <dd className="text-[11px] sm:text-xs text-ink-700 leading-snug [text-shadow:_0_1px_6px_rgba(255,255,255,0.9)]">
        {l}
      </dd>
    </div>
  );
}
