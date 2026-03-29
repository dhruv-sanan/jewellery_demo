import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { collections } from '../data/jewelleryData'

// ─── Product Modal ─────────────────────────────────────────────────
export default function ProductModal({ product, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState(0)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(0)
  }, [product?.id])

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  if (!product) return null

  const collection = collections.find((c) => c.slug === product.collection)
  const collectionName = collection ? collection.name : ''

  // Build gallery — currently single image per product;
  // structure supports multiple when assets are added
  const images = [product.image, product.image, product.image]

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the "${product.name}" (${product.price}) from the ${collectionName} collection at MAISON. Could you provide more details?`
  )

  const bookingUrl = `/book-appointment?product=${encodeURIComponent(product.name)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-8"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,10,0.85)' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-background w-full max-w-[1000px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row border border-border-dark"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-text-light/60 hover:text-gold transition-colors duration-300"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>

            {/* ── Left: Image Gallery ── */}
            <div className="w-full md:w-[55%] flex-shrink-0">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 font-secondary text-[10px] tracking-[0.2em] uppercase bg-gold text-background px-3 py-1">
                    New
                  </span>
                )}
              </div>

              {/* Thumbnail dots */}
              <div className="flex items-center justify-center gap-3 py-4">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      activeImage === idx
                        ? 'bg-gold scale-125'
                        : 'bg-[#444] hover:bg-[#666]'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: Product Details ── */}
            <div className="w-full md:w-[45%] px-6 md:px-10 py-8 md:py-10 flex flex-col justify-center">
              {/* Collection tag */}
              {collection && (
                <Link
                  to={`/collections/${collection.slug}`}
                  className="inline-block font-secondary text-[11px] tracking-[0.25em] text-gold uppercase mb-4 hover:text-gold-hover transition-colors duration-300"
                >
                  {collectionName}
                </Link>
              )}

              {/* Product name */}
              <h2 className="font-primary text-[26px] md:text-[28px] text-text-light font-normal uppercase tracking-[0.08em] leading-[1.2] mb-4">
                {product.name}
              </h2>

              {/* Material */}
              <p className="font-secondary text-[13px] text-[#AAA] tracking-wide mb-3">
                {product.material}
              </p>

              {/* Price */}
              <p className="font-primary text-[22px] md:text-[24px] text-gold font-normal mb-6">
                {product.price}
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-border-dark mb-6" />

              {/* Description */}
              <p className="font-secondary text-[14px] text-[#999] leading-[1.8] mb-8">
                A masterfully crafted piece from the {collectionName} collection, this {product.name.toLowerCase()} exemplifies the art of fine jewellery through exquisite materials and meticulous attention to detail.
              </p>

              {/* Atelier note */}
              <p className="font-secondary text-[12px] text-[#666] tracking-wide leading-[1.7] mb-8 italic">
                This piece is available for private viewing at our atelier
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  to={bookingUrl}
                  className="group flex items-center justify-center gap-2 font-secondary text-[13px] tracking-[0.15em] uppercase text-background bg-gold px-6 py-4 transition-all duration-500 hover:bg-gold-hover"
                >
                  <span>Book a Viewing</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>

                <a
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 font-secondary text-[13px] tracking-[0.15em] uppercase text-gold border border-gold px-6 py-4 transition-all duration-500 hover:bg-gold hover:text-background"
                >
                  <span>Inquire via WhatsApp</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
