import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://127.0.0.1:8000/api/scan-history')
        .then(res => {
          setHistory(res.data.history || []);
          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch(() => setHistory([]));
    };

    fetchData(); // initial load
    const interval = setInterval(fetchData, 20000); // auto refresh

    return () => clearInterval(interval);
  }, []);

  const clearHistory = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/scan-history/clear');
      alert('Istorija obrisana.');
      setHistory([]);
    } catch (err) {
      alert('Došlo je do greške pri brisanju.');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-xl mb-4">Istorija Skeniranja</h2>

      <div className="mb-4">
        <button
          onClick={clearHistory}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Obriši istoriju
        </button>
        {lastUpdated && (
          <p className="text-sm text-gray-400 mt-2">
            Poslednje osveženo: {lastUpdated}
          </p>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-400">Nema rezultata.</p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {history.map((entry, idx) => (
            <div key={idx} className="border border-gray-700 p-4 rounded bg-gray-800">
              <p className="text-sm text-gray-400">Vreme: {entry.timestamp}</p>
              <p className="text-sm text-gray-400">Meta: {entry.targets.join(', ')}</p>
              <p className="text-sm text-gray-400">Testovi: {entry.tests.join(', ')}</p>
              <div className="mt-2 space-y-2">
                {entry.results.map((r, i) => (
                  <div key={i} className="p-2 bg-black rounded">
                    <p><b>Test:</b> {r.test}</p>
                    <p><b>Rezultat:</b> {r.result}</p>
                    <p><b>Payload:</b> {r.payload}</p>
                    <p><b>Beleška:</b> {r.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
