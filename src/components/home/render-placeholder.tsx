export function RenderPlaceholder({
  label,
  caption,
}: {
  label: string;
  caption?: string;
}) {
  return (
    <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center md:min-h-[400px]">
      <p className="text-sm font-medium text-ink">{label}</p>
      {caption ? (
        <p className="mt-2 max-w-xs text-sm text-ink-soft">{caption}</p>
      ) : null}
    </div>
  );
}
