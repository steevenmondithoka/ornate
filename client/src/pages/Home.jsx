import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Countdown from '../components/Countdown';
import { 
    Cpu, Settings, Zap, Building2, Radio, Quote, ArrowUpRight, 
    Calendar, MapPin, Sparkles, FileText, Download, Clock, 
    ChevronRight, Globe, Terminal, Award, Users, ShieldCheck, 
    ZapOff, Activity, Code2, Layers
} from 'lucide-react';
import Sponsors from './Sponsors';
import leaveLetter from '../assets/Steeven_Leave_letter.pdf';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

// --- ADVANCED BACKGROUND: NEURAL NETWORK & BINARY FLOW ---
const AdvancedBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Prismatic Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
        
        {/* Floating Binary Columns */}
        <div className="flex justify-around opacity-[0.05] h-full w-full">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ 
                        duration: Math.random() * 15 + 10, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 5 
                    }}
                    className="flex flex-col text-violet-500 font-mono text-xs leading-none"
                >
                    {Array(40).fill(0).map((_, j) => (
                        <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                    ))}
                </motion.div>
            ))}
        </div>

        {/* Animated Neural Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
    </div>
);

// --- DEPARTMENT METADATA ---
const deptMetadata = [
    { id: "all", name: "General Arena", icon: <Sparkles />, color: "from-violet-500/40", desc: "Inter-disciplinary challenges and flagship cultural shows." },
    { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500/40", desc: "Cyber-security, AI constructs, and algorithmic warfare." },
    { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500/40", desc: "Robotic kinetics and thermodynamic innovation." },
    { id: "ece", name: "Electronics", icon: <Radio />, color: "from-purple-500/40", desc: "Signal processing and embedded system architectures." },
    { id: "eee", name: "Electrical", icon: <Zap />, color: "from-yellow-500/40", desc: "Renewable energy and high-voltage power dynamics." },
    { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500/40", desc: "Structural integrity and urban infrastructure design." }
];

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FETCH LOGIC (KEEPING YOUR EXACT LOGIC) ---
    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
                setDbEvents(res.data);
            } catch (err) {
                console.error("Connection Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllEvents();
    }, []);

    // --- PAGE REVEAL ANIMATIONS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden selection:bg-violet-500 selection:text-white">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { text-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
                .glass-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .glass-card:hover { border-color: rgba(139, 92, 246, 0.3); background: rgba(255, 255, 255, 0.04); }
            `}</style>

            {/* 1. DOCKED UPDATE TICKER */}
            <div className="fixed top-[75px] left-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5 py-1">
                <UpdatesTicker />
            </div>

            {/* 2. HERO SECTION: FIXING THE ALIGNMENT & OVERLAP */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
                <AdvancedBackground />

                {/* THE MASTER GRID: Split 50/50 on Desktop, Stacked on Mobile */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: BRANDING & CTA */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-10 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-violet-500 font-mono tracking-[0.6em] text-[10px] md:text-xs uppercase"
                            >
                                RGUKT Ongole Presents
                            </motion.p>
                            <h1 className="text-[14vw] lg:text-[8.5rem] font-black tracking-tighter leading-[0.85] uppercase italic text-glow">
                                <span className="block text-white">ORNATE</span>
                                <span className="block text-violet-600">2K26</span>
                            </h1>
                        </div>

                        <div className="max-w-xl mx-auto lg:mx-0">
                            <motion.div 
                                initial={{ opacity: 0, borderLeftWidth: 0 }}
                                animate={{ opacity: 1, borderLeftWidth: 4 }}
                                transition={{ delay: 0.8 }}
                                className="border-l-4 border-violet-600 pl-6 text-left"
                            >
                                <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed">
                                    "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                                </p>
                                <div className="mt-6 flex flex-wrap gap-6 items-center">
                                    <span className="flex items-center gap-2 text-violet-500 font-black text-xs uppercase tracking-[0.3em]">
                                        <Calendar size={14} /> Mar 28 — 30
                                    </span>
                                    <span className="h-1 w-1 bg-gray-700 rounded-full" />
                                    <span className="flex items-center gap-2 text-violet-500 font-black text-xs uppercase tracking-[0.3em]">
                                        <MapPin size={14} /> RGUKT ONGOLE
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* BROCHURE CTA */}
                        <div className="flex justify-center lg:justify-start pt-4">
                            <motion.a 
                                href={leaveLetter} 
                                download 
                                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(124, 58, 237, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-[11px] md:text-[12px] uppercase tracking-[0.2em] shadow-2xl transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10">Download Brochure</span>
                                <Download size={18} className="relative z-10 animate-bounce" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: COUNTDOWN BOX */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex justify-center lg:justify-end items-center"
                    >
                        <div className="relative group w-full max-w-lg lg:max-w-none">
                            {/* Decorative Orbiting Element */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-12 border border-dashed border-violet-500/20 rounded-full hidden lg:block"
                            />
                            
                            <div className="glass-card p-10 md:p-14 lg:p-20 rounded-[4rem] relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 px-6 py-2 rounded-full border border-violet-400/50 shadow-lg">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Launch Protocol</p>
                                </div>
                                <Countdown />
                                <div className="mt-12 flex justify-center gap-10 opacity-40">
                                    <Activity size={20} className="text-violet-500 animate-pulse" />
                                    <Layers size={20} className="text-violet-500 animate-pulse delay-75" />
                                    <Code2 size={20} className="text-violet-500 animate-pulse delay-150" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. EXPERIENCE STATS */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { label: "Technical Competitions", val: "40+", icon: <Terminal /> },
                        { label: "Cultural Showcases", val: "15+", icon: <Sparkles /> },
                        { label: "Talent Reach", val: "8000+", icon: <Users /> },
                        { label: "Cash Prize Pool", val: "₹1,50,000", icon: <Award /> }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center space-y-4"
                        >
                            <div className="text-violet-500 flex justify-center">{stat.icon}</div>
                            <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{stat.val}</h4>
                            <p className="text-[10px] md:text-xs uppercase text-gray-500 tracking-[0.4em] font-black">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. PHILOSOPHY & BLUEPRINT */}
            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
                    <div className="flex-1 space-y-10">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-medium tracking-tighter italic leading-none"
                        >
                            The Genesis of <span className="text-violet-500 text-glow">Excellence.</span>
                        </motion.h2>
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                            Ornate is an ecosystem where intellectual discipline meets avant-garde creativity. We curate experiences that challenge the very fabric of engineering and artistic expression.
                        </p>
                        <div className="flex gap-4">
                            <div className="h-1 w-20 bg-violet-600 rounded-full" />
                            <div className="h-1 w-4 bg-violet-600/30 rounded-full" />
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 w-full glass-card p-12 md:p-20 rounded-[4rem] group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-violet-500/10 group-hover:text-violet-500/20 transition-colors">
                            <FileText size={180} />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">The Official Blueprint</h3>
                        <p className="text-gray-500 mb-10 text-base leading-loose">Access the comprehensive PDF documentation covering prize structures, eligibility, and the institutional event rulebook.</p>
                        <a 
                            href={leaveLetter} 
                            download 
                            className="inline-flex items-center gap-4 text-violet-400 font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
                        >
                            Get Rulebook <ChevronRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* 5. DEPARTMENTAL NAVIGATION (GRID) */}
            <section className="py-40 px-6 max-w-full mx-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <h2 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase italic leading-none">
                        Arenas<span className="text-violet-500">.</span>
                    </h2>
                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.6em] md:pb-4">Select your Domain of Mastery</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {deptMetadata.map((dept, i) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div 
                                whileHover={{ y: -15 }} 
                                className="p-12 glass-card rounded-[3.5rem] group relative overflow-hidden h-[450px] flex flex-col transition-all duration-500 shadow-2xl"
                            >
                                <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${dept.color} blur-[120px] opacity-10 group-hover:opacity-40 transition-opacity duration-700`} />
                                <div className="p-5 bg-violet-600/10 rounded-3xl text-violet-500 w-fit mb-10 border border-violet-500/20 group-hover:scale-110 transition-transform">{dept.icon}</div>
                                <h3 className="text-4xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic">{dept.name}</h3>
                                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-8">{dept.desc}</p>
                                <div className="mt-auto flex items-center gap-3 text-violet-500 font-black text-[11px] uppercase tracking-[0.4em] group-hover:gap-6 transition-all">
                                    Initialize <ArrowUpRight size={16} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 6. EVENT COLLECTIONS (SPOTIFY STYLE) */}
            <section className="py-40 bg-white/[0.01]">
                <div className="max-w-full mx-auto">
                    <h2 className="text-[12px] font-black tracking-[1.2em] uppercase text-center text-gray-700 mb-32">Event Collection 2026</h2>

                    <div className="space-y-40">
                        {deptMetadata.map((dept) => {
                            const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                            if (filteredEvents.length === 0) return null;

                            return (
                                <div key={dept.id} className="relative group/row">
                                    <div className="flex items-center justify-between mb-12 px-6 md:px-24 max-w-[1600px] mx-auto">
                                        <div className="flex items-center gap-6">
                                            <div className="h-[2px] w-16 bg-violet-600 shadow-[0_0_10px_#8b5cf6]" />
                                            <h3 className="text-3xl md:text-5xl font-medium italic text-white uppercase tracking-tighter">{dept.name}</h3>
                                        </div>
                                        <Link 
                                            to={`/department/${dept.id}`} 
                                            className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black text-gray-500 hover:text-white hover:bg-violet-600 transition-all uppercase tracking-widest border border-white/5"
                                        >
                                            View Arena
                                        </Link>
                                    </div>

                                    {/* HORIZONTAL SWIPER */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar pb-16 px-6 md:px-24">
                                        {filteredEvents.map((ev) => (
                                            <Link 
                                                to={`/event/${ev._id}`} 
                                                key={ev._id}
                                                className="min-w-[85vw] md:min-w-[500px] snap-start"
                                            >
                                                <motion.div 
                                                    whileHover={{ y: -10, scale: 1.02 }}
                                                    className="h-full glass-card p-12 md:p-16 rounded-[4rem] flex flex-col border border-white/5 hover:border-violet-600/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-500"
                                                >
                                                    <div className="flex justify-between items-center mb-12">
                                                        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={14} className="text-violet-500" />
                                                            <span className="text-[11px] font-black text-white uppercase tracking-widest">{formatDate(ev.date)}</span>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1">Status</span>
                                                            <div className="h-2 w-2 rounded-full bg-violet-500 animate-ping" />
                                                        </div>
                                                    </div>

                                                    <h4 className="text-4xl md:text-5xl font-medium italic text-white mb-8 group-hover:text-violet-400 transition-colors line-clamp-1 leading-tight">{ev.name}</h4>
                                                    
                                                    <div className="mt-auto pt-10 border-t border-white/5 flex flex-wrap gap-5">
                                                        <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl text-gray-300 text-[13px] font-bold uppercase">
                                                            <Clock size={16} className="text-violet-500" /> {ev.time}
                                                        </div>
                                                        <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl text-gray-300 text-[13px] font-bold uppercase truncate max-w-[200px]">
                                                            <MapPin size={16} className="text-violet-500" /> {ev.venue}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Sponsors />

            {/* 7. DIRECTOR'S VISION */}
            <section className="py-60 px-6 relative overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 blur-[200px] rounded-full" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto relative z-10"
                >
                    <Quote size={80} className="text-violet-600/10 mx-auto mb-16" />
                    <h2 className="text-3xl md:text-6xl font-medium italic leading-[1.3] text-white mb-24 tracking-tighter">
                        "Ornate 2k26 is not merely a festival; it is the <span className="text-violet-500 text-glow">zenith of student ingenuity</span> and our collective stride towards engineering excellence."
                    </h2>

                    <div className="flex flex-col items-center">
                        <div className="relative mb-10 group">
                            <div className="absolute inset-0 bg-violet-500 rounded-full blur-2xl opacity-20 scale-150 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-36 h-36 rounded-full border-2 border-violet-500/50 p-2 shadow-2xl">
                                <img 
                                    src="https://rguktong.ac.in/images/gupta%20sir.jpeg" 
                                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000" 
                                    alt="Director" 
                                />
                            </div>
                        </div>
                        <h3 className="text-white font-black tracking-[0.4em] uppercase text-base mb-3 italic">Dr. A V S S Kumara Swami Gupta</h3>
                        <div className="h-[1px] w-20 bg-violet-600 mb-4" />
                        <p className="text-violet-400 text-[11px] font-black tracking-[0.6em] uppercase">Director, RGUKT ONGOLE</p>
                    </div>
                </motion.div>
            </section>

            {/* FOOTER ACCENT */}
            <div className="h-2 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600" />
        </div>
    );
}