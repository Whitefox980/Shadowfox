import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ScanHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/poc-list")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data.data)) {
          setHistory(data.data);
        } else {
          console.error("Scan history nije niz:", data);
          setHistory([]);
        }
      })
.catch((err) => {
  console.error("Greška u istoriji skeniranja:", err.response?.data || err.message);
  setHistory([]);
});}, []);
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Scan History</h1>
      {history.length === 0 ? (
        <p className="text-gray-400">Nema skeniranja još uvek.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((h, i) => (
            <li key={i} className="bg-gray-800 p-3 rounded border border-blue-600">
              <div><strong>Mete:</strong> {h.targets?.join(", ")}</div>
              <div><strong>Testovi:</strong> {h.tests?.join(", ")}</div>
              <div><strong>Rezultati:</strong></div>
              <ul className="ml-4 list-disc text-sm">
                {h.results?.map((r, j) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
              <div className="text-xs text-gray-400">{h.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
