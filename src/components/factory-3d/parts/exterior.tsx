"use client";

import {
  CHILLER_MID_Z,
  CHILLER_X,
  CHILLER_Z1,
  CHILLER_Z2,
  GAS_Z,
  H,
  PUMP_COLOR,
  ROOM_MIN_X,
  TOTE_Z,
} from "../layout";
import { Cage, Edges, Elbow, Hoverable, Pipe } from "../primitives";

function ChillerBody({ z }: { z: number }) {
  return (
    <group>
      <mesh position={[CHILLER_X, 0.6, z]}>
        <boxGeometry args={[1.8, 1.2, 1.0]} />
        <meshStandardMaterial
          color={0xcbd2d9}
          roughness={0.5}
          metalness={0.4}
          emissive={0x000000}
        />
        <Edges color={0x6b7280} opacity={0.4} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[CHILLER_X, 0.25 + i * 0.22, z + 0.51]}>
          <boxGeometry args={[1.6, 0.04, 0.02]} />
          <meshStandardMaterial
            color={0x6b7280}
            roughness={0.5}
            metalness={0.4}
            emissive={0x000000}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Exterior() {
  const toteColors = [0xf5f5f0, 0xfde68a, 0xf5f5f0, 0xfde68a] as const;
  const toteSlots = [TOTE_Z - 0.6, TOTE_Z + 0.6].flatMap((dz, zi) =>
    [0.55, 1.65].map((dy, yi) => ({
      dz,
      dy,
      color: toteColors[(zi * 2 + yi) % 4],
    }))
  );

  const uTopY = 2.2;
  const ventY = 5.4;
  const ventX = ROOM_MIN_X + 0.35;
  const ventZa = CHILLER_Z1 - 1.5;
  const ventZb = CHILLER_Z2 + 1.5;
  const ventSlots: number[] = [];
  for (let z = ventZa + 0.7; z <= ventZb - 0.7; z += 1.8) ventSlots.push(z);

  return (
    <group>
      <Hoverable infoKey="chillers">
        <ChillerBody z={CHILLER_Z1} />
        <ChillerBody z={CHILLER_Z2} />
        <Pipe
          from={[CHILLER_X, 1.2, CHILLER_Z1]}
          to={[CHILLER_X, uTopY, CHILLER_Z1]}
          radius={0.08}
          color={PUMP_COLOR}
        />
        <Pipe
          from={[CHILLER_X, uTopY, CHILLER_Z1]}
          to={[CHILLER_X, uTopY, CHILLER_Z2]}
          radius={0.08}
          color={PUMP_COLOR}
        />
        <Pipe
          from={[CHILLER_X, uTopY, CHILLER_Z2]}
          to={[CHILLER_X, 1.2, CHILLER_Z2]}
          radius={0.08}
          color={PUMP_COLOR}
        />
        <Elbow position={[CHILLER_X, uTopY, CHILLER_Z1]} radius={0.09} color={PUMP_COLOR} />
        <Elbow position={[CHILLER_X, uTopY, CHILLER_Z2]} radius={0.09} color={PUMP_COLOR} />
        <Pipe
          from={[CHILLER_X, uTopY, CHILLER_MID_Z]}
          to={[CHILLER_X, 3.6, CHILLER_MID_Z]}
          radius={0.08}
          color={PUMP_COLOR}
        />
        <Elbow position={[CHILLER_X, uTopY, CHILLER_MID_Z]} radius={0.09} color={PUMP_COLOR} />
        <Pipe
          from={[CHILLER_X, 3.6, CHILLER_MID_Z]}
          to={[ROOM_MIN_X + 0.3, 3.6, CHILLER_MID_Z]}
          radius={0.08}
          color={PUMP_COLOR}
        />
        <Elbow position={[CHILLER_X, 3.6, CHILLER_MID_Z]} radius={0.09} color={PUMP_COLOR} />
      </Hoverable>

      <Hoverable infoKey="totes">
        {toteSlots.map(({ dz, dy, color }) => (
          <group key={`${dz}-${dy}`}>
            <mesh position={[ROOM_MIN_X - 0.65, dy, dz]}>
              <boxGeometry args={[1.1, 1.1, 1.1]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.55}
                roughness={0.4}
                metalness={0.05}
                emissive={0x000000}
              />
            </mesh>
            <Cage cx={ROOM_MIN_X - 0.65} cy={dy} cz={dz} size={1.16} />
          </group>
        ))}
        <Pipe
          from={[ROOM_MIN_X - 0.65, 2.3, TOTE_Z]}
          to={[ROOM_MIN_X - 0.4, 2.3, TOTE_Z]}
          radius={0.05}
          color={0xb0b8c0}
        />
        <Pipe
          from={[ROOM_MIN_X - 0.4, 2.3, TOTE_Z]}
          to={[ROOM_MIN_X - 0.4, H - 0.4, TOTE_Z]}
          radius={0.05}
          color={0xb0b8c0}
        />
        <Elbow
          position={[ROOM_MIN_X - 0.4, H - 0.4, TOTE_Z]}
          radius={0.06}
          color={0xb0b8c0}
        />
        <mesh position={[ROOM_MIN_X - 0.4, H - 0.3, TOTE_Z]}>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 10]} />
          <meshStandardMaterial
            color={0xb0b8c0}
            roughness={0.5}
            metalness={0.4}
            emissive={0x000000}
          />
        </mesh>
      </Hoverable>

      <Hoverable infoKey="gaspipes">
        {GAS_Z.map((gz) => (
          <group key={gz}>
            <Pipe
              from={[ROOM_MIN_X - 0.25, 0, gz]}
              to={[ROOM_MIN_X - 0.25, H - 0.3, gz]}
              radius={0.06}
              color={0xb0b8c0}
            />
            <Elbow
              position={[ROOM_MIN_X - 0.25, H - 0.3, gz]}
              radius={0.07}
              color={0xb0b8c0}
            />
            <Pipe
              from={[ROOM_MIN_X - 0.25, H - 0.3, gz]}
              to={[ROOM_MIN_X, H - 0.3, gz]}
              radius={0.06}
              color={0xb0b8c0}
            />
          </group>
        ))}
      </Hoverable>

      <Hoverable infoKey="vents">
        <mesh position={[ventX, ventY, (ventZa + ventZb) / 2]}>
          <boxGeometry args={[0.5, 0.5, ventZb - ventZa]} />
          <meshStandardMaterial
            color={0xcbd2d9}
            roughness={0.5}
            metalness={0.3}
            emissive={0x000000}
          />
          <Edges color={0x6b7280} opacity={0.4} />
        </mesh>
        {ventSlots.map((z) => (
          <mesh key={z} position={[ventX + 0.28, ventY, z]}>
            <boxGeometry args={[0.06, 0.3, 0.9]} />
            <meshStandardMaterial
              color={0x374151}
              roughness={0.6}
              metalness={0.2}
              emissive={0x000000}
            />
          </mesh>
        ))}
        <Pipe
          from={[ROOM_MIN_X + 0.3, 3.6, CHILLER_MID_Z]}
          to={[ventX, 3.6, CHILLER_MID_Z]}
          radius={0.06}
          color={PUMP_COLOR}
        />
        <Pipe
          from={[ventX, 3.6, CHILLER_MID_Z]}
          to={[ventX, ventY, CHILLER_MID_Z]}
          radius={0.06}
          color={PUMP_COLOR}
        />
      </Hoverable>
    </group>
  );
}
