import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { profile, socials } from "@/content/portfolio";

const iconFor = (label: string) => {
  if (label === "GitHub") return Github;
  if (label === "LinkedIn") return Linkedin;
  return Mail;
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad mx-auto w-full max-w-6xl scroll-mt-24 py-20 sm:py-28"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-base-700 to-base-800 p-8 text-center sm:p-14">
          {/* ambient glow blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-neon-cyan/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-neon-violet/20 blur-[80px]" />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
              06 — Let&apos;s talk
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-ink-100 sm:text-5xl">
              Have a project or a role in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-300">
              I&apos;m open to full-stack and AI-focused opportunities. The
              fastest way to reach me is email — I usually reply within a day.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3.5 text-sm font-semibold text-base-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Mail size={17} />
                {profile.email}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}
