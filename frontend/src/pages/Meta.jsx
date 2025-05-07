import React, { useState } from "react";
import axios from "axios";

const availableTests = ["xss_poc", "ssrf_tester", "subdomain_enum"];

export default function Meta() {
  const [targetInput, setTargetInput] = useState("");
  const [targets, setTargets] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  const handleAddTarget = () => {
    const newTargets = targetInput.split(",").map(t => t.trim()).filter(t => t);
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
      const res = await axios.post("http://localhost:8000/run-scan", {
        targets,
        tests: selectedTests
      });
      console.log("Rezultat:", res.data);
      alert("Skeniranje završeno!");
    } catch (err) {
      console.error("Greška:", err);
      alert("Greška prilikom skeniranja!");
    }
  };

  return (
    <div className="p-4">
      <h1>Meta ciljevi</h1>
      <input
        type="text"
        value={targetInput}
        onChange={(e) => setTargetInput(e.target.value)}
        placeholder="Unesi meta URL ili IP"
      />
      <button onClick={handleAddTarget}>Dodaj</button>

      <h2 className="mt-4">Bug Bounty Testovi</h2>
      {availableTests.map(test => (
        <label key={test} style={{ marginRight: 10 }}>
          <input
            type="checkbox"
            checked={selectedTests.includes(test)}
            onChange={() => handleCheckboxChange(test)}
          />
          {test}
        </label>
      ))}

      <div className="mt-4">
        <button onClick={handleScan}>Pokreni skeniranje</button>
      </div>
    </div>
  );
}
