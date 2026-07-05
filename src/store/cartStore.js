import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      // 🔥 NEW: Added `color` parameter
      addToCart: (product, quantity = 1, size, color) => {
        // 🔥 NEW: Check for matching ID, size, AND color
        const existing = get().cart.find(
          (item) =>
            item._id === product._id &&
            item.size === size &&
            item.color === color,
        );

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item._id === product._id &&
              item.size === size &&
              item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                ...product,
                quantity,
                size,
                color, // 🔥 NEW: Save color to cart item
              },
            ],
          });
        }
      },

      // 🔥 NEW: Require color to remove specific item
      removeFromCart: (id, size, color) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(item._id === id && item.size === size && item.color === color),
          ),
        });
      },

      // 🔥 NEW: Require color to update specific item
      updateQuantity: (id, size, color, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item._id === id && item.size === size && item.color === color
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
