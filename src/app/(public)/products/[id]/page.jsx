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
  Check,
} from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW: Added color state
  const [selectedColor, setSelectedColor] = useState(null);
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

        // 🔥 NEW: Set initial color and size based on new schema
        if (foundProduct?.colors?.length > 0) {
          const initialColor =
            foundProduct.colors.find((c) => c.inStock) ||
            foundProduct.colors[0];
          setSelectedColor(initialColor);
          if (initialColor.sizes?.length > 0) {
            setSelectedSize(initialColor.sizes[0]);
          }
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🔥 NEW: Handle Color Selection
  const handleColorSelect = (colorObj, index) => {
    if (!colorObj.inStock) return; // Prevent selecting out of stock colors

    setSelectedColor(colorObj);

    // Auto-select first available size for this color
    if (colorObj.sizes?.length > 0) {
      setSelectedSize(colorObj.sizes[0]);
    } else {
      setSelectedSize("");
    }

    // BONUS: Attempt to change image based on color index
    if (product.images && product.images.length > index) {
      setActiveImageIndex(index);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) return alert("Please select a color");
    if (!selectedSize && selectedColor.sizes.length > 0)
      return alert("Please select a size");

    // Pass colorName to cart store
    addToCart(product, quantity, selectedSize, selectedColor.colorName);
  };

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
            <div className="relative w-full flex-grow aspect-[4/5] rounded-3xl overflow-hidden order-1 md:order-2">
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
              {/* 🔥 NEW: Color Selector */}
              {product.colors?.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-4 font-bold">
                    Select Color:{" "}
                    <span className="text-black">
                      {selectedColor?.colorName}
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((colorItem, idx) => {
                      const isSelected =
                        selectedColor?.colorName === colorItem.colorName;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(colorItem, idx)}
                          disabled={!colorItem.inStock}
                          className={`px-4 h-12 flex items-center justify-center text-[12px] font-bold rounded-xl border-2 transition-all ${
                            !colorItem.inStock
                              ? "opacity-40 cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-400 line-through"
                              : isSelected
                                ? "bg-black text-white border-black"
                                : "bg-white border-neutral-100 hover:border-black text-neutral-600"
                          }`}
                        >
                          {colorItem.colorName}
                          {!colorItem.inStock && (
                            <span className="ml-2 text-[8px] uppercase tracking-widest text-red-500">
                              (Sold Out)
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🔥 UPDATED: Size Selector (Depends on selectedColor) */}
              {selectedColor?.sizes?.length > 0 && (
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-4 font-bold">
                    Select Size
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {selectedColor.sizes.map((size) => (
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
                    onClick={handleAddToCart}
                    className="flex-1 w-full bg-black text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-2xl py-4 hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    <ShoppingBag size={18} /> Add to Bag
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart();
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
