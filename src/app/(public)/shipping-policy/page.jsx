"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, ShieldCheck, HelpCircle } from "lucide-react";

export default function ShippingPolicy() {
  const policies = [
    {
      icon: Clock,
      title: "Delivery Timeline",
      detail: "Standard delivery within Doha and surrounding areas takes 24-48 hours. Orders placed before 4:00 PM are typically dispatched the same day."
    },
    {
      icon: Truck,
      title: "Shipping Rates",
      detail: "We offer a flat-rate delivery fee of QAR 10 for all locations across Qatar. There are no hidden surcharges for residential or business addresses."
    },
    {
      icon: MapPin,
      title: "Coverage Areas",
      detail: "We deliver nationwide, covering Doha, Al Wakrah, Al Khor, Lusail, and Ar-Rayyan. For remote desert locations, please contact our support team."
    },
    {
      icon: ShieldCheck,
      title: "Inspection on Delivery",
      detail: "As we specialize in premium footwear variants, we encourage customers to inspect the outer packaging before accepting the delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-5xl tracking-tighter font-medium text-black">
            SHIPPING <span className="text-neutral-300 italic">LOGISTICS</span>
          </h1>
          <div className="h-[1px] w-24 bg-[#0070f3] mx-auto" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-bold pt-4">
            Last Updated: May 2026
          </p>
        </div>

        {/* Core Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {policies.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-[#f9f9f9] rounded-[2rem] border border-neutral-100 space-y-4"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#0070f3]">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-bold text-black">{item.title}</h3>
              <p className="text-[11px] leading-relaxed text-neutral-500 uppercase tracking-widest">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 px-2">
          <section className="space-y-4">
            <h2 className="text-xl tracking-tight font-bold text-black uppercase">Order Tracking</h2>
            <p className="text-xs text-neutral-500 leading-relaxed tracking-wide">
              Once your order is confirmed, you will receive an automated notification via email or WhatsApp. Our delivery partners will call you to coordinate the exact drop-off time and pin your location to ensure accurate arrival.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl tracking-tight font-bold text-black uppercase">Cash on Delivery (COD)</h2>
            <p className="text-xs text-neutral-500 leading-relaxed tracking-wide">
              For your convenience, we support Cash on Delivery across all municipalities. Please ensure the exact amount is ready for our courier to facilitate a swift transaction. We also accept local bank transfers upon request.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl tracking-tight font-bold text-black uppercase">Missed Deliveries</h2>
            <p className="text-xs text-neutral-500 leading-relaxed tracking-wide">
              If you are unavailable at the time of delivery, our courier will attempt to reach you up to 3 times. After the third attempt, the order will be returned to our fulfillment center, and a rescheduling fee may apply.
            </p>
          </section>
        </div>

        {/* Support CTA */}
        <div className="mt-20 p-10 bg-black rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#0070f3]">
              <HelpCircle size={16} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Support</span>
            </div>
            <h4 className="text-xl tracking-tighter">Need shipping assistance?</h4>
          </div>
          <button className="bg-white text-black px-10 py-4 rounded-2xl text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#0070f3] hover:text-white transition-all">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}