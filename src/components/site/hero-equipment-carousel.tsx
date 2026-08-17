"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/** Facility / process-line photography only (no single-equipment product shots). */
export const HERO_EQUIPMENT = [
  { src: "/equipment/main-line.jpg", alt: "Main line" },
  { src: "/equipment/anodizing.png", alt: "Anodizing line" },
  { src: "/equipment/anodizing-line.png", alt: "Anodizing process line" },
  { src: "/equipment/anodizing-tanks.png", alt: "Anodizing tanks" },
  { src: "/equipment/barrel-line.png", alt: "Barrel plating line" },
  { src: "/equipment/barrel-line-2.png", alt: "Barrel plating line installation" },
  { src: "/equipment/di-ro-system.png", alt: "DI and RO water system" },
  { src: "/equipment/en-line.png", alt: "Electroless nickel plating line" },
  { src: "/equipment/frp-scrubber-line.png", alt: "FRP scrubber facility" },
  { src: "/equipment/manual-plating.png", alt: "Manual plating line" },
  { src: "/equipment/phosphating.png", alt: "Phosphating line" },
  { src: "/equipment/plating-line.jpg", alt: "Plating line" },
  { src: "/equipment/reel-to-reel.png", alt: "Reel-to-reel plating line" },
  { src: "/equipment/reel-to-reel-2.jpg", alt: "Reel-to-reel plating line installation" },
  { src: "/equipment/scrubber-system.png", alt: "Scrubber and exhaust system" },
  { src: "/equipment/wwts.png", alt: "Wastewater treatment system" },
] as const;

const AUTOPLAY_MS = 4000;

export function HeroEquipmentCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      setApi={setApi}
      className="w-full"
      aria-label="Facility gallery"
    >
      <CarouselContent className="-ml-0">
        {HERO_EQUIPMENT.map((item) => (
          <CarouselItem key={item.src} className="basis-full pl-0">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-border bg-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* <div className="mt-4 flex items-center justify-end gap-2">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div> */}
    </Carousel>
  );
}
