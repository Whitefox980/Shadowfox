import React, { useState } from "react";
import axios from "axios";

export default function MetaUnos() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    comment: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/add-target", formData);
      alert("Meta uspešno sačuvana!");
      setFormData({ name: "", url: "", comment: "", priority: "medium" });
    } catch (error) {
      alert("Greška pri slanju mete.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Unos Mete</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Naziv mete"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 text-black"
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={handleChange}
          className="w-full p-2 text-black"
        />
        <input
          type="text"
          name="comment"
          placeholder="Komentar"
          value={formData.comment}
          onChange={handleChange}
          className="w-full p-2 text-black"
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 text-black"
        >
          <option value="low">Nizak</option>
          <option value="medium">Srednji</option>
          <option value="high">Visok</option>
        </select>
        <button type="submit" className="bg-green-700 px-4 py-2 text-white">
          Sačuvaj metu
        </button>
      </form>
    </div>
  );
}
