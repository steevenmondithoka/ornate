import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_DATE = new Date("March 28, 2026 00:00:00").getTime();

function getTimeRemaining() {
  const now = new Date().getTime();
  const difference = EVENT_DATE - now;
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: false,
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds, finished } = timeLeft;

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-600/20 blur-[120px] rounded-full" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-violet-500" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-violet-300/60 font-medium">
              The Grand Celebration Begins In
            </p>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-violet-500" />
          </motion.div>

          {finished ? (
            <div className="py-10 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse">
                THE FEST IS LIVE
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
              <TimeBlock value={days} label="Days" color="text-violet-400" />
              <TimeBlock value={hours} label="Hours" color="text-fuchsia-400" />
              <TimeBlock value={minutes} label="Mins" color="text-purple-400" />
              <TimeBlock value={seconds} label="Secs" color="text-pink-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label, color }) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="group relative">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col items-center justify-center p-4 md:p-8 rounded-[1.8rem] bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold tabular-nums tracking-tighter ${color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
        
        <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">
          {label}
        </span>
      </div>
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/20 rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}