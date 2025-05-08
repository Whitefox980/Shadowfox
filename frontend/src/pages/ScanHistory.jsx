import React, { useEffect, useState } from 'react';
import axios from "@/api/axios";

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/scan-history');
        setHistory(res.data.history || []);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Greška pri učitavanju istorije:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  const clearHistory = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/scan-history/clear');
      alert('Istorija obrisana.');
      setHistory([]);
    } catch (err) {
      alert('Došlo je do greške pri brisanju istorije.');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded max-w-3xl mx-auto mt-10">
      <h2 className="text-xl mb-4">Istorija Skeniranja</h2>
      <button
        onClick={clearHistory}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-4"
      >
        Obriši istoriju
      </button>
      {lastUpdated && (
        <p className="text-sm text-gray-400 mt-2">
          Poslednje osveženo: {lastUpdated}
        </p>
      )}

      {history.length === 0 ? (
        <p className="text-gray-400 mt-4">Nema rezultata.</p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto mt-4">
          {history.map((entry, idx) => (
            <div key={idx} className="border border-gray-700 p-4 rounded bg-gray-800">
              <p className="text-sm text-gray-400">Vreme: {entry.timestamp}</p>
              <p className="text-sm text-gray-400">
                Meta: {Array.isArray(entry.targets) ? entry.targets.join(', ') : entry.targets}
              </p>
              <p className="text-sm text-gray-400">
                Testovi: {Array.isArray(entry.tests) ? entry.tests.join(', ') : entry.tests}
              </p>
              <div className="mt-2 space-y-1">
                {entry.payload && (
                  <p className="p-2 bg-black rounded text-sm">
                    <b>Payload:</b> {entry.payload}
                  </p>
                )}
                {entry.notes && (
                  <p className="p-2 bg-black rounded text-sm">
                    <b>Beleška:</b> {entry.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
