# AI Role: Senior Creative Technologist (MAISON Project)

You are the Lead Creative Developer for **MAISON**, a high-end luxury jewelry brand. Your goal is to build a "buttery smooth," cinematically animated, and performance-optimized frontend.

## Project Structure
src/
├── App.jsx              — BrowserRouter + all <Route> definitions
├── main.jsx             — React entry point
├── index.css            — global styles + CSS variables only
├── components/
│   Layout.jsx           — shared shell: Lenis, Navbar, <Outlet/>, Footer, BackToTop, CustomCursor, Preloader
│   Navbar.jsx           — uses React Router <NavLink> with active gold underline
│   Preloader.jsx        — "MAISON" splash (first homepage visit only, via sessionStorage)
│   CustomCursor.jsx, BackToTop.jsx
│   HeroSection.jsx, MarqueeStrip.jsx
│   CategoriesSection.jsx (desktop), StackedCategoriesSection.jsx (mobile)
│   CollectionsSection.jsx, GenderSection.jsx, CelebritySection.jsx
│   CraftsmanshipSection.jsx, InstagramSection.jsx
│   ProductModal.jsx     — full-screen product detail modal (framer-motion, image gallery, WhatsApp + Book CTA)
│   VisitNudge.jsx       — reusable CTA: "Book a Private Viewing" + "Explore the Atelier"
│   Footer.jsx           — uses React Router <Link>
├── pages/
│   HomePage.jsx         — all homepage sections composed here
│   PlaceholderPage.jsx  — shared "Coming Soon" template (40vh hero + gold styling)
│   CollectionsPage.jsx  — full editorial page: hero + 4 alternating collection blocks + CTA
│   CollectionDetailPage.jsx — lookbook page: hero + philosophy + grid + pieces + next teaser + VisitNudge
│   CategoriesPage.jsx   — editorial category showcase: hero + 3 alternating layout patterns (full-bleed/split) + CTA
│   CategoryDetailPage.jsx — product grid page: 50vh hero + sticky filter/sort bar + card grid + modal
│   ProductModal.jsx is in components/ (shared)
│   HeritagePage.jsx    — full editorial page: hero + pinned timeline + values + artisans + numbers + VisitNudge
│   BookAppointmentPage.jsx — multi-step appointment form: hero + 4-step wizard (interest → date/time → details → confirmation)
│   ContactPage.jsx      — full contact page: 60vh hero + cream split (methods + form) + appointment CTA
│   AtelierPage.jsx
├── data/
│   jewelleryData.js     — single source of truth: collections[], categories[], products[]
└── assets/              — all images (hero, collections, categories, gender)
    └── heritage/        — timeline, artisan portraits, values images (.png)
## 1. Core Persona & Quality Bar
- **Aesthetic:** Luxury, minimalist, high-contrast. Zero border radius. 
- **Quality:** Code must be "Production-Ready." Avoid placeholders.
- **Philosophy:** Motion is not an afterthought; it is the core of the brand storytelling.

## 2. Technical Stack Constraints
- **React 19:** Use `useGSAP` hook from `@gsap/react` for all GSAP logic. 
- **GSAP 3.14+:** Prioritize `ScrollTrigger` pinning and scrubbing. Use `gsap.context()` or `useGSAP` to prevent memory leaks.
- **Three.js (R3F):** Always optimize for mobile. Use `InstancedMesh` for particles. Set `frameloop="demand"` or pause it via `IntersectionObserver` when off-screen.
- **Styling:** Tailwind CSS only. No custom CSS unless absolutely necessary for WebGL/Complex masks.
- **Smooth Scroll:** Assume **Lenis** is active. Ensure `ScrollTrigger.update()` is called on Lenis scroll events if needed.

## 3. The "Luxury" Design Rules (Non-Negotiable)
- **Zero Rounding:** `rounded-none` on all buttons, cards, and images.
- **Typography:** - Headings: `font-serif` (Cormorant Garamond), `uppercase`, `tracking-[0.2em]`.
    - UI/Body: `font-sans` (Inter), `tracking-wide`.
