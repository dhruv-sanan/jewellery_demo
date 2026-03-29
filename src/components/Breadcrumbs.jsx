import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collections, categories } from '../data/jewelleryData';

gsap.registerPlugin(ScrollTrigger);

// Build a readable name from a slug
function slugToTitle(slug) {
  // Check collections
  const col = collections.find(c => c.slug === slug);
  if (col) return col.name;
  // Check categories
  const cat = categories.find(c => c.slug === slug);
  if (cat) return cat.name;
  // Fallback: capitalize words
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const routeLabels = {
  collections: 'Collections',
  categories: 'Categories',
  heritage: 'Heritage',
  atelier: 'Atelier',
  contact: 'Contact',
  'book-appointment': 'Book Appointment',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Must call all hooks before any early return (Rules of Hooks)
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Don't render on homepage
  if (location.pathname === '/') return null;

  const segments = location.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [{ label: 'Home', to: '/' }];

  segments.forEach((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const isLast = i === segments.length - 1;
    const label = routeLabels[seg] || slugToTitle(seg);
    crumbs.push({ label, to: path, isLast });
  });

  return (
    <div
      ref={breadcrumbRef}
      className={`fixed top-[65px] left-0 w-full z-40 px-6 py-2 transition-all duration-500 md:hidden block ${
        visible
          ? 'opacity-100 translate-y-0 bg-background/60 backdrop-blur-sm'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center gap-2 font-secondary text-[12px] tracking-[0.05em]">
        {crumbs.map((crumb, i) => (
          <span key={crumb.to} className="flex items-center gap-2">
            {i > 0 && <span className="text-text-muted">/</span>}
            {crumb.isLast ? (
              <span className="text-gold">{crumb.label}</span>
            ) : (
              <Link to={crumb.to} className="text-text-muted hover:text-text-light transition-colors duration-300">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
