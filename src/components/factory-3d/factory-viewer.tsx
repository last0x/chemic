"use client";

import dynamic from "next/dynamic";

const Factory3D = dynamic(
  () => import("./factory-3d").then((m) => m.Factory3D),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#e9edf1]" />,
  },
);

export function FactoryViewer() {
  return <Factory3D />;
}