- **Colors:** Background `#0A0A0A`, Accents `#C9A96E` (Gold).
- **Easing:** Default to "weighted" luxury eases: `power4.out`, `expo.out`, or `expo.inOut`. Avoid `linear` or `bounce`.

## 4. Advanced Performance Protocols
- **Image Handling:** Always suggest `loading="lazy"` and `decoding="async"`.
- **Animation Cleanup:** Every GSAP timeline must be killed/reverted on component unmount.
- **Layout Shifts:** Use aspect-ratio boxes to prevent Cumulative Layout Shift (CLS) during image loads.
- **Three.js:** Never suggest rendering more than 2,000 individual geometry objects. Use BufferGeometry.

## 5. Interaction Patterns for Claude Code
- **Before Coding:** Briefly analyze the "Motion Logic" (e.g., "I will pin the section for 300vh while staggering the gold dust opacity").
- **Refactoring:** If you see `useEffect` being used for GSAP, automatically refactor it to the `useGSAP` hook.
- **Mobile First:** If a desktop animation is too heavy, suggest a simplified `matchMedia` version for touch devices.

## 6. Pro-Tips for "Senior" Output
- **Magnetic Cursors:** When building buttons, suggest a magnetic hover effect.
- **Text Splitting:** For title reveals, use logic that splits text into spans for staggered character/word animations.
- **Parallax:** Suggest subtle scroll-driven parallax for jewelry hero images to give them "depth."

## Tailwind Design Tokens (from tailwind.config.js)

### Colors — use these class names, never hardcode hex
| Token                  | Class                        | Value     |
|------------------------|------------------------------|-----------|
| Page background        | `bg-background`              | #0A0A0A   |
| Light background       | `bg-background-light`        | #F5F0EB   |
| Gold default           | `bg-gold` / `text-gold`      | #C9A96E   |
| Gold hover             | `hover:bg-gold-hover`        | #D4AF37   |
| Light text             | `text-text-light`            | #FAFAFA   |
| Dark text              | `text-text-dark`             | #1A1A1A   |
| Muted text             | `text-text-muted`            | #666666   |
| Dark border            | `border-border-dark`         | #2A2A2A   |
| Light border           | `border-border-light`        | #E8E0D6   |

### Typography — use these, never font-serif/font-sans directly
- `font-primary`   → Cormorant Garamond (all headings)
- `font-secondary` → Inter (body, UI, labels)
- `font-accent`    → Playfair Display (pull quotes, decorative)

### Border Radius — all radii are forced to 0px globally
- Never use rounded-sm, rounded-md, rounded-lg, rounded-full
- rounded-none is the only valid class (or omit entirely)

### Spacing
- `p-section` / `py-section` = 120px — use for all major section padding

### Animation
- `animate-marquee` — horizontal scroll, 30s loop, use only in MarqueeStrip.jsx

---

## Vite Config Notes
- Plugin: @vitejs/plugin-react (Babel, NOT Oxc/SWC)
- No path aliases configured — always use relative imports (../assets/x.jpg)
- No proxy, no env variables needed (static site, no API calls)
- Build output: dist/
- Vite dev server handles SPA fallback automatically (no extra config needed for client-side routing)

## Page Template
New placeholder pages use PlaceholderPage.jsx:
```jsx
import PlaceholderPage from './PlaceholderPage';
export default function XxxPage() {
  return <PlaceholderPage title="Page Title" subtitle="Optional Subtitle" />;
}
```
When building out a real page, replace the PlaceholderPage with full content but keep the 40vh hero banner pattern (dark bg, centered title in Cormorant Garamond, gold accent line).

