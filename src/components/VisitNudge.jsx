import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VisitNudge({
  title = "Some Pieces Must Be Experienced in Person",
  description = "Our latest creations await you at the Maison Atelier",
  primaryBtnText = "Book a Private Viewing",
  primaryBtnLink = "/book-appointment",
  secondaryBtnText = "Explore the Atelier",
  secondaryBtnLink = "/atelier",
  hideSecondaryBtn = false
}) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const els = sectionRef.current.querySelectorAll('[data-nudge-animate]')
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
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ padding: '160px 24px' }}
    >
      {/* Subtle gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2
          data-nudge-animate
          className="font-primary text-[28px] md:text-[36px] text-text-light font-normal uppercase tracking-[0.1em] mb-6 leading-[1.2]"
        >
          {title}
        </h2>
        <p
          data-nudge-animate
          className="font-secondary text-[15px] text-[#888] leading-[1.8] mb-10"
        >
          {description}
        </p>
        <div
          data-nudge-animate
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to={primaryBtnLink}
            className="font-secondary text-[14px] text-background bg-gold px-8 py-4 tracking-wide transition-all duration-500 hover:bg-gold-hover"
          >
            {primaryBtnText}
          </Link>
          {!hideSecondaryBtn && (
            <Link
              to={secondaryBtnLink}
              className="group inline-flex items-center gap-2 font-secondary text-[14px] text-gold border border-gold px-8 py-4 tracking-wide transition-all duration-500 hover:bg-gold hover:text-background"
            >
              <span>{secondaryBtnText}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
