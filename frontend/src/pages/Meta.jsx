import React, { useState } from "react";
import axios from "@/api/axios";

const availableTests = [
  "xss_poc",
  "ssrf_tester",
  "subdomain_enum",
  "sql_injection",
  "lfi_scanner",
  "idor_checker",
  "command_injection",
  "port_scan",
  "vuln_radar"
];

export default function Meta() {
  const [targetInput, setTargetInput] = useState("");
  const [targets, setTargets] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [scanStatus, setScanStatus] = useState("");
  const [scanResults, setScanResults] = useState([]);

  const handleAddTarget = () => {
    const newTargets = targetInput
      .split(",")
      .map(t => t.trim())
      .filter(t => t);
    setTargets([...targets, ...newTargets]);
    setTargetInput("");
  };

  const handleCheckboxChange = (test) => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter(t => t !== test));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleScan = async () => {
    try {
      setScanStatus("Skeniranje u toku...");
      setScanResults([]);
      const res = await axios.post("http://localhost:8000/run-scan", {
        targets,
        tests: selectedTests,
      });
      setScanResults(res.data.results || []);
      setScanStatus("Skeniranje završeno!");
    } catch (err) {
      console.error("Greška:", err);
      setScanStatus("Greška prilikom skeniranja!");
      setScanResults([]);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b border-green-700 pb-2">
        Meta ciljevi
      </h1>

      {/* Unos meta */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dodaj ciljeve</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="Unesi mete (URL ili IP), razdvojene zarezom"
            className="flex-grow bg-gray-800 p-2 rounded"
          />
          <button
            onClick={handleAddTarget}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Dodaj
          </button>
        </div>

        {targets.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Unete mete:</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {targets.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-700" />

      {/* Izbor testova */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Bug Bounty Testovi</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {availableTests.map(test => (
            <label key={test} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTests.includes(test)}
                onChange={() => handleCheckboxChange(test)}
                className="mr-2"
              />
              {test}
            </label>
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      {/* Dugme i status */}
      <div className="mb-6">
        <button
          onClick={handleScan}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold"
        >
          Pokreni skeniranje
        </button>

        {scanStatus && (
          <p className="mt-4 text-sm font-semibold text-yellow-400">
            {scanStatus}
          </p>
        )}
      </div>

      {/* Rezultati skeniranja */}
      {scanResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2 text-green-400">Rezultati:</h2>
          <ul className="space-y-3">
            {scanResults.map((r, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded border border-green-600 text-sm whitespace-pre-wrap">
                <div><strong>Meta:</strong> {r[0]}</div>
                <div><strong>Test:</strong> {r[1]}</div>
                <div><strong>Rezultat:</strong> {r[2]}</div>
              </li>
            ))}
          </ul>

<div className="mt-6">
  <a
    href="/api/poc-export"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-white font-semibold"
  >
    Eksportuj rezultate kao PDF
  </a>
</div>

        </div>
      )}
    </div>
  );
}