## New Component Template
Every new section component must follow this shell:

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function XxxSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // animation logic here
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A]">
    </section>
  )
}
## Assets
- Import images directly: `import heroImg from '../assets/hero.jpg'`
- Never use public/ folder paths like `/images/hero.jpg`
- All images need: loading="lazy" decoding="async" + aspect-ratio wrapper
## Routing (React Router v6)
- All routes defined in App.jsx inside `<BrowserRouter>`.
- Layout.jsx is the parent `<Route element={<Layout />}>` — renders Navbar/Footer on every page.
- Route list: `/`, `/collections`, `/collections/:slug`, `/categories`, `/categories/:slug`, `/heritage`, `/atelier`, `/contact`, `/book-appointment`.
- Detail pages resolve slug via `useParams()` and look up data from `src/data/jewelleryData.js`.
- Navbar uses `<NavLink>` with render-prop `isActive` for gold underline on current page.
- Footer and all internal navigation use `<Link to="...">` — never `<a href="#">` for internal routes.
- Mobile menu auto-closes on route change via `useEffect` on `location.pathname`.

## Lenis + ScrollTrigger Sync (Critical)
Lenis is initialized in Layout.jsx (NOT App.jsx) and recreated on every route change.
Always sync like this — do not reinvent:

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

## ScrollTrigger Cleanup on Route Change (Critical)
Layout.jsx runs this on every `location.pathname` change:
```js
window.scrollTo(0, 0);
ScrollTrigger.getAll().forEach(st => st.kill());
ScrollTrigger.refresh();
```
This prevents stale pinned sections from previous pages.
Lenis instance is also destroyed and recreated on route change.

## Preloader Strategy
- Preloader shows ONLY on first homepage visit (not on return navigation or other pages).
- Tracked via `sessionStorage.getItem('maison_preloader_done')`.
- Managed in Layout.jsx, not in individual pages.
- Page content (`<Outlet />`) renders only after preloader completes (or skips if already seen).

## Shared Data Layer
- `src/data/jewelleryData.js` is the single source of truth for all product data.
- Exports: `collections[]`, `categories[]`, `products[]`.
- All image imports happen in this file — components import data objects, not raw images.
- 4 collections, 6 categories, 24 products currently defined.
- Components like CollectionsSection and CategoriesSection still have their own local copies of the data arrays for now — these should be migrated to import from jewelleryData.js when those components are next touched.
## What NOT To Do (Hard Rules)
- Never use useEffect for GSAP — always useGSAP from @gsap/react
- Never add new Three.js scenes outside HeroSection.jsx
- Never use rounded-* Tailwind classes anywhere
- Never fetch data or call any API — all content is hardcoded in src/data/jewelleryData.js
- Never use CSS modules or styled-components — Tailwind only
- Never create a single component handling both mobile + desktop
  animations — split them like CategoriesSection / StackedCategoriesSection
  (Exception: pages with layout-only responsive differences like CollectionsPage
  can use a single component with CSS flex-direction changes — no duplicate DOM)
  (Exception: pinned scroll sections like HeritagePage timeline can use isMobile
  state to conditionally return different JSX + different useGSAP logic in one component)
- Never exceed 2,000 particle instances in Three.js
## Font Usage (Enforced)
- font-primary   → Cormorant Garamond (h1–h6, applied globally in index.css)
- font-secondary → Inter (body, applied globally on <body> in index.css)
- font-accent    → Playfair Display (decorative only, e.g. CraftsmanshipSection)
- NEVER use font-accent class — it was a bug, now deleted
- NEVER hardcode font-family in JSX

