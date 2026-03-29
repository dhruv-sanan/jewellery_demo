import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger)

// ─── Contact methods data ─────────────────────────────────────────
const contactMethods = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Visit Our Atelier',
    lines: [
      '14 Altamount Road, South Mumbai',
      'Maharashtra 400026, India',
    ],
    note: 'By Appointment Only',
    link: { to: '/atelier', label: 'View Atelier →' },
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Call Us',
    lines: ['+91 22 1234 5678'],
    note: 'Mon–Sat, 11 AM – 7 PM IST',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Write to Us',
    lines: ['hello@maison.in'],
    note: 'We respond within 24 hours',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    title: 'WhatsApp',
    lines: ['+91 98XXX XXXXX'],
    note: 'For quick inquiries',
    externalLink: {
      href: 'https://wa.me/919800000000',
      label: 'Chat on WhatsApp →',
    },
  },
]

const subjectOptions = [
  'General Inquiry',
  'Bridal Consultation',
  'Bespoke Creation',
  'Private Viewing',
  'Press & Media',
  'Careers',
]

export default function ContactPage() {
  const heroRef = useRef(null)
  const splitRef = useRef(null)
  const ctaRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  // ─── Hero animation ──────────────────────────────────────────────
  useGSAP(() => {
    const els = heroRef.current.querySelectorAll('[data-hero-animate]')
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2,
      }
    )
  }, { scope: heroRef })

  // ─── Contact cards stagger ───────────────────────────────────────
  useGSAP(() => {
    const cards = splitRef.current.querySelectorAll('[data-contact-card]')
    gsap.fromTo(
      cards,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: splitRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    const formEls = splitRef.current.querySelectorAll('[data-form-animate]')
    gsap.fromTo(
      formEls,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: splitRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: splitRef })

  // ─── Bottom CTA animation ───────────────────────────────────────
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

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    // Animate success state
    if (formRef.current) {
      const tl = gsap.timeline()
      tl.to(formRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
      })
      tl.set(formRef.current, { display: 'none' })
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with MAISON Fine Jewellery. Visit our atelier at 14 Altamount Road, Mumbai, or book a private appointment."
        path="/contact"
      />
      {/* ═══ SECTION 1 — HERO ═══ */}
      <section
        ref={heroRef}
        className="relative bg-background flex items-center justify-center"
        style={{ height: '60vh', padding: '0 24px' }}
      >
        {/* Subtle gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,169,110,0.03) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 text-center">
          <p
            data-hero-animate
            className="font-secondary text-[11px] text-gold uppercase tracking-[0.3em] mb-6"
          >
            Maison
          </p>
          <h1
            data-hero-animate
            className="font-primary text-text-light font-normal uppercase tracking-[0.15em] leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            Get in Touch
          </h1>
          <div
            data-hero-animate
            className="w-0 h-[1px] bg-gold mx-auto mb-6"
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  width: 60,
                  duration: 1,
                  ease: 'power4.out',
                  delay: 0.6,
                })
              }
            }}
          />
          <p
            data-hero-animate
            className="font-secondary text-[16px] text-[#888] tracking-wide"
          >
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* ═══ SECTION 2 — CONTACT SPLIT ═══ */}
      <section
        ref={splitRef}
        className="relative bg-background-light"
        style={{ padding: '120px 24px' }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* LEFT — Contact Methods */}
          <div className="flex flex-col gap-8">
            <div data-contact-card className="mb-2">
              <p className="font-secondary text-[11px] text-gold uppercase tracking-[0.3em] mb-3">
                How to Reach Us
              </p>
              <h2 className="font-primary text-[28px] md:text-[36px] text-text-dark font-normal uppercase tracking-[0.1em] leading-[1.2]">
                At Your Service
              </h2>
            </div>

            {contactMethods.map((method, i) => (
              <div
                key={i}
                data-contact-card
                className="group relative border-l-2 border-gold pl-6 py-4 transition-transform duration-500 hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-0.5 flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-primary text-[20px] text-text-dark uppercase tracking-[0.08em] mb-2">
                      {method.title}
                    </h3>
                    {method.lines.map((line, j) => (
                      <p
                        key={j}
                        className="font-secondary text-[15px] text-text-dark leading-[1.7]"
                      >
                        {line}
                      </p>
                    ))}
                    <p className="font-secondary text-[13px] text-text-muted mt-1 tracking-wide">
                      {method.note}
                    </p>
                    {method.link && (
                      <Link
                        to={method.link.to}
                        className="group/link inline-block relative font-secondary text-[13px] text-gold mt-3 tracking-wide"
                      >
                        <span>{method.link.label}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover/link:w-full" />
                      </Link>
                    )}
                    {method.externalLink && (
                      <a
                        href={method.externalLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-block relative font-secondary text-[13px] text-gold mt-3 tracking-wide"
                      >
                        <span>{method.externalLink.label}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover/link:w-full" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Contact Form */}
          <div>
            <div data-form-animate className="mb-8">
              <p className="font-secondary text-[11px] text-gold uppercase tracking-[0.3em] mb-3">
                Send a Message
              </p>
              <h2 className="font-primary text-[28px] md:text-[36px] text-text-dark font-normal uppercase tracking-[0.1em] leading-[1.2]">
                We're Listening
              </h2>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div data-form-animate>
                <label className="block font-secondary text-[12px] text-text-muted uppercase tracking-[0.15em] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light text-text-dark font-secondary text-[15px] py-3 outline-none focus:border-gold transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div data-form-animate>
                <label className="block font-secondary text-[12px] text-text-muted uppercase tracking-[0.15em] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light text-text-dark font-secondary text-[15px] py-3 outline-none focus:border-gold transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div data-form-animate>
                <label className="block font-secondary text-[12px] text-text-muted uppercase tracking-[0.15em] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light text-text-dark font-secondary text-[15px] py-3 outline-none focus:border-gold transition-colors duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div data-form-animate>
                <label className="block font-secondary text-[12px] text-text-muted uppercase tracking-[0.15em] mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light text-text-dark font-secondary text-[15px] py-3 outline-none focus:border-gold transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23666\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 4px center',
                  }}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div data-form-animate>
                <label className="block font-secondary text-[12px] text-text-muted uppercase tracking-[0.15em] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light text-text-dark font-secondary text-[15px] py-3 outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <div data-form-animate className="mt-2">
                <button
                  type="submit"
                  className="font-secondary text-[14px] text-background bg-gold px-10 py-4 uppercase tracking-[0.15em] transition-all duration-500 hover:bg-gold-hover"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Success state */}
            {submitted && (
              <div className="mt-12 text-center py-16">
                <div className="inline-block mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gold mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-primary text-[24px] text-text-dark uppercase tracking-[0.1em] mb-3">
                  Message Received
                </h3>
                <p className="font-secondary text-[15px] text-text-muted leading-[1.7] max-w-md mx-auto">
                  Thank you for reaching out. A member of our team will respond
                  within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — BOOK APPOINTMENT CTA ═══ */}
      <section
        ref={ctaRef}
        className="relative bg-background overflow-hidden"
        style={{ padding: '160px 24px' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <p
            data-cta-animate
            className="font-secondary text-[11px] text-gold uppercase tracking-[0.3em] mb-6"
          >
            Private Appointments
          </p>
          <h2
            data-cta-animate
            className="font-primary text-[28px] md:text-[42px] text-text-light font-normal uppercase tracking-[0.1em] mb-6 leading-[1.2]"
          >
            Book a Private Appointment
          </h2>
          <p
            data-cta-animate
            className="font-secondary text-[15px] text-[#888] leading-[1.8] mb-10 max-w-xl"
          >
            For bridal consultations, bespoke creations, and private viewings
          </p>
          <div data-cta-animate className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/book-appointment"
              className="inline-block font-secondary text-[14px] text-background bg-gold px-10 py-4 uppercase tracking-[0.15em] transition-all duration-500 hover:bg-gold-hover"
            >
              Schedule Your Visit
            </Link>
            <Link
              to="/atelier"
              className="group inline-flex items-center gap-2 font-secondary text-[14px] text-gold border border-gold px-10 py-4 uppercase tracking-[0.15em] transition-all duration-500 hover:bg-gold hover:text-background"
            >
              <span>Explore the Atelier</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
