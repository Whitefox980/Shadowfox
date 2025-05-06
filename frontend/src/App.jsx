import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Scan from './pages/Scan'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Meta from './pages/Meta'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skaniranje" element={<Scan />} />
        <Route path="/izvestaji" element={<Reports />} />
        <Route path="/meta" element={<Meta />} />
        <Route path="/podesavanja" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
