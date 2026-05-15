import { ArrowUpRight, ArrowDownLeft, PiggyBank, Wallet } from "lucide-react";

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[340px]">
      <div
        className="absolute -inset-6 rounded-[60px] bg-gradient-to-br from-senda-200/60 via-senda-100/40 to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-[44px] bg-ink-900 p-3 shadow-2xl ring-1 ring-ink-900/40">
        <div className="rounded-[36px] bg-gradient-to-b from-senda-50 to-white overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-ink-700">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-senda-600" />
              <span>Lusaka</span>
            </span>
          </div>

          <div className="px-5 pt-4 pb-6">
            <div className="text-xs text-ink-500">Welcome back</div>
            <div className="text-base font-semibold text-ink-900">@john_lusaka</div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-senda-600 text-white p-4">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide opacity-90">
                  <Wallet className="h-3.5 w-3.5" /> Spending
                </div>
                <div className="mt-2 text-lg font-bold">ZMW 1,248</div>
                <div className="text-[10px] opacity-80">.50</div>
              </div>
              <div className="rounded-2xl bg-white border border-ink-100 p-4">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-500">
                  <PiggyBank className="h-3.5 w-3.5" /> Savings
                </div>
                <div className="mt-2 text-lg font-bold text-ink-900">ZMW 4,820</div>
                <div className="text-[10px] text-senda-600 font-medium">+5% interest</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-semibold text-ink-700">
              <span>Recent</span>
              <span className="text-senda-700">See all</span>
            </div>

            <ul className="mt-2 space-y-2">
              <Tx
                name="@mary_market"
                note="Lunch split"
                amount="-ZMW 34"
                out
              />
              <Tx
                name="@chanda_k"
                note="Chilimba payout"
                amount="+ZMW 1,000"
              />
              <Tx
                name="@restaurant_ndola"
                note="Dinner"
                amount="-ZMW 88"
                out
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tx({
  name,
  note,
  amount,
  out,
}: {
  name: string;
  note: string;
  amount: string;
  out?: boolean;
}) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-white border border-ink-100 px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            out ? "bg-rose-50 text-rose-600" : "bg-senda-50 text-senda-700"
          }`}
        >
          {out ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownLeft className="h-4 w-4" />
          )}
        </div>
        <div>
          <div className="text-[12px] font-semibold text-ink-900">{name}</div>
          <div className="text-[10px] text-ink-500">{note}</div>
        </div>
      </div>
      <div
        className={`text-[12px] font-bold ${
          out ? "text-ink-900" : "text-senda-700"
        }`}
      >
        {amount}
      </div>
    </li>
  );
}
