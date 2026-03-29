import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function LoadingBar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 h-[2px] bg-gold z-[1000]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          exit={{ opacity: 0 }}
          transition={{
            width: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.3, delay: 0 },
          }}
        />
      )}
    </AnimatePresence>
  );
}
