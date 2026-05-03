"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LogoImg from "../../../public/logo.jpeg";

export default function SplashScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  // The sequence of messages
  const messages = [
    "The best shoe shop in Qatar",
    "Get your shoes at the best price",
    "Step into the future of footwear",
  ];

  useEffect(() => {
    // Cycle through messages every 2 seconds
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 2200);

    // End splash after all messages + logo display
    if (step > messages.length) {
      clearInterval(timer);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }

    return () => clearInterval(timer);
  }, [step, onComplete, messages.length]);

  return (
    <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step < messages.length ? (
          /* --- SEQUENTIAL TEXT --- */
          <motion.p
            key={`text-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-sm tracking-[0.4em] uppercase text-center px-6"
          >
            {messages[step]}
          </motion.p>
        ) : (
          /* --- FINAL LOGO DISPLAY --- */
          <motion.div
            key="logo-final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative w-24 h-24">
              {/* Replace src with your actual logo path */}
              <Image
                src={LogoImg}
                fill
                alt="LevenVerse Logo"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-white text-lg tracking-[0.8em] uppercase ml-[0.8em]">
                LevenVerse
              </h1>
              <div className="w-12 h-[1px] bg-[#0070f3] mt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0070f3]/5 blur-[120px] rounded-full -z-10" />
    </div>
  );
}
