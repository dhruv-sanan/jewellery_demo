import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
    "Handcrafted Excellence",
    "Since 1985",
    "Ethical Sourcing",
    "Mumbai · New York · London",
    "Bespoke Luxury",
    "Heritage Redefined"
];

const MarqueeStrip = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                force3D: true,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#0A0A0A] border-y border-[#2A2A2A] flex items-center overflow-hidden h-[70px] md:h-[100px] relative z-10"
        >
            <style>{`
              @keyframes marqueeContinuous {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.3333%); }
              }
              .animate-marquee-continuous {
                animation: marqueeContinuous 35s linear infinite;
              }
            `}</style>
            <div className="flex w-fit animate-marquee-continuous whitespace-nowrap">
                {/* 3x duplicate for seamless 33% loop */}
                {[...Array(3)].map((_, arrayIndex) => (
                    <div key={arrayIndex} className="flex items-center shrink-0">
                        {marqueeItems.map((item, index) => (
                            <React.Fragment key={`${arrayIndex}-${index}`}>
                                <span className="font-primary text-white text-[13px] md:text-[16px] uppercase tracking-[0.15em] px-8 md:px-12">
                                    {item}
                                </span>
                                <span className="text-[#C9A96E] text-[10px] md:text-[12px] flex-shrink-0 mt-[-2px]">
                                    ✦
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarqueeStrip;
