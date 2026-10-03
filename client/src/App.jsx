import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import Inventory from './components/Inventory/Inventory'

function App() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr] text-stone-950 bg-stone-100 min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reservations" element={<Placeholder title="Reservations" />} />
        <Route path="/inquiries" element={<Placeholder title="Inquiries" />} />
        <Route path="/customers" element={<Placeholder title="Customers" />} />
      </Routes>
    </main>
  )
}

function Placeholder({ title }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow min-h-[calc(100vh-2rem)]">
      <h1 className="text-xl font-semibold text-stone-900">{title}</h1>
    </div>
  )
}

export default App
