import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    // Split "MAISON" into an array of letters for staggering
    const letters = "MAISON".split('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.18,
                delayChildren: 0.4,
            }
        },
        exit: {
            y: "-100%", // Curtain up effect
            transition: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1], // power4.inOut equivalent
                delay: 0.3
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.33, 1, 0.68, 1] // power3.out equivalent
            }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 1.0,
                ease: [0.76, 0, 0.24, 1],
                delay: 2.0 // Wait for letters to finish
            }
        }
    };

    useEffect(() => {
        // Total duration of preloader animation
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
                setTimeout(onComplete, 1000); // Trigger complete after exit animation
            }
        }, 3600); // slowed down for luxury feel

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="relative flex flex-col items-center overflow-hidden">
                        <h1 className="flex font-primary text-text-light text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] font-light">
                            {letters.map((letter, index) => (
                                <motion.span key={index} variants={letterVariants} className="inline-block">
                                    {letter}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.div
                            className="absolute -bottom-4 w-full h-[1px] bg-gold-muted origin-left"
                            variants={lineVariants}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
