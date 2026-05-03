"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  clock,
  ArrowRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function ContactSection() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "service_tjvncwr";
    const TEMPLATE_ID = "template_2m3nlje";
    const PUBLIC_KEY = "-GaV6jMONa3JU0pwm";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      (result) => {
        alert("Message sent successfully! We'll get back to you soon.");
        formRef.current.reset(); // Clears the fields automatically
        setLoading(false);
      },
      (error) => {
        alert("Failed to send message. Please try again.");
        setLoading(false);
      },
    );
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-20">
          <h2 className="text-[12px] tracking-[0.6em] uppercase font-medium text-neutral-400 mb-4">
            Client Relations
          </h2>
          <h3 className="text-4xl md:text-5xl tracking-tighter font-light text-black">
            How can we assist <br />{" "}
            <span className="italic">your journey?</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* --- LEFT: CONTACT INFO --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="group flex gap-6">
                <div className="w-12 h-12 border border-neutral-100 flex items-center justify-center text-[#0070f3] group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <MessageCircle size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1 text-black">
                    WhatsApp Concierge
                  </h4>
                  <p className="text-[13px] text-neutral-500 mb-2">
                    Available for instant sizing & styling advice.
                  </p>
                  <a
                    href="https://wa.me/974XXXXXXXX"
                    className="text-[11px] text-[#0070f3] tracking-widest uppercase border-b border-blue-100 pb-0.5"
                  >
                    +974 XXXX XXXX
                  </a>
                </div>
              </div>

              <div className="group flex gap-6">
                <div className="w-12 h-12 border border-neutral-100 flex items-center justify-center text-[#0070f3] group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1 text-black">
                    Email Enquiries
                  </h4>
                  <p className="text-[13px] text-neutral-500 mb-2">
                    For order support and corporate gifting.
                  </p>
                  <a
                    href="mailto:support@levenverse.com"
                    className="text-[11px] text-[#0070f3] tracking-widest uppercase border-b border-blue-100 pb-0.5"
                  >
                    hello@levenverse.com
                  </a>
                </div>
              </div>

              <div className="group flex gap-6">
                <div className="w-12 h-12 border border-neutral-100 flex items-center justify-center text-[#0070f3] group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1 text-black">
                    Doha Headquarters
                  </h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    Lusail Marina, Tower A<br />
                    Doha, Qatar
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-8 bg-[#f9f9f9] border-l-2 border-[#0070f3]">
              <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-400 mb-2">
                Service Hours
              </p>
              <p className="text-[11px] tracking-widest uppercase text-black font-medium">
                Sat — Thu: 09:00 - 21:00 <br />
                Fri: 14:00 - 21:00
              </p>
            </div>
          </div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input
                    type="text"
                    name="from_name" // Matches {{from_name}} in Template
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 text-[12px] tracking-widest uppercase outline-none focus:border-[#0070f3] transition-all"
                  />
                  <label className="absolute left-0 top-3 text-[10px] tracking-[0.3em] uppercase text-neutral-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[#0070f3] peer-[:not(:placeholder-shown)]:-top-4">
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="reply_to" // Matches {{reply_to}} in Template
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 text-[12px] tracking-widest uppercase outline-none focus:border-[#0070f3] transition-all"
                  />
                  <label className="absolute left-0 top-3 text-[10px] tracking-[0.3em] uppercase text-neutral-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[#0070f3] peer-[:not(:placeholder-shown)]:-top-4">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <select
                  name="subject"
                  required
                  className="peer w-full bg-transparent border-b border-neutral-200 py-3 text-[10px] tracking-[0.2em] uppercase outline-none focus:border-[#0070f3] transition-all appearance-none cursor-pointer"
                >
                  <option value="">Subject of Enquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Business Inquiries">Business Inquiries</option>
                </select>
                <div className="absolute right-0 bottom-4 pointer-events-none">
                  <ArrowRight
                    size={14}
                    className="rotate-90 text-neutral-300"
                  />
                </div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-neutral-200 py-3 text-[12px] tracking-widest uppercase outline-none focus:border-[#0070f3] transition-all resize-none"
                />
                <label className="absolute left-0 top-3 text-[10px] tracking-[0.3em] uppercase text-neutral-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[#0070f3] peer-[:not(:placeholder-shown)]:-top-4">
                  Message
                </label>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full md:w-auto bg-black text-white px-12 py-5 text-[10px] tracking-[0.5em] uppercase flex items-center justify-center gap-4 hover:bg-[#0070f3] transition-all duration-500 group disabled:bg-neutral-400"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
