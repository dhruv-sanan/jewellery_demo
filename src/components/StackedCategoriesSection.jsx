import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import necklacesImg from '../assets/categories/necklaces.jpg';
import ringsImg from '../assets/categories/rings.jpg';
import earringsImg from '../assets/categories/earrings.jpg';
import banglesImg from '../assets/categories/bangles.jpg';
import braceletsImg from '../assets/categories/bracelets.jpg';
import bridalImg from '../assets/categories/bridal.jpg';

const categories = [
  { id: 'necklaces', name: 'Necklaces', count: '48 PIECES', image: necklacesImg },
  { id: 'rings', name: 'Rings', count: '24 PIECES', image: ringsImg },
  { id: 'earrings', name: 'Earrings', count: '62 PIECES', image: earringsImg },
  { id: 'bangles', name: 'Bangles', count: '36 PIECES', image: banglesImg },
  { id: 'bracelets', name: 'Bracelets', count: '18 PIECES', image: braceletsImg },
  { id: 'bridal', name: 'Bridal', count: '12 SETS', image: bridalImg },
];

const NAVBAR_HEIGHT = 80; // px
const CARD_OFFSET = 30;   // px between each card's sticky top position

const StackedCategoriesSection = () => {
  const [behindSet, setBehindSet] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('[data-sticky-card]');
      const newBehind = new Set();

      cards.forEach((card, index) => {
        if (index >= cards.length - 1) return;
        const nextCard = cards[index + 1];
        const cardRect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        const currentOffset = isMobile ? 0 : CARD_OFFSET;

        // When the next card's top is within the offset gap of this card's top,
        // this card is being covered
        if (nextRect.top - cardRect.top <= currentOffset + 5) {
          newBehind.add(index);
        }
      });

      setBehindSet(newBehind);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section className="pt-24 pb-8 md:pb-24 px-4 md:px-8 bg-[#F5F0EB]">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <p className="text-[#C4A35A] tracking-[0.2em] uppercase text-sm mb-4 font-secondary">Explore</p>
        <h2 className="text-4xl md:text-5xl font-primary text-gray-900">
          Our Collections
        </h2>
      </div>

      {/* 
        CRITICAL: This container must NOT have overflow: hidden/auto/scroll.
        No transform, filter, or will-change on this element either.
      */}
      <div ref={containerRef} className="max-w-5xl mx-auto relative">
        {categories.map((category, index) => {
          const isBehind = behindSet.has(index);
          const currentOffset = isMobile ? 0 : CARD_OFFSET;
          const stickyTop = NAVBAR_HEIGHT + index * currentOffset;

          return (
            <Link
              to={`/categories/${category.id}`}
              key={category.id}
              data-sticky-card
              className="sticky w-full rounded-[24px] overflow-hidden block"
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 1,
                height: isMobile ? '82vh' : '85vh',
                marginBottom: index === categories.length - 1 ? '5vh' : '15vh',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                // DO NOT put filter or transform here for default state
                transform: isBehind ? 'scale(0.96)' : undefined,
                transition: 'transform 0.4s ease',
              }}
            >
              {/* Background image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Dimming overlay — uses opacity instead of filter on the sticky element */}
              <div
                className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out"
                style={{
                  zIndex: 2,
                  opacity: isBehind ? 0.35 : 0,
                }}
              />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-[3]">
                <h3 className="text-4xl md:text-6xl text-white mb-3 font-primary">
                  {category.name}
                </h3>
                <p className="text-[#C4A35A] tracking-[0.2em] uppercase text-sm md:text-base font-secondary">
                  {category.count}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default StackedCategoriesSection;
