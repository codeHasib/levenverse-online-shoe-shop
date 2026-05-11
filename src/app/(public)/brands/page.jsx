"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, ShieldCheck } from "lucide-react";

const BRANDS = [
  {
    name: "Nike",
    slug: "nike",
    description: "Performance meets street culture.",
    count: "42 Items",
    image: "/brands/nike-bg.jpg", // Add a lifestyle image of the brand
  },
  {
    name: "Adidas",
    slug: "adidas",
    description: "Iconic three-stripe heritage.",
    count: "38 Items",
    image: "/brands/adidas-bg.jpg",
  },
  {
    name: "On Running",
    slug: "on-running",
    description: "Swiss-engineered cloud technology.",
    count: "15 Items",
    image: "/brands/on-bg.jpg",
  },
  {
    name: "New Balance",
    slug: "new-balance",
    description: "The ultimate in comfort and dad-chic.",
    count: "24 Items",
    image: "/brands/nb-bg.jpg",
  },
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <h1 className="text-5xl tracking-tighter font-medium text-black">
            OUR <span className="text-neutral-300">PARTNERS</span>
          </h1>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 leading-loose">
            Curating the finest silhouettes from global giants and boutique
            innovators. Selected for quality, utility, and timeless design.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/products`}
                className="group block relative overflow-hidden rounded-[2rem] bg-neutral-50 aspect-[16/9]"
              >
                {/* Background Image/Pattern */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3]/20 to-transparent" />
                  {/* You can replace this with an actual image: 
                  <Image src={brand.image} alt="" fill className="object-cover" /> */}
                </div>

                <div className="relative h-full p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h2 className="text-3xl tracking-tighter font-bold text-black uppercase italic">
                        {brand.name}
                      </h2>
                      <p className="text-[10px] tracking-widest text-neutral-500 uppercase font-medium">
                        {brand.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 group-hover:bg-[#0070f3] group-hover:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-white rounded-full text-[9px] tracking-widest uppercase font-bold border border-neutral-100 shadow-sm">
                      {brand.count}
                    </span>
                    <span className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold">
                      Explore Collection
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-neutral-100">
          <div className="space-y-3">
            <Globe size={20} className="text-[#0070f3]" strokeWidth={1.5} />
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold">
              Global Sourcing
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed uppercase tracking-widest">
              Premium quality variants sourced from leading international
              manufacturers.
            </p>
          </div>
          <div className="space-y-3">
            <Zap size={20} className="text-[#0070f3]" strokeWidth={1.5} />
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold">
              Swift Delivery
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed uppercase tracking-widest">
              Door-to-door delivery across Qatar within 48-72 hours.
            </p>
          </div>
          <div className="space-y-3">
            <ShieldCheck
              size={20}
              className="text-[#0070f3]"
              strokeWidth={1.5}
            />
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold">
              Quality Check
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed uppercase tracking-widest">
              Every pair undergoes rigorous inspection before dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
