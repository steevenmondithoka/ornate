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

const deptMetadata = [
    { id: "all", name: "General Arena", icon: <Sparkles />, color: "from-violet-500", desc: "Common challenges for all branches." },
    { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500", desc: "The digital frontier of innovation." },
    { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500", desc: "Kinetic energy and precision engineering." },
    { id: "ece", name: "Electronics", icon: <Radio />, color: "from-purple-500", desc: "Signals, systems, and deep-tech." },
    { id: "eee", name: "Electrical", icon: <Zap />, color: "from-yellow-500", desc: "Powering the future of EV and flux." },
    { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500", desc: "Architecting the infrastructure." }
];

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

    return (
        <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .text-glow { text-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
            `}</style>

            {/* --- UPDATES TICKER (MOVED NEAR NAVBAR) --- */}
            <div className="fixed top-[72px] left-0 w-full z-[100] bg-black/50 backdrop-blur-md border-b border-white/5">
                <UpdatesTicker />
            </div>

            {/* 1. HERO SECTION (RESTRUCTURED FOR MOBILE) */}
            <section className="relative min-h-screen flex flex-col pt-32 md:pt-40 pb-20 px-6 md:px-20 overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2] 
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="w-full h-full bg-gradient-to-br from-violet-900/20 via-transparent to-transparent"
                    />
                </div>

                <div className="relative z-10 w-full flex flex-col h-full justify-between">
                    {/* TOP: MAIN TITLE */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4">
                            RGUKT Ongole Presents
                        </p>
                        <h1 className="text-[18vw] md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase flex flex-col">
                            <motion.span 
                                initial={{ x: -50 }} animate={{ x: 0 }}
                                className="text-white text-glow"
                            >
                                ORNATE
                            </motion.span>
                            <motion.span 
                                initial={{ x: 50 }} animate={{ x: 0 }}
                                className="text-violet-600 opacity-90"
                            >
                                2K26
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* BOTTOM: INFO + CTA + COUNTDOWN */}
                    <div className="mt-12 md:mt-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <div className="space-y-8 max-w-xl">
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="border-l-2 border-violet-600 pl-6"
                            >
                                <p className="text-gray-400 text-base md:text-xl font-light italic leading-relaxed">
                                    "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                                </p>
                                <p className="mt-4 text-violet-500 font-black text-xs uppercase tracking-[0.3em]">
                                    March 28 — 30, 2026
                                </p>
                            </motion.div>

                            <motion.a 
                                href={leaveLetter} download 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-4 bg-violet-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(124,58,237,0.3)] transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10">Download Brochure</span>
                                <Download size={18} className="relative z-10 animate-bounce" />
                            </motion.a>
                        </div>

                        {/* COUNTDOWN (ALWAYS VISIBLE NOW) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="backdrop-blur-xl bg-white/[0.03] p-6 md:p-8 rounded-[2.5rem] border border-white/10 shadow-2xl scale-90 md:scale-110">
                                <Countdown />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. PHILOSOPHY SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter italic mb-8">The Philosophy.</h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                            Ornate is an ecosystem where deep-tech meets expressive art. We curate events that challenge intellectual boundaries.
                        </p>
                        <div className="flex gap-10">
                            <div>
                                <p className="text-3xl font-bold">50+</p>
                                <p className="text-[10px] uppercase text-gray-500 tracking-widest">Events</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">10K+</p>
                                <p className="text-[10px] uppercase text-gray-500 tracking-widest">Reach</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white/[0.02] p-10 md:p-16 rounded-[3rem] border border-white/5 relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FileText size={40} className="text-violet-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">EVENT BLUEPRINT</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Access guidelines, prize pools, and detailed rulebooks.</p>
                        <a href={leaveLetter} download className="text-violet-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                            PDF GUIDE <ChevronRight size={16} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* 3. DEPARTMENTAL ARENAS */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase italic">Arenas<span className="text-violet-500">.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {deptMetadata.map((dept) => (
                            <Link key={dept.id} to={`/department/${dept.id}`}>
                                <motion.div 
                                    whileHover={{ y: -10 }}
                                    className="relative h-[350px] md:h-[400px] p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden group transition-all"
                                >
                                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${dept.color} blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity`} />
                                    <div className="p-4 bg-violet-600/10 rounded-2xl text-violet-500 w-fit mb-8">{dept.icon}</div>
                                    <h3 className="text-3xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic">{dept.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{dept.desc}</p>
                                    <div className="mt-auto flex items-center gap-2 text-violet-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                                        Explore Arena <ArrowUpRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SPOTIFY STYLE EVENT ROWS */}
            <section className="py-32 bg-white/[0.01]">
                <div className="max-w-full mx-auto">
                    <h2 className="text-[10px] font-black tracking-[1em] uppercase text-center text-gray-600 mb-20 px-6">The Event Directory</h2>

                    <div className="space-y-32">
                        {deptMetadata.map((dept) => {
                            const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                            if (filteredEvents.length === 0) return null;

                            return (
                                <div key={dept.id} className="relative group/row">
                                    <div className="flex items-center justify-between mb-8 px-6 md:px-20">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-8 bg-violet-600" />
                                            <h3 className="text-2xl md:text-4xl font-medium italic text-white uppercase">{dept.name}</h3>
                                        </div>
                                        <Link to={`/department/${dept.id}`} className="text-[10px] font-bold text-gray-500 hover:text-violet-500 uppercase tracking-widest transition-colors">View All</Link>
                                    </div>

                                    {/* Horizontal Scrolling Area */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-10 px-6 md:px-20">
                                        {filteredEvents.map((ev) => (
                                            <Link 
                                                to={`/event/${ev._id}`} 
                                                key={ev._id}
                                                className="min-w-[85vw] md:min-w-[450px] snap-start"
                                            >
                                                <motion.div 
                                                    whileHover={{ y: -5 }}
                                                    className="h-full bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 hover:border-violet-600/30 transition-all flex flex-col"
                                                >
                                                    <div className="flex justify-between items-center mb-8">
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={12} className="text-violet-500" />
                                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{formatDate(ev.date)}</span>
                                                        </div>
                                                        <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                                                    </div>

                                                    <h4 className="text-3xl md:text-4xl font-medium italic text-white mb-6 line-clamp-1">{ev.name}</h4>
                                                    
                                                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-4">
                                                        <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase">
                                                            <Clock size={14} className="text-violet-500" /> {ev.time}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase truncate max-w-[150px]">
                                                            <MapPin size={14} className="text-violet-500" /> {ev.venue}
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

            {/* 5. DIRECTOR'S SECTION */}
            <section className="py-40 px-6 relative overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full" />
                <Quote size={60} className="text-violet-600/20 mx-auto mb-12" />
                <motion.h2 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    className="text-2xl md:text-5xl font-medium italic leading-relaxed text-white mb-20 max-w-4xl mx-auto"
                >
                    "Ornate 2k26 represents the pinnacle of student ingenuity."
                </motion.h2>

                <div className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full border-2 border-violet-500/50 p-1 mb-8 shadow-2xl">
                        <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-full h-full object-cover rounded-full" alt="Director" />
                    </div>
                    <h3 className="text-white font-black tracking-[0.3em] uppercase text-sm mb-2">Dr. A V S S Kumara Swami Gupta</h3>
                    <p className="text-violet-400 text-[10px] font-black tracking-[0.4em] uppercase">Director, RGUKT ONGOLE</p>
                </div>
            </section>
        </div>
    );
}