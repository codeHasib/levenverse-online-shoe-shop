"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Search, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const navLinks = [
    { name: "Collections", href: "/products" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`sticky top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-black border-b border-neutral-900 py-4"
            : "bg-black py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle - Blue Accent */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-[#0070f3] p-1 transition-transform active:scale-90"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Logo - White & Minimal */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <h1 className="text-white text-base tracking-[0.7em] uppercase font-normal ml-[0.7em]">
              Levenverse
            </h1>
          </Link>

          {/* Desktop Links - White Text */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] text-white uppercase tracking-[0.4em] hover:text-[#0070f3] transition-colors font-normal"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & CTA */}
          <div className="flex items-center gap-6">
            {/* Blue Cart Button */}
            <Link
              href="/cart"
              className="bg-[#0070f3] text-white p-2.5 rounded-full relative hover:scale-105 transition-transform"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-white text-[#0070f3] text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-normal">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - Black Background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="fixed inset-0 z-[110] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-[10px] tracking-[0.6em] text-neutral-600 uppercase">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#0070f3] p-2 bg-neutral-900 rounded-full"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between"
                >
                  <span className="text-xl text-white tracking-[0.3em] uppercase font-normal group-hover:text-[#0070f3] transition-colors">
                    {link.name}
                  </span>
                  <div className="w-8 h-[1px] bg-neutral-800 group-hover:bg-[#0070f3] transition-colors" />
                </Link>
              ))}
            </div>

            {/* Bottom Actions - Blue Buttons */}
            <div className="mt-auto flex flex-col gap-4">
              <Link
                href="/support"
                className="w-full border border-neutral-800 text-white text-[10px] tracking-[0.4em] uppercase py-5 text-center rounded-xl"
              >
                Need Help?
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
