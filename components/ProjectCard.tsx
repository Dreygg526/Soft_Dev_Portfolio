"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SmartImage from "./SmartImage";
import type { Project } from "@/content/portfolio";

const accentMap: Record<Project["accent"], string> = {
  cyan: "from-neon-cyan/25 to-transparent",
  violet: "from-neon-violet/25 to-transparent",
  magenta: "from-neon-magenta/25 to-transparent",
  blue: "from-neon-blue/25 to-transparent",
};

const accentText: Record<Project["accent"], string> = {
  cyan: "text-neon-cyan",
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  blue: "text-neon-blue",
};

export default function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-driven 3D tilt.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative rounded-3xl glass p-2.5 transition-colors hover:border-white/15 [perspective:1200px]"
    >
      {/* glow aura on hover */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${accentMap[project.accent]} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative" style={reduce ? undefined : { transform: "translateZ(30px)" }}>
        {/* Screenshot */}
        <div className="relative overflow-hidden rounded-2xl">
          <SmartImage
            src={project.image}
            alt={`${project.name} screenshot`}
            placeholderLabel={`${project.name} screenshot`}
            placeholderHint="16:9, 1200 × 675px"
            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.04]"
            rounded="rounded-2xl"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-base-900/70 to-transparent" />
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-ink-100">
              {project.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source on GitHub`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg glass text-ink-300 transition-colors hover:text-ink-100"
                >
                  <Github size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} live`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg glass transition-colors hover:text-ink-100 ${accentText[project.accent]}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-ink-300">
            {project.blurb}
          </p>

          <ul className="mt-4 space-y-2">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-500">
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accentText[project.accent]} bg-current`} />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
