"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, featured }) {
  // Check if explicitly marked as false. Defaults to true for older products.
  const isOutOfStock = product.inStock === false;

  return (
    <div
      key={product._id}
      className={`group relative border flex flex-col transition-all duration-500 ${
        isOutOfStock
          ? "border-neutral-100 opacity-80" // Disabled state styling
          : "border-neutral-100 hover:border-[#0070f3]" // Active state styling
      }`}
    >
      {/* 1. PRODUCT IMAGE - Sharp & Framed */}
      <div className="relative aspect-square overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={`object-contain transition-all duration-700 ${
              isOutOfStock
                ? "grayscale-[60%] opacity-60" 
                : "group-hover:scale-102"
            }`}
          />
        ) : (
          <div className="text-neutral-300 uppercase tracking-widest text-[9px]">
            No Image Available
          </div>
        )}

        {/* OUT OF STOCK OVERLAY (Premium Frosted Glass Effect) */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
            <span className="bg-black/90 text-white text-[9px] tracking-[0.4em] uppercase px-5 py-2.5 font-bold rounded-full shadow-xl">
              Out of Stock
            </span>
          </div>
        )}

        {/* Featured Badge - Only show if in stock */}
        {featured && !isOutOfStock && (
          <div className="absolute top-0 left-0 bg-[#0070f3] text-white text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 z-10">
            New
          </div>
        )}
      </div>

      {/* 2. PRODUCT INFO - Minimalist Layout */}
      <div className="mt-6 flex flex-col space-y-4 p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-neutral-400 text-[9px] tracking-[0.3em] uppercase truncate">
              {product.categoryId?.name || "Footwear"}
            </p>
            <h3
              className={`text-[13px] tracking-widest uppercase font-normal leading-tight truncate ${
                isOutOfStock ? "text-neutral-400" : "text-black"
              }`}
            >
              {product.title}
            </h3>
          </div>
          <p
            className={`text-sm tracking-tighter font-normal flex-shrink-0 ${
              isOutOfStock ? "text-neutral-400 line-through" : "text-[#0070f3]"
            }`}
          >
            QAR {product.price}
          </p>
        </div>

        {/* Dynamic Action Text */}
        <p
          className={`uppercase text-[10px] font-bold tracking-widest ${
            isOutOfStock ? "text-red-400" : "text-blue-400"
          }`}
        >
          {isOutOfStock ? "Currently Unavailable" : "Click to see the details"}
        </p>
      </div>

      {/* 3. INTERACTIVE SECTION - Only clickable if in stock */}
      {!isOutOfStock && (
        <Link
          href={`/products/${product._id}`}
          className="absolute inset-0 z-[5] pointer-events-auto"
        />
      )}
    </div>
  );
}
