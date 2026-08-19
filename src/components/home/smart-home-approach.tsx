import Link from "next/link";

import { RenderPlaceholder } from "@/components/home/render-placeholder";

export function SmartHomeApproach() {
  return (
    <section id="approach" className="bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
              How do you want to control your home
            </h2>
            <p className="mt-4 text-lg text-ink-soft">take our interactive test.</p>
            <Link
              href="#contact"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Take the test
            </Link>
          </div>
          <RenderPlaceholder
            label="Control map"
            caption="3D render coming soon"
          />
        </div>
      </div>
    </section>
  );
}
