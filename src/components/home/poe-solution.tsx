import { RenderPlaceholder } from "@/components/home/render-placeholder";

export function PoeSolution() {
  return (
    <section id="poe" className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <h2 className="font-display max-w-3xl text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
          PoE allows existing cables to carry both data and power
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <RenderPlaceholder
            label="Before / After"
            caption="3D render coming soon"
          />
          <RenderPlaceholder
            label="Hover a scene to see details"
            caption="Description and images coming soon"
          />
        </div>
      </div>
    </section>
  );
}
