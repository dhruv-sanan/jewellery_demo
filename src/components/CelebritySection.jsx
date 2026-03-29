import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const celebrities = [
  {
    id: 1,
    name: "Deepika Padukone",
    event: "Cannes Film Festival 2024",
    piece: "The Celestial Pendant",
    gradient: "from-[#e8dcc4] to-[#cfc0a3]",
    image: "/celeb_1.jpg",
    desktopStyle: { gridColumn: '1 / 5', gridRow: '1 / 2' },
    startRot: -7,
    finalRot: -1,
    aspect: "aspect-[3/4]"
  },
  {
    id: 4,
    name: "Alia Bhatt",
    event: "Global Brand Ambassador",
    piece: "Diamond Tennis Stack",
    gradient: "from-[#ebe0d1] to-[#d8c8b4]",
    image: "/celeb_4.jpg",
    desktopStyle: { gridColumn: '5 / 9', gridRow: '1 / 2' },
    startRot: 5,
    finalRot: 1,
    aspect: "aspect-[3/4]"
  },
  {
    id: 2,
    name: "Zendaya",
    event: "Met Gala 2024",
    piece: "Vintage Emerald Choker",
    gradient: "from-[#dccdb9] to-[#c2af98]",
    image: "/celeb_2.jpg",
    desktopStyle: { gridColumn: '9 / 13', gridRow: '1 / 2' },
    startRot: -4,
    finalRot: -1,
    aspect: "aspect-[3/4]"
  },
  {
    id: 5,
    name: "Aishwarya Rai",
    event: "Paris Fashion Week",
    piece: "Sapphire Drop Earrings",
    gradient: "from-[#ddd1c2] to-[#c5b5a2]",
    image: "/celeb_5.jpg",
    desktopStyle: { gridColumn: '2 / 6', gridRow: '2 / 3' },
    startRot: 4,
    finalRot: 1,
    aspect: "aspect-[3/4]"
  },
  {
    id: 3,
    name: "Priyanka Chopra",
    event: "Academy Awards 2024",
    piece: "The Heritage Polki Set",
    gradient: "from-[#d6b782] to-[#bc9b60]",
    image: "/celeb_3.jpg",
    desktopStyle: { gridColumn: '6 / 10', gridRow: '2 / 3' },
    startRot: -5,
    finalRot: -1,
    aspect: "aspect-[4/3]"
  },
  {
    id: 6,
    name: "Sonam Kapoor",
    event: "Royal Wedding",
    piece: "Jadau Choker & Nath",
    gradient: "from-[#cfbba1] to-[#b39d81]",
    image: "/celeb_6.jpg",
    desktopStyle: { gridColumn: '10 / 13', gridRow: '2 / 3' },
    startRot: 6,
    finalRot: 1,
    aspect: "aspect-[3/4]"
  }
];

