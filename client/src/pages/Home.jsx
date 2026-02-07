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
    { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500", desc: "Architecting the infrastructure of 2026." }
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
            `}</style>

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="relative min-h-screen flex items-center px-4 md:px-20 overflow-hidden">
                {/* Background Parallax Image */}
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000" 
                            className="w-full h-full object-cover opacity-30 grayscale"
                            alt="Background"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full pt-20">
                    <div className="absolute top-0 left-0 w-full z-[100]">
                        <UpdatesTicker />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-7xl"
                    >
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-xs md:text-sm uppercase mb-6">
                            RGUKT Ongole Presents
                        </p>
                        <h1 className="text-[15vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] uppercase mb-10">
                            <span className="block text-white">ORNATE</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-400 opacity-90">2K26</span>
                        </h1>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20">
                            <div className="max-w-md border-l-4 border-violet-600 pl-6">
                                <p className="text-gray-400 text-lg md:text-xl font-light italic">
                                    "A premium intersection of high-end technical innovation and avant-garde cultural expressions."
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <span className="text-violet-500 font-black text-xs uppercase tracking-widest">March 28 — 30</span>
                                    <div className="h-px w-20 bg-white/10" />
                                </div>
                            </div>

                            <motion.a 
                                href={leaveLetter} download 
                                whileHover={{ scale: 1.05 }}
                                className="group relative px-8 py-5 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 overflow-hidden shadow-[0_20px_50px_rgba(124,58,237,0.3)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10">Download Brochure</span>
                                <Download size={18} className="relative z-10 animate-bounce" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 right-10 hidden lg:block scale-110">
                    <Countdown />
                </div>
            </section>

            {/* 2. PHILOSOPHY SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter italic mb-8">The Philosophy of <span className="text-violet-500">Ornate.</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                            Ornate is an ecosystem of excellence. We curate events that challenge the intellectual boundaries of engineering students, where deep-tech meets expressive art.
                        </p>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-[10px] uppercase text-gray-500 tracking-widest">Events</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">10K+</p>
                                <p className="text-[10px] uppercase text-gray-500 tracking-widest">Reach</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">20+</p>
                                <p className="text-[10px] uppercase text-gray-500 tracking-widest">Sponsors</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-1 bg-gradient-to-br from-violet-600/50 to-transparent rounded-[3rem]"
                    >
                        <div className="bg-[#050508] p-10 md:p-16 rounded-[3rem] border border-white/5">
                            <FileText size={40} className="text-violet-500 mb-6" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Event Blueprint</h3>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Download the official guide for event structures, prize pools, and rulebooks.</p>
                            <a href={leaveLetter} download className="text-violet-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                Get PDF Copy <ChevronRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. DEPARTMENTAL GRID */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-20">
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase italic">Arenas<span className="text-violet-500">.</span></h2>
                        <p className="text-gray-500 uppercase text-[10px] tracking-[0.5em] hidden md:block">Select your discipline</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deptMetadata.map((dept, i) => (
                            <Link key={dept.id} to={`/department/${dept.id}`}>
                                <motion.div 
                                    whileHover={{ y: -10 }}
                                    className="relative h-[400px] p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden group"
                                >
                                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${dept.color} blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                                    <div className="p-4 bg-violet-600/10 rounded-2xl text-violet-500 w-fit mb-8">{dept.icon}</div>
                                    <h3 className="text-3xl font-medium mb-4 group-hover:text-violet-400 transition-colors uppercase italic">{dept.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{dept.desc}</p>
                                    <div className="mt-auto flex items-center gap-2 text-violet-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                                        Enter Arena <ArrowUpRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE EVENT DIRECTORY (SPOTIFY STYLE) */}
            <section className="py-32 bg-white/[0.01]">
                <div className="max-w-full mx-auto px-6">
                    <h2 className="text-xs font-black tracking-[0.8em] uppercase text-center text-gray-600 mb-24">Event Collections</h2>

                    <div className="space-y-32">
                        {deptMetadata.map((dept) => {
                            const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);
                            if (filteredEvents.length === 0) return null;

                            return (
                                <div key={dept.id} className="relative group/row">
                                    <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-8 bg-violet-600" />
                                            <h3 className="text-2xl md:text-4xl font-medium italic text-white uppercase">{dept.name}</h3>
                                        </div>
                                        <Link to={`/department/${dept.id}`} className="text-[10px] font-bold text-gray-500 hover:text-violet-500 uppercase tracking-widest transition-colors">View All</Link>
                                    </div>

                                    {/* Horizontal Scrolling Area */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-10 px-4 md:px-20">
                                        {filteredEvents.map((ev) => (
                                            <Link 
                                                to={`/event/${ev._id}`} 
                                                key={ev._id}
                                                className="min-w-[85vw] md:min-w-[450px] snap-start"
                                            >
                                                <motion.div 
                                                    whileHover={{ scale: 1.02 }}
                                                    className="h-full bg-[#050508]/80 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 hover:border-violet-600/30 transition-all flex flex-col"
                                                >
                                                    <div className="flex justify-between items-center mb-8">
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={12} className="text-violet-500" />
                                                            <span className="text-[9px] font-black text-white uppercase">{formatDate(ev.date)}</span>
                                                        </div>
                                                        <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" />
                                                    </div>

                                                    <h4 className="text-3xl font-medium italic text-white mb-6 group-hover:text-violet-400 transition-colors line-clamp-1">{ev.name}</h4>
                                                    
                                                    <div className="mt-auto space-y-4">
                                                        <div className="flex flex-wrap gap-3">
                                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl text-gray-300 text-[11px] font-bold uppercase">
                                                                <Clock size={12} className="text-violet-500" /> {ev.time}
                                                            </div>
                                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl text-gray-300 text-[11px] font-bold uppercase truncate max-w-[150px]">
                                                                <MapPin size={12} className="text-violet-500" /> {ev.venue}
                                                            </div>
                                                        </div>
                                                        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-violet-500 font-black text-[9px] uppercase tracking-widest">
                                                            <span>Explore Details</span>
                                                            <ChevronRight size={14} />
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

            {/* 5. SPONSORS */}
            <Sponsors />

            {/* 6. DIRECTOR'S MESSAGE */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Quote size={60} className="text-violet-600/20 mx-auto mb-12" />
                    <motion.h2 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }}
                        className="text-2xl md:text-5xl font-medium italic leading-relaxed text-white mb-20"
                    >
                        "Ornate 2k26 represents the <span className="text-violet-500">pinnacle of student ingenuity</span>. It is a declaration of our institute's commitment to excellence."
                    </motion.h2>

                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-20 scale-125" />
                            <div className="w-28 h-28 rounded-full border-2 border-violet-500/50 p-1">
                                <img src="https://rguktong.ac.in/images/gupta%20sir.jpeg" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" alt="Director" />
                            </div>
                        </div>
                        <h3 className="text-white font-black tracking-[0.3em] uppercase text-sm mb-2">Dr. A V S S Kumara Swami Gupta</h3>
                        <p className="text-violet-400 text-[10px] font-black tracking-[0.4em] uppercase">Director, RGUKT ONGOLE</p>
                    </div>
                </div>
            </section>
        </div>
    );
}