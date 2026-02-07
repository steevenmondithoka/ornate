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

// --- NEW BEAUTIFUL ANIMATION: TWINKLING COSMOS ---
const CosmicBackground = () => {
    // Generate static positions for 100 stars
    const stars = useMemo(() => {
        return [...Array(100)].map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 1,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#030014]">
            {/* Deep Nebula Glows */}
            <motion.div 
                animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-900/20 rounded-full blur-[120px]"
            />
            <motion.div 
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]"
            />

            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                    className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
                    style={{
                        width: star.size,
                        height: star.size,
                        top: star.top,
                        left: star.left,
                    }}
                />
            ))}

            {/* Shooting Stars */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`shooting-${i}`}
                    initial={{ x: "-10%", y: `${20 + i * 20}%`, opacity: 0 }}
                    animate={{ x: "120%", y: `${10 + i * 20}%`, opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 10 + 5,
                        delay: i * 4,
                        ease: "easeIn"
                    }}
                    className="absolute h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent rotate-[-15deg]"
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
            } catch (err) { console.error("Data Fetch Error", err); } 
            finally { setLoading(false); }
        };
        fetchAllEvents();
    }, []);

    return (
        <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden selection:bg-violet-600">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { text-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
                .glass-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .glass-card:hover { border-color: rgba(139, 92, 246, 0.3); }
            `}</style>

            {/* --- FIXED UPDATES TICKER (NEAR NAVBAR) --- */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/40 backdrop-blur-md border-b border-white/5 py-1">
                <UpdatesTicker />
            </div>

            {/* --- 1. HERO SECTION (ULTRA-BALANCED) --- */}
            <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
                <CosmicBackground />
                
                {/* Visual Depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-violet-900/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
                    
                    {/* COLUMN 1: BRANDING (Visible on Top Fold) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left order-1"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                            <StarIcon size={12} className="text-violet-400 animate-pulse" />
                            <span className="text-violet-400 font-mono tracking-[0.3em] text-[9px] uppercase font-black">RGUKT Ongole Presents</span>
                        </div>
                        <h1 className="text-[16vw] lg:text-[8.5rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col italic">
                            <span className="text-white text-glow">ORNATE</span>
                            <span className="text-violet-600">2K26</span>
                        </h1>
                        
                        {/* Desktop Only Description */}
                        <div className="mt-8 lg:block hidden border-l-4 border-violet-600 pl-6">
                            <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed max-w-md">
                                "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                            </p>
                            <div className="mt-4 flex items-center gap-4 text-violet-400 font-black text-[10px] uppercase tracking-[0.4em]">
                                <Calendar size={14} /> MARCH 28 — 30, 2026
                            </div>
                        </div>
                    </motion.div>

                    {/* COLUMN 2: COUNTDOWN (First Screen Visible) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center lg:justify-end order-2"
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 rounded-[3rem] md:rounded-[4.5rem] relative group w-full max-w-md lg:max-w-xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 px-8 py-2.5 rounded-full border border-violet-400/50 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Event Protocol</p>
                            </div>
                            <Countdown />
                        </div>
                    </motion.div>

                    {/* COLUMN 3: CTA & LOGISTICS */}
                    <div className="order-3 lg:col-span-2 flex flex-col lg:flex-row items-center justify-between gap-8 mt-4 lg:-mt-10">
                        <div className="lg:hidden block text-center px-4">
                             <p className="text-gray-500 text-sm italic font-light leading-relaxed">"Where Technical Innovation Meets <br/> Avant-garde Expressions"</p>
                        </div>
                        <motion.a 
                            href={leaveLetter} download 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(124,58,237,0.3)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10">Download Brochure</span>
                            <Download size={18} className="relative z-10 animate-bounce" />
                        </motion.a>
                        
                        <div className="hidden lg:flex items-center gap-12 opacity-30">
                            <div className="flex flex-col items-center"><Terminal size={20}/><span className="text-[8px] font-bold mt-2 tracking-widest uppercase">Arena</span></div>
                            <div className="flex flex-col items-center"><Award size={20}/><span className="text-[8px] font-bold mt-2 tracking-widest uppercase">Elite</span></div>
                            <div className="flex flex-col items-center"><Globe size={20}/><span className="text-[8px] font-bold mt-2 tracking-widest uppercase">Network</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. METRICS BAR --- */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: "Technical Competitions", val: "50+", icon: <Award /> },
                        { label: "Expected Footfall", val: "10K+", icon: <Users /> },
                        { label: "Branch Specializations", val: "06", icon: <Building2 /> },
                        { label: "Grant Prize Pool", val: "₹1.5L+", icon: <Zap /> }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-4">
                            <div className="text-violet-500 flex justify-center mb-2">{stat.icon}</div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{stat.val}</h4>
                            <p className="text-[9px] md:text-[10px] uppercase text-gray-500 tracking-[0.5em] font-black">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. ARENA GRID --- */}
            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                        <div>
                            <p className="text-violet-500 font-mono tracking-[0.4em] text-[10px] uppercase mb-4">Domain Selection</p>
                            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase italic leading-none">Arenas<span className="text-violet-500">.</span></h2>
                        </div>
                        <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.6em] md:max-w-xs md:text-right">Choose your discipline and enter the domain of engineering mastery.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deptMetadata.map((dept) => (
                            <Link key={dept.id} to={`/department/${dept.id}`}>
                                <motion.div whileHover={{ y: -15 }} className="p-12 glass-card rounded-[4rem] group relative overflow-hidden h-[450px] flex flex-col transition-all duration-500">
                                    <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-violet-600/20 to-transparent blur-[120px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
                                    <div className="p-5 bg-violet-600/10 rounded-3xl text-violet-500 w-fit mb-10 border border-violet-500/20 group-hover:scale-110 transition-transform">{dept.icon}</div>
                                    <h3 className="text-4xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic">{dept.name}</h3>
                                    <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-8 line-clamp-3">{dept.desc}</p>
                                    <div className="mt-auto flex items-center gap-4 text-violet-500 font-black text-[11px] uppercase tracking-[0.4em] group-hover:gap-8 transition-all">
                                        INITIALIZE <ArrowUpRight size={18} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. SPOTIFY STYLE EVENT ROWS --- */}
            <section className="py-40 bg-white/[0.01]">
                <div className="max-w-full mx-auto">
                    <h2 className="text-[12px] font-black tracking-[1.5em] uppercase text-center text-gray-700 mb-32">The 2k26 Collections</h2>

                    <div className="space-y-48">
                        {deptMetadata.map((dept) => {
                            const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                            if (filteredEvents.length === 0) return null;
                            return (
                                <div key={dept.id} className="relative group/row">
                                    <div className="flex items-center justify-between mb-12 px-6 md:px-24 max-w-[1600px] mx-auto">
                                        <div className="flex items-center gap-8">
                                            <div className="h-[2px] w-16 bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                                            <h3 className="text-3xl md:text-5xl font-medium italic text-white uppercase tracking-tighter">{dept.name}</h3>
                                        </div>
                                        <Link to={`/department/${dept.id}`} className="px-8 py-2.5 bg-white/5 rounded-full text-[10px] font-black text-gray-500 hover:text-white hover:bg-violet-600 transition-all uppercase tracking-widest border border-white/5">Enter Arena</Link>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar px-6 md:px-24 pb-20">
                                        {filteredEvents.map((ev) => (
                                            <Link to={`/event/${ev._id}`} key={ev._id} className="min-w-[85vw] md:min-w-[550px] snap-start">
                                                <div className="h-full glass-card p-12 md:p-16 rounded-[4.5rem] hover:bg-violet-600/[0.03] transition-all flex flex-col group/card border border-white/5 hover:border-violet-500/30 shadow-2xl">
                                                    <div className="flex justify-between items-center mb-12">
                                                        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                                            <Calendar size={14} className="text-violet-500" /> {formatDate(ev.date)}
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse mb-1" />
                                                            <span className="text-[9px] font-black text-violet-500 uppercase">Live</span>
                                                        </div>
                                                    </div>
                                                    <h4 className="text-4xl md:text-6xl font-medium italic mb-10 group-hover/card:text-violet-400 transition-colors line-clamp-1 leading-tight">{ev.name}</h4>
                                                    <div className="mt-auto flex flex-wrap gap-6 text-gray-400 text-[13px] font-bold uppercase tracking-widest">
                                                        <span className="flex items-center gap-3 px-6 py-3.5 bg-white/5 rounded-2xl border border-white/5"><Clock size={18} className="text-violet-500" /> {ev.time}</span>
                                                        <span className="flex items-center gap-3 px-6 py-3.5 bg-white/5 rounded-2xl border border-white/5"><MapPin size={18} className="text-violet-500" /> {ev.venue}</span>
                                                    </div>
                                                </div>
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

            {/* --- 5. DIRECTOR'S VISION --- */}
            <section className="py-60 px-6 relative overflow-hidden text-center">
                <CosmicBackground />
                <div className="relative z-10 max-w-5xl mx-auto">
                    <Quote size={80} className="text-violet-600/10 mx-auto mb-16" />
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-6xl font-medium italic leading-[1.3] text-white mb-24 text-glow">
                        "Ornate 2k26 represents the <span className="text-violet-500">zenith of engineering mastery</span> and our collective stride towards ingenuity."
                    </motion.h2>
                    <div className="flex flex-col items-center">
                        <div className="relative group mb-10">
                            <div className="absolute inset-0 bg-violet-500 rounded-full blur-2xl opacity-20 scale-150 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-36 h-36 rounded-full border-2 border-violet-500/50 p-2 shadow-2xl overflow-hidden">
                                <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000" alt="Director" />
                            </div>
                        </div>
                        <h3 className="text-white font-black tracking-[0.4em] uppercase text-base mb-3 italic">Dr. A V S S Kumara Swami Gupta</h3>
                        <div className="h-[1px] w-20 bg-violet-600 mb-4" />
                        <p className="text-violet-400 text-[11px] font-black tracking-[0.6em] uppercase">Director, RGUKT ONGOLE</p>
                    </div>
                </div>
            </section>
        </div>
    );
}