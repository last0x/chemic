"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

const Factory3D = dynamic(
  () => import("./factory-3d").then((m) => m.Factory3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[280px] w-full bg-[#e9edf1] sm:min-h-[400px] md:min-h-0" />
    ),
  },
);

export function FactoryViewer() {
  const [still, setStill] = useState<boolean | null>(null);

  useEffect(() => {
    setStill(isIOS());
  }, []);

  if (still === null) {
    return (
      <div className="h-full min-h-[280px] w-full bg-[#e9edf1] sm:min-h-[400px] md:min-h-0" />
    );
  }

  return <Factory3D still={still} />;
}
