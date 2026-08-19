"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import type { CameraView } from "./layout";
import { ISO_VIEW, LOOK_AT, TOP_VIEW } from "./layout";
import { Interior } from "./parts/interior";
import { Exterior } from "./parts/exterior";
import { Piping } from "./parts/piping";
import { Room } from "./parts/room";
import { Tanks } from "./parts/tanks";
import { Walkway } from "./parts/walkway";
import { useHover } from "./primitives";

const MIN_RADIUS = 8;
const MAX_RADIUS = 96;

const ISO_POS: [number, number, number] = [
  ISO_VIEW.radius * Math.sin(ISO_VIEW.phi) * Math.sin(ISO_VIEW.theta),
  ISO_VIEW.radius * Math.cos(ISO_VIEW.phi),
  ISO_VIEW.radius * Math.sin(ISO_VIEW.phi) * Math.cos(ISO_VIEW.theta),
];

function OrbitCamera({ view }: { view: CameraView }) {
  const { camera, gl } = useThree();
  const state = useRef({
    radius: ISO_VIEW.radius,
    theta: ISO_VIEW.theta,
    phi: ISO_VIEW.phi,
    dragging: false,
    lastX: 0,
    lastY: 0,
    pointers: new Map<number, { x: number; y: number }>(),
    pinchDist: 0,
  });

  useEffect(() => {
    const preset = view === "iso" ? ISO_VIEW : TOP_VIEW;
    state.current.radius = preset.radius;
    state.current.theta = preset.theta;
    state.current.phi = preset.phi;
    camera.position.set(
      preset.radius * Math.sin(preset.phi) * Math.sin(preset.theta),
      preset.radius * Math.cos(preset.phi),
      preset.radius * Math.sin(preset.phi) * Math.cos(preset.theta),
    );
    camera.lookAt(...LOOK_AT);
  }, [view, camera]);

  useEffect(() => {
    const el = gl.domElement;
    const pointers = state.current.pointers;

    const updateCamera = () => {
      const { radius, theta, phi } = state.current;
      camera.position.set(
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta),
      );
      camera.lookAt(...LOOK_AT);
    };

    const pinchDistance = () => {
      const pts = [...pointers.values()];
      if (pts.length < 2) return 0;
      return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    };

    const onDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        state.current.dragging = true;
        state.current.lastX = e.clientX;
        state.current.lastY = e.clientY;
      } else {
        state.current.dragging = false;
        state.current.pinchDist = pinchDistance();
      }
    };

    const onUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
      if (pointers.size === 0) {
        state.current.dragging = false;
        state.current.pinchDist = 0;
      } else if (pointers.size === 1) {
        const remaining = [...pointers.values()][0];
        state.current.dragging = true;
        state.current.lastX = remaining.x;
        state.current.lastY = remaining.y;
        state.current.pinchDist = 0;
      } else {
        state.current.pinchDist = pinchDistance();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size >= 2) {
        const dist = pinchDistance();
        const prev = state.current.pinchDist;
        if (prev > 0 && dist > 0) {
          state.current.radius = Math.min(
            Math.max(state.current.radius * (prev / dist), MIN_RADIUS),
            MAX_RADIUS,
          );
          state.current.pinchDist = dist;
          updateCamera();
        } else {
          state.current.pinchDist = dist;
        }
        return;
      }

      if (!state.current.dragging) return;
      state.current.theta -= (e.clientX - state.current.lastX) * 0.006;
      state.current.phi = Math.min(
        Math.max(state.current.phi - (e.clientY - state.current.lastY) * 0.006, 0.05),
        Math.PI - 0.05,
      );
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
      updateCamera();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.current.radius = Math.min(
        Math.max(state.current.radius + e.deltaY * 0.04, MIN_RADIUS),
        MAX_RADIUS,
      );
      updateCamera();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", onUp);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("lostpointercapture", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [camera, gl]);

  return null;
}

function FactoryScene() {
  return (
    <group>
      <Room />
      <Piping />
      <Tanks />
      <Walkway />
      <Interior />
      <Exterior />
    </group>
  );
}

function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e9edf1] px-4 text-center text-sm text-ink-soft">
      3D preview isn&apos;t available on this device
    </div>
  );
}

export function FactoryCanvas({ view }: { view: CameraView }) {
  const { setHoveredKey } = useHover();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <CanvasFallback />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        className="h-full w-full"
        style={{ touchAction: "none", display: "block", width: "100%", height: "100%" }}
        camera={{ fov: 38, near: 0.1, far: 240, position: ISO_POS }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
          preserveDrawingBuffer: true,
        }}
        dpr={1}
        flat
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 }, offsetSize: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(1);
          const canvas = gl.domElement;
          const onLost = (event: Event) => {
            event.preventDefault();
            setFailed(true);
          };
          canvas.addEventListener("webglcontextlost", onLost, false);
        }}
        onPointerMissed={() => setHoveredKey(null)}
      >
        <color attach="background" args={["#e9edf1"]} />
        <fog attach="fog" args={["#e9edf1", 50, 100]} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[14, 26, 12]} intensity={2.2} />
        <directionalLight position={[-10, 10, -10]} intensity={0.95} color={0xbcd0e6} />
        <OrbitCamera view={view} />
        <FactoryScene />
      </Canvas>
    </div>
  );
}
