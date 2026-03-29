import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../data/jewelleryData'

gsap.registerPlugin(ScrollTrigger)

// ─── Category Descriptions (not in data file) ─────────────────────
const categoryMeta = {
  necklaces: 'From chokers to cascading statement pieces',
  rings: 'Solitaires, cocktail rings, and bands of brilliance',
  earrings: 'Studs, chandeliers, and drops that catch the light',
  bangles: 'Bold cuffs and delicate kadas in gold and platinum',
  bracelets: 'Tennis lines, chains, and wrist-defining elegance',
  bridal: 'Heirloom sets crafted for your most luminous day',
}

// ─── Layout Pattern Assignment ─────────────────────────────────────
// Pattern A: Full-bleed image, content bottom-left
// Pattern B: 50/50 split, image right, content left on light bg
// Pattern C: Full-bleed image, content bottom-right
const layoutPatterns = ['A', 'B', 'C', 'A', 'B', 'C']

// ─── Full-Bleed Category Block (Patterns A & C) ───────────────────
function FullBleedBlock({ category, index, align }) {
  const blockRef = useRef(null)
  const isLeft = align === 'left'

  useGSAP(() => {
    const block = blockRef.current
    const img = block.querySelector('[data-clip-image]')
    const imgInner = block.querySelector('[data-parallax-image]')
    const textEls = block.querySelectorAll('[data-animate]')

    // Clip-path reveal
    const clipFrom = isLeft
      ? 'inset(0 100% 0 0)'
      : 'inset(0 0 0 100%)'

    gsap.fromTo(
      img,
      { clipPath: clipFrom },
      {
        clipPath: 'inset(0 0% 0 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      }
    )

    // Parallax
    gsap.fromTo(
      imgInner,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Text stagger
    gsap.fromTo(
      textEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: block,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: blockRef })

  const number = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/categories/${category.slug}`}
      ref={blockRef}
      className="group relative block h-[60vh] md:h-[70vh] overflow-hidden"
    >
      {/* Image */}
      <div
        data-clip-image
        className="absolute inset-0"
        style={{ clipPath: isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
      >
        <img
          data-parallax-image
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ top: '-10%' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isLeft
              ? 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)'
              : 'linear-gradient(to left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)',
          }}
        />
        {/* Bottom gradient for readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }}
        />
      </div>

      {/* Content overlay */}
      <div
        className={`absolute bottom-0 ${
          isLeft ? 'left-0' : 'right-0'
        } z-10 px-8 md:px-16 lg:px-24 pb-12 md:pb-16 max-w-[600px]`}
      >
        {/* Large background number */}
        <span className="absolute -top-6 font-primary text-[100px] md:text-[140px] font-bold text-white/[0.04] select-none pointer-events-none leading-none"
          style={isLeft ? { left: 0 } : { right: 0 }}
        >
          {number}
        </span>

        <p data-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-3">
          {category.count}
        </p>
        <h2
          data-animate
          className="font-primary text-[48px] md:text-[64px] lg:text-[72px] text-text-light font-normal uppercase tracking-[0.1em] mb-4 leading-[1]"
        >
          {category.name}
        </h2>
        <p data-animate className="font-secondary text-[14px] text-[#CCC] leading-[1.7] mb-6">
          {categoryMeta[category.slug]}
        </p>
        <span
          data-animate
          className="inline-flex items-center gap-2 font-secondary text-[13px] text-gold tracking-[0.15em] uppercase"
        >
          <span>View All</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
        </span>
      </div>
    </Link>
  )
}

// ─── Split Category Block (Pattern B) ──────────────────────────────
function SplitBlock({ category, index }) {
  const blockRef = useRef(null)

  useGSAP(() => {
    const block = blockRef.current
    const img = block.querySelector('[data-clip-image]')
    const imgInner = block.querySelector('[data-parallax-image]')
    const textEls = block.querySelectorAll('[data-animate]')

    // Clip from right
    gsap.fromTo(
      img,
      { clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0% 0 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      }
    )

    // Parallax
    gsap.fromTo(
      imgInner,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Text stagger
    gsap.fromTo(
      textEls,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: block,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: blockRef })

  const number = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/categories/${category.slug}`}
      ref={blockRef}
      className="group relative block h-[60vh] md:h-[70vh] flex flex-col md:flex-row overflow-hidden"
    >
      {/* Content side — light bg */}
      <div className="relative w-full h-1/2 md:h-full md:w-1/2 bg-background-light flex items-center px-8 md:px-16 lg:px-20 py-12 md:py-0 order-2 md:order-1">
        {/* Large background number */}
        <span className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 font-primary text-[100px] md:text-[140px] font-bold text-text-dark/[0.04] select-none pointer-events-none leading-none">
          {number}
        </span>

        <div className="relative z-10 max-w-md">
          <p data-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-3">
            {category.count}
          </p>
          <h2
            data-animate
            className="font-primary text-[48px] md:text-[64px] lg:text-[72px] text-text-dark font-normal uppercase tracking-[0.1em] mb-4 leading-[1]"
          >
            {category.name}
          </h2>
          <p data-animate className="font-secondary text-[14px] text-text-muted leading-[1.7] mb-6">
            {categoryMeta[category.slug]}
          </p>
          <span
            data-animate
            className="inline-flex items-center gap-2 font-secondary text-[13px] text-gold tracking-[0.15em] uppercase"
          >
            <span>View All</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
          </span>
        </div>
      </div>

      {/* Image side */}
      <div
        data-clip-image
        className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden order-1 md:order-2"
        style={{ clipPath: 'inset(0 0 0 100%)' }}
      >
        <img
          data-parallax-image
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-[110%] object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ top: '-5%' }}
        />
      </div>
    </Link>
  )
}

