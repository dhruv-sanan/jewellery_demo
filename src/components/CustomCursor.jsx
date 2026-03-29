import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isTouchDevice || windowWidth < 1024) return;

        // Hide cursor initially until we get the first mousemove
        gsap.set(cursorRef.current, { scale: 0, opacity: 0 });

        const onMouseMove = (e) => {
            // Show cursor and position it
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out',
                scale: isHovering ? 4 : 1, // 12px -> 48px
                opacity: 1,
            });
        };

        const handleMouseOver = (e) => {
            // Check if hovering over an interactive element
            const target = e.target;
            const isInteractive = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.hasAttribute('data-cursor-hover') ||
                target.tagName === 'IMG';

            if (isInteractive) {
                setIsHovering(true);
                gsap.to(cursorRef.current, { scale: 4, duration: 0.3, ease: 'power2.out' });
            } else {
                setIsHovering(false);
                gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
            }
        };

        const onMouseLeave = () => {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });
        };

        const onMouseEnter = () => {
            gsap.to(cursorRef.current, { scale: isHovering ? 4 : 1, opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [isHovering, isTouchDevice, windowWidth]);

    if (isTouchDevice || windowWidth < 1024) return null;

    return (
        <div
            ref={cursorRef}
            className="custom-cursor hidden md:block fixed top-0 left-0 w-3 h-3 bg-[#C9A96E] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{
                transformOrigin: "center top", // Customizing transform origin for better centering
                willChange: "transform"
            }}
        />
    );
}