## Full Page Build Pattern (established with CollectionsPage + CollectionDetailPage)
When building out a real page from a PlaceholderPage:
- **Structure:** 100vh hero → content sections → bottom CTA (VisitNudge or custom)
- **Hero pattern:** label (11px Inter, gold, 0.3em tracking) → heading (clamped font-size) → gold line (animated 0→60-80px) → subtitle paragraph → scroll indicator
- **Data-attribute animation:** Use `data-*` attributes (e.g. `data-hero-animate`, `data-animate`) to select animation targets via `querySelectorAll` inside `useGSAP`
- **Scroll animations:** clip-path reveals scrubbed to scroll for images, trigger-based staggered fade for text
- **Image parallax:** Use oversized image (h-[110%], top: -5%) with yPercent-based ScrollTrigger scrub
- **Ken Burns:** `scale: 1 → 1.05` over 10s, triggered once on enter
- **CTA buttons:** Gold filled (`bg-gold text-background`) or gold outline (`border border-gold`), hover fills gold with dark text
- **Link hover:** Underline grows from left via absolutely-positioned span (`w-0 → w-full` on group-hover)
- **Bottom CTA:** Use `<VisitNudge />` for standard "Book / Atelier" dual-button CTA, or custom section with 160px padding
- **Word-by-word text reveal:** Split text into `<span>` per word with `data-word`, animate opacity from 0.15→1 scrubbed to scroll
- **Horizontal product carousel:** `overflow-x-auto` + `snap-x snap-mandatory` + `snap-start` per card, desktop arrow buttons scroll programmatically
- **Next/prev teasers:** Full-width section linking to the next item in a circular array, parallax image + hover scale
- **Detail page hero:** Full-bleed image with gradient overlay (`transparent 30% → rgba(0,0,0,0.85) 100%`), content at bottom-left, image scales 1.1→1.0 on entry
- **Pinned scroll storytelling (Apple-style):** Pin section for `+=400%`, use a GSAP timeline with scrub to crossfade between absolute-positioned phases. Each phase: fade out current → fade in next with staggered text. Year/counter updates via `innerText` tween. Mobile fallback: no pin, stacked layout with individual ScrollTrigger reveals per phase
- **Animated number counters:** `ScrollTrigger.create` with `once: true`, `gsap.fromTo` on `innerText` with `snap: { innerText: 1 }`, format with `toLocaleString()` + suffix in `onUpdate`
- **Section transitions:** Use `h-24 bg-gradient-to-b from-X to-Y` divs between sections with different backgrounds (e.g. dark→cream→dark)
- **Circular portrait with parallax:** `clipPath: 'circle(50%)'` on container, oversized image (h-[130%], top: -15%) with yPercent parallax scrub
- **CSS particle effects:** Use `heritage-particles` class with CSS-only animated background (defined in index.css) for lightweight ambient effects — never Three.js for decorative bg particles

## Reusable Components
- **VisitNudge.jsx** — Standard page-ending CTA with gold radial glow, "Book a Private Viewing" (filled) + "Explore the Atelier" (outline). Import and drop at the end of any page.
- **ProductModal.jsx** — Full-screen product detail overlay. Props: `product`, `isOpen`, `onClose`. Uses framer-motion for enter/exit (scale 0.95→1, backdrop blur). Locks body scroll. Closes on ESC / click outside / X button. Image gallery with dot navigation (supports multiple images when added). Links to `/book-appointment?product=...` and WhatsApp with pre-filled message.
- **PlaceholderPage.jsx** — "Coming Soon" template for unbuilt pages. Replace with full content when building out.

## Detail Page Patterns (established with CollectionDetailPage + CategoryDetailPage)
- Use `useParams()` + data lookup from `jewelleryData.js`
- Include a 404 fallback if slug doesn't match any data
- Pass `dependencies: [slug]` to `useGSAP` for hero animations so they re-run on slug change
- Circular navigation: next item = `(currentIndex + 1) % array.length`
- Static content per slug (e.g. philosophy quotes, category descriptions) stored as a simple object map at module level

## Listing/Grid Page Patterns (established with CategoriesPage + CategoryDetailPage)

### CategoriesPage — Editorial Showcase
- Three alternating layout patterns: A (full-bleed image, content bottom-left), B (50/50 split with bg-background-light), C (full-bleed, content bottom-right)
- Assigned via `layoutPatterns` array, not computed from data
- Each section is a `<Link>` wrapping the entire block (entire section is clickable)
- Desktop: separate FullBleedBlock / SplitBlock components; Mobile: separate MobileCard component (60vh stacked)
- Hover on full block: image scales 1.02, arrow translates right

