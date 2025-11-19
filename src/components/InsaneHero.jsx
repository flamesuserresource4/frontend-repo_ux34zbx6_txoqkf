import { motion } from 'framer-motion'
import { Sparkles, Zap, Car } from 'lucide-react'

export default function InsaneHero({ onSeed, seeded, seeding }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute -inset-20 opacity-30"
          animate={{
            background: [
              'radial-gradient(600px 200px at 10% 10%, rgba(56,189,248,0.25), transparent 60%)',
              'radial-gradient(700px 260px at 80% 30%, rgba(147,51,234,0.25), transparent 60%)',
              'radial-gradient(600px 200px at 50% 80%, rgba(59,130,246,0.25), transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            >
              Prenájom áut, ktorý vyzerá neskutočne dobre
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-3 text-blue-200/90"
            >
              Vyberte si z nášho flotilového katalógu a zažite hladké rezervácie s animáciami, ktoré krútia hlavami.
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeed}
                disabled={seeding || seeded}
                className="relative overflow-hidden px-4 py-2 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white border border-white/10 disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {seeded ? 'Dáta pripravené' : seeding ? 'Pripravujem…' : 'Vložiť ukážkové dáta'}
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-blue-200/80"
              >
                <Zap className="w-4 h-4" />
                <span>Max 30 dní</span>
              </motion.div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ rotate: -8, y: 20, opacity: 0 }}
              animate={{ rotate: [-8, 6, -4, 4, 0], y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 shadow-2xl"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1600&auto=format&fit=crop"
                  alt="Car"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: [1.1, 1.02, 1.08, 1] }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"
                  animate={{ opacity: [0.5, 0.3, 0.45, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4" />
                    <span>25+ vozidiel</span>
                  </div>
                  <span className="text-blue-200/90 text-sm">Rezervácia za 30s</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
