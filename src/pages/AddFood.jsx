import React, { useState } from "react";

export default function AddFood() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8001/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description: desc, price: parseInt(price), image_url: imageUrl }),
    });
    if (res.ok) {
      alert("Food added!");
      setName("");
      setDesc("");
      setPrice("");
      setImageUrl("");
    } else {
      alert("Failed to add food");
    }
  };

  return (
    <div>
      <h2>Add Food</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        <input
          placeholder="Price"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
}
