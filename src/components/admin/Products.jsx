"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  LayoutGrid,
  X,
  Save,
  Palette,
  Trash,
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";

export default function AdminProducts() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 NEW: Form state uses a `colors` array instead of global sizes/stock
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    video: "",
    colors: [{ colorName: "", sizes: "", inStock: true }],
  });

  useEffect(() => {
    fetch("/api/categories", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 NEW: Color Management Handlers
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...form.colors];
    updatedColors[index][field] = value;
    setForm({ ...form, colors: updatedColors });
  };

  const addColor = () => {
    setForm({
      ...form,
      colors: [...form.colors, { colorName: "", sizes: "", inStock: true }],
    });
  };

  const removeColor = (index) => {
    const updatedColors = form.colors.filter((_, i) => i !== index);
    setForm({ ...form, colors: updatedColors });
  };

  const setAsPrimary = (index) => {
    if (index === 0) return;
    const updatedImages = [...images];
    const [selectedImage] = updatedImages.splice(index, 1);
    updatedImages.unshift(selectedImage);
    setImages(updatedImages);
  };

  const handleSubmit = async (isUpdate = false) => {
    if (!form.title || !form.price)
      return alert("Title and price are required");

    // Validate that at least one color exists and has a name
    if (form.colors.length === 0 || !form.colors[0].colorName) {
      return alert("At least one color variant with a name is required");
    }

    setIsLoading(true);

    let finalImages = images;
    if (images.length && images[0].startsWith("data:")) {
      const uploadedUrls = [];
      for (let img of images) {
        const res = await fetch("/api/upload", {
          cache: "no-store",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: img, folder: "levenverse/products" }),
        });
        const data = await res.json();
        if (data.success) uploadedUrls.push(data.url);
      }
      finalImages = uploadedUrls;
    }

    // 🔥 NEW: Format sizes from string to array for EACH color
    const formattedColors = form.colors.map((c) => ({
      colorName: c.colorName,
      sizes:
        typeof c.sizes === "string"
          ? c.sizes
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : c.sizes,
      inStock: c.inStock === true || c.inStock === "true",
    }));

    const payload = {
      ...form,
      price: Number(form.price),
      colors: formattedColors,
      images: finalImages,
    };

    const url = isUpdate
      ? `/api/products/${editingProduct._id}`
      : "/api/products";
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      cache: "no-store",
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

    // 🔥 NEW: Parse DB colors back into string format for inputs
    const parsedColors = product.colors?.length
      ? product.colors.map((c) => ({
          ...c,
          sizes: c.sizes.join(", "),
        }))
      : [{ colorName: "", sizes: "", inStock: true }];

    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      video: product.video || "",
      colors: parsedColors,
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
      video: "",
      colors: [{ colorName: "", sizes: "", inStock: true }],
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
        {/* ADD PRODUCT FORM */}
        <div className="w-full lg:w-4/12">
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-6 border-t-[#0070f3]">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Plus size={16} className="text-[#0070f3]" /> New Entry
            </h2>

            {/* Form Fields component now takes color handlers */}
            <ProductFormFields
              form={form}
              handleChange={handleChange}
              categories={categories}
              handleColorChange={handleColorChange}
              addColor={addColor}
              removeColor={removeColor}
            />

            <div className="mt-4">
              <ImageUploader onUploadComplete={setImages} />
              <ImagePreviewGrid images={images} setAsPrimary={setAsPrimary} />
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
            {products.map((p) => {
              // Check if ALL colors are out of stock
              const isCompletelyOutOfStock =
                p.colors?.length > 0 &&
                p.colors.every((c) => c.inStock === false);

              return (
                <div
                  key={p._id}
                  className={`bg-[#0a0a0a] border p-4 rounded-2xl flex items-center gap-4 group transition-all ${
                    isCompletelyOutOfStock
                      ? "border-red-900/50 opacity-70"
                      : "border-neutral-900 hover:border-[#0070f3]/50"
                  }`}
                >
                  <Image
                    src={p.images?.[0] || ""}
                    width={55}
                    height={55}
                    className="bg-black rounded-xl object-cover border border-neutral-800"
                    alt=""
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black uppercase tracking-tight truncate">
                        {p.title}
                      </h3>
                      {isCompletelyOutOfStock && (
                        <span className="text-[8px] font-bold bg-red-600/20 text-red-500 px-2 py-0.5 rounded-sm uppercase tracking-widest">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 items-center mt-1">
                      <p className="text-[#0070f3] text-[10px] font-black italic">
                        QAR {p.price}
                      </p>
                      <span className="text-neutral-600 text-[10px]">•</span>
                      <p className="text-neutral-500 text-[10px] font-bold">
                        {p.colors?.length || 0} Colors
                      </p>
                    </div>
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
              );
            })}
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

                <div className="grid gap-6">
                  <ProductFormFields
                    form={form}
                    handleChange={handleChange}
                    categories={categories}
                    handleColorChange={handleColorChange}
                    addColor={addColor}
                    removeColor={removeColor}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase mb-3">
                    Update Media
                  </p>
                  <ImageUploader onUploadComplete={setImages} />
                  <ImagePreviewGrid
                    images={images}
                    setAsPrimary={setAsPrimary}
                  />
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

// 🔥 REFACTORED: Reusable fields now include dynamic color mapping
function ProductFormFields({
  form,
  handleChange,
  categories,
  handleColorChange,
  addColor,
  removeColor,
}) {
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
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 col-span-full">
        <div>
          <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">
            Price (QAR)
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
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
            className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
          >
            <option value="">SELECT</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
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
          className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-medium focus:border-[#0070f3] outline-none text-white"
        />
      </div>

      {/* 🔥 NEW: Color Variants System Area */}
      <div className="col-span-full mt-6 bg-neutral-900/30 p-4 rounded-2xl border border-neutral-800">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] font-black text-[#0070f3] flex items-center gap-2 uppercase tracking-widest">
            <Palette size={14} /> Color Variants
          </label>
        </div>

        <div className="space-y-4">
          {form.colors.map((colorItem, index) => (
            <div
              key={index}
              className="bg-black p-4 rounded-xl border border-neutral-800 relative"
            >
              {/* Delete Color Button (hidden if only 1 color left) */}
              {form.colors.length > 1 && (
                <button
                  onClick={() => removeColor(index)}
                  className="absolute top-3 right-3 text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <Trash size={14} />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
                    Color Name
                  </label>
                  <input
                    value={colorItem.colorName}
                    onChange={(e) =>
                      handleColorChange(index, "colorName", e.target.value)
                    }
                    placeholder="e.g., Midnight Black"
                    className="w-full bg-transparent border-b border-neutral-800 py-2 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
                  />
                </div>

                <div>
                  <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
                    Stock Status
                  </label>
                  <select
                    value={colorItem.inStock}
                    onChange={(e) =>
                      handleColorChange(index, "inStock", e.target.value)
                    }
                    className="w-full bg-transparent border-b border-neutral-800 py-2 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
                  >
                    <option value={true} className="bg-black">
                      IN STOCK
                    </option>
                    <option value={false} className="bg-black">
                      OUT OF STOCK
                    </option>
                  </select>
                </div>

                <div className="col-span-full">
                  <label className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
                    Sizes for {colorItem.colorName || "this color"}
                  </label>
                  <input
                    value={colorItem.sizes}
                    onChange={(e) =>
                      handleColorChange(index, "sizes", e.target.value)
                    }
                    placeholder="40, 41, 42"
                    className="w-full bg-transparent border-b border-neutral-800 py-2 text-xs font-bold focus:border-[#0070f3] outline-none text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addColor}
          className="mt-4 w-full border border-dashed border-neutral-700 hover:border-[#0070f3] text-neutral-500 hover:text-[#0070f3] transition-all rounded-xl py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Another Color
        </button>
      </div>
    </div>
  );
}

// Preview Grid remains unchanged
function ImagePreviewGrid({ images, setAsPrimary }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="mt-6 border-t border-neutral-900 pt-4">
      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-3">
        Select Primary Thumbnail
      </p>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setAsPrimary(idx)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
              idx === 0
                ? "border-[#0070f3] shadow-[0_0_15px_rgba(0,112,243,0.3)]"
                : "border-neutral-800 hover:border-neutral-500 opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover bg-black"
            />
            {idx === 0 && (
              <div className="absolute bottom-0 inset-x-0 bg-[#0070f3] text-white text-[8px] font-black tracking-widest uppercase text-center py-1.5">
                Primary
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
