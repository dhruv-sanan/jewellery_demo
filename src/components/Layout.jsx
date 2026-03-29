import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';
import PageTransition from './PageTransition';
import Breadcrumbs from './Breadcrumbs';
import LoadingBar from './LoadingBar';

gsap.registerPlugin(ScrollTrigger);

// ─── Preloader context: show preloader only on first ever visit ─────
const PreloaderContext = createContext();
export const usePreloaderDone = () => useContext(PreloaderContext);

export default function Layout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lenisRef = useRef(null);
  const isInitialMount = useRef(true);
  const scrollPositions = useRef({});
  const [preloaderDone, setPreloaderDone] = useState(() => {
    // If the user already saw it this session, skip
    return sessionStorage.getItem('maison_preloader_done') === '1';
  });

  const isFirstVisitHome = !preloaderDone && location.pathname === '/';

  // ─── Continuously track scroll position for the current path ───────
  useEffect(() => {
    const onScroll = () => {
      scrollPositions.current[location.pathname] = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // ─── Lenis: create / destroy on every route change ────────────────
  useEffect(() => {
    const isPop = navigationType === 'POP';
    const savedScroll = isPop ? (scrollPositions.current[location.pathname] || 0) : 0;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // On forward nav start at top, on back nav start at saved position
    if (!isPop) {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, savedScroll);
      lenis.scrollTo(savedScroll, { immediate: true });
    }

    lenis.on('scroll', ScrollTrigger.update);

    // Store reference so we can remove the exact same function on cleanup
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ limitCallbacks: true });

    // Small delay so the new page's DOM is ready
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [location.pathname]);

  // ─── Scroll to top + refresh ScrollTrigger on route change ────────
  useEffect(() => {
    const isPop = navigationType === 'POP';
    const savedScroll = isPop ? (scrollPositions.current[location.pathname] || 0) : 0;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh(true);
      }, 200);
      return () => clearTimeout(timer);
    }

    if (!isPop) {
      // Scroll to top immediately — both native and Lenis (forward navigation only)
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }

    // Delayed refresh: let new page DOM render, then recalculate pin spacers
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh(true);

      // Restore scroll AFTER ScrollTrigger has recalculated all pin spacers
      if (isPop && savedScroll > 0) {
        requestAnimationFrame(() => {
          window.scrollTo(0, savedScroll);
          if (lenisRef.current) {
            lenisRef.current.scrollTo(savedScroll, { immediate: true });
          }
        });
      } else if (!isPop) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // ─── Refresh ScrollTrigger when tab/app regains focus ─────────────
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        // Recalculate all pin positions after tab/app switch
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh(true);
      }
    };

    const onFocus = () => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh(true);
    };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // ─── Preloader complete handler ───────────────────────────────────
  const handlePreloaderComplete = () => {
    sessionStorage.setItem('maison_preloader_done', '1');
    setPreloaderDone(true);
  };

  return (
    <PreloaderContext.Provider value={preloaderDone}>
      {/* Preloader — only on first homepage visit */}
      <AnimatePresence mode="wait">
        {isFirstVisitHome && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <LoadingBar />
      <CustomCursor />
      <Navbar />
      <Breadcrumbs />

      {/* Page content — wait for preloader if active */}
      {(!isFirstVisitHome || preloaderDone) ? (
        <PageTransition>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            onAnimationComplete={() => {
              if (lenisRef.current) lenisRef.current.resize();
              // Final scroll restore after framer-motion animation completes
              if (navigationType === 'POP') {
                const saved = scrollPositions.current[location.pathname] || 0;
                if (saved > 0) {
                  window.scrollTo(0, saved);
                  if (lenisRef.current) lenisRef.current.scrollTo(saved, { immediate: true });
                }
              }
            }}
            className="min-h-screen bg-background text-text-light selection:bg-gold-muted selection:text-background w-full overflow-x-clip relative"
          >
            {/* Faint Noise Overlay */}
            <div
              className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                backgroundRepeat: 'repeat',
              }}
            />

            <Outlet />
            <Footer />
          </motion.main>
        </PageTransition>
      ) : null}

      {(!isFirstVisitHome || preloaderDone) && <BackToTop />}
    </PreloaderContext.Provider>
  );
}
