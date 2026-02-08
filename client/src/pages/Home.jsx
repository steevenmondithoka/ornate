import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Countdown from '../components/Countdown';
import { 
    Cpu, Settings, Zap, Building2, Radio, Quote, ArrowUpRight, 
    Calendar, MapPin, Sparkles, FileText, Download, Clock, 
    ChevronRight, Globe, Terminal, Award, Users, Stars as StarIcon
} from 'lucide-react';
import Sponsors from './Sponsors';
import leaveLetter from '../assets/Steeven_Leave_letter.pdf';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

// --- ENHANCED CINEMATIC TWINKLING STARS ---
const CosmicBackground = () => {
    const stars = useMemo(() => {
        return [...Array(150)].map((_, i) => ({
            id: i,
            size: Math.random() * 2.5 + 0.5,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 5
        }));
    }, []);

    const shootingStars = useMemo(() => {
        return [...Array(3)].map((_, i) => ({
            id: i,
            delay: i * 8 + Math.random() * 5
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#030014]">
            {/* Enhanced Nebula Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.08)_0%,_transparent_70%)]" />
            <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(168,85,247,0.06)_0%,_transparent_70%)] animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(99,102,241,0.04)_0%,_transparent_70%)] animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    animate={{ 
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        duration: star.duration, 
                        repeat: Infinity, 
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: star.size,
                        height: star.size,
                        top: star.top,
                        left: star.left,
                        boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`
                    }}
                />
            ))}

            {/* Shooting Stars */}
            {shootingStars.map((star) => (
                <motion.div
                    key={`shooting-${star.id}`}
                    initial={{ 
                        x: '100vw', 
                        y: Math.random() * 50 + '%',
                        opacity: 0 
                    }}
                    animate={{ 
                        x: '-100px', 
                        y: `${Math.random() * 60 + 20}%`,
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: star.delay,
                        repeatDelay: 15,
                        ease: "easeOut"
                    }}
                    className="absolute w-[100px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                        transform: 'rotate(-45deg)'
                    }}
                />
            ))}
        </div>
    );
};

const deptMetadata = [
    { id: "all", name: "General Arena", icon: <Sparkles />, color: "from-violet-500", desc: "Flagship cultural shows and inter-disciplinary technical challenges." },
    { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500", desc: "Cyber-security, AI constructs, and high-performance algorithmic warfare." },
    { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500", desc: "Precision kinetics, robotic dynamics, and thermodynamic innovation." },
    { id: "ece", name: "Electronics", icon: <Radio />, color: "from-purple-500", desc: "Signal processing, wireless systems, and embedded architectures." },
    { id: "eee", name: "Electrical", icon: <Zap />, color: "from-yellow-500", desc: "Renewable power systems, EV technology, and magnetic flux." },
    { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500", desc: "Structural integrity, sustainable urban design, and smart infrastructure." }
];

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
                setDbEvents(res.data);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchAllEvents();
    }, []);

    return (
        <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { 
                    text-shadow: 0 0 40px rgba(139, 92, 246, 0.6),
                                 0 0 80px rgba(139, 92, 246, 0.3);
                }
                .glass-card { 
                    background: rgba(255, 255, 255, 0.02); 
                    backdrop-filter: blur(25px); 
                    border: 1px solid rgba(255, 255, 255, 0.05); 
                }
                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                .shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    background-size: 1000px 100%;
                    animation: shimmer 3s infinite;
                }
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .gradient-animate {
                    background-size: 200% 200%;
                    animation: gradient-shift 8s ease infinite;
                }
            `}</style>

            {/* 1. UPDATES TICKER (DOCKED BELOW NAVBAR) */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/40 backdrop-blur-md border-b border-white/5 py-1">
                <UpdatesTicker />
            </div>

            {/* 2. ENHANCED HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 md:px-12 lg:px-24">
                <CosmicBackground />

                <div className="relative z-10 w-full max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
                        
                        {/* LEFT: CONTENT GROUP */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 md:space-y-10 order-1">
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }} 
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                            >
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-violet-500 font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4"
                                >
                                    RGUKT Ongole Presents
                                </motion.p>
                                <h1 className="text-[15vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase italic text-glow">
                                    <motion.span 
                                        className="block text-white"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                    >
                                        ORNATE
                                    </motion.span>
                                    <motion.span 
                                        className="block bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 bg-clip-text text-transparent gradient-animate"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                    >
                                        2K26
                                    </motion.span>
                                </h1>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="space-y-6 max-w-xl"
                            >
                                <div className="relative border-l-4 border-violet-600 pl-6 text-left">
                                    <div className="absolute -left-[2px] top-0 w-1 h-full bg-gradient-to-b from-violet-400 to-transparent opacity-50" />
                                    <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed">
                                        "A premium intersection of high-end technical innovation and cultural expressions."
                                    </p>
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="mt-4 flex items-center gap-3 text-violet-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]"
                                    >
                                        <Calendar size={14} /> 
                                        <span className="shimmer">MARCH 28 — 30, 2026</span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* CTA BUTTON */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 1, duration: 0.6 }}
                                className="order-3 lg:order-none"
                            >
                                <motion.a 
                                    href={leaveLetter} 
                                    download 
                                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(124,58,237,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(124,58,237,0.3)] overflow-hidden"
                                >
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                        animate={{ x: ['-200%', '200%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="relative z-10">Download Brochure</span>
                                    <Download size={18} className="relative z-10 group-hover:animate-bounce" />
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* RIGHT: COUNTDOWN GROUP */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }} 
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }} 
                            transition={{ duration: 1, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                            className="flex justify-center lg:justify-end order-2 lg:order-none"
                        >
                            <div className="glass-card p-8 md:p-12 lg:p-16 rounded-[3.5rem] relative group w-full max-w-md lg:max-w-xl shadow-2xl float-animation">
                                <motion.div 
                                    className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 rounded-full border border-violet-400/50 shadow-lg">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Launch Sequence</p>
                                </div>
                                <Countdown />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 3. ENHANCED STATS BAR */}
            <section className="py-24 px-6 border-y border-white/5 bg-gradient-to-r from-white/[0.01] via-violet-500/[0.02] to-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: "Elite Events", val: "50+", icon: <Award />, delay: 0 },
                        { label: "Expected Footfall", val: "10K+", icon: <Users />, delay: 0.1 },
                        { label: "Arenas", val: "06", icon: <Building2 />, delay: 0.2 },
                        { label: "Prize Pool", val: "₹1.5L+", icon: <Zap />, delay: 0.3 }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay, duration: 0.5 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="text-center space-y-3 group cursor-default"
                        >
                            <motion.div 
                                className="text-violet-500 flex justify-center"
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.h4 
                                className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-violet-400 transition-all"
                                whileHover={{ scale: 1.1 }}
                            >
                                {stat.val}
                            </motion.h4>
                            <p className="text-[9px] md:text-[10px] uppercase text-gray-500 tracking-[0.5em] font-black group-hover:text-violet-400 transition-colors">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. ENHANCED ARENA GRID */}
            <section className="py-40 px-6 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8"
                >
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-medium tracking-tighter uppercase italic leading-none"
                    >
                        Arenas<span className="text-violet-500 animate-pulse">.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.6em] md:max-w-xs md:text-right"
                    >
                        Choose your discipline and enter the domain of engineering mastery.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deptMetadata.map((dept, index) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ 
                                    y: -15, 
                                    boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)",
                                    transition: { duration: 0.3 }
                                }}
                                className="p-12 glass-card rounded-[4rem] group relative overflow-hidden h-[450px] flex flex-col transition-all duration-500"
                            >
                                {/* Animated gradient blob */}
                                <motion.div 
                                    className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${dept.color} to-transparent blur-[120px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 90, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity }}
                                />
                                
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 shimmer rounded-[4rem]" />
                                </div>

                                <motion.div 
                                    className="p-5 bg-violet-600/10 rounded-3xl text-violet-500 w-fit mb-10 border border-violet-500/20 relative z-10"
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {dept.icon}
                                </motion.div>
                                <h3 className="text-4xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic relative z-10">{dept.name}</h3>
                                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-8 line-clamp-3 relative z-10">{dept.desc}</p>
                                <motion.div 
                                    className="mt-auto flex items-center gap-4 text-violet-500 font-black text-[11px] uppercase tracking-[0.4em] group-hover:gap-8 transition-all relative z-10"
                                    whileHover={{ x: 10 }}
                                >
                                    INITIALIZE <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                                </motion.div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. ENHANCED SPOTIFY STYLE ROWS */}
            <section className="py-40 bg-gradient-to-b from-white/[0.01] to-transparent">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[12px] font-black tracking-[1.5em] uppercase text-center text-gray-700 mb-32"
                >
                    Event Collections
                </motion.h2>
                <div className="space-y-48">
                    {deptMetadata.map((dept, deptIndex) => {
                        const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                        if (filteredEvents.length === 0) return null;
                        return (
                            <motion.div 
                                key={dept.id} 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="relative group/row"
                            >
                                <div className="flex items-center justify-between mb-12 px-6 md:px-24 max-w-[1600px] mx-auto">
                                    <motion.div 
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-8"
                                    >
                                        <motion.div 
                                            className={`h-[2px] w-16 bg-gradient-to-r ${dept.color} to-violet-600`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: 64 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                        />
                                        <h3 className="text-3xl md:text-5xl font-medium italic text-white uppercase tracking-tighter">{dept.name}</h3>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link 
                                            to={`/department/${dept.id}`} 
                                            className="px-8 py-2.5 bg-white/5 rounded-full text-[10px] font-black text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all uppercase tracking-widest border border-white/5 hover:border-violet-500/50"
                                        >
                                            Enter Arena
                                        </Link>
                                    </motion.div>
                                </div>

                                <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar px-6 md:px-24 pb-20">
                                    {filteredEvents.map((ev, evIndex) => (
                                        <Link to={`/event/${ev._id}`} key={ev._id} className="min-w-[85vw] md:min-w-[550px] snap-start">
                                            <motion.div 
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ delay: evIndex * 0.1, duration: 0.5 }}
                                                whileHover={{ 
                                                    scale: 1.02,
                                                    boxShadow: "0 25px 50px rgba(139, 92, 246, 0.25)"
                                                }}
                                                className="h-full glass-card p-12 md:p-16 rounded-[4.5rem] flex flex-col group/card border border-white/5 hover:border-violet-500/30 shadow-2xl relative overflow-hidden"
                                            >
                                                {/* Animated background gradient */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-purple-600/0 to-violet-600/0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-500"
                                                    animate={{ 
                                                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                                                    }}
                                                    transition={{ duration: 10, repeat: Infinity }}
                                                />

                                                <div className="flex justify-between items-center mb-12 relative z-10">
                                                    <motion.div 
                                                        className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest"
                                                        whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                                                    >
                                                        <Calendar size={14} className="text-violet-500" /> {formatDate(ev.date)}
                                                    </motion.div>
                                                    <motion.div 
                                                        className="h-2 w-2 rounded-full bg-violet-500"
                                                        animate={{ 
                                                            scale: [1, 1.5, 1],
                                                            opacity: [1, 0.5, 1]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                </div>
                                                <h4 className="text-4xl md:text-6xl font-medium italic mb-10 group-hover/card:text-violet-400 transition-colors line-clamp-1 leading-tight relative z-10">{ev.name}</h4>
                                                <div className="mt-auto flex flex-wrap gap-6 text-gray-400 text-[13px] font-bold uppercase tracking-widest relative z-10">
                                                    <motion.span 
                                                        className="flex items-center gap-3 px-6 py-3.5 bg-white/5 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors"
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                    >
                                                        <Clock size={18} className="text-violet-500" /> {ev.time}
                                                    </motion.span>
                                                    <motion.span 
                                                        className="flex items-center gap-3 px-6 py-3.5 bg-white/5 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors"
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                    >
                                                        <MapPin size={18} className="text-violet-500" /> {ev.venue}
                                                    </motion.span>
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

            <Sponsors />

            {/* 6. ENHANCED DIRECTOR'S VISION */}
            <section className="py-60 px-6 relative overflow-hidden text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Quote size={80} className="text-violet-600/10 mx-auto mb-16" />
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-6xl font-medium italic leading-[1.3] text-white mb-24 max-w-5xl mx-auto"
                >
                    "Ornate 2k26 represents the pinnacle of engineering mastery and our collective stride towards ingenuity."
                </motion.h2>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img 
                            src="https://rguktong.ac.in/images/gupta%20sir.jpeg" 
                            className="w-36 h-36 object-cover rounded-full border-4 border-violet-500/50 p-2 mb-8 shadow-2xl" 
                            alt="Director" 
                        />
                    </motion.div>
                    <motion.h3 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-white font-black tracking-[0.4em] uppercase text-base mb-2"
                    >
                        Dr. A V S S Kumara Swami Gupta
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-violet-400 text-[11px] font-black tracking-[0.6em] uppercase"
                    >
                        Director, RGUKT ONGOLE
                    </motion.p>
                </motion.div>
            </section>
        </div>
    );
}