import {
  Calendar,
  Vote,
  Coins,
  TrendingUp,
  CheckCircle2,
  Users,
} from "lucide-react";

const CHILIMBA_STEPS = [
  "Create the group, set contribution and frequency",
  "Invite members by @username",
  "Senda auto-collects on schedule",
  "Payouts rotate to the next person — every time",
];

const VSLA_FEATURES = [
  { icon: Coins, label: "Buy shares each meeting" },
  { icon: Vote, label: "Vote on loan requests" },
  { icon: TrendingUp, label: "Interest income tracked live" },
  { icon: Calendar, label: "Automated meeting management" },
];

export default function Community() {
  return (
    <section id="community" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-senda-700">
            Community-first
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">
            Built around how Zambians already save.
          </h2>
          <p className="mt-3 text-ink-600">
            Senda doesn't replace traditional savings groups — it digitises them,
            so trust, transparency and timing all improve.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="card p-8 relative overflow-hidden">
            <div
              className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-senda-100 blur-2xl opacity-70"
              aria-hidden
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-senda-50 text-senda-800 px-3 py-1 text-xs font-semibold ring-1 ring-senda-200">
                <Users className="h-3.5 w-3.5" /> Chilimba
              </div>
              <h3 className="mt-4 text-2xl font-bold text-ink-900">
                Rotating savings, on autopilot.
              </h3>
              <p className="mt-2 text-ink-600">
                Each member contributes a fixed amount on schedule. The full pot
                rotates to one member each round — Senda handles collection,
                reminders and payout.
              </p>

              <ol className="mt-6 space-y-3">
                {CHILIMBA_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-senda-600 text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-ink-800 text-sm pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="card p-8 relative overflow-hidden">
            <div
              className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-100 blur-2xl opacity-70"
              aria-hidden
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-900 px-3 py-1 text-xs font-semibold ring-1 ring-amber-200">
                <Users className="h-3.5 w-3.5" /> Village Banking (VSLA)
              </div>
              <h3 className="mt-4 text-2xl font-bold text-ink-900">
                Group savings & loans, transparent by default.
              </h3>
              <p className="mt-2 text-ink-600">
                Replace the dusty record book. Members buy shares, request loans,
                vote, and watch the group's books in real time — right up to the
                annual share-out.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-3">
                {VSLA_FEATURES.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-2.5 rounded-xl border border-ink-100 bg-ink-50/60 px-3 py-2.5"
                  >
                    <f.icon className="h-4 w-4 text-senda-700 shrink-0" />
                    <span className="text-sm font-medium text-ink-800">
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 text-sm text-senda-800 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Every member sees every transaction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
