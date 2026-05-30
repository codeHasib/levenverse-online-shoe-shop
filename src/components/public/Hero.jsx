"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LogoImg from "../../../public/logo - remove-bg.png";
import Image from "next/image";

export default function Hero() {
  const brands = [
    "Adidas",
    "Nike",
    "Puma",
    "Reebok",
    "Jordan",
    "New Balance",
    "Yeezy",
    "Converse",
    "Vans",
  ];

  return (
    <section className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black">
      {/* --- 1. VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          src={"/videos/banner.mp4"}
        ></video>
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* --- 2. HERO CONTENT --- */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex justify-center items-center">
            <Image
              src={LogoImg}
              width={250}
              height={250}
              alt="Logo image"
              className="m-0"
            ></Image>
          </div>

          <h2 className="text-white text-5xl md:text-7xl tracking-tighter uppercase font-normal leading-[0.9] mb-8">
            Elevate <br /> Your Step.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base tracking-wide max-w-md mb-10 leading-relaxed font-normal">
            Experience the fusion of high-performance technology and minimalist
            luxury. The future of footwear is here.
          </p>

          <div className="flex justify-center items-center gap-4 mb-5">
            <Link
              href="/products"
              className="bg-[#0070f3] text-white text-[11px] tracking-[0.3em] uppercase px-10 py-5 rounded-full flex items-center justify-center gap-1 hover:bg-blue-600 transition-all"
            >
              Shop <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* --- 3. INFINITE BRAND CAROUSEL --- */}
      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-neutral-900 py-8 overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {/* Duplicate the list to ensure a seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-white text-[10px] md:text-xs tracking-[0.8em] uppercase mx-12 opacity-40 hover:opacity-100 hover:text-[#0070f3] transition-all cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Internal Animation for Infinite Scroll */}
      {/* <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
      `}</style> */}
    </section>
  );
}
