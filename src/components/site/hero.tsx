import { HeroEquipmentCarousel } from "@/components/site/hero-equipment-carousel";
import { LogoCurveDown } from "@/components/site/logo-curve-down";
import { LogoCurveUp } from "@/components/site/logo-curve-up";

export function Hero() {
  return (
    <section id="top" className="relative bp-grid overflow-hidden">
      {/* <LogoCurveDown height="4.5rem" /> */}

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-6 md:py-16">
        <div className="max-w-2xl flex flex-col gap-8">
          {/* <h1 className="flex items-center gap-3 md:gap-4">
            <img
              src="/chemic-logo.svg"
              alt=""
              width={64}
              height={64}
              className="h-12 w-12 shrink-0 md:h-16 md:w-16"
            />
          </h1> */}

          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em] md:text-sm">
            Surface treatment &middot; Water treatment &middot; Air control
          </p>
          <h2 className="font-mono max-w-2xl text-2xl text-slate-800 sm:text-3xl md:text-4xl">
            Since 1985, Chemic Engineering works closely with surface
            treatment facilities in Singapore and across the region.
          </h2>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary md:tracking-[0.2em] md:text-sm">
            Singapore &middot; Malaysia &middot; China
          </p>
        </div>

        <div className="min-w-0 bp-corners m-2 rounded-lg border border-border bg-bg p-2 shadow-sm">
          <HeroEquipmentCarousel />
        </div>
      </div>

      {/* <LogoCurveUp height="4.5rem" /> */}
    </section>
  );
}
