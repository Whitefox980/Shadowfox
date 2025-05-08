import React, { useEffect, useState } from "react";
import axios from "@/api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/dashboard").then(res => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return <div className="p-6 text-white">Učitavanje...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-green-700 pb-2">ShadowFox Statistika</h1>

      <div className="grid grid-cols-2 gap-6 text-center text-lg">
        <div className="bg-gray-800 p-4 rounded shadow border border-green-700">
          <div className="text-4xl font-bold text-green-400">{data.targets}</div>
          <div>Mete u bazi</div>
        </div>

        <div className="bg-gray-800 p-4 rounded shadow border border-purple-700">
          <div className="text-4xl font-bold text-purple-400">{data.reports}</div>
          <div>PoC izveštaja</div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        Poslednji eksport: {data.last_export}
      </div>
    </div>
  );
}
