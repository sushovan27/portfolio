# Design System — Kinetic Cyber-Editorial

## 1. Design intent

Build a personal portfolio that combines cinematic editorial composition with precise robotics/HUD-inspired interface details. It should feel like an individual developer's digital workspace, not a generic SaaS landing page, a game character sheet, or a collection of generated cards.

Primary character:
- Monochrome, material, architectural, editorial.
- Quietly futuristic rather than neon cyberpunk.
- One memorable cybernetic centerpiece.
- Strong type hierarchy, deliberate negative space, fine technical annotations.
- Amber is a rare interaction/status accent, not a background color.
- Actual projects and honest technical details are the substance of the site.

## 2. Color tokens

Use CSS variables; centralize tokens in the project's global stylesheet.

```css
:root {
  --surface: #F3F2EF;
  --surface-paper: #FAF9F6;
  --surface-card: #FFFFFF;
  --surface-container: #EFEEEB;
  --surface-dark: #111317;
  --surface-dark-elevated: #1A1C21;

  --text-primary: #17181B;
  --text-on-dark: #F4F3F0;
  --text-muted: #777A80;
  --text-on-dark-muted: #A8A9AE;

  --border-subtle: #D5D6D7;
  --border-strong: #B8B9BC;
  --border-dark: #282B32;

  --accent-amber: #FF793D;
  --accent-amber-soft: rgba(255, 121, 61, 0.12);
  --focus-ring: #C84D1D;

  --shadow-soft: 0 18px 48px rgba(20, 22, 26, 0.08);
  --shadow-object: 0 28px 80px rgba(15, 18, 24, 0.18);
}
```

Rules:
- Main canvas stays warm off-white.
- Main text uses near-black, never pure gray for essential body copy.
- Use dark surfaces to make project previews and the ending contact section feel substantial.
- Orange highlights selected, active, or important elements only.
- Don't use decorative gradients as a substitute for composition.
- Check contrast on muted labels and fine borders.

## 3. Typography

Suggested web fonts:
- Display/headings: Space Grotesk (600–700).
- Body: Inter (400–500).
- Technical metadata: IBM Plex Mono or JetBrains Mono (400–500).
- Optional editorial accent: Newsreader Italic, used sparingly.

Responsive scale:
- Display desktop: `clamp(4rem, 9.5vw, 8.5rem)`, tight line height.
- Display mobile: `clamp(3.25rem, 14vw, 4.75rem)`.
- H1 section: `clamp(2.5rem, 5vw, 4.5rem)`.
- H2: `clamp(1.75rem, 3vw, 2.5rem)`.
- Body large: 1.125rem / 1.75.
- Body: 1rem / 1.6.
- Small description: 0.875rem / 1.5.
- Technical label: 0.6875rem–0.75rem, uppercase, modest tracking.

Never make important mobile text tiny simply to keep desktop-like labels in place.

## 4. Spacing, layout, and shape

- Use a consistent 4px base spacing scale.
- Desktop content max width: around 1440px.
- Desktop side gutters: 48–80px depending on viewport.
- Mobile side gutters: 20–24px.
- Section spacing: spacious and varied; don't force every section into equal-height blocks.
- Most structural corners: 4–12px. Reserve pill shapes for status indicators or small chips.
- Use fine border lines and selective shadows, not a border around everything.
- Let selected visuals crop beyond their frames, but never crop core content or text.

## 5. Hero composition

The hero is the signature composition and should be designed first.

Layer order:
1. Quiet background with optional very faint calibration/grid marks.
2. Large robot/cybernetic sculpture image or a real optimized 3D object.
3. Oversized `Sushovan Halder.` typography.
4. Intro statement and two primary actions.
5. Three or four floating focus labels.
6. Compact telemetry/focus panel.
7. Header/navigation above all.

Composition principles:
- One dominant visual anchor, not several equal competing widgets.
- Avoid making the centerpiece look like a thumbnail in a card.
- Keep all annotations useful and connected to actual sections/projects.
- No fake uptime, CPU telemetry, skill percentages, or fictional online indicators.
- Do not copy DC/Joker characters or other reference intellectual property.
- If the visual is a flat image, don't call it real-time 3D. Use pointer-responsive parallax as a progressive enhancement.

Hero copy:
- Eyebrow: `CSE STUDENT · BUILDER · RKMGEC`
- Name: `Sushovan` / `Halder.`
- Primary statement: `I build, break down, and improve ideas through code.`
- Supporting line: `Exploring web engineering, systems, automation, and thoughtful interactive experiences.`
- Primary action: `EXPLORE PROJECTS`
- Secondary action: `GET IN TOUCH`

## 6. Navigation

