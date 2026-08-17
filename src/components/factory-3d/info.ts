export type FactoryKey =
  | "floor"
  // | "wall"
  | "manifold"
  | "wastewater"
  | "exhaust"
  | "scrubber"
  | "platform"
  | "controlpanel"
  | "rectifier"
  | "hoist"
  | "chillers"
  | "tanks"
  | "vents"
  | "treatment"
  | "rinse"
  // | "nickel"
  // | "rinse";

export type FactoryInfo = {
  title: string;
  color: string;
  desc: string;
  services: [string, string, string];
};

export const SERVICE_TYPES = [
  { label: "Build", color: "#22c55e" },
  { label: "Maintain", color: "#eab308" },
  { label: "Reinstate", color: "#3b82f6" },
] as const;

export const FACTORY_INFO: Record<FactoryKey, FactoryInfo> = {
  floor: {
    title: "Process floor",
    color: "#94a3b8",
    desc: "Epoxy or fiberglass layered concrete flooring for waterproofing",
    services: [
      "Epoxy flooring and drainage installation",
      "Resurfacing and crack repair",
      "Full floor replacement and re-coating",
    ],
  },
  // wall: {
  //   title: "Enclosure wall",
  //   color: "#6b7280",
  //   desc: "Reinforced block walls",
  //   services: [
  //     "Wall construction and cladding",
  //     "Coating touch-ups and sealant repair",
  //     "Wall demolition and rebuild",
  //   ],
  // },
  manifold: {
    title: "Transfer manifold",
    color: "#2563eb",
    desc: "Low-level header pipe below the walkway, distributing pumped chemistry and rinse water to each station.",
    services: [
      "Manifold fabrication and installation",
      "Valve servicing and leak repair",
      "Manifold line replacement",
    ],
  },
  wastewater: {
    title: "Wastewater piping",
    color: "#0e7490",
    desc: "Tank discharge is pumped through these pipes out for water treatment.",
    services: [
      "Wastewater line installation",
      "Pipe cleaning and pump servicing",
      "Full wastewater system overhaul",
    ],
  },
  exhaust: {
    title: "Exhaust piping",
    color: "#f59e0b",
    desc: "Channel gas released during the plating process out to the scrubber tank.",
    services: [
      "Header ducting fabrication and install",
      "Duct cleaning and seal replacement",
      "Header rerouting and upgrade",
    ],
  },
  scrubber: {
    title: "Scrubber tank",
    color: "#10b981",
    desc: "Receives and treats gas before it is vents outside",
    services: [
      "Scrubber tank install and packing",
      "Media replacement and cleaning",
      "Scrubber vessel replacement",
    ],
  },
  platform: {
    title: "Raised walkway, stairs & railings",
    color: "#ea580c",
    desc: "Safety walkway on a raised platform",
    services: [
      "Walkway and railing installation",
      "Grating and rail repair",
      "Platform reconfiguration",
    ],
  },
  controlpanel: {
    title: "Wall control panel",
    color: "#dc2626",
    desc: "Distribution and control of power across the facility  ",
    services: [
      "Panel wiring and commissioning",
      "Circuit testing and socket replacement",
      "Panel upgrade and relocation",
    ],
  },
  rectifier: {
    title: "Rectifier",
    color: "#a8a29e",
    desc: "Electricity conversion to meet equipment needs",
    services: [
      "Rectifier installation and commissioning",
      "Output calibration and servicing",
      "Rectifier swap and upgrade",
    ],
  },
  hoist: {
    title: "Overhead gantry hoist",
    color: "#facc15",
    desc: "Assists in the loading and unloading of plating trays",
    services: [
      "Gantry installation and wiring",
      "Motor and hoist replacement",
      "Reconfiguration of gantry",
    ],
  },
  chillers: {
    title: "Compressors",
    color: "#38bdf8",
    desc: "Provide airflow ventilation across the facility",
    services: [
      "Chiller installation and piping",
      "Refrigerant service and filter changes",
      "Chiller unit replacement",
    ],
  },
  tanks: {
    title: "Reinforced chemical tanks",
    color: "#ca8a04",
    desc: "Backup tannks for chemical processing and storage",
    services: [
      "Tote bay and cage fabrication",
      "Cage inspection and bladder swap",
      "Storage area reconfiguration",
    ],
  },
  // gaspipes: {
  //   title: "Gas pipes",
  //   color: "#78716c",
  //   desc: "Three gas supply lines spread evenly along the extended exterior wall, each turning in toward the building at roof height.",
  //   services: [
  //     "Gas line install and pressure test",
  //     "Leak detection and valve service",
  //     "Gas line rerouting",
  //   ],
  // },
  vents: {
    title: "Vent ducts",
    color: "#06b6d4",
    desc: "Channel fresh air from outside into facility",
    services: [
      "Duct fabrication and vent install",
      "Filter changes and airflow balancing",
      "Vent duct replacement",
    ],
  },
  treatment: {
    title: "Treatment tank",
    color: "#ec4899",
    desc: "Treatment tank for chemical processing",
    services: [
      "Tank fabrication and cover install",
      "Chemistry dosing and pump service",
      "Tank relining and cover swap",
    ],
  },
  // copper: {
  //   title: "Copper plating tank — closed cover",
  //   color: "#b45309",
  //   desc: "Acid copper bath, cyan cover closed between cycles. Cover pump feeds filtration; base pump discharges to the wastewater line.",
  //   services: [
  //     "Bath tank and filtration install",
  //     "Bath analysis and filter service",
  //     "Replating line upgrade",
  //   ],
  // },
  // nickel: {
  //   title: "Nickel plating tank — open cover",
  //   color: "#737373",
  //   desc: "Bright nickel bath, cyan cover open for loading. Cover-mounted pump and dedicated exhaust riser, plus a base pump to the wastewater line.",
  //   services: [
  //     "Bath tank and rectifier tie-in",
  //     "Bath topping and anode service",
  //     "Tank reline and process upgrade",
  //   ],
  // },
  rinse: {
    title: "Rinse tank",
    color: "#0ea5e9",
    desc: "Rinse tank for chemical processing",
    services: [
      "Cascade rinse installation",
      "Flow control and conductivity checks",
      "Rinse system reconfiguration",
    ],
  },
};

export const LEGEND: { key: FactoryKey; label: string }[] = [
  { key: "floor", label: "Process floor" },
  // { key: "wall", label: "Enclosure walls" },
  { key: "manifold", label: "Transfer manifold" },
  { key: "wastewater", label: "Wastewater piping" },
  { key: "exhaust", label: "Exhaust header" },
  { key: "scrubber", label: "Scrubber tank" },
  { key: "platform", label: "Walkway, stairs & railings" },
  { key: "controlpanel", label: "Wall control panel" },
  { key: "rectifier", label: "Rectifier" },
  { key: "hoist", label: "Overhead gantry hoist" },
  { key: "chillers", label: "Chillers" },
  { key: "tanks", label: "Reinforced chemical tanks" },
  // { key: "gaspipes", label: "Gas pipes" },
  { key: "vents", label: "Interior aircon vent duct" },
  { key: "treatment", label: "Treatment tank" },
  // { key: "copper", label: "Copper plating tank" },
  // { key: "nickel", label: "Nickel plating tank" },
  { key: "rinse", label: "Rinse tank" },
];
