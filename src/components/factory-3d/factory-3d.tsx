"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { FactoryCanvas } from "./canvas";
import {
  FACTORY_INFO,
  LEGEND,
  type FactoryInfo,
  type FactoryKey,
} from "./info";
import type { CameraView } from "./layout";
import { HoverProvider } from "./primitives";
import { cn } from "@/lib/utils";

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
  info,
  compact,
}: {
  info: FactoryInfo | null;
  compact?: boolean;
}) {
  return (
    <>
      <p className="m-0 mb-1.5 text-[11px] uppercase tracking-[0.08em] text-primary">
        {info ? "Selected element" : "Facility overview"}
      </p>

      {info ? (
        <h2
          className={cn(
            "m-0 mb-1 font-semibold",
            compact ? "text-base" : "text-lg",
          )}
          style={{ color: info.color }}
        >
          {info.title}
        </h2>
      ) : (
        <h2
          className={cn(
            "m-0 mb-1 font-semibold",
            compact ? "text-base" : "text-lg",
          )}
        >
          Electroplating bay
        </h2>
      )}

      <p
        className={cn(
          "font-mono leading-relaxed",
          compact ? "text-sm" : "text-xl",
        )}
      >
        {info ? (
          info.desc
        ) : (
          <>
            <span className="md:hidden">Tap an element for details</span>
            <span className="hidden md:inline">
              Hover over any element to learn more
            </span>
          </>
        )}
      </p>
    </>
  );
}

export function Factory3D() {
  const [view, setView] = useState<CameraView>("iso");
  const [hoveredKey, setHoveredKey] = useState<FactoryKey | null>(null);
  const info = hoveredKey ? FACTORY_INFO[hoveredKey] : null;

  return (
    <HoverProvider hoveredKey={hoveredKey} setHoveredKey={setHoveredKey}>
      <div className="flex h-full min-h-0 flex-col md:relative md:overflow-hidden">
        <div
          className={cn(
            "relative h-[280px] w-full shrink-0 overflow-hidden sm:h-[400px] md:absolute md:inset-0 md:h-auto",
            hoveredKey ? "cursor-pointer" : "cursor-default",
          )}
        >
          <FactoryCanvas view={view} />

          <div className="absolute top-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:top-4">
            {(
              [
                { id: "iso", short: "Iso", label: "Isometric" },
                { id: "top", short: "Plan", label: "Plan view" },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setView(btn.id)}
                className={cn(
                  "cursor-pointer rounded-md border px-2.5 py-[7px] text-xs tracking-wide transition-all sm:px-3",
                  view === btn.id
                    ? "border-[#3d8bd4] bg-[#1b2740] text-[#7fc4ff]"
                    : "border-[#263042] bg-[#121826] text-[#8fa3b8] hover:border-[#3a4a5f] hover:text-[#e2ecf5]",
                )}
              >
                <span className="sm:hidden">{btn.short}</span>
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            ))}
          </div>
          <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 m-0 w-[calc(100%-1.5rem)] -translate-x-1/2 text-center text-[11px] tracking-wide text-[#5b6b7c] sm:bottom-3.5 sm:text-xs">
            <span className="md:hidden">Tap an element for details</span>
            <span className="hidden md:inline">
              Drag to orbit · scroll to zoom · hover anything for details
            </span>
          </p>
        </div>

        <div className="space-y-4 border-t border-border px-4 py-4 md:hidden">
          <InfoPanel info={info} compact />
          <div>
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

        <aside className="pointer-events-auto absolute inset-y-0 left-0 z-10 hidden w-[220px] min-h-0 flex-col overflow-y-auto bg-transparent px-3 py-4 text-ink md:flex">
          <p className="m-0 mb-3 px-1 text-[11px] uppercase tracking-[0.08em] text-primary">
            Facility overview
          </p>
          <LegendItems
            hoveredKey={hoveredKey}
            setHoveredKey={setHoveredKey}
            variant="list"
          />
        </aside>

        <aside className="pointer-events-auto absolute inset-y-0 right-0 z-10 hidden w-[280px] min-h-0 overflow-y-auto bg-transparent px-5 py-[22px] text-ink md:block">
          <InfoPanel info={info} />
        </aside>
      </div>
    </HoverProvider>
  );
}
