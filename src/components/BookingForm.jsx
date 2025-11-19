import { useState } from "react"

export default function BookingForm({ car, onClose, onBooked, baseUrl }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    if (!start || !end) return setError("Vyberte dátumy")

    const s = new Date(start)
    const eDate = new Date(end)
    const diff = Math.ceil((eDate - s) / (1000 * 60 * 60 * 24)) + 1
    if (diff > 31) return setError("Maximálna dĺžka prenájmu je 30 dní")

    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car_id: car.id,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          start_date: start,
          end_date: end,
        })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.detail || `Chyba ${res.status}`)
      }
      const data = await res.json()
      onBooked(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-20">
      <div className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-md p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Rezervácia – {car.make} {car.model}</h3>
        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Meno a priezvisko" className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-white/10 text-white placeholder:text-blue-200/60" />
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-white/10 text-white placeholder:text-blue-200/60" />
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Telefón (voliteľné)" className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-white/10 text-white placeholder:text-blue-200/60" />
            <input required type="date" value={start} onChange={e=>setStart(e.target.value)} className="px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
            <input required type="date" value={end} onChange={e=>setEnd(e.target.value)} className="px-3 py-2 rounded bg-slate-800 border border-white/10 text-white" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded border border-white/10 text-blue-100">Zavrieť</button>
            <button disabled={loading} className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{loading ? 'Odosielam…' : 'Potvrdiť rezerváciu'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
