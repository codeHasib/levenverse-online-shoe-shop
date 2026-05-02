import { useCartStore } from "@/store/cartStore";

const { addToCart } = useCartStore();

if (!selectedSize) {
  alert("Please select size");
  return;
}

addToCart(product, quantity, selectedSize);
