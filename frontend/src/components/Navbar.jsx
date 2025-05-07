import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/meta", label: "Meta Unos" },
    { path: "/meta-list", label: "Meta Lista" },
    { path: "/history", label: "Scan History" },
    { path: "/reports", label: "PoC Izveštaji" },
    { path: "/stats", label: "Statistika" },
  ];

  return (
    <nav className="bg-black text-white px-4 py-3 border-b border-gray-800">
      <ul className="flex space-x-6 text-sm font-semibold">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`hover:text-green-400 pb-1 border-b-2 ${
                location.pathname === path ? "border-green-500" : "border-transparent"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
