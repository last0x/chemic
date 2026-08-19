"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import type { TooltipContentProps } from "recharts";

import { cn } from "@/lib/utils";
import {
  variableUnitTooltip,
  variableUnitValue,
  type ChartDef,
  type ChartSourceRow,
} from "@/components/quote/quotes";

const COLORS = {
  blue: "#233f83",
  blueLight: "#6b84b8",
  orange: "#f2760e",
  total: "#16a34a",
  ink: "#101828",
  muted: "#4a5568",
  surface: "#ffffff",
};

const MAX_VARIABLE_UNITS = 7;

type FlatRow = {
  name: string;
  isHeader?: boolean;
  isTotal?: boolean;
  offset: number;
  fixed: number;
  fixedAlt: number;
  totalBar: number;
  freeLabel?: string;
  tooltip?: string;
  fixedTooltip?: string;
  fixedAltTooltip?: string;
  variableTooltips?: string[];
};

const LEGEND_TABLE = [
  { item: "PoE", desc: "Provides power and data to the cables - 1 one-off setup with rack " },
  { item: "Wifi", desc: "Each AP emits wifi signal in a radial pattern" },
  { item: "CCTV", desc: "100% uptime, cloud-controlled system" },
  { item: "Wiring", desc: "Up to Cat8 wires. Variable cost TBD*" },
  {
    item: "Manpower++",
    desc: "All-in cost — covers equipment wiring, app set-up and maintenance, cyber-security set-up, 24-hour help desk, 1 free site-visit upgrade, valid for 1 year",
  },
];

const NOTES = [
  "The above are proposed quotes based on work scope. All variable parts can be adjusted (for future implementation)",
  "Guaranteed high, consistent speeds",
  "Hardware maintenance and servicing guarantee",
  "Future discounted pricing on smart home services",
  "1 free site-visit upgrade, valid for 1 year",
  "24-hour WhatsApp helpdesk",
  "Cyber-security set-up",
];

function buildRows(rows: ChartSourceRow[]): FlatRow[] {
  const out: FlatRow[] = [];
  let running = 0;

  rows.forEach((row) => {
    if (row.type === "header") {
      out.push({
        name: row.label,
        isHeader: true,
        offset: 0,
        fixed: 0,
        fixedAlt: 0,
        totalBar: 0,
      });
      return;
    }

    if (row.type === "total") {
      out.push({
        name: row.label,
        isTotal: true,
        offset: 0,
        fixed: 0,
        fixedAlt: 0,
        totalBar: running,
      });
      return;
    }

    const units = row.variableUnits || [];
    const values = units.map(variableUnitValue);
    const fixed = row.fixed || 0;
    const fixedAlt = row.fixedAlt || 0;
    const rowTotal = fixed + fixedAlt + values.reduce((a, b) => a + b, 0);

    const flat: FlatRow & Record<string, number | string | string[] | undefined> = {
      name: row.label,
      offset: running,
      fixed,
      fixedAlt,
      totalBar: 0,
      freeLabel: row.freeLabel || "",
      tooltip: row.tooltip,
      fixedTooltip: row.fixedTooltip,
      fixedAltTooltip: row.fixedAltTooltip,
      variableTooltips: units.map((unit) => variableUnitTooltip(unit) || ""),
    };
    for (let i = 0; i < MAX_VARIABLE_UNITS; i++) {
      flat[`v${i}`] = values[i] || 0;
    }

    out.push(flat);
    running += rowTotal;
  });

  return out;
}

function tooltipLines(row: FlatRow, dataKey: string): string[] {
  const lines: string[] = [];

  if (dataKey === "fixed") {
    lines.push(row.fixedTooltip || "Fixed");
  } else if (dataKey === "fixedAlt") {
    lines.push(row.fixedAltTooltip || "Fixed (CCTV)");
  } else if (dataKey === "totalBar") {
    lines.push(row.name);
  } else if (dataKey === "offset") {
    if (row.freeLabel) lines.push(row.freeLabel);
  } else {
    const match = /^v(\d+)$/.exec(dataKey);
    if (match) {
      const index = Number(match[1]);
      const specific = row.variableTooltips?.[index];
      if (specific) {
        lines.push(specific);
      } else if (row.name === "Wiring") {
        lines.push("Variable (TBD)");
      } else {
        lines.push(`Variable unit ${index + 1}`);
      }
    }
  }

  if (row.tooltip && !lines.includes(row.tooltip)) {
    lines.push(row.tooltip);
  }
  if (row.freeLabel && dataKey !== "offset" && !lines.includes(row.freeLabel)) {
    lines.push(row.freeLabel);
  }

  return lines;
}

function CustomTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  const item =
    payload.find((entry) => {
      const key = String(entry.dataKey ?? "");
      return key !== "offset" && Boolean(entry.value);
    }) ?? payload[0];
  const dataKey = String(item.dataKey ?? "");
  const row = item.payload as FlatRow;
  if (row.isHeader) return null;
  if (dataKey === "offset" && !row.freeLabel) return null;

  const labels = tooltipLines(row, dataKey);
  if (!labels.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-ink shadow-sm">
      <div className="mb-1 font-medium">{row.name}</div>
      {labels.map((label) => (
        <div key={label} className="text-ink-soft">
          {label}
        </div>
      ))}
    </div>
  );
}

function CustomYAxisTick({
  x,
  y,
  payload,
  rows,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
  rows: FlatRow[];
}) {
  const row = rows.find((r) => r.name === payload?.value);
  const isHeader = Boolean(row?.isHeader);
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
      fontSize={11}
      fontWeight={isHeader ? 500 : 400}
      fill={isHeader ? COLORS.ink : COLORS.muted}
    >
      {payload?.value}
    </text>
  );
}

function WaterfallChart({
  title,
  rows: rawRows,
  totalLabel,
  stacked,
}: {
  title: string;
  rows: ChartSourceRow[];
  totalLabel: string;
  stacked?: boolean;
}) {
  const rows = buildRows(rawRows);

  return (
    <div
      className={cn(
        "min-w-0 flex-1 rounded-lg border border-border bg-surface p-3 shadow-sm md:p-4",
        !stacked && "bp-corners",
      )}
    >
      <p className="font-mono text-center text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </p>
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            barCategoryGap="22%"
            margin={{ top: 4, right: 60, left: 4, bottom: 4 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tickLine={false}
              axisLine={false}
              tick={<CustomYAxisTick rows={rows} />}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={CustomTooltip}
              shared={false}
            />

            <Bar dataKey="offset" stackId="a" fill="transparent" isAnimationActive={false}>
              <LabelList
                dataKey="freeLabel"
                position="right"
                fill={COLORS.muted}
                fontSize={12}
                fontWeight={500}
                formatter={(v) => (typeof v === "string" ? v : "")}
              />
            </Bar>

            <Bar dataKey="fixed" stackId="a" fill={COLORS.blue} isAnimationActive={false} />
            <Bar dataKey="fixedAlt" stackId="a" fill={COLORS.blueLight} isAnimationActive={false} />

            {Array.from({ length: MAX_VARIABLE_UNITS }).map((_, i) => (
              <Bar
                key={i}
                dataKey={`v${i}`}
                stackId="a"
                fill={COLORS.orange}
                isAnimationActive={false}
              >
                {rows.map((row, ri) => (
                  <Cell
                    key={ri}
                    fill={COLORS.orange}
                    fillOpacity={row.name === "Wiring" ? 0.4 : 1}
                  />
                ))}
              </Bar>
            ))}

            <Bar dataKey="totalBar" stackId="a" className="opacity-80" fill={COLORS.total} isAnimationActive={false}>
              {rows.map((_, i) => (
                <Cell key={i} />
              ))}
              <LabelList
                dataKey="totalBar"
                position="right"
                fill={COLORS.ink}
                fontSize={12}
                fontWeight={500}
                formatter={(v) => (typeof v === "number" && v ? totalLabel : "")}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LegendTable() {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-2 py-2 text-left font-mono text-xs font-medium uppercase tracking-widest text-ink-soft">
              Item
            </th>
            <th className="border-b border-border px-2 py-2 text-left font-mono text-xs font-medium uppercase tracking-widest text-ink-soft">
              What it covers
            </th>
          </tr>
        </thead>
        <tbody>
          {LEGEND_TABLE.map((row) => (
            <tr key={row.item}>
              <td className="whitespace-nowrap border-b border-border px-2 py-2 font-mono text-xs font-medium text-ink">
                {row.item}
              </td>
              <td className="border-b border-border px-2 py-2 text-ink-soft">
                {row.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-xs text-ink-soft">*TBD — pending site visit</p>




      
      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-widest text-ink-soft">
        Notes
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
        {NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>


    </div>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-sm"
        style={{ background: color }}
        aria-hidden
      />
      {label}
    </span>
  );
}

export function WaterfallComparison({
  charts,
  stacked = false,
}: {
  charts: ChartDef[];
  stacked?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        <LegendSwatch color={COLORS.blue} label="Fixed" />
        <LegendSwatch color={COLORS.blueLight} label="Fixed (CCTV, stacked in PoE)" />
        <LegendSwatch color={COLORS.orange} label="Variable (per unit)" />
        <LegendSwatch color={COLORS.total} label="Total" />
      </div>

      <div
        className={cn(
          "flex w-full flex-col gap-4",
          !stacked && "md:flex-row",
        )}
      >
        {charts.map((chart) => (
          <WaterfallChart
            key={chart.title}
            title={chart.title}
            rows={chart.rows}
            totalLabel={chart.totalLabel}
            stacked={stacked}
          />
        ))}
      </div>

      <LegendTable />
    </div>
  );
}
