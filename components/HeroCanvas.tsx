"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* ============================================================================
 *  HeroCanvas — decides whether to render the heavy 3D scene.
 *  - Loads the WebGL scene only in the browser (ssr:false).
 *  - Skips 3D when the user prefers reduced motion, and shows a calm
 *    animated CSS fallback instead.
 *  - Fallback also covers the brief moment before the 3D chunk loads.
 * ==========================================================================*/

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

function Fallback() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-neon-cyan/40 sm:h-72 sm:w-72" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-violet/40 sm:h-52 sm:w-52 [animation:spin-slow_16s_linear_infinite_reverse]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-violet/30 blur-md" />
    </div>
  );
}

export default function HeroCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted || reducedMotion) return <Fallback />;
  return <HeroScene />;
}
