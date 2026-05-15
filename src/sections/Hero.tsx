import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import PhoneMockup from "../components/PhoneMockup";

const HERO_IMAGE =
  "https://images.pexels.com/photos/33569519/pexels-photo-33569519.jpeg?auto=compress&cs=tinysrgb&w=1920";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-50" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-senda-200 bg-white/80 backdrop-blur px-3 py-1 text-xs font-semibold text-senda-800">
              <Sparkles className="h-3.5 w-3.5" />
              Built for Zambia · Launching Q2 2026
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 leading-[1.05]">
              Modern mobile money
              <span className="block text-senda-700">that moves like you do.</span>
            </h1>

            <p className="mt-5 text-lg text-ink-700 max-w-xl">
              Send to a <span className="font-semibold text-ink-900">@username</span>,
              save with a goal, split the bill in seconds, and run your{" "}
              <span className="font-semibold text-ink-900">Chilimba</span> or
              Village Banking group — all from one app.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#download" className="btn-primary text-base">
                Get early access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className="btn-secondary text-base">
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-700">
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
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat n="12.3M" l="mobile money users in Zambia" />
              <Stat n="<10s" l="to send money" />
              <Stat n="500K+" l="in Chilimba & VSLA groups" />
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold text-ink-900">{n}</dt>
      <dd className="text-xs text-ink-600 leading-snug">{l}</dd>
    </div>
  );
}
