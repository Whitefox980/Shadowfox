import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Scan() {
  const [targets, setTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState("");

  useEffect(() => {
    axios.get("/targets")
      .then(res => setTargets(res.data))
      .catch(() => alert("Greška pri učitavanju meta."));
  }, []);

  const scanners = [
    { id: "xss_poc", name: "XSS PoC", desc: "Testira XSS ranjivosti" },
    { id: "ssrf_tester", name: "SSRF Tester", desc: "Detektuje SSRF" },
    { id: "subdomain_enum", name: "Subdomain Finder", desc: "Traži subdomene" },
    { id: "sql_injection", name: "SQL Injection", desc: "Pokušaj SQL upita" },
    { id: "lfi_scanner", name: "LFI Scanner", desc: "Local File Inclusion test" },
    { id: "idor_checker", name: "IDOR Checker", desc: "Testira IDOR ranjivosti" },
    { id: "command_injection", name: "CMD Injection", desc: "Komandna injekcija" },
    { id: "port_scan", name: "Port Scanner", desc: "Skener portova" },
    { id: "vuln_radar", name: "Vuln Radar", desc: "Opšti skener propusta" }
  ];

  const handleScan = async () => {
    if (!selectedTarget || selectedTests.length === 0) {
      alert("Izaberite metu i testove za skeniranje.");
      return;
    }

    setProgress(10);

    try {
      const res = await axios.post("/run-scan", {
        target_id: selectedTarget,
        tests: selectedTests
      });

      setProgress(100);
      setReport(res.data.output || "Nema rezultata.");
    } catch {
      alert("Greška pri slanju skeniranja.");
      setProgress(0);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Izaberi metu za skeniranje</h2>
      {targets.map(t => (
        <label key={t.id} className="block mb-2">
          <input
            type="radio"
            name="target"
            value={t.id}
            onChange={() => setSelectedTarget(t.id)}
            className="mr-2"
          />
          <span className="font-semibold text-green-400">{t.comment}</span>
          <span className="ml-2 text-sm text-gray-400">{t.url}</span>
        </label>
      ))}

      <h2 className="mt-6 text-xl font-bold">Alati za skeniranje</h2>
      {scanners.map(tool => (
        <label key={tool.id} className="block font-semibold">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() =>
              setSelectedTests(prev =>
                prev.includes(tool.id)
                  ? prev.filter(t => t !== tool.id)
                  : [...prev, tool.id]
              )
            }
          />
          {tool.name}: <span className="font-normal">{tool.desc}</span>
        </label>
      ))}

      <button
        onClick={handleScan}
        className="mt-4 bg-green-600 px-4 py-2 rounded shadow"
      >
        Pokreni skeniranje
      </button>

      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2">Progres: {progress}%</p>
        </div>
      )}

      {report && (
        <div className="mt-6 bg-black p-4 border border-green-600">
          <h3 className="font-bold mb-2">Izveštaj</h3>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}
