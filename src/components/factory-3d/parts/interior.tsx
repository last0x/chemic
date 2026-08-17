"use client";

import { H, ROOM_MAX_X, ROW_Z, STATION_DEFS, stationPumpTop } from "../layout";
import { Edges, Hoverable, Pipe } from "../primitives";

const RECT_Z = -9.2;
const CP_Z = -3.0;
const TRAY_Y = 2.9;

export function Interior() {
  return (
    <group>
      <Hoverable infoKey="controlpanel">
        <mesh position={[ROOM_MAX_X - 0.1, 3.0, CP_Z]}>
          <boxGeometry args={[0.15, 1.1, 1.7]} />
          <meshStandardMaterial
            color={0xe5e7eb}
            roughness={0.4}
            metalness={0.2}
            emissive={0x000000}
          />
          <Edges color={0x374151} opacity={0.4} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[ROOM_MAX_X - 0.18, 3.15, CP_Z - 0.55 + i * 0.35]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.14, 10]} />
            <meshStandardMaterial
              color={0xdc2626}
              roughness={0.4}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
        ))}
        <Pipe
          from={[-4, TRAY_Y, ROW_Z]}
          to={[ROOM_MAX_X, TRAY_Y, ROW_Z]}
          radius={0.05}
          color={0x374151}
        />
        <Pipe
          from={[ROOM_MAX_X, TRAY_Y, ROW_Z]}
          to={[ROOM_MAX_X, TRAY_Y, CP_Z]}
          radius={0.05}
          color={0x374151}
        />
        {STATION_DEFS.map((def) => {
          const [px, py, pz] = stationPumpTop(def.x);
          return (
            <Pipe
              key={def.key}
              from={[px, py, pz]}
              to={[px, TRAY_Y, ROW_Z]}
              radius={0.035}
              color={0x1f2937}
            />
          );
        })}
      </Hoverable>

      <Hoverable infoKey="rectifier">
        <mesh position={[ROOM_MAX_X - 0.4, 2.55, RECT_Z]}>
          <boxGeometry args={[0.6, 1.5, 1.1]} />
          <meshStandardMaterial
            color={0xf1efe7}
            roughness={0.45}
            metalness={0.15}
            emissive={0x000000}
          />
          <Edges color={0x9aa3ad} opacity={0.4} />
        </mesh>
        <mesh position={[ROOM_MAX_X - 0.4 - 0.31, 2.95, RECT_Z]}>
          <boxGeometry args={[0.04, 0.45, 0.7]} />
          <meshStandardMaterial
            color={0x374151}
            roughness={0.5}
            metalness={0.2}
            emissive={0x000000}
          />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[ROOM_MAX_X - 0.4 - 0.33, 2.35, RECT_Z - 0.2 + i * 0.2]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
            <meshStandardMaterial
              color={0x1f2937}
              roughness={0.5}
              metalness={0.3}
              emissive={0x000000}
            />
          </mesh>
        ))}
      </Hoverable>

      <Hoist />
    </group>
  );
}

function Hoist() {
  const railY = H - 0.6;
  const railX0 = -5.5;
  const railX1 = 11;
  const hRailZ0 = -9.4;
  const hRailZ1 = -7.8;
  const trolleyX = 3;
  const hookY = railY * 0.5;

  return (
    <Hoverable infoKey="hoist">
      {([hRailZ0, hRailZ1] as const).map((rz) => (
        <group key={rz}>
          <mesh position={[(railX0 + railX1) / 2, railY, rz]}>
            <boxGeometry args={[railX1 - railX0, 0.24, 0.24]} />
            <meshStandardMaterial
              color={0xeab308}
              roughness={0.4}
              metalness={0.6}
              emissive={0x000000}
            />
          </mesh>
          {([railX0, railX1] as const).map((rx) => (
            <mesh key={rx} position={[rx, railY / 2, rz]}>
              <boxGeometry args={[0.2, railY, 0.2]} />
              <meshStandardMaterial
                color={0xeab308}
                roughness={0.4}
                metalness={0.6}
                emissive={0x000000}
              />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[trolleyX, railY, (hRailZ0 + hRailZ1) / 2]}>
        <boxGeometry args={[0.28, 0.28, hRailZ1 - hRailZ0]} />
        <meshStandardMaterial
          color={0xeab308}
          roughness={0.4}
          metalness={0.6}
          emissive={0x000000}
        />
      </mesh>
      <mesh position={[trolleyX, railY - 0.4, ROW_Z]}>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial
          color={0xeab308}
          roughness={0.4}
          metalness={0.6}
          emissive={0x000000}
        />
      </mesh>
      <Pipe
        from={[trolleyX, railY - 0.65, ROW_Z]}
        to={[trolleyX, hookY + 0.25, ROW_Z]}
        radius={0.05}
        color={0x475569}
      />
      <mesh position={[trolleyX, hookY, ROW_Z]}>
        <boxGeometry args={[0.85, 0.45, 0.6]} />
        <meshStandardMaterial
          color={0xc7d3e0}
          roughness={0.35}
          metalness={0.75}
          transparent
          opacity={0.85}
          emissive={0x000000}
        />
        <Edges color={0x1f2937} opacity={0.5} />
      </mesh>
    </Hoverable>
  );
}
