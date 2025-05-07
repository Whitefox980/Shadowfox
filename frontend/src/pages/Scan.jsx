import React, { useState } from "react";
import PocForm from "../components/PocForm";

export default function Scan() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("basic");

  const handleScan = (e) => {
    e.preventDefault();
    alert(`Pokrećem ${scanType} skeniranje na: ${target}`);
    setTarget("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Automatski PoC Generator</h1>
      <PocForm />

      <div className="p-4 text-green-400 border-t border-green-700">
        <h2 className="text-xl font-bold mb-4">Skeniranje meta</h2>
        <form onSubmit={handleScan}>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Unesi cilj (npr. IP, domen)"
            className="bg-black border border-green-500 px-2 py-1 mr-2 text-white"
          />
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
            className="bg-black border border-green-500 px-2 py-1 mr-2 text-white"
          >
            <option value="basic">Osnovno</option>
            <option value="port">Port scan</option>
            <option value="vuln">Ranji scan</option>
          </select>
          <button
            type="submit"
            className="bg-green-700 text-black font-bold px-4 py-1"
          >
            Skeniraj
          </button>
        </form>
      </div>
    </div>
  );
}
