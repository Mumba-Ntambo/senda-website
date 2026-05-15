import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "When does Senda launch?",
    a: "We're targeting Q2 2026 for our public launch in Lusaka, with a closed beta at the University of Zambia in the months leading up to it. Sign up below to be invited.",
  },
  {
    q: "Is Senda regulated?",
    a: "We're working closely with the Bank of Zambia on our payment service provider licence. Compliance is built into Senda from day one — KYC, AML monitoring, and audited reserves.",
  },
  {
    q: "How is this different from MTN MoMo or Airtel Money?",
    a: "Senda is built for the modern phone. Pay by @username instead of typing a number, see who you're paying, split bills, save in a separate wallet, and run your Chilimba or VSLA digitally — none of which existing mobile money supports well.",
  },
  {
    q: "What does it cost?",
    a: "Sending Senda-to-Senda is free. We charge a small fee (around 0.5%) on cash-out to bank or to MTN/Airtel, with no hidden charges. Full fee schedule available in-app.",
  },
  {
    q: "Can I move money in from MTN or Airtel?",
    a: "Yes. You can fund your Senda wallet from any Zambian bank, MTN MoMo, Airtel Money, or by depositing cash at a Senda agent.",
  },
  {
    q: "Is my money safe?",
    a: "Bank-grade encryption, biometric or PIN on every payment, fraud detection on every transaction, and licensed reserves backing your balance. Your money is protected.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                className="rounded-2xl border border-ink-100 bg-white overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-6 px-5 sm:px-6 py-4 text-left hover:bg-ink-50 transition"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink-900">{it.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-ink-500 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-ink-600 leading-relaxed">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
