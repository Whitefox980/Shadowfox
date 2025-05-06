import React from 'react'

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-800 p-4 flex flex-col space-y-4">
      <div className="text-lg font-bold mb-2">Meni</div>
      <button className="text-left hover:text-green-400">Dashboard</button>
      <button className="text-left hover:text-green-400">Skeniranja</button>
      <button className="text-left hover:text-green-400">Izveštaji</button>
      <button className="text-left hover:text-green-400">Meta</button>
      <button className="text-left hover:text-green-400">Podešavanja</button>
    </aside>
  )
}

export default Sidebar
