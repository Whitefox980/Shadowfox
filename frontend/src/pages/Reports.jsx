import React, { useEffect, useState } from "react";

export default function Reports() {
  const [reports, setReports] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/poc-list")
    .then(res => res.json())
    .then(data => setReports(data.data || []))
    .catch(err => {
      console.error("Greška u izveštajima:", err);
      setReports([]);
    });
}, []);
  const obrisiSve = async () => {
    if (!confirm("Da li ste sigurni da želite da obrišete sve izveštaje?")) return;
    try {
      await fetch("/api/poc-clear", { method: "DELETE" });
      setReports([]);
    } catch (err) {
      console.error("Greška pri brisanju:", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">PoC izveštaji iz baze</h1>

      <div className="mb-4 flex space-x-4">
        <button
          onClick={obrisiSve}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Obriši sve izveštaje
        </button>

        <a
          href="/api/poc-export"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Eksportuj kao PDF
        </a>
      </div>

      {reports.length === 0 ? (
        <p className="text-gray-400">Nema unosa.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((r) => (
            <li key={r[0]} className="bg-gray-800 p-3 rounded border border-green-600 whitespace-pre-wrap">
              <div className="text-sm text-gray-400">#{r[0]} | {r[5]}</div>
              <div><strong>Target:</strong> {r[1]}</div>
              <div><strong>Vulnerability:</strong> {r[2]}</div>
              <div><strong>Payload:</strong> {r[3]}</div>
              <div><strong>Result:</strong> {r[4]}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
