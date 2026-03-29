import { useRef, useState, useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Diamond, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Check, Download } from 'lucide-react'

// Category tile images — reuse existing assets
import bridalImg from '../assets/categories/bridal.jpg'
import necklacesImg from '../assets/categories/necklaces.jpg'
import ringsImg from '../assets/categories/rings.jpg'
import banglesImg from '../assets/categories/bangles.jpg'
import earringsImg from '../assets/categories/earrings.jpg'

gsap.registerPlugin(ScrollTrigger)

// ─── Constants ──────────────────────────────────────────────────────
const INTERESTS = [
  { id: 'bridal', label: 'Bridal Jewellery', image: bridalImg },
  { id: 'high-jewellery', label: 'High Jewellery', image: necklacesImg },
  { id: 'everyday', label: 'Everyday Luxury', image: ringsImg },
  { id: 'custom', label: 'Custom Creation', image: banglesImg },
  { id: 'gift', label: 'Gift', image: earringsImg },
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '11 AM – 1 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '1 PM – 4 PM' },
  { id: 'evening', label: 'Evening', time: '4 PM – 7 PM' },
]

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const STEP_VARIANTS = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

// ─── Process Step Icons ─────────────────────────────────────────────
const PROCESS_STEPS = [
  { Icon: Calendar, label: 'Choose a Date' },
  { Icon: Diamond, label: 'Tell Us Your Interest' },
  { Icon: Sparkles, label: "We'll Prepare for You" },
]

// ─── Calendar Helpers ───────────────────────────────────────────────
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

// ─── ICS File Generator ─────────────────────────────────────────────
function generateICS(date, timeSlot, name) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const startHours = { morning: '11', afternoon: '13', evening: '16' }
  const endHours = { morning: '13', afternoon: '16', evening: '19' }

  const dtStart = `${year}${month}${day}T${startHours[timeSlot]}0000`
  const dtEnd = `${year}${month}${day}T${endHours[timeSlot]}0000`

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MAISON//Appointment//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Private Viewing at Maison`,
    `DESCRIPTION:Personal appointment for ${name} at the Maison Atelier.`,
    'LOCATION:Maison Atelier',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

