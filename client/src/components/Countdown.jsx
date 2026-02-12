// src/components/Countdown.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                    */
/* -------------------------------------------------------------------------- */

const EVENT_DATE = new Date("March 28, 2026 00:00:00").getTime();

function getTimeRemaining() {
  const now = new Date().getTime();
  const difference = EVENT_DATE - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: false,
  };
}

/* -------------------------------------------------------------------------- */
/*  MAIN COUNTDOWN                                                            */
/* -------------------------------------------------------------------------- */

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const { days, hours, minutes, seconds, finished } = timeLeft;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] group bg-black/40">
      {/* Animated glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-80 h-80 bg-violet-500/30 blur-[110px] rounded-full"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-40px] right-[-40px] w-96 h-96 bg-purple-500/25 blur-[140px] rounded-full"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1.05, 1.17, 1.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 px-6 py-10 md:px-12 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-[10px] md:text-xs uppercase tracking-[0.35em] text-violet-300/80 text-center md:text-left"
        >
          Until Ornate 2K26 begins
        </motion.p>

        {finished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center py-10"
          >
            <span className="text-xl md:text-3xl font-semibold tracking-[0.3em] uppercase text-violet-200">
              Event Started
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8"
          >
            <TimeBlock
              value={days}
              label="Days"
              accent="from-violet-400 to-purple-400"
            />
            <TimeBlock
              value={hours}
              label="Hours"
              accent="from-purple-400 to-pink-400"
            />
            <TimeBlock
              value={minutes}
              label="Minutes"
              accent="from-blue-400 to-violet-400"
            />
            <TimeBlock
              value={seconds}
              label="Seconds"
              accent="from-amber-400 to-rose-400"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TIME BLOCK                                                                */
/* -------------------------------------------------------------------------- */

function TimeBlock({ value, label, accent }) {
  const padded = String(value).padStart(2, "0");

  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -2 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="relative backdrop-blur-2xl bg-black/30 border border-white/15 rounded-3xl p-5 md:p-7 text-center shadow-xl overflow-hidden"
    >
      {/* animated gradient border sweep */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
      <motion.div
        className={`pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${accent} opacity-0 blur-xl`}
        animate={{ opacity: [0.1, 0.35, 0.1], x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={padded}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.28 }}
          className="relative text-4xl md:text-6xl font-black text-white tracking-tight"
        >
          {padded}
        </motion.div>
      </AnimatePresence>

      <div className="relative mt-3 text-[9px] md:text-xs uppercase tracking-[0.35em] text-violet-200/90 font-semibold">
        {label}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FLOATING PARTICLES                                                        */
/* -------------------------------------------------------------------------- */

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 0.5,
        startX: Math.random() * 100,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 6,
        drift: Math.random() * 40 - 20,
        startY: Math.random() * 40,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{
            opacity: 0,
            x: `${p.startX}%`,
            y: `${100 + p.startY}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [`${100 + p.startY}%`, `${-20 + p.drift}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.7)`,
          }}
        />
      ))}
    </div>
  );
}
