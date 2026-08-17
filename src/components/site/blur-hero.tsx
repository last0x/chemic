"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const COVERS = [
  { src: "/equipment/main-line.jpg", alt: "Main line" },
  { src: "/equipment/anodizing.png", alt: "Anodizing line" },
  { src: "/equipment/barrel-line.png", alt: "Barrel plating line" },
  { src: "/equipment/plating-line.jpg", alt: "Plating line" },
  { src: "/equipment/reel-to-reel.png", alt: "Reel-to-reel plating line" },
  { src: "/equipment/scrubber-system.png", alt: "Scrubber and exhaust system" },
] as const;

const AUTOPLAY_MS = 5500;

export function BlurHero() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback((carousel: CarouselApi) => {
    if (!carousel) return;
    setActive(carousel.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api, paused]);

  return (
    <section
      id="top"
      className="relative bg-surface bp-grid pb-24 md:pb-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="relative h-[70vh] min-h-[28rem] w-full overflow-hidden bg-ink">
          {COVERS.map((cover, index) => (
            <div
              key={cover.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={index !== active}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={cn(
                  "object-cover",
                  index === active && "animate-hero-zoom",
                )}
              />
            </div>
          ))}

          <div className="absolute inset-0 z-10 bg-black/50" />

          <div className="relative z-20 flex h-full items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <h1 className="font-serif text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.15rem] md:leading-none lg:text-[3.5rem]">
                Surface treatment engineering 
              </h1>
              <h1 className="font-serif text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.15rem] md:leading-none lg:text-[3.5rem]">
                since 1985
              </h1>
              {/* <p className="mx-auto mt-5 max-w-xl text-md font-normal leading-relaxed text-white/90 sm:text-base md:mt-7 md:text-xl">
                Working closely with facilities in Singapore and across the
                region — build, maintain, and reinstate.
              </p> */}
              <br />
              <p className="font-mono text-md font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em] md:text-sm">
            Singapore &middot; Malaysia &middot; China
          </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4">
          <Carousel
            opts={{ loop: true, align: "center", duration: 40 }}
            setApi={setApi}
            className="mx-auto w-full max-w-5xl"
            aria-label="Facility gallery"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {COVERS.map((item, index) => (
                <CarouselItem
                  key={item.src}
                  className="basis-[4.75rem] pl-2 sm:basis-28 md:basis-48 md:pl-4 lg:basis-56"
                >
                  <button
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Show ${item.alt}`}
                    aria-current={index === active}
                    className={cn(
                      "relative aspect-[4/3] w-full overflow-hidden rounded-lg bp-corners border-2 shadow-lg transition duration-500 ease-out",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                      index === active
                        ? "border-secondary shadow-xl"
                        : "border-white hover:border-secondary hover:shadow-xl",
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 224px, (min-width: 768px) 192px, (min-width: 640px) 112px, 76px"
                      className="object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
