import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { logoFor } from "./BrandLogos";
import { profile, socials } from "@/content/portfolio";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad mx-auto w-full max-w-7xl scroll-mt-24 py-20 sm:py-28"
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
              I&apos;m open to software engineering and internal tools work, plus
              anything with AI in it. The fastest way to reach me is email, and I
              usually reply within a day.
            </p>

            {/* Contact links — each paired with its brand logo + handle */}
            <div className="mx-auto mt-9 grid grid-cols-1 max-w-2xl gap-3 sm:grid-cols-2">
              {socials.map((s) => {
                const Logo = logoFor(s.label);
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-2xl glass px-5 py-4 text-left transition-all hover:border-neon-cyan/30 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-ink-100 transition-colors group-hover:text-neon-cyan">
                      <Logo size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink-100">
                        {s.label}
                      </span>
                      <span className="block truncate font-mono text-xs text-ink-500">
                        {s.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-ink-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan"
                    />
                  </a>
                );
              })}
            </div>

            {/* Phone + location */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-sm text-ink-500">
              <span className="inline-flex items-center gap-2">
                <Phone size={14} className="text-neon-cyan" />
                <span className="text-ink-300">{profile.phone}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-neon-cyan" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
