"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Globe } from "lucide-react";

// Brand-specific SVG components for the Qatar market
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.001 2.25c-5.376 0-9.75 4.374-9.75 9.75 0 2.187.725 4.214 1.96 5.856L2.25 21.75l4.041-1.89c1.642 1.235 3.669 1.96 5.71 1.96 5.376 0 9.75-4.374 9.75-9.75s-4.374-9.75-9.75-9.75z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function ContactPage() {
  const contactMethods = [
    {
      icon: WhatsAppIcon,
      title: "WhatsApp Support",
      value: "+974 XXXX XXXX",
      label: "Instant Response",
      color: "bg-green-50 text-green-600",
      link: "https://wa.me/974XXXXXXXX",
    },
    {
      icon: InstagramIcon,
      title: "Instagram DM",
      value: "@levenverse.qa",
      label: "Daily Updates",
      color: "bg-purple-50 text-purple-600",
      link: "https://instagram.com/levenverse.qa",
    },
    {
      icon: Mail,
      title: "Email Inquiry",
      value: "hello@levenverse.com",
      label: "Official Support",
      color: "bg-blue-50 text-[#0070f3]",
      link: "mailto:hello@levenverse.com",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h1 className="text-5xl md:text-6xl tracking-tighter font-medium text-black uppercase">
            Get in <span className="text-neutral-300 italic">Touch</span>
          </h1>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 leading-loose max-w-lg font-bold">
            Questions about a specific silhouette? Our team provides
            personalized sizing advice and stock updates via WhatsApp and DM.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={idx}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex items-center justify-between p-6 bg-[#fcfcfc] border border-neutral-100 rounded-[2rem] hover:border-[#0070f3]/20 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 ${method.color} rounded-2xl flex items-center justify-center`}
                    >
                      <method.icon
                        size={22}
                        strokeWidth={method.icon === InstagramIcon ? 1.5 : 0}
                      />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-40 leading-none block mb-1">
                        {method.label}
                      </span>
                      <h3 className="text-sm font-bold text-black uppercase tracking-tight">
                        {method.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 lowercase">
                        {method.value}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-[#0070f3] group-hover:text-white group-hover:border-[#0070f3] transition-all duration-300">
                    <Send size={14} />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Operational Info */}
            <div className="space-y-8 pl-4">
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-[#0070f3]" size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-black">
                    Online Support
                  </h4>
                  <p className="text-[11px] text-neutral-400 uppercase mt-1">
                    Sat — Thu: 9 AM to 10 PM
                  </p>
                  <p className="text-[11px] text-neutral-400 uppercase">
                    Friday: 2 PM to 10 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-[#0070f3]" size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-black">
                    Fulfillment Hub
                  </h4>
                  <p className="text-[11px] text-neutral-400 uppercase mt-1">
                    Doha, Qatar
                  </p>
                  <p className="text-[11px] text-neutral-400 uppercase italic">
                    Nationwide Delivery Coverage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Support Text */}
        <div className="mt-32 flex flex-col items-center justify-center gap-4 text-center">
          <div className="h-[1px] w-12 bg-neutral-100" />
          <p className="text-[8px] tracking-[0.6em] uppercase text-neutral-300 font-bold">
            Levenverse Qatar Concierge
          </p>
        </div>
      </div>
    </div>
  );
}
