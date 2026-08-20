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
  note?: string;
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

export type AppendixItem = {
  src: string;
  alt: string;
  description: string;
};

export type Quote = {
  id: string;
  title: string;
  description: string;
  charts: ChartDef[];
  appendix?: AppendixItem[];
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
            note: "Switches - PoE (Wifi+CCTV) + NVR (CCTV)",
            fixed: 1500,
            fixedTooltip: "PoE (Wifi+CCTV)",
            fixedAlt: 400,
            fixedAltTooltip: "NVR (CCTV)",
          },
          {
            type: "row",
            label: "Wifi",
            note: "6 x APs across living space and rooms",
            variableUnits: units(250, [
              "Living room AP",
              "Kitchen AP",
              "Master bedroom AP",
              "Bedroom 2 AP",
              "Bedroom 3 AP",
              "Study AP",
            ]),
          },
          {
            type: "row",
            label: "CCTV",
            note: "1 x CCTV at car porch",
            variableUnits: units(200, ["Camera"]),
          },
          { type: "row", label: "Wiring", variableUnits: [], note: "CCTV wiring cost covered" },
          { type: "header", label: "MANPOWER" },
          {
            type: "row",
            label: "Manpower++",
            note: "All-in cost",
            fixed: 750,
            fixedTooltip: "Install and set-up",
            variableUnits: units(750, ["On-site labour"]),
          },
          { type: "total", label: "Total" },
        ],
      },
      {
        title: "Rewire",
        totalLabel: "S$3k",
        rows: [
          { type: "header", label: "EQUIPMENT" },
          { type: "row", label: "PoE", note: "Covered by existing rack", freeLabel: "(free)" },
          {
            type: "row",
            label: "Wifi",
            note: "4 x APs to cover outdoor spaces",
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
            note: "2 x CCTV at attic open roof terrace and car porch outdoor garden",
            variableUnits: units(250, ["Front camera", "Rear camera"]),
          },
          {
            type: "row",
            label: "Wiring",
            note: "New CAT 7 or 8 cable runs + wiring costs*",
            fixed: 300,
            fixedTooltip: "Materials (base)",
            variableUnits: units(1000, ["Variable (TBD)"]),
          },
          { type: "header", label: "MANPOWER" },
          {
            type: "row",
            label: "Manpower++",
            note: "Scales by install points",
            variableUnits: units(250, ["On-site labour"]),
          },
          { type: "total", label: "Add-on" },
        ],
      },
    ],
    appendix: [
      {
        src: "/quote/eap615-wall.png",
        alt: "TP-Link Omada EAP615-Wall AX1800 wall-plate WiFi 6 access point",
        description:
          "TP-Link Omada Wall-mounted WiFi access point. Slim junction-box design — suitable for rooms.",
      },
      {
        src: "/quote/eap723.png",
        alt: "TP-Link Omada EAP723 BE3600 ceiling-mount Wi-Fi 7 access point",
        description:
          "TP-Link Omada Ceiling-mounted WiFi access point. Compact disc design — suitable for living areas and open-plan coverage.",
      },
      {
        src: "/quote/hikvision-dome.png",
        alt: "Hikvision dome network camera",
        description:
          "Ceiling-mount IP camera with a clear protective dome, PoE, HD imaging, and professional analytics for discreet, always-on surveillance.",
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
