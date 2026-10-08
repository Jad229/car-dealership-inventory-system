import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import Inventory from './components/Inventory/Inventory'
import Reservations from './components/Reservations/Reservations'
import Inquiries from './components/Inquiries/Inquiries'
import Customers from './components/Customers/Customers'
import Sales from './components/Sales/Sales'

function App() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr] text-stone-950 bg-stone-100 min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </main>
  )
}

export default App
