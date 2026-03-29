import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const instagramData = [
  { id: 1, likes: "2.4K", isReel: false, bgGradient: "linear-gradient(135deg, #C9A96E 0%, #8B7335 100%)" },
  { id: 2, likes: "1.8K", isReel: false, bgGradient: "linear-gradient(135deg, #2d1b0e 0%, #5c3a1e 100%)" },
  { id: 3, likes: "3.1K", isReel: true,  bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #3d3d6b 100%)" },
  { id: 4, likes: "956",  isReel: false, bgGradient: "linear-gradient(135deg, #8B7335 0%, #C9A96E 50%, #D4AF37 100%)" },
  { id: 5, likes: "2.7K", isReel: false, bgGradient: "linear-gradient(135deg, #2a1a0a 0%, #6b4423 100%)" },
  { id: 6, likes: "1.5K", isReel: true,  bgGradient: "linear-gradient(135deg, #0a2a1a 0%, #1a5c3a 100%)" },
  { id: 7, likes: "4.2K", isReel: false, bgGradient: "linear-gradient(135deg, #C9A96E 0%, #E8D5B5 100%)" },
  { id: 8, likes: "2.1K", isReel: false, bgGradient: "linear-gradient(135deg, #1a0a2a 0%, #4a2a6b 100%)" },
];

const InstagramSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridWrapperRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          fastScrollEnd: true,
        }
      }
    );

    // Grid Animation
    gsap.fromTo(
      gridWrapperRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: gridWrapperRef.current,
          start: "top 80%",
          fastScrollEnd: true,
        }
      }
    );

    // Footer Animation
    gsap.fromTo(
      footerRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          fastScrollEnd: true,
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#0A0A0A] pt-[80px] pb-[80px] w-full overflow-hidden"
    >
      <style>{`
        @keyframes scrollContent {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .instagram-track {
          display: flex;
          width: max-content;
          animation: scrollContent 40s linear infinite;
        }
        .instagram-track:hover {
          animation-play-state: paused;
        }
        .insta-scroll-group {
          display: flex;
          gap: 12px;
          padding-right: 12px;
        }
        @media (max-width: 768px) {
          .insta-scroll-container {
            overflow: hidden;
          }
        }
      `}</style>

      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center justify-center mb-16 px-6">
        <div className="flex flex-col items-center mb-[16px]">
          <div className="h-[1px] w-[40px] bg-[#C9A96E] mb-[12px]" />
          <span className="font-secondary tracking-[0.3em] text-[11px] text-[#C9A96E] uppercase">
            @MAISON
          </span>
        </div>
        <h2 className="font-primary text-[clamp(32px,4vw,52px)] text-[#FAFAFA] text-center leading-tight">
          Follow the Sparkle
        </h2>
      </div>

      {/* Grid */}
      <div ref={gridWrapperRef} className="w-full opacity-0">
        <div className="w-full insta-scroll-container">
          <div className="instagram-track">
            {/* Group 1 */}
            <div className="insta-scroll-group">
              {instagramData.map((item, idx) => (
                <div 
                  key={`g1-${item.id}-${idx}`}
                  className="insta-item group relative flex-shrink-0 cursor-pointer overflow-hidden border border-[#2A2A2A]  w-[200px] h-[260px] md:w-[280px] md:h-[350px]"
                  style={{ background: item.bgGradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[#C9A96E] text-[40px]">
                    ◆
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                      <span className="font-secondary font-medium text-[15px]">{item.likes}</span>
                    </div>
                  </div>
                  {item.isReel && (
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/20 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="ml-1">
                        <polygon points="6 3 20 12 6 21 6 3"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Group 2 (Duplicate for infinite scroll) */}
            <div className="insta-scroll-group" aria-hidden="true">
              {instagramData.map((item, idx) => (
                <div 
                  key={`g2-${item.id}-${idx}`}
                  className="insta-item group relative flex-shrink-0 cursor-pointer overflow-hidden border border-[#2A2A2A]  w-[200px] h-[260px] md:w-[280px] md:h-[350px]"
                  style={{ background: item.bgGradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[#C9A96E] text-[40px]">
                    ◆
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                      <span className="font-secondary font-medium text-[15px]">{item.likes}</span>
                    </div>
                  </div>
                  {item.isReel && (
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/20 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="ml-1">
                        <polygon points="6 3 20 12 6 21 6 3"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="flex flex-col items-center justify-center mt-16 px-6 gap-6">
        <p className="font-secondary text-[14px] text-[#888888] text-center">
          Join 250K+ followers who celebrate fine craftsmanship
        </p>
        <button className="font-secondary text-[13px] tracking-wider uppercase text-text-light border border-gold-muted px-8 py-4 bg-transparent hover:bg-gold-rich hover:border-gold-rich hover:text-[#1A1A1A] transition-colors duration-500">
          Follow Us on Instagram
        </button>
      </div>
    </section>
  );
};

export default InstagramSection;
