import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MetaList() {
  const [targets, setTargets] = useState([]);

  const fetchTargets = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/targets");
      setTargets(res.data.data);
    } catch (err) {
      alert("Greška pri učitavanju meta.");
      console.error(err);
    }
  };

  const obrisi = async (id) => {
    if (!confirm("Obrisati ovu metu?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/targets/${id}`);
      fetchTargets();
    } catch (err) {
      alert("Greška pri brisanju.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Unete mete</h1>
      {targets.length === 0 ? (
        <p className="text-gray-400">Nema sačuvanih meta.</p>
      ) : (
        <ul className="space-y-4">
          {targets.map((t) => (
            <li key={t[0]} className="bg-gray-800 p-4 rounded border border-gray-600">
              <div><strong>Naziv:</strong> {t[1]}</div>
              <div><strong>URL:</strong> {t[2]}</div>
              <div><strong>Komentar:</strong> {t[3]}</div>
              <div><strong>Prioritet:</strong> {t[4]}</div>
              <div className="text-xs text-gray-400">{t[5]}</div>
              <button
                onClick={() => obrisi(t[0])}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
