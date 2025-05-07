import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ScanHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/poc-history").then(res => {
      setHistory(res.data.data);
    });
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-purple-700 pb-2">Istorija Skeniranja</h1>

      {history.length === 0 ? (
        <p className="text-gray-400">Nema PoC izveštaja.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((r, i) => (
            <li key={r[0]} className="bg-gray-800 p-4 rounded border border-green-700 text-sm whitespace-pre-wrap">
              <div className="text-gray-400 text-xs">#{r[0]} | {r[5]}</div>
              <div><strong>Meta:</strong> {r[1]}</div>
              <div><strong>Test:</strong> {r[2]}</div>
              <div><strong>Payload:</strong> {r[3]}</div>
              <div><strong>Rezultat:</strong> {r[4]}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
