// CosmicShowcase.jsx
import { motion } from 'framer-motion';
import { Music2, Mic2 } from 'lucide-react';

export default function CosmicShowCase() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* glow behind whole structure */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-500/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/25 blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SINGING SIDE – vertical cosmic waveform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-5 overflow-hidden border border-violet-500/40"
        >
          {/* animated vertical bars like sound waves */}
          <div className="flex items-end justify-between h-40 mb-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[6px] rounded-full bg-gradient-to-t from-violet-600 via-purple-400 to-sky-300"
                animate={{ height: ['30%', '95%', '40%'] }}
                transition={{
                  duration: 2 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          {/* cosmic mic icon */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-violet-300">
                Singing Arena
              </p>
              <p className="text-white font-semibold text-lg">
                Celestial Vocals
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-600/30 border border-violet-300/40">
              <Mic2 size={18} className="text-violet-100" />
            </div>
          </div>

          {/* floating notes */}
          <motion.div
            className="absolute -top-4 right-6 text-violet-200/70"
            animate={{ y: [0, -8, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Music2 size={28} />
          </motion.div>
        </motion.div>

        {/* DANCING SIDE – orbital path / steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative glass-card rounded-3xl p-5 overflow-hidden border border-fuchsia-500/40"
        >
          {/* spiral orbit path */}
          <div className="relative h-40 mb-4 flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full border border-fuchsia-500/40" />
            <div className="absolute w-24 h-24 rounded-full border border-purple-400/40" />
            <div className="absolute w-16 h-16 rounded-full border border-sky-400/50" />

            {/* dancing “particle” moving along orbit */}
            <motion.div
              className="w-3 h-3 rounded-full bg-fuchsia-400 shadow-[0_0_15px_rgba(244,114,182,0.8)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '60px 0px' }}
            />

            {/* extra random steps */}
            <motion.div
              className="absolute -bottom-2 left-4 w-2 h-2 rounded-full bg-purple-300"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-3 right-6 w-2 h-2 rounded-full bg-sky-300"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-300">
                Dance Arena
              </p>
              <p className="text-white font-semibold text-lg">
                Orbital Grooves
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-fuchsia-600/30 border border-fuchsia-300/40">
              <Music2 size={18} className="text-fuchsia-100" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
