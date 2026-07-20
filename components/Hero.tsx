"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Facebook, Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import { profile, socials } from "@/content/portfolio";

const iconFor = (label: string) => {
  if (label === "GitHub") return Github;
  if (label === "LinkedIn") return Linkedin;
  if (label === "Facebook") return Facebook;
  return Mail;
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full items-center overflow-hidden"
    >
      {/* 3D scene as a full-bleed background layer */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCanvas />
        {/* readability scrim so text stays legible over the 3D */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base-900/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 font-mono text-xs text-ink-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan shadow-glow" />
            Available for opportunities
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-100 sm:text-6xl md:text-7xl">
            {profile.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="neon-text">
              {profile.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>

          <p className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-neon-cyan sm:text-base">
            {profile.role}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            {profile.heroBlurb}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-5 py-3 text-sm font-semibold text-base-900 shadow-glow transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl glass-strong px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:bg-white/10"
            >
              Contact me
            </a>
            {profile.resumePdf && (
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-ink-300 transition-colors hover:text-ink-100"
              >
                <Download size={16} />
                Download CV
              </a>
            )}
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconFor(s.label);
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl glass text-ink-300 transition-all hover:text-neon-cyan hover:shadow-glow"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* "drag me" hint over the 3D object */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden items-center gap-2 font-mono text-xs text-ink-500 lg:flex">
        <MousePointer2 size={14} className="text-neon-cyan" />
        drag the core to rotate
      </div>
    </section>
  );
}
