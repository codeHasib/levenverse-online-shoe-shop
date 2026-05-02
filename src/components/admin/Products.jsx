"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Box, LayoutGrid, X, Save } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";

export default function AdminProducts() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Full product object for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    sizes: "",
    video: "",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (isUpdate = false) => {
    if (!form.title || !form.price)
      return alert("Title and price are required");

    setIsLoading(true);

    let finalImages = images;

    // 🚀 AUTO UPLOAD IF IMAGES ARE BASE64
    if (images.length && images[0].startsWith("data:")) {
      const uploadedUrls = [];

      for (let img of images) {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: img,
            folder: "levenverse/products",
          }),
        });

        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.url);
        }
      }

      finalImages = uploadedUrls;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      sizes: form.sizes.split(",").map((s) => s.trim()),
      images: finalImages,
    };

    const url = isUpdate
      ? `/api/products/${editingProduct._id}`
      : "/api/products";

    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      closeModal();
      resetForm();
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchProducts();
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      sizes: product.sizes.join(","),
      video: product.video || "",
    });
    setImages(product.images || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      sizes: "",
      video: "",
    });
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12 pb-32">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            Inventory <span className="text-[#0070f3]">Forge</span>
          </h1>
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            LV Master Copy Control
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ADD PRODUCT FORM (ALWAYS VISIBLE) */}
        <div className="w-full lg:w-4/12">
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-6 border-t-[#0070f3]">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Plus size={16} className="text-[#0070f3]" /> New Entry
            </h2>
            <ProductFormFields
              form={form}
              handleChange={handleChange}
              categories={categories}
            />
            <div className="mt-4">
              <ImageUploader onUploadComplete={setImages} />
            </div>
            <button
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
              className="w-full mt-6 bg-white text-black font-black uppercase text-xs tracking-widest py-4 rounded-2xl hover:bg-[#0070f3] hover:text-white transition-all disabled:opacity-50"
            >
              {isLoading ? "SAVING..." : "DEPLOY PRODUCT"}
            </button>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <LayoutGrid size={16} className="text-[#0070f3]" /> Live
              Collection
            </h2>
          </div>
          <div className="grid gap-3">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-2xl flex items-center gap-4 group hover:border-[#0070f3]/50 transition-all"
              >
                <Image
                  src={p.images?.[0] || ""}
                  width={55}
                  height={55}
                  className="bg-black rounded-xl object-cover border border-neutral-800"
                  alt=""
                />
                <div className="flex-1">
                  <h3 className="text-xs font-black uppercase tracking-tight truncate">
                    {p.title}
                  </h3>
                  <p className="text-[#0070f3] text-[10px] font-black italic">
                    QAR {p.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-3 bg-neutral-900 rounded-xl hover:bg-white hover:text-black transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-3 bg-neutral-900 rounded-xl hover:bg-red-600 transition-all text-neutral-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-neutral-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                    Edit <span className="text-[#0070f3]">Product</span>
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 bg-neutral-900 rounded-full hover:bg-red-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ProductFormFields
                    form={form}
                    handleChange={handleChange}
                    categories={categories}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase mb-3">
                    Update Media
                  </p>
                  <ImageUploader onUploadComplete={setImages} />
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={() => handleSubmit(true)}
                    disabled={isLoading}
                    className="flex-1 bg-[#0070f3] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-2"
                  >
                    <Save size={18} />{" "}
                    {isLoading ? "UPDATING..." : "COMMIT CHANGES"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable fields to avoid code duplication
function ProductFormFields({ form, handleChange, categories }) {
  return (
    <div className="space-y-4 w-full contents">
      <div className="col-span-full">
        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
          Product Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none"
        />
      </div>
      <div>
        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
          Price (QAR)
        </label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none"
        />
      </div>
      <div>
        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
          Category
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none"
        >
          <option value="">SELECT</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-full">
        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
          Available Sizes
        </label>
        <input
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="40, 41, 42"
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none"
        />
      </div>
      <div className="col-span-full">
        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
          Description
        </label>
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-medium focus:border-[#0070f3] outline-none"
        />
      </div>
    </div>
  );
}
