export const H = 7;
export const ROW_Z = -9.2;
export const BACK_WALL_Z = -10.5;
export const ROOM_MIN_X = -7.5;
export const ROOM_MAX_X = 12;
export const ROOM_W = ROOM_MAX_X - ROOM_MIN_X;
export const SIDE_Z_FAR = -10.5;
export const SIDE_Z_NEAR = SIDE_Z_FAR + ROOM_W;

export const TANK_COLOR = 0xec4899;
export const COVER_COLOR = 0x22d3ee;
export const PUMP_COLOR = 0x1e3a8a;
export const LIQUID_COLOR = 0xbe185d;
export const GAS_PIPE_COLOR = 0xf3e2ab;
export const RAIL_COLOR = 0xe0a64d;
export const DECK_COLOR = 0x4ade80;

export const TANK_W = 2.0;
export const TANK_D = 1.5;
export const TANK_H = 1.6;
export const TANK_BOTTOM = 0.2;
export const TANK_TOP = TANK_BOTTOM + TANK_H;
export const COVER_Y = TANK_TOP + 0.06;
export const EXHAUST_HEADER_Y = TANK_TOP + 0.8;

export type CoverState = "open" | "closed";

export const STATION_DEFS: {
  x: number;
  key: string;
  cover: CoverState;
  infoKey: "rinse" | "treatment";
}[] = [
  { x: -3, key: "open-a", cover: "open", infoKey: "rinse" },
  { x: 1, key: "closed-a", cover: "closed", infoKey: "treatment" },
  { x: 5, key: "open-b", cover: "open", infoKey: "rinse" },
  { x: 9, key: "closed-b", cover: "closed", infoKey: "treatment" },
];

export function stationPumpTop(x: number): [number, number, number] {
  return [x - 0.55, COVER_Y + 0.66, ROW_Z + 0.35];
}

export const CHILLER_Z1 = -2;
export const CHILLER_Z2 = 3.5;
export const CHILLER_X = ROOM_MIN_X - 0.75;
export const CHILLER_MID_Z = (CHILLER_Z1 + CHILLER_Z2) / 2;
export const TOTE_Z = 7.5;
export const GAS_Z = [-5.5, 1, 6] as const;

export const LOOK_AT: [number, number, number] = [-1, 2.6, -1];
export const ISO_VIEW = { theta: Math.PI * 0.26, phi: Math.PI * 0.38, radius: 62 };
export const TOP_VIEW = { theta: 0.001, phi: 0.15, radius: 62 };

export type CameraView = "iso" | "top";
