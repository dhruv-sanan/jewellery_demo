import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/hero_necklace_1773561659359.jpg';

gsap.registerPlugin(ScrollTrigger);

// Particle System for Gold Dust
function GoldDust({ count }) {
    const meshRef = useRef();

    // Create random positions and phases for particles
    const [particles] = useState(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 20,
                y: (Math.random() - 0.5) * 20,
                z: (Math.random() - 0.5) * 10 - 5,
                speed: Math.random() * 0.02 + 0.01,
                amp: Math.random() * 0.5 + 0.1,
                offset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    });

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            arr[i * 3] = p.x;
            arr[i * 3 + 1] = p.y;
            arr[i * 3 + 2] = p.z;
        });
        return arr;
    }, [count, particles]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const posAttribute = meshRef.current.geometry.attributes.position;

        for (let i = 0; i < count; i++) {
            const p = particles[i];
            // Drift upward and wiggle with sine wave
            const y = p.y + time * p.speed;
            const x = p.x + Math.sin(time * 0.5 + p.offset) * p.amp;

            posAttribute.setXYZ(i, x, (y % 20) - 10, p.z);
        }
        posAttribute.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#C9A96E"
                transparent
                opacity={0.3}
                sizeAttenuation
                depthWrite={false}
                blending={2} // Additive blending for dust glow
            />
        </points>
    );
}

