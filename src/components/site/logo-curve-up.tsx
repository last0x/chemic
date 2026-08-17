import { cn } from "@/lib/utils";

type LogoCurveUpProps = {
  className?: string;
  /** CSS height — controls how deep the bowl bows. Default 3rem. */
  height?: number | string;
  color?: string;
};

/**
 * Full-width bowl from the Chemic logo (shape below the wordmark).
 * Uses preserveAspectRatio="none" so width and height stretch independently.
 */
export function LogoCurveUp({
  className,
  height = "3rem",
  color = "currentColor",
}: LogoCurveUpProps) {
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
        Logo-style lower crescent:
        flatter outer edge on bottom, deeper inner edge bowing up toward content,
        tapering to points at the sides.
      */}
      <path d="M30 98C220 116 380 120 500 120s280-4 470-22C820 65 700 15 500 10S180 65 30 98Z" />
    </svg>
  );
}
