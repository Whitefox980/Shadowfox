import { useState } from "react";

export default function PocForm() {
  const [form, setForm] = useState({
    target: "",
    vulnerability: "SQL Injection",
    payload: "",
    notes: "",
  });
  const [report, setReport] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePoC = async () => {
    const res = await fetch("/api/generate-poc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setReport(data.report);
  };

  return (
    <div className="p-4 bg-black text-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Generate PoC</h2>
      <input name="target" onChange={handleChange} value={form.target} className="w-full p-2 bg-gray-800 rounded" placeholder="Target URL" />
      <select name="vulnerability" onChange={handleChange} value={form.vulnerability} className="w-full p-2 bg-gray-800 rounded">
        <option>SQL Injection</option>
        <option>XSS</option>
        <option>LFI</option>
        <option>IDOR</option>
        <option>Command Injection</option>
      </select>
      <input name="payload" onChange={handleChange} value={form.payload} className="w-full p-2 bg-gray-800 rounded" placeholder="Payload" />
      <textarea name="notes" onChange={handleChange} value={form.notes} className="w-full p-2 bg-gray-800 rounded" placeholder="What did you observe?" />
      <button onClick={generatePoC} className="bg-green-500 px-4 py-2 rounded">Generate</button>
      {report && (
        <div className="mt-4 bg-gray-900 p-2 rounded border border-green-500">
          <h3 className="font-semibold mb-2">Generated PoC:</h3>
          <pre>{report}</pre>
          <button
  className="mt-2 bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
  onClick={() => navigator.clipboard.writeText(report)}
>
  Copy to Clipboard
</button>
        <button
  className="mt-2 ml-2 bg-blue-700 px-3 py-1 rounded hover:bg-blue-600"
  onClick={() => {
    const existing = JSON.parse(localStorage.getItem("pocReports") || "[]");
    existing.push(report);
    localStorage.setItem("pocReports", JSON.stringify(existing));
    alert("PoC dodat u izveštaj!");
  }}
>
  Dodaj u izveštaj
</button>
        </div>
      )}
    </div>
  );
}
