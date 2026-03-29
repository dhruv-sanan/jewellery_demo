import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import genderForHer from '../assets/gender_for_her.jpg';
import genderForHim from '../assets/gender_for_him.jpg';

gsap.registerPlugin(ScrollTrigger);

const GenderSection = () => {
    const sectionRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const leftContentRef = useRef(null);
    const rightContentRef = useRef(null);
    const dividerRef = useRef(null);
    const navigate = useNavigate();

    const [hoverState, setHoverState] = useState('none'); // 'none', 'left', 'right'
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop: Panels split apart
            gsap.set(leftPanelRef.current, { xPercent: 5, zIndex: 2 });
            gsap.set(rightPanelRef.current, { xPercent: -5, zIndex: 1 });
            gsap.set(dividerRef.current, { scaleY: 0, opacity: 0 });
            gsap.set([leftContentRef.current.children, rightContentRef.current.children], { y: 20, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "center center",
                    scrub: 1.5,
                    fastScrollEnd: true,
                }
            });

            tl.to([leftPanelRef.current, rightPanelRef.current], {
                xPercent: 0,
                ease: "power2.out"
            })
                .to(dividerRef.current, {
                    scaleY: 1,
                    opacity: 1,
                    duration: 0.5,
                }, "-=0.2");

            // Text fade in
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "center 60%",
                fastScrollEnd: true,
                onEnter: () => {
                    gsap.to([leftContentRef.current.children, rightContentRef.current.children], {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: "power3.out",
                        force3D: true,
                    });
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile: Slide in from sides
            gsap.set([leftContentRef.current.children, rightContentRef.current.children], { y: 20, opacity: 0 });

            gsap.fromTo(leftPanelRef.current,
                { x: -30, opacity: 0 },
                {
                    x: 0, opacity: 1, force3D: true,
                    scrollTrigger: {
                        trigger: leftPanelRef.current,
                        start: "top 80%",
                        end: "center center",
                        scrub: 1.5,
                        fastScrollEnd: true,
                    }
                }
            );

            gsap.fromTo(rightPanelRef.current,
                { x: 30, opacity: 0 },
                {
                    x: 0, opacity: 1, force3D: true,
                    scrollTrigger: {
                        trigger: rightPanelRef.current,
                        start: "top 80%",
                        end: "center center",
                        scrub: 1.5,
                        fastScrollEnd: true,
                    }
                }
            );

            // Mobile Text fade in
            gsap.to(leftContentRef.current.children, {
                y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", force3D: true,
                scrollTrigger: { trigger: leftPanelRef.current, start: "top 40%", fastScrollEnd: true }
            });
            gsap.to(rightContentRef.current.children, {
                y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", force3D: true,
                scrollTrigger: { trigger: rightPanelRef.current, start: "top 40%", fastScrollEnd: true }
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    const getLeftWidth = () => {
        if (isMobile) return '100%';
        if (hoverState === 'none') return '50%';
        return hoverState === 'left' ? '55%' : '45%';
    };

    const getRightWidth = () => {
        if (isMobile) return '100%';
        if (hoverState === 'none') return '50%';
        return hoverState === 'right' ? '55%' : '45%';
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col md:flex-row overflow-hidden bg-background"
            style={{ height: isMobile ? 'auto' : '100vh' }}
        >
            {/* LEFT PANEL */}
            <div
                ref={leftPanelRef}
                className="relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer"
                style={{ width: getLeftWidth(), height: isMobile ? '80vh' : '100%' }}
                onMouseEnter={() => !isMobile && setHoverState('left')}
                onMouseLeave={() => !isMobile && setHoverState('none')}
                onClick={() => navigate('/categories')}
            >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={genderForHer}
                        alt="For Her Collection"
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover origin-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
              ${hoverState === 'left' ? 'scale-105' : 'scale-100'}
              ${hoverState === 'right' ? 'grayscale-[30%] opacity-80' : 'grayscale-0 opacity-100'}
            `}
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-[40px] md:p-[60px] flex flex-col items-start justify-end h-full z-10 pointer-events-none">
                    <div ref={leftContentRef} className="flex flex-col items-start text-left">
                        <h2
                            className="text-[#FAFAFA] font-primary font-normal leading-none tracking-tight mb-4"
                            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
                        >
                            FOR HER
                        </h2>
                        <div className="w-[80px] h-[1px] bg-[#C9A96E] mb-6" />
                        <p className="text-[#CCC] font-secondary text-[14px] font-light mb-8 max-w-sm">
                            Timeless pieces for the modern woman
                        </p>
                        <span className="text-[#C9A96E] font-secondary text-[13px] tracking-wider uppercase relative group-hover:text-white transition-colors duration-300">
                            Explore &rarr;
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#C9A96E] group-hover:bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div
                ref={rightPanelRef}
                className="relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer"
                style={{ width: getRightWidth(), height: isMobile ? '80vh' : '100%' }}
                onMouseEnter={() => !isMobile && setHoverState('right')}
                onMouseLeave={() => !isMobile && setHoverState('none')}
                onClick={() => navigate('/categories')}
            >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={genderForHim}
                        alt="For Him Collection"
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover origin-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
              ${hoverState === 'right' ? 'scale-105' : 'scale-100'}
              ${hoverState === 'left' ? 'grayscale-[30%] opacity-80' : 'grayscale-0 opacity-100'}
            `}
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none" />

                {/* Content - Positioned Bottom Right on Desktop, Bottom Right on Mobile as well */}
                <div className="absolute bottom-0 right-0 w-full p-[40px] md:p-[60px] flex flex-col items-end justify-end h-full z-10 pointer-events-none text-right">
                    <div ref={rightContentRef} className="flex flex-col items-end text-right">
                        <h2
                            className="text-[#FAFAFA] font-primary font-normal leading-none tracking-tight mb-4"
                            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
                        >
                            FOR HIM
                        </h2>
                        <div className="w-[80px] h-[1px] bg-[#C9A96E] mb-6" />
                        <p className="text-[#CCC] font-secondary text-[14px] font-light mb-8 max-w-sm">
                            Bold statements, refined craft
                        </p>
                        <span className="text-[#C9A96E] font-secondary text-[13px] tracking-wider uppercase relative group-hover:text-white transition-colors duration-300">
                            Explore &rarr;
                            <span className="absolute right-0 bottom-[-4px] w-0 h-[1px] bg-[#C9A96E] group-hover:bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
                        </span>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div
                ref={dividerRef}
                className="absolute z-20 pointer-events-none flex items-center justify-center
          md:top-0 md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:w-[1px] md:h-full md:bg-gradient-to-b md:from-transparent md:via-[#C9A96E]/50 md:to-transparent
          top-1/2 left-0 right-0 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent
          hidden md:flex
        "
                style={{ originY: 0.5 }}
            >
                <div className="w-[6px] h-[6px] rotate-45 border-[1px] border-[#C9A96E] bg-background" />
            </div>

            {/* Mobile Divider */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent z-20 flex items-center justify-center md:hidden pointer-events-none">
                {/* We use 50% from top since each panel is 80vh so total container is 160vh. Top 1/2 of 160vh is 80vh, which is exactly where they meet! */}
                <div className="w-[6px] h-[6px] rotate-45 border-[1px] border-[#C9A96E] bg-background" />
            </div>

        </section>
    );
};

export default GenderSection;
