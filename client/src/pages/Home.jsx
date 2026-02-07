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

// --- CINEMATIC TWINKLING STARS ---
const CosmicBackground = () => {
    const stars = useMemo(() => {
        return [...Array(120)].map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 0.5,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#030014]">
            {/* Nebula Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.05)_0%,_transparent_70%)]" />
            
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: star.size,
                        height: star.size,
                        top: star.top,
                        left: star.left,
                        boxShadow: `0 0 ${star.size * 2}px white`
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
                .text-glow { text-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
                .glass-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.05); }
            `}</style>

            {/* 1. UPDATES TICKER (DOCKED BELOW NAVBAR) */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/40 backdrop-blur-md border-b border-white/5 py-1">
                <UpdatesTicker />
            </div>

            {/* 2. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 md:px-12 lg:px-24">
                <CosmicBackground />

                <div className="relative z-10 w-full max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
                        
                        {/* LEFT: CONTENT GROUP */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 md:space-y-10 order-1">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">
                                    RGUKT Ongole Presents
                                </p>
                                <h1 className="text-[15vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase italic text-glow">
                                    <span className="block text-white">ORNATE</span>
                                    <span className="block text-violet-600">2K26</span>
                                </h1>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.3 }}
                                className="space-y-6 max-w-xl"
                            >
                                <div className="border-l-4 border-violet-600 pl-6 text-left">
                                    <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed">
                                        "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                                    </p>
                                    <div className="mt-4 flex items-center gap-3 text-violet-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                                        <Calendar size={14} /> MARCH 28 — 30, 2026
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA BUTTON */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 0.5 }}
                                className="order-3 lg:order-none"
                            >
                                <motion.a 
                                    href={leaveLetter} download 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(124,58,237,0.3)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10">Download Brochure</span>
                                    <Download size={18} className="relative z-10 animate-bounce" />
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* RIGHT: COUNTDOWN GROUP */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center lg:justify-end order-2 lg:order-none"
                        >
                            <div className="glass-card p-8 md:p-12 lg:p-16 rounded-[3.5rem] relative group w-full max-w-md lg:max-w-xl shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 px-6 py-2 rounded-full border border-violet-400/50 shadow-lg">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Launch Sequence</p>
                                </div>
                                <Countdown />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 3. STATS BAR */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: "Elite Events", val: "50+", icon: <Award /> },
                        { label: "Expected Footfall", val: "10K+", icon: <Users /> },
                        { label: "Arenas", val: "06", icon: <Building2 /> },
                        { label: "Prize Pool", val: "₹1.5L+", icon: <Zap /> }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-3">
                            <div className="text-violet-500 flex justify-center">{stat.icon}</div>
                            <h4 className="text-3xl md:text-5xl font-bold tracking-tighter">{stat.val}</h4>
                            <p className="text-[9px] md:text-[10px] uppercase text-gray-500 tracking-[0.5em] font-black">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. ARENA GRID */}
            <section className="py-40 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                    <h2 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase italic leading-none">Arenas<span className="text-violet-500">.</span></h2>
                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.6em] md:max-w-xs md:text-right">Choose your discipline and enter the domain of engineering mastery.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deptMetadata.map((dept) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div whileHover={{ y: -15 }} className="p-12 glass-card rounded-[4rem] group relative overflow-hidden h-[450px] flex flex-col transition-all duration-500">
                                <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-violet-600/20 to-transparent blur-[120px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
                                <div className="p-5 bg-violet-600/10 rounded-3xl text-violet-500 w-fit mb-10 border border-violet-500/20">{dept.icon}</div>
                                <h3 className="text-4xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic">{dept.name}</h3>
                                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-8 line-clamp-3">{dept.desc}</p>
                                <div className="mt-auto flex items-center gap-4 text-violet-500 font-black text-[11px] uppercase tracking-[0.4em] group-hover:gap-8 transition-all">
                                    INITIALIZE <ArrowUpRight size={18} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. SPOTIFY STYLE ROWS */}
            <section className="py-40 bg-white/[0.01]">
                <h2 className="text-[12px] font-black tracking-[1.5em] uppercase text-center text-gray-700 mb-32">Event Collections</h2>
                <div className="space-y-48">
                    {deptMetadata.map((dept) => {
                        const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                        if (filteredEvents.length === 0) return null;
                        return (
                            <div key={dept.id} className="relative group/row">
                                <div className="flex items-center justify-between mb-12 px-6 md:px-24 max-w-[1600px] mx-auto">
                                    <div className="flex items-center gap-8">
                                        <div className="h-[2px] w-16 bg-violet-600" />
                                        <h3 className="text-3xl md:text-5xl font-medium italic text-white uppercase tracking-tighter">{dept.name}</h3>
                                    </div>
                                    <Link to={`/department/${dept.id}`} className="px-8 py-2.5 bg-white/5 rounded-full text-[10px] font-black text-gray-500 hover:text-white hover:bg-violet-600 transition-all uppercase tracking-widest border border-white/5">Enter Arena</Link>
                                </div>

                                <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar px-6 md:px-24 pb-20">
                                    {filteredEvents.map((ev) => (
                                        <Link to={`/event/${ev._id}`} key={ev._id} className="min-w-[85vw] md:min-w-[550px] snap-start">
                                            <div className="h-full glass-card p-12 md:p-16 rounded-[4.5rem] flex flex-col group/card border border-white/5 hover:border-violet-500/30 shadow-2xl">
                                                <div className="flex justify-between items-center mb-12">
                                                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                                        <Calendar size={14} className="text-violet-500" /> {formatDate(ev.date)}
                                                    </div>
                                                    <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
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
            </section>

            <Sponsors />

            {/* 6. DIRECTOR'S VISION */}
            <section className="py-60 px-6 relative overflow-hidden text-center">
                <Quote size={80} className="text-violet-600/10 mx-auto mb-16" />
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-6xl font-medium italic leading-[1.3] text-white mb-24 max-w-5xl mx-auto">
                    "Ornate 2k26 represents the pinnacle of engineering mastery and our collective stride towards ingenuity."
                </motion.h2>
                <div className="flex flex-col items-center">
                    <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-36 h-36 object-cover rounded-full border-2 border-violet-500/50 p-2 mb-8 shadow-2xl" alt="Director" />
                    <h3 className="text-white font-black tracking-[0.4em] uppercase text-base mb-2">Dr. A V S S Kumara Swami Gupta</h3>
                    <p className="text-violet-400 text-[11px] font-black tracking-[0.6em] uppercase">Director, RGUKT ONGOLE</p>
                </div>
            </section>
        </div>
    );
}