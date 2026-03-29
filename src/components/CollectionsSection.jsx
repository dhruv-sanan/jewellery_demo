import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgBloom from '../assets/eternal_bloom_collection_1773561954785.jpg';
import imgCelestial from '../assets/celestial_radiance_collection_1773561972307.jpg';
import imgHeritage from '../assets/heritage_redux_collection_1773561991971.jpg';
import imgMidnight from '../assets/midnight_garden_collection_1773562006471.jpg';

gsap.registerPlugin(ScrollTrigger);

const collections = [
    {
        id: 1,
        slug: "eternal-bloom",
        tag: "AUTUMN/WINTER 2024",
        title: "The Eternal Bloom",
        description: "Inspired by the eternal beauty of blooming gardens, this collection features organic gold forms adorned with brilliant-cut diamonds and vivid gemstones.",
        count: "12 Exclusive Pieces",
        image: imgBloom
    },
    {
        id: 2,
        slug: "celestial-radiance",
        tag: "SPRING / SUMMER 2025",
        title: "Celestial Radiance",
        description: "Drawing from the cosmos, each piece captures the ethereal glow of moonstone paired with the brilliance of VS-clarity diamonds in platinum settings.",
        count: "8 Exclusive Pieces",
        image: imgCelestial
    },
    {
        id: 3,
        slug: "heritage-redux",
        tag: "TRADITIONAL",
        title: "Heritage Redux",
        description: "A reimagining of centuries-old kundan techniques through a contemporary lens. Each piece bridges ancestral artistry and modern aesthetics.",
        count: "15 Exclusive Pieces",
        image: imgHeritage
    },
    {
        id: 4,
        slug: "midnight-garden",
        tag: "COCKTAIL & EVENING",
        title: "Midnight Garden",
        description: "Bold, dramatic pieces designed for the night. Deep sapphires, black onyx, and dark emeralds set in architectural gold formations.",
        count: "10 Exclusive Pieces",
        image: imgMidnight
    }
];

