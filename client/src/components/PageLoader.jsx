import { motion } from "framer-motion";
import logo from "../assets/ornatelogo.png";

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

const logoVariants = {
  initial: { scale: 0, opacity: 0 },
  zoomIn: {
    scale: 1.3,          // strong zoom-in
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
  pulse: {
    scale: [1.25, 1.35, 1.25], // slight increase/decrease at large size
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const breathingGlow = {
  animate: {
    scale: [0.9, 1.1, 0.9],
    opacity: [0.3, 0.9, 0.3],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ringVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const dotsVariants = {
  animate: {
    opacity: [0.2, 1, 0.2],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function PageLoader() {
  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050712]"
    >
      {/* soft vignette background */}
      <div className="absolute inset-0 bg-radial from-violet-900/40 via-transparent to-black" />

      {/* breathing glow behind logo */}
      <motion.div
        variants={breathingGlow}
        animate="animate"
        className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-violet-500/40 blur-3xl"
      />

      {/* rotating ring */}
      <motion.div
        variants={ringVariants}
        animate="animate"
        className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full border border-violet-400/30 border-t-violet-300/80"
      />

      {/* rounded logo: 0 -> big zoom-in -> slight pulse */}
      <motion.img
        src={logo}
        alt="Ornate Logo"
        variants={logoVariants}
        initial="initial"
        animate={["zoomIn", "pulse"]}
        exit="exit"
        className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover drop-shadow-[0_0_80px_rgba(139,92,246,1)]"
      />

      {/* loading text */}
      <div className="absolute bottom-20 md:bottom-24 text-xs md:text-sm font-medium text-violet-200/80 tracking-[0.25em] uppercase flex items-center gap-1">
        
        <motion.span variants={dotsVariants} animate="animate">
          ...
        </motion.span>
      </div>
    </motion.div>
  );
}
