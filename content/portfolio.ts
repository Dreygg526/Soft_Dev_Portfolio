/* ============================================================================
 *  👋  ROAN — THIS IS YOUR ONE EDIT FILE
 * ----------------------------------------------------------------------------
 *  Everything on the website (text, links, projects, skills) is pulled from
 *  this file. To change wording, edit the strings below. To swap a photo,
 *  read the "📸 PHOTO / ASSET GUIDE" comments — they tell you the exact file
 *  name, folder, and recommended image size for each slot.
 *
 *  📁 WHERE PHOTOS GO:  put every image inside the  /public  folder.
 *     A path like  "/images/headshot.jpg"  means the file lives at
 *     /public/images/headshot.jpg  in this project.
 *
 *  If a photo file is missing, the site still works — it shows a labeled
 *  placeholder box telling you what to drop in. Nothing breaks.
 * ==========================================================================*/

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/* ---------------------------------------------------------------------------
 * 1) IDENTITY  — top of the page + browser tab
 * ------------------------------------------------------------------------- */
export const profile = {
  name: "Roan Andrei D. Uson",
  // Short role shown under your name in the hero. Keep it punchy.
  role: "Full-Stack & AI Developer",
  // One-line tagline in the hero.
  tagline:
    "Computer Engineer building production web apps with AI baked in.",
  // Longer hero sub-paragraph (1–2 sentences).
  heroBlurb:
    "I design, build, and ship full-stack internal tools end-to-end — Next.js, TypeScript, and Supabase on the front, Claude & Gemini APIs doing the smart part.",
  location: "San Pedro, Laguna, Philippines",
  email: "andreiuson526@gmail.com",
  phone: "+63 930 516 1213",

  /* 📸 PHOTO / ASSET GUIDE — HEADSHOT
   * File to add:  /public/images/headshot.jpg   (or .png/.webp)
   * Recommended:  square, at least 600 × 600 px, well-lit, head & shoulders.
   * Used in:      About section portrait.
   * Leave as-is to show a labeled placeholder until you add the file. */
  headshot: "/images/headshot.png",

  /* 📄 RESUME/CV download button — points to your Technical CV.
   * File lives at:  /public/Roan-Uson-CV.docx
   * To swap in a PDF later, drop /public/Roan-Uson-CV.pdf and change this to
   * "/Roan-Uson-CV.pdf". Set to ""  (empty) to hide the “Download CV” button. */
  resumePdf: "/Roan-Uson-CV.docx",
};

/* ---------------------------------------------------------------------------
 * 2) SOCIAL / CONTACT LINKS  — hero + footer
 * ------------------------------------------------------------------------- */
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Dreygg526",
    handle: "github.com/Dreygg526",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roan-andrei-uson",
    handle: "linkedin.com/in/roan-andrei-uson",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/roanandrei.uson",
    handle: "facebook.com/roanandrei.uson",
  },
  {
    label: "Email",
    href: "mailto:andreiuson526@gmail.com",
    handle: "andreiuson526@gmail.com",
  },
];

/* ---------------------------------------------------------------------------
 * 3) ABOUT  — short bio paragraphs (each string is its own paragraph)
 * ------------------------------------------------------------------------- */
export const about = {
  paragraphs: [
    "I'm a Computer Engineering graduate from the Polytechnic University of the Philippines who likes turning messy, manual workflows into clean software.",
    "At The Standard Lab I build internal tools from scratch — full-stack apps that a whole team relies on daily — and wire them up to AI so they do more than store data: they think, draft, and analyze.",
    "My background spans web development, IT support, and computer/network fundamentals, so I'm just as comfortable debugging a production deploy as I am explaining it to a non-technical teammate.",
  ],
  // Quick facts shown as chips next to the bio. Edit freely.
  facts: [
    "BS Computer Engineering — PUP",
    "Based in Laguna, PH • open to remote",
    "Claude & Gemini API integrations",
  ],
};

/* ---------------------------------------------------------------------------
 * 4) EXPERIENCE  — work history (newest first)
 * ------------------------------------------------------------------------- */
