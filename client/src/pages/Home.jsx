// src/pages/Home.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../components/Countdown";
import {
    Cpu,
    Settings,
    Zap,
    Building2,
    Radio,
    Quote,
    ArrowUpRight,
    Calendar,
    MapPin,
    Sparkles,
    Download,
    Clock,
    Award,
    Users,
    Trophy,
} from "lucide-react";
import Sponsors from "./Sponsors";
import leaveLetter from "../assets/Steeven_Leave_letter.pdf";
import { UpdatesTicker } from "../components/UpdatesTicker";
import { formatDate } from "../utils/formatDate";
import HeroCanvas from "../components/HeroCanvas";
import danceImage from "../assets/dance.png";

/* -------------------------------------------------------------------------- */
/*  COSMIC BACKGROUND LAYER – full page                                       */
/* -------------------------------------------------------------------------- */

const CosmicBackground = () => {
    const { scrollYProgress } = useScroll();

    const yBack = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const yLights = useTransform(scrollYProgress, [0, 1], [0, 250]);

    const stars = useMemo(
        () =>
            [...Array(60)].map((_, i) => ({
                id: i,
                size: Math.random() * 2 + 0.5,
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 5,
            })),
        []
    );

    const shootingStars = useMemo(
        () =>
            [...Array(2)].map((_, i) => ({
                id: i,
                delay: i * 10 + Math.random() * 3,
            })),
        []
    );

    const containerRef = useRef(null);
    const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

    const handlePointerMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = (clientX - (rect.left + rect.width / 2)) / rect.width;
        const y = (clientY - (rect.top + rect.height / 2)) / rect.height;

        setPointerOffset({
            x: x * 40,
            y: y * 40,
        });
    };

    return (
        <motion.div
            ref={containerRef}
            className="pointer-events-none select-none fixed inset-0 z-0 overflow-hidden"
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
        >
            <motion.div
                style={{ y: yBack }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22)_0%,transparent_55%)]"
            />

            <motion.div
                style={{ y: yLights, x: pointerOffset.x * 0.6 }}
                className="absolute -left-40 top-[-15%] w-[55%] h-[130%] blur-3xl"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(124,135,247,0.65), transparent 60%)",
                        transform: "skewX(-12deg)",
                    }}
                />
            </motion.div>

            <motion.div
                style={{ y: yLights, x: pointerOffset.x * -0.6 }}
                className="absolute -right-40 top-[-5%] w-[55%] h-[130%] blur-3xl"
            >
                <div
                    className="w-full h-full"
                    style={{
                        background:
                            "linear-gradient(315deg, rgba(167,139,250,0.7), transparent 60%)",
                        transform: "skewX(12deg)",
                    }}
                />
            </motion.div>

            <motion.div
                style={{ y: yBack }}
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]"
            />
            <motion.div
                style={{ y: yBack }}
                className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px]"
            />

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    animate={{ opacity: [0.2, 0.9, 0.2] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: star.size,
                        height: star.size,
                        top: star.top,
                        left: star.left,
                        boxShadow: `0 0 ${star.size * 1.8}px rgba(255,255,255,0.45)`,
                    }}
                />
            ))}

            {shootingStars.map((star) => (
                <motion.div
                    key={`shooting-${star.id}`}
                    initial={{
                        x: "100vw",
                        y: Math.random() * 40 + "%",
                        opacity: 0,
                    }}
                    animate={{
                        x: "-200px",
                        y: `${Math.random() * 60 + 20}%`,
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: star.delay,
                        repeatDelay: 20,
                        ease: "easeOut",
                    }}
                    className="absolute w-[120px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                        boxShadow: "0 0 10px rgba(255,255,255,0.6)",
                        transform: "rotate(-45deg)",
                    }}
                />
            ))}
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*  DEPARTMENT META                                                            */
/* -------------------------------------------------------------------------- */

