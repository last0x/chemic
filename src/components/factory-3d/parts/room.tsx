"use client";

import * as THREE from "three";
import {
  BACK_WALL_Z,
  H,
  ROOM_MAX_X,
  ROOM_MIN_X,
  ROOM_W,
  SIDE_Z_FAR,
  SIDE_Z_NEAR,
} from "../layout";
import { Edges, Hoverable } from "../primitives";

const roomCenterX = (ROOM_MIN_X + ROOM_MAX_X) / 2;
const roomCenterZ = (SIDE_Z_FAR + SIDE_Z_NEAR) / 2;
const roomDepth = SIDE_Z_NEAR - SIDE_Z_FAR;
const gridSize = Math.max(ROOM_W, roomDepth);

export function Room() {
  return (
    <group>
      <Hoverable infoKey="floor">
        <mesh position={[roomCenterX, -0.15, roomCenterZ]}>
          <boxGeometry args={[ROOM_W, 0.3, roomDepth]} />
          <meshStandardMaterial
            color={0xdde3e9}
            roughness={0.9}
            metalness={0.05}
            emissive={0x000000}
          />
          <Edges />
        </mesh>
      </Hoverable>

      <gridHelper
        args={[gridSize, 20, 0xc7ced6, 0xd8dee4]}
        position={[roomCenterX, 0.01, roomCenterZ]}
      />

      <Hoverable infoKey="wall">
        <mesh position={[roomCenterX, H / 2, BACK_WALL_Z]}>
          <boxGeometry args={[ROOM_W, H, 0.2]} />
          <meshStandardMaterial
            color={0x9aa5b1}
            transparent
            opacity={0.2}
            roughness={0.6}
            side={THREE.DoubleSide}
            emissive={0x000000}
          />
          <Edges />
        </mesh>
      </Hoverable>

      <Hoverable infoKey="wall">
        <mesh position={[ROOM_MIN_X, H / 2, roomCenterZ]}>
          <boxGeometry args={[0.2, H, roomDepth]} />
          <meshStandardMaterial
            color={0x9aa5b1}
            transparent
            opacity={0.2}
            roughness={0.6}
            side={THREE.DoubleSide}
            emissive={0x000000}
          />
          <Edges />
        </mesh>
      </Hoverable>

      <Hoverable infoKey="wall">
        <mesh position={[ROOM_MAX_X, H / 2, roomCenterZ]}>
          <boxGeometry args={[0.2, H, roomDepth]} />
          <meshStandardMaterial
            color={0x9aa5b1}
            transparent
            opacity={0.2}
            roughness={0.6}
            side={THREE.DoubleSide}
            emissive={0x000000}
          />
          <Edges />
        </mesh>
      </Hoverable>
    </group>
  );
}
