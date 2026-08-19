export type HeaderRow = { type: "header"; label: string };
export type TotalRow = { type: "total"; label: string };
export type VariableUnit = number | { value: number; tooltip?: string };

export type CostRow = {
  type: "row";
  label: string;
  fixed?: number;
  fixedTooltip?: string;
  fixedAlt?: number;
  fixedAltTooltip?: string;
  tooltip?: string;
  variableUnits?: VariableUnit[];
  freeLabel?: string;
};
export type ChartSourceRow = HeaderRow | TotalRow | CostRow;

export function variableUnitValue(unit: VariableUnit): number {
  return typeof unit === "number" ? unit : unit.value;
}

export function variableUnitTooltip(unit: VariableUnit): string | undefined {
  return typeof unit === "number" ? undefined : unit.tooltip;
}

function units(value: number, tooltips: string[]): VariableUnit[] {
  return tooltips.map((tooltip) => ({ value, tooltip }));
}

export type ChartDef = {
  title: string;
  totalLabel: string;
  rows: ChartSourceRow[];
};

export type Quote = {
  id: string;
  title: string;
  description: string;
  charts: ChartDef[];
};

const QUOTES: Record<string, Quote> = {
  "32pv": {
    id: "32pv",
    title: "32 Pollen View",
    description: "Side-by-side cost of a no-rewire vs rewire approach.",
    charts: [
      {
        title: "No rewire",
        totalLabel: "S$6k",
        rows: [
          { type: "header", label: "EQUIPMENT" },
          {
            type: "row",
            label: "PoE",
            fixed: 1500,
            fixedTooltip: "Switch (Wifi+CCTV)",
            fixedAlt: 400,
            fixedAltTooltip: "NVR (CCTV)",
          },
          {
            type: "row",
            label: "Wifi",
            tooltip: "Existing wiring — mesh APs, more units for full coverage",
            variableUnits: units(250, [
              "Living room AP",
              "Kitchen AP",
              "Master bedroom AP",
              "Bedroom 2 AP",
              "Bedroom 3 AP",
              "Study AP",
              "Patio / outdoor AP",
            ]),
          },
          {
            type: "row",
            label: "CCTV",
            tooltip: "Uses existing camera point",
            variableUnits: units(200, ["Existing camera"]),
          },
          { type: "row", label: "Wiring", variableUnits: [], freeLabel: "FREE" },
          { type: "header", label: "MANPOWER" },
          {
            type: "row",
            label: "Manpower++",
            tooltip: "Install, app set-up, and 1-year support",
            fixed: 500,
            fixedTooltip: "Base install",
            variableUnits: units(1500, ["On-site labour"]),
          },
          { type: "total", label: "Total" },
        ],
      },
      {
        title: "Rewire",
        totalLabel: "S$3k",
        rows: [
          { type: "header", label: "EQUIPMENT" },
          { type: "row", label: "PoE", tooltip: "Covered by existing rack", freeLabel: "(free)" },
          {
            type: "row",
            label: "Wifi",
            tooltip: "New Cat6 to ceiling — fewer APs, stronger placement",
            variableUnits: units(250, [
              "Living / dining AP",
              "Bedrooms AP",
              "Study AP",
              "Outdoor AP",
            ]),
          },
          {
            type: "row",
            label: "CCTV",
            tooltip: "New dedicated camera runs",
            variableUnits: units(250, ["Front camera", "Rear camera"]),
          },
          {
            type: "row",
            label: "Wiring",
            tooltip: "New cable runs — final length pending site visit",
            fixed: 300,
            fixedTooltip: "Materials (base)",
            variableUnits: units(1000, ["Variable (TBD)"]),
          },
          { type: "header", label: "MANPOWER" },
          {
            type: "row",
            label: "Manpower++",
            tooltip: "Bundled into the rewire package",
            variableUnits: [],
            freeLabel: "WAIVED",
          },
          { type: "total", label: "Add-on" },
        ],
      },
    ],
  },
};

export function normalizeQuoteId(id: string) {
  return id.trim().toLowerCase();
}

export function getQuote(id: string) {
  return QUOTES[normalizeQuoteId(id)];
}

export function quoteIds() {
  return Object.keys(QUOTES);
}
