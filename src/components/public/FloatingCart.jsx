"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, X, ArrowRight, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function FloatingCart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { cart } = useCartStore();

  // Example state for notification (e.g., items in cart or active orders)
  const cartCount = cart.length;
  const activeOrders = cart.length;

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
      {/* 1. EXPANDED MENU */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black border border-neutral-900 w-72 rounded-none overflow-hidden shadow-2xl mb-2"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-900 flex justify-between items-center bg-neutral-950">
              <span className="text-white text-[10px] tracking-[0.4em] uppercase">
                Your Hub
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col">
              <Link
                href="/cart"
                className="group flex items-center justify-between p-5 hover:bg-[#0070f3]/10 transition-all border-b border-neutral-900"
              >
                <div className="flex items-center gap-4">
                  <ShoppingBag
                    size={18}
                    className="text-[#0070f3]"
                    strokeWidth={1.5}
                  />
                  <span className="text-white text-[11px] tracking-widest uppercase font-normal">
                    View Cart
                  </span>
                </div>
                <span className="text-white text-[10px] bg-[#0070f3] w-5 h-5 flex items-center justify-center rounded-none">
                  {cartCount}
                </span>
              </Link>

              <Link
                href="/cart"
                className="group flex items-center justify-between p-5 hover:bg-[#0070f3]/10 transition-all border-b border-neutral-900"
              >
                <div className="flex items-center gap-4">
                  <Package
                    size={18}
                    className="text-[#0070f3]"
                    strokeWidth={1.5}
                  />
                  <span className="text-white text-[11px] tracking-widest uppercase font-normal">
                    Manage Orders
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-neutral-700 group-hover:text-[#0070f3] transition-colors"
                />
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-4 p-5 bg-[#0070f3] hover:bg-blue-600 transition-all"
              >
                <CreditCard
                  size={18}
                  className="text-white"
                  strokeWidth={1.5}
                />
                <span className="text-white text-[11px] tracking-widest uppercase font-normal">
                  Quick Checkout
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE MAIN FLOATING BUTTON */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative group flex items-center justify-center w-16 h-16 bg-[#0070f3] text-white shadow-2xl transition-transform active:scale-90 hover:scale-105"
      >
        {/* Animated Pulse Ring (Only shows if there are active orders/items) */}
        {(cartCount > 0 || activeOrders > 0) && (
          <span className="absolute inset-0 rounded-none border border-[#0070f3] animate-ping opacity-30" />
        )}

        {/* Icon Swap based on state */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {/* Count Badge */}
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center border border-white/20">
                {cartCount}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
