"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/portfolio";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: mark the section currently in the middle of the viewport as
  // "active" so the nav shows what the visitor is looking at right now.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`section-pad mx-auto flex max-w-7xl items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? "glass-strong py-2.5 shadow-card" : "py-2"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-sm font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet font-mono text-xs text-base-900">
            {initials}
          </span>
          <span className="hidden text-ink-100 sm:inline">{profile.name}</span>
        </a>

        {/* Desktop links with a sliding active pill */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-neon-cyan"
                      : "text-ink-300 hover:text-ink-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.08] shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="ml-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue px-4 py-2 text-sm font-semibold text-base-900 transition-transform hover:scale-[1.03]"
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-100 hover:bg-white/5 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — active section gets a neon left-border + highlight */}
      {open && (
        <div className="section-pad mx-auto mt-2 max-w-7xl md:hidden">
          <ul className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block rounded-lg border-l-2 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "border-neon-cyan bg-white/[0.06] text-neon-cyan"
                        : "border-transparent text-ink-300 hover:bg-white/5 hover:text-ink-100"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
