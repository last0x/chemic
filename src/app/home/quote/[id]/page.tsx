import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WaterfallComparison } from "@/components/quote/waterfall-comparison";
import { QuoteAppendix } from "@/components/quote/quote-appendix";
import { getQuote, quoteIds } from "@/components/quote/quotes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return quoteIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quote = getQuote(id);
  if (!quote) {
    return { title: "Quote not found | Chemic Home" };
  }
  return {
    title: `${quote.title} | Chemic Home`,
    robots: { index: false, follow: false },
  };
}

export default async function QuoteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const quote = getQuote(id);
  if (!quote) {
    notFound();
  }

  return (
    <>
      <Header active="home" />
      <main className="flex-1">
        <section className="px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em]">
              Chemic Home
            </p>
            <h1 className="font-display mt-3 text-2xl leading-snug tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
              {quote.title}
            </h1>
            <p className="mt-4 max-w-xl text-ink-soft">{quote.description}</p>
            <div className="mt-10">
              <WaterfallComparison charts={quote.charts} />
            </div>
            {quote.appendix ? <QuoteAppendix items={quote.appendix} /> : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
