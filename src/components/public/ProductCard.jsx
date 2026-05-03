import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, featured }) {
  return (
    <>
      <div
        key={product._id}
        className="group relative bg-white border border-neutral-100 flex flex-col p-4 transition-all duration-500 hover:border-[#0070f3]"
      >
        {/* 1. PRODUCT IMAGE - Sharp & Framed */}
        <div className="relative aspect-square overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="text-neutral-300 uppercase tracking-widest text-[9px]">
              No Image Available
            </div>
          )}

          {/* Badge - Sharp Corner */}
          {featured ? (
            <div className="absolute top-0 left-0 bg-[#0070f3] text-white text-[8px] tracking-[0.2em] uppercase px-3 py-1.5">
              New
            </div>
          ) : (
            ""
          )}
        </div>

        {/* 2. PRODUCT INFO - Minimalist Layout */}
        <div className="mt-6 flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-neutral-400 text-[9px] tracking-[0.3em] uppercase">
                {product.categoryId?.name || "Footwear"}
              </p>
              <h3 className="text-black text-[13px] tracking-widest uppercase font-normal leading-tight">
                {product.title}
              </h3>
            </div>
            <p className="text-[#0070f3] text-sm tracking-tighter font-normal">
              QAR {product.price}
            </p>
          </div>

          {/* 3. INTERACTIVE SECTION - Blue Accents */}
          <div className="flex items-center gap-2 pt-2">
            <button className="flex-grow bg-black text-white text-[9px] tracking-[0.3em] uppercase py-4 transition-all hover:bg-[#0070f3]">
              Quick Add
            </button>
            <button className="bg-white border border-neutral-200 text-black p-3.5 transition-all hover:border-[#0070f3] hover:text-[#0070f3]">
              <ShoppingCart size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Hidden Detail Link */}
        <Link
          href={`/products/${product._id}`}
          className="absolute inset-0 z-[5] pointer-events-auto"
          // Note: Link is absolute but buttons above have higher stacking priority
          // depending on your layout, or use onClick for the link.
        />
      </div>
    </>
  );
}
