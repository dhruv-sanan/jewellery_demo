import { useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { collections, products } from '../data/jewelleryData'
import VisitNudge from '../components/VisitNudge'

gsap.registerPlugin(ScrollTrigger)

// ─── Philosophy quotes per collection ──────────────────────────────
const philosophyQuotes = {
  'eternal-bloom':
    'In every petal, a diamond finds its purpose. In every bloom, gold discovers its form.',
  'celestial-radiance':
    'We looked to the heavens and found light waiting to be worn. Each stone a fallen star, each setting a constellation.',
  'heritage-redux':
    'Centuries of craft flow through these pieces — the past reimagined, not repeated. Tradition with a modern pulse.',
  'midnight-garden':
    'Where darkness meets brilliance, drama is born. These are jewels that speak in whispers after sundown.',
}

// ─── Lookbook grid layout pattern ──────────────────────────────────
// Each item: { span: 1 | 2, height class }
// Pattern repeats: [large(2col), small(1col)], [small(1col), large(2col)]
const gridPattern = [
  { span: 2, h: 'h-[400px] md:h-[520px]' },
  { span: 1, h: 'h-[400px] md:h-[520px]' },
  { span: 1, h: 'h-[350px] md:h-[440px]' },
  { span: 2, h: 'h-[350px] md:h-[440px]' },
  { span: 2, h: 'h-[400px] md:h-[480px]' },
  { span: 1, h: 'h-[400px] md:h-[480px]' },
  { span: 1, h: 'h-[320px] md:h-[400px]' },
  { span: 2, h: 'h-[320px] md:h-[400px]' },
]

// ─── Word-by-word text component ───────────────────────────────────
function PhilosophySection({ quote }) {
  const sectionRef = useRef(null)
  const words = quote.split(' ')

  useGSAP(() => {
    const wordEls = sectionRef.current.querySelectorAll('[data-word]')
    gsap.fromTo(
      wordEls,
      { opacity: 0.15 },
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 0.8,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative bg-background flex items-center justify-center px-6 md:px-12"
      style={{ minHeight: '50vh', padding: '120px 24px' }}
    >
      <p className="font-primary italic text-[24px] md:text-[32px] text-gold text-center leading-[1.6] max-w-4xl">
        {words.map((word, i) => (
          <span key={i} data-word className="inline-block mr-[0.3em] opacity-15">
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}

// ─── Lookbook Grid ─────────────────────────────────────────────────
function LookbookGrid({ collectionProducts, collectionImage }) {
  const gridRef = useRef(null)

  // Build 8 images: collection hero + products cycled
  const images = useMemo(() => {
    const imgs = [collectionImage]
    const productImgs = collectionProducts.map((p) => p.image)
    while (imgs.length < 8) {
      imgs.push(productImgs[imgs.length % productImgs.length])
    }
    return imgs
  }, [collectionProducts, collectionImage])

  useGSAP(() => {
    const items = gridRef.current.querySelectorAll('[data-grid-item]')
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: gridRef })

  return (
    <section className="bg-background-light py-section px-4 md:px-8 lg:px-12">
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto"
      >
        {images.map((img, i) => {
          const pattern = gridPattern[i % gridPattern.length]
          return (
            <div
              key={i}
              data-grid-item
              className={`overflow-hidden group ${pattern.h} ${
                pattern.span === 2 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <img
                src={img}
                alt={`Editorial lookbook ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-110"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── Product Cards Carousel ────────────────────────────────────────
function PiecesSection({ collectionProducts }) {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useGSAP(() => {
    const els = sectionRef.current.querySelectorAll('[data-pieces-animate]')
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return
    const cardWidth = container.querySelector('[data-product-card]')?.offsetWidth || 300
    container.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative bg-background py-section px-6 md:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <p
          data-pieces-animate
          className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4"
        >
          Pieces
        </p>
        <div className="flex items-end justify-between">
          <h2
            data-pieces-animate
            className="font-primary text-[32px] md:text-[44px] text-text-light font-normal uppercase tracking-[0.1em] leading-[1.1]"
          >
            From This Collection
          </h2>

          {/* Desktop arrows */}
          <div data-pieces-animate className="hidden md:flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-12 h-12 border border-border-dark flex items-center justify-center text-text-light transition-all duration-300 hover:border-gold hover:text-gold"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-12 h-12 border border-border-dark flex items-center justify-center text-text-light transition-all duration-300 hover:border-gold hover:text-gold"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto max-w-7xl mx-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {collectionProducts.map((product) => (
          <div
            key={product.id}
            data-product-card
            className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden mb-5 border border-transparent transition-all duration-500 group-hover:border-gold">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:-translate-y-2"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 font-secondary text-[10px] tracking-[0.2em] text-gold uppercase">
                  New
                </span>
              )}
            </div>

            {/* Info */}
            <h3 className="font-primary text-[20px] text-text-light font-normal uppercase tracking-[0.05em] mb-2 leading-[1.2]">
              {product.name}
            </h3>
            <p className="font-secondary text-[12px] text-[#888] tracking-wide mb-2">
              {product.material}
            </p>
            <p className="font-secondary text-[14px] text-gold tracking-wide mb-3">
              {product.price}
            </p>
            <Link
              to="/book-appointment"
              className="group/link inline-flex items-center gap-1 font-secondary text-[13px] text-gold tracking-wide"
            >
              <span className="relative">
                Inquire
                <span className="absolute left-0 bottom-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover/link:w-full" />
              </span>
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Next Collection Teaser ────────────────────────────────────────
function NextCollectionTeaser({ nextCollection }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const img = sectionRef.current.querySelector('[data-next-image]')
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    const els = sectionRef.current.querySelectorAll('[data-next-animate]')
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <Link
      to={`/collections/${nextCollection.slug}`}
      className="block"
    >
      <section
        ref={sectionRef}
        className="relative bg-background flex flex-col md:flex-row group overflow-hidden"
        style={{ height: '60vh' }}
      >
        {/* Image side */}
        <div className="relative w-full md:w-1/2 h-[30vh] md:h-full overflow-hidden">
          <img
            data-next-image
            src={nextCollection.image}
            alt={nextCollection.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-[110%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ top: '-5%' }}
          />
        </div>

        {/* Content side */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
          <p
            data-next-animate
            className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4"
          >
            Next Collection
          </p>
          <h2
            data-next-animate
            className="font-primary text-[32px] md:text-[48px] text-text-light font-normal uppercase tracking-[0.1em] mb-4 leading-[1.1]"
          >
            {nextCollection.name}
          </h2>
          <p
            data-next-animate
            className="font-secondary text-[14px] text-[#888] leading-[1.8] mb-6 max-w-md"
          >
            {nextCollection.description}
          </p>
          <span
            data-next-animate
            className="inline-flex items-center gap-2 font-secondary text-[14px] text-gold tracking-wide transition-transform duration-300 group-hover:translate-x-2"
          >
            Explore →
          </span>
        </div>
      </section>
    </Link>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function CollectionDetailPage() {
  const { slug } = useParams()
  const heroRef = useRef(null)

  const collection = collections.find((c) => c.slug === slug)
  const collectionProducts = products.filter((p) => p.collection === slug)

  const currentIndex = collections.findIndex((c) => c.slug === slug)
  const nextCollection = collections[(currentIndex + 1) % collections.length]

  const quote = philosophyQuotes[slug] || philosophyQuotes['eternal-bloom']

  // Hero animation
  useGSAP(() => {
    if (!collection) return

    const img = heroRef.current?.querySelector('[data-hero-image]')
    const textEls = heroRef.current?.querySelectorAll('[data-hero-animate]')
    const line = heroRef.current?.querySelector('[data-gold-line]')
    const indicator = heroRef.current?.querySelector('[data-scroll-indicator]')

    // Image scale in
    if (img) {
      gsap.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.6, ease: 'expo.out' })
    }

    // Text stagger
    if (textEls?.length) {
      gsap.fromTo(
        textEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1, delay: 0.4 }
      )
    }

    // Gold line
    if (line) {
      gsap.fromTo(line, { width: 0 }, { width: 60, duration: 1.2, ease: 'expo.out', delay: 0.9 })
    }

    // Scroll indicator
    if (indicator) {
      gsap.to(indicator, { y: 8, repeat: -1, yoyo: true, duration: 1.5, ease: 'power2.inOut' })
    }
  }, { scope: heroRef, dependencies: [slug] })

  // 404 fallback
  if (!collection) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-primary text-[48px] text-text-light uppercase tracking-[0.1em] mb-4">
            Collection Not Found
          </h1>
          <Link to="/collections" className="font-secondary text-[14px] text-gold tracking-wide">
            ← Back to Collections
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      {/* ── SECTION 1: COLLECTION HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Hero image */}
        <img
          data-hero-image
          src={collection.image}
          alt={collection.name}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 md:px-12 lg:px-16 pb-24 md:pb-20 max-w-3xl">
            <p
              data-hero-animate
              className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4"
            >
              {collection.tag}
            </p>
            <h1
              data-hero-animate
              className="font-primary font-normal text-text-light uppercase tracking-[0.1em] mb-6 leading-[1.05]"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              {collection.name}
            </h1>
            <div
              data-hero-animate
              data-gold-line
              className="h-px bg-gold mb-6"
              style={{ width: 0 }}
            />
            <p
              data-hero-animate
              className="font-secondary text-[16px] text-[#CCC] leading-[1.8] max-w-[500px] mb-4"
            >
              {collection.description}
            </p>
            <p
              data-hero-animate
              className="font-secondary text-[13px] text-gold tracking-wide"
            >
              {collection.count}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          data-scroll-indicator
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-secondary text-[10px] tracking-[0.3em] text-text-light uppercase">
            Scroll
          </span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            className="text-text-light"
          >
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1" />
            <circle cx="7" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: PHILOSOPHY ── */}
      <PhilosophySection quote={quote} />

      {/* ── SECTION 3: LOOKBOOK GRID ── */}
      <LookbookGrid
        collectionProducts={collectionProducts}
        collectionImage={collection.image}
      />

      {/* ── SECTION 4: PIECES ── */}
      <PiecesSection collectionProducts={collectionProducts} />

      {/* ── SECTION 5: NEXT COLLECTION ── */}
      <NextCollectionTeaser nextCollection={nextCollection} />

      {/* ── SECTION 6: VISIT NUDGE ── */}
      <VisitNudge />
    </main>
  )
}
