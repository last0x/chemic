"use client";

import * as THREE from "three";
import { RAIL_COLOR } from "../layout";
import { Hoverable, Pipe } from "../primitives";

const DECK_Y = 1.0;
const AISLE_Z0 = -8.0;
const AISLE_Z1 = -7.0;
const RAIL_Z = AISLE_Z1;
const STAIR_XS = [-5.5, 10.5] as const;
const GAP_HALF = 0.6;
const SEG_START = STAIR_XS[0] + GAP_HALF;
const SEG_END = STAIR_XS[1] - GAP_HALF;

function Stairs({ x }: { x: number }) {
  const topZ = RAIL_Z;
  const botZ = RAIL_Z + 1.2;
  const botY = 0.13 + 0.35;

  return (
    <group>
      {[0, 1, 2].map((i) => {
        const y = DECK_Y - (i + 1) * (DECK_Y / 3) + 0.13;
        const z = RAIL_Z + (i + 1) * 0.4;
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[1.0, 0.26, 0.4]} />
            <meshStandardMaterial
              color={0x9aa5b1}
              roughness={0.6}
              metalness={0.2}
              emissive={0x000000}
            />
          </mesh>
        );
      })}
      {([-0.55, 0.55] as const).map((side) => (
        <group key={side}>
          <Pipe
            from={[x + side, DECK_Y + 0.9, topZ]}
            to={[x + side, botY, botZ]}
            radius={0.04}
            color={RAIL_COLOR}
          />
          <Pipe
            from={[x + side, DECK_Y + 0.45, topZ]}
            to={[x + side, botY - 0.35, botZ]}
            radius={0.035}
            color={RAIL_COLOR}
          />
        </group>
      ))}
    </group>
  );
}

export function Walkway() {
  const posts: number[] = [];
  for (let x = SEG_START; x <= SEG_END + 0.01; x += 1.8) posts.push(x);

  return (
    <Hoverable infoKey="platform">
      <mesh position={[2.5, DECK_Y, (AISLE_Z0 + AISLE_Z1) / 2]}>
        <boxGeometry args={[17, 0.15, AISLE_Z1 - AISLE_Z0]} />
        <meshStandardMaterial
          color={0x4ade80}
          transparent
          opacity={0.6}
          roughness={0.7}
          emissive={0x000000}
          side={THREE.DoubleSide}
        />
      </mesh>

      {[-1, 3, 7].map((gx) => (
        <mesh key={gx} position={[gx, DECK_Y, -8.4]}>
          <boxGeometry args={[0.8, 0.15, 2.4]} />
          <meshStandardMaterial
            color={0x4ade80}
            transparent
            opacity={0.6}
            roughness={0.7}
            emissive={0x000000}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {[DECK_Y + 0.9, DECK_Y + 0.45, DECK_Y + 0.1].map((ry) => (
        <Pipe
          key={ry}
          from={[SEG_START, ry, RAIL_Z]}
          to={[SEG_END, ry, RAIL_Z]}
          radius={0.045}
          color={RAIL_COLOR}
        />
      ))}

      {posts.map((x) => (
        <mesh key={x} position={[x, DECK_Y + 0.45, RAIL_Z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshStandardMaterial
            color={RAIL_COLOR}
            roughness={0.4}
            metalness={0.5}
            emissive={0x000000}
          />
        </mesh>
      ))}

      <mesh
        position={[
          (SEG_START + SEG_END) / 2,
          (DECK_Y - 0.1) / 2 + 0.05,
          RAIL_Z,
        ]}
      >
        <boxGeometry args={[SEG_END - SEG_START, DECK_Y - 0.1, 0.06]} />
        <meshStandardMaterial
          color={0x94a3b8}
          transparent
          opacity={0.35}
          roughness={0.6}
          emissive={0x000000}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Stairs x={-5.5} />
      <Stairs x={10.5} />
    </Hoverable>
  );
}