const deptMetadata = [
    {
        id: "all",
        name: "General Arena",
        icon: <Sparkles />,
        color: "from-violet-500",
        desc: "Flagship cultural shows and inter-disciplinary technical challenges.",
    },
    {
        id: "cse",
        name: "Computer Science",
        icon: <Cpu />,
        color: "from-blue-500",
        desc: "Cyber-security, AI constructs, and high-performance algorithmic warfare.",
    },
    {
        id: "mech",
        name: "Mechanical",
        icon: <Settings />,
        color: "from-red-500",
        desc: "Precision kinetics, robotic dynamics, and thermodynamic innovation.",
    },
    {
        id: "ece",
        name: "Electronics",
        icon: <Radio />,
        color: "from-purple-500",
        desc: "Signal processing, wireless systems, and embedded architectures.",
    },
    {
        id: "eee",
        name: "Electrical",
        icon: <Zap />,
        color: "from-yellow-500",
        desc: "Renewable power systems, EV technology, and magnetic flux.",
    },
    {
        id: "civil",
        name: "Civil",
        icon: <Building2 />,
        color: "from-green-500",
        desc: "Structural integrity, sustainable urban design, and smart infrastructure.",
    },
];

/* -------------------------------------------------------------------------- */
/*  HOME PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get(
                    "https://ornate-evkf.onrender.com/api/events"
                );
                setDbEvents(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllEvents();
    }, []);

    return (
        <div className="relative bg-[#030014] text-white min-h-screen overflow-x-hidden">
            {/* full-page cosmic BG */}
            <CosmicBackground />

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-card { 
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(20px); 
          border: 1px solid rgba(255, 255, 255, 0.08); 
        }
        .glass-card-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .pulse-soft {
          animation: subtle-pulse 3s ease-in-out infinite;
        }
      `}</style>

            {/* 1. Updates ticker */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/60 backdrop-blur-md border-b border-white/5 py-1">
                <UpdatesTicker />
            </div>

            {/* 2. HERO */}
            <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 z-10">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <HeroCanvas />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto">
                    {/* MOBILE HERO */}
                    <div className="flex flex-col lg:hidden items-center text-center space-y-6 justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20"
                            >
                                <Sparkles size={14} className="text-violet-400" />
                                <span className="text-violet-400 font-mono text-[10px] uppercase tracking-widest">
                                    RGUKT Ongole 2026
                                </span>
                            </motion.div>

                            <h1 className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.1 }}
                                    className="text-[20vw] sm:text-[18vw] font-black tracking-tighter leading-none uppercase text-white"
                                >
                                    ORNATE
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.1 }}
                                    className="text-[20vw] sm:text-[18vw] font-black tracking-tighter leading-none uppercase bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent"
                                >
                                    2K26
                                </motion.div>
                            </h1>
                        </motion.div>

                        {/* mobile image + countdown (stacked) */}
                        <div className="w-full max-w-md mx-auto flex flex-col gap-5">
                            {/* image – mobile, stronger zoom + float */}
                            <motion.div
                                className="relative w-[420px] h-[420px] flex items-center justify-center"
                                animate={{
                                    y: [-12, 12, -12],
                                    scale: [0.95, 1.08, 0.95],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="absolute w-96 h-96 bg-purple-600/30 blur-3xl rounded-full" />
                                <img
                                    src={danceImage}
                                    alt="Cosmic Performance"
                                    className="
                    relative
                    w-full
                    h-full
                    object-contain
                    mix-blend-screen
                    opacity-90
                    drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]
                  "
                                    style={{
                                        WebkitMaskImage:
                                            "radial-gradient(circle at center, white 60%, transparent 100%)",
                                        maskImage:
                                            "radial-gradient(circle at center, white 60%, transparent 100%)",
                                    }}
                                />
                            </motion.div>

                            {/* countdown wrapper – mobile */}
                            <div className="w-full max-w-2xl mx-auto relative mt-12">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 rounded-full shadow-xl z-20">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white">
                                        Event Countdown
                                    </p>
                                </div>
                                <Countdown />
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP HERO */}
                    <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
                        {/* left: text */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20"
                                >
                                    <Sparkles size={14} className="text-violet-400" />
                                    <span className="text-violet-400 font-mono text-[10px] uppercase tracking-widest">
                                        RGUKT Ongole 2026
                                    </span>
                                </motion.div>

                                <h1 className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-8xl xl:text-9xl font-black tracking-tighter leading-none uppercase text-white"
                                    >
                                        ORNATE
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="text-8xl xl:text-9xl font-black tracking-tighter leading-none uppercase bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent"
                                    >
                                        2K26
                                    </motion.div>
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="space-y-6"
                            >
                                <div className="relative px-6 py-5 glass-card rounded-2xl max-w-xl bg-black/40">
                                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
                                    <p className="text-gray-300 text-lg font-light italic leading-relaxed">
                                        "A premium intersection of high-end technical innovation and cultural expressions."
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-3 bg-violet-500/10 border border-violet-500/20 rounded-full w-fit">
                                    <Calendar size={16} className="text-violet-400" />
                                    <span className="text-violet-400 font-bold text-xs uppercase tracking-widest">
                                        March 28 — 30, 2026
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <motion.a
                                    href={leaveLetter}
                                    download
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-900 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-xl hover:shadow-violet-500/40"
                                >
                                    <Download size={18} />
                                    <span>Download Brochure</span>
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* right: image + countdown, stacked */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex justify-center"
                        >
                            <div className="w-full max-w-2xl flex flex-col gap-6 items-center">
                                {/* image – desktop, stronger zoom + float */}
                                <motion.div
                                    className="relative w-full flex items-center justify-center"
                                    animate={{
                                        y: [-14, 14, -14],
                                        scale: [0.94, 1.1, 0.94],
                                    }}
                                    transition={{
                                        duration: 14,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="absolute w-[320px] h-[320px] bg-purple-600/30 blur-[100px] rounded-full pointer-events-none" />
                                    <img
                                        src={danceImage}
                                        alt="Cosmic Performance"
                                        className="
                      relative
                      w-[320px]
                      h-[320px]
                      object-contain
                      mix-blend-lighten
                      opacity-90
                      pointer-events-none
                    "
                                        style={{
                                            WebkitMaskImage:
                                                "radial-gradient(circle at center, rgba(255,255,255,1) 40%, rgba(255,255,255,0.4) 65%, transparent 85%)",
                                            maskImage:
                                                "radial-gradient(circle at center, rgba(255,255,255,1) 40%, rgba(255,255,255,0.4) 65%, transparent 85%)",
                                        }}
                                    />
                                </motion.div>

                                {/* countdown wrapper – desktop */}
                                <div className="w-full relative mt-16 px-4 max-w-5xl mx-auto">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                                        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 px-8 py-2 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-white/20">
                                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white whitespace-nowrap">
                                                Event Countdown
                                            </p>
                                        </div>
                                    </div>
                                    <Countdown />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. STATS BAR – no dark background, cosmic visible */}
            <section className="py-20 px-6 border-y border-white/10 bg-transparent relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                    {[
                        { label: "Elite Events", val: "50+", icon: <Award size={28} /> },
                        { label: "Expected Footfall", val: "10K+", icon: <Users size={28} /> },
                        { label: "Arenas", val: "06", icon: <Building2 size={28} /> },
                        { label: "Prize Pool", val: "₹1.5L+", icon: <Trophy size={28} /> },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="text-center space-y-3"
                        >
                            <div className="text-violet-400 flex justify-center">
                                {stat.icon}
                            </div>
                            <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                                {stat.val}
                            </h4>
                            <p className="text-[9px] md:text-[10px] uppercase text-gray-400 tracking-[0.4em] font-bold">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. ARENAS GRID – cards transparent so stars show */}
            <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase text-white mb-4">
                        Arenas<span className="text-violet-500">.</span>
                    </h2>
                    <p className="text-gray-400 text-sm uppercase tracking-wider max-w-md">
                        Choose your discipline and enter the domain of engineering mastery.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deptMetadata.map((dept, index) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.4 }}
                                whileHover={{ y: -8 }}
                                className="glass-card glass-card-hover p-10 rounded-3xl group relative overflow-hidden h-[400px] flex flex-col bg-transparent"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${dept.color} to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                />
                                <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-400 w-fit mb-8 border border-violet-500/20 relative z-10">
                                    {dept.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-violet-400 transition-colors uppercase relative z-10">
                                    {dept.name}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-8 line-clamp-3 relative z-10">
                                    {dept.desc}
                                </p>
                                <div className="mt-auto flex items-center gap-3 text-violet-400 font-bold text-xs uppercase tracking-wider group-hover:gap-5 transition-all relative z-10">
                                    EXPLORE <ArrowUpRight size={16} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. EVENT ROWS – section and cards transparent */}
            <section className="py-32 bg-transparent relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-bold tracking-[1em] uppercase text-center text-gray-400 mb-24"
                >
                    Event Collections
                </motion.h2>

                <div className="space-y-32">
                    {deptMetadata.map((dept) => {
                        const filteredEvents = dbEvents.filter((ev) => ev.dept === dept.id);
                        if (filteredEvents.length === 0) return null;

                        return (
                            <motion.div
                                key={dept.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <div className="flex items-center justify-between mb-10 px-6 md:px-20 max-w-[1600px] mx-auto">
                                    <div className="flex items-center gap-6">
                                        <div
                                            className={`h-[2px] w-12 bg-gradient-to-r ${dept.color} to-violet-600`}
                                        />
                                        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase">
                                            {dept.name}
                                        </h3>
                                    </div>
                                    <Link
                                        to={`/department/${dept.id}`}
                                        className="px-6 py-2 bg-white/5 hover:bg-violet-600 rounded-full text-[9px] font-bold text-gray-300 hover:text-white transition-all uppercase tracking-widest border border-white/10"
                                    >
                                        View All
                                    </Link>
                                </div>

                                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar px-6 md:px-20 pb-16">
                                    {filteredEvents.map((ev) => (
                                        <Link
                                            to={`/event/${ev._id}`}
                                            key={ev._id}
                                            className="min-w-[85vw] md:min-w-[500px] snap-start"
                                        >
                                            <motion.div
                                                whileHover={{ y: -5 }}
                                                className="glass-card glass-card-hover p-10 md:p-12 rounded-3xl flex flex-col group border-white/10 shadow-xl transition-all duration-300 bg-transparent"
                                            >
                                                <div className="flex justify-between items-center mb-8">
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                                                        <Calendar
                                                            size={12}
                                                            className="text-violet-400"
                                                        />{" "}
                                                        {formatDate(ev.date)}
                                                    </div>
                                                    <div className="h-2 w-2 rounded-full bg-violet-500 pulse-soft" />
                                                </div>

                                                <h4 className="text-3xl md:text-5xl font-bold mb-8 group-hover:text-violet-400 transition-colors line-clamp-1">
                                                    {ev.name}
                                                </h4>

                                                <div className="mt-auto flex flex-wrap gap-4 text-gray-300 text-xs font-semibold uppercase tracking-wide">
                                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                                        <Clock
                                                            size={14}
                                                            className="text-violet-400"
                                                        />{" "}
                                                        {ev.time}
                                                    </span>
                                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                                        <MapPin
                                                            size={14}
                                                            className="text-violet-400"
                                                        />{" "}
                                                        {ev.venue}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* SPONSORS – no background override */}
            <div className="relative z-10 bg-transparent">
                <Sponsors />
            </div>

            {/* DIRECTOR – no dark background, cosmic everywhere */}
            <section className="py-48 px-6 text-center relative z-10 bg-transparent">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Quote
                        size={60}
                        className="text-violet-500/20 mx-auto mb-12"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-5xl font-light italic leading-relaxed text-gray-200 mb-20 max-w-4xl mx-auto"
                >
                    "Ornate 2k26 represents the pinnacle of engineering mastery and our collective stride towards ingenuity."
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 blur-xl opacity-30" />
                        <img
                            src="https://rguktong.ac.in/images/gupta%20sir.jpeg"
                            className="w-32 h-32 object-cover rounded-full border-4 border-violet-500/30 p-1 shadow-xl relative z-10"
                            alt="Director"
                        />
                    </div>
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-1">
                        Dr. A V S S Kumara Swami Gupta
                    </h3>
                    <p className="text-violet-400 text-[10px] font-bold tracking-widest uppercase">
                        Director, RGUKT Ongole
                    </p>
                </motion.div>
            </section>
        </div>
    );
}