- Minimal floating navbar.
- `SH` monogram and wordmark.
- Sections: Work, Toolkit, About, Contact.
- Use smooth scrolling only when it doesn't interfere with keyboard operation.
- Current section state may update as scrolling occurs.
- Mobile navigation must be touch-friendly and keyboard accessible.
- Avoid fake availability statuses. If included, make it an editable content field, not a hard-coded live assertion.

## 7. Project showcase

Avoid four identical cards. Create a curated editorial case-study composition with varied image ratios, generous spacing, and project-specific visual language.

Initial project candidates should be driven from data:
- HiveTrace: honey traceability and apiary management workflow; deployed on Vercel with consumer QR verification.
- `Jyotirveda-Gurukulam-Platform`: full-stack educational web application with modular curriculum navigation; deployed on Vercel.
- `e2ee-messaging`: end-to-end encrypted messaging project with forward secrecy and AES-256-GCM.
- `stegdetector`: image steganography detection tool with LSB bit-plane analysis and Shannon entropy.
- `CLI-Calculator-with-expression-parsing`: dependency-free C arithmetic expression parser and interactive REPL.
- Note: `akatsukiOS` is unfinished and not working; it is strictly excluded from all portfolio views.

Every project record must include:
- Name.
- Slug.
- Description (verified and concise).
- Category.
- Status (`active`, `prototype`, `learning`, `archived`, `deployed`, or `unknown`).
- Technology list, verified from repository or owner input.
- Repository URL.
- Live-demo URL if it exists.
- Preview image or intentional designed mockup.
- Evidence/verification note for content editing.

Never invent demos or feature claims. If details are unclear, use “Experiment exploring…” rather than stating a feature as complete.

## 8. Toolkit / skills section

Show categories with relationships to projects rather than percentages:
- Web engineering.
- Programming and tooling.
- Systems and Linux.
- Automation and AI workflows.
- Security learning.

Use a clickable category list/map. On select, show:
- A short explanation of how the capability is being explored.
- Verified projects using it.
- Technologies associated with it.
- Learning/practice status when appropriate.

No 73%, 92%, expert bars, radar charts, or made-up years of experience.

## 9. About and timeline

The About section should be editorial, direct, and human. Avoid biography cards.

Include:
- Short truthful biography.
- CSE student at RKMGEC.
- Learning/building approach.
- Optional milestone timeline with editable dates.
- Link to both GitHub accounts.

Leave dates, semester, expected graduation, and accomplishments empty until confirmed.

## 10. Motion language

Motion should make relationships clearer:
- Pointer: subtle parallax/tilt on the centerpiece or layered composition.
- Scroll: section reveals and moderate positioning changes; do not hijack scroll.
- Active focus labels: update an explanatory panel and related project preview.
- Projects: selected item crossfades/switches content with stable layout geometry.
- Links/buttons: small movement or color transition.
- Section changes: gentle opacity/transform, not theatrical full-screen transitions.

Use CSS transitions or one appropriate motion library. Avoid introducing multiple animation systems without need.

Required:
- `prefers-reduced-motion` support.
- No animation required to read or access content.
- No forced cursor.
- No endless high-amplitude motion.
- Avoid continuous layout recalculation from pointer handlers.
- Respect touch devices where hover doesn't exist.

## 11. Mobile direction

Do not just shrink the desktop.
- Place identity and primary CTA early.
- Scale/crop centerpiece intentionally.
- Show no more than two floating annotations in the first viewport.
- Convert technical panel into a compact selector or a section below the hero.
- Make project previews swipeable only if keyboard/touch behavior is complete; otherwise use a vertical editorial list.
- Maintain 20–24px side padding and readable font sizes.
- Keep contact actions visible and usable.
- Test 390px width and narrow 360px screens.

## 12. Accessibility and performance

- Semantic headings and landmarks.
- Keyboard-operable project selection and menus.
- Visible focus indicators.
- Accessible button names.
- Alt text for meaningful assets; decorative SVGs hidden from screen readers.
- AA contrast for normal body text where practical.
- No color-only statuses.
- Avoid forcing users to wait through intros.
- Lazy-load below-the-fold imagery.
- Prefer compressed WebP/AVIF imagery and responsive sizes.
- If using 3D, dynamically load it with a static image fallback.
- Limit 3D on smaller devices and honor reduced motion.
- Do not use unbounded particle effects or heavy video backgrounds by default.

## 13. Quality bar

A successful result feels like a carefully art-directed digital workspace: cinematic hero, readable information, project-specific storytelling, interactive but purposeful details, and a clear route to the work.

Reject: generic gradient blobs, arbitrary charts, fake terminal logs, bogus metrics, rows of random skill badges, decorative code fragments everywhere, overcrowded HUD overlays, and a site that looks more impressive in a screenshot than it feels to use.
