"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    src: "/home/living_room_ceiling.png",
    alt: "Living room with ceiling network",
    tag: "Ceiling network",
    title: "Whole-home Wi-Fi without visible clutter",
  },
  {
    src: "/home/gamer_wall.png",
    alt: "Work and play room with wired desk",
    tag: "Work / play",
    title: "Wired desk, wireless rooms",
  },
  {
    src: "/home/outdoor-ceiling.png",
    alt: "Carport and outdoor patio with ceiling coverage",
    tag: "Outdoor + EV",
    title: "Coverage that reaches the carport and patio",
  },
];

const COUNT = PROJECTS.length;

export function HomeProjects() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2].map((offset) => {
    const index = (start + offset) % COUNT;
    return { offset, index, project: PROJECTS[index] };
  });

  const step = (direction: -1 | 1) => {
    setStart((current) => (current + direction + COUNT) % COUNT);
  };

  return (
    <section id="projects" className="bg-transparent px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-wide text-primary">What we did</p>
          <h2 className="font-display mt-3 text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-5xl">
            Selected Projects
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          aria-label="Selected projects"
        >
          {visible.map(({ offset, index, project }) => (
            <li
              key={`${index}-${offset}`}
              className={cn(
                offset === 1 && "hidden sm:block",
                offset === 2 && "hidden md:block",
              )}
            >
              <article className="group m-2 flex h-full flex-col rounded-2xl bg-surface p-2 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    draggable={false}
                  />
                </div>
                <p className="mt-4 text-[11px] font-medium tracking-wide text-secondary">
                  {project.tag}
                </p>
                <h3 className="font-display mt-1 text-xl tracking-tight text-ink group-hover:text-primary">
                  {project.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 text-primary hover:bg-primary-tint"
              onClick={() => step(-1)}
              aria-label="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 text-primary hover:bg-primary-tint"
              onClick={() => step(1)}
              aria-label="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Choose a project">
            {PROJECTS.map((project, index) => (
              <li key={project.title}>
                <button
                  type="button"
                  onClick={() => setStart(index)}
                  aria-label={project.title}
                  aria-current={start === index}
                  className={cn(
                    "relative h-11 w-11 overflow-hidden rounded-lg border-2 transition",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    start === index
                      ? "border-primary"
                      : "border-white hover:border-primary",
                  )}
                >
                  <Image
                    src={project.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
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
