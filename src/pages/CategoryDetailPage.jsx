import { useRef, useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories, products, collections } from '../data/jewelleryData'
import ProductModal from '../components/ProductModal'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger)

// ─── Helpers ───────────────────────────────────────────────────────
const ITEMS_PER_BATCH = 12

const FILTER_TAGS = ['All', 'Gold', 'Diamond', 'Platinum', 'Bridal']

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0
}

function matchesFilter(product, filter) {
  if (filter === 'All') return true
  const mat = product.material.toLowerCase()
  const cat = product.category.toLowerCase()
  switch (filter) {
    case 'Gold':
      return mat.includes('gold')
    case 'Diamond':
      return mat.includes('diamond')
    case 'Platinum':
      return mat.includes('platinum')
    case 'Bridal':
      return cat === 'bridal'
    default:
      return true
  }
}

function sortProducts(arr, sortBy) {
  const sorted = [...arr]
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id)
    case 'price-asc':
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    case 'price-desc':
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    default:
      return sorted
  }
}

// ─── Product Card ──────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  const collection = collections.find((c) => c.slug === product.collection)

  return (
    <button
      onClick={() => onClick(product)}
      className="group relative block w-full text-left cursor-pointer"
    >
      {/* Desktop: hover-reveal card */}
      <div className="hidden md:block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* NEW badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 font-secondary text-[9px] tracking-[0.2em] uppercase bg-gold text-background px-2.5 py-1 z-10">
              New
            </span>
          )}

          {/* Hover overlay — bottom 40% */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <h3 className="font-primary text-[17px] text-text-light font-normal uppercase tracking-[0.05em] leading-[1.2] mb-1">
              {product.name}
            </h3>
            <p className="font-secondary text-[11px] text-[#CCC] tracking-wide mb-1.5">
              {product.material}
            </p>
            <p className="font-primary text-[15px] text-gold font-normal">
              {product.price}
            </p>
          </div>

          {/* Hover gold border */}
          <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Mobile: always-visible info */}
      <div className="md:hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 font-secondary text-[9px] tracking-[0.2em] uppercase bg-gold text-background px-2 py-0.5 z-10">
              New
            </span>
          )}
        </div>
        <div className="pt-3 pb-1">
          <h3 className="font-primary text-[15px] text-text-light font-normal uppercase tracking-[0.05em] leading-[1.2] mb-1">
            {product.name}
          </h3>
          <p className="font-secondary text-[11px] text-[#999] tracking-wide mb-1">
            {product.material}
          </p>
          <p className="font-primary text-[14px] text-gold font-normal">
            {product.price}
          </p>
        </div>
      </div>
    </button>
  )
}

