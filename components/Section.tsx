import type { ReactNode } from "react";
import Reveal from "./Reveal";

/* Consistent section shell with an eyebrow label + heading. */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section-pad mx-auto w-full max-w-6xl scroll-mt-24 py-20 sm:py-28 ${className}`}
    >
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
          {eyebrow}
        </p>
        <h2 className="mb-10 font-display text-3xl font-bold text-ink-100 sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
