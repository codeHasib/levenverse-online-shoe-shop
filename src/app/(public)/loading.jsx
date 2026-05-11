"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      {/* Brand Logo / Name Animation */}
      <div className="relative overflow-hidden mb-8">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-2xl md:text-3xl font-medium tracking-[0.3em] text-black uppercase"
        >
          LEVEN<span className="text-neutral-300 italic">VERSE</span>
        </motion.h2>

        {/* Animated Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-[1px] w-full bg-[#0070f3] origin-left mt-2"
        />
      </div>

      {/* Modern Utility Loading Bar */}
      <div className="w-48 h-[2px] bg-neutral-100 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle Status Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="mt-6 text-[9px] tracking-[0.5em] uppercase text-neutral-400 font-bold"
      >
        Authenticating Silhouettes
      </motion.p>

      {/* Ambient Background Shimmer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-50/10 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
