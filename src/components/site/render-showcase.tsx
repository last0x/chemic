import { FactoryViewer } from "@/components/factory-3d/factory-viewer";

export function RenderShowcase() {
  return (
    <section id="render" className="bg-surface bp-grid">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary md:tracking-[0.2em]">
              What we do
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-snug tracking-tight text-slate-800 sm:text-3xl md:text-5xl">
              Build and maintain machinery for facilities
            </h2>
          </div>
        </div>

        <div className="bp-corners m-2 rounded-lg bg-bg p-2 ">
          <div className="min-h-[280px] w-full rounded-md border border-border bg-white sm:min-h-[400px] md:h-[560px] md:min-h-0 md:overflow-hidden lg:h-[680px]">
            <FactoryViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
