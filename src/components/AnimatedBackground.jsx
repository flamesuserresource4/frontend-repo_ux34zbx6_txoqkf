import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const blobs = [
    { size: 420, color: 'from-blue-600/40 to-cyan-400/30', x: -30, y: -20, delay: 0 },
    { size: 360, color: 'from-indigo-600/30 to-fuchsia-500/20', x: 40, y: 10, delay: 4 },
    { size: 520, color: 'from-sky-500/20 to-teal-400/20', x: -10, y: 50, delay: 2 },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [0.9, 1.05, 0.95, 1] }}
          transition={{ duration: 3, delay: b.delay, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            filter: 'blur(60px)',
          }}
        >
          <motion.div
            className={`bg-gradient-to-br ${b.color} rounded-full`}
            style={{ width: b.size, height: b.size }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -20, 30, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}

      {/* Scanline shimmer */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent"
        animate={{ y: ['-30%', '120%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}
