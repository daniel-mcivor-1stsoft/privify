# Design System: Privify

**Skill:** taste-design
**Dials:** Creativity `7` · Density `5` · Variance `7` · Motion `5`

---

## 1. Visual Theme & Atmosphere

A confident, privacy-first interface — like a well-run law firm that's learned to make itself legible. Dense enough to carry real information, airy enough to feel considered. Asymmetric layouts prevent the corporate-SaaS sameness. The colour palette is disciplined: one deep forest green carries all the trust signals; everything else is ink on paper. Motion is purposeful — nothing bounces, nothing screams. The overall impression: honest, capable, earned.

This is not a "digital product that disrupts". It is a utility that genuinely protects people. The design must communicate that without shouting it.

---

## 2. Colour Palette & Roles

- **Paper** (`#F7F6F3`) — Primary background. Warm off-white, never cold blue-white. Consistent across all pages
- **Pure Surface** (`#FFFFFF`) — Card and panel fill. Elevated against Paper background
- **Deep Ink** (`#1A1A18`) — Primary text. Warm near-black, never pure `#000000`
- **Muted Slate** (`#6E6E69`) — Body copy, descriptions, metadata. Warm grey, never cool
- **Ghost Ink** (`#9A9A95`) — Tertiary text, timestamps, disabled states, placeholders
- **Whisper Border** (`rgba(26,26,24,0.09)`) — Card borders, structural 1px lines. Warm-tinted, not blue-grey
- **Lifted Shadow** (`0 4px 24px rgba(26,26,24,0.07), 0 1px 4px rgba(26,26,24,0.05)`) — Card elevation. Wide-spread, low-opacity, never harsh

### Accent — Forest Signal (`#1A6B4A`)
The single accent. Deep forest green. Used exclusively for: primary CTAs, active nav states, status indicators, progress fills, checkmarks, links on hover. Never used decoratively. Never gradient-blended with other hues.

- **Forest Tint** (`#F0FDF4`) — Background wash for green-accented elements (badges, active states)
- **Forest Border** (`#86EFAC`) — Border for tinted containers
- **Forest Dark** (`#145539`) — Hover state for green buttons. Deepens, never glows

### Banned Colours
- Pure Black (`#000000`) — always Deep Ink or warmer
- Cool greys (Slate-series) mixed with warm greys — pick one temperature and hold it
- Purple, violet, or neon gradients — "AI purple" aesthetic is banned entirely
- Oversaturated accents above 80% saturation

---

## 3. Typography Rules

- **Display / Headlines:** `Outfit` — Track-tight (`letter-spacing: -0.04em`), fluid scale via `clamp()`, weight 700–800. Leading compressed (`line-height: 1.05`). Hierarchy through weight contrast and colour, not size alone
- **Body:** `Outfit` at weight 400–500 — Relaxed leading (`1.7`), max `62ch` line width, Muted Slate colour
- **Mono:** `DM Mono` — Timestamps, phone numbers, OTP codes, prices, technical metadata. Used sparingly to signal precision
- **Scale:**
  - Hero display: `clamp(2.75rem, 5.5vw, 4.25rem)`
  - Section h2: `clamp(1.9rem, 3.2vw, 2.8rem)`
  - Body: `1rem` (16px) minimum — never shrink below 14px
  - Mono metadata: `0.8rem`

### Banned Fonts
- `Inter` — banned entirely; replaced by `Outfit`
- Any generic system serif (`Times New Roman`, `Georgia`, `Garamond`) — banned
- Font stacks that fall back to system UI for headings

---

## 4. Component Stylings

- **Primary Button:** Forest Signal fill (`#1A6B4A`), white text, weight 600, `border-radius: 10px`, no outer glow. Active: `translateY(-1px)` + deeper shadow. Hover: Forest Dark (`#145539`). Never a gradient. Never a glow ring
- **Secondary Button:** White fill, Deep Ink text, `1.5px` Whisper Border, subtle shadow. Hover: background shifts to Paper
- **Cards:** `border-radius: 18px–24px`. Pure Surface fill. Whisper Border. Lifted Shadow. Internal padding `1.75rem–2.25rem`. Used only where elevation serves a purpose — not decorative containers. High-density sections use border-top dividers instead
- **Badges / Tags:** `border-radius: 100px`. Forest Tint fill, Forest Signal text, Forest Border border. Font size `0.72rem`, weight 600, DM Mono. Small and unobtrusive
- **Forms / Inputs:** Label above. Error text below in red (`#DC2626`). Focus ring: `2px Forest Signal`. No floating labels. Generous `0.5rem` gap in label-input-error stack
- **Loaders:** Skeletal shimmer matching exact layout shape. Warm tint. Never circular spinners
- **Navigation (desktop):** Sticky, frosted glass (`backdrop-filter: blur(20px)`), `68px` tall, generous spacing between links. Active link gets Forest Signal colour, no underline. No hamburger on desktop
- **Navigation (mobile):** Collapses to full-width bottom sheet or slide-in drawer. Clean, labelled tap targets. Minimum `44px` hit area per item

