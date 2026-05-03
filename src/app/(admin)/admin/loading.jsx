"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] w-full bg-black">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-16 h-16 border border-[#0070f3] rounded-full"
        />

        {/* Spinning Core */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-8 h-8 border-2 border-t-[#0070f3] border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
      </div>

      {/* Minimalist Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-white text-[10px] tracking-[0.5em] uppercase">
          Synchronizing
        </span>
        <div className="w-8 h-[1px] bg-neutral-800" />
      </motion.div>
    </div>
  );
}
