import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
