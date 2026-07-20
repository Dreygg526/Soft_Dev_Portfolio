# Roan Andrei D. Uson — Portfolio

An interactive, 3D personal portfolio built with **Next.js (App Router)**,
**TypeScript**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.
Dark, cinematic, neon aesthetic with an interactive WebGL hero you can drag to
rotate, 3D-tilt project cards, and scroll-reveal animations.

---

## ✏️ How to edit everything (start here)

**All of your content lives in ONE file:**

```
content/portfolio.ts
```

Open it and edit the text between the quotes — your name, role, bio,
experience, projects, skills, certificates, education, and links. It's heavily
commented so you always know what each field does.

### 📸 How to add your photos

Photos go in the `public/` folder. Until you add a file, the site shows a
labeled placeholder box telling you exactly what to drop in — nothing breaks.

| What | Put the file at | Size |
|------|-----------------|------|
| Your headshot | `public/images/headshot.jpg` | Square, 600×600px+ |
| Creative Dashboard screenshot | `public/images/projects/creative-dashboard.png` | 16:9, 1200×675px |
| TearDown screenshot | `public/images/projects/teardown.png` | 16:9, 1200×675px |
| Social share preview (optional) | `public/images/og-image.png` | 1200×630px |
| CV PDF for the download button (optional) | `public/Roan-Uson-CV.pdf` | — |

If you name a file differently, just update its path in `content/portfolio.ts`.
See also `public/images/README-DROP-PHOTOS-HERE.txt`.

---

## 🖥️ Run it on your computer

```bash
npm install     # first time only
npm run dev     # start the dev server
```

Then open <http://localhost:3000>. Edits to `content/portfolio.ts` show up
instantly.

---

## 🚀 Deploy to Vercel

Your project is already Vercel-ready. Two ways:

### Option A — GitHub + Vercel dashboard (recommended)

1. Create a new repository on GitHub (e.g. `portfolio`).
2. In this folder, push the code:
   ```bash
   git add .
   git commit -m "My portfolio"
   git branch -M main
   git remote add origin https://github.com/Dreygg526/portfolio.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, sign in with GitHub, and **Import** the repo.
4. Vercel auto-detects Next.js — just click **Deploy**. Done.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # follow the prompts, accept defaults
vercel --prod   # publish to your live URL
```

### After deploying
In your Vercel project **Settings → Environment Variables**, add:

```
NEXT_PUBLIC_SITE_URL = https://your-portfolio.vercel.app
```

(so social link previews resolve correctly), then redeploy.

---

## 🗂️ Project structure

```
content/portfolio.ts     ← ALL your editable content + photo guide
app/
  layout.tsx             ← fonts, metadata/SEO
  page.tsx               ← assembles the sections in order
  globals.css            ← theme + neon styles
components/
  Hero.tsx               ← hero text + CTAs
  HeroCanvas.tsx         ← loads/guards the 3D scene (reduced-motion fallback)
  three/HeroScene.tsx    ← the interactive 3D WebGL scene
  ProjectCard.tsx        ← 3D-tilt project card
  SmartImage.tsx         ← shows a labeled placeholder if a photo is missing
  About / Experience / Projects / Skills / Credentials / Contact / Footer
public/images/           ← drop your photos here
```

---

## ♿ Built-in quality
- Responsive (mobile → desktop), no horizontal scroll.
- Respects `prefers-reduced-motion` (3D + animations calm down automatically).
- Keyboard-accessible nav, focus states, aria-labels on icon buttons.
- Lazy-loaded 3D bundle so the page loads fast.
```