---

## 5. Hero Section Rules

- **Structure:** Asymmetric split — left text block (55–60% width), right interactive demo or visual (40–45%). Centred hero layouts are banned at this variance level
- **No Overlapping:** Text never overlaps demo panels or images. Every element occupies its own spatial zone. No z-index stacking of content over visuals
- **Headline Strategy:** Short, declarative, under 8 words. Accent colour on the key differentiating phrase. Never a gradient across the headline
- **Demo Visual:** A live-feeling product UI mockup (browser chrome + app shell) that animates on load. Shows real use — a text arriving, forwarding to email, OTP highlighted
- **CTA Restraint:** One primary green button. No secondary "Learn more" link. Trust signals (EU-hosted, GDPR, cancel any time) below the CTA as quiet text, not badges
- **No Filler:** "Scroll to explore", scroll chevrons, bouncing arrows — all banned

---

## 6. Layout Principles

- **Grid-First:** CSS Grid for all structural layouts. Never `calc(33% - gap)` flexbox math
- **Feature Sections:** Three-equal-cards-in-a-row is banned. Use:
  - Asymmetric bento (`4fr 2fr` or `2fr 2fr 2fr` with one spanning 2 rows)
  - Two-column zig-zag (feature alternates left/right with visual)
  - Feature list with full-bleed illustrations on alternating sides
- **Max Width:** `1200px` content container, centred, with `clamp(1.25rem, 4vw, 2.5rem)` horizontal padding
- **Section Rhythm:** Vertical section gap `clamp(5rem, 8vw, 7rem)`. Never cramped, never excessively padded
- **Full-Height Sections:** Use `min-height: 100dvh` — never `height: 100vh`
- **Z-Index:** Used only for: navbar (20), modal overlay (30), toast (40). Never for content stacking

---

## 7. Responsive Rules

- **Mobile-First Collapse (< 768px):** All multi-column layouts collapse to single column. Width `100%`, padding `1.25rem`, gap `1.5rem`. No exceptions
- **No Horizontal Scroll:** Any element causing horizontal overflow is a critical failure
- **Typography:** All headlines via `clamp()`. Body stays `1rem` minimum
- **Touch Targets:** All interactive elements minimum `44px`. Buttons full-width on mobile
- **Hero on Mobile:** Split layout stacks — text first, demo second. Demo scaled to fit viewport width
- **Nav on Mobile:** Bottom navigation or slide-in drawer with labelled items
- **Verify At:** `375px`, `390px`, `768px`, `1024px`, `1440px`

---

## 8. Motion & Interaction Intent

- **Spring Physics:** `stiffness: 100, damping: 20` on all interactive elements. No linear easing
- **Hero Demo:** Perpetual loop — new SMS arrives every 4s, slides in from top, toast fades in/out. Smooth, not frantic
- **Scroll Reveals:** `opacity: 0 → 1` + `translateY(24px → 0)` via IntersectionObserver at `threshold: 0.12`. Staggered cascade on sibling cards (`animation-delay: calc(var(--i) * 100ms)`)
- **Buttons:** `-1px translateY` + `box-shadow` deepens on hover. `scale(0.98)` on active press
- **Status Dots:** Infinite `pulse` keyframe — opacity 1→0.3→1, scale 1→0.8→1, period 2s
- **Hardware Rules:** Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`, `background-color`
- **Performance:** All perpetual animations via CSS keyframes, not JS. 60fps target

---

## 9. Anti-Patterns (Banned)

- `Inter` font — use `Outfit` exclusively for this project
- Pure black (`#000000`) — Deep Ink (`#1A1A18`) only
- Cool grey system — this palette is warm throughout; no Slate/Stone mixing
- Neon glows, outer box-shadow glows on buttons
- Oversaturated accents — Forest Signal is already calibrated; don't lighten it
- Gradient text on large headlines
- Centred hero layout
- Three equal feature cards in a row
- Custom mouse cursors
- Overlapping content layers (text over images, cards over text)
- Filler UI copy: "Scroll to explore", "Discover more", bouncing chevrons
- AI copywriting clichés: "Seamless", "Elevate", "Next-Gen", "Unleash", "Revolutionary", "Powerful"
- Fabricated metrics or statistics — no uptime percentages, response times, or user counts unless real data is provided
- Fake "By the Numbers" sections with invented data
- `LABEL // YEAR` formatting
- Generic placeholder names — no "John Smith", "Acme Corp"
- Emoji in UI elements or copy
- Circular loading spinners
- `h-screen` / `100vh` — use `100dvh` always