// ─── Custom Sort Dropdown ──────────────────────────────────────────
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeLabel = SORT_OPTIONS.find((o) => o.value === value)?.label

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-secondary text-[12px] tracking-[0.1em] text-[#999] hover:text-text-light transition-colors duration-300"
      >
        <span>{activeLabel}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[#141414] border border-border-dark min-w-[180px] z-20">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`block w-full text-left px-4 py-3 font-secondary text-[12px] tracking-wide transition-colors duration-200 ${
                value === opt.value
                  ? 'text-gold bg-[#1A1A1A]'
                  : 'text-[#999] hover:text-text-light hover:bg-[#1A1A1A]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Category Detail Page ──────────────────────────────────────────
export default function CategoryDetailPage() {
  const { slug } = useParams()
  const category = categories.find((c) => c.slug === slug)

  // State
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH)
  const [modalProduct, setModalProduct] = useState(null)

  // Refs
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const sentinelRef = useRef(null)

  // All products for this category
  const allCategoryProducts = products.filter((p) => p.category === slug)

  // Filtered + sorted
  const filtered = sortProducts(
    allCategoryProducts.filter((p) => matchesFilter(p, activeFilter)),
    sortBy
  )

  const visibleProducts = filtered.slice(0, visibleCount)
  const allLoaded = visibleCount >= filtered.length
  const totalFiltered = filtered.length

  // Reset visible count when filter or sort changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH)
  }, [activeFilter, sortBy])

  // ── IntersectionObserver for auto-load ───────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || allLoaded) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_BATCH)
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [allLoaded, filtered.length])

  // ── Hero animation ───────────────────────────────────────────────
  useGSAP(() => {
    if (!heroRef.current) return
    const hero = heroRef.current
    const imgInner = hero.querySelector('[data-parallax-image]')
    const textEls = hero.querySelectorAll('[data-hero-animate]')

    // Parallax on hero image
    if (imgInner) {
      gsap.fromTo(
        imgInner,
        { yPercent: -5 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    // Staggered text
    gsap.fromTo(
      textEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
        delay: 0.3,
      }
    )

    // Gold line
    const line = hero.querySelector('[data-gold-line]')
    if (line) {
      gsap.fromTo(line, { width: 0 }, { width: 50, duration: 1.2, ease: 'expo.out', delay: 0.7 })
    }
  }, { scope: heroRef, dependencies: [slug] })

  // ── Grid card animations (ScrollTrigger.batch) ───────────────────
  useGSAP(() => {
    if (!gridRef.current) return

    // Delay past the Layout page-entry animation (850ms) so
    // ScrollTrigger calculates positions at the final y:0 state.
    const timer = setTimeout(() => {
      const cards = gridRef.current.querySelectorAll('[data-product-card]')
      if (!cards.length) return

      // Set initial state
      gsap.set(cards, { y: 40, opacity: 0 })

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.08,
          })
        },
        start: 'top 95%',
      })

      // Refresh after positions are set so in-viewport cards trigger immediately
      ScrollTrigger.refresh(true)
    }, 900)

    return () => clearTimeout(timer)
  }, { scope: gridRef, dependencies: [visibleCount, activeFilter, sortBy] })

  // ── Close modal handler ──────────────────────────────────────────
  const handleCloseModal = useCallback(() => {
    setModalProduct(null)
  }, [])

  const handleCardClick = useCallback((product) => {
    setModalProduct(product)
  }, [])

  // ── 404 guard ────────────────────────────────────────────────────
  if (!category) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-primary text-[48px] text-text-light uppercase tracking-[0.1em] mb-4">
            Category Not Found
          </h1>
          <Link
            to="/categories"
            className="font-secondary text-[14px] text-gold tracking-wide hover:text-gold-hover transition-colors"
          >
            Back to Categories &rarr;
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <SEO
        title={category.name}
        description={`Shop MAISON's ${category.name.toLowerCase()} collection. Exquisite handcrafted pieces in gold, diamond, and platinum.`}
        image={category.image}
        path={`/categories/${slug}`}
      />
      {/* ── SECTION 1: CATEGORY HERO (50vh) ── */}
      <section
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            data-parallax-image
            src={category.image}
            alt={category.name}
            decoding="async"
            className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
            style={{ top: '-10%' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.8) 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1
            data-hero-animate
            className="font-primary font-normal text-text-light uppercase tracking-[0.12em] mb-4 leading-[1]"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            {category.name}
          </h1>
          <div className="flex items-center gap-4 mb-0">
            <div data-gold-line className="h-px bg-gold" style={{ width: 0 }} />
            <p
              data-hero-animate
              className="font-secondary text-[13px] tracking-[0.2em] text-gold uppercase"
            >
              {category.count}
            </p>
            <div data-gold-line className="h-px bg-gold" style={{ width: 0 }} />
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-[65px] z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-border-dark">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          {/* Filter pills — horizontal scroll on mobile */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`font-secondary text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 whitespace-nowrap ${
                    activeFilter === tag
                      ? 'bg-gold text-background border-gold'
                      : 'bg-transparent text-[#999] border-[#333] hover:border-gold hover:text-text-light'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="flex-shrink-0">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: PRODUCT GRID ── */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Count */}
          <p className="font-secondary text-[12px] tracking-[0.1em] text-[#666] pt-8 pb-6">
            Showing {Math.min(visibleCount, totalFiltered)} of {totalFiltered} pieces
          </p>

          {/* Grid */}
          {totalFiltered > 0 ? (
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pb-12"
            >
              {visibleProducts.map((product) => (
                <div key={product.id} data-product-card>
                  <ProductCard product={product} onClick={handleCardClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-secondary text-[15px] text-[#666] tracking-wide">
                No pieces match this filter
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 font-secondary text-[13px] text-gold tracking-wide hover:text-gold-hover transition-colors"
              >
                Clear filter &rarr;
              </button>
            </div>
          )}

          {/* Load more sentinel */}
          {!allLoaded && totalFiltered > 0 && (
            <div className="flex flex-col items-center pb-16">
              <div ref={sentinelRef} className="w-full h-px" />
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_BATCH)}
                className="group inline-flex items-center gap-2 font-secondary text-[13px] tracking-[0.15em] uppercase text-gold border border-gold px-8 py-4 transition-all duration-500 hover:bg-gold hover:text-background"
              >
                <span>Load More</span>
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
              </button>
            </div>
          )}

          {/* All loaded message */}
          {allLoaded && totalFiltered > 0 && (
            <div className="flex flex-col items-center pb-20 pt-4">
              <div className="w-12 h-px bg-border-dark mb-6" />
              <p className="font-secondary text-[13px] text-[#555] tracking-wide text-center">
                You&apos;ve seen all {totalFiltered} pieces in {category.name}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── PRODUCT MODAL ── */}
      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={handleCloseModal}
      />
    </main>
  )
}
