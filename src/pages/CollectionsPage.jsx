import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { collections, products } from '../data/jewelleryData'

gsap.registerPlugin(ScrollTrigger)

// ─── Collection Block ──────────────────────────────────────────────
function CollectionBlock({ collection, index, productsForCollection }) {
  const blockRef = useRef(null)
  const isEven = index % 2 === 0

  useGSAP(() => {
    const block = blockRef.current
    const img = block.querySelector('[data-clip-image]')
    const imgInner = block.querySelector('[data-parallax-image]')
    const textEls = block.querySelectorAll('[data-animate]')

    // Clip-path reveal — scrubbed to scroll
    const clipFrom = isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'

    gsap.fromTo(
      img,
      { clipPath: clipFrom },
      {
        clipPath: 'inset(0 0% 0 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.6,
        },
      }
    )

    // Parallax on inner image
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

    // Ken Burns slow zoom
    gsap.fromTo(
      imgInner,
      { scale: 1 },
      {
        scale: 1.05,
        duration: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Staggered text reveal
    gsap.fromTo(
      textEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: block,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: blockRef })

  const number = String(index + 1).padStart(2, '0')
  const thumbnails = productsForCollection.slice(0, 3)

  return (
    <section
      ref={blockRef}
      className={`relative min-h-screen bg-background flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image side */}
      <div
        data-clip-image
        className="relative w-full h-[50vh] md:h-auto md:w-[60%] md:min-h-screen overflow-hidden flex-shrink-0"
        style={{ clipPath: isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
      >
        <img
          data-parallax-image
          src={collection.image}
          alt={collection.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-[110%] object-cover will-change-transform"
          style={{ top: '-5%' }}
        />
      </div>

      {/* Content side */}
      <div className="relative w-full md:w-[40%] flex items-center px-8 py-16 md:px-12 lg:px-16">
        {/* Large background number */}
        <span
          className="absolute font-primary text-[80px] md:text-[120px] font-bold text-[#1A1A1A] select-none pointer-events-none leading-none top-1/2 -translate-y-1/2"
          style={isEven ? { left: '2rem' } : { right: '2rem' }}
        >
          {number}
        </span>

        <div className="relative z-10 max-w-md">
          <p data-animate className="font-secondary text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
            {collection.tag}
          </p>
          <h2 data-animate className="font-primary text-[36px] md:text-[52px] text-text-light font-normal uppercase tracking-[0.1em] mb-6 leading-[1.1]">
            {collection.name}
          </h2>
          <p data-animate className="font-secondary text-[15px] text-[#999] leading-[1.8] mb-6">
            {collection.description}
          </p>
          <p data-animate className="font-secondary text-[13px] text-gold tracking-wide mb-6">
            {collection.count}
          </p>

          {/* Thumbnails */}
          <div data-animate className="flex gap-3 mb-8">
            {thumbnails.map((p) => (
              <div
                key={p.id}
                className="w-[60px] h-[60px] overflow-hidden bg-[#1A1A1A] flex-shrink-0"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
            ))}
          </div>

          <Link
            data-animate
            to={`/collections/${collection.slug}`}
            className="group inline-flex items-center gap-2 font-secondary text-[14px] text-gold tracking-wide"
          >
            <span className="relative">
              Explore Collection
              <span className="absolute left-0 bottom-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Collections Page ──────────────────────────────────────────────
export default function CollectionsPage() {
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
        stagger: 0.1,
        delay: 0.3,
      }
    )

    // Gold line width
    const line = heroRef.current.querySelector('[data-gold-line]')
    if (line) {
      gsap.fromTo(line, { width: 0 }, { width: 80, duration: 1.2, ease: 'expo.out', delay: 0.8 })
    }

    // Scroll indicator bounce
    const indicator = heroRef.current.querySelector('[data-scroll-indicator]')
    if (indicator) {
      gsap.to(indicator, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power2.inOut',
      })
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
      {/* ── SECTION 1: PAGE HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Subtle radial gold shimmer */}
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
            Collections
          </p>
          <h1
            data-hero-animate
            className="font-primary font-normal text-text-light uppercase tracking-[0.1em] mb-8 leading-[1.1]"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Stories Told in<br />Gold &amp; Diamonds
          </h1>
          <div
            data-hero-animate
            data-gold-line
            className="h-px bg-gold mb-8"
            style={{ width: 0 }}
          />
          <p
            data-hero-animate
            className="font-secondary text-[16px] text-[#888] leading-[1.8] max-w-[600px]"
          >
            Each collection is a world unto itself — a narrative woven through
            precious metals, rare gemstones, and the hands of master artisans.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          data-scroll-indicator
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-secondary text-[10px] tracking-[0.3em] text-text-light uppercase">
            Scroll
          </span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="text-text-light">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1" />
            <circle cx="7" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: COLLECTION SHOWCASE ── */}
      {collections.map((col, i) => (
        <CollectionBlock
          key={col.id}
          collection={col}
          index={i}
          productsForCollection={products.filter((p) => p.collection === col.slug)}
        />
      ))}

      {/* ── SECTION 3: BOTTOM CTA ── */}
      <section
        ref={ctaRef}
        className="bg-background flex flex-col items-center text-center px-6"
        style={{ padding: '160px 24px' }}
      >
        <h2
          data-cta-animate
          className="font-primary text-[36px] md:text-[48px] text-text-light font-normal uppercase tracking-[0.1em] mb-6 leading-[1.1]"
        >
          Begin Your Collection
        </h2>
        <p
          data-cta-animate
          className="font-secondary text-[15px] text-[#888] leading-[1.8] mb-10 max-w-[500px]"
        >
          Every piece is waiting to become part of your story
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
