"use client";

import { useState, useEffect, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  MapPin,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Changed from redirect for better client-side handling
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart, updateQuantity, removeFromCart } =
    useCartStore();

  const [hydrated, setHydrated] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState("inside");
  const [isLocating, setIsLocating] = useState(false);

  // --- FORM STATE ---
  const [form, setForm] = useState({
    name: "",
    email: "", // New Field
    phone: "",
    address: "",
    coordinates: null, // New Pinned Location Field
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  const subtotal = useMemo(() => getTotalPrice(), [cart]);
  const deliveryCharge = deliveryZone === "inside" ? 60 : 120;
  const finalTotal = subtotal + deliveryCharge;

  // --- LOCATION PINNING LOGIC ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // This updates the "coordinates" for the payload AND injects the link into the address text
        setForm((prev) => ({
          ...prev,
          coordinates: { lat: latitude, lng: longitude },
          address: prev.address
            ? `${prev.address}\n\nPinned Location: ${googleMapsUrl}`
            : `Pinned Location: ${googleMapsUrl}`,
        }));

        setIsLocating(false);
      },
      (error) => {
        alert("Permission denied. Please enable location services.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
  };
  const handleOrder = async () => {
    if (!cart.length) return alert("Your bag is empty");
    // Updated validation to include email
    if (!form.name || !form.email || !form.phone || !form.address)
      return alert("Please complete all delivery details");

    setIsOrdering(true);

    const orderPayload = {
      customerName: form.name,
      email: form.email, // Added to payload
      phone: form.phone,
      location: form.address,
      // pinnedCoordinates: form.coordinates, // Added to payload
      deliveryZone,
      deliveryCharge,
      items: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice: finalTotal,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        alert("Order received. A confirmation has been sent to your email.");
        window.location.href = "/products";
      } else {
        alert(data.error || "Order failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrdering(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">
        {/* --- LEFT: CART ITEMS --- */}
        <div className="lg:col-span-7">
          <div className="mb-12">
            <h2 className="text-2xl tracking-[0.4em] uppercase font-normal text-black mb-2">
              Shopping Bag
            </h2>
            <div className="h-[1px] w-20 bg-[#0070f3]" />
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  layout
                  key={`${item._id}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-8 border-b border-neutral-100 pb-8"
                >
                  <div className="relative w-28 h-36 bg-[#f9f9f9] overflow-hidden">
                    <Image
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform hover:scale-110 duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[11px] tracking-[0.3em] uppercase text-black mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[9px] text-neutral-400 uppercase tracking-widest">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id, item.size)}
                        className="text-neutral-300 hover:text-[#0070f3] transition-colors"
                      >
                        <Trash2 size={16} strokeWidth={1.2} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-neutral-100">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-3 py-2 hover:bg-neutral-50"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[11px] w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="px-3 py-2 hover:bg-neutral-50"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <p className="text-sm tracking-tighter text-black font-normal">
                        QAR {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- RIGHT: CHECKOUT & DELIVERY --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            {/* Address Form */}
            {cart.length > 0 ? (
              <>
                {/* Delivery Zone Toggle */}
                <div className="bg-[#f9f9f9] p-2 flex gap-1 border border-neutral-100">
                  {["inside", "outside"].map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setDeliveryZone(zone)}
                      className={`flex-1 py-4 text-[10px] tracking-[0.4em] uppercase transition-all ${deliveryZone === zone ? "bg-white shadow-sm text-[#0070f3]" : "text-neutral-400"}`}
                    >
                      {zone === "inside" ? "Inside Doha" : "Outside Doha"}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="Full Name"
                    className="w-full bg-white border-b border-neutral-200 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white border-b border-neutral-200 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Contact Number"
                    className="w-full bg-white border-b border-neutral-200 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  {/* PINNED LOCATION SYSTEM */}
                  <div className="relative">
                    <textarea
                      placeholder="Delivery Address Details"
                      rows={4} // Increased rows to accommodate the link
                      value={form.address} // 👈 This is the key change
                      className="w-full bg-white border-b border-neutral-200 py-4 pr-12 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all resize-none"
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className={`absolute right-0 top-4 p-2 transition-colors ${
                        form.coordinates
                          ? "text-[#0070f3]"
                          : "text-neutral-300 hover:text-black"
                      }`}
                    >
                      {isLocating ? (
                        <div className="w-4 h-4 border-2 border-[#0070f3] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Navigation size={18} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  {form.coordinates && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-[#0070f3] bg-blue-50/50 p-3"
                    >
                      <MapPin size={12} />
                      <span className="text-[9px] tracking-widest uppercase font-bold">
                        Exact Location Pinned Successfully
                      </span>
                    </motion.div>
                  )}
                </div>
                {/* Price Summary */}
                <div className="bg-black text-white p-10 space-y-4">
                  <div className="flex justify-between text-[10px] tracking-[0.4em] uppercase text-neutral-500">
                    <span>Subtotal</span>
                    <span>QAR {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[10px] tracking-[0.4em] uppercase text-neutral-500">
                    <span>Delivery ({deliveryZone})</span>
                    <span>QAR {deliveryCharge}</span>
                  </div>
                  <div className="pt-6 border-t border-neutral-800 flex justify-between items-end">
                    <span className="text-[10px] tracking-[0.4em] uppercase">
                      Total Amount
                    </span>
                    <span className="text-2xl tracking-tighter text-[#0070f3]">
                      QAR {finalTotal}
                    </span>
                  </div>

                  <button
                    onClick={handleOrder}
                    disabled={isOrdering || cart.length === 0}
                    className="w-full bg-[#0070f3] text-white text-[11px] tracking-[0.5em] uppercase py-6 mt-8 flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:bg-neutral-800"
                  >
                    {isOrdering ? "Placing Order..." : "Finalize Order"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl mb-4">Nothing to show</h2>
                <Link
                  className="bg-[#0070f3] text-white p-4 rounded-full font-extrabold inline-block"
                  href={"/products"}
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
