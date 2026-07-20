"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

/* ============================================================================
 *  SmartImage
 *  Tries to load a real photo. If the file is missing (you haven't added it
 *  yet), it renders a clearly-labeled placeholder telling you exactly what
 *  to drop in and where. This is what makes the site "editable" — you always
 *  see which asset goes in which slot.
 * ==========================================================================*/

type SmartImageProps = {
  src: string;
  alt: string;
  /** What the user should put here, shown on the placeholder. */
  placeholderLabel: string;
  /** Recommended dimensions text, e.g. "1200 × 675px". */
  placeholderHint?: string;
  className?: string;
  rounded?: string;
};

export default function SmartImage({
  src,
  alt,
  placeholderLabel,
  placeholderHint,
  className = "",
  rounded = "rounded-2xl",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}
        border border-dashed border-neon-cyan/30 bg-base-700/60`}
        role="img"
        aria-label={`Placeholder: ${placeholderLabel}`}
      >
        {/* animated grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 flex max-w-[85%] flex-col items-center gap-2 p-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-cyan/10 text-neon-cyan">
            <ImageIcon size={18} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-neon-cyan">
            Add your photo
          </span>
          <span className="text-sm font-medium text-ink-100">
            {placeholderLabel}
          </span>
          {placeholderHint && (
            <span className="text-xs text-ink-500">{placeholderHint}</span>
          )}
          <span className="mt-1 rounded-md bg-base-900/70 px-2 py-1 font-mono text-[10px] text-ink-500">
            {src || "set path in content/portfolio.ts"}
          </span>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
      className={`${rounded} ${className} h-full w-full object-cover`}
    />
  );
}
