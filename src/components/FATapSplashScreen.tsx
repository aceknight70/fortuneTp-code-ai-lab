import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ChevronRight, Zap } from 'lucide-react';

interface FATapSplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export const FATapSplashScreen: React.FC<FATapSplashScreenProps> = ({
  onComplete,
  durationMs = 2200,
}) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, durationMs);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs]);

  const handleClose = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          id="fatap-splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-[#0B1E3F] via-[#123B7A] to-[#1E56B3] text-white select-none cursor-pointer overflow-hidden p-6 sm:p-10"
          role="button"
          tabIndex={0}
          aria-label="Skip splash screen"
        >
          {/* Subtle Ambient Background Elements (Pure Blue & White) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft Radial Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/15 rounded-full blur-2xl" />

            {/* Geometric Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Top Bar: Skip pill */}
          <div className="w-full flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200/80 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Identity Intro</span>
            </div>

            <button
              id="skip-splash-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white tracking-wide flex items-center gap-1 transition-colors cursor-pointer shadow-xs backdrop-blur-xs"
            >
              <span>Skip</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Brand Wordmark & Icon */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto">
            {/* Animated Logo Mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Outer Glowing Ring */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 border-2 border-white/30 backdrop-blur-md flex items-center justify-center shadow-2xl relative">
                {/* Inner White Badge */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white text-[#0B1E3F] flex items-center justify-center shadow-lg transform transition-transform">
                  <Cpu className="w-9 h-9 sm:w-10 sm:h-10 text-[#123B7A]" />
                </div>

                {/* Floating Tech Sparkle Accent */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-300 text-[#0B1E3F] flex items-center justify-center shadow-md border-2 border-white"
                >
                  <Zap className="w-3.5 h-3.5 text-[#0B1E3F] fill-[#0B1E3F]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Wordmark (FATap-CT) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <div className="inline-block">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-sm font-sans">
                  FATap<span className="text-blue-200">-CT</span>
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-1 opacity-80" />
              </div>

              <p className="text-sm sm:text-base font-semibold text-blue-100 tracking-wide max-w-sm sm:max-w-md mx-auto">
                Foundations of Applied Technology &amp; Computational Thinking
              </p>
            </motion.div>

            {/* Sub-credit / Association */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-blue-100"
            >
              <span>Empowering Future Innovators</span>
              <span className="opacity-40">•</span>
              <span className="font-bold text-white">ESGMC System</span>
            </motion.div>
          </div>

          {/* Bottom Tap Reminder */}
          <div className="relative z-10 text-center">
            <p className="text-xs text-blue-200/70 tracking-wide animate-pulse">
              Tap anywhere to begin
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
