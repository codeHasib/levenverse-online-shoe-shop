"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Reviews from "@/components/public/ProductReviews";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // State for the Active Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const foundProduct = data.products.find((item) => item._id == id);
        setProduct(foundProduct);
        if (foundProduct?.sizes?.length > 0)
          setSelectedSize(foundProduct.sizes[0]);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-[10px] tracking-[0.5em] uppercase animate-pulse">
          Loading Gallery
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-[10px]">
        Product Unavailable
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* --- LEFT: DYNAMIC GALLERY --- */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-3 w-full md:w-20 shrink-0">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] md:w-20 border transition-all overflow-hidden bg-[#f9f9f9] ${
                    activeImageIndex === idx
                      ? "border-black"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-grow aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    alt={product.title}
                    fill
                    src={
                      product.images?.[activeImageIndex] || "/placeholder.png"
                    }
                    className="object-contain p-8 md:p-16"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6">
                <span className="text-[9px] tracking-widest uppercase text-neutral-400">
                  Angle {activeImageIndex + 1} / {product.images?.length}
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="lg:col-span-5 pt-4">
            <nav className="flex items-center gap-2 mb-6 text-[9px] tracking-widest uppercase text-neutral-400">
              <span>Catalog</span> <ChevronRight size={8} />{" "}
              <span>{product.categoryId?.name}</span>
            </nav>

            <h1 className="text-3xl tracking-[0.2em] uppercase font-light text-black mb-2">
              {product.title}
            </h1>
            <p className="text-xl tracking-tighter text-[#0070f3] mb-8 font-normal">
              QAR {product.price}
            </p>

            <div className="h-[1px] w-full bg-neutral-100 mb-8" />

            {/* Size & Action Logic */}
            <div className="space-y-8">
              {product.sizes?.length > 0 && (
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-black block mb-4 font-bold">
                    Available Sizes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 text-[11px] border transition-all ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "border-neutral-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex items-center border border-neutral-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-[12px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="flex-1 bg-black text-white text-[10px] tracking-[0.4em] uppercase py-5 hover:bg-[#0070f3] transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} /> Add to Bag
                </button>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedSize);
                    redirect("/cart");
                  }}
                  className="flex-1 bg-blue-500 text-white text-[10px] tracking-[0.4em] uppercase py-5 hover:bg-[#0070f3] transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} /> ORDER NOW
                </button>
                <button
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="flex-1 bg-green-500 text-white text-[10px] tracking-[0.4em] uppercase py-5 hover:bg-[#0070f3] transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle size={16}></MessageCircle> CHAT WHATSAPP
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 underline">
                  PRODUCT DETAILS
                </h2>
                <p
                  className="text-[12px] leading-relaxed text-black
                 tracking-wide mb-10"
                >
                  &quot;{product.description}&quot;
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 space-y-4 pt-8 border-t border-neutral-100">
              <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase text-neutral-500">
                <Truck size={14} className="text-[#0070f3]" />{" "}
                <span>Express Shipping (2-3 Days)</span>
              </div>
              <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase text-neutral-500">
                <ShieldCheck size={14} className="text-[#0070f3]" />{" "}
                <span>Secure Payment Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- REVIEWS --- */}
        <div className="mt-24 pt-20 border-t border-neutral-100 max-w-4xl mx-auto">
          <Reviews productId={id} />
        </div>
      </div>
    </div>
  );
}
