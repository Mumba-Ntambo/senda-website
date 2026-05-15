import { Compass, Target, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealStagger, itemVariants } from "../components/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            About Senda
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Built in Zambia, for Zambia.
          </h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-stretch">
          <Reveal>
            <div className="card overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-ink-100">
                <img
                  src="/founder.jpg"
                  alt="Ambwene Mwalukasa, co-founder of Senda"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-senda-200">
                    Co-founder
                  </div>
                  <div className="mt-1 text-2xl font-bold tracking-tight">
                    Ambwene Mwalukasa
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <RevealStagger className="grid gap-5">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card p-6 sm:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-senda-50 text-senda-700 ring-1 ring-senda-200">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink-900">
                Our vision
              </h3>
              <p className="mt-2 text-ink-700 leading-relaxed">
                Empower Zambians to manage money the way they live: socially,
                collectively, and digitally.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card p-6 sm:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink-900">
                Our mission
              </h3>
              <p className="mt-2 text-ink-700 leading-relaxed">
                Build the most intuitive, culturally relevant mobile money
                platform that honours traditional Zambian financial practices
                while embracing modern technology.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-2xl bg-gradient-to-br from-senda-700 to-senda-900 text-white p-6 sm:p-8 relative overflow-hidden"
            >
              <Quote
                className="absolute top-4 right-4 h-10 w-10 text-white/15"
                aria-hidden
              />
              <p className="text-lg leading-relaxed text-senda-50">
                We're not replacing how Zambians already save and send money.
                We're giving it the tools it always deserved.
              </p>
              <div className="mt-5 text-sm text-senda-100">
                Ambwene Mwalukasa, Co-founder
              </div>
            </motion.div>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
