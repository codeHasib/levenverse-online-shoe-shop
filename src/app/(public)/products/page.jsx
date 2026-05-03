"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data.products || []);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow-sm">
            {/* CLICKABLE AREA */}
            <div
              onClick={() => router.push(`/products/${product._id}`)}
              className="cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* TITLE */}
              <h2 className="font-semibold hover:underline">{product.title}</h2>
            </div>

            {/* PRICE */}
            <p className="text-green-600 font-bold">৳ {product.price}</p>

            {/* ADD TO CART */}
            <button
              onClick={() =>
                addToCart(product, 1, product.sizes?.[0] || "default")
              }
              className={`mt-3 w-full py-2 rounded-lg text-white ${"bg-black hover:bg-gray-800"}`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
