import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="bg-black text-green-400 p-4">
      <p className="mb-2">Meni</p>
      <div className="space-x-2">
        <Link to="/">Dashboard</Link>
        <Link to="/skaniranje">Skeniranja</Link>
        <Link to="/izvestaji">Izveštaji</Link>
        <Link to="/meta">Meta</Link>
        <Link to="/podesavanja">Podešavanja</Link>
      </div>
    </nav>
  )
}

export default Sidebar
