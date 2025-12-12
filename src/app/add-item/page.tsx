"use client";
import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  async function submit() {
    const res = await fetch("/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: desc, price: Number(price) })
    });
    const d = await res.json();
    if (d.product) alert("Created");
    else alert("Error");
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 mb-2 w-full" />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 mb-2 w-full" />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={submit} className="bg-blue-600 text-white p-2 rounded">Create</button>
    </div>
  );
}
