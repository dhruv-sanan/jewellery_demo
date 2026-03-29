import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle nav clicks — always navigate, never hijack to scroll
    const handleNavClick = (e, link) => {
        // Let React Router handle all navigation normally
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { title: "Collections", to: "/collections" },
        { title: "Categories", to: "/categories", scrollTarget: "categories-section" },
        { title: "Heritage", to: "/heritage" },
        { title: "Atelier", to: "/atelier" },
        { title: "Contact", to: "/contact" },
    ];

    const socialLinks = [
        { title: "Instagram", href: "https://instagram.com", external: true },
        { title: "Pinterest", href: "https://pinterest.com", external: true },
        { title: "Facebook", href: "https://facebook.com", external: true },
    ];

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const fadeSlideDown = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
    };

    const staggerMobileLinks = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
    };

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="show"
                variants={staggerContainer}
                className={`fixed top-0 left-0 w-full ${isOpen ? 'z-[60]' : 'z-50'} flex justify-between items-center ${scrolled
                    ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] py-5'
                    : 'bg-transparent border-b border-transparent py-8'
                    } px-6 md:px-12`}
                style={{ transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease' }}
            >
                {/* Left: MAISON Logo */}
                <motion.div variants={fadeSlideDown} className="w-auto md:w-1/4 flex-shrink-0">
                    <Link
                        to="/"
                        className="font-primary font-semibold text-2xl tracking-[0.3em] uppercase text-[#C9A96E]"
                        style={{ WebkitTextStroke: '0.5px rgba(201, 169, 110, 0.2)' }}
                    >
                        MAISON
                    </Link>
                </motion.div>

                {/* Center: Desktop Links */}
                <div className="hidden lg:flex justify-center items-center gap-10 w-2/4">
                    {navLinks.map((link, idx) => (
                        <motion.div key={idx} variants={fadeSlideDown}>
                            <NavLink
                                to={link.to}
                                onClick={(e) => handleNavClick(e, link)}
                                className={({ isActive }) =>
                                    `relative font-secondary font-normal text-[13px] tracking-[0.15em] uppercase py-2 transition-colors duration-300 group ${
                                        isActive ? 'text-gold' : 'text-text-light hover:text-gold'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Gold dot above active link */}
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 -top-3 w-1 h-1 bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                                                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                            }`}
                                        />
                                        {link.title}
                                        <span
                                            className={`absolute left-0 -bottom-1 h-[1px] bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Desktop Icons & CTA */}
                <motion.div variants={fadeSlideDown} className="hidden lg:flex justify-end items-center gap-8 w-1/4">
                    <div className="flex items-center gap-6">
                        <button className="text-[#FAFAFA] hover:text-[#C9A96E] transition-colors duration-300">
                            <Search strokeWidth={1} size={20} />
                        </button>
                    </div>
                    <Link
                        to="/book-appointment"
                        className="font-secondary font-normal text-[12px] tracking-[0.15em] uppercase text-[#C9A96E] border border-[#C9A96E] px-6 py-3 transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                    >
                        Book Appointment
                    </Link>
                </motion.div>

                {/* Mobile Hamburger Icon */}
                <motion.button
                    variants={fadeSlideDown}
                    className="lg:hidden z-[60] flex flex-col justify-center items-end w-8 h-8 space-y-2 group"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span
                        className={`block h-[1px] bg-[#C9A96E] transition-transform duration-500 ease-in-out ${isOpen ? 'w-8 rotate-45 translate-y-[9px]' : 'w-8 group-hover:w-6'
                            }`}
                    ></span>
                    <span
                        className={`block h-[1px] bg-[#C9A96E] transition-transform duration-500 ease-in-out ${isOpen ? 'w-8 -rotate-45 -translate-y-[0px]' : 'w-6 group-hover:w-8'
                            }`}
                    ></span>
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-[#0A0A0A] z-[55] flex flex-col px-6 pt-32 pb-12 lg:hidden overflow-y-auto"
                    >
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="flex-1 flex flex-col justify-center gap-6 mt-10"
                        >
                            {navLinks.map((link, i) => (
                                <motion.div key={i} variants={staggerMobileLinks} className="w-full">
                                    <Link
                                        to={link.to}
                                        className="block font-primary text-[48px] leading-none text-[#FAFAFA] font-normal tracking-wide hover:text-[#C9A96E] transition-colors pb-4"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.title}
                                    </Link>
                                    <div className="w-full h-[1px] bg-[#2A2A2A]"></div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-16 flex flex-col gap-10"
                        >
                            <div className="flex gap-8 justify-center">
                                {socialLinks.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-secondary text-[11px] tracking-[0.2em] uppercase text-[#FAFAFA] hover:text-[#C9A96E] transition-colors"
                                    >
                                        {social.title}
                                    </a>
                                ))}
                            </div>
                            <Link
                                to="/book-appointment"
                                onClick={() => setIsOpen(false)}
                                className="w-full font-secondary font-normal text-[13px] tracking-[0.15em] uppercase text-[#0A0A0A] bg-[#C9A96E] py-4 hover:bg-[#D4AF37] transition-colors text-center"
                            >
                                Book Appointment
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
