---
description: Elevate the visual design — enhance animations, color palette, micro-interactions, and Tailwind/CSS effects to make the portfolio visually unforgettable.
---

Read `src/App.tsx` and `src/index.css` fully.

Identify and implement visual enhancements that make this portfolio stand out from generic dark-theme portfolios:

### Priority Visual Upgrades

**1. Hero Section Depth**
- Add a terminal-style typewriter effect to the sub-headline using CSS animation (add to `index.css`)
- Add a subtle scanline or noise texture overlay to reinforce the cyber/DevOps aesthetic
- Make floating Settings icons more intentional — vary sizes (w-4 to w-12), use different DevOps icons (GitBranch, Docker, Cloud, Terminal) at different opacities

**2. Skill Cards Glow System**
- Add a colored top-border accent per skill category (e.g., Cloud = cyan, CI/CD = purple, Testing = green)
- On hover: reveal a glowing border using `box-shadow` animation, not just opacity changes
- Add a subtle background gradient shift on hover per card

**3. Section Transitions**
- Add `before:` pseudo-element decorative lines or dots between sections using Tailwind arbitrary values
- Add a scroll-reveal fade-in animation class in `index.css` and apply it to all major section headings

**4. Gradient Refinement**
- Audit the `gradient-text` class — enhance with a 3-stop gradient (e.g., `#60a5fa → #a78bfa → #60a5fa`)  for a more premium feel
- Add `background-size: 200%` + `animation: gradient-shift 4s ease infinite` for animated gradient text

**5. Nav Active State**
- Enhance the active nav link beyond just `text-blue-400` — add an animated underline using `after:` pseudo-element

**6. Contact Section**
- Add a subtle grid dot background (different from the cyber-grid) behind the contact form for visual separation

Apply all changes to `src/App.tsx` and `src/index.css`. Preserve all existing functionality. Use only Tailwind classes and vanilla CSS — no new dependencies.

$ARGUMENTS
