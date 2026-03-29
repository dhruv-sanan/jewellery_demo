# Project Context Prompt

> Paste this into any AI chat to give it full context of the Jewellery_Demo project.

---

## Context

I'm working on a **luxury jewelry brand website** called **MAISON** — a high-end jewellery retailer based in Mumbai, India. The tagline is *"Redefining luxury jewellery for the modern world."*

This is a **static frontend-only showcase/marketing website** (no backend, no database). All content is hardcoded. The focus is on rich animations, visual storytelling, and a premium user experience.

---

## Tech Stack

| Category        | Technology              | Version   | Purpose                          |
|----------------|-------------------------|-----------|----------------------------------|
| Framework       | React                   | 19.2.4    | UI components (SPA)              |
| Build Tool      | Vite                    | 8.0.0     | Dev server & production builds   |
| Styling         | Tailwind CSS            | 3.4.19    | Utility-first CSS                |
| Animation       | GSAP + ScrollTrigger    | 3.14.2    | Scroll-driven timeline animations|
| Animation       | Framer Motion           | 12.36.0   | Component-level transitions      |
| 3D Graphics     | Three.js                | 0.183.2   | Gold particle effects (WebGL)    |
| 3D (React)      | @react-three/fiber      | 9.5.0     | React renderer for Three.js      |
| 3D Helpers      | @react-three/drei       | 10.7.7    | 3D utility components            |
| Smooth Scroll   | Lenis                   | 1.3.18    | Buttery smooth page scrolling    |
| Icons           | Lucide React            | 0.577.0   | SVG icons                        |
| CSS Processing  | PostCSS + Autoprefixer  | —         | Browser compatibility            |
| Linting         | ESLint                  | 9.39.4    | Code quality                     |

**Fonts:** Cormorant Garamond (primary serif), Inter (sans-serif), Playfair Display (accent serif)
**Color scheme:** Dark background `#0A0A0A`, gold accent `#C9A96E`
**Design style:** Luxury/minimal — zero border radius, dark theme, gold accents

---

## Project Structure

```
Jewellery_Demo/
├── src/
│   ├── components/
│   │   ├── App.jsx                      # Root layout wrapper
│   │   ├── Navbar.jsx                   # Fixed nav, scroll-blur effect, mobile hamburger
│   │   ├── Preloader.jsx                # "MAISON" splash screen with staggered letter animation
│   │   ├── CustomCursor.jsx             # Gold custom cursor (desktop only, grows on hover)
│   │   ├── HeroSection.jsx              # 3-phase GSAP animated hero + Three.js gold particles
│   │   ├── MarqueeStrip.jsx             # Looping scrolling text banner
│   │   ├── CategoriesSection.jsx        # Desktop: mixed-size grid with scroll animations
│   │   ├── StackedCategoriesSection.jsx # Mobile: sticky stacked cards with scale/blur
│   │   ├── CollectionsSection.jsx       # Horizontal scroll carousel (4 collections)
│   │   ├── GenderSection.jsx            # Men/Women split-panel with GSAP panel animations
│   │   ├── CelebritySection.jsx         # Celebrity endorsement / social proof
│   │   ├── CraftsmanshipSection.jsx     # Multi-phase craftsmanship story + animated counters
│   │   ├── InstagramSection.jsx         # Social media feed section
│   │   ├── Footer.jsx                   # Full footer: newsletter, links, social icons
│   │   └── BackToTop.jsx                # Scroll-to-top floating button
│   ├── assets/                          # All images (hero, collections, categories, gender)
│   ├── main.jsx                         # React entry point
│   └── index.css                        # Global styles, Tailwind base, CSS variables
├── index.html                           # HTML shell
├── vite.config.js                       # Vite + React (Babel) plugin
├── tailwind.config.js                   # Custom colors, fonts, marquee animation keyframes
├── postcss.config.js
├── eslint.config.js
└── dist/                                # Production build output
```

---

## Key Features & Architecture

### Animation Strategy (Layered)
- **GSAP ScrollTrigger** — scroll-pinning, scrubbing, and complex timeline sequences (hero phases, categories, craftsmanship journey)
- **Framer Motion** — component entry/exit transitions
- **Three.js** — 3D gold dust particle system in hero section (paused when off-screen via IntersectionObserver)
- **CSS transitions** — hover effects

### Responsive Design
- Mobile-first with `md:` and `lg:` Tailwind breakpoints
- Separate components for mobile vs desktop where animations differ significantly (e.g., `CategoriesSection` vs `StackedCategoriesSection`)
- Touch device detection used to hide custom cursor and adjust interactions

### Performance Patterns
- `GSAP Context` with `context.revert()` for proper cleanup on unmount
- Three.js `frameloop` conditionally paused when section is not visible
- GSAP `lagSmoothing` for smoother experience
- Lazy loading + async decoding on images

### Accessibility
- `prefers-reduced-motion` CSS support
- Semantic HTML structure
- Mobile menu focus management

### No Backend
- No API calls, no database, no auth
- All product data, collections, and copy are hardcoded in component files

---

## What Has Been Built

1. **Preloader** — Animated brand name splash screen on first load
2. **Navbar** — Fixed top nav that blurs on scroll; mobile overlay menu
3. **Hero Section** — Three sequential animated phases (title → circular image reveal → CTA), with a live 3D gold particle field
4. **Marquee Strip** — Repeating horizontal scroll text band
5. **Categories** — Grid of jewelry categories (rings, necklaces, earrings, etc.) with staggered scroll reveals; sticky-card variant for mobile
6. **Collections** — Horizontal-scroll carousel showcasing 4 named collections
7. **Gender Section** — Animated split-panel for Men's and Women's lines
8. **Celebrity Section** — Social proof / endorsement imagery
9. **Craftsmanship Section** — Brand story told through scroll steps with animated counters
10. **Instagram Section** — Social media feed grid
11. **Footer** — Newsletter signup, navigation links, social icons (Instagram, Facebook, YouTube)
12. **Back to Top** — Floating scroll-to-top button

---

Use this context to help me with tasks like: adding features, debugging animations, improving responsive behaviour, refactoring components, or extending the design system.
