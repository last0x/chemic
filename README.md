# Chemic Engineering — site rebuild (single page)

Next.js (App Router) + Tailwind CSS v4 + embla-carousel-react, with a small
set of hand-written shadcn-pattern primitives (`Button`, `Card`, `Carousel`)
in `src/components/ui`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production build.

> Note: this sandbox could not reach `fonts.googleapis.com` to fetch the
> Google Fonts used (Big Shoulders Display, Inter, IBM Plex Mono), so the
> build here was verified with system fonts as a stand-in. On a machine with
> normal internet access, `next/font/google` (already wired up in
> `src/app/layout.tsx`) will fetch and self-host them automatically — no
> action needed on your end.

## Structure

```
src/app/page.tsx            assembles the single page
src/components/site/        Header, Hero, ServicesTriad, RenderShowcase,
                             Projects, Contact, Footer, WhatsAppFloat
src/components/ui/          button.tsx, card.tsx, carousel.tsx (shadcn-pattern)
src/lib/utils.ts            cn() helper
public/render/factory-3d.html   the interactive 3D model, embedded via <iframe>
```

## What's real vs. placeholder

- **Real:** address, phone numbers, and email (pulled from the current
  chemic.com.sg site), the WhatsApp number you gave me, and the four project
  category names (Plating Line, Plating Auxiliary Equipment, Customized
  Process Tank, Industrial Equipment).
- **Placeholder:** all body copy, the hero headline, project images (styled
  divs, not real photos), and social links. Anything you'd want me to
  swap for final copy or real photography, just point it out.

## Design tokens

Defined as CSS variables in `src/app/globals.css` under `@theme inline`
(Tailwind v4's CSS-first config) — `primary` (blue), `secondary` (orange),
plus `build` / `maintain` / `reinstate` colors that tie the 3-column
services section back to the same green/yellow/blue used for the Build /
Maintain / Reinstate badges inside the 3D model's hover panel.

Fonts: **Big Shoulders Display** for headings (condensed, stenciled — reads
like factory/crate signage), **Inter** for body copy, **IBM Plex Mono** for
eyebrows and spec-style labels. A faint blueprint grid + corner-bracket frame
(`.bp-grid`, `.bp-corners` in globals.css) recur through the page as the one
signature device, tying back to the fact that this is, literally, a
technical-drawing business.

## WhatsApp

This uses WhatsApp's **click-to-chat** link (`wa.me/<number>?text=...`), not
the WhatsApp Business Platform API — that's the right tool for "let a visitor
open a chat with a prefilled message." A real Business Platform integration
(automated replies, a chat widget with delivery receipts, etc.) needs a
backend and an approved WhatsApp Business Account, which is a separate
project if you want to go that route.
