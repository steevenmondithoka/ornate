import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Countdown from '../components/Countdown';
import { Cpu, Settings, Zap, Building2, Radio, Quote, ArrowUpRight, Calendar, MapPin, Sparkles, FileText, Download, Clock, ChevronRight, Globe } from 'lucide-react';
import Sponsors from './Sponsors';
import leaveLetter from '../assets/Steeven_Leave_letter.pdf';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

// --- MOVING BACKGROUND ANIMATION COMPONENT ---
const HeroBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 
                }}
                animate={{ 
                    y: [null, Math.random() * -100 - 50 + "%"],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                    duration: Math.random() * 10 + 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="absolute w-1 h-1 bg-violet-500 rounded-full shadow-[0_0_10px_#8b5cf6]"
            />
        ))}
        {/* Animated Gradient Glows */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] bg-violet-600 rounded-full blur-[120px]"
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[120px]"
        />
    </div>
);

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
                setDbEvents(res.data);
            } catch (err) { console.error(err); }
        };
        fetchAllEvents();
    }, []);

    const deptMetadata = [
        { id: "all", name: "General Arena", icon: <Sparkles />, color: "from-violet-500", desc: "Common challenges for all branches." },
        { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500", desc: "The digital frontier of innovation." },
        { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500", desc: "Kinetic energy and precision engineering." },
        { id: "ece", name: "Electronics", icon: <Radio />, color: "from-purple-500", desc: "Signals, systems, and deep-tech." },
        { id: "eee", name: "Electrical", icon: <Zap />, color: "from-yellow-500", desc: "Powering the future of EV and flux." },
        { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500", desc: "Architecting the infrastructure." }
    ];

    return (
        <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .hero-text-glow { text-shadow: 0 0 50px rgba(139, 92, 246, 0.3); }
            `}</style>

            {/* --- UPDATES TICKER (DOCKED BELOW NAVBAR) --- */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/40 backdrop-blur-md border-b border-white/5">
                <UpdatesTicker />
            </div>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 md:px-20 overflow-hidden">
                <HeroBackground />

                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* LEFT SIDE: TITLES & CTA */}
                    <div className="space-y-10 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">
                                RGUKT Ongole Presents
                            </p>
                            <h1 className="text-[16vw] lg:text-[10rem] font-black tracking-tighter leading-[0.75] uppercase italic">
                                <span className="block text-white hero-text-glow">ORNATE</span>
                                <span className="block text-violet-600">2K26</span>
                            </h1>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-xl mx-auto lg:mx-0 border-l-2 border-violet-600 pl-6 text-left"
                        >
                            <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed">
                                "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                            </p>
                            <p className="mt-4 text-violet-500 font-black text-xs uppercase tracking-[0.4em]">
                                March 28 — 30
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-center lg:justify-start"
                        >
                            <motion.a 
                                href={leaveLetter} download 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(124,58,237,0.4)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10">Download Brochure</span>
                                <Download size={18} className="relative z-10 animate-bounce" />
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: COUNTDOWN (ALIGNED IN WEB) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center lg:justify-end w-full"
                    >
                        <div className="relative group">
                            {/* Decorative Rotating Ring around Countdown */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-10 border border-dashed border-violet-500/20 rounded-full hidden lg:block"
                            />
                            
                            <div className="backdrop-blur-2xl bg-white/[0.03] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative z-10 scale-90 md:scale-100 lg:scale-110">
                                <h3 className="text-center text-[10px] font-black tracking-[0.5em] text-violet-500 uppercase mb-8">Fest Starts In</h3>
                                <Countdown />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ... REMAINDER OF SECTIONS (Philosophy, Arenas, Event rows) REMAIN THE SAME BUT WITH ADDED SNAP ... */}
            
            {/* Arenas Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-20">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase italic">Arenas<span className="text-violet-500">.</span></h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deptMetadata.map((dept) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div whileHover={{ y: -10 }} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 group relative overflow-hidden h-[400px] flex flex-col">
                                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${dept.color} blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity`} />
                                <div className="p-4 bg-violet-600/10 rounded-2xl text-violet-500 w-fit mb-8">{dept.icon}</div>
                                <h3 className="text-3xl font-medium mb-4 uppercase italic">{dept.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{dept.desc}</p>
                                <div className="mt-auto flex items-center gap-2 text-violet-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                                    Enter Arena <ArrowUpRight size={14} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Event Collections (Spotify Rows) */}
            <section className="py-32 bg-white/[0.01]">
                {deptMetadata.map((dept) => {
                    const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                    if (filteredEvents.length === 0) return null;
                    return (
                        <div key={dept.id} className="mb-32">
                            <div className="flex items-center justify-between px-6 md:px-20 mb-10">
                                <h3 className="text-2xl md:text-4xl font-medium italic uppercase tracking-tighter">{dept.name}</h3>
                                <Link to={`/department/${dept.id}`} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest">See All</Link>
                            </div>
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar px-6 md:px-20 pb-10">
                                {filteredEvents.map((ev) => (
                                    <Link to={`/event/${ev._id}`} key={ev._id} className="min-w-[85vw] md:min-w-[450px] snap-start">
                                        <div className="h-full bg-white/[0.03] p-10 rounded-[3rem] border border-white/5 hover:border-violet-500/40 transition-all flex flex-col">
                                            <div className="flex justify-between items-center mb-8">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                                    <Calendar size={12} className="text-violet-500" /> {formatDate(ev.date)}
                                                </div>
                                                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                                            </div>
                                            <h4 className="text-3xl font-medium italic mb-6 line-clamp-1">{ev.name}</h4>
                                            <div className="mt-auto flex gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-2"><Clock size={14} className="text-violet-500" /> {ev.time}</span>
                                                <span className="flex items-center gap-2"><MapPin size={14} className="text-violet-500" /> {ev.venue}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>

            <Sponsors />

            <section className="py-40 text-center relative px-6">
                <div className="max-w-4xl mx-auto">
                    <Quote size={60} className="text-violet-600/20 mx-auto mb-12" />
                    <h2 className="text-2xl md:text-5xl font-medium italic leading-relaxed mb-20">"Ornate 2k26 represents the pinnacle of student ingenuity."</h2>
                    <div className="flex flex-col items-center">
                        <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-28 h-28 object-cover rounded-full border-2 border-violet-500/30 p-1 mb-8" alt="Director" />
                        <h3 className="text-white font-black tracking-[0.3em] uppercase text-sm">Dr. A V S S Kumara Swami Gupta</h3>
                        <p className="text-violet-400 text-[10px] font-black tracking-[0.4em] uppercase">Director, RGUKT ONGOLE</p>
                    </div>
                </div>
            </section>
        </div>
    );
}