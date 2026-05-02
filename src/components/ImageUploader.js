"use client";

import { useState } from "react";

export default function ImageUploader({ onUploadComplete }) {
  const [loading, setLoading] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    const uploaded = [];

    for (let file of files) {
      const base64 = await toBase64(file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: base64,
          type: "image",
        }),
      });

      const data = await res.json();

      if (data.success) {
        uploaded.push(data.url);
      }
    }

    onUploadComplete(uploaded);
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
      />

      {loading && <p>Uploading...</p>}
    </div>
  );
}