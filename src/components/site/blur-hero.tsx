"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useImageReady } from "@/lib/use-image-ready";
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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ready, ref, onLoad } = useImageReady();

  useEffect(() => {
    if (paused || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % COVERS.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, ready]);

  return (
    <section
      id="top"
      className="relative bg-surface bp-grid pb-8 md:pb-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="relative h-[70vh] min-h-[28rem] w-full overflow-hidden bg-transparent">
          {COVERS.map((cover, index) => (
            <div
              key={cover.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === active && ready ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={index !== active}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                ref={index === 0 ? ref : undefined}
                onLoad={index === 0 ? onLoad : undefined}
                className={cn(
                  "object-cover bg-transparent",
                  index === active && ready && "animate-hero-zoom",
                )}
              />
            </div>
          ))}

          <div
            className={cn(
              "absolute inset-0 z-10 bg-black/50 transition-opacity duration-1000 ease-in-out",
              ready ? "opacity-100" : "opacity-0",
            )}
          />

          <div className="relative z-20 flex h-full items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <h1 className="font-serif text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.15rem] md:leading-none lg:text-[3.5rem]">
                Surface treatment engineering
              </h1>
              <h1 className="font-serif text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.15rem] md:leading-none lg:text-[3.5rem]">
                since 1985
              </h1>
              <br />
              <p className="font-mono text-md font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em] md:text-sm">
                Singapore &middot; Malaysia &middot; China
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-10 px-4 md:-mt-14">
          <ul
            className="no-scrollbar mx-auto flex w-full max-w-5xl snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:gap-4"
            aria-label="Facility gallery"
          >
            {COVERS.map((item, index) => (
              <li
                key={item.src}
                className="w-[4.75rem] shrink-0 snap-center sm:w-28 md:w-48 lg:w-56"
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
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
                    draggable={false}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
