"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Jahed S.",
    text: "The quality of the shoes exceeded my expectations. Premium feel.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ahmed R.",
    text: "Best sneaker collection in Doha. Fast delivery and original products.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sara M.",
    text: "The minimal design of the website is reflected in their product quality.",
    rating: 5,
  },
  {
    id: 4,
    name: "Karim W.",
    text: "Excellent customer service and very responsive. 10/10 experience.",
    rating: 5,
  },
  {
    id: 5,
    name: "Zayn H.",
    text: "Finally a brand that understands luxury and minimalism perfectly.",
    rating: 5,
  },
];

export default function LiveReviewMarquee() {
  // We double the array to ensure seamless infinite looping
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-[12px] tracking-[0.6em] uppercase font-medium text-black mb-3">
          Live Experience
        </h2>
        <div className="h-[1px] w-12 bg-[#0070f3]" />
      </div>

      {/* --- INFINITE SCROLL CONTAINER --- */}
      <div className="relative flex">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-50%"], // Moves halfway because the list is duplicated
          }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust speed here
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[350px] flex-shrink-0 bg-[#f9f9f9] p-8 border border-neutral-100 group hover:border-[#0070f3] transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={10} fill="#0070f3" strokeWidth={0} />
                  ))}
                </div>
                <Quote
                  size={20}
                  className="text-neutral-100 group-hover:text-blue-50 transition-colors"
                />
              </div>

              <p className="text-[13px] leading-relaxed text-neutral-600 font-light italic mb-8 min-h-[60px]">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-neutral-200" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-black">
                  {review.name}
                </span>
                <CheckCircle2 size={10} className="text-emerald-500" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth fade-out edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
