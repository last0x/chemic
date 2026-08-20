"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { src: "/projects/manual-plating-line-construction.jpg", alt: "Manual plating line construction", tag: "Line plating", title: "Construction of a greenfield manual plating line" },
  { src: "/projects/customized-structure.jpeg", alt: "Customized structure", tag: "Fabrication", title: "Fabrication of customized motor rack on attached tank" },
  { src: "/projects/pre-raised-scrubber.jpg", alt: "Pre-raised scrubber", tag: "Water treatment", title: "Build and installation of scrubber system for water treatment" },
  { src: "/projects/reinstatement-of-factory.jpg", alt: "Reinstatement of factory", tag: "Line plating", title: "Dismantle and reinstatement of a facility" },
  { src: "/projects/spray-booth.jpg", alt: "Spray booth", tag: "Customized process tank", title: "Customized spray booths for industrial safety purposes" },
  { src: "/projects/mechanical-arm.jpg", alt: "Mechanical arm", tag: "Machinery", title: "Build and installation of mechanical arm for automated plating line" },
];

const COUNT = PROJECTS.length;

export function Projects() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2].map((offset) => {
    const index = (start + offset) % COUNT;
    return { offset, index, project: PROJECTS[index] };
  });

  const step = (direction: -1 | 1) => {
    setStart((current) => (current + direction + COUNT) % COUNT);
  };

  return (
    <section id="projects" className="bp-grid mx-auto bg-gray-100 px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary md:tracking-[0.2em]">
              What we did
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-5xl">
              Selected Projects
            </h2>
          </div>
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
              <article className="group m-2 flex h-full flex-col rounded-lg bg-bg p-2 shadow-sm bp-corners">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    draggable={false}
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-secondary">
                  {project.tag}
                </p>
                <h3 className="mt-1 font-display text-xl tracking-tight text-ink group-hover:text-primary">
                  {project.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* <div className="flex items-center gap-3">
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
          </div> */}

          <ul className="flex flex-wrap gap-2" aria-label="Choose a project">
            {PROJECTS.map((project, index) => (
              <li key={project.title}>
                <button
                  type="button"
                  onClick={() => setStart(index)}
                  aria-label={project.title}
                  aria-current={start === index}
                  className={cn(
                    "relative h-11 w-11 overflow-hidden rounded-md border-2 transition",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                    start === index
                      ? "border-secondary"
                      : "border-white hover:border-secondary",
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