export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "Software Engineer / Internal Tools Developer",
    company: "The Standard Lab",
    location: "Remote",
    period: "Jan 2026 — Present",
    bullets: [
      "Designed, built, and deployed a full-stack internal creative-operations dashboard that runs the team's entire ad-production pipeline from concept to performance — replacing scattered spreadsheets and chat threads.",
      "Developed the app end-to-end with Next.js, TypeScript, and Supabase (PostgreSQL): a stage-gated workflow, role-based permissions, autosave, and real-time data.",
      "Built an AI copywriting feature that analyzes competitor ads (text, image, URL, and video) via the Claude and Gemini APIs and generates tailored ad copy.",
      "Deployed and maintained the app in production on Vercel — environment configuration, authentication, and database setup.",
    ],
  },
  {
    role: "Member Services Specialist / IT Support",
    company: "Social Security System (SSS)",
    location: "Philippines",
    period: "Jul 2023 — Apr 2024",
    bullets: [
      "Delivered technical training for employees on software troubleshooting and navigation to resolve common client issues.",
      "Implemented a streamlined online system that improved client accessibility and reduced processing time by 30%.",
      "Provided technical support and diagnostics, resolving system errors to keep the user experience seamless.",
      "Ran daily appointment and queue-management scheduling to optimize foot traffic and cut wait times during peak hours.",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * 5) PROJECTS  — the showcase cards (3D tilt)
 *
 * 📸 PHOTO / ASSET GUIDE — PROJECT SCREENSHOTS
 *   For each project add a screenshot to:  /public/images/projects/<image>
 *   Recommended:  16:9 ratio, 1200 × 675 px, PNG or WebP. A clean shot of
 *                 the app's main screen works best.
 *   The `image` field below is the file name to create.
 *   Missing file => a labeled placeholder appears in that card.
 * ------------------------------------------------------------------------- */
export type Project = {
  name: string;
  blurb: string;
  bullets: string[];
  tags: string[];
  liveUrl: string; // set "" to hide the live-demo button
  repoUrl: string; // set "" to hide the GitHub button
  image: string; // /public/images/projects/<file>
  accent: "cyan" | "violet" | "magenta" | "blue";
};

export const projects: Project[] = [
  {
    name: "Creative Operations Dashboard",
    blurb:
      "A full-stack internal tool that runs a creative team's entire ad-production workflow — concept → launch → performance — in one auto-populating dashboard.",
    bullets: [
      "Stage-gated pipeline with role-based access and a submit / approve / revision flow that routes tasks to the right person automatically.",
      "AI copywriting on the Claude & Gemini APIs, analyzing competitor ads (text, image, URL, video) to generate tailored copy.",
      "Shipped to production on Vercel with Supabase auth and secure server-side API routes.",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Claude API", "Gemini API", "Vercel"],
    liveUrl: "https://revise-creative-dashboard.vercel.app/",
    repoUrl: "", // 👉 add your GitHub repo URL if public, else leave ""
    image: "/images/projects/creative-dashboard.png",
    accent: "cyan",
  },
  {
    name: "TearDown",
    blurb:
      "An invite-only tool that finds winning native ads, breaks down why they work, and rebuilds them into on-brand ads for the team's own product and audience.",
    bullets: [
      "Integrated the Atria API to pull live ads from the Meta Ad Library and surface top performers — hunting real winners instead of guessing.",
      "AI rebuild engine on the Claude & Gemini APIs that reworks a winning ad's image, headline, and copy against brand, audience, and mechanism research.",
      "Deployed on Vercel with Supabase auth and admin-controlled invites to keep access restricted to the team.",
    ],
    tags: ["Next.js", "TypeScript", "Atria API", "Claude API", "Gemini API", "Supabase"],
    liveUrl: "https://teardown.vercel.app/",
    repoUrl: "",
    image: "/images/projects/teardown.png",
    accent: "violet",
  },
  /* ➕ ADD MORE PROJECTS: copy a block above, paste it here, and edit.
   * Give each a different `accent` ("cyan" | "violet" | "magenta" | "blue"). */
];

/* ---------------------------------------------------------------------------
 * 6) SKILLS  — grouped. Add/remove freely.
 * ------------------------------------------------------------------------- */
export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: "Full-Stack Development",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS"],
  },
  {
    category: "Backend & Databases",
    items: ["SQL", "PostgreSQL", "Supabase", "REST APIs"],
  },
  {
    category: "AI Tools",
    items: ["Claude (incl. Claude Code)", "Gemini", "Higgsfield", "Google Veo", "Grok", "Kling", "n8n"],
  },
  {
    category: "Cloud & Deployment",
    items: ["Vercel", "Git / GitHub", "Environment config"],
  },
  {
    category: "Programming Languages",
    items: ["Python", "Java", "C#"],
  },
  {
    category: "Other Technical",
    items: ["Arduino / Microcontrollers", "Cisco & Networking", "Technical Writing", "Data Entry"],
  },
];

/* ---------------------------------------------------------------------------
 * 7) CERTIFICATES
 * ------------------------------------------------------------------------- */
export type Certificate = { name: string; issuer: string; date: string };

export const certificates: Certificate[] = [
  { name: "Cyber Threat Monitoring Level I", issuer: "TESDA", date: "Jun 2026" },
  { name: "NSE 1, 2, 3 Cybersecurity", issuer: "Fortinet", date: "Jun 2026" },
  { name: "Cyber Tools for ICpEP", issuer: "DICT", date: "May 2025" },
  { name: "Basic Web Development Workshop", issuer: "ZUIT Coding Bootcamp", date: "Apr 2025" },
  { name: "Infrastructure Server, Network & Software Dev", issuer: "Toshiba", date: "Dec 2022" },
];

/* ---------------------------------------------------------------------------
 * 8) EDUCATION
 * ------------------------------------------------------------------------- */
export const education = {
  degree: "Bachelor of Science in Computer Engineering",
  school: "Polytechnic University of the Philippines",
  period: "Graduated May 2026",
};

/* ---------------------------------------------------------------------------
 * 9) SEO / METADATA  — browser tab + link previews
 * ------------------------------------------------------------------------- */
export const seo = {
  title: "Roan Andrei D. Uson — Full-Stack & AI Developer",
  description:
    "Portfolio of Roan Andrei D. Uson — Computer Engineer and Full-Stack / AI Developer building production web apps with Next.js, TypeScript, Supabase, and the Claude & Gemini APIs.",
  /* 📸 OPTIONAL — SOCIAL SHARE IMAGE (the preview when you paste your link)
   * File to add:  /public/images/og-image.png   at 1200 × 630 px. */
  ogImage: "/images/og-image.png",
};
