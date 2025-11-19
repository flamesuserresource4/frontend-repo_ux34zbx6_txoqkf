import { useEffect, useState } from 'react'
import Header from './components/Header'
import CarCard from './components/CarCard'
import BookingForm from './components/BookingForm'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [seeded, setSeeded] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [bookedId, setBookedId] = useState('')

  const fetchCars = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/cars`)
      if (!res.ok) throw new Error('Nepodarilo sa načítať autá')
      const data = await res.json()
      setCars(data)
      setSeeded(data.length > 0)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const seed = async () => {
    try {
      setSeeding(true)
      await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      await fetchCars()
    } finally {
      setSeeding(false)
    }
  }

  useEffect(() => { fetchCars() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Header onSeed={seed} seeding={seeding} seeded={seeded} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">Vyberte si auto na krátkodobý prenájom</h2>
          <p className="text-blue-200/80">Maximálne na 30 dní. Ihneď k dispozícii.</p>
        </div>

        {error && (
          <div className="text-red-400 bg-red-950/20 border border-red-400/20 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-800/40 rounded-xl border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-blue-200/80">
            Zatiaľ nemáme žiadne autá. Vložte ukážkové dáta pre rýchly štart.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard key={car.id} car={car} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      {selected && (
        <BookingForm
          car={selected}
          baseUrl={baseUrl}
          onClose={() => setSelected(null)}
          onBooked={(id) => { setBookedId(id); setSelected(null); alert('Rezervácia potvrdená!'); }}
        />
      )}
    </div>
  )
}

export default App
