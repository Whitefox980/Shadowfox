import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MetaList() {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/targets");
    setTargets(res.data.data);
  };

  const obrisi = async (id) => {
    if (!confirm("Obrisati ovu metu?")) return;
    await axios.delete(`/api/targets/${id}`);
    fetchTargets();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-green-700 pb-2">Unete mete</h1>

      {targets.length === 0 ? (
        <p className="text-gray-400">Nema sačuvanih meta.</p>
      ) : (
        <ul className="space-y-4">
          {targets.map(t => (
            <li key={t[0]} className="bg-gray-800 p-4 rounded border border-gray-600 text-sm">
              <div><strong>Naziv:</strong> {t[1]}</div>
              <div><strong>URL:</strong> {t[2]}</div>
              <div><strong>Komentar:</strong> {t[3]}</div>
              <div><strong>Prioritet:</strong> {t[4]}</div>
              <div className="text-xs text-gray-400">{t[5]}</div>
              <button
                onClick={() => obrisi(t[0])}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
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