const CelebritySection = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const quoteTextRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".celeb-header-elem", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          fastScrollEnd: true,
        }
      });

      const isDesktop = window.innerWidth >= 1024;

      // We animate desktop and mobile differently
      if (isDesktop) {
        // Desktop scattered animation
        const shuffledIndices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);

        celebrities.forEach((celeb, index) => {
          gsap.fromTo(`.celeb-card-desktop-${index}`,
            {
              opacity: 0,
              scale: 0.9,
              rotation: celeb.startRot,
              y: 50
            },
            {
              opacity: 1,
              scale: 1,
              rotation: celeb.finalRot,
              y: 0,
              duration: 1.6,
              ease: "power4.out",
              delay: shuffledIndices.indexOf(index) * 0.15,
              force3D: true,
              scrollTrigger: {
                trigger: ".celeb-grid-container-desktop",
                start: "top 75%",
                fastScrollEnd: true,
              }
            }
          );
        });
      } else {
        // Mobile staggered fade up
        gsap.fromTo(".celeb-card-mobile",
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: ".celeb-grid-container-mobile",
              start: "top 85%",
              fastScrollEnd: true,
            }
          }
        );
      }

      // Quote Animation word by word
      if (quoteTextRef.current) {
        const words = quoteTextRef.current.querySelectorAll('.quote-word');
        gsap.fromTo(words,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              fastScrollEnd: true,
            }
          }
        );
      }

      gsap.fromTo([".quote-mark", ".quote-author"],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            fastScrollEnd: true,
          }
        }
      )

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quoteStr = "The craftsmanship is unparalleled. Each piece feels like it was made just for me.";
  const quoteWords = quoteStr.split(" ");

  const CardContent = ({ celeb, isMobile, index }) => {
    const heightClass = isMobile ? (index % 2 === 0 ? "h-[300px]" : "h-[380px]") : celeb.aspect;
    return (
      <div className="w-full flex-col flex group cursor-pointer transition-transform duration-700">
        <div
          className={`w-full overflow-hidden bg-gradient-to-br ${celeb.gradient} ${heightClass} relative transition-all duration-700 lg:group-hover:-translate-y-2 lg:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`}
        >
          {celeb.image && (
            <img src={celeb.image} alt={celeb.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-0" />
          )}
          <div className="absolute inset-0 bg-white/0 lg:group-hover:bg-white/10 transition-colors duration-500 z-10" />
        </div>

        <div className="pt-5 relative z-20 bg-transparent flex flex-col items-start transition-transform duration-700 lg:group-hover:-translate-y-2">
          <h3 className="font-primary text-[20px] text-[#1A1A1A] leading-tight mb-[2px]">{celeb.name}</h3>
          <p className="font-secondary text-[12px] text-[#888] mb-1">{celeb.event}</p>
          <p className="font-secondary text-[12px] text-[#C9A96E] italic">{celeb.piece}</p>

          <div className="h-0 overflow-hidden opacity-0 lg:group-hover:h-[24px] lg:group-hover:opacity-100 lg:group-hover:mt-3 transition-all duration-500 origin-top">
            <span className="font-secondary text-[11px] uppercase tracking-widest flex items-center gap-2 text-[#1A1A1A] font-medium">
              VIEW LOOK <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="pt-[140px] pb-[40px] bg-[#F5F0EB] relative w-full overflow-hidden" style={{ zIndex: 5 }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 lg:mb-32 z-20 relative">
          <div className="flex flex-col items-center mb-[16px]">
            <div className="celeb-header-elem h-[1px] w-[40px] bg-[#C9A96E] mb-[12px]" />
            <span className="celeb-header-elem font-secondary text-[11px] text-[#C9A96E] uppercase tracking-[0.3em]">
              SPOTTED
            </span>
          </div>
          <h2 className="celeb-header-elem font-primary text-[clamp(36px,5vw,64px)] text-[#1A1A1A] leading-tight mb-8">
            Adorned by Icons
          </h2>
          <p className="celeb-header-elem font-secondary text-[15px] text-[#888] max-w-[480px] leading-relaxed">
            Our creations grace the most celebrated personalities
          </p>
        </div>

        {/* Desktop Grid Container */}
        <div className="celeb-grid-container-desktop hidden lg:grid mb-24 auto-rows-auto" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
          {celebrities.map((celeb, index) => (
            <div
              key={`desktop-${celeb.id}`}
              className={`celeb-card-desktop-${index}`}
              style={celeb.desktopStyle}
            >
              <CardContent celeb={celeb} isMobile={false} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile Grid Container */}
        <div className="celeb-grid-container-mobile columns-2 gap-3 lg:hidden mb-16">
          {celebrities.map((celeb, index) => (
            <div
              key={`mobile-${celeb.id}`}
              className="celeb-card-mobile mb-4 break-inside-avoid"
            >
              <CardContent celeb={celeb} isMobile={true} index={index} />
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div ref={quoteRef} className="flex flex-col items-center justify-center text-center mt-12 lg:mt-24 max-w-[700px] mx-auto relative px-6 mb-8 lg:mb-12">
          <div className="quote-mark font-primary text-[120px] text-[#C9A96E] opacity-30 leading-none absolute -top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            &ldquo;
          </div>
          <p ref={quoteTextRef} className="font-primary text-[28px] md:text-[36px] italic text-[#1A1A1A] leading-snug relative z-10 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {quoteWords.map((word, i) => (
              <span key={i} className="quote-word inline-block">{word}</span>
            ))}
          </p>
          <span className="quote-author font-secondary text-[14px] text-[#C9A96E] mt-10 block tracking-wide">
            &mdash; Priyanka Chopra Jonas
          </span>
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;
