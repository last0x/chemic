import { cn } from "@/lib/utils";

type LogoCurveDownProps = {
  className?: string;
  /** CSS height — controls how deep the arch bows. Default 3rem. */
  height?: number | string;
  color?: string;
};

/**
 * Full-width arch from the Chemic logo (shape above the wordmark).
 * Uses preserveAspectRatio="none" so width and height stretch independently.
 */
export function LogoCurveDown({
  className,
  height = "3rem",
  color = "currentColor",
}: LogoCurveDownProps) {
  return (
    <svg
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      className={cn("block w-full text-primary", className)}
      style={{ height }}
      fill={color}
      aria-hidden
    >
      {/*
        Logo-style upper crescent:
        flatter outer edge on top, deeper inner edge bowing down toward content,
        tapering to points at the sides.
      */}
      <path d="M30 22C220 4 380 0 500 0s280 4 470 22C820 55 700 105 500 110S180 55 30 22Z" />
    </svg>
  );
}
