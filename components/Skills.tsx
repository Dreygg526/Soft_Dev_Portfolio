import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/content/portfolio";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="04 — What I work with" title="Skills & tools">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-2xl glass p-6 transition-colors hover:border-neon-cyan/20">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-neon-cyan">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm text-ink-300 transition-colors hover:bg-white/[0.08] hover:text-ink-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
