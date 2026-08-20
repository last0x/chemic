"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useImageReady } from "@/lib/use-image-ready";
import { cn } from "@/lib/utils";

const COVERS = [
  {
    src: "/home/living_room_ceiling.png",
    alt: "Living room with ceiling network",
    focus: "object-top origin-top",
  },
  {
    src: "/home/gamer_wall.png",
    alt: "Work and play room with wired desk",
    focus: "object-right object-bottom origin-bottom-right",
  },
  {
    src: "/home/outdoor-ceiling.png",
    alt: "Carport and outdoor patio with ceiling coverage",
    focus: "object-left object-top origin-top-left",
  },
] as const;

const AUTOPLAY_MS = 2750;

export function HomeHero() {
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
      className="relative bg-transparent pb-8 md:pb-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="relative h-[70vh] min-h-[28rem] w-full overflow-hidden bg-bg">
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
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                ref={index === 0 ? ref : undefined}
                onLoad={index === 0 ? onLoad : undefined}
                className={cn(
                  "object-cover",
                  cover.focus,
                  index === active && ready && "animate-home-hero-zoom",
                )}
              />
            </div>
          ))}

          <div
            className={cn(
              "absolute inset-0 z-10 bg-[#2a2418]/35 transition-opacity duration-1000 ease-in-out",
              ready ? "opacity-100" : "opacity-0",
            )}
          />

          <div className="relative z-20 flex h-full items-center justify-center px-6">
            <div className="relative max-w-3xl text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(42,36,24,0.55)_0%,rgba(42,36,24,0.22)_48%,transparent_72%)]"
              />
              <p className="relative text-xs font-medium uppercase tracking-[0.28em] text-primary">
                Chemic Home
              </p>
              <h1 className="font-home-serif relative mt-3 text-[2.15rem] font-light leading-[1.15] tracking-[-0.01em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl md:text-[3.15rem] lg:text-[3.5rem]">
                Home networking
                <span className="mt-1 block italic">and smart home</span>
              </h1>
              <p className="relative mt-5 mx-auto max-w-md text-base font-normal text-white/75 sm:text-lg">
                Your long-term digital home partner. Full site coming soon.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-10 px-4 md:-mt-14">
          <ul
            className="no-scrollbar mx-auto flex w-full max-w-5xl snap-x snap-mandatory justify-center gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:gap-4"
            aria-label="Home gallery"
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
                    "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 shadow-lg transition duration-500 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    index === active
                      ? "border-primary shadow-xl"
                      : "border-white hover:border-primary hover:shadow-xl",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 224px, (min-width: 768px) 192px, (min-width: 640px) 112px, 76px"
                    className={cn("object-cover", item.focus)}
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