// ═════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════════
function HeroSection() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const els = heroRef.current.querySelectorAll('[data-hero-animate]')
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15,
      }
    )

    // Gold line
    gsap.fromTo(
      heroRef.current.querySelector('[data-hero-line]'),
      { width: 0 },
      { width: 60, duration: 1.2, ease: 'expo.out', delay: 0.4 }
    )

    // Process icons
    const icons = heroRef.current.querySelectorAll('[data-process-icon]')
    gsap.fromTo(
      icons,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.7,
      }
    )
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative h-[50vh] min-h-[420px] flex flex-col items-center justify-center bg-background px-6"
    >
      <h1
        data-hero-animate
        className="font-primary uppercase tracking-[0.2em] text-text-light text-center opacity-0"
        style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
      >
        Book a Private Viewing
      </h1>

      <div data-hero-line className="h-[1px] bg-gold mt-6 mb-5 w-0" />

      <p
        data-hero-animate
        className="font-secondary text-[16px] text-text-muted text-center max-w-md opacity-0"
      >
        Your personal journey with Maison begins here
      </p>

      {/* Process steps */}
      <div className="flex items-start gap-10 md:gap-16 mt-12">
        {PROCESS_STEPS.map(({ Icon, label }) => (
          <div
            key={label}
            data-process-icon
            className="flex flex-col items-center gap-3 opacity-0"
          >
            <div className="w-12 h-12 border border-border-dark flex items-center justify-center">
              <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <span className="font-secondary text-[11px] tracking-[0.3em] uppercase text-text-muted text-center">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═════════════════════════════════════════════════════════════════════
// STEP 1 — INTEREST SELECTION
// ═════════════════════════════════════════════════════════════════════
function StepInterest({ selected, onSelect, productHint }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="font-primary uppercase tracking-[0.15em] text-text-light text-center text-[28px] md:text-[36px] mb-3">
        What brings you to Maison?
      </h2>
      {productHint && (
        <p className="font-secondary text-[13px] text-gold text-center mb-8">
          Interested in: <span className="capitalize">{productHint.replace(/-/g, ' ')}</span>
        </p>
      )}
      {!productHint && <div className="mb-10" />}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {INTERESTS.map((item) => {
          const isActive = selected === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`group relative overflow-hidden transition-all duration-500 ${
                isActive
                  ? 'border-gold ring-1 ring-gold scale-[1.02]'
                  : 'border-border-dark hover:border-gold/40'
              } border bg-background`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-secondary text-[12px] tracking-[0.2em] uppercase text-text-light">
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-gold flex items-center justify-center">
                  <Check className="w-4 h-4 text-background" strokeWidth={2.5} />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// STEP 2 — DATE & TIME
// ═════════════════════════════════════════════════════════════════════
function StepDateTime({ selectedDate, onDateSelect, selectedTime, onTimeSelect }) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    return d < today
  }

  const isSelected = (day) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    )
  }

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="font-primary uppercase tracking-[0.15em] text-text-light text-center text-[28px] md:text-[36px] mb-10">
        When would you like to visit?
      </h2>

      {/* Calendar */}
      <div className="max-w-sm mx-auto mb-12">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className={`w-10 h-10 flex items-center justify-center border border-border-dark transition-colors ${
              canGoPrev ? 'hover:border-gold text-text-light' : 'opacity-30 cursor-not-allowed text-text-muted'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-secondary text-[14px] tracking-[0.2em] uppercase text-text-light">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-10 h-10 flex items-center justify-center border border-border-dark hover:border-gold text-text-light transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-center font-secondary text-[11px] tracking-[0.15em] text-text-muted uppercase py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const past = isPast(day)
            const sel = isSelected(day)
            return (
              <button
                key={day}
                disabled={past}
                onClick={() => onDateSelect(new Date(viewYear, viewMonth, day))}
                className={`aspect-square flex items-center justify-center font-secondary text-[14px] transition-all duration-300 ${
                  past
                    ? 'text-text-muted/30 cursor-not-allowed'
                    : sel
                      ? 'bg-gold text-background'
                      : 'text-text-light hover:bg-gold/10'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {TIME_SLOTS.map((slot) => {
          const isActive = selectedTime === slot.id
          return (
            <button
              key={slot.id}
              onClick={() => onTimeSelect(slot.id)}
              className={`px-6 py-3 border transition-all duration-400 font-secondary text-[13px] tracking-[0.1em] ${
                isActive
                  ? 'bg-gold text-background border-gold'
                  : 'border-border-dark text-text-light hover:border-gold'
              }`}
            >
              <span className="block font-medium">{slot.label}</span>
              <span className={`block text-[11px] mt-0.5 ${isActive ? 'text-background/70' : 'text-text-muted'}`}>
                {slot.time}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// STEP 3 — PERSONAL DETAILS
// ═════════════════════════════════════════════════════════════════════
function StepDetails({ form, onChange }) {
  const inputClasses =
    'w-full bg-transparent border-b border-border-dark focus:border-gold outline-none font-secondary text-[15px] text-text-light py-3 px-0 transition-colors duration-400 placeholder:text-text-muted/50'

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="font-primary uppercase tracking-[0.15em] text-text-light text-center text-[28px] md:text-[36px] mb-10">
        Tell us about yourself
      </h2>

      <div className="space-y-8">
        <div>
          <label className="block font-secondary text-[11px] tracking-[0.3em] uppercase text-text-muted mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Alexandra Beaumont"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block font-secondary text-[11px] tracking-[0.3em] uppercase text-text-muted mb-2">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="alexandra@example.com"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block font-secondary text-[11px] tracking-[0.3em] uppercase text-text-muted mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+91 98765 43210"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block font-secondary text-[11px] tracking-[0.3em] uppercase text-text-muted mb-2">
            Message <span className="text-text-muted/50">(optional)</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={4}
            placeholder="Tell us about your vision, occasion, or anything we should know..."
            className={`${inputClasses} border border-border-dark focus:border-gold px-4 pt-3 resize-none`}
          />
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// STEP 4 — CONFIRMATION
// ═════════════════════════════════════════════════════════════════════
function StepConfirmation({ name, selectedDate, selectedTime }) {
  const confirmRef = useRef(null)
  const firstName = name.split(' ')[0] || 'there'

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Draw the circle
    tl.fromTo(
      confirmRef.current.querySelector('[data-check-circle]'),
      { strokeDashoffset: 283 },
      { strokeDashoffset: 0, duration: 1.2, ease: 'power4.out' }
    )
    // Draw the checkmark
    .fromTo(
      confirmRef.current.querySelector('[data-check-mark]'),
      { strokeDashoffset: 50 },
      { strokeDashoffset: 0, duration: 0.6, ease: 'power4.out' },
      '-=0.3'
    )
    // Fade in text
    .fromTo(
      confirmRef.current.querySelectorAll('[data-confirm-text]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.12 },
      '-=0.2'
    )
  }, { scope: confirmRef })

  const handleDownloadICS = useCallback(() => {
    const ics = generateICS(selectedDate, selectedTime, name)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'maison-viewing.ics'
    a.click()
    URL.revokeObjectURL(url)
  }, [selectedDate, selectedTime, name])

  const timeLabel = TIME_SLOTS.find((t) => t.id === selectedTime)

  return (
    <div ref={confirmRef} className="w-full max-w-lg mx-auto text-center">
      {/* Animated checkmark */}
      <div className="flex items-center justify-center mb-10">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle
            data-check-circle
            cx="45"
            cy="45"
            r="42"
            stroke="#C9A96E"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="283"
          />
          <polyline
            data-check-mark
            points="28,46 40,58 62,34"
            stroke="#C9A96E"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
        </svg>
      </div>

      <h2
        data-confirm-text
        className="font-primary uppercase tracking-[0.15em] text-text-light text-[28px] md:text-[36px] mb-4 opacity-0"
      >
        Thank you, {firstName}
      </h2>

      <p data-confirm-text className="font-secondary text-[15px] text-text-muted leading-relaxed mb-3 opacity-0">
        We&apos;ll confirm your private viewing within 24 hours.
      </p>

      {selectedDate && timeLabel && (
        <p data-confirm-text className="font-secondary text-[13px] text-gold mb-8 opacity-0">
          {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          {' · '}
          {timeLabel.label} ({timeLabel.time})
        </p>
      )}

      <div data-confirm-text className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
        <button
          onClick={handleDownloadICS}
          className="group flex items-center gap-2 px-8 py-3 border border-gold text-gold font-secondary text-[12px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-400"
        >
          <Download className="w-4 h-4" />
          Add to Calendar
        </button>

        <Link
          to="/collections"
          className="group flex items-center gap-2 px-8 py-3 bg-gold text-background font-secondary text-[12px] tracking-[0.2em] uppercase hover:bg-gold-hover transition-all duration-400"
        >
          Explore Collections
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════
export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams()
  const productHint = searchParams.get('product')

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [interest, setInterest] = useState(() => {
    // Pre-select based on URL params
    if (productHint) {
      if (productHint.includes('bridal')) return 'bridal'
      if (productHint.includes('heritage')) return 'high-jewellery'
      return 'high-jewellery'
    }
    return ''
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const goNext = () => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, 4))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return
    goNext()
  }

  const canContinue = () => {
    if (step === 1) return !!interest
    if (step === 2) return !!selectedDate && !!selectedTime
    if (step === 3) return !!form.name.trim() && !!form.email.trim()
    return false
  }

  const progressWidth = `${(step / 4) * 100}%`

  return (
    <>
      <HeroSection />

      {/* Form Section — cream bg */}
      <section className="relative bg-background-light min-h-screen">
        {/* Progress bar */}
        <div className="sticky top-0 z-30 h-[2px] bg-border-light">
          <motion.div
            className="h-full bg-gold"
            animate={{ width: progressWidth }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 pt-10 pb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center font-secondary text-[12px] border transition-all duration-400 ${
                  s === step
                    ? 'bg-gold border-gold text-background'
                    : s < step
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'border-border-light text-text-muted'
                }`}
              >
                {s < step ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-8 md:w-12 h-[1px] ${s < step ? 'bg-gold' : 'bg-border-light'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="px-6 md:px-12 py-12 md:py-16 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepInterest
                  selected={interest}
                  onSelect={setInterest}
                  productHint={productHint}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepDateTime
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepDetails form={form} onChange={handleFormChange} />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepConfirmation
                  name={form.name}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="px-6 md:px-12 pb-20 flex items-center justify-between max-w-3xl mx-auto">
            {step > 1 ? (
              <button
                onClick={goBack}
                className="group flex items-center gap-2 font-secondary text-[12px] tracking-[0.2em] uppercase text-text-dark hover:text-gold transition-colors duration-300"
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={step === 3 ? handleSubmit : goNext}
              disabled={!canContinue()}
              className={`group flex items-center gap-2 px-10 py-3.5 font-secondary text-[12px] tracking-[0.2em] uppercase transition-all duration-400 ${
                canContinue()
                  ? 'bg-gold text-background hover:bg-gold-hover'
                  : 'bg-gold/30 text-background/50 cursor-not-allowed'
              }`}
            >
              {step === 3 ? 'Request Appointment' : 'Continue'}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </section>
    </>
  )
}
