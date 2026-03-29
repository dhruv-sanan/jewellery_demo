import React, { useEffect, useState } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 border border-white/20 bg-[#0A0A0A]/80 backdrop-blur-sm text-gold transition-all duration-500 hover:bg-gold hover:text-background flex items-center justify-center
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Back to top"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
                <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
        </button>
    );
};

export default BackToTop;
