import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerRef = useRef(null);

    const columnsRef = useRef([]);
    const newsletterRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Footer columns stagger animation
            gsap.fromTo(columnsRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 85%',
                    }
                }
            );

            // Newsletter fade in
            gsap.fromTo(newsletterRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 85%',
                    }
                }
            );

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const categoryLinks = ['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Bracelets', 'Bridal'];
    const companyLinks = [
        { label: 'Our Story', to: '/heritage' },
        { label: 'Craftsmanship', to: '/heritage' },
        { label: 'Sustainability', to: '/heritage' },
        { label: 'Careers', to: '/contact' },
        { label: 'Press', to: '/contact' },
    ];

    return (
        <div ref={footerRef}>
            {/* Main Footer */}
            <footer className="bg-background w-full relative pt-[120px] pb-6 px-6 md:px-12 text-[#888] font-secondary text-sm">
                {/* Gold gradient visual separator */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,transparent,#C9A96E,transparent)] opacity-50" />

                <div className="max-w-7xl mx-auto">

                    {/* 4 Columns Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16 mb-24">

                        {/* Column 1 - Brand */}
                        <div ref={el => columnsRef.current[0] = el} className="flex flex-col">
                            <Link to="/" className="font-primary text-2xl text-[#C9A96E] tracking-[0.3em] mb-6 w-fit">MAISON</Link>
                            <p className="mb-8 max-w-[250px] leading-relaxed">
                                Redefining luxury jewellery for the modern world.
                            </p>
                            <div className="flex gap-6 items-center flex-wrap">
                                <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-[#C9A96E] transition-colors duration-300">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" aria-label="Pinterest" className="text-gray-500 hover:text-[#C9A96E] transition-colors duration-300">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.4l1.39-5.9s-.35-.71-.35-1.76c0-1.65.96-2.88 2.15-2.88 1.01 0 1.5.76 1.5 1.67 0 1.02-.65 2.54-.98 3.95-.28 1.17.59 2.13 1.74 2.13 2.09 0 3.69-2.2 3.69-5.38 0-2.81-2.02-4.78-4.9-4.78-3.34 0-5.3 2.5-5.3 5.09 0 1.01.39 2.09.87 2.68a.35.35 0 0 1 .08.34l-.33 1.33c-.05.21-.17.26-.39.15-1.46-.68-2.37-2.81-2.37-4.52 0-3.68 2.67-7.06 7.7-7.06 4.04 0 7.18 2.88 7.18 6.73 0 4.01-2.53 7.25-6.04 7.25-1.18 0-2.29-.61-2.67-1.34l-.73 2.77c-.26 1.01-.97 2.28-1.45 3.05A12 12 0 1 0 12 0z"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-[#C9A96E] transition-colors duration-300">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-[#C9A96E] transition-colors duration-300">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Column 2 - Collections */}
                        <div ref={el => columnsRef.current[1] = el} className="flex flex-col">
                            <h4 className="text-gold-muted text-[11px] uppercase tracking-[0.2em] mb-8 font-medium">Collections</h4>
                            <div className="flex flex-col gap-4">
                                {categoryLinks.map(name => (
                                    <Link
                                        key={name}
                                        to={`/categories/${name.toLowerCase()}`}
                                        className="hover:text-[#FAFAFA] hover:translate-x-[4px] transition-transform duration-300 w-fit"
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3 - Company */}
                        <div ref={el => columnsRef.current[2] = el} className="flex flex-col">
                            <h4 className="text-gold-muted text-[11px] uppercase tracking-[0.2em] mb-8 font-medium">Maison</h4>
                            <div className="flex flex-col gap-4">
                                {companyLinks.map(link => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className="hover:text-[#FAFAFA] hover:translate-x-[4px] transition-transform duration-300 w-fit"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 4 - Connect */}
                        <div ref={el => columnsRef.current[3] = el} className="flex flex-col">
                            <h4 className="text-gold-muted text-[11px] uppercase tracking-[0.2em] mb-8 font-medium">Visit Us</h4>
                            <div className="flex flex-col gap-4">
                                <p className="leading-relaxed">
                                    Ambawata One, Seth Sarai,<br/>
                                    Mehrauli, New Delhi 110030
                                </p>
                                <p>+91 11 4141 1411</p>
                                <a href="mailto:hello@purabpaschim.com" className="hover:text-[#FAFAFA] transition-colors w-fit">
                                    hello@purabpaschim.com
                                </a>
                                <p className="italic mt-2">By Appointment Only</p>
                            </div>
                        </div>

                    </div>

                    {/* Newsletter Row */}
                    <div ref={newsletterRef} className="border-t border-[#2A2A2A] py-16 flex flex-col w-full justify-between items-start md:items-center gap-8 md:flex-row">
                        <div className="font-primary italic text-[24px] text-[#FAFAFA]">
                            Subscribe to our world
                        </div>
                        <form className="flex w-full md:w-auto flex-1 md:max-w-md items-center group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-transparent border-b border-[#C9A96E] py-2 w-full focus:outline-none text-[#FAFAFA] placeholder:text-[#666] text-[13px] tracking-wide"
                            />
                            <button type="submit" className="ml-4 w-8 h-8 rounded-full border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#0A0A0A] transition-colors flex-shrink-0">
                                →
                            </button>
                        </form>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[#2A2A2A] py-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#666]">
                        <p>© {new Date().getFullYear()} MAISON. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link to="#" className="hover:text-gold-muted transition-colors">Privacy Policy</Link>
                            <span>·</span>
                            <Link to="#" className="hover:text-gold-muted transition-colors">Terms of Service</Link>
                            <span>·</span>
                            <Link to="#" className="hover:text-gold-muted transition-colors">Sitemap</Link>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;
