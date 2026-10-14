# Agent Instructions — Portfolio Repository

These instructions apply to coding agents working on Sushovan Halder's portfolio.

## First steps

1. Inspect the repository tree and package scripts before making changes.
2. Read `ABOUT_ME.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CONTENT_GUIDE.md`, and `IMPLEMENTATION_PLAN.md`.
3. Inspect the supplied Google Stitch export if present. Treat it as a visual reference, not unquestionable production code.
4. Identify the framework and preserve existing working configuration unless there is a concrete reason to change it.
5. Before implementing, state a short plan and list any assumptions that could change the architecture.

## Identity and truthfulness

- The owner is **Sushovan Halder**, a **CSE student at RKMGEC**.
- Link the two GitHub accounts accurately: `https://github.com/sushovanbuilds` and `https://github.com/sushovan27`.
- Do not mix the identities of the two accounts or silently assume all repositories belong in one portfolio list.
- Never invent employment, degree completion, GPA, awards, certifications, clients, project usage, production readiness, metrics, or dates.
- Project descriptions must be based on inspected repositories or owner-provided text.
- When facts are unknown, mark them as TODOs in content data rather than fabricate details.
- Avoid calling the owner an expert, professional engineer, or cybersecurity specialist without explicit evidence.
- Use the truthful framing “student developer” / “CSE student” by default.
- Completely exclude AkatsukiOS: it is unfinished and not working, and must not appear anywhere on the portfolio.

## Implementation expectations

- Build a usable portfolio, not just a static screenshot.
- Keep content separated from layout in typed data files where the framework allows.
- Prefer reusable components for navigation, focus selector, project previews, skill categories, case-study sections, and contact controls.
- Make all controls functional; do not leave fake buttons.
- Use semantic HTML, keyboard-accessible interactions, visible focus states, and reduced-motion support.
- Keep the hero’s visual centerpiece performant. If a real 3D asset is absent, use a good static fallback with restrained CSS parallax; never represent a still image as real-time 3D.
- Don't add dependencies unless they deliver a clear benefit.
- Don't rewrite the entire project or replace its framework without a reason.
- Keep route and component structure straightforward.
- Do not hard-code dynamic GitHub stats or invent “online now” labels.

## Workflow

1. Audit current project and identify existing framework / implementation constraints.
2. Summarize audit findings.
3. Implement the visual foundation (tokens, typography, layout).
4. Implement hero and navigation.
5. Implement project data and case studies.
6. Implement toolkit/project relationships.
7. Implement about, current focus, and contact.
8. Add responsive, accessibility, motion, and performance improvements.
9. Run the existing lint, typecheck, test, and production build scripts that are available.
10. Fix introduced issues and provide a concise summary, changed-file list, verification results, and remaining TODOs.

## Quality gates

- [ ] At 1440px the hero has a clear focal point and balanced text/visual hierarchy.
- [ ] At 390px the layout is intentional and has no horizontal overflow.
- [ ] All links lead somewhere valid.
- [ ] All buttons and interactive labels do something useful.
- [ ] Project facts are verified or explicitly marked as unconfirmed.
- [ ] No skill percentage bars or fake achievement metrics.
- [ ] Keyboard navigation works.
- [ ] Reduced-motion preferences are respected.
- [ ] A static fallback exists for unavailable/heavy 3D.
- [ ] Build/lint/typecheck has been run when scripts are available.

## Git practice

- Avoid destructive git operations.
- Do not overwrite environment secrets or `.env` values.
- Do not commit access tokens, API keys, private contact details, or build artifacts.
- Prefer focused commits with clear messages if asked to commit.
