import { Briefcase } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/content/portfolio";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02 — Where I've worked" title="Experience">
      <div className="relative">
        {/* vertical timeline line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/50 via-line to-transparent md:left-[19px]" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <Reveal key={job.company + i} delay={i * 0.1}>
              <div className="relative pl-12 md:pl-16">
                {/* node */}
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full glass-strong text-neon-cyan md:h-10 md:w-10">
                  <Briefcase size={16} />
                </span>

                <div className="rounded-2xl glass p-6 transition-colors hover:border-neon-cyan/20 sm:p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-xl font-semibold text-ink-100">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-neon-cyan">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-300">
                    {job.company} · {job.location}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-sm leading-relaxed text-ink-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