// ─── Mobile Category Card ──────────────────────────────────────────
function MobileCard({ category }) {
  const cardRef = useRef(null)

  useGSAP(() => {
    const card = cardRef.current
    const textEls = card.querySelectorAll('[data-animate]')

    gsap.fromTo(
      textEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: cardRef })

  return (
    <Link
      to={`/categories/${category.slug}`}
      ref={cardRef}
      className="relative block h-[60vh] overflow-hidden"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)' }}
      />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8">
        <p data-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-2">
          {category.count}
        </p>
        <h3 data-animate className="font-primary text-[36px] text-text-light font-normal uppercase tracking-[0.1em] mb-2 leading-[1]">
          {category.name}
        </h3>
        <p data-animate className="font-secondary text-[13px] text-[#BBB] leading-[1.6] mb-4">
          {categoryMeta[category.slug]}
        </p>
        <span
          data-animate
          className="inline-flex items-center gap-2 font-secondary text-[12px] text-gold tracking-[0.15em] uppercase"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </span>
      </div>
    </Link>
  )
}

// ─── Categories Page ──────────────────────────────────────────────
export default function CategoriesPage() {
  const heroRef = useRef(null)
  const ctaRef = useRef(null)

  // Hero animations
  useGSAP(() => {
    const els = heroRef.current.querySelectorAll('[data-hero-animate]')
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.3,
      }
    )

    const line = heroRef.current.querySelector('[data-gold-line]')
    if (line) {
      gsap.fromTo(line, { width: 0 }, { width: 60, duration: 1.2, ease: 'expo.out', delay: 0.8 })
    }
  }, { scope: heroRef })

  // Bottom CTA
  useGSAP(() => {
    const els = ctaRef.current.querySelectorAll('[data-cta-animate]')
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ctaRef })

  return (
    <main className="bg-background">
      {/* ── SECTION 1: PAGE HERO (70vh) ── */}
      <section
        ref={heroRef}
        className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <p
            data-hero-animate
            className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-6"
          >
            Categories
          </p>
          <h1
            data-hero-animate
            className="font-primary font-normal text-text-light uppercase tracking-[0.1em] mb-6 leading-[1.1]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            Explore by Type
          </h1>
          <div
            data-hero-animate
            data-gold-line
            className="h-px bg-gold mb-6"
            style={{ width: 0 }}
          />
          <p
            data-hero-animate
            className="font-secondary text-[15px] text-[#888] leading-[1.8] max-w-[520px]"
          >
            From statement necklaces to bridal heirlooms — find your piece
          </p>
        </div>
      </section>

      {/* ── SECTION 2: DESKTOP EDITORIAL GRID ── */}
      <div className="hidden md:block">
        {categories.map((cat, i) => {
          const pattern = layoutPatterns[i]
          if (pattern === 'A') {
            return <FullBleedBlock key={cat.id} category={cat} index={i} align="left" />
          }
          if (pattern === 'B') {
            return <SplitBlock key={cat.id} category={cat} index={i} />
          }
          // Pattern C
          return <FullBleedBlock key={cat.id} category={cat} index={i} align="right" />
        })}
      </div>

      {/* ── SECTION 2: MOBILE STACKED CARDS ── */}
      <div className="md:hidden">
        {categories.map((cat) => (
          <MobileCard key={cat.id} category={cat} />
        ))}
      </div>

      {/* ── SECTION 3: BOTTOM CTA (Visit Nudge) ── */}
      <section
        ref={ctaRef}
        className="bg-background flex flex-col items-center text-center px-6"
        style={{ padding: '140px 24px' }}
      >
        <p
          data-cta-animate
          className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-6"
        >
          Cannot Decide?
        </p>
        <h2
          data-cta-animate
          className="font-primary text-[36px] md:text-[48px] text-text-light font-normal uppercase tracking-[0.1em] mb-6 leading-[1.1]"
        >
          Visit Our Atelier
        </h2>
        <p
          data-cta-animate
          className="font-secondary text-[15px] text-[#888] leading-[1.8] mb-10 max-w-[480px]"
        >
          Our specialists will guide you through every category and help you discover pieces that speak to your style
        </p>
        <div
          data-cta-animate
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/book-appointment"
            className="font-secondary text-[14px] text-background bg-gold px-8 py-4 tracking-wide transition-all duration-500 hover:bg-gold-hover"
          >
            Book a Private Viewing
          </Link>
          <Link
            to="/atelier"
            className="group inline-flex items-center gap-2 font-secondary text-[14px] text-gold border border-gold px-8 py-4 tracking-wide transition-all duration-500 hover:bg-gold hover:text-background"
          >
            <span>Explore the Atelier</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
