import { Search, ShieldCheck, Send } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Find them",
    body:
      "Type @ and start typing a name. Results appear instantly with a photo so you know it's the right person.",
  },
  {
    icon: ShieldCheck,
    title: "Confirm visually",
    body:
      "A big confirmation screen shows the recipient's photo, full name and your last transaction together.",
  },
  {
    icon: Send,
    title: "Send",
    body:
      "Authorise with PIN or biometric. Money lands in seconds. Both sides get a receipt.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            How it works
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Three taps. That's it.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative card p-7">
              <div className="absolute -top-3 left-7 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white text-xs font-bold">
                {i + 1}
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-senda-50 text-senda-700">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
