"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* A thin gradient bar at the very top that fills as the visitor scrolls —
 * immediate feedback on how far through the page they are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet"
      aria-hidden="true"
    />
  );
}
