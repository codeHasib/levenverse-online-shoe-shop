"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("API ERROR:", text);
          return;
        }

        const data = await res.json();
        // Take only the first 6 products
        setProducts((data.products || []).slice(0, 6));
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#0070f3] text-[10px] tracking-[0.5em] uppercase mb-4 block">
              Handpicked
            </span>
            <h2 className="text-black text-4xl md:text-5xl tracking-tighter uppercase font-normal leading-none">
              Featured <br /> <span className="text-[#0070f3]">Collection</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-3 text-[#0070f3] text-[11px] tracking-[0.3em] uppercase transition-all"
          >
            See All Products
            <div className="bg-[#0070f3] p-2 rounded-full text-white transition-transform group-hover:translate-x-2">
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? // Simple Skeleton State
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-neutral-100 animate-pulse rounded-2xl"
                />
              ))
            : products.map((product, ind) => (
                <ProductCard
                  key={ind}
                  product={product}
                  featured={true}
                ></ProductCard>
              ))}
        </div>
      </div>
    </section>
  );
}
