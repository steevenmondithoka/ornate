import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center mesh-bg px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <span className="px-4 py-1 rounded-full border border-amber-500/30 text-amber-500 text-[10px] uppercase tracking-[0.3em] mb-6 inline-block">
          The Grandest Fest of 2026
        </span>
        <h1 className="text-7xl md:text-[12rem] font-black leading-none tracking-tighter mb-4">
          OR<span className="text-gradient">NA</span>TE
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl font-light max-w-2xl mx-auto uppercase tracking-widest">
          Technology • Culture • Legacy
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          <button className="px-10 py-4 bg-amber-500 text-black font-black rounded-full hover:scale-105 transition shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            GET YOUR PASS
          </button>
          <button className="px-10 py-4 glass-card font-bold rounded-full hover:bg-white/10 transition">
            VIEW SCHEDULE
          </button>
        </div>
      </motion.div>
    </section>
  );
}