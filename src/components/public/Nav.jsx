"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Logo from "../../../public/logo - remove-bg.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search Expansion
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { cart, searchQuery, setSearchQuery } = useCartStore();
  const cartCount = cart.length;

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search/menu when changing pages
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Prevent background scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [isOpen]);

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav
        className={`sticky top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-neutral-900 py-3"
            : "bg-black py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between relative">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              /* --- STANDARD STATE: Logo & Icons --- */
              <motion.div
                key="standard-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between w-full"
              >
                {/* Logo Side */}
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src={Logo}
                    width={140}
                    height={40}
                    alt="Levenverse Logo"
                    className="object-contain"
                  />
                </Link>

                {/* Action Side */}
                <div className="flex items-center gap-6">
                  {/* Search Toggle */}
                  {pathname === "/products" && (
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="text-white hover:text-[#0070f3] transition-colors p-1"
                    >
                      <Search size={22} strokeWidth={1.5} />
                    </button>
                  )}

                  {/* Cart */}
                  <Link
                    href="/cart"
                    className="text-white hover:text-[#0070f3] transition-colors relative p-1"
                  >
                    <ShoppingBag size={22} strokeWidth={1.5} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#0070f3] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Menu Toggle */}
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-white hover:text-[#0070f3] transition-colors p-1"
                  >
                    <Menu size={24} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* --- EXPANDED SEARCH STATE --- */
              <motion.div
                key="search-nav"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center w-full gap-4"
              >
                <div className="relative flex-1 group">
                  <Search
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-[#0070f3]"
                    size={20}
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    placeholder="SEARCH OUR COLLECTIONS..."
                    className="w-full bg-transparent border-b border-neutral-800 py-2 pl-8 pr-4 text-sm text-white tracking-widest uppercase focus:outline-none focus:border-[#0070f3] transition-all"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-neutral-500 hover:text-white p-2"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- MOBILE/DESKTOP DRAWER (Menu) --- */}
      {/* Moved OUTSIDE the nav to prevent mobile browser backdrop-blur rendering bugs */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="fixed top-0 right-0 h-full w-[300px] max-w-full bg-black z-[1000] p-10 flex flex-col border-l border-neutral-900"
            >
              <div className="flex justify-end mb-16">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-[#0070f3] transition-all"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {["Products", "New Arrivals"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-2xl tracking-[0.2em] uppercase text-white hover:text-[#0070f3] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <p className="text-[10px] tracking-[0.5em] text-neutral-600 uppercase">
                  © 2026 Levenverse
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
