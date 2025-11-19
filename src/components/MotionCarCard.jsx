import { motion } from 'framer-motion'

export default function MotionCarCard({ car, onSelect }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="group bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/40 shadow-lg shadow-blue-500/5"
    >
      {car.image && (
        <div className="aspect-video overflow-hidden">
          <motion.img
            src={`${car.image}&auto=format&fit=crop&w=800&q=60`}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          />
        </div>
      )}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">{car.make} {car.model}</h3>
          <span className="text-blue-300 text-sm">{car.year}</span>
        </div>
        <p className="text-blue-200/80 text-sm">
          {car.transmission} • {car.fuel} • {car.seats} miest
        </p>
        <div className="flex items-end justify-between pt-3">
          <div>
            <span className="text-white font-bold text-lg">€{car.price_per_day.toFixed(0)}</span>
            <span className="text-blue-200/70 text-xs ml-1">/ deň</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelect(car)}
            className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500"
          >
            Rezervovať
          </motion.button>
        </div>
      </div>
    </motion.div>
  )}
