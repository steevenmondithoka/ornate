import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ Days: "00", Hours: "00", Mins: "00", Secs: "00" });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date("2026-03-28") - +new Date();
      setTimeLeft({
        Days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        Hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        Mins: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0'),
        Secs: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-10 justify-center">
        
      {Object.entries(timeLeft).map(([label, value], i) => (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          key={label} 
          className="flex flex-col items-center"
        >
          <div className="glass-morphism w-20 h-24 md:w-28 md:h-32 rounded-3xl flex items-center justify-center text-4xl md:text-6xl font-black text-violet-400 border-t-2 border-violet-500/50">
            {value}
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest mt-4 text-violet-500/80">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}