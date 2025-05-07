import React, { useState } from "react";
import axios from "axios";

export default function Scan() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
        const response = await axios.post("http://127.0.0.1:8000/run-scan", {
        targets: ["http://example.com"],
        tests: ["xss_poc", "ssrf_tester"]
      });
      setResults(response.data.results || []);
    } catch (error) {
      console.error("Greška u skeniranju:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Skeniranje Meta</h1>
      <button onClick={handleScan} className="bg-blue-600 px-4 py-2 rounded">
        Pokreni skeniranje
      </button>

      {loading && <p className="mt-4 text-gray-300">Skeniranje u toku...</p>}

      <ul className="mt-6 space-y-3">
        {results.map((r, i) => (
          <li key={i} className="bg-gray-700 p-3 rounded">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
