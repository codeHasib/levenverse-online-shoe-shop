"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Reviews from "@/components/public/ProductReviews";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
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
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* --- LEFT: RESPONSIVE GALLERY --- */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 min-w-0">
            {/* Thumbnail Strip */}
            <div className="w-full md:w-auto flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] w-20 md:w-24 shrink-0 rounded-xl border-2 transition-all overflow-hidden bg-[#f9f9f9] ${
                    activeImageIndex === idx
                      ? "border-[#0070f3]"
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
            <div className="relative w-full flex-grow aspect-[4/5] bg-[#f9f9f9] rounded-3xl overflow-hidden order-1 md:order-2">
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
                    className="object-contain p-6 md:p-12"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-100">
                <span className="text-[9px] tracking-widest uppercase font-bold text-neutral-500">
                  {activeImageIndex + 1} / {product.images?.length}
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="lg:col-span-5 pt-4 min-w-0">
            <nav className="flex items-center gap-2 mb-6 text-[9px] tracking-widest uppercase text-neutral-400 font-bold flex-wrap">
              <span>Catalog</span> <ChevronRight size={8} />{" "}
              <span className="text-black">{product.categoryId?.name}</span>
            </nav>

            <h1 className="text-3xl tracking-tight uppercase font-medium text-black mb-2 break-words">
              {product.title}
            </h1>
            <p className="text-2xl tracking-tighter text-[#0070f3] mb-8 font-bold">
              QAR {product.price}
            </p>

            <div className="space-y-10">
              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-4 font-bold">
                    Select Size
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] h-12 flex items-center justify-center text-[12px] font-bold rounded-xl border-2 transition-all ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white border-neutral-100 hover:border-black text-neutral-600"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap sm:flex-nowrap gap-4">
                  <div className="flex items-center bg-[#f9f9f9] rounded-2xl p-1 border border-neutral-100 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity, selectedSize)}
                    className="flex-1 w-full bg-black text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-2xl py-4 hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    <ShoppingBag size={18} /> Add to Bag
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedSize);
                    router.push("/cart");
                  }}
                  className="w-full bg-[#0070f3] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-2xl py-5 hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                >
                  Order Now <ArrowRight size={18} />
                </button>
              </div>

              {/* Product Details Section */}
              <div className="pt-10 border-t border-neutral-100">
                <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4 text-black">
                  Product Details
                </h2>
                <p className="text-[13px] leading-relaxed text-neutral-500 tracking-wide mb-10 italic break-words">
                  &quot;{product.description}&quot;
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <Truck size={16} className="text-[#0070f3] shrink-0" />
                  <span className="text-[9px] tracking-widest uppercase font-bold text-neutral-600 leading-tight">
                    Express <br /> Shipping
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <ShieldCheck size={16} className="text-[#0070f3] shrink-0" />
                  <span className="text-[9px] tracking-widest uppercase font-bold text-neutral-600 leading-tight">
                    Secure <br /> Payment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- REVIEWS --- */}
        <div className="mt-24 pt-20 border-t border-neutral-100 max-w-4xl mx-auto px-4 md:px-0">
          <Reviews productId={id} />
        </div>
      </div>
    </div>
  );
}
