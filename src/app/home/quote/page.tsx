import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { QuoteLookup } from "@/components/quote/quote-lookup";

export const metadata: Metadata = {
  title: "Quote | Chemic Home",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return (
    <>
      <Header active="home" />
      <main className="flex-1">
        <section className="px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <QuoteLookup />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
