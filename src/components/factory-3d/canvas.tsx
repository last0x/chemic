"use client";

import { useEffect, useRef } from "react";
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

function OrbitCamera({ view }: { view: CameraView }) {
  const { camera, gl } = useThree();
  const state = useRef({
    radius: ISO_VIEW.radius,
    theta: ISO_VIEW.theta,
    phi: ISO_VIEW.phi,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const preset = view === "iso" ? ISO_VIEW : TOP_VIEW;
    state.current.radius = preset.radius;
    state.current.theta = preset.theta;
    state.current.phi = preset.phi;
    camera.position.set(
      preset.radius * Math.sin(preset.phi) * Math.sin(preset.theta),
      preset.radius * Math.cos(preset.phi),
      preset.radius * Math.sin(preset.phi) * Math.cos(preset.theta)
    );
    camera.lookAt(...LOOK_AT);
  }, [view, camera]);

  useEffect(() => {
    const el = gl.domElement;

    const updateCamera = () => {
      const { radius, theta, phi } = state.current;
      camera.position.set(
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(...LOOK_AT);
    };

    const onDown = (e: PointerEvent) => {
      state.current.dragging = true;
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
    };
    const onUp = () => {
      state.current.dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      state.current.theta -= (e.clientX - state.current.lastX) * 0.006;
      state.current.phi = Math.min(
        Math.max(state.current.phi - (e.clientY - state.current.lastY) * 0.006, 0.05),
        Math.PI - 0.05
      );
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
      updateCamera();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.current.radius = Math.min(
        Math.max(state.current.radius + e.deltaY * 0.04, 14),
        96
      );
      updateCamera();
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
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

export function FactoryCanvas({ view }: { view: CameraView }) {
  const { setHoveredKey } = useHover();

  return (
    <Canvas
      className="h-full w-full"
      camera={{ fov: 38, near: 0.1, far: 240, position: [20, 40, 40] }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      flat
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
  );
}
