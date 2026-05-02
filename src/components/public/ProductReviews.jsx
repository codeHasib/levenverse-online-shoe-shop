"use client";

import { useEffect, useState } from "react";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // 🔹 Fetch approved reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit review
  const handleSubmit = async () => {
    if (!form.name || !form.rating) {
      alert("Name and rating required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          ...form,
          rating: Number(form.rating),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Review submitted for approval ✅");

        setForm({
          name: "",
          rating: 5,
          comment: "",
        });
      } else {
        alert("Failed ❌");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="mt-10">
      {/* ================= REVIEWS LIST ================= */}
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500 mb-4">No reviews yet</p>
      )}

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="border p-3 rounded">
            <p className="font-semibold">{r.name}</p>
            <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>

      {/* ================= ADD REVIEW ================= */}
      <div className="mt-8 border p-4 rounded">
        <h3 className="font-semibold mb-3">Write a Review</h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full border p-2 mb-2"
        />

        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star
            </option>
          ))}
        </select>

        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Write your review..."
          className="w-full border p-2 mb-2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-4 py-2"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
