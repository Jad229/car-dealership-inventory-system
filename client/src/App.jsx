import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr] text-stone-950 bg-stone-100 min-h-screen">
      <Sidebar />
      <Dashboard />
    </main>
  )
}

export default App
