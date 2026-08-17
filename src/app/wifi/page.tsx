import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export default function WifiPage() {
  return (
    <>
      <Header active="wifi" />
      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-10 text-center md:px-6 md:py-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em]">
            WiFi
          </p>
          <h1 className="font-display mt-3 text-2xl leading-snug tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
            Coming soon
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            This page is a placeholder. WiFi content will live here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
