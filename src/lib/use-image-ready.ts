"use client";

import { useCallback, useState } from "react";

function isDecoded(img: HTMLImageElement) {
  return img.complete && img.naturalWidth > 0;
}

/** True once the first image has loaded, including Safari cache hits that skip onLoad. */
export function useImageReady() {
  const [ready, setReady] = useState(false);

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && isDecoded(img)) setReady(true);
  }, []);

  const onLoad = useCallback(() => {
    setReady(true);
  }, []);

  return { ready, ref, onLoad };
}
