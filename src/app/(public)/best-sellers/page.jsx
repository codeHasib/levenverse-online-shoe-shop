"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, TrendingUp, ArrowUpRight, ShoppingBag } from "lucide-react";

export default function BestSellersPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndShuffle = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();

        if (data.products && data.products.length > 0) {
          // Fisher-Yates Shuffle Algorithm to randomize order
          const shuffled = [...data.products].sort(() => 0.5 - Math.random());

          // Take the first 6 random items
          setProducts(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndShuffle();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-[10px] tracking-[0.5em] uppercase animate-pulse">
          Analyzing Market Trends
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-20 p-10 md:p-16 bg-neutral-900 rounded-[2.5rem] overflow-hidden text-white">
          <div className="relative z-10 space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0070f3] rounded-full">
              <TrendingUp size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Levenverse Charts
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl tracking-tighter font-medium">
              BEST{" "}
              <span className="text-neutral-500 italic text-4xl md:text-6xl font-light">
                SELLERS
              </span>
            </h1>
            <p className="text-neutral-400 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed max-w-md">
              The high-demand silhouettes currently dominating the Qatar street
              scene. Updated in real-time.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0070f3]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Dynamic Random Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-[#fcfcfc] rounded-[2.5rem] p-5 flex flex-col sm:flex-row items-center gap-6 border border-neutral-100 hover:shadow-2xl hover:shadow-blue-50/50 transition-all duration-700"
            >
              {/* Rank Overlay */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-neutral-50 z-20">
                <span className="font-black text-lg text-black">
                  0{idx + 1}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative w-full sm:w-72 aspect-square bg-white rounded-[2rem] overflow-hidden shrink-0 border border-neutral-50">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col justify-between py-4 w-full h-full">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="fill-[#0070f3] text-[#0070f3]"
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-black uppercase text-neutral-300 tracking-[0.3em]">
                      Verified Demand
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl tracking-tighter font-bold text-black uppercase leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-[10px] text-[#0070f3] tracking-[0.4em] uppercase font-bold mt-1">
                      {product.categoryId?.name || "Premium Edition"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-dashed border-neutral-200 pt-6">
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">
                      Market Price
                    </span>
                    <p className="text-xl font-bold text-black tracking-tighter">
                      QAR {product.price}
                    </p>
                  </div>

                  <Link
                    href={`/products/${product._id}`}
                    className="h-14 px-6 bg-black text-white rounded-2xl flex items-center justify-center gap-3 group-hover:bg-[#0070f3] transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-[#0070f3]/20"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Detail
                    </span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Trust Footer */}
        <div className="mt-24 py-12 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShoppingBag, text: "Curated Selection" },
            { icon: Star, text: "Top Rated Units" },
            { icon: TrendingUp, text: "Trending Daily" },
            { icon: ArrowUpRight, text: "Fast Fulfillment" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3"
            >
              <feature.icon size={20} className="text-neutral-200" />
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
