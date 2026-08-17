"use client";

import {
  COVER_COLOR,
  COVER_Y,
  EXHAUST_HEADER_Y,
  GAS_PIPE_COLOR,
  LIQUID_COLOR,
  PUMP_COLOR,
  ROW_Z,
  STATION_DEFS,
  TANK_BOTTOM,
  TANK_COLOR,
  TANK_D,
  TANK_H,
  TANK_TOP,
  TANK_W,
  type CoverState,
} from "../layout";
import { Edges, Hoverable, Pipe } from "../primitives";

function Station({
  x,
  infoKey,
  cover,
}: {
  x: number;
  infoKey: (typeof STATION_DEFS)[number]["infoKey"];
  cover: CoverState;
}) {
  const pumpX = x - 0.55;
  const pumpZ = ROW_Z + 0.35;
  const riserX = x + 0.6;
  const bpX = x + 0.9;
  const bpZ = -8.55;

  return (
    <Hoverable infoKey={infoKey}>
      <mesh position={[x, TANK_BOTTOM + TANK_H / 2, ROW_Z]}>
        <boxGeometry args={[TANK_W, TANK_H, TANK_D]} />
        <meshStandardMaterial
          color={TANK_COLOR}
          roughness={0.35}
          metalness={0.25}
          emissive={0x000000}
        />
        <Edges color={0x831843} opacity={0.3} />
      </mesh>

      {cover === "closed" ? (
        <mesh position={[x, COVER_Y, ROW_Z]}>
          <boxGeometry args={[TANK_W - 0.1, 0.12, TANK_D - 0.1]} />
          <meshStandardMaterial
            color={COVER_COLOR}
            roughness={0.4}
            metalness={0.3}
            emissive={0x000000}
          />
          <Edges color={0x0e7490} opacity={0.3} />
        </mesh>
      ) : (
        <>
          <mesh position={[x, TANK_TOP - 0.08, ROW_Z]}>
            <boxGeometry args={[TANK_W - 0.35, 0.06, TANK_D - 0.35]} />
            <meshStandardMaterial
              color={LIQUID_COLOR}
              roughness={0.2}
              metalness={0.1}
              emissive={LIQUID_COLOR}
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[x, COVER_Y, ROW_Z - (TANK_D - 0.1) / 2]}>
            <boxGeometry args={[TANK_W - 0.1, 0.12, 0.14]} />
            <meshStandardMaterial
              color={COVER_COLOR}
              roughness={0.4}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[x, COVER_Y, ROW_Z + (TANK_D - 0.1) / 2]}>
            <boxGeometry args={[TANK_W - 0.1, 0.12, 0.14]} />
            <meshStandardMaterial
              color={COVER_COLOR}
              roughness={0.4}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[x - (TANK_W - 0.1) / 2, COVER_Y, ROW_Z]}>
            <boxGeometry args={[0.14, 0.12, TANK_D - 0.1]} />
            <meshStandardMaterial
              color={COVER_COLOR}
              roughness={0.4}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[x + (TANK_W - 0.1) / 2, COVER_Y, ROW_Z]}>
            <boxGeometry args={[0.14, 0.12, TANK_D - 0.1]} />
            <meshStandardMaterial
              color={COVER_COLOR}
              roughness={0.4}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
        </>
      )}

      <mesh position={[pumpX, COVER_Y + 0.22, pumpZ]}>
        <cylinderGeometry args={[0.2, 0.2, 0.32, 14]} />
        <meshStandardMaterial
          color={PUMP_COLOR}
          roughness={0.4}
          metalness={0.5}
          emissive={0x000000}
        />
      </mesh>
      <mesh position={[pumpX, COVER_Y + 0.5, pumpZ]}>
        <boxGeometry args={[0.3, 0.24, 0.3]} />
        <meshStandardMaterial
          color={PUMP_COLOR}
          roughness={0.4}
          metalness={0.5}
          emissive={0x000000}
        />
      </mesh>

      <Pipe
        from={[riserX, COVER_Y + 0.06, ROW_Z]}
        to={[riserX, EXHAUST_HEADER_Y, ROW_Z]}
        radius={0.1}
        color={GAS_PIPE_COLOR}
      />

      <mesh position={[bpX, 0.24, bpZ]}>
        <cylinderGeometry args={[0.16, 0.16, 0.28, 12]} />
        <meshStandardMaterial
          color={PUMP_COLOR}
          roughness={0.4}
          metalness={0.5}
          emissive={0x000000}
        />
      </mesh>
      <mesh position={[bpX, 0.48, bpZ]}>
        <boxGeometry args={[0.24, 0.2, 0.24]} />
        <meshStandardMaterial
          color={PUMP_COLOR}
          roughness={0.4}
          metalness={0.5}
          emissive={0x000000}
        />
      </mesh>
      <Pipe
        from={[bpX, TANK_BOTTOM, ROW_Z + TANK_D / 2]}
        to={[bpX, 0.24, bpZ]}
        radius={0.07}
        color={0x4b5563}
      />
      <Pipe
        from={[bpX, 0.24, bpZ]}
        to={[bpX, 0.15, -8.9]}
        radius={0.06}
        color={0x4b5563}
      />
    </Hoverable>
  );
}

export function Tanks() {
  return (
    <group>
      {STATION_DEFS.map((def) => (
        <Station key={def.key} x={def.x} infoKey={def.infoKey} cover={def.cover} />
      ))}
    </group>
  );
}
