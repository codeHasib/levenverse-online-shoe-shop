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
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart, updateQuantity, removeFromCart } =
    useCartStore();

  const [hydrated, setHydrated] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coordinates: null,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  const subtotal = useMemo(() => getTotalPrice(), [cart]);
  const deliveryCharge = 10;
  const finalTotal = subtotal + deliveryCharge;

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setForm((prev) => ({
          ...prev,
          coordinates: { lat: latitude, lng: longitude },
          address: prev.address
            ? `${prev.address}\n\nPinned Location: ${googleMapsUrl}`
            : `Pinned Location: ${googleMapsUrl}`,
        }));
        setIsLocating(false);
      },
      () => {
        alert("Permission denied. Please enable location services.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
  };

  const handleOrder = async () => {
    if (!cart.length) return alert("Your bag is empty");
    if (!form.name || !form.email || !form.phone || !form.address)
      return alert("Please complete all delivery details");

    setIsOrdering(true);

    const orderPayload = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      location: form.address,
      deliveryCharge,
      items: cart.map((item) => ({
        productId: item._id || item.id || item.productId,
        title: item.title,
        price: item.price,
        size: item.size,
        color: item.color, // 🔥 ADDED COLOR HERE
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
        setShowSuccess(true);
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

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="bg-blue-50 p-6 rounded-full">
              <CheckCircle2
                size={60}
                className="text-[#0070f3]"
                strokeWidth={1}
              />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl tracking-[0.3em] uppercase font-bold text-black">
              Order Received
            </h2>
            <p className="text-[11px] tracking-widest text-neutral-400 uppercase leading-loose">
              Thank you for shopping with LevenVerse.
            </p>
          </div>
          <Link
            href="/products"
            className="block w-full bg-black text-white text-[10px] tracking-[0.4em] uppercase py-5 rounded-xl hover:bg-[#0070f3] transition-all"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <div className="mb-12">
            <h2 className="text-2xl tracking-[0.4em] uppercase font-normal text-black mb-2">
              Shopping Bag
            </h2>
            <div className="h-[1px] w-20 bg-[#0070f3]" />
          </div>

          {cart.length > 0 ? (
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => {
                  // ✅ Define a secure identifier for all store operations
                  const itemId = item._id || item.id || item.productId;

                  return (
                    <motion.div
                      layout
                      key={`${itemId}-${item.size}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex gap-8 border-b border-neutral-100 pb-8"
                    >
                      <div className="relative w-28 h-36 bg-[#f9f9f9] rounded-xl overflow-hidden">
                        <Image
                          src={item.images?.[0] || "/placeholder.png"}
                          alt={item.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between pt-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-[11px] tracking-[0.3em] uppercase text-black mb-1 font-bold">
                              {item.title}
                            </h3>
                            <p className="text-[9px] text-neutral-400 uppercase tracking-widest">
                              Size: {item.size}{" "}
                              {item.color && `| Color: ${item.color}`}{" "}
                              {/* 🔥 DISPLAY COLOR */}
                            </p>
                          </div>
                          <button
                            // 🔥 PASS COLOR TO REMOVE FUNCTION
                            onClick={() =>
                              removeFromCart(itemId, item.size, item.color)
                            }
                            className="text-neutral-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-neutral-100 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  itemId,
                                  item.size,
                                  item.color, // 🔥 PASS COLOR BEFORE QUANTITY
                                  Math.max(1, Number(item.quantity) - 1),
                                )
                              }
                              className="px-3 py-2 hover:bg-neutral-50 transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[11px] w-8 text-center font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  itemId,
                                  item.size,
                                  item.color, // 🔥 PASS COLOR BEFORE QUANTITY
                                  Number(item.quantity) + 1,
                                )
                              }
                              className="px-3 py-2 hover:bg-neutral-50 transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <p className="text-sm tracking-tighter text-black font-medium">
                            QAR {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-20 text-center space-y-6 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
              <ShoppingBag
                className="mx-auto text-neutral-300"
                size={40}
                strokeWidth={1}
              />
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Your bag is currently empty
              </p>
              <Link
                href="/products"
                className="inline-block bg-black text-white px-8 py-4 rounded-xl text-[10px] tracking-[0.3em] uppercase hover:bg-[#0070f3] transition-all"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* --- RIGHT: CHECKOUT & DELIVERY (Unchanged but included for completeness) --- */}
        {cart.length > 0 && (
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="space-y-4">
                <input
                  placeholder="Full Name"
                  className="w-full bg-white border border-neutral-100 rounded-xl px-5 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all shadow-sm"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-neutral-100 rounded-xl px-5 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all shadow-sm"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  placeholder="Contact Number"
                  className="w-full bg-white border border-neutral-100 rounded-xl px-5 py-4 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all shadow-sm"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <div className="relative">
                  <textarea
                    placeholder="Delivery Address Details"
                    rows={4}
                    value={form.address}
                    className="w-full bg-white border border-neutral-100 rounded-xl px-5 py-4 pr-12 text-[11px] tracking-widest uppercase focus:border-[#0070f3] outline-none transition-all resize-none shadow-sm"
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className={`absolute right-4 top-4 p-2 transition-colors ${
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
                    className="flex items-center gap-2 text-[#0070f3] bg-blue-50/50 p-4 rounded-xl border border-blue-100"
                  >
                    <MapPin size={12} />
                    <span className="text-[9px] tracking-widest uppercase font-bold">
                      Location Pinned
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-black text-white p-8 rounded-2xl space-y-4 shadow-2xl shadow-blue-900/10">
                <div className="flex justify-between text-[10px] tracking-[0.4em] uppercase text-neutral-500">
                  <span>Subtotal</span>
                  <span>QAR {subtotal}</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-[0.4em] uppercase text-neutral-500">
                  <span>Delivery (Qatar)</span>
                  <span>QAR {deliveryCharge}</span>
                </div>
                <div className="pt-6 border-t border-neutral-800 flex justify-between items-end">
                  <span className="text-[10px] tracking-[0.4em] uppercase">
                    Total
                  </span>
                  <span className="text-2xl tracking-tighter text-[#0070f3] font-bold">
                    QAR {finalTotal}
                  </span>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={isOrdering}
                  className="w-full bg-[#0070f3] text-white text-[11px] tracking-[0.5em] uppercase py-6 mt-8 rounded-xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:bg-neutral-800"
                >
                  {isOrdering ? "Processing..." : "Confirm Order"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
