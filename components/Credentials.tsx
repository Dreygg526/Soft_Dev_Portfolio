import { GraduationCap, Award } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { certificates, education } from "@/content/portfolio";

export default function Credentials() {
  return (
    <Section
      id="credentials"
      eyebrow="05 — Education & credentials"
      title="Learning & certifications"
    >
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* Education card */}
        <Reveal>
          <div className="h-full rounded-2xl bg-gradient-to-br from-neon-violet/15 to-base-600 p-7 shadow-glow-violet">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl glass-strong text-neon-violet">
              <GraduationCap size={20} />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink-100">
              {education.degree}
            </h3>
            <p className="mt-2 text-sm text-ink-300">{education.school}</p>
            <p className="mt-3 font-mono text-xs text-neon-violet">
              {education.period}
            </p>
          </div>
        </Reveal>

        {/* Certificates list */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl glass p-2">
            <ul className="divide-y divide-white/[0.05]">
              {certificates.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                    <Award size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink-100">{c.name}</p>
                    <p className="text-sm text-ink-500">{c.issuer}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-ink-500">
                    {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
