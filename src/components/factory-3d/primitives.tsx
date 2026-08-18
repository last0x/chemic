"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import * as THREE from "three";
import type { FactoryKey } from "./info";

type HoverContextValue = {
  hoveredKey: FactoryKey | null;
  setHoveredKey: Dispatch<SetStateAction<FactoryKey | null>>;
};

const HoverContext = createContext<HoverContextValue | null>(null);

export function HoverProvider({
  hoveredKey,
  setHoveredKey,
  children,
}: HoverContextValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ hoveredKey, setHoveredKey }),
    [hoveredKey, setHoveredKey]
  );
  return <HoverContext.Provider value={value}>{children}</HoverContext.Provider>;
}

export function useHover() {
  const ctx = useContext(HoverContext);
  if (!ctx) throw new Error("useHover must be used within HoverProvider");
  return ctx;
}

const LOW_GPU_QUERY = "(max-width: 767px), (pointer: coarse)";

function subscribeLowGpu(onStoreChange: () => void) {
  const mq = window.matchMedia(LOW_GPU_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getLowGpu() {
  return window.matchMedia(LOW_GPU_QUERY).matches;
}

export function useLowGpu() {
  return useSyncExternalStore(subscribeLowGpu, getLowGpu, () => false);
}

const GLOW = 0xffe8b0;
const GLOW_INTENSITY = 0.55;

function setGroupGlow(root: THREE.Object3D, on: boolean) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.material) return;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const m of mats) {
      if ("emissive" in m && m.emissive instanceof THREE.Color) {
        m.emissive.setHex(on ? GLOW : 0x000000);
        if ("emissiveIntensity" in m) {
          (m as THREE.MeshStandardMaterial).emissiveIntensity = on
            ? GLOW_INTENSITY
            : 0;
        }
      }
    }
  });
}

export function Hoverable({
  infoKey,
  children,
}: {
  infoKey: FactoryKey;
  children: ReactNode;
}) {
  const { hoveredKey, setHoveredKey } = useHover();
  const ref = useRef<THREE.Group>(null);
  const active = hoveredKey === infoKey;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    setGroupGlow(root, active);
  }, [active]);

  return (
    <group
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        setHoveredKey(infoKey);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (e.pointerType === "mouse") setHoveredKey(infoKey);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        if (e.pointerType === "mouse") {
          setHoveredKey((key) => (key === infoKey ? null : key));
        }
      }}
    >
      {children}
    </group>
  );
}

export function Edges({
  color = 0x5f6b78,
  opacity = 0.45,
}: {
  color?: THREE.ColorRepresentation;
  opacity?: number;
}) {
  const skip = useLowGpu();
  const ref = useRef<THREE.LineSegments>(null);

  useLayoutEffect(() => {
    if (skip) return;
    const line = ref.current;
    const parent = line?.parent;
    if (!line || !parent || !("geometry" in parent) || !parent.geometry) return;
    const geo = new THREE.EdgesGeometry(parent.geometry as THREE.BufferGeometry);
    line.geometry = geo;
    return () => {
      geo.dispose();
    };
  }, [skip]);

  if (skip) return null;

  return (
    <lineSegments ref={ref} raycast={() => {}}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

export function Pipe({
  from,
  to,
  radius,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius: number;
  color: THREE.ColorRepresentation;
}) {
  const [x1, y1, z1] = from;
  const [x2, y2, z2] = to;
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(x1, y1, z1);
    const end = new THREE.Vector3(x2, y2, z2);
    const dir = new THREE.Vector3().subVectors(end, start);
    const length = Math.max(dir.length(), 0.001);
    const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return { position, quaternion, length };
  }, [x1, y1, z1, x2, y2, z2]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial
        color={color}
        roughness={0.35}
        metalness={0.55}
        emissive={0x000000}
      />
    </mesh>
  );
}

export function Elbow({
  position,
  radius,
  color,
}: {
  position: [number, number, number];
  radius: number;
  color: THREE.ColorRepresentation;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 10, 10]} />
      <meshStandardMaterial
        color={color}
        roughness={0.35}
        metalness={0.55}
        emissive={0x000000}
      />
    </mesh>
  );
}

export function Cage({
  cx,
  cy,
  cz,
  size,
}: {
  cx: number;
  cy: number;
  cz: number;
  size: number;
}) {
  const half = size / 2;
  const posts = ([-half, half] as const).flatMap((dx) =>
    ([-half, half] as const).map((dz) => [dx, dz] as const)
  );
  const rails = [-half + 0.05, 0, half - 0.05];

  return (
    <group>
      {posts.map(([dx, dz]) => (
        <mesh key={`p-${dx}-${dz}`} position={[cx + dx, cy, cz + dz]}>
          <boxGeometry args={[0.05, size, 0.05]} />
          <meshStandardMaterial
            color={0x52525b}
            roughness={0.5}
            metalness={0.6}
            emissive={0x000000}
          />
        </mesh>
      ))}
      {rails.map((dy) => (
        <group key={`r-${dy}`}>
          <mesh position={[cx, cy + dy, cz + half]}>
            <boxGeometry args={[size + 0.06, 0.04, 0.04]} />
            <meshStandardMaterial
              color={0x52525b}
              roughness={0.5}
              metalness={0.6}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[cx, cy + dy, cz - half]}>
            <boxGeometry args={[size + 0.06, 0.04, 0.04]} />
            <meshStandardMaterial
              color={0x52525b}
              roughness={0.5}
              metalness={0.6}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[cx - half, cy + dy, cz]}>
            <boxGeometry args={[0.04, 0.04, size + 0.06]} />
            <meshStandardMaterial
              color={0x52525b}
              roughness={0.5}
              metalness={0.6}
              emissive={0x000000}
            />
          </mesh>
          <mesh position={[cx + half, cy + dy, cz]}>
            <boxGeometry args={[0.04, 0.04, size + 0.06]} />
            <meshStandardMaterial
              color={0x52525b}
              roughness={0.5}
              metalness={0.6}
              emissive={0x000000}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
