"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { profile } from "@/content/portfolio";

/* ============================================================================
 *  WelcomeGate — the intro screen shown when the site opens.
 *  - Big "WELCOME" with the name.
 *  - Desktop: "Press any key to proceed" (also click).
 *  - Mobile: "Swipe up to proceed" (a real upward swipe), also tap.
 *  - On proceed, the whole panel slides UP and reveals the site beneath.
 *  Scroll is locked underneath until the visitor proceeds.
 * ==========================================================================*/

export default function WelcomeGate() {
  const [open, setOpen] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const reduce = useReducedMotion();
  const touchStartY = useRef<number | null>(null);

  const proceed = useCallback(() => setOpen(false), []);

  // Detect touch device (drives the copy + gesture hint).
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  // Lock body scroll while the gate is present. We deliberately keep it locked
  // through the whole exit animation and only unlock in AnimatePresence's
  // onExitComplete (below). If we unlocked the instant the user swipes, the
  // swipe's leftover momentum would fling the page down and skip past the hero.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard / wheel / click listeners (desktop) while open.
  useEffect(() => {
    if (!open) return;
    const onKey = () => proceed();
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) proceed(); // scrolling down/up either way advances
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [open, proceed]);

  // Touch swipe-up handlers (mobile).
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = touchStartY.current - e.touches[0].clientY;
    if (dy > 60) {
      touchStartY.current = null;
      proceed();
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Now that the gate has fully slid away, land on the hero (not wherever
        // a fling might have pushed things) and restore normal scrolling.
        if (typeof window !== "undefined") window.scrollTo(0, 0);
        if (typeof document !== "undefined") document.body.style.overflow = "";
      }}
    >
      {open && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[100] flex touch-none flex-col items-center justify-center overflow-hidden bg-base-900"
          onClick={() => {
            // On touch devices a tap must NOT dismiss the gate — only a
            // deliberate swipe up should. Taps still proceed on desktop.
            if (!isTouch) proceed();
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          role="dialog"
          aria-label="Welcome — proceed to enter the site"
          initial={{ y: 0 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.2 } }
              : { y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          {/* ambient neon glow */}
          <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-neon-cyan/15 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[50vh] w-[50vh] rounded-full bg-neon-violet/15 blur-[120px]" />
          {/* faint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan sm:text-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {profile.name}
            </motion.p>

            <motion.h1
              className="font-display text-[18vw] font-bold leading-none tracking-tight sm:text-[14vw] md:text-[11rem]"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="neon-text">WELCOME</span>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm text-ink-300 sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              to my portfolio — {profile.role}
            </motion.p>

            {/* Proceed hint */}
            <motion.div
              className="mt-14 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.span
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neon-cyan"
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronUp size={20} />
              </motion.span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-500">
                {isTouch ? "Swipe up to proceed" : "Press any key to proceed"}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
