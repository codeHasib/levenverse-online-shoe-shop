"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useCartStore();

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item._id + item.size} className="mb-3 border p-3">
          <p>{item.title}</p>
          <p>Size: {item.size}</p>
          <p>Price: ৳{item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(
                item._id,
                item.size,
                Number(e.target.value)
              )
            }
            className="border px-2"
          />

          <button
            onClick={() =>
              removeFromCart(item._id, item.size)
            }
            className="ml-3 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="mt-4 font-bold">
        Total: ৳{getTotalPrice()}
      </h2>
    </div>
  );
}