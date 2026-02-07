import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Countdown from '../components/Countdown';
import { 
    Cpu, Settings, Zap, Building2, Radio, Quote, ArrowUpRight, 
    Calendar, MapPin, Sparkles, FileText, Download, Clock, 
    ChevronRight, Globe, Terminal, Award, Users 
} from 'lucide-react';
import Sponsors from './Sponsors';
import leaveLetter from '../assets/Steeven_Leave_letter.pdf';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

// --- SUB-COMPONENT: ADVANCED BACKGROUND ANIMATION ---
const JavaCodeRain = () => {
    const snippets = [
        "System.out.println('RGUKT');", "public class Ornate {", 
        "while(festActive) { celebrate(); }", "import java.util.*;", 
        "event.start();", "int prize = 50000;", "@Override", "Scanner sc = new Scanner();"
    ];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] flex justify-around">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                    className="flex flex-col text-violet-500 font-mono text-[10px] whitespace-nowrap leading-loose"
                >
                    {Array(20).fill(0).map((_, j) => (
                        <span key={j} className="mb-4">{snippets[Math.floor(Math.random() * snippets.length)]}</span>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const deptMetadata = [
        { id: "all", name: "General Arena", icon: <Sparkles />, color: "from-violet-500", desc: "Common challenges for all branches." },
        { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500", desc: "The digital frontier of innovation." },
        { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500", desc: "Kinetic energy and precision engineering." },
        { id: "ece", name: "Electronics", icon: <Radio />, color: "from-purple-500", desc: "Signals, systems, and deep-tech." },
        { id: "eee", name: "Electrical", icon: <Zap />, color: "from-yellow-500", desc: "Powering the future of EV and flux." },
        { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500", desc: "Architecting the infrastructure." }
    ];

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
            {/* Global Styles for Custom Components */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { text-shadow: 0 0 30px rgba(139, 92, 246, 0.4); }
                .glass-card { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05); }
            `}</style>

            {/* --- 1. UPDATES TICKER (DOCK NEAR NAVBAR) --- */}
            <div className="fixed top-[65px] left-0 w-full z-[100] bg-black/40 backdrop-blur-md border-b border-white/5">
                <UpdatesTicker />
            </div>

            {/* --- 2. HERO SECTION (ALIGNED & RESPONSIVE) --- */}
            <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 md:px-20 overflow-hidden">
                <JavaCodeRain />
                
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-2 items-center">
                    
                    {/* Content Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                        className="text-center lg:text-left space-y-8"
                    >
                        <div>
                            <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">RGUKT Ongole Presents</p>
                            <h1 className="text-[15vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col italic">
                                <span className="text-white text-glow">ORNATE</span>
                                <span className="text-violet-600">2K26</span>
                            </h1>
                        </div>

                        <div className="max-w-lg mx-auto lg:mx-0 border-l-2 border-violet-600 pl-6 text-left">
                            <p className="text-gray-400 text-base md:text-lg font-light italic leading-relaxed">
                                "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                            </p>
                            <div className="mt-4 flex items-center gap-4 text-violet-400 font-black text-[10px] uppercase tracking-[0.4em]">
                                <Calendar size={14} /> MARCH 28 — 30
                            </div>
                        </div>

                        <motion.a 
                            href={leaveLetter} download whileHover={{ scale: 1.05 }}
                            className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(124,58,237,0.3)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10">Download Brochure</span>
                            <Download size={18} className="relative z-10 animate-bounce" />
                        </motion.a>
                    </motion.div>

                    {/* Countdown Column */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="glass-card p-10 md:p-14 rounded-[4rem] relative group">
                            <div className="absolute -inset-4 bg-violet-600/5 rounded-[4.5rem] blur-2xl group-hover:bg-violet-600/10 transition-all" />
                            <h3 className="text-center text-[10px] font-black tracking-[0.6em] text-violet-500 uppercase mb-10">Launch Protocol</h3>
                            <Countdown />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 3. STATS SECTION --- */}
            <section className="py-20 px-6 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Technical Events", val: "50+", icon: <Terminal /> },
                        { label: "Cultural Acts", val: "20+", icon: <Sparkles /> },
                        { label: "Total Reach", val: "10K+", icon: <Users /> },
                        { label: "Prize Pool", val: "100K", icon: <Award /> }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-2 group">
                            <div className="text-violet-500 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <h4 className="text-3xl font-bold text-white tracking-tighter">{stat.val}</h4>
                            <p className="text-[10px] uppercase text-gray-500 tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. ARENAS GRID --- */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-20">
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase italic">Arenas<span className="text-violet-500">.</span></h2>
                        <Link to="/events" className="text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors tracking-[0.4em] mb-4">View Full Directory</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deptMetadata.map((dept) => (
                            <Link key={dept.id} to={`/department/${dept.id}`}>
                                <motion.div whileHover={{ y: -10 }} className="p-10 glass-card rounded-[3rem] group relative overflow-hidden h-[400px] flex flex-col">
                                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${dept.color} blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity`} />
                                    <div className="p-4 bg-violet-600/10 rounded-2xl text-violet-500 w-fit mb-8">{dept.icon}</div>
                                    <h3 className="text-3xl font-medium mb-4 uppercase italic group-hover:text-violet-400 transition-colors">{dept.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{dept.desc}</p>
                                    <div className="mt-auto flex items-center gap-2 text-violet-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                                        Explore Events <ArrowUpRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. SPOTIFY EVENT ROWS --- */}
            <section className="py-32 bg-white/[0.01]">
                <h2 className="text-[11px] font-black tracking-[1em] uppercase text-center text-gray-600 mb-24">Collections</h2>
                <div className="space-y-32">
                    {deptMetadata.map((dept) => {
                        const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                        if (filteredEvents.length === 0) return null;
                        return (
                            <div key={dept.id} className="relative group/row">
                                <div className="flex items-center justify-between mb-10 px-6 md:px-20 max-w-7xl mx-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-12 bg-violet-600/50" />
                                        <h3 className="text-2xl md:text-4xl font-medium italic uppercase tracking-tighter">{dept.name}</h3>
                                    </div>
                                    <Link to={`/department/${dept.id}`} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">See All</Link>
                                </div>
                                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar px-6 md:px-20 pb-12">
                                    {filteredEvents.map((ev) => (
                                        <Link to={`/event/${ev._id}`} key={ev._id} className="min-w-[85vw] md:min-w-[480px] snap-start">
                                            <div className="h-full glass-card p-10 md:p-14 rounded-[3.5rem] hover:bg-violet-600/[0.03] transition-all flex flex-col group/card border border-white/5 hover:border-violet-500/30 shadow-2xl">
                                                <div className="flex justify-between items-center mb-10">
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                                        <Calendar size={12} className="text-violet-500" /> {formatDate(ev.date)}
                                                    </div>
                                                    <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                                                </div>
                                                <h4 className="text-4xl font-medium italic mb-8 line-clamp-1 group-hover/card:text-violet-400 transition-colors">{ev.name}</h4>
                                                <div className="mt-auto flex flex-wrap gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl"><Clock size={14} className="text-violet-500" /> {ev.time}</span>
                                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl"><MapPin size={14} className="text-violet-500" /> {ev.venue}</span>
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

            {/* --- 6. DIRECTOR'S MESSAGE --- */}
            <section className="py-40 px-6 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.05),_transparent)]" />
                <Quote size={60} className="text-violet-600/20 mx-auto mb-12" />
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-2xl md:text-5xl font-medium italic leading-relaxed text-white mb-24 max-w-4xl mx-auto">
                    "Ornate 2k26 represents the pinnacle of student ingenuity and our commitment to excellence."
                </motion.h2>
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-2 border-violet-500/50 p-1 mb-8 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                        <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-full h-full object-cover rounded-full" alt="Director" />
                    </div>
                    <h3 className="text-white font-black tracking-[0.3em] uppercase text-sm mb-2">Dr. A V S S Kumara Swami Gupta</h3>
                    <p className="text-violet-400 text-[10px] font-black tracking-[0.4em] uppercase">Director, RGUKT ONGOLE</p>
                </div>
            </section>
        </div>
    );
}