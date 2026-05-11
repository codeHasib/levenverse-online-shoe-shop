"use client";
import { motion } from "framer-motion";
import { Ruler, Info, MousePointer2, CheckCircle2 } from "lucide-react";

const SHOE_SIZES = [
  { eu: "36", us_m: "4", us_w: "5.5", uk: "3.5", cm: "22.5" },
  { eu: "37", us_m: "5", us_w: "6.5", uk: "4.5", cm: "23.5" },
  { eu: "38", us_m: "5.5", us_w: "7", uk: "5", cm: "24" },
  { eu: "39", us_m: "6.5", us_w: "8", uk: "6", cm: "25" },
  { eu: "40", us_m: "7", us_w: "8.5", uk: "6", cm: "25.5" },
  { eu: "41", us_m: "8", us_w: "9.5", uk: "7", cm: "26.5" },
  { eu: "42", us_m: "8.5", us_w: "10", uk: "7.5", cm: "27" },
  { eu: "43", us_m: "9.5", us_w: "11", uk: "8.5", cm: "28" },
  { eu: "44", us_m: "10", us_w: "11.5", uk: "9", cm: "28.5" },
  { eu: "45", us_m: "11", us_w: "12.5", uk: "10", cm: "29.5" },
  { eu: "46", us_m: "12", us_w: "13.5", uk: "11", cm: "30.5" },
];

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-neutral-100 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0070f3]">
              <Ruler size={18} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                Fitment Specialist
              </span>
            </div>
            <h1 className="text-5xl tracking-tighter font-medium text-black">
              SIZE <span className="text-neutral-300 italic">CHART</span>
            </h1>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-neutral-400 uppercase tracking-widest">
            Standardized conversion for our global silhouette collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: How to Measure */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-[#f9f9f9] rounded-[2rem] space-y-6">
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold text-black flex items-center gap-2">
                <Info size={14} className="text-[#0070f3]" />
                How to Measure
              </h3>
              <div className="space-y-4">
                {[
                  "Place your foot on a blank sheet of paper.",
                  "Mark the end of your longest toe and the back of your heel.",
                  "Measure the distance between the two marks in CM.",
                  "Compare with our 'CM' column in the chart.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] font-bold text-neutral-300 italic">
                      0{i + 1}
                    </span>
                    <p className="text-[11px] text-neutral-500 leading-relaxed tracking-wide">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-[#0070f3]/10 rounded-[2rem] bg-blue-50/30">
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#0070f3] mb-2">
                Pro Tip
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed italic">
                "If you are between sizes, we recommend choosing the larger size
                for a more comfortable performance fit."
              </p>
            </div>
          </div>

          {/* Right: The Chart */}
          <div className="lg:col-span-2 overflow-hidden rounded-[2.5rem] border border-neutral-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-5 px-6 text-[10px] tracking-[0.2em] uppercase font-bold">
                      EU
                    </th>
                    <th className="py-5 px-6 text-[10px] tracking-[0.2em] uppercase font-bold">
                      US Men
                    </th>
                    <th className="py-5 px-6 text-[10px] tracking-[0.2em] uppercase font-bold">
                      US Women
                    </th>
                    <th className="py-5 px-6 text-[10px] tracking-[0.2em] uppercase font-bold">
                      UK
                    </th>
                    <th className="py-5 px-6 text-[10px] tracking-[0.2em] uppercase font-bold">
                      CM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {SHOE_SIZES.map((size, idx) => (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={size.eu}
                      className="hover:bg-neutral-50 transition-colors group"
                    >
                      <td className="py-4 px-6 text-[12px] font-bold text-black">
                        {size.eu}
                      </td>
                      <td className="py-4 px-6 text-[12px] text-neutral-500">
                        {size.us_m}
                      </td>
                      <td className="py-4 px-6 text-[12px] text-neutral-500">
                        {size.us_w}
                      </td>
                      <td className="py-4 px-6 text-[12px] text-neutral-500">
                        {size.uk}
                      </td>
                      <td className="py-4 px-6 text-[12px] font-medium text-[#0070f3] bg-blue-50/20 group-hover:bg-blue-50/50">
                        {size.cm}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Brand Specifics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-100 pt-20">
          <div className="flex gap-4 p-6 rounded-3xl hover:bg-neutral-50 transition-all">
            <CheckCircle2 className="text-[#0070f3] shrink-0" size={20} />
            <div>
              <h4 className="text-[11px] tracking-widest uppercase font-bold text-black mb-2">
                Nike / Jordan Fit
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed uppercase tracking-wider">
                Generally true to size. High-top models may feel snug; consider
                a half-size up if you have wider feet.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-6 rounded-3xl hover:bg-neutral-50 transition-all">
            <CheckCircle2 className="text-[#0070f3] shrink-0" size={20} />
            <div>
              <h4 className="text-[11px] tracking-widest uppercase font-bold text-black mb-2">
                Adidas / Yeezy Fit
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed uppercase tracking-wider">
                Yeezy 350 models typically run small. We strongly recommend
                choosing 0.5 size larger than your usual EU size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
