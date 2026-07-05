"use client";

import Link from "next/link";
import { ArrowUp, Mail, Globe, MessageSquare } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-200 border-t border-neutral-100 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* --- BRAND STORY --- */}
          <div className="space-y-6">
            <h2 className="text-[14px] tracking-[0.8em] uppercase font-bold text-black">
              LevenVerse
            </h2>
            <p className="text-[11px] leading-relaxed text-neutral-400 tracking-widest uppercase">
              Curating high-end sneakers and luxury apparel for the modern
              explorer. Based in Doha, delivered to the world.
            </p>

            {/* SOCIAL ICONS USING SVG FOR STABILITY */}
            <div className="flex gap-6 items-center pt-2">
              <a
                href="https://www.instagram.com/leven_verse?igsh=eGcxdDlpdm91ZGRo"
                target="_blank"
                className="text-neutral-400 hover:text-[#0070f3] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-[#0070f3] transition-colors"
              >
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-[#0070f3] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* --- QUICK LINKS --- */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-black mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Products", "New Arrivals", "Best Sellers"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-[#0070f3] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ASSISTANCE --- */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-black mb-8">
              Assistance
            </h4>
            <ul className="space-y-4">
              {[
                "Shipping Policy",
                "Returns and Exchanges",
                "Size Guide",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-[#0070f3] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- NEWSLETTER --- */}
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-black">
              Stay Connected
            </h4>
            <p className="text-[10px] tracking-widest text-neutral-400 uppercase leading-relaxed">
              Subscribe to receive updates on limited releases and private
              events.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-neutral-200 py-3 text-[10px] tracking-[0.3em] outline-none focus:border-[#0070f3] transition-all"
              />
              <button className="absolute right-0 bottom-3 text-[10px] tracking-[0.3em] font-bold hover:text-[#0070f3] transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[9px] tracking-[0.3em] uppercase text-neutral-400">
            <span>© 2026 LEVENVERSE QATAR</span>
            <span className="hidden md:inline">|</span>
            <span>All Rights Reserved</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase text-black hover:text-[#0070f3] transition-all group"
          >
            Back to Top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
