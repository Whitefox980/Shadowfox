import React, { useState } from "react";
import axios from "@/api/axios";

export default function MetaUnos() {
  const [meta, setMeta] = useState({
    name: "",
    url: "",
    comment: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!meta.name || !meta.url) {
      alert("Naziv i URL/IP su obavezni.");
      return;
    }

    try {
      await axios.post("/add-target", meta);
      alert("Meta uspešno sačuvana.");
      setMeta({ name: "", url: "", comment: "", priority: "medium" });
    } catch (err) {
      console.error("Greška:", err);
      alert("Došlo je do greške prilikom čuvanja.");
    }
  };

  const clearAll = () => {
    setMeta({ name: "", url: "", comment: "", priority: "medium" });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Unos nove mete</h2>

      <input
        type="text"
        name="name"
        placeholder="Naziv mete"
        value={meta.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-black border border-gray-500"
      />

      <input
        type="text"
        name="url"
        placeholder="URL ili IP adresa"
        value={meta.url}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-black border border-gray-500"
      />

      <input
        type="text"
        name="comment"
        placeholder="Opis mete"
        value={meta.comment}
        onChange={handleChange}
        className="w-full p-2 mb-3 bg-black border border-gray-500"
      />

      <select
        name="priority"
        value={meta.priority}
        onChange={handleChange}
        className="w-full p-2 mb-4 bg-black border border-gray-500"
      >
        <option value="low">Nizak prioritet</option>
        <option value="medium">Srednji prioritet</option>
        <option value="high">Visok prioritet</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
        >
          Sačuvaj
        </button>

        <button
          onClick={clearAll}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Obriši sve
        </button>
      </div>
    </div>
  );
}
