import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Train, MapPin, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VisitNudge from '../components/VisitNudge';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 191;
const SCROLL_DISTANCE = 3500;

// Preload all frames and return them as an array of Image objects
const useFramePreloader = (frameCount) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`;

      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        console.warn(`Failed to load frame ${i}`);
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };

      images[i - 1] = img;
    }
  }, [frameCount]);

  return { images: imagesRef, progress, isLoaded };
};

export default function AtelierPage() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const currentFrameRef = useRef(0);
  const { images, progress, isLoaded } = useFramePreloader(FRAME_COUNT);
  const [formState, setFormState] = useState('idle');

  // Draw a specific frame on the canvas
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = images.current[frameIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      currentFrameRef.current = frameIndex;
    }
  }, [images]);

  // Set canvas size to match viewport
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Draw first frame as soon as loaded
  useEffect(() => {
    if (images.current[0]?.complete) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // GSAP ScrollTrigger — core scroll-to-frame mapping
  useLayoutEffect(() => {
    if (!isLoaded) return;

    drawFrame(0);

    const ctx = gsap.context(() => {
      const obj = { frame: 0 };

      gsap.to(obj, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE}`,
          pin: true,
          scrub: 0.15,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const newFrame = Math.round(obj.frame);
            if (newFrame !== currentFrameRef.current) {
              drawFrame(newFrame);
            }
          },
        },
      });

      // Blur overlay fade-out (first 12% of scroll)
      gsap.to('.hero-blur-overlay', {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE * 0.12}`,
          scrub: 0.1,
        },
      });

      // Overlay text: "Welcome to Maison" (15% - 30%)
      const welcomeTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${SCROLL_DISTANCE * 0.15} top`,
          end: `top+=${SCROLL_DISTANCE * 0.30} top`,
          scrub: 0.1,
        },
      });
      welcomeTl
        .fromTo('.overlay-welcome', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        .to('.overlay-welcome', { opacity: 0, y: -20, duration: 0.4 }, 0.6);

      // Overlay text: "Where Craftsmanship Lives" (40% - 58%)
      const craftTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${SCROLL_DISTANCE * 0.40} top`,
          end: `top+=${SCROLL_DISTANCE * 0.58} top`,
          scrub: 0.1,
        },
      });
      craftTl
        .fromTo('.overlay-craft', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        .to('.overlay-craft', { opacity: 0, y: -20, duration: 0.4 }, 0.6);

      // Overlay text: "Your Private Viewing Awaits" (72% - 90%)
      const chairTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${SCROLL_DISTANCE * 0.72} top`,
          end: `top+=${SCROLL_DISTANCE * 0.90} top`,
          scrub: 0.1,
        },
      });
      chairTl
        .fromTo('.overlay-chair', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        .to('.overlay-chair', { opacity: 0, y: -20, duration: 0.4 }, 0.6);

      // Gold overlay at the end (88% - 100%)
      gsap.fromTo('.video-gold-overlay',
        { opacity: 0 },
        {
          opacity: 0.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${SCROLL_DISTANCE * 0.88} top`,
            end: `+=${SCROLL_DISTANCE}`,
            scrub: 0.1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  // Refresh ScrollTrigger after frames load — must happen after
  // the Layout page-entry animation (0.85s) completes so pin
  // positions are calculated at the final y:0 position.
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Reveal Sections Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-section-space',
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.reveal-map',
        { x: -50, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-section-visit',
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.reveal-details > *',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-section-visit',
            start: 'top 75%',
          }
        }
      );
    }, revealRef);
    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="bg-background text-text-light min-h-screen">
      {/* ═══ LOADING SCREEN ═══ */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <p className="font-primary text-gold text-xl tracking-[0.2em] uppercase mb-6">
              Preparing Your Visit
            </p>
            <div className="w-48 h-[1px] bg-border-dark relative overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-secondary text-text-muted text-xs mt-3 tracking-widest">
              {progress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SECTION 1: CANVAS SCROLL EXPERIENCE ═══ */}
      <section ref={containerRef} className="relative w-screen h-screen">
        {/* The Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ background: '#0A0A0A' }}
        />

        {/* ═══ BLUR OVERLAY (Step Inside hero) ═══ */}
        <div
          className="hero-blur-overlay absolute inset-0 z-10 flex flex-col items-center justify-center"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(10, 10, 10, 0.3)',
          }}
        >
          <div className="w-10 h-[1px] bg-gold mb-6" />
          <p className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
            THE ATELIER
          </p>
          <h1 className="font-primary text-[clamp(48px,8vw,96px)] text-white font-light text-center leading-tight mb-4">
            Step Inside
          </h1>
          <div className="w-20 h-[1px] bg-gold mb-6" />
          <p className="font-secondary text-[15px] text-white/60 text-center max-w-[500px] px-8 leading-relaxed mb-12">
            A private world of craftsmanship, heritage, and pieces that exist nowhere else
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-[1px] h-8 bg-gold animate-pulse" />
            <p className="font-secondary text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Scroll to Enter
            </p>
          </div>
        </div>

        {/* ═══ CINEMATIC VIGNETTE ═══ */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.3)' }}
        />

        {/* ═══ OVERLAY TEXTS ═══ */}
        <div className="overlay-welcome absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-[8]">
          <p className="font-primary text-white text-[clamp(36px,5vw,64px)] font-light"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
            Welcome to Maison
          </p>
        </div>

        <div className="overlay-craft absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-[8]">
          <div className="text-center max-w-lg px-8">
            <p className="font-primary text-white text-[clamp(32px,4.5vw,56px)] font-light mb-4"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
              Where Craftsmanship Lives
            </p>
            <p className="font-secondary text-white/70 text-sm tracking-wide"
              style={{ textShadow: '0 1px 15px rgba(0,0,0,0.5)' }}>
              Every display holds a story. Every piece, a legacy.
            </p>
          </div>
        </div>

        <div className="overlay-chair absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-[8]">
          <div className="text-center max-w-lg px-8">
            <p className="font-primary text-white text-[clamp(28px,4vw,48px)] font-light mb-3"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
              Your Private Viewing Awaits
            </p>
            <p className="font-secondary text-gold text-sm tracking-[0.15em] uppercase"
              style={{ textShadow: '0 1px 15px rgba(0,0,0,0.5)' }}>
              Some pieces must be experienced in person
            </p>
          </div>
        </div>

        {/* ═══ GOLD OVERLAY (end of scroll) ═══ */}
        <div
          className="video-gold-overlay absolute inset-0 opacity-0 pointer-events-none z-[6]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.15) 50%, rgba(10,10,10,0.7) 100%)',
          }}
        />
      </section>

      {/* ═══ SECTION 2: THE REVEAL ═══ */}
      <section ref={revealRef} className="relative z-10 w-full overflow-hidden">

        {/* Transition gradient */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-background-light pointer-events-none -z-10" />

        {/* SUB-SECTION A: The Space */}
        <div className="reveal-section-space bg-background-light py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <p className="font-secondary text-[11px] text-gold tracking-[0.3em] uppercase mb-4">The Space</p>
            <h2 className="font-primary text-[36px] md:text-[48px] text-text-dark mb-16">Where Every Detail Matters</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
              {[
                { title: 'The Grand Salon', img: '/images/atelier/grand-salon.png', desc: 'Where our legacy collections are presented amidst timeless architecture.' },
                { title: 'The Bridal Suite', img: '/images/atelier/bridal-suite.png', desc: 'An intimate setting designed specifically for selecting the perfect symbol of your union.' },
                { title: 'The Consultation Lounge', img: '/images/atelier/consultation-lounge.png', desc: 'Our private table for reviewing high jewellery and bespoke commissions.' }
              ].map((item, idx) => (
                <div key={idx} className="reveal-card flex flex-col text-text-dark">
                  <div className="w-full aspect-[3/4] overflow-hidden mb-6">
                    <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="w-[30px] h-[1px] bg-gold mb-5 mx-auto md:mx-0" />
                  <h3 className="font-primary text-[22px] mb-2 md:text-left text-center">{item.title}</h3>
                  <p className="font-secondary text-[14px] text-text-muted pb-4 md:text-left text-center leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUB-SECTION B: Visit Us */}
        <div className="reveal-section-visit bg-background py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
            {/* Left MAP */}
            <div className="reveal-map md:w-3/5 h-[300px] md:h-[500px] bg-[#111] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.2!2d77.1855!3d28.5195!2m3!1f0!2f45!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x390d1e0f5b1eaaab%3A0x2e0e39e2fcea8c0!2sPurab%20Paschim%20By%20Ankit%20Khullar!5e1!2m2!1sen!2sin!4v1711612800000!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[500px] md:h-[500px]"
              />
            </div>

            {/* Right details */}
            <div className="reveal-details md:w-2/5 flex flex-col justify-center">
              <div>
                <p className="font-secondary text-[11px] tracking-[0.3em] text-gold uppercase mb-4">VISIT US</p>
                <h3 className="font-primary text-[32px] text-text-light mb-6">Purab Paschim</h3>
                <p className="font-secondary text-[13px] text-gold mb-4">By Ankit Khullar</p>

                <div className="space-y-4 mb-8">
                  <p className="font-secondary text-[15px] text-text-muted">
                    Ambawata One, Seth Sarai,<br />
                    Mehrauli, New Delhi 110030
                  </p>
                </div>

                <div className="w-12 h-[1px] bg-border-dark mb-8" />

                <div className="space-y-3 mb-8">
                  <p className="font-secondary text-[11px] tracking-[0.2em] text-gold uppercase mb-3">HOURS</p>
                  <p className="font-secondary text-[14px] text-text-muted">Monday — Saturday · 11:00 AM — 7:00 PM</p>
                  <p className="font-secondary text-[14px] text-text-muted">Sunday · By Appointment Only</p>
                </div>

                <div className="w-12 h-[1px] bg-border-dark mb-8" />

                <div className="space-y-3 mb-8">
                  <p className="font-secondary text-[11px] tracking-[0.2em] text-gold uppercase mb-3">CONTACT</p>
                  <a href="tel:+911141411411" className="block font-secondary text-[14px] text-text-muted hover:text-gold transition-colors">
                    +91 11 4141 1411
                  </a>
                  <a href="mailto:hello@purabpaschim.com" className="block font-secondary text-[14px] text-text-muted hover:text-gold transition-colors">
                    hello@purabpaschim.com
                  </a>
                  <a href="https://wa.me/911141411411" target="_blank" rel="noopener noreferrer" className="block font-secondary text-[14px] text-text-muted hover:text-gold transition-colors">
                    WhatsApp →
                  </a>
                </div>

                <p className="font-primary text-[16px] italic text-gold">
                  Bridal & High Jewellery viewings by appointment only
                </p>

                <a href="https://www.google.com/maps/dir//Purab+Paschim+By+Ankit+Khullar,+Ambawata+One,+Seth+Sarai,+Mehrauli,+New+Delhi,+Delhi+110030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 font-secondary text-[13px] tracking-[0.1em] uppercase text-gold border border-gold px-8 py-3 hover:bg-gold hover:text-background transition-all duration-300 w-fit">
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* SUB-SECTION D: Getting Here */}
        <div className="bg-background py-16 px-6 border-t border-[#1A1A1A]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 border-b border-border-dark pb-16">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Car className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <h4 className="font-secondary text-text-light text-[14px] uppercase tracking-widest mb-2">By Car</h4>
              <p className="font-secondary text-text-muted text-[13px]">Complimentary valet parking at Ambawata One</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-border-dark" />

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Train className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <h4 className="font-secondary text-text-light text-[14px] uppercase tracking-widest mb-2">By Metro</h4>
              <p className="font-secondary text-text-muted text-[13px]">Qutub Minar Metro Station, 10 minute drive</p>
            </div>

            <div className="hidden md:block w-px h-16 bg-border-dark" />

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <MapPin className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <h4 className="font-secondary text-text-light text-[14px] uppercase tracking-widest mb-2">Landmark</h4>
              <p className="font-secondary text-text-muted text-[13px]">Near Qutub Minar, Mehrauli Archaeological Park</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center pt-8">
            <p className="font-secondary text-[12px] text-text-muted">For directions, call us at +91 11 4141 1411</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: VISIT NUDGE ═══ */}
      <VisitNudge
        title="The screen can only show so much"
        description="Experience our latest creations — pieces too precious to photograph — at the Maison Atelier"
        primaryBtnText="Book Your Visit →"
        primaryBtnLink="/book-appointment"
        hideSecondaryBtn={true}
      />
    </div>
  );
}