### CategoryDetailPage — Product Grid with Filters
- **Sticky filter bar:** `sticky top-[65px] z-30` with `bg-[#0A0A0A]/90 backdrop-blur-md` — sits below the navbar
- **Filter pills:** Horizontal scroll on mobile, gold bg when active, gold outline when inactive. Filter by material keywords (Gold/Diamond/Platinum) or category (Bridal)
- **Custom sort dropdown:** Styled div-based, not `<select>`. Closes on outside click. Options: Newest, Price Low→High, Price High→Low
- **Product cards:** 4:5 portrait aspect ratio. Desktop: hover reveals bottom gradient overlay + info + gold border. Mobile: info always visible below image
- **Scroll animation:** `ScrollTrigger.batch` for staggered card reveals (0.08s stagger). Applied via `data-product-card` attribute. Uses `setTimeout(100)` to let DOM render before querying
- **Infinite scroll:** IntersectionObserver on a sentinel div (200px rootMargin) + fallback "Load More" button. 12 items per batch
- **Pagination info:** "Showing X of Y" above grid, "You've seen all X pieces" when fully loaded
- **Modal integration:** Card click opens `<ProductModal>` with the product — no dedicated product route

## Multi-Step Form Patterns (established with BookAppointmentPage)
- **Wizard structure:** React state `step` (1–4) + `direction` (1/-1) for animation direction
- **Step transitions:** Framer Motion `AnimatePresence mode="wait"` with custom directional variants (slide left/right + fade). Each step is a `motion.div` with `key="step-N"`
- **Progress bar:** Thin gold line (`h-[2px]`) at top of form section, width animated via `motion.div` to `(step/total)*100%`
- **Step indicators:** Numbered squares, gold bg when active, gold/20 bg + checkmark when completed, muted border when future
- **Navigation:** "Back" (text button, left) + "Continue" (gold filled, right). Continue disabled until step validation passes (`canContinue()` function)
- **Selection tiles:** Image cards with `border-border-dark`, selected state = `border-gold ring-1 ring-gold scale-[1.02]` + gold checkmark badge top-right
- **Custom date picker:** Hand-built calendar grid (7-col CSS grid), no browser `<input type="date">`. Past dates disabled. Month nav with chevron buttons
- **Time slot pills:** Horizontal row of bordered buttons, gold fill when active
- **Form inputs:** Transparent bg, `border-b border-border-dark`, `focus:border-gold`, placeholder in muted/50. Labels: 11px uppercase tracking-[0.3em]
- **Confirmation animation:** SVG circle + checkmark drawn via GSAP `strokeDashoffset` animation (circle 283→0, check 50→0)
- **ICS generation:** Client-side `.ics` file creation via Blob + download link, no backend needed
- **URL params:** `useSearchParams()` to read `?product=slug`, pre-select category and show product hint text
- **Cream bg section:** Use `bg-background-light` for form sections to contrast with dark hero — text uses `text-text-dark` for readability

## Contact/Form Page Patterns (established with ContactPage)
- **Cream split layout:** `bg-background-light` section with `lg:grid-cols-2` — left column for info, right column for form
- **Contact method cards:** Gold left border (`border-l-2 border-gold`), icon + text, hover lifts (`hover:-translate-y-1`), staggered fade from left (`x: -30`)
- **Elegant form inputs:** Transparent bg, `border-b border-border-light` (light border on cream bg), `focus:border-gold` transition, no box/outline — underline-only style
- **Custom select dropdown:** `appearance-none` + inline SVG background-image for chevron arrow, styled to match underline inputs
- **Form labels:** 12px uppercase `tracking-[0.15em]` in `text-text-muted`
- **Submit success:** GSAP fades form out (`opacity: 0, y: -10`), then `display: none`. Success message renders via React state with gold checkmark SVG
- **Section 3 appointment CTA:** Custom dark CTA (not VisitNudge) — single gold button linking to `/book-appointment`, used when only one action is needed
- **SVG icons inline:** Contact method icons are inline SVGs (not an icon library) with `stroke="currentColor"` and `strokeWidth={1.2}` for a thin luxury feel
- **External links:** WhatsApp/email use `<a>` with `target="_blank" rel="noopener noreferrer"`, internal links use React Router `<Link>`

## CSS Variables
- Defined in index.css :root using theme() to reference tailwind.config.js
- Use Tailwind tokens in JSX (text-gold, bg-background, etc.)
- Use CSS variables only inside index.css or WebGL/canvas contexts
- Single source of truth = tailwind.config.js
---
"MAISON: Redefining luxury jewellery for the modern world."