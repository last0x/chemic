"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

const PROJECTS = [
  { src: "/projects/manual-plating-line-construction.jpg", alt: "Manual plating line construction", tag: "Line plating", title: "Construction of a greenfield manual plating line" },
  { src: "/projects/customized-structure.jpeg", alt: "Customized structure", tag: "Fabrication", title: "Fabrication of customized motor rack on attached tank" },
  { src: "/projects/pre-raised-scrubber.jpg", alt: "Pre-raised scrubber", tag: "Water treatment", title: "Build and installation of scrubber system for water treatment" },
  { src: "/projects/reinstatement-of-factory.jpg", alt: "Reinstatement of factory", tag: "Line plating", title: "Dismantle and reinstatement of a facility" },
  { src: "/projects/spray-booth.jpg", alt: "Spray booth", tag: "Customized process tank", title: "Customized spray booths for industrial safety purposes" },
  { src: "/projects/mechanical-arm.jpg", alt: "Mechanical arm", tag: "Machinery", title: "Build and installation of mechanical arm for automated plating line" },
];


export function Projects() {
  return (
    <section id="projects" className="bp-grid bg-gray-100 mx-auto px-4 py-10 md:px-6 md:py-16">
      <div className="max-w-6xl mx-auto">

      
      <div className="mb-10 flex flex-wrap items-end justify-between max-w-6xl gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary md:tracking-[0.2em]">
            What we did
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-5xl">
            Selected Projects
          </h2>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {PROJECTS.map((p) => (
            <CarouselItem key={p.title} className="basis-full sm:basis-1/2 md:basis-1/3">
              <div className="group flex h-full flex-col bp-corners m-2 rounded-lg bg-bg p-2 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-secondary">
                  {p.tag}
                </p>
                <h3 className="mt-1 font-display text-xl tracking-tight text-ink group-hover:text-primary">
                  {p.title}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center gap-3">
          <CarouselPrevious className="static cursor-pointer translate-y-0" />
          <CarouselNext className="static cursor-pointer translate-y-0" />
        </div>
      </Carousel>
      </div>
    </section>
  );
}
