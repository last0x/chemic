"use client";

import {
  useState,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  FACTORY_INFO,
  LEGEND,
  type FactoryInfo,
  type FactoryKey,
} from "./info";
import type { CameraView } from "./layout";
import { HoverProvider } from "./primitives";
import { cn } from "@/lib/utils";

const MD_MIN_WIDTH = 768;

function subscribeMd(onStoreChange: () => void) {
  const mql = window.matchMedia(`(min-width: ${MD_MIN_WIDTH}px)`);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getMdSnapshot() {
  return window.matchMedia(`(min-width: ${MD_MIN_WIDTH}px)`).matches;
}

function getMdServerSnapshot() {
  return false;
}

const FactoryCanvas = dynamic(
  () => import("./canvas").then((m) => m.FactoryCanvas),
  { ssr: false },
);

function LegendItems({
  hoveredKey,
  setHoveredKey,
  variant,
}: {
  hoveredKey: FactoryKey | null;
  setHoveredKey: Dispatch<SetStateAction<FactoryKey | null>>;
  variant: "list" | "chips";
}) {
  return (
    <ul
      className={cn(
        "m-0 list-none p-0",
        variant === "chips" && "flex flex-wrap gap-2",
      )}
    >
      {LEGEND.map((item) => {
        const color = FACTORY_INFO[item.key].color;
        const active = hoveredKey === item.key;
        return (
          <li key={item.key}>
            <button
              type="button"
              onClick={() =>
                setHoveredKey((key) => (key === item.key ? null : item.key))
              }
              {...(variant === "list"
                ? {
                    onMouseEnter: () => setHoveredKey(item.key),
                    onMouseLeave: () => setHoveredKey(null),
                    onFocus: () => setHoveredKey(item.key),
                    onBlur: () => setHoveredKey(null),
                  }
                : {})}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md text-left transition-colors",
                variant === "list" && "w-full px-2 py-1.5 text-md",
                variant === "chips" &&
                  "border border-border bg-surface px-2.5 py-1.5 text-xs",
                active ? "font-medium" : "text-ink-soft hover:bg-surface",
              )}
              style={active ? { background: `${color}22`, color } : undefined}
            >
              <span
                className="h-[9px] w-[9px] shrink-0 rounded-[2px]"
                style={{ background: color }}
              />
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function InfoPanel({
  info = FACTORY_INFO.default,
  compact,
}: {
  info: FactoryInfo;
  compact?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-between items-center gap-2">
      <h2
        className={cn("font-semibold", compact ? "text-base" : "text-lg")}
        style={{ color: info.color }}
      >
        {info.title}
      </h2>

      <p
        className={cn(
          "font-mono leading-relaxed",
          compact ? "text-sm" : "text-xl",
        )}
      >
        {info.desc}
      </p>

      <div className="relative aspect-[4/3] w-full md:w-[4.75rem] shrink-0 overflow-hidden rounded-lg border-2 border-white shadow-lg bp-corners sm:w-28 md:mt-auto md:ml-auto md:w-48 lg:w-56">
        <Image
          src={info.image}
          alt={info.title}
          fill
          sizes="(min-width: 1024px) 224px, (min-width: 768px) 192px, (min-width: 640px) 112px, 76px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Factory3D() {
  const showCanvas = useSyncExternalStore(
    subscribeMd,
    getMdSnapshot,
    getMdServerSnapshot,
  );
  const [view, setView] = useState<CameraView>("iso");
  const [hoveredKey, setHoveredKey] = useState<FactoryKey | null>(null);
  const info = hoveredKey ? FACTORY_INFO[hoveredKey] : null;

  return (
    <HoverProvider hoveredKey={hoveredKey} setHoveredKey={setHoveredKey}>
      <div className="flex flex-col md:relative md:h-full md:overflow-hidden">
        {showCanvas && (
          <div
            className={cn(
              "absolute inset-0 overflow-hidden",
              hoveredKey ? "cursor-pointer" : "cursor-default",
            )}
          >
            <FactoryCanvas view={view} />

            <div className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {(
                [
                  { id: "iso", label: "Isometric" },
                  { id: "top", label: "Plan view" },
                ] as const
              ).map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setView(btn.id)}
                  className={cn(
                    "cursor-pointer rounded-md border px-3 py-[7px] text-xs tracking-wide transition-all",
                    view === btn.id
                      ? "border-[#3d8bd4] bg-[#1b2740] text-[#7fc4ff]"
                      : "border-[#263042] bg-[#121826] text-[#8fa3b8] hover:border-[#3a4a5f] hover:text-[#e2ecf5]",
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <p className="pointer-events-none absolute bottom-3.5 left-1/2 z-10 m-0 w-[calc(100%-1.5rem)] -translate-x-1/2 text-center text-xs tracking-wide text-[#5b6b7c]">
              Drag to orbit · scroll to zoom · hover anything for details
            </p>
          </div>
        )}

        <div className="space-y-4 border-t border-border px-4 py-4 md:hidden">
          <InfoPanel info={info || FACTORY_INFO.default} compact />
          <div className="p-2 rounded-md bg-primary/20">
            <p className="m-0 mb-2 text-[11px] uppercase tracking-[0.08em] text-primary">
              Facility overview
            </p>
            <LegendItems
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              variant="chips"
            />
          </div>
        </div>

        <aside className="no-scrollbar pointer-events-auto absolute inset-y-0 left-0 z-10 hidden w-[220px] min-h-0 flex-col overflow-y-auto bg-transparent px-3 py-4 text-ink md:flex">
          <p className="m-0 mb-3 px-1 text-[11px] uppercase tracking-[0.08em] text-primary">
            Facility overview
          </p>
          <LegendItems
            hoveredKey={hoveredKey}
            setHoveredKey={setHoveredKey}
            variant="list"
          />
        </aside>

        <aside className="no-scrollbar pointer-events-auto absolute inset-y-0 right-0 z-10 hidden w-[280px] min-h-0 overflow-y-auto bg-transparent px-5 py-[22px] text-ink md:block">
          <InfoPanel info={info || FACTORY_INFO.default} />
        </aside>
      </div>
    </HoverProvider>
  );
}
