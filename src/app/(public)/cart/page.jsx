"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleOrder = async () => {
    const orderPayload = {
      customerName: form.name,
      phone: form.phone,
      location: form.address,
      items: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice: getTotalPrice(),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order placed successfully!");
      clearCart();
    }
  };

  if (!hydrated) return null; // 🔥 IMPORTANT FIX

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Phone"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Address"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <div className="font-bold mb-4">
        Total: ৳{getTotalPrice()}
      </div>

      <button
        onClick={handleOrder}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Place Order
      </button>
    </div>
  );
}