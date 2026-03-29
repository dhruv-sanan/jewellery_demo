import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VisitNudge from '../components/VisitNudge'
import SEO from '../components/SEO'

// Timeline images — drop files into src/assets/heritage/
import workshopImg from '../assets/heritage/heritage_workshop_1985.jpg'
import craftImg from '../assets/heritage/heritage_craft_1990s.jpg'
import showroomImg from '../assets/heritage/heritage_showroom_2010s.jpg'
import modernImg from '../assets/heritage/heritage_modern_today.jpg'

// Artisan portraits
import artisanRajesh from '../assets/heritage/artisan_rajesh.jpg'
import artisanMeera from '../assets/heritage/artisan_meera.jpg'
import artisanVikram from '../assets/heritage/artisan_vikram.jpg'

// Values images
import valueHandcrafted from '../assets/heritage/value_handcrafted.jpg'
import valueEthical from '../assets/heritage/value_ethical.jpg'
import valueTimeless from '../assets/heritage/value_timeless.jpg'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ──────────────────────────────────────────────────────────
const timelinePhases = [
  {
    year: '1985',
    title: 'The Beginning',
    text: 'In a modest workshop in Zaveri Bazaar, a young artisan began what would become a legacy. With nothing but raw talent, a borrowed set of tools, and an unshakeable belief in the beauty of handcrafted jewellery, the first Maison piece was born.',
    image: workshopImg,
  },
  {
    year: '1995',
    title: 'The Craft',
    text: 'What set us apart was never the gold — it was the hands that shaped it. Through the nineties, Maison became synonymous with kundan craftsmanship, attracting artisans from across Rajasthan who sought to preserve an art form that the modern world was forgetting.',
    image: craftImg,
  },
  {
    year: '2012',
    title: 'The Evolution',
    text: 'We brought traditional kundan craft to the world stage. Our showrooms in Mumbai and Delhi became destinations, and our pieces began appearing on red carpets and in the pages of Vogue. Yet the workshop in Zaveri Bazaar remained — and remains — our creative heart.',
    image: showroomImg,
  },
  {
    year: '2024',
    title: 'Today',
    text: 'Four generations later, each piece still begins the same way — with a master artisan\'s hands and an unwavering standard. We have grown, but we have not changed. The tools are finer, the stones rarer, but the promise is the same: perfection, or nothing.',
    image: modernImg,
  },
]

const values = [
  {
    title: 'Handcrafted',
    statement: 'Every piece touched by human hands, never mass-produced.',
    description:
      'In an age of automation, we remain stubbornly devoted to the human hand. Each Maison creation passes through the fingers of at least twelve master artisans, each contributing a lifetime of expertise to a single piece. There are no shortcuts. There is no substitute.',
    image: valueHandcrafted,
  },
  {
    title: 'Ethical',
    statement: 'Responsibly sourced, transparently crafted.',
    description:
      'Every diamond is conflict-free. Every gemstone is traceable to its origin. We work exclusively with mines and suppliers who meet our rigorous standards for environmental stewardship and fair labor practices. Luxury without conscience is not luxury at all.',
    image: valueEthical,
  },
  {
    title: 'Timeless',
    statement: 'Designed to outlive trends, built to become heirlooms.',
    description:
      'We do not follow seasons. Our designs draw from centuries of tradition and are meant to be worn for generations. A Maison piece purchased today will be as relevant and beautiful fifty years from now as it is at this moment.',
    image: valueTimeless,
  },
]

const artisans = [
  {
    name: 'Rajesh Soni',
    specialization: 'Master Kundan Setter',
    years: 38,
    quote: 'The stone tells you where it wants to sit. You just have to listen.',
    image: artisanRajesh,
  },
  {
    name: 'Meera Devi',
    specialization: 'Gemstone Specialist',
    years: 24,
    quote: 'I have examined a million stones. The perfect ones still make my heart stop.',
    image: artisanMeera,
  },
  {
    name: 'Vikram Joshi',
    specialization: 'Master Engraver',
    years: 16,
    quote: 'My grandfather taught my father, and my father taught me. The line does not break.',
    image: artisanVikram,
  },
]