export default function HeroSection() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [inView, setInView] = useState(true);

    // Phase 1 Refs
    const title1Ref = useRef(null);
    const titleLineRef = useRef(null);
    const estRef = useRef(null);
    const scrollIndRef = useRef(null);
    const scrollTimelineRef = useRef(null);

    // Phase 2 Refs
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const bgGlowRef = useRef(null);
    const labelTopRef = useRef(null);
    const labelBotRef = useRef(null);

    // Phase 3 Refs
    const statementRef = useRef(null);
    const ctaWrapRef = useRef(null);

    const [particleCount, setParticleCount] = useState(300);

    useEffect(() => {
        // Responsive particle count
        const handleResize = () => {
            setParticleCount(window.innerWidth < 768 ? 150 : 300);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Intersection Observer to pause Three.js rendering when out of view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Set up intro animations (when page loads)
        const initTl = gsap.timeline({ delay: 0.5 }); // Reduced delay to account for faster preloader

        // Split Phase 1 text manually
        if (title1Ref.current) {
            const chars = title1Ref.current.querySelectorAll('.char');
            gsap.set(chars, { opacity: 0, y: 30 });
            initTl.to(chars, {
                opacity: 1,
                y: 0,
                duration: 2.5,
                stagger: 0.06,
                ease: "power3.out"
            });
        }

        gsap.set(titleLineRef.current, { width: 0 });
        initTl.to(titleLineRef.current, {
            width: 200,
            duration: 1.2,
            ease: "power2.out"
        }, "-=0.6");

        gsap.set(estRef.current, { opacity: 0 });
        initTl.to(estRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.4");

        // Scroll indicator looping animation
        scrollTimelineRef.current = gsap.timeline({ repeat: -1 });
        scrollTimelineRef.current.fromTo('.scroll-dot',
            { y: 0, opacity: 1 },
            { y: 24, opacity: 0, duration: 1.5, ease: "power2.inOut" }
        );

        // Initial setup for Phase 2/3 elements before scroll
        gsap.set(imageWrapperRef.current, { clipPath: 'circle(0% at center)', zIndex: 5 });
        gsap.set(imageRef.current, { scale: 1.1 });
        gsap.set(bgGlowRef.current, { opacity: 0 });
        gsap.set([labelTopRef.current, labelBotRef.current], { opacity: 0 });
        gsap.set(statementRef.current, { opacity: 0, y: 50 });
        gsap.set(ctaWrapRef.current, { opacity: 0, y: 30 });

        const ctx = gsap.context(() => {
            // Main ScrollTrigger Timeline
            const stl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%", // 200vh of scrolling (3 phases = 0-100, 100-200, 200-300 limit)
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                }
            });

            // --- 100vh -> 200vh (Phase 1 to Phase 2) ---

            // Fade out scroll indicator
            stl.to(scrollIndRef.current, { opacity: 0, duration: 0.1 }, 0);

            // Move and scale Phase 1 text to top-left
            // Calculate responsive translate
            const isMobile = window.innerWidth < 1024;
            stl.to(title1Ref.current, {
                scale: 0.6,
                xPercent: isMobile ? -30 : -45, // Move left
                yPercent: isMobile ? -35 : -40, // Move up
                duration: 1,
                ease: "power2.inOut"
            }, 0);
            stl.fromTo([titleLineRef.current, estRef.current],
                { opacity: 1 },
                { opacity: 0, duration: 0.4 },
            0);

            // Phase 2 reveal: Image circle clip, scale in, glow
            stl.to(bgGlowRef.current, { opacity: 1, duration: 0.8 }, 0.2);
            stl.to(imageWrapperRef.current, {
                clipPath: 'circle(100% at center)',
                duration: 1,
                ease: "power3.inOut"
            }, 0);
            stl.to(imageRef.current, {
                scale: 1,
                duration: 1,
                ease: "power3.inOut"
            }, 0);

            // Phase 2 floating labels non-scrubbed reveal
            const phase2LabelsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top -100%", // When Phase 2 reaches its full reveal
                    toggleActions: "play none none reverse",
                }
            });
            
            phase2LabelsTl.to(labelTopRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
                          .fromTo(labelTopRef.current.querySelector('.label-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 0)
                          .to(labelBotRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.6)
                          .fromTo(labelBotRef.current.querySelector('.label-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 0.6)
                          .to('.mobile-labels', { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);

            // --- 200vh -> 300vh (Phase 2 to Phase 3) ---

            // Parallax image up and fade out Phase 1/2 elements
            stl.to(imageWrapperRef.current, { yPercent: -30, opacity: 0, duration: 1, ease: "power2.inOut" }, 1);
            stl.to(title1Ref.current, { opacity: 0, duration: 0.5 }, 1);
            stl.to([labelTopRef.current, labelBotRef.current, '.mobile-labels', bgGlowRef.current], { opacity: 0, duration: 0.5 }, 1);

            // Phase 3 reveal: Statement and CTA
            // Custom word stagger for the statement
            if (statementRef.current) {
                const words = statementRef.current.querySelectorAll('.word');
                gsap.set(words, { opacity: 0, y: 20 });
                stl.to(statementRef.current, { opacity: 1, duration: 0.1 }, 1.2);
                stl.to(words, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power3.out"
                }, 1.2);
            }

            stl.to(ctaWrapRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.6);

        }, sectionRef);

        return () => {
            ctx.revert();
            if (scrollTimelineRef.current) scrollTimelineRef.current.kill(); // Cleanup
        };
    }, []);

    // Helpers to split text
    const renderChars = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    const renderWords = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
        ));
    };

    return (
        <section ref={sectionRef} className="relative w-full h-[100vh] bg-[#0A0A0A] overflow-hidden text-[#FAFAFA]">

            {/* 3D Canvas Background (Z-0) */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                <Canvas frameloop={inView ? 'always' : 'demand'} camera={{ position: [0, 0, 5], fov: 45 }}>
                    <GoldDust key={particleCount} count={particleCount} />
                </Canvas>
            </div>

            {/* Pinned Content Container (Z-10) */}
            <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">

                {/* === PHASE 1 ELEMENTS === */}
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                    <h1
                        ref={title1Ref}
                        className="font-primary font-normal text-[clamp(36px,9vw,60px)] md:text-[clamp(48px,6vw,110px)] leading-[1.1] text-center mx-auto px-8 md:px-16 lg:px-24 w-full transform-origin-center overflow-visible"
                        style={{ wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'normal' }}
                    >
                        {/* Mobile Layout */}
                        <div className="md:hidden">
                            <div>{renderChars("Where Heritage")}</div>
                            <div>{renderChars("Meets Modern")}</div>
                            <div>{renderChars("Luxury")}</div>
                        </div>
                        {/* Desktop Layout */}
                        <div className="hidden md:block">
                            <div>{renderChars("Where Heritage")}</div>
                            <div className="whitespace-nowrap">{renderChars("Meets Modern Luxury")}</div>
                        </div>
                    </h1>

                    <div ref={titleLineRef} className="h-[1px] bg-[#C9A96E] mt-8 mb-6"></div>

                    <p ref={estRef} className="font-secondary font-normal text-[12px] tracking-[0.2em] uppercase text-[#666666]">
                        Established 2024 · Mumbai
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div ref={scrollIndRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <div className="w-[1px] h-[40px] bg-gradient-to-b from-[#C9A96E] to-transparent relative overflow-hidden">
                        <div className="scroll-dot absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-[#C9A96E] rounded-full"></div>
                    </div>
                    <span className="font-secondary text-[10px] tracking-[0.2em] uppercase text-[#666666]">Scroll to Discover</span>
                </div>


                {/* === PHASE 2 ELEMENTS === */}
                {/* subtle radial gradient glow behind */}
                <div
                    ref={bgGlowRef}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                >
                    <div className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.15)_0%,rgba(10,10,10,0)_70%)] blur-3xl"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative flex flex-col items-center">
                        <div
                            ref={imageWrapperRef}
                            className="relative w-[90vw] md:w-[70vw] h-[50vh] md:h-[70vh] max-h-[800px] overflow-hidden"
                        >
                            {/* The actual jewellery image / placeholder */}
                            <div
                                ref={imageRef}
                                className="w-full h-full bg-[#1A1A1A] bg-cover bg-center border border-[#2A2A2A] relative"
                                style={{
                                    backgroundImage: `url(${heroImage})`
                                }}
                            >
                                {/* Overlay gradient to ensure it blends seamlessly on un-cropped images */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#0A0A0A_100%)] opacity-80"></div>
                            </div>
                        </div>

                        {/* Phase 2 Floating Labels (Desktop) */}
                        <div ref={labelTopRef} className="hidden md:flex absolute top-[20%] right-[10%] items-center gap-4 opacity-0 z-20">
                            <div className="w-[60px] h-[1px] bg-[#C9A96E] origin-right label-line"></div>
                            <span className="font-secondary text-[11px] uppercase tracking-[0.15em] text-[#FAFAFA] whitespace-nowrap bg-[#0A0A0A] py-1 px-2">Hand-Forged 18K Gold</span>
                        </div>

                        <div ref={labelBotRef} className="hidden md:flex absolute bottom-[20%] left-[15%] items-center gap-4 flex-row-reverse opacity-0 z-20">
                            <div className="w-[60px] h-[1px] bg-[#C9A96E] origin-left label-line"></div>
                            <span className="font-secondary text-[11px] uppercase tracking-[0.15em] text-[#FAFAFA] whitespace-nowrap bg-[#0A0A0A] py-1 px-2">Ethically Sourced Diamonds</span>
                        </div>

                        {/* Phase 2 Labels (Mobile) */}
                        <div className="md:hidden flex items-center justify-center gap-3 mt-6 opacity-0 mobile-labels z-20">
                            <span className="font-secondary text-[10px] uppercase tracking-[0.15em] text-[#FAFAFA]">Hand-Forged 18K Gold</span>
                            <div className="w-[4px] h-[4px] bg-[#C9A96E] rounded-full"></div>
                            <span className="font-secondary text-[10px] uppercase tracking-[0.15em] text-[#FAFAFA]">Ethically Sourced Diamonds</span>
                        </div>
                    </div>
                </div>


                {/* === PHASE 3 ELEMENTS === */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-auto">
                    <div className="max-w-[800px] text-center flex flex-col items-center pb-[10vh]">
                        <h2
                            ref={statementRef}
                            className="font-primary text-xl sm:text-2xl md:text-[36px] font-normal italic text-[#C9A96E] leading-relaxed mb-20 md:mb-24 transform-origin-bottom"
                        >
                            {renderWords("Every piece tells a story of artisans who have perfected their craft across generations")}
                        </h2>

                        <div ref={ctaWrapRef}>
                            <button className="group relative flex items-center justify-center px-8 py-4 md:px-10 md:py-5 border border-[#C9A96E] bg-transparent overflow-hidden rounded-[2px] transition-colors duration-500 hover:border-[#D4AF37]">
                                <div className="absolute inset-0 w-full h-full bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                                <span className="relative z-10 font-primary text-base md:text-[18px] text-[#FAFAFA] group-hover:text-[#0A0A0A] transition-colors duration-500 flex items-center gap-3 md:gap-4">
                                    Explore Collections
                                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500">→</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
