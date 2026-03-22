---
description: Expand the projects section with compelling technical storytelling — problem, solution, stack, and measurable outcome for each project.
---

Read the projects section in `src/App.tsx` (search for `id="projects"`).

For each project card, rewrite or expand to follow this structure:

### Project Card Template
```
Title: [Project Name] — sharp, memorable, tool-style name
Badge/Tag: [Primary tech] + [Domain]
Problem: One sentence — what was broken, slow, or missing?
Solution: Two sentences — what Ghassen built and how it works technically.
Outcome: One sentence with a metric — time saved, failures prevented, scale achieved.
Stack: Array of specific tools used
```

### Known Projects to Enhance

**Terminal Packager Tool**
- Sharpen: "Reduces packaging time from hours to under one minute" → add context (how many terminals? release frequency? team size unblocked?)
- Frame as: a platform engineering win, not just a script

**Docker Simulation Environment**
- Frame the problem: physical hardware dependency was a bottleneck to dev velocity
- Add: what the environment simulates (TPE protocol stack?), who uses it, how it changed team workflow

**TPE Automated Testing Infrastructure**
- Lead with the reliability story: what broke before? what's the test coverage now?
- Highlight the GitLab CI/CD pipeline design — stages, parallelism, artifact handling

### If Projects Section Doesn't Exist Yet
Create a well-designed projects section with glassmorphism cards, consistent with the existing design language, placed between Experience and Education.

Apply all changes directly to `src/App.tsx`. Preserve all JSX structure and classNames.

$ARGUMENTS