const stats = [
  { value: 4, suffix: '', label: 'Generations' },
  { value: 1200, suffix: '+', label: 'Hours Per Piece' },
  { value: 40, suffix: '+', label: 'Years of Legacy' },
  { value: 15, suffix: '', label: 'Master Artisans' },
]

// ─── Hero Section ──────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    
    if (isMobile) {
      const el = heroRef.current
      const est = el.querySelector('.hero-est')
      const title = el.querySelector('.hero-title')
      const line = el.querySelector('.hero-line')
      const tagline = el.querySelector('.hero-tagline')
      const scroll = el.querySelector('.hero-scroll-indicator')

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
      heroTl
        .fromTo(est, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .fromTo(line, { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 0.7 }, 0.7)
        .fromTo(tagline, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.9)
        .fromTo(scroll, { opacity: 0 }, { opacity: 0.5, duration: 0.5 }, 1.2)
    } else {
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
    }
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative h-[85vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Gold particle mesh — CSS animated */}
      <div className="heritage-particles absolute inset-0 pointer-events-none md:block hidden" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          data-hero-animate
          className="hero-est font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-6"
        >
          Est. 1985
        </p>
        <h1
          data-hero-animate
          className="hero-title font-primary font-normal text-text-light uppercase tracking-[0.1em] mb-8 leading-[1.05]"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
        >
          Our Heritage
        </h1>
        <div
          data-hero-animate
          data-gold-line
          className="hero-line h-px bg-gold mb-8 mx-auto w-[60px]"
        />
        <p
          data-hero-animate
          className="hero-tagline font-primary italic text-[17px] md:text-[24px] text-gold leading-[1.6] max-w-[300px] md:max-w-[650px]"
        >
          Four generations. One unwavering pursuit of perfection.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        data-scroll-indicator
        className="hero-scroll-indicator absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
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
  )
}

