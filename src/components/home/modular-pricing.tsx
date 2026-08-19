import { WaterfallComparison } from "@/components/quote/waterfall-comparison";
import { getQuote } from "@/components/quote/quotes";

const POINTS = [
  {
    title: "Build the basic.",
    body: "Start with reliable networking: PoE, Wi-Fi, and the cables you already have.",
  },
  {
    title: "Scale in future.",
    body: "Add rooms, cameras, and access points as the house grows — without a new backbone.",
  },
  {
    title: "Add smart whenever.",
    body: "Lighting, climate, and control come later, on the same network.",
  },
];

export function ModularPricing() {
  const quote = getQuote("32pv");

  return (
    <section id="pricing" className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <h2 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
          Modular pricing and approach
        </h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            {quote ? (
              <WaterfallComparison charts={quote.charts} stacked />
            ) : null}
          </div>

          <ol className="space-y-8 md:pt-4">
            {POINTS.map((point, index) => (
              <li key={point.title}>
                <p className="text-xs font-medium text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-1 text-xl tracking-tight text-ink md:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-2 text-ink-soft">{point.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
