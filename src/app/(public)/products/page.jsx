"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { redirect, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import LogoImg from "../../../../public/logo - remove-bg.png";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };
    fetchProducts();
  }, []);

  // 1. Get unique categories for the filter bar
  const categories = useMemo(() => {
    const cats = products.map((p) => p.categoryId?.name || "Uncategorized");
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  // 2. Filter products based on search and selected category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.categoryId?.name === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  // 3. Group filtered products by category for the sectioned view
  const groupedProducts = useMemo(() => {
    const groups = {};
    filteredProducts.forEach((p) => {
      const catName = p.categoryId?.name || "Uncategorized";
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(p);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <>
      {/* <div className="h-[600px] relative overflow-hidden group">

        
        <video
          src="/videos/collection.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>

        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center p-5">
          <Image
            src={LogoImg}
            width={250}
            alt="Logo"
            className="drop-shadow-2xl" 
          />
          <h2 className="text-white text-3xl text-center">
            THE PREMIUM COLLECTION OF SHOES
          </h2>
        </div>
      </div> */}

      <div className="min-h-screen bg-white pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* --- HEADER & CONTROLS --- */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h1 className="text-2xl md:text-3xl tracking-[0.5em] uppercase font-light text-black mb-4">
                Collections
              </h1>
              <div className="flex flex-wrap gap-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] tracking-[0.3em] uppercase transition-all pb-1 border-b ${
                      activeCategory === cat
                        ? "border-[#0070f3] text-[#0070f3]"
                        : "border-transparent text-neutral-400 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group w-full md:w-80">
              <Search
                className="absolute left-0 bottom-3 text-neutral-300 group-focus-within:text-[#0070f3] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="SEARCH SHOE"
                className="w-full bg-transparent border-b border-neutral-100 py-2 pl-8 text-[11px] tracking-widest uppercase focus:outline-none focus:border-[#0070f3] transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* --- PRODUCTS GRID (SECTIONED) --- */}
          <div className="space-y-24">
            {Object.keys(groupedProducts).length > 0 ? (
              Object.entries(groupedProducts).map(([category, items]) => (
                <section key={category}>
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-[12px] tracking-[0.6em] uppercase font-medium text-black">
                      {category}
                    </h2>
                    <div className="h-[1px] flex-grow bg-neutral-100" />
                    <span className="text-[9px] text-neutral-400 tracking-widest uppercase">
                      {items.length} Units
                    </span>
                  </div>

                  {/* Optimized Grid: Starts at 2 columns for mobile (default), scales to 3 and 4 as screen widens */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                    <AnimatePresence>
                      {items.map((product) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={product._id}
                          /* Removed max-w-[50vw] to allow grid cells to control the size naturally */
                          className="group relative flex flex-col h-full border border-gray-300 p-2 rounded-2xl"
                        >
                          {/* Image Container */}
                          <div
                            onClick={() =>
                              router.push(`/products/${product._id}`)
                            }
                            className="relative aspect-[3/4] bg-[#f8f8f8] overflow-hidden cursor-pointer rounded-2xl"
                          >
                            <Image
                              src={product.images?.[0] || "/placeholder.png"}
                              alt={product.title}
                              fill
                              /* Added priority for the first few items to help LCP */
                              className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute rounded-2xl inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                          </div>

                          {/* Info Area - Using flex-1 to ensure buttons align if titles vary in height */}
                          <div className="mt-4 sm:mt-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              {/* Adjusted font size slightly for better mobile readability */}
                              <h3 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-black leading-tight line-clamp-2">
                                {product.title}
                              </h3>
                              <p className="text-xs sm:text-sm tracking-tighter text-[#0070f3] font-medium">
                                QAR {product.price}
                              </p>
                            </div>

                            <div className="flex gap-2 items-center justify-center md:flex-row flex-col">
                              <button
                                onClick={() => {
                                  addToCart(
                                    product,
                                    1,
                                    product.sizes?.[0] || "Default",
                                  );
                                  redirect("/cart");
                                }}
                                className="w-full md:w-1/2 border border-neutral-100 py-3 px-3 sm:px-4 text-[8px] sm:text-[9px] uppercase text-center font-bold bg-blue-600 text-white rounded-lg"
                              >
                                <span className="truncate">Order Now</span>
                              </button>

                              <button
                                onClick={() =>
                                  addToCart(
                                    product,
                                    1,
                                    product.sizes?.[0] || "Default",
                                  )
                                }
                                className="w-full md:w-1/2 border border-neutral-100 py-3 px-3 sm:px-4 text-[8px] sm:text-[9px] uppercase text-center font-bold bg-blue-300 rounded-lg"
                              >
                                <span className="truncate">Add to Bag</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              ))
            ) : (
              <div className="py-20 text-center border border-dashed border-neutral-100">
                <p className="text-neutral-400 text-[10px] tracking-[0.4em] uppercase">
                  No matching products found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
