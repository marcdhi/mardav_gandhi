# mardav.

Personal site and portfolio. Next.js 16, React 19, Tailwind v4, Motion, React Three Fiber.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Before deploying

One file is missing on purpose: **drop your CV at `public/resume.pdf`**. The hero
button, the footer and the command menu all point at `/resume.pdf`, and it will
404 until that file exists.

## How it is put together

```
content/writing/         markdown posts, the only place you edit to publish
src/content/             profile, work, projects, hackathons (plain TS, no CMS)
src/lib/mark.ts          the brand mark geometry, shared by the SVG and the 3D object
src/components/site/     nav, command menu, footer, section shell, reveal helpers
src/components/sections/ hero, work, projects, hackathons, writing
src/components/three/    the extruded 3D mark, desktop only
src/app/globals.css      every design token lives at the top of this file
```

### Editing content

All content is typed data in `src/content`. Add a job to `work.ts`, a project to
`projects.ts`, an event to `hackathons.ts` and it renders. Counters in the hero
and in the hackathons section are derived from those arrays, so they cannot drift.

### Publishing a post

Copy `content/writing/_template.mdx`, rename it, write. The filename becomes the
URL: `retro-on-sadak.mdx` lands at `/writing/retro-on-sadak`.

```yaml
---
title: Retro on Sadak
summary: What a 3D language game taught me about latency.
date: 2026-08-04
tags: [games, speech]
draft: false
---
```

Only `title` is required. `draft: true` keeps a post visible in `npm run dev` and
out of the deployed build. Files starting with `_` are ignored entirely.

### Theming

Everything visual routes through CSS custom properties at the top of
`src/app/globals.css`: surfaces, ink, hairlines, accent. Light values sit in
`:root`, dark values in `:root[data-theme="dark"]`. Change those two blocks and
the whole site, including the 3D mark, follows. Nothing else hardcodes a colour.

### The mark

`src/lib/mark.ts` generates one shape: an eight tip spark, four long arms and
four short. The SVG logo, the favicon and the extruded 3D object in the hero all
read from the same numbers, so they can never disagree.

At hero size it has a face and some behaviour:

| it does this            | when                                    |
| ----------------------- | --------------------------------------- |
| follows the cursor      | you move the mouse anywhere on the page |
| blinks, sometimes twice | every few seconds, at random            |
| goes wide eyed and hops | you click it                            |
| screws its eyes shut    | you drag it fast enough to spin         |
| settles back to face you| a spin runs out                         |
| droops and slows down   | six seconds with no interaction         |

The logo, favicon and section bullets stay faceless. Identity at 16px is the
silhouette; personality only shows up when the thing is big enough to have one.
`MarkFace` is the flat version, blinking in CSS, used on mobile and under
`prefers-reduced-motion`.

### Performance notes

The 3D hero only mounts on screens at least 1024px wide with a fine pointer, and
never when `prefers-reduced-motion` is set. Everywhere else renders the flat SVG
mark instead, so mobile ships no Three.js at all. Every scroll animation checks
the same reduced motion preference.

### Keyboard

`Cmd K` or `Ctrl K` opens the command menu. On mobile the same menu is the
navigation, behind the `menu` button.
