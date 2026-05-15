import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Download() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section id="download" className="bg-ink-50">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-senda-600 to-senda-800 text-white p-10 sm:p-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 90% 100%, rgba(255,255,255,0.18), transparent 45%)",
            }}
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Be first when Senda lands.
            </h2>
            <p className="mt-3 text-senda-100 max-w-xl mx-auto">
              Join the early-access list for launch invites, beta features, and
              your username before someone else takes it.
            </p>

            {submitted ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/15 ring-1 ring-white/20 px-5 py-3 font-medium">
                <CheckCircle2 className="h-5 w-5" />
                You're on the list — we'll be in touch.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className="btn bg-white text-senda-800 hover:bg-ink-50 px-5 py-3 font-semibold"
                >
                  Get early access
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-senda-100">
              No spam. We'll only email you about Senda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
