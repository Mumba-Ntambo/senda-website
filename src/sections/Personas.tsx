import { motion } from "framer-motion";
import { Reveal, RevealStagger, itemVariants } from "../components/Reveal";

const PEOPLE = [
  {
    name: "Tunde",
    age: 23,
    role: "University student · Lusaka",
    quote:
      "I split lunch with my friends in two taps. No more chasing K10s on WhatsApp.",
    accent: "from-senda-100 to-senda-50",
  },
  {
    name: "Patricia",
    age: 32,
    role: "Marketing manager · Ndola",
    quote:
      "My office Chilimba runs itself now. Senda collects on Friday, payouts hit on Monday.",
    accent: "from-amber-100 to-amber-50",
  },
  {
    name: "Charity",
    age: 45,
    role: "Market vendor · Soweto Market",
    quote:
      "Our village banking group can finally see who has paid and who has a loan out. No arguments.",
    accent: "from-rose-100 to-rose-50",
  },
];

export default function Personas() {
  return (
    <section className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            Built for real people
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            From students to market leaders.
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid md:grid-cols-3 gap-5">
          {PEOPLE.map((p) => (
            <motion.figure
              key={p.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`card p-6 sm:p-7 bg-gradient-to-br ${p.accent}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white shadow ring-1 ring-ink-100 flex items-center justify-center text-lg font-bold text-senda-700">
                  {p.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-ink-900">
                    {p.name}, {p.age}
                  </div>
                  <div className="text-xs text-ink-600">{p.role}</div>
                </div>
              </div>
              <blockquote className="mt-5 text-ink-800 leading-relaxed">
                <span className="text-senda-700 text-2xl leading-none">"</span>
                {p.quote}
                <span className="text-senda-700 text-2xl leading-none">"</span>
              </blockquote>
            </motion.figure>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
