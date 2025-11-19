import { Car, Calendar } from "lucide-react"

export default function Header({ onSeed, seeding, seeded }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <Car className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-white font-semibold tracking-tight">Rýchly Prenájom Áut</h1>
            <p className="text-xs text-blue-200/70">Do 30 dní • 25+ áut k dispozícii</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-blue-200/80 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Max 30 dní</span>
          </div>
          <button
            onClick={onSeed}
            disabled={seeding || seeded}
            className="text-sm px-3 py-2 rounded-md border border-blue-400/30 text-blue-100 hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Naplní ukážkové autá"
          >
            {seeded ? "Dáta pripravené" : seeding ? "Pripravujem…" : "Vložiť ukážkové dáta"}
          </button>
        </div>
      </div>
    </header>
  )
}