export default function CollectionsSection() {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Animate Header
            const headerTextGroup = gsap.utils.toArray(['.header-title', '.header-desc']);
            gsap.fromTo(
                headerTextGroup,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        fastScrollEnd: true,
                    },
                }
            );

            gsap.fromTo('.header-line', { width: 0 }, { width: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }});
            gsap.fromTo('.header-tag', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }});

            // Horizontal Scroll Animation
            
            const totalWidth = scrollContainerRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(scrollContainerRef.current, {
                x: () => -scrollDistance,
                ease: "none",
            });

            // Animate Cards entering horizontally
            const cards = gsap.utils.toArray('.collection-card');

            cards.forEach((card, i) => {
                const tag = card.querySelector('.c-tag');
                const title = card.querySelector('.c-title');
                const desc = card.querySelector('.c-desc');
                const count = card.querySelector('.c-count');
                const cta = card.querySelector('.c-cta');

                // Initial state
                gsap.set([tag, title, desc, count, cta], { opacity: 0 });
                gsap.set(title, { y: 30 });

                ScrollTrigger.create({
                    trigger: card,
                    containerAnimation: tl,
                    start: 'left 70%',
                    end: 'right 30%',
                    onToggle: (self) => {
                        if (self.isActive && !self.animated) {
                            self.animated = true;
                            gsap.to(tag, { opacity: 1, duration: 0.8, ease: 'power2.out' });
                            gsap.to(title, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
                            gsap.to([desc, count], { opacity: 1, duration: 0.8, delay: 0.5, stagger: 0.1, ease: 'power2.out' });
                            gsap.to(cta, { opacity: 1, duration: 0.8, delay: 0.7, ease: 'power2.out' });
                        }
                    },
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // We no longer need smooth scroll buttons as the entire section is powered by native scroll
    const scrollToCard = (idx) => {
        // Calculate the scroll position needed to bring the card into view
        const cards = scrollContainerRef.current.querySelectorAll('.collection-card');
        if (cards[idx]) {
             // For a pinned horizontal section, scrolling the window vertically scrolls the timeline
             // We estimate the vertical offset based on the timeline progress
             
             // This can be complex depending on exact widths, but a simple approximation is calculating
             // the horizontal offset of the card and translating that to vertical scroll offset
             const cardEl = cards[idx];
             const containerRect = scrollContainerRef.current.getBoundingClientRect();
             const cardRect = cardEl.getBoundingClientRect();
             
             // Initial offset from the container's left
             // Note: getBoundingClientRect() changes as it translates, so we use offsetLeft
             const targetX = cardEl.offsetLeft - (window.innerWidth - cardEl.offsetWidth) / 2;
             
             const scrollDistance = scrollContainerRef.current.scrollWidth - window.innerWidth;
             
             // Find timeline progress: targetX / scrollDistance
             const progress = Math.max(0, Math.min(1, targetX / scrollDistance));
             
             // Calculate absolute vertical scroll position
             const triggerInfo = ScrollTrigger.getAll().find(st => st.pin === sectionRef.current);
             if (triggerInfo) {
                 const start = triggerInfo.start;
                 const end = triggerInfo.end;
                 const targetScroll = start + (end - start) * progress;
                 window.scrollTo({ top: targetScroll, behavior: 'smooth' });
             }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="bg-[#0A0A0A] text-[#FAFAFA] h-screen flex flex-col justify-center relative w-full overflow-hidden"
        >
            <div className="container mx-auto px-6 mb-6 md:mb-12 relative z-10 flex-shrink-0 mt-8 md:mt-16">
                <div className="max-w-xl">
                    <div className="flex flex-col items-start mb-[16px]">
                        <div className="header-line h-[1px] w-0 bg-[#C9A96E] mb-[12px]" />
                        <span className="header-tag font-secondary text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] opacity-0">
                            LATEST
                        </span>
                    </div>
                    <h2 className="header-title font-primary text-[clamp(36px,5vw,64px)] leading-tight mb-4 md:mb-6">
                        New Collections
                    </h2>
                    <p className="header-desc font-secondary text-[16px] font-light text-[#888] leading-relaxed max-w-[500px]">
                        Each collection is a chapter in our story of timeless elegance.
                    </p>
                </div>
            </div>

            {/* Horizontal Track */}
            <div className="flex-grow flex items-center w-full">
                <div
                    ref={scrollContainerRef}
                    className="flex flex-nowrap w-max will-change-transform"
                >
                    {/* Padding at start */}
                    <div className="w-[10vw] flex-shrink-0 md:w-[10vw]"></div>

                    {collections.map((item, idx) => (
                        <div
                            key={item.id}
                            className="collection-card flex-shrink-0 w-[85vw] md:w-[70vw] h-auto max-h-[82vh] md:max-h-none md:h-[60vh] mr-6 md:mr-10 flex flex-col md:flex-row shadow-2xl bg-[#111] rounded-xl border border-white/5 md:border-none md:rounded-none overflow-hidden"
                        >
                            {/* Image Panel */}
                            <div className="w-full md:w-[55%] h-[35vh] md:h-full relative overflow-hidden bg-[#111] shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                            </div>

                            {/* Content Panel */}
                            <div className="w-full md:w-[45%] h-auto md:h-full flex flex-col justify-start md:justify-center px-6 pt-5 pb-4 md:p-16 relative">
                                <span className="c-tag font-secondary text-[10px] md:text-[11px] text-[#C9A96E] tracking-[0.2em] mb-2 md:mb-4 block">
                                    {item.tag}
                                </span>
                                <h3 className="c-title font-primary text-[28px] md:text-[42px] text-[#FAFAFA] mb-2 md:mb-6 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="c-desc font-secondary text-[13px] md:text-[15px] font-light text-[#aaa] md:text-[#999] leading-[1.6] md:leading-[1.8] mb-3 md:mb-8 line-clamp-3 md:line-clamp-none">
                                    {item.description}
                                </p>

                                <div className="c-count inline-block mb-3 md:mb-10">
                                    <span className="font-secondary text-[11px] md:text-[13px] text-[#C9A96E] tracking-[0.1em] uppercase">
                                        {item.count}
                                    </span>
                                </div>

                                <div className="c-cta mt-0 md:mt-auto md:mt-0">
                                    <Link to={`/collections/${item.slug}`} className="group inline-flex items-center text-[#C9A96E] font-secondary text-[13px] md:text-[14px] tracking-wider relative pb-1">
                                        <span>View Collection</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Padding at end */}
                    <div className="w-[10vw] flex-shrink-0"></div>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 flex items-center justify-center gap-4">
                {collections.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 border border-[#C9A96E] ${activeIndex === idx ? 'bg-[#C9A96E] scale-110' : 'bg-transparent'
                            }`}
                        onClick={() => scrollToCard(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

