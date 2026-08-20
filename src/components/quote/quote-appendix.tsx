import Image from "next/image";

import type { AppendixItem } from "@/components/quote/quotes";

export function QuoteAppendix({ items }: { items: AppendixItem[] }) {
  return (
    <div className="mt-16">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Appendix
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-48 border-b border-border px-2 py-2 text-left font-mono text-xs font-medium uppercase tracking-widest text-ink-soft md:w-56">
                Images
              </th>
              <th className="border-b border-border px-2 py-2 text-left font-mono text-xs font-medium uppercase tracking-widest text-ink-soft">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.src}>
                <td className="border-b border-border px-2 py-3 align-middle">
                  <div className="relative h-28 w-40 overflow-hidden rounded-md bg-surface md:h-32 md:w-48">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                      sizes="192px"
                    />
                  </div>
                </td>
                <td className="border-b border-border px-2 py-3 text-ink-soft">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
