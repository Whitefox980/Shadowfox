import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Meta from "./pages/Meta";
import MetaList from "./pages/MetaList";
import Reports from "./pages/Reports";
import Scan from "./pages/Scan";
import ScanHistory from "./pages/ScanHistory";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import ScanTrigger from './components/ScanTrigger';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-white text-2xl">ShadowFox Skeniranje</h1>
      <ScanTrigger />
    </div>
  );
}

export default function App() {
  const [h1Reports, setH1Reports] = useState([]);
  const [bugcrowdReports, setBugcrowdReports] = useState([]);

  const fetchH1 = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/h1-reports");
      if (!res.data || !res.data.reports) throw new Error("Prazan odgovor");
      setH1Reports(res.data.reports || []);
    } catch (error) {
      console.error("Greška kod H1:", error.message);
    }
  };

  const fetchBugcrowd = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bugcrowd-reports");
      if (!res.data || !res.data.reports) throw new Error("Prazan odgovor");
      setBugcrowdReports(res.data.reports || []);
    } catch (error) {
      console.error("Greška kod Bugcrowd:", error.message);
    }
  };

  const handleScan = async () => {
    try {
      const res = await axios.post("/run-scan", {
        tests: ["xss_poc", "ssrf_tester"],
      });
      alert("Skeniranje gotovo: \n" + res.data.output);
    } catch (err) {
      alert("Greška pri skeniranju: " + err.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="p-6 text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/meta-list" element={<MetaList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/scanhistory" element={<ScanHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <h2 className="text-xl font-bold mb-4">Bug Bounty Testovi</h2>
        <button
          onClick={handleScan}
          className="bg-green-700 text-black px-3 py-1 mb-4"
        >
          Pokreni skeniranje
        </button>

        <h2 className="text-xl font-bold mb-4">Bug Bounty API</h2>
        <button
          onClick={fetchH1}
          className="bg-blue-700 text-white px-3 py-1 mr-2"
        >
          Učitaj HackerOne
        </button>
        <button
          onClick={fetchBugcrowd}
          className="bg-purple-700 text-white px-3 py-1"
        >
          Učitaj Bugcrowd
        </button>

        <h3 className="mt-4 font-bold">H1 Izveštaji:</h3>
        <ul>
          {h1Reports.map((r, i) => (
            <li key={i}>{JSON.stringify(r)}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-bold">Bugcrowd Izveštaji:</h3>
        <ul>
          {bugcrowdReports.map((r, i) => (
            <li key={i}>{JSON.stringify(r)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
