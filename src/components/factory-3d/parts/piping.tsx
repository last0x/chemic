"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  EXHAUST_HEADER_Y,
  GAS_PIPE_COLOR,
  H,
  ROOM_MIN_X,
  ROW_Z,
} from "../layout";
import { Edges, Elbow, Hoverable, Pipe } from "../primitives";

const SCRUBBER_X = ROOM_MIN_X - 1.7;
const SCRUBBER_R = 0.55;
const SCRUBBER_H = 2.3;
const BALL_COLORS = [0xffffff, 0xa7f3d0, 0x67e8f9] as const;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Piping() {
  const balls = useMemo(() => {
    const rand = mulberry32(1);
    return Array.from({ length: 22 }, (_, i) => {
      const rr = rand() * 0.36;
      const ang = rand() * Math.PI * 2;
      const by = 0.35 + SCRUBBER_H * 0.35 + rand() * (SCRUBBER_H * 0.5);
      return {
        key: i,
        color: BALL_COLORS[i % 3],
        position: [
          SCRUBBER_X + Math.cos(ang) * rr,
          by,
          ROW_Z + Math.sin(ang) * rr,
        ] as [number, number, number],
      };
    });
  }, []);

  return (
    <group>
      <Hoverable infoKey="manifold">
        <Pipe from={[-6, 0.35, -8.6]} to={[11, 0.35, -8.6]} radius={0.15} color={0x4a6fa1} />
      </Hoverable>

      <Hoverable infoKey="wastewater">
        <Pipe from={[-6, 0.15, -8.9]} to={[11, 0.15, -8.9]} radius={0.15} color={0x4b5563} />
      </Hoverable>

      <Hoverable infoKey="exhaust">
        <Pipe
          from={[ROOM_MIN_X, EXHAUST_HEADER_Y, ROW_Z]}
          to={[11, EXHAUST_HEADER_Y, ROW_Z]}
          radius={0.2}
          color={GAS_PIPE_COLOR}
        />
        <Pipe
          from={[ROOM_MIN_X, EXHAUST_HEADER_Y, ROW_Z]}
          to={[ROOM_MIN_X - 0.4, EXHAUST_HEADER_Y, ROW_Z]}
          radius={0.2}
          color={GAS_PIPE_COLOR}
        />
      </Hoverable>

      <Hoverable infoKey="scrubber">
        <Pipe
          from={[ROOM_MIN_X - 0.4, EXHAUST_HEADER_Y, ROW_Z]}
          to={[ROOM_MIN_X - 0.9, EXHAUST_HEADER_Y, ROW_Z]}
          radius={0.2}
          color={GAS_PIPE_COLOR}
        />
        <Elbow
          position={[ROOM_MIN_X - 0.9, EXHAUST_HEADER_Y, ROW_Z]}
          radius={0.21}
          color={GAS_PIPE_COLOR}
        />
        <Pipe
          from={[ROOM_MIN_X - 0.9, EXHAUST_HEADER_Y, ROW_Z]}
          to={[ROOM_MIN_X - 0.9, 1.4, ROW_Z]}
          radius={0.2}
          color={GAS_PIPE_COLOR}
        />
        <Elbow
          position={[ROOM_MIN_X - 0.9, 1.4, ROW_Z]}
          radius={0.21}
          color={GAS_PIPE_COLOR}
        />
        <Pipe
          from={[ROOM_MIN_X - 0.9, 1.4, ROW_Z]}
          to={[SCRUBBER_X + SCRUBBER_R, 1.4, ROW_Z]}
          radius={0.18}
          color={GAS_PIPE_COLOR}
        />

        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                SCRUBBER_X + Math.cos(a) * 0.4,
                0.17,
                ROW_Z + Math.sin(a) * 0.4,
              ]}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
              <meshStandardMaterial
                color={0x8891a0}
                roughness={0.5}
                metalness={0.5}
                emissive={0x000000}
              />
            </mesh>
          );
        })}

        <mesh position={[SCRUBBER_X, 0.35 + SCRUBBER_H / 2, ROW_Z]}>
          <cylinderGeometry args={[SCRUBBER_R, SCRUBBER_R, SCRUBBER_H, 20]} />
          <meshStandardMaterial
            color={0xa7f3d0}
            transparent
            opacity={0.4}
            roughness={0.3}
            metalness={0.1}
            emissive={0x000000}
            side={THREE.DoubleSide}
          />
          <Edges color={0x059669} opacity={0.5} />
        </mesh>

        {balls.map((ball) => (
          <mesh key={ball.key} position={ball.position}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial
              color={ball.color}
              roughness={0.4}
              metalness={0.1}
              emissive={0x000000}
            />
          </mesh>
        ))}

        <Pipe
          from={[SCRUBBER_X, 0.35 + SCRUBBER_H, ROW_Z]}
          to={[SCRUBBER_X, H + 1.6, ROW_Z]}
          radius={0.22}
          color={GAS_PIPE_COLOR}
        />
        <mesh position={[SCRUBBER_X, H + 1.6, ROW_Z + 0.32]}>
          <boxGeometry args={[0.5, 0.5, 0.85]} />
          <meshStandardMaterial
            color={0xe8e6df}
            roughness={0.55}
            metalness={0.25}
            emissive={0x000000}
          />
          <Edges color={0x8a8a80} opacity={0.4} />
        </mesh>
        <mesh
          position={[SCRUBBER_X, H + 1.6, ROW_Z + 0.7]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.26, 0.26, 0.28, 14]} />
          <meshStandardMaterial
            color={0x8891a0}
            roughness={0.5}
            metalness={0.5}
            emissive={0x000000}
          />
        </mesh>
      </Hoverable>
    </group>
  );
}
