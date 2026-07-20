import { profile } from "@/content/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-pad border-t border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-ink-500 sm:flex-row">
        <p>
          © {year} {profile.name}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js · TypeScript · React Three Fiber
        </p>
      </div>
    </footer>
  );
}
