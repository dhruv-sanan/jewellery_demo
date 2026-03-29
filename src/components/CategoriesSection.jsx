import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { categories } from '../data/jewelleryData';

gsap.registerPlugin(ScrollTrigger);

const CategoryCard = ({ category, className = '', refEl }) => {
    const isLarge = category.type === 'large';
    return (
        <Link
            to={`/categories/${category.id}`}
            ref={refEl}
            className={`group relative overflow-hidden bg-[#F5F0EB] cursor-pointer block ${isLarge ? 'h-[300px] md:h-[600px]' : 'h-[300px] md:h-[290px]'} ${className}`}
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.3)_40%,transparent_70%)] pointer-events-none z-[1]" />

            {/* Animated Border lines */}
            <div className="absolute inset-4 border border-[#C9A96E] scale-105 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-100 group-hover:opacity-100 pointer-events-none z-[1]" />

            {/* Content */}
            <div className="absolute bottom-6 left-6 z-[2] transition-transform duration-[600ms] ease-out group-hover:-translate-y-2">
                <h3 className={`font-primary text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center gap-3 ${isLarge ? 'text-[28px]' : 'text-[22px]'}`}>
                    {category.name}
                    <span className="text-[#C9A96E] font-secondary text-[14px] font-normal opacity-0 -translate-x-4 transition-all duration-[600ms] delay-100 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                        Explore &rarr;
                    </span>
                </h3>
                <p className="font-secondary text-[#C9A96E] text-[12px] mt-1 uppercase tracking-[0.15em]">{category.count}</p>
            </div>
        </Link>
    );
};

const CategoriesSection = () => {
    const sectionRef = useRef(null);
    const titleContainerRef = useRef(null);
    const cardsRef = useRef([]);
    const mobileWrappersRef = useRef([]);
    const mobileInnerRef = useRef([]);

    // Split text helper
    const SplitText = ({ text, className = '' }) => {
        return (
            <span className={`inline-block overflow-hidden ${className}`}>
                {text.split('').map((char, i) => (
                    <span key={i} className="split-char inline-block translate-y-[120%] opacity-0">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        );
    };

    useGSAP(() => {
            // Title Animation
            const chars = titleContainerRef.current.querySelectorAll('.split-char');

            gsap.to(chars, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    fastScrollEnd: true,
                },
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.03,
                force3D: true,
            });

            // Subtitle Line Animation
            gsap.fromTo('.subtitle-line',
                { width: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        fastScrollEnd: true,
                    },
                    width: 40,
                    duration: 1.2,
                    ease: 'power3.out',
                    force3D: true,
                }
            );

            // Subtitle Text Animation
            gsap.fromTo('.subtitle-text',
                { opacity: 0, x: -20 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        fastScrollEnd: true,
                    },
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.2,
                    force3D: true,
                }
            );

            // Cards Animations (desktop only — md: breakpoint)
            const isDesktop = window.matchMedia('(min-width: 768px)').matches;

            if (isDesktop) {
                const largeCards = cardsRef.current.filter((_, i) => categories[i].type === 'large');
                const smallCards = cardsRef.current.filter((_, i) => categories[i].type === 'small');

                // Large cards: fade in + subtle rise, triggered once on enter
                largeCards.forEach(card => {
                    gsap.fromTo(card,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.4,
                            ease: 'power4.out',
                            force3D: true,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 95%',
                                fastScrollEnd: true,
                            }
                        }
                    );
                });

                // Small cards: fade in individually based on each card's position
                smallCards.forEach((card, i) => {
                    gsap.fromTo(card,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out',
                            delay: i * 0.1,
                            force3D: true,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 95%',
                                fastScrollEnd: true,
                            }
                        }
                    );
                });
            }

            // Mobile Cards Stacking Animations
            const mWrappers = mobileWrappersRef.current.filter(Boolean);
            const mMainCards = mobileInnerRef.current.filter(Boolean);

            mWrappers.forEach((wrapper, i) => {
                // Entry animation (new card fading in)
                gsap.fromTo(wrapper,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        force3D: true,
                        scrollTrigger: {
                            trigger: wrapper,
                            start: 'top 85%',
                            fastScrollEnd: true,
                        }
                    }
                );

                const nextWrapper = mWrappers[i + 1];
                const cardInner = mMainCards[i];
                if (nextWrapper && cardInner) {
                    gsap.to(cardInner, {
                        scale: 0.92,
                        opacity: 0.6,
                        filter: 'blur(4px)',
                        transformOrigin: 'top center',
                        force3D: true,
                        scrollTrigger: {
                            trigger: nextWrapper,
                            start: 'top bottom-=10%', // start when next card appears
                            end: 'top 15%', // end when next card hits the sticky point
                            scrub: true,
                        }
                    });
                }
            });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#F5F0EB] py-[160px] px-6 lg:px-12 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center mb-24 text-center">
                    <div className="flex flex-col items-center mb-[16px]">
                        <div className="subtitle-line h-[1px] bg-[#C9A96E] mb-[12px]" />
                        <span className="subtitle-text font-secondary text-[11px] uppercase tracking-[0.3em] text-[#C9A96E]">
                            EXPLORE
                        </span>
                    </div>
                    <h2
                        ref={titleContainerRef}
                        className="font-primary text-[#1A1A1A] font-normal"
                        style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                    >
                        <SplitText text="Our Collections" />
                    </h2>
                </div>

                {/* Desktop Grid Layout (hidden on mobile) */}
                <div className="hidden md:flex flex-col gap-6">
                    {/* Row 1 */}
                    <div className="flex gap-6 h-[600px]">
                        <div className="w-[55%] h-full">
                            <CategoryCard
                                category={categories[0]}
                                refEl={el => cardsRef.current[0] = el}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-[45%] h-full flex flex-col justify-between">
                            <CategoryCard category={categories[1]} refEl={el => cardsRef.current[1] = el} />
                            <CategoryCard category={categories[2]} refEl={el => cardsRef.current[2] = el} />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex gap-6 h-[600px] mt-6">
                        <div className="w-[45%] h-full flex flex-col justify-between">
                            <CategoryCard category={categories[3]} refEl={el => cardsRef.current[3] = el} />
                            <CategoryCard category={categories[4]} refEl={el => cardsRef.current[4] = el} />
                        </div>
                        <div className="w-[55%] h-full">
                            <CategoryCard
                                category={categories[5]}
                                refEl={el => cardsRef.current[5] = el}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile / Tablet Layout (hidden on desktop) */}
                <div className="md:hidden flex flex-col relative pb-[15vh]">
                    {categories.map((category, index) => (
                        <div 
                            key={category.id} 
                            ref={el => mobileWrappersRef.current[index] = el}
                            className="sticky w-full"
                            style={{ 
                                zIndex: index + 1,
                                top: `calc(10vh + ${index * 20}px)`,
                                paddingTop: '16px'
                            }}
                        >
                            <div ref={el => mobileInnerRef.current[index] = el} className="w-full">
                                <CategoryCard
                                    category={category}
                                    className="w-full shadow-[0_-10px_30px_rgba(0,0,0,0.15)] overflow-hidden"
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategoriesSection;
