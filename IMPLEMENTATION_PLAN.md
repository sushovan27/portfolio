# Implementation Plan & Acceptance Criteria

## Phase 0 — Audit

- Identify framework, package manager, scripts, existing routes, design tokens, and dependencies.
- Inspect Stitch desktop/mobile HTML and screenshots.
- Identify available assets and licensing/provenance.
- Check existing page behavior before changing anything.
- Produce a brief audit summary.

**Done when:** the agent knows what can be reused and has a low-risk implementation plan.

## Phase 1 — Foundation

- Create coherent tokens from `DESIGN.md`.
- Define fonts and responsive type scale.
- Establish global spacing/container rules.
- Add accessible focus styles and reduced-motion defaults.
- Set page metadata and semantic structure.

**Done when:** shared styles and layout work consistently across the page.

## Phase 2 — Hero and navigation

- Build responsive header/navigation.
- Add oversized identity copy and two meaningful CTAs.
- Integrate cybernetic artwork as the main focal point.
- Add restrained annotations and technical focus panel.
- Implement pointer parallax only as progressive enhancement.
- Add static fallback and reduced-motion behavior.

**Done when:** desktop hero is cohesive at 1440px and mobile at 390px.

## Phase 3 — Focus System

- Create focus categories: Web Engineering, AI & Automation, Systems & Linux, Security.
- Selecting one updates descriptive content and associated project preview.
- Ensure mouse, keyboard, and touch behavior.
- Provide meaningful default selection.

**Done when:** active state is visible, useful, and accessible.

## Phase 4 — Projects

- Inspect candidate public repositories.
- Curate 3–5 confirmed projects for the homepage.
- Build reusable featured-project and archive components.
- Use varied project-specific mockups or real screenshots.
- Add case-study routes or dialogs as appropriate.
- Ensure every link works and any unavailable detail is omitted.

**Done when:** each featured project is truthful, readable, and linked to a valid source.

## Phase 5 — Toolkit

- Group skills by domain.
- Show evidence links to relevant projects.
- Replace percentage indicators with status/relationship labels.
- Distinguish learning from demonstrated project use.

**Done when:** visitors can understand capabilities and see examples.

## Phase 6 — About and Contact

- Add concise biography and RKMGEC CSE education line.
- Add optional timeline only where dates are confirmed.
- Implement contact links or a real validated form.
- Add social links to both GitHub accounts.
- Ensure no fake availability status.

**Done when:** identity and contact actions are correct and functional.

## Phase 7 — QA

- Run lint, typecheck, tests, and production build if available.
- Inspect at 1440×900, 1024px, 768px, 390×844, and 360px.
- Verify no horizontal overflow.
- Verify keyboard navigation, focus indicators, contrast, semantic headings, and reduced motion.
- Test all links and forms.
- Check console for errors and image loading.
- Verify that 3D fallback works.

## Definition of done

- The visual system follows `DESIGN.md`.
- The site identifies Sushovan Halder as a CSE student at RKMGEC.
- Two GitHub profiles are clearly available.
- Project facts are accurate.
- All interactions are functional.
- No fabricated facts or metrics.
- Mobile layout is intentional.
- Build and checks are reported accurately.
