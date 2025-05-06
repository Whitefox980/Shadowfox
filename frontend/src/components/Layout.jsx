import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-900 p-4 text-white overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
