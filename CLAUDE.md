# CLAUDE.md

Guidance for Claude Code (and any dev) working in this repository.

## Project

Personal portfolio for **Roan Andrei D. Uson** — a 3D, interactive, dark/neon
single-page site. Positioned as a **Software Engineer & Internal Tools
Developer** with a Computer Engineering foundation (previously framed as
"Full-Stack & AI Developer" — the role/copy was rebranded but the underlying
full-stack + AI story is unchanged).

Section order (top → bottom): Hero → **Projects** → Experience → Skills →
**About** → Credentials → Contact → Footer. Eyebrow numbers and the Navbar
links follow this order — keep all three in sync if you reorder.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **TSX**
- **React Three Fiber** (`@react-three/fiber` + `drei`) — the interactive 3D hero
- **Framer Motion** — animations, scroll effects, the WELCOME intro
- **Tailwind CSS v3** (config in `tailwind.config.ts`, tokens for the neon theme)
- **lucide-react** — UI icons (brand logos are hand-authored in `BrandLogos.tsx`)

## Commands

```bash
npm install     # install deps
npm run dev     # dev server (http://localhost:3000)
npm run build   # production build (also typechecks)
npm run start   # serve the production build
```

## Structure

```
content/portfolio.ts     ← SINGLE SOURCE OF CONTENT (text + image paths). Edit here.
app/
  layout.tsx             ← fonts (Inter / Space Grotesk / JetBrains Mono), SEO metadata
  page.tsx               ← composes all sections in order
  globals.css            ← theme, glass utilities, neon text, reduced-motion
components/
  WelcomeGate.tsx        ← intro splash: "press any key" (desktop) / "swipe up" (mobile), slides up
  SiteBackground.tsx     ← ambient drifting blobs + faint grid (behind everything, -z-10)
  ScrollProgress.tsx     ← top gradient scroll-progress bar
  Navbar.tsx             ← scrollspy (active-section pill via IntersectionObserver)
  Hero.tsx               ← hero copy + CTAs; renders HeroCanvas
  HeroCanvas.tsx         ← guards/loads the 3D scene; reduced-motion fallback
  three/HeroScene.tsx    ← the WebGL scene: auto-rotate + sway toward cursor/swipe
  ProjectCard.tsx        ← 3D-tilt project card
  SmartImage.tsx         ← shows a labeled placeholder when a photo file is missing
  BrandLogos.tsx         ← GitHub / LinkedIn / Facebook / Email SVG logos
  About / Experience / Projects / Skills / Credentials / Contact / Footer
public/images/           ← photos (headshot, project screenshots, og-image)
public/Roan-Uson-CV.docx ← CV wired to the "Download CV" button
```

## Conventions

- **All copy and asset paths live in `content/portfolio.ts`.** Change wording and
  swap photos there — don't hardcode content inside components.
- Interactive/3D/animation components are client components (`"use client"`).
- Everything respects `prefers-reduced-motion` — keep it that way when adding motion.
- Neon theme uses semantic tokens (`base-*`, `ink-*`, `neon-*`) from the Tailwind
  config. Use tokens, not raw hex, in components.
- No emojis as icons — use lucide or the SVG brand logos.
- **Prose copy avoids hyphens/em-dashes** (owner preference). Body paragraphs
  (About bio, hero blurb) are justified with `text-justify hyphens-none` so words
  never break with a hyphen, especially on mobile. Keep new copy hyphen-free.

---

## 🔒 Internal notes (for future sessions — not user-facing docs)

- **Deployment: LIVE on Vercel** at `https://soft-dev-portfolio.vercel.app`.
  (The old "hold off on Vercel" note is superseded — the owner has since deployed.)
  Vercel auto-deploys from `main`, so pushing to GitHub ships to production.
- **GitHub:** repo is `Dreygg526/Soft_Dev_Portfolio` (public). Owner account: `Dreygg526`.
- **Dev-server gotcha:** zombie `next` processes have repeatedly stuck on port 3000,
  causing an *unstyled* page (browser hits the dead server; new server silently moves
  to 3001). If the site looks unstyled: kill the process on 3000
  (`netstat -ano | grep :3000` → `taskkill //PID <pid> //F`), restart `npm run dev`,
  hard-refresh (Ctrl+Shift+R). The code/CSS is fine — this is always a stale process.
- **Headshot:** current `public/images/headshot.png` is a casual mirror selfie the
  owner chose (cropped from `Headshotpt2.jpg`). A more formal studio headshot also
  exists in their Downloads (`headshot.png`) if they ever want to switch back.
- **CV:** download button points to the Technical CV as `.docx` (no PDF of the
  technical version exists; a non-technical PDF is in their Documents). No LibreOffice
  installed locally for docx→pdf conversion.
- **3D interaction:** the core auto-rotates and *sways toward the cursor/swipe* (this
  replaced the old drag-to-orbit). Sway intensity lives in `three/HeroScene.tsx`.
- **Preview artifact:** a shareable annotated design preview exists on claude.ai —
  regenerate/update it after visual changes if the owner wants an updated look.
- **Mobile fixes (do not regress):**
  - `Navbar.tsx` has a masked/blurred **top scrim** behind the floating pill that
    fades in on scroll — without it, page content peeks through the transparent
    gap above/around the pill on mobile.
  - `Contact.tsx` contact-links grid uses `grid-cols-1 sm:grid-cols-2`. The
    explicit `grid-cols-1` is required: a bare `grid` makes a single *auto* track
    that grows to the long handles, so `truncate` fails and cards overflow the
    screen. Keep `grid-cols-1`.
  - `WelcomeGate.tsx`: on touch devices a **tap must not dismiss** the gate —
    only a deliberate swipe up (`onClick` is gated behind `!isTouch`). The body
    scroll lock is held through the **entire exit animation** and released only
    in `AnimatePresence` `onExitComplete` (which also `scrollTo(0,0)`); the
    overlay has `touch-none`. This stops a swipe's momentum from flinging the
    page down and skipping past the hero. Don't move the unlock back to the
    `open` state.
