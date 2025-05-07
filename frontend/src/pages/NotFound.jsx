import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Stranica nije pronađena</h1>
      <p className="mb-6">Izgleda da si zalutao u mrak matriksa.</p>
      <Link to="/" className="text-green-400 underline hover:text-green-300">
        Vrati se na početnu
      </Link>
    </div>
  );
}
