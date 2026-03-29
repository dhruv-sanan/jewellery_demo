import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CraftsmanshipSection = () => {
  const sectionRef = useRef(null);
  const numbersRef = useRef([]);
  const horizontalScrollRef = useRef(null);
  const stepsRef = useRef([]);
  const finalPromiseRef = useRef(null);
  const lineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
      const animateNumbers = () => {
        numbersRef.current.forEach((el, index) => {
          if (!el) return;
          const endValue = parseFloat(el.getAttribute('data-target').replace(/,/g, ''));
          const isPercentage = el.getAttribute('data-target').includes('%');
          const hasPlus = el.getAttribute('data-target').includes('+');
          const hasComma = el.getAttribute('data-target').includes(',');

          const formatNumber = (val) => {
            let formatted = Math.round(val).toString();
            if (hasComma) {
              formatted = Number(formatted).toLocaleString();
            }
            if (hasPlus) formatted += '+';
            if (isPercentage) formatted += '%';
            return formatted;
          };

          gsap.to(el, {
            innerHTML: endValue,
            duration: 2,
            ease: 'power3.out',
            snap: { innerHTML: 1 },
            delay: index * 0.2,
            onUpdate: function () {
              el.innerHTML = formatNumber(this.targets()[0].innerHTML);
            }
          });
        });
      };

      if (isMobile) {
        ScrollTrigger.create({
          trigger: '.phase-1',
          start: 'top 80%',
          fastScrollEnd: true,
          onEnter: animateNumbers
        });

        // Header animation for mobile
        gsap.fromTo('.craft-header-line', { width: 0 }, { width: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
        gsap.fromTo('.craft-header-text', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });

        if (finalPromiseRef.current) {
          const words = finalPromiseRef.current.querySelectorAll('.word');
          gsap.set(words, { opacity: 0.15 });
          gsap.to(words, {
            opacity: 1,
            stagger: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.phase-3',
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
            }
          });
        }

        // Wait for images to load, then refresh
        Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
          ScrollTrigger.refresh();
        });

        return; // Exit complex timeline setup
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
        }
      });

      // Header Animation (desktop)
      tl.fromTo('.craft-header-line', { width: 0 }, { width: 40, duration: 0.5, ease: 'power3.out' })
        .fromTo('.craft-header-text', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

      // PHASE 1: Number Counters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        fastScrollEnd: true,
        onEnter: animateNumbers
      });

      // PHASE 1 stays visible ... (0-30%)
      tl.to({}, { duration: 3.0 });

      // Fade out Phase 1, Fade in Phase 2
      tl.to('.phase-1', {
        opacity: 0,
        y: -50,
        duration: 1.0,
        ease: 'power2.inOut'
      })
        .to('.phase-2', {
          opacity: 1,
          duration: 1.0
        }, "<0.5");

      // PHASE 2: Horizontal Scroll (30-75%)
      const totalScroll = horizontalScrollRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.2;

      tl.to(horizontalScrollRef.current, {
        x: -totalScroll,
        ease: "none",
        duration: 8.0
      });

      // Draw line while scrolling
      tl.to(lineRef.current, {
        width: "100%",
        ease: "none",
        duration: 8.0
      }, "<");

      // Phase 2 to Phase 3 transition
      tl.to('.phase-2', {
        opacity: 0,
        y: -50,
        duration: 1.0,
        ease: 'power2.inOut'
      })
        .to('.phase-3', {
          opacity: 1,
          duration: 1.0
        }, "<0.5");

      // PHASE 3: Reveal words (75-100%)
      if (finalPromiseRef.current) {
        const words = finalPromiseRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.18, duration: 3.5, ease: 'power2.out', force3D: true }
        );
      }

  }, { scope: sectionRef, dependencies: [isMobile] });

  const steps = [
    { num: '01', title: 'Design', desc: 'Every masterpiece begins with a vision. Our master designers translate inspiration into intricate sketches, capturing the essence of the stone.', img: '/craftsmanship_design.jpg' },
    { num: '02', title: 'Source', desc: 'We traverse the globe seeking the rarest, most exceptional gemstones. Only 1 in 10,000 stones meets our exacting standards for color, clarity, and brilliance.', img: '/craftsmanship_source.jpg' },
    { num: '03', title: 'Craft', desc: 'Over hundreds of hours, our artisans employ centuries-old techniques, coaxing precious metals and stones into forms of breathtaking beauty.', img: '/craftsmanship_craft.jpg' },
    { num: '04', title: 'Perfect', desc: 'The final polish breathing life into the creation. A rigorous inspection ensures perfection from every angle before the piece receives our hallmark.', img: '/craftsmanship_perfect.jpg' },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F0EB] relative w-full overflow-hidden flex items-center justify-center z-10 flex-col h-auto pt-24 pb-16 md:h-[100vh] md:flex-row md:pt-0 md:pb-0"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Subtle background noise overlay if needed */}
      </div>

      {/* Header */}
      <div className="flex flex-col items-center justify-center w-full z-20 pt-8 mb-12 md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 md:pt-0 md:mb-0">
        <div className="flex flex-col items-center mb-[16px]">
          <div className="craft-header-line h-[1px] w-0 bg-[#C9A96E] mb-[12px]" />
          <span className="craft-header-text font-secondary tracking-[0.3em] text-[11px] text-[#C9A96E] uppercase opacity-0">
            OUR CRAFT
          </span>
        </div>
      </div>

      {/* PHASE 1: The Numbers */}
      <div className="phase-1 w-full max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 z-10 relative mb-16 md:absolute md:top-1/2 md:-translate-y-1/2 md:mb-0">
        {/* Item 1 */}
        <div className="flex flex-col items-center text-center">
          <div
            ref={el => numbersRef.current[0] = el}
            data-target="4"
            className="font-primary text-[#1A1A1A] text-[clamp(64px,10vw,140px)] leading-none"
          >
            0
          </div>
          <div className="font-secondary text-sm text-[#888] uppercase tracking-widest mt-4">
            Generations of Master Artisans
          </div>
        </div>
        {/* Item 2 */}
        <div className="flex flex-col items-center text-center">
          <div
            ref={el => numbersRef.current[1] = el}
            data-target="1,200+"
            className="font-primary text-[#1A1A1A] text-[clamp(64px,10vw,140px)] leading-none"
          >
            0
          </div>
          <div className="font-secondary text-sm text-[#888] uppercase tracking-widest mt-4">
            Hours Per Signature Piece
          </div>
        </div>
        {/* Item 3 */}
        <div className="flex flex-col items-center text-center">
          <div
            ref={el => numbersRef.current[2] = el}
            data-target="40+"
            className="font-primary text-[#1A1A1A] text-[clamp(64px,10vw,140px)] leading-none"
          >
            0
          </div>
          <div className="font-secondary text-sm text-[#888] uppercase tracking-widest mt-4">
            Years of Legacy
          </div>
        </div>
        {/* Item 4 */}
        <div className="flex flex-col items-center text-center">
          <div
            ref={el => numbersRef.current[3] = el}
            data-target="100%"
            className="font-primary text-[#1A1A1A] text-[clamp(64px,10vw,140px)] leading-none"
          >
            0
          </div>
          <div className="font-secondary text-sm text-[#888] uppercase tracking-widest mt-4">
            Ethically Sourced Materials
          </div>
        </div>
      </div>

      {/* PHASE 2: The Process */}
      <div className="phase-2 w-full flex items-center z-20 pointer-events-none relative h-auto opacity-100 flex-col mb-16 md:absolute md:h-full md:opacity-0 md:pt-24 md:flex-row md:mb-0">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-0 h-[1px] bg-gold-muted/30 w-full -translate-y-[80px]" />
        <div ref={lineRef} className="hidden md:block absolute top-1/2 left-0 h-[1px] bg-gold-muted w-0 -translate-y-[80px] z-0" />

        <div
          ref={horizontalScrollRef}
          className="flex flex-col gap-16 px-6 pb-32 h-auto w-full md:flex-row md:gap-32 md:px-32 md:h-full md:items-center md:w-max"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              ref={el => stepsRef.current[i] = el}
              className="flex flex-col items-center text-center relative z-10 w-full md:w-[350px]"
            >
              <div className="relative mb-12">
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden border border-[#E8E0D6] flex items-center justify-center bg-white/50">
                  <img src={step.img} alt={step.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-10 -right-10 font-primary text-[80px] text-[#E8E0D6] leading-none select-none -z-10">
                  {step.num}
                </div>
              </div>
              <h3 className="font-primary text-3xl text-[#1A1A1A] mb-4">{step.title}</h3>
              <p className="font-secondary text-sm text-[#888] leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 3: The Promise */}
      <div className="phase-3 w-full px-6 flex flex-col items-center justify-center z-30 pointer-events-auto relative opacity-100 mb-12 md:absolute md:opacity-0 md:mb-0 md:h-full">
        <h2
          ref={finalPromiseRef}
          className="font-accent italic text-[clamp(32px,4vw,48px)] text-[#1A1A1A] text-center max-w-4xl leading-snug tracking-wide"
        >
          {'Every piece is a promise — of quality, of heritage, of timelessness'.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em] overflow-hidden">
              {word}
            </span>
          ))}
        </h2>
        <a
          href="#story"
          className="mt-12 font-secondary text-sm uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]/30 pb-1 hover:border-[#1A1A1A] transition-colors flex items-center gap-2 group"
        >
          Learn Our Story
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

    </section>
  );
};

export default CraftsmanshipSection;
