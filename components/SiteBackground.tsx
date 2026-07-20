"use client";

import { useReducedMotion } from "framer-motion";

/* ============================================================================
 *  SiteBackground — a quiet, atmospheric layer behind ALL content so the
 *  sections below the hero don't feel empty. Deliberately understated:
 *  - a faint grid that fades out toward the edges (masked)
 *  - a few very soft, slowly drifting neon blobs
 *  - a subtle vignette
 *  Everything is low-opacity and heavily blurred so it never competes with
 *  the text. Fixed + behind content (-z-10), and calms down for reduced motion.
 * ==========================================================================*/

export default function SiteBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* faint grid, faded at the edges so it reads as texture, not a table */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 90%)",
        }}
      />

      {/* soft drifting neon blobs — the ambient glow */}
      <div
        className={`absolute -left-40 top-[18%] h-[34rem] w-[34rem] rounded-full bg-neon-cyan/[0.06] blur-[140px] ${
          reduce ? "" : "animate-drift"
        }`}
      />
      <div
        className={`absolute -right-40 top-[55%] h-[32rem] w-[32rem] rounded-full bg-neon-violet/[0.07] blur-[140px] ${
          reduce ? "" : "animate-drift-slow"
        }`}
      />
      <div
        className={`absolute left-1/3 bottom-[-8rem] h-[28rem] w-[28rem] rounded-full bg-neon-blue/[0.05] blur-[130px] ${
          reduce ? "" : "animate-drift"
        }`}
        style={{ animationDelay: "-9s" }}
      />

      {/* gentle vignette to keep focus toward the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 55%, rgba(5,7,14,0.55) 100%)",
        }}
      />
    </div>
  );
}
