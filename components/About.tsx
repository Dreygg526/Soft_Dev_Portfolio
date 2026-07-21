import { MapPin, Mail, Phone } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { about, profile } from "@/content/portfolio";

export default function About() {
  return (
    <Section id="about" eyebrow="04 — Who I am" title="About me">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:gap-14">
        {/* Bio */}
        <Reveal className="order-2 md:order-1">
          <div className="space-y-5 text-base leading-relaxed text-ink-300 text-justify hyphens-none sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {about.facts.map((f) => (
              <span
                key={f}
                className="rounded-full glass px-3.5 py-1.5 font-mono text-xs text-ink-300"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-2.5 text-sm text-ink-300">
            <span className="inline-flex items-center gap-2.5">
              <MapPin size={16} className="text-neon-cyan" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-neon-cyan"
            >
              <Mail size={16} className="text-neon-cyan" />
              {profile.email}
            </a>
            <span className="inline-flex items-center gap-2.5">
              <Phone size={16} className="text-neon-cyan" />
              {profile.phone}
            </span>
          </div>
        </Reveal>

        {/* Portrait */}
        <Reveal delay={0.15} className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 blur-xl" />
            <SmartImage
              src={profile.headshot}
              alt={`Portrait of ${profile.name}`}
              placeholderLabel="Your headshot / portrait"
              placeholderHint="Square, 600 × 600px or larger"
              className="relative aspect-square w-full"
              rounded="rounded-3xl"
            />
            {/* corner accent */}
            <div className="absolute -bottom-3 -right-3 rounded-2xl glass-strong px-4 py-3">
              <p className="font-display text-lg font-bold neon-text">CpE</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
                Engineer
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
