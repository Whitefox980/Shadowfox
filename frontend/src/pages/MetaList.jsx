import React, { useState } from "react";
import axios from "@/api/axios";

const scanners = [
  { id: "xss_poc", name: "XSS Proof of Concept", description: "Testiranje XSS ranjivosti" },
  { id: "ssrf_tester", name: "SSRF Tester", description: "Detekcija server-side request forgery" },
  { id: "sql_injection", name: "SQL Injection", description: "Ubacivanje SQL upita kroz parametre" },
  { id: "idor_checker", name: "IDOR Checker", description: "Insecure Direct Object Reference detektor" },
  { id: "port_scan", name: "Port Scanner", description: "Skener otvorenih portova" },
];

export default function MetaList() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleScan = async () => {
    try {
      const res = await axios.post("/run-scan", { tests: selected });
      alert("Skener pokrenut:\n" + res.data.output);
    } catch (err) {
      alert("Greška: " + err.message);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl mb-4">Lista alata (skenera)</h1>
      {scanners.map((s) => (
        <div key={s.id} className="mb-2">
          <label>
            <input
              type="checkbox"
              checked={selected.includes(s.id)}
              onChange={() => toggle(s.id)}
              className="mr-2"
            />
            <strong>{s.name}</strong> — <span className="text-sm">{s.description}</span>
          </label>
        </div>
      ))}
      <button onClick={handleScan} className="mt-4 bg-green-600 px-4 py-2 rounded">
        Pokreni izabrane alate
      </button>
    </div>
  );
}
