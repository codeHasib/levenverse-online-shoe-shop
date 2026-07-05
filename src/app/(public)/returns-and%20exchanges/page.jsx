"use client";

import { motion } from "framer-motion";
import {
  RefreshCw,
  ShieldAlert,
  PackageCheck,
  Banknote,
  HelpCircle,
} from "lucide-react";

export default function ReturnsRefunds() {
  const steps = [
    {
      icon: RefreshCw,
      title: "7-Day Exchange",
      detail:
        "We offer a 7-day exchange window from the date of delivery. If the size isn't perfect, we'll swap it for you.",
    },
    {
      icon: ShieldAlert,
      title: "Quality Guarantee",
      detail:
        "In the rare event of a manufacturing defect, we provide a full replacement at no additional cost to you.",
    },
    {
      icon: PackageCheck,
      title: "Pristine Condition",
      detail:
        "Items must be returned unworn, in their original packaging, with all Levenverse tags and accessories intact.",
    },
    {
      icon: Banknote,
      title: "Refund Method",
      detail:
        "Approved refunds are processed via bank transfer or store credit within 3-5 business days.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-5xl tracking-tighter font-medium text-black">
            RETURNS & <span className="text-neutral-300 italic">EXCHANGES</span>
          </h1>
          <div className="h-[1px] w-24 bg-[#0070f3] mx-auto" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-bold pt-4">
            Ensuring Your Satisfaction in Qatar
          </p>
        </div>

        {/* Quick View Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-[#fcfcfc] rounded-[2rem] border border-neutral-100 hover:border-[#0070f3]/20 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#0070f3] mb-6">
                <step.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold text-black mb-2">
                {step.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-neutral-500 uppercase tracking-widest">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-16 border-t border-neutral-100 pt-16">
          <section className="grid md:grid-cols-3 gap-8">
            <h2 className="text-[11px] tracking-[0.4em] uppercase font-bold text-black">
              01. The Process
            </h2>
            <div className="md:col-span-2 space-y-4 text-xs text-neutral-500 leading-relaxed tracking-wide">
              <p>
                To initiate a return, contact our support via WhatsApp or Email
                with your Order ID. Our courier will be dispatched to your
                location within 48 hours to collect the item.
              </p>
              <p className="font-bold text-black">
                Note: A QAR 15 collection fee applies for size-related exchanges
                to cover logistics.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <h2 className="text-[11px] tracking-[0.4em] uppercase font-bold text-black">
              02. Non-Returnable Items
            </h2>
            <div className="md:col-span-2 space-y-4 text-xs text-neutral-500 leading-relaxed tracking-wide">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Items showing visible signs of outdoor wear or sole scuffing.
                </li>
                <li>
                  Products purchased during "Clearance" or "Flash Sale" events.
                </li>
                <li>Customized or specially ordered silhouettes.</li>
              </ul>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <h2 className="text-[11px] tracking-[0.4em] uppercase font-bold text-black">
              03. Cancellations
            </h2>
            <div className="md:col-span-2 space-y-4 text-xs text-neutral-500 leading-relaxed tracking-wide">
              <p>
                You may cancel your order at any time before it leaves our
                fulfillment center. Once the item is with the courier, the
                standard exchange policy applies.
              </p>
            </div>
          </section>
        </div>

        {/* Support Footer */}
        <div className="mt-24 p-12 bg-[#0070f3] rounded-[2.5rem] text-white text-center space-y-6">
          <div className="flex justify-center">
            <HelpCircle size={32} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl tracking-tighter">
              Have a specific question?
            </h3>
            <p className="text-[10px] tracking-widest uppercase opacity-80">
              Our Qatar-based team is ready to help.
            </p>
          </div>
          <a
            href="https://wa.me/97477250484"
            target="_blank"
            className="bg-black text-white px-12 py-5 rounded-2xl text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-black transition-all"
          >
            Whatsapp Support
          </a>
        </div>
      </div>
    </div>
  );
}
