import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get("http://localhost:8000/reports");
      setResults(res.data);
    };
    fetchResults();
  }, []);

  return (
    <div className="p-4 text-green-300">
      <h2 className="text-xl font-bold mb-4">Pregled Izveštaja</h2>
      <table className="w-full text-left border border-green-600">
        <thead>
          <tr className="bg-green-900 text-black">
            <th className="px-2 py-1 border">Datum</th>
            <th className="px-2 py-1 border">Opis</th>
            <th className="px-2 py-1 border">Težina</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border-t border-green-700">
              <td className="px-2 py-1">{r.date}</td>
              <td className="px-2 py-1">{r.message}</td>
              <td className="px-2 py-1">{r.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
