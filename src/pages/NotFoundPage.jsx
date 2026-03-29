import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const els = sectionRef.current.querySelectorAll('[data-animate]');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
    );
  }, { scope: sectionRef });

  return (
    <>
    <SEO title="Page Not Found" description="This piece seems to be missing from our collection." path="/404" />
    <section ref={sectionRef} className="relative bg-background min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1
        data-animate
        className="font-primary text-[120px] sm:text-[180px] md:text-[200px] leading-none text-[#1A1A1A] select-none"
      >
        404
      </h1>
      <p
        data-animate
        className="font-primary text-[22px] sm:text-[28px] md:text-[32px] text-text-light mt-4 max-w-xl leading-snug"
      >
        This piece seems to be missing from our collection
      </p>
      <Link
        data-animate
        to="/"
        className="mt-10 inline-flex items-center gap-2 font-secondary text-[13px] tracking-[0.15em] uppercase text-gold hover:text-gold-hover transition-colors duration-300 group"
      >
        Return to Maison
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </Link>
    </section>
    </>
  );
}
