import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1, size) => {
        const existing = get().cart.find(
          (item) =>
            item._id === product._id && item.size === size
        );

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item._id === product._id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
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
              },
            ],
          });
        }
      },

      removeFromCart: (id, size) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(item._id === id && item.size === size)
          ),
        });
      },

      updateQuantity: (id, size, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item._id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);