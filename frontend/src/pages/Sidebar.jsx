import React from 'react'
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-6 space-y-4 text-sm">
      <h1 className="text-xl font-bold mb-6">ShadowFox</h1>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:text-green-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/meta" className="hover:text-green-400">Meta Unos</Link>
        </li>
        <li>
          <Link to="/metalist" className="hover:text-green-400">Meta Lista</Link>
        </li>
        <li>
          <Link to="/scanhistory" className="hover:text-green-400">Scan History</Link>
        </li>
        <li>
          <Link to="/reports" className="hover:text-green-400">PoC Izveštaji</Link>
        </li>
        <li>
          <Link to="/stats" className="hover:text-green-400">Statistika</Link>
        </li>
        <li>
          <Link to="/scan" className="hover:text-green-400">Skener</Link>
        </li>
        <li>
          <Link to="/settings" className="hover:text-green-400">Podešavanja</Link>
        </li>
      </ul>
    </div>
  );
}
