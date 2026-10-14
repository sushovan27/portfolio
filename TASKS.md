# Agent Task Queue

Use this as the initial task queue. Complete in order unless the owner changes priorities.

## P0 — Verify current project
- [x] Inspect existing repository and identify framework, scripts, and entry points.
- [x] Inspect Stitch desktop/mobile HTML and screenshots.
- [x] Copy relevant Stitch images/assets into `public/images/` (`public/images/cyber-bust.png`) with appropriate names.
- [x] Report architecture and asset findings before risky changes.

## P1 — Identity and content
- [x] Confirm public profile facts, email, and which social links should appear (Sushovan Halder, CSE student at RKMGEC).
- [x] Inspect each proposed public project repository (`HiveTrace`, `StegDetector`, `e2ee-messaging`, `Jyotirveda-Gurukulam-Platform`, `CLI Calculator`, etc.).
- [x] Replace unverified sample project descriptions/statuses/technologies with verified facts in `projects.json`.
- [x] Exclude unfinished and non-working projects (specifically AkatsukiOS) completely.
- [x] Keep private repositories (`kernel-log-blog`, `UrbanGrowth-Agency`) out of public content.

## P2 — Build the signature experience
- [x] Implement design tokens, CSS variables, typography, and grid patterns from `DESIGN.md`.
- [x] Implement responsive header with monogram, pill navigation, status beacon, and mobile drawer.
- [x] Implement hero section with oversized identity copy, primary CTAs, and selected project index rail.
- [x] Integrate high-res cybernetic sculpture bust with `.bust-blend` (`mix-blend-mode: multiply`), soft contact shadow, and accessible pointer parallax with reduced-motion support.
- [x] Add 4 interactive floating HUD nodes linked to live telemetry and project inspector.

## P3 — Tell project stories
- [x] Create project feature and archive layouts in `ProjectShowcase`.
- [x] Build project-specific previews (HiveTrace traceability timeline, StegDetector entropy forensics report, E2EE Messaging Diffie-Hellman handshake, Jyotirveda Gurukulam platform curriculum view).
- [x] Link capability map directly to actual project examples without fake percentages.

## P4 — Finish
- [x] About section with academic grounding, dual GitHub links (`sushovanbuilds` & `sushovan27`), and current technical explorations.
- [x] Obsidian contact section with email, GitHub links, and validated mailto dispatch form.
- [x] Responsive layout with mobile drawer and full keyboard accessibility.
- [x] Reduced motion and performance checks.
- [x] Typecheck (`pnpm run typecheck`) and production build (`pnpm run build`) passing with zero errors.
- [ ] Report completed work and remaining owner decisions.