// ─── Timeline Section (Pinned, Apple-style) ────────────────────────
function TimelineSection() {
  const sectionRef = useRef(null)
  // Initialize isMobile CORRECTLY so the desktop pinned timeline is never
  // created on mobile.  useState(false) caused a phantom desktop render →
  // pin-spacer → stale layout for chapters 2-4 ScrollTrigger positions.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop: pinned scroll with crossfade + word-by-word teleprompter
  useGSAP(() => {
    if (isMobile) return

    const phases = sectionRef.current.querySelectorAll('[data-timeline-phase]')
    const yearEl = sectionRef.current.querySelector('[data-year-counter]')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // ── First phase: fade in heading elements, then teleprompter ──
    const firstHeadingEls = phases[0].querySelectorAll('[data-animate]')
    const firstWordEls = phases[0].querySelectorAll('[data-tp-word]')

    tl.fromTo(firstHeadingEls, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, ease: 'power4.out', stagger: 0.08,
    })

    // Word-by-word teleprompter for first phase
    tl.fromTo(firstWordEls,
      { color: '#222' },
      { color: '#999', stagger: 0.012, duration: 0.8, ease: 'none' },
      '-=0.1',
    )

    // Hold
    tl.to({}, { duration: 1.0 })

    // ── Crossfade between phases ──
    for (let i = 0; i < phases.length - 1; i++) {
      const currentPhase = phases[i]
      const nextPhase = phases[i + 1]
      const nextHeadingEls = nextPhase.querySelectorAll('[data-animate]')
      const nextWordEls = nextPhase.querySelectorAll('[data-tp-word]')

      // Fade out current phase
      tl.to(currentPhase, { opacity: 0, duration: 0.8, ease: 'power2.inOut' })

      // Update year counter
      tl.to(yearEl, {
        innerText: timelinePhases[i + 1].year,
        duration: 0.01,
        snap: { innerText: 1 },
      }, '<')

      // Fade in next phase
      tl.fromTo(nextPhase, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, '<0.3')

      // Heading elements slide up
      tl.fromTo(nextHeadingEls, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.4, ease: 'power4.out', stagger: 0.06,
      }, '<0.2')

      // Word-by-word teleprompter for this phase
      tl.fromTo(nextWordEls,
        { color: '#222' },
        { color: '#999', stagger: 0.012, duration: 0.8, ease: 'none' },
        '-=0.1',
      )

      // Hold
      tl.to({}, { duration: 1.0 })
    }
  }, { scope: sectionRef, dependencies: [isMobile] })

  // Mobile: simple trigger-based animations — NO pins, NO pin-spacers
  useGSAP(() => {
    if (!isMobile) return
    const root = sectionRef.current
    if (!root) return

    // Image fade-in per chapter
    root.querySelectorAll('.m-chapter-image').forEach((img) => {
      gsap.fromTo(img,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1, scale: 1,
          duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Chapter meta elements fade-in
    root.querySelectorAll('.m-chapter-meta').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Teleprompter word-by-word reveal per chapter text block.
    // Uses explicit timeline + ScrollTrigger.create for reliability.
    // Trigger = the <p> element itself (tight scroll range, not the whole card).
    root.querySelectorAll('.tp-container').forEach((container) => {
      const words = container.querySelectorAll('.tp-word')
      if (!words.length) return

      const tl = gsap.timeline()
      tl.fromTo(words,
        { color: '#2A2A2A', opacity: 0.25 },
        { color: '#CCCCCC', opacity: 1, stagger: 0.03, ease: 'none' }
      )

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 0.3,
        animation: tl,
        invalidateOnRefresh: true,
      })
    })

    // Belt-and-suspenders: refresh positions after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh(true))
    })
  }, { scope: sectionRef, dependencies: [isMobile] })

  if (isMobile) {
    return (
      <section ref={sectionRef} className="relative bg-[#0A0A0A]">
        {timelinePhases.map((phase, i) => (
          <div key={i}>
            {/* Image — full width, 50vh */}
            <div className="m-chapter-image relative w-full h-[50vh] overflow-hidden">
              <img
                src={phase.image}
                alt={phase.title}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <span className="absolute bottom-3 right-5 font-primary text-[64px] text-white/[0.05] font-light leading-none select-none pointer-events-none">
                {phase.year}
              </span>
            </div>

            {/* Content — BELOW the image, dark background */}
            <div className="px-6 pt-6 pb-12 bg-[#0A0A0A]">
              <p className="m-chapter-meta font-secondary text-[11px] tracking-[0.25em] text-[#C9A96E] uppercase mb-2">
                Chapter {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="m-chapter-meta font-primary text-[24px] text-[#FAFAFA] uppercase tracking-[0.1em] mb-1 leading-[1.1]">
                {phase.title}
              </h3>
              <div className="w-10 h-[1px] bg-[#C9A96E] mb-5" />

              {/* Teleprompter text — word-by-word scroll reveal */}
              <p className="tp-container font-secondary text-[15px] leading-[1.85] tracking-wide">
                {phase.text.split(' ').map((word, j, arr) => (
                  <span
                    key={j}
                    className="tp-word"
                    style={{ color: '#2A2A2A', opacity: 0.25 }}
                  >
                    {word}{j < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
            </div>

            {/* Gold divider between chapters */}
            {i < timelinePhases.length - 1 && (
              <div className="flex justify-center py-1 bg-[#0A0A0A]">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A96E]/30 via-[#C9A96E]/10 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-background overflow-hidden"
    >
      {/* Large year counter — background watermark */}
      <span
        data-year-counter
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-primary text-[200px] md:text-[300px] lg:text-[400px] text-[#1A1A1A] leading-none select-none pointer-events-none z-0"
      >
        {timelinePhases[0].year}
      </span>

      {/* Phase overlays */}
      {timelinePhases.map((phase, i) => (
        <div
          key={i}
          data-timeline-phase
          className="absolute inset-0 flex items-center"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 md:px-16 flex items-center gap-12 lg:gap-20">
            {/* Image side */}
            <div className="w-[55%] h-[65vh] overflow-hidden relative flex-shrink-0">
              <img
                data-parallax-image
                src={phase.image}
                alt={phase.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-[110%] object-cover will-change-transform"
                style={{ top: '-5%' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60" />
            </div>

            {/* Text side */}
            <div className="w-[45%] relative z-10">
              <p data-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                Chapter {String(i + 1).padStart(2, '0')}
              </p>
              <h3 data-animate className="font-primary text-[36px] lg:text-[48px] text-text-light uppercase tracking-[0.1em] mb-3 leading-[1.1]">
                {phase.title}
              </h3>
              <div data-animate className="w-[40px] h-px bg-gold mb-6" />
              <p className="font-secondary text-[15px] leading-[1.9] max-w-[420px]">
                {phase.text.split(' ').map((word, j, arr) => (
                  <span key={j} data-tp-word style={{ color: '#222' }}>
                    {word}{j < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Phase indicator dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {timelinePhases.map((phase, i) => (
          <div
            key={i}
            className="flex items-center gap-3"
          >
            <span className="font-secondary text-[10px] tracking-[0.2em] text-[#666] uppercase">
              {phase.year}
            </span>
            <div className="w-2 h-2 border border-[#444] bg-transparent" />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Values Section (Cream bg) ─────────────────────────────────────
function ValuesSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      const cards = sectionRef.current.querySelectorAll('.value-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    } else {
      const cards = sectionRef.current.querySelectorAll('[data-value-card]')
      cards.forEach((card) => {
        const els = card.querySelectorAll('[data-animate]')
        const line = card.querySelector('[data-gold-line]')
        const img = card.querySelector('[data-value-image]')

        gsap.fromTo(els, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
        })

        if (line) {
          gsap.fromTo(line, { width: 0 }, {
            width: 40,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }

        if (img) {
          gsap.fromTo(img, { scale: 1 }, {
            scale: 1.05,
            duration: 10,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
          })
        }
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-background-light py-20 md:py-40">
      <div className="px-6 md:px-0 md:max-w-6xl md:mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-3">
            What We Stand For
          </p>
          <h2 className="font-primary text-[36px] md:text-[52px] text-text-dark uppercase tracking-[0.1em]">
            Our Values
          </h2>
        </div>

        {/* Values cards — vertical on mobile */}
        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
          {values.map((val, i) => (
            <div key={i} data-value-card className="value-card flex flex-col">
              {/* Image */}
              <div className="w-full h-[240px] md:aspect-[4/3] md:h-auto overflow-hidden mb-6 md:mb-8">
                <img
                  data-value-image
                  src={val.image}
                  alt={val.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover will-change-transform"
                />
              </div>

              {/* Gold line */}
              <div
                data-gold-line
                className="w-10 h-[1px] bg-gold mb-5 md:mb-6"
              />

              {/* Content */}
              <h3 data-animate className="font-primary text-[28px] md:text-[32px] text-text-dark uppercase tracking-[0.15em] mb-2 md:mb-3 leading-[1.1]">
                {val.title}
              </h3>
              <p data-animate className="font-primary italic text-[15px] md:text-[18px] text-gold leading-[1.5] mb-4">
                {val.statement}
              </p>
              <p data-animate className="font-secondary text-[14px] text-[#666] leading-[1.8] md:leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Artisans Section ──────────────────────────────────────────────
function ArtisansSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      const cards = sectionRef.current.querySelectorAll('.artisan-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    } else {
      // Header reveal
      const headerEls = sectionRef.current.querySelectorAll('[data-header-animate]')
      gsap.fromTo(headerEls, { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })

      // Card reveals with parallax on portraits
      const cards = sectionRef.current.querySelectorAll('[data-artisan-card]')
      cards.forEach((card) => {
        const portrait = card.querySelector('[data-portrait]')
        const els = card.querySelectorAll('[data-animate]')

        if (portrait) {
          gsap.fromTo(portrait, { yPercent: -8 }, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }

        gsap.fromTo(els, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
        })
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-background py-section px-6 md:px-12 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <p data-header-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
          The Hands Behind the Art
        </p>
        <h2
          data-header-animate
          className="font-primary text-text-light uppercase tracking-[0.1em] leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Master Artisans
        </h2>
        <p data-header-animate className="font-secondary text-[15px] text-[#888] leading-[1.8] max-w-[600px] mx-auto">
          Meet the artisans who carry forward centuries of tradition,
          each one a guardian of techniques passed down through generations.
        </p>
      </div>

      {/* Artisan cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
        {artisans.map((artisan, i) => (
          <div key={i} data-artisan-card className="artisan-card flex flex-col items-center text-center">
            {/* Portrait — circular crop with overflow for parallax */}
            <div className="w-[200px] h-[200px] overflow-hidden mb-8 relative" style={{ clipPath: 'circle(50% at 50% 50%)' }}>
              <img
                data-portrait
                src={artisan.image}
                alt={artisan.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-[130%] object-cover will-change-transform"
                style={{ top: '-15%' }}
              />
            </div>

            <h3 data-animate className="font-primary text-[24px] text-text-light uppercase tracking-[0.1em] mb-1 leading-[1.2]">
              {artisan.name}
            </h3>
            <p data-animate className="font-secondary text-[12px] tracking-[0.2em] text-gold uppercase mb-2">
              {artisan.specialization}
            </p>
            <p data-animate className="font-secondary text-[13px] text-[#666] mb-6">
              {artisan.years} years of experience
            </p>

            {/* Quote */}
            <div data-animate className="relative pl-8 pr-14 md:px-4">
              <span className="font-primary text-[48px] text-gold/20 absolute -top-4 left-0 md:-left-1 leading-none select-none">
                &ldquo;
              </span>
              <p className="font-primary italic text-[16px] text-[#aaa] leading-[1.7]">
                {artisan.quote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Numbers Section ───────────────────────────────────────────────
function NumbersSection() {
  const sectionRef = useRef(null)
  const numbersRef = useRef([])

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // Header animation for both
    const headerEls = sectionRef.current.querySelectorAll('[data-header-animate]')
    gsap.fromTo(headerEls, { y: 30, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    })

    if (isMobile) {
      const counterEls = sectionRef.current.querySelectorAll('.counter-value');
      counterEls.forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';

        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el.closest('.counters-section'),
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function() {
              el.textContent = Math.round(parseFloat(this.targets()[0].innerText)).toLocaleString() + suffix;
            }
          }
        );
      });

      const statBlocks = sectionRef.current.querySelectorAll('[data-stat-block]')
      gsap.fromTo(statBlocks, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    } else {
      // Number counters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          numbersRef.current.forEach((el, index) => {
            if (!el) return
            const target = stats[index].value
            const suffix = stats[index].suffix

            gsap.fromTo(
              el,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2.5,
                ease: 'power3.out',
                snap: { innerText: 1 },
                delay: index * 0.15,
                onUpdate() {
                  const current = Math.round(parseFloat(el.innerText))
                  el.innerText = current.toLocaleString() + suffix
                },
              }
            )
          })
        },
      })

      // Fade in stat blocks
      const statBlocks = sectionRef.current.querySelectorAll('[data-stat-block]')
      gsap.fromTo(statBlocks, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="counters-section relative bg-background py-section px-6 md:px-12">
      {/* Subtle gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p data-header-animate className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
            By The Numbers
          </p>
          <h2
            data-header-animate
            className="font-primary text-text-light uppercase tracking-[0.1em] leading-[1.1]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            A Legacy in Numbers
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} data-stat-block className="flex flex-col items-center text-center">
              <div
                ref={(el) => (numbersRef.current[i] = el)}
                data-target={stat.value}
                data-suffix={stat.suffix}
                className="counter-value font-primary text-text-light leading-none mb-4"
                style={{ fontSize: 'clamp(56px, 8vw, 100px)' }}
              >
                0
              </div>
              <div className="w-[30px] h-px bg-gold mb-4" />
              <p className="font-secondary text-[13px] text-[#888] uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Heritage Page (Main) ──────────────────────────────────────────
export default function HeritagePage() {
  return (
    <main className="bg-background">
      <SEO
        title="Heritage"
        description="Since 1985, MAISON has been crafting exquisite jewellery in Mumbai. Discover our legacy of master artisans, ethical sourcing, and timeless design."
        path="/heritage"
      />
      <HeroSection />
      <TimelineSection />

      {/* Transition gradient */}
      <div className="h-24 bg-gradient-to-b from-background to-background-light w-full" />

      <ValuesSection />

      {/* Transition gradient */}
      <div className="h-24 bg-gradient-to-b from-background-light to-background w-full" />

      <ArtisansSection />
      <NumbersSection />
      <VisitNudge />
    </main>
  )
}
