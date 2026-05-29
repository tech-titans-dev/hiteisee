import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-highlight/5" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center mb-8"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full scale-[2] animate-pulse-slow" />

              <div className="bg-white rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-primary/10 relative z-10 overflow-hidden border border-border px-6 py-4">
                <img src="/logo/logo.png" alt="Hiteisee Consulting Logo" className="h-16 md:h-20 w-auto object-contain" />
              </div>
            </motion.div>

            {/* Logo text is included in the image */}

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-muted rounded-full mt-10 overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

