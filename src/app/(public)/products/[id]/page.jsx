"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Reviews from "@/components/public/ProductReviews";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const res = await fetch(`/api/products/${id}`);
        const res = await fetch(`/api/products/`, { cache: "no-store" });

        if (!res.ok) {
          console.error("API ERROR:", await res.text());
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log(data);
        const kamla = data.products.find((item) => item._id == id);
        setProduct(kamla);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Image
        alt="Product image"
        width={250}
        height={250}
        src={product.images?.[0]}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>

      <p className="text-xl font-bold mt-2">৳{product.price}</p>

      <button
        onClick={() => addToCart(product, 1)}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>

      {/* REVIEWS SECTION */}
      {/* <ReviewBox productId={id} />
       */}
      <Reviews productId={id}></Reviews>
    </div>
  );
}
