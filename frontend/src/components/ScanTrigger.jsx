import axios from "@/api/axios";
import { useState } from 'react';

const availableTests = [
  'sql_injection',
  'xss_poc',
  'lfi_scanner',
  'command_injection',
  'idor_checker',
];

export default function ScanTrigger() {
  const [target, setTarget] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [status, setStatus] = useState('');

  const toggleTest = (test) => {
    setSelectedTests(prev =>
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const handleScan = async () => {
    if (!target || selectedTests.length === 0) {
      return setStatus('Unesite metu i izaberite bar jedan test.');
    }

    try {
      setStatus('Pokrećem skeniranje...');
      const res = await axios.post('http://127.0.0.1:8000/api/run-scan', {
        targets: [target],
        tests: selectedTests
      });
      setStatus(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setStatus('Greška: ' + err.message);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl mb-2">ShadowFox Skeniranje</h2>

      <input
        type="text"
        placeholder="Unesite metu (npr. http://example.com)"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-700"
      />

      <div className="mb-4">
        <p className="mb-1">Izaberite testove:</p>
        {availableTests.map((test) => (
          <label key={test} className="block">
            <input
              type="checkbox"
              checked={selectedTests.includes(test)}
              onChange={() => toggleTest(test)}
              className="mr-2"
            />
            {test}
          </label>
        ))}
      </div>

      <button
        onClick={handleScan}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full"
      >
        Pokreni skeniranje
      </button>

      <pre className="mt-4 text-sm bg-black p-2 rounded max-h-64 overflow-y-auto">
        {status}
      </pre>
    </div>
  );
}
