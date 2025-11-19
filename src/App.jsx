import { useEffect, useState } from 'react'
import Header from './components/Header'
import MotionCarCard from './components/MotionCarCard'
import BookingForm from './components/BookingForm'
import AnimatedBackground from './components/AnimatedBackground'
import InsaneHero from './components/InsaneHero'
import { AnimatePresence, motion } from 'framer-motion'

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
    <div className="min-h-screen bg-slate-950 relative">
      <AnimatedBackground />
      <Header onSeed={seed} seeding={seeding} seeded={seeded} />

      <InsaneHero onSeed={seed} seeded={seeded} seeding={seeding} />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-white"
          >
            Vyberte si auto na krátkodobý prenájom
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-blue-200/80"
          >
            Maximálne na 30 dní. Ihneď k dispozícii.
          </motion.p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 bg-red-950/20 border border-red-400/20 p-4 rounded mb-6"
          >
            {error}
          </motion.div>
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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <MotionCarCard key={car.id} car={car} onSelect={setSelected} />
            ))}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BookingForm
              car={selected}
              baseUrl={baseUrl}
              onClose={() => setSelected(null)}
              onBooked={(id) => { setBookedId(id); setSelected(null); alert('Rezervácia potvrdená!'); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
