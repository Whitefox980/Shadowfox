import React from "react";

function Reports() {
  const dummyReports = [
    { id: 1, name: "Scan 01", status: "Završeno", date: "2025-05-06" },
    { id: 2, name: "Scan 02", status: "U toku", date: "2025-05-06" },
  ];

  return (
    <div className="p-4 text-green-400">
      <h2 className="text-xl font-bold mb-4">Izveštaji o skeniranjima</h2>
      <ul className="space-y-2">
        {dummyReports.map((report) => (
          <li key={report.id} className="bg-black border border-green-600 p-2">
            <strong>{report.name}</strong> – {report.status} ({report.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
