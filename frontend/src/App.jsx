
import React, { useState } from "react";
import axios from "axios";
import Meta from "./pages/Meta";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Meta from "./pages/Meta";
import MetaList from "./pages/MetaList";
import ScanHistory from "./pages/ScanHistory";
import Reports from "./pages/Reports";
import Stats from "./pages/Stats";
// ...
<Route path="/stats" element={<Stats />} />
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meta" element={<Meta />} />
        <Route path="/metas" element={<MetaList />} />
        <Route path="/history" element={<ScanHistory />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
function App() {
  const [h1Reports, setH1Reports] = useState([]);
  const [bugcrowdReports, setBugcrowdReports] = useState([]);

  const fetchH1 = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/h1-reports");
      setH1Reports(res.data.reports || []);
    } catch (error) {
      console.error("Greška kod H1:", error.message);
    }
  };

  const fetchBugcrowd = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bugcrowd-reports");
      setBugcrowdReports(res.data.reports || []);
    } catch (error) {
      console.error("Greška kod Bugcrowd:", error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Meta ciljevi</h1>
      <Meta />

      <h2 className="text-xl font-bold mt-8">Bug Bounty Testovi</h2>
      <button
        onClick={() =>
          axios
            .post("http://127.0.0.1:8000/run-scan", {
              tests: ["xss_poc", "ssrf_tester"], // ili dinamički kasnije
            })
            .then((res) => alert(res.data.output))
            .catch((err) => alert("Greška pri skeniranju: " + err.message))
        }
        className="bg-green-700 text-black px-3 py-1 mt-2"
      >
        Pokreni skeniranje
      </button>

      <h2 className="text-xl font-bold mt-8">Bug Bounty API</h2>
      <div className="flex gap-2 mt-2 mb-4">
        <button
          onClick={fetchH1}
          className="bg-blue-700 text-white px-3 py-1"
        >
          Učitaj HackerOne
        </button>
        <button
          onClick={fetchBugcrowd}
          className="bg-purple-700 text-white px-3 py-1"
        >
          Učitaj Bugcrowd
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">H1 Izveštaji:</h3>
        <ul className="list-disc list-inside text-green-300">
          {h1Reports.map((r, i) => (
            <li key={i}>{r.title || JSON.stringify(r)}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mt-4">Bugcrowd Izveštaji:</h3>
        <ul className="list-disc list-inside text-purple-300">
          {bugcrowdReports.map((r, i) => (
            <li key={i}>{r.title || JSON.stringify(r)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
