"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

import { cn } from "@/lib/utils";
import {
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

const CHART_HEIGHT = 360;
const Y_AXIS_WIDTH = 100;
const CHART_MARGIN = { top: 4, right: 56, left: 4, bottom: 4 };

type FlatRow = {
  name: string;
  isHeader?: boolean;
  isTotal?: boolean;
  offset: number;
  fixed: number;
  fixedAlt: number;
  totalBar: number;
  freeLabel?: string;
  note?: string;
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
  "TBD - pending site visit",
  "The above are proposed quotes based on work scope. All variable parts can be adjusted (for future implementation)",
  "All-in cost — covers equipment wiring, app set-up and maintenance",
  "Includes cyber-security set-up",
  "Guaranteed high, consistent speeds",
  "Hardware maintenance and servicing guarantee",
  "Future discounted pricing on smart home services",
  "1 free site-visit upgrade, valid for 1 year",
  "24-hour WhatsApp helpdesk",
  "Cyber-security set-up",
];

function rowAmount(row: ChartSourceRow): number {
  if (row.type !== "row") return 0;
  const values = (row.variableUnits || []).map(variableUnitValue);
  return (row.fixed || 0) + (row.fixedAlt || 0) + values.reduce((a, b) => a + b, 0);
}

function chartTotal(rows: ChartSourceRow[]): number {
  return rows.reduce((sum, row) => sum + rowAmount(row), 0);
}

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

    const flat: FlatRow & Record<string, number | string | undefined> = {
      name: row.label,
      offset: running,
      fixed,
      fixedAlt,
      totalBar: 0,
      freeLabel: row.freeLabel || "",
      note: row.note,
    };
    for (let i = 0; i < MAX_VARIABLE_UNITS; i++) {
      flat[`v${i}`] = values[i] || 0;
    }

    out.push(flat);
    running += rowAmount(row);
  });

  return out;
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

function stackedWidth(row: FlatRow): number {
  if (row.isTotal) return row.totalBar;
  let width = row.offset + row.fixed + row.fixedAlt;
  for (let i = 0; i < MAX_VARIABLE_UNITS; i++) {
    width += Number((row as Record<string, unknown>)[`v${i}`] || 0);
  }
  return width;
}

function WaterfallPlot({
  rows,
  totalLabel,
  xMax,
}: {
  rows: FlatRow[];
  totalLabel: string;
  xMax: number;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={rows}
        layout="vertical"
        barCategoryGap="22%"
        margin={CHART_MARGIN}
      >
        <XAxis type="number" hide domain={[0, xMax]} />
        <YAxis
          type="category"
          dataKey="name"
          width={Y_AXIS_WIDTH}
          tickLine={false}
          axisLine={false}
          tick={<CustomYAxisTick rows={rows} />}
          interval={0}
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
        <Bar dataKey="scalePad" stackId="a" fill="transparent" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function WaterfallChart({
  title,
  rows: rawRows,
  totalLabel,
  stacked,
  xMax,
}: {
  title: string;
  rows: ChartSourceRow[];
  totalLabel: string;
  stacked?: boolean;
  xMax: number;
}) {
  const rows = buildRows(rawRows).map((row) => ({
    ...row,
    scalePad: Math.max(0, xMax - stackedWidth(row)),
  }));

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

      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft md:hidden">
        Cost breakdown
      </p>
      <div className="flex min-w-0 gap-3">
        <div className="min-w-0 flex-1" style={{ height: CHART_HEIGHT }}>
          <WaterfallPlot rows={rows} totalLabel={totalLabel} xMax={xMax} />
        </div>
        <NotesColumn
          rows={rows}
          stacked={stacked}
          className="hidden md:flex"
        />
      </div>

      <div className="mt-4 border-t border-border pt-3 md:hidden">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          Notes
        </p>
        <NotesWithAxis rows={rows} />
      </div>
    </div>
  );
}

function NotesColumn({
  rows,
  stacked,
  className,
}: {
  rows: FlatRow[];
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col border-l border-border pl-3",
        stacked ? "w-28" : "w-44",
        className,
      )}
      style={{
        height: CHART_HEIGHT,
        paddingTop: CHART_MARGIN.top,
        paddingBottom: CHART_MARGIN.bottom,
      }}
    >
      {rows.map((row, index) => (
        <div
          key={`${row.name}-${index}`}
          className="flex min-h-0 flex-1 items-center"
        >
          {row.note ? (
            <p className="text-[11px] leading-snug text-ink-soft">{row.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function NotesWithAxis({ rows }: { rows: FlatRow[] }) {
  return (
    <div
      className="flex min-w-0"
      style={{
        height: CHART_HEIGHT,
        paddingTop: CHART_MARGIN.top,
        paddingBottom: CHART_MARGIN.bottom,
      }}
    >
      <div
        className="flex shrink-0 flex-col"
        style={{ width: Y_AXIS_WIDTH }}
      >
        {rows.map((row, index) => (
          <div
            key={`${row.name}-${index}`}
            className="flex min-h-0 flex-1 items-center justify-end pr-1"
          >
            <span
              className={cn(
                "text-right text-[11px] leading-tight",
                row.isHeader ? "font-medium text-ink" : "text-ink-soft",
              )}
            >
              {row.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col border-l border-border pl-3">
        {rows.map((row, index) => (
          <div
            key={`${row.name}-note-${index}`}
            className="flex min-h-0 flex-1 items-center"
          >
            {row.note ? (
              <p className="text-[11px] leading-snug text-ink-soft">{row.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendTable() {
  return (
    <div className="overflow-x-auto">
      {/* <table className="w-full border-collapse text-sm">
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

      <p className="mt-3 text-xs text-ink-soft">*TBD — pending site visit</p> */}




      
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
  const xMax = Math.max(...charts.map((chart) => chartTotal(chart.rows)), 1);

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
          !stacked && "lg:flex-row",
        )}
      >
        {charts.map((chart) => (
          <WaterfallChart
            key={chart.title}
            title={chart.title}
            rows={chart.rows}
            totalLabel={chart.totalLabel}
            stacked={stacked}
            xMax={xMax}
          />
        ))}
      </div>

      <LegendTable />
    </div>
  );
}
