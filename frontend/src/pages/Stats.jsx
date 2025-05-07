import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export default function Stats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
      fetch("http://127.0.0.1:8000/api/poc-list")
      .then((res) => res.json())
      .then((data) => {
        const counts = {};
        data.data.forEach(([vuln, count]) => {
          counts[vuln] = count;
        });
        setStats(counts);
      })
      .catch((err) => console.error("Greška u statistici:", err));
  }, []);

  const labels = Object.keys(stats);
  const values = Object.values(stats);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Broj PoC unosa",
        data: values,
        backgroundColor: "rgba(34,197,94,0.7)"
      }
    ]
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Statistika PoC unosa</h1>
      {labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>Učitavanje...</p>
      )}
    </div>
  );
}
