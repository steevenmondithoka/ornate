import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Calendar, AlertCircle, Train, Rocket, Cpu, Zap, HardHat, Code, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// --- HIGH IMPACT VIBE COMPONENTS ---

const CSEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -500, x: `${Math.random() * 100}%` }}
                animate={{ y: 1000 }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                className="text-violet-500/60 font-mono text-[10px] md:text-sm whitespace-nowrap"
                style={{ writingMode: 'vertical-rl' }}
            >
                {Array(20).fill(0).map(() => Math.floor(Math.random() * 2)).join('')}
                SYSTEM.EXECUTE(ORANTE_2026);
                DEPLOY_BLOCKCHAIN_V3;
            </motion.div>
        ))}
    </div>
);

const MechVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Realistic Rail Track */}
        <div className="absolute bottom-[15%] w-full h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        <div className="absolute bottom-[14%] w-full h-[1px] bg-white/10" />
        
        {/* Vande Bharat Train */}
        <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[14.5%] flex items-end"
        >
            <div className="relative">
                <img 
                    src="https://images.indianexpress.com/2025/08/Vande-Bharat-7.jpg" 
                    alt="Vande Bharat" 
                    className="h-20 md:h-32 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
                {/* Speed Lines */}
                <div className="absolute -left-20 top-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent to-white/40" />
            </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
    </div>
);

const ECEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moon Surface Background */}
        <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://lnmiit.ac.in/wp-content/uploads/2023/07/image-8.png')] bg-cover bg-center opacity-30 grayscale"
        />
        {/* Chandrayaan / Satellite */}
        <motion.div
            initial={{ x: -200, y: 400, rotate: 0 }}
            animate={{ 
                x: ["0vw", "100vw"], 
                y: [400, 100, 400],
                rotate: [0, 20, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-0"
        >
            <div className="relative">
                <Rocket size={60} className="text-white/60 -rotate-45" />
                <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-orange-500/40 rounded-full blur-xl"
                />
            </div>
            <p className="text-[9px] text-white/40 tracking-[0.5em] mt-4 uppercase font-black">Chandrayaan-3 Mission</p>
        </motion.div>
    </div>
);

const EEEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <svg className="w-full h-full">
            <motion.path
                d="M 0 100 Q 250 50 500 100 T 1000 100 T 1500 100"
                fill="none"
                stroke="url(#sparkGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
        {/* Pulsing Energy Coils */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
    </div>
);

const CivilVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 grayscale" />
        {/* Animated Blueprints */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
            <motion.path
                d="M 100 100 L 400 100 L 400 400 L 100 400 Z M 100 250 L 400 250 M 250 100 L 250 400"
                fill="none"
                stroke="white"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle 
                cx="250" cy="250" r="100" 
                fill="none" stroke="white" strokeWidth="0.5" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity }}
            />
        </svg>
    </div>
);

const hodMetadata = {
    cse: { fullName: "Computer Science", vibe: <CSEVibe />, icon: <Code /> },
    mech: { fullName: "Mechanical Engineering", vibe: <MechVibe />, icon: <Train /> },
    ece: { fullName: "Electronics & Communication", vibe: <ECEVibe />, icon: <Rocket /> },
    eee: { fullName: "Electrical & Electronics", vibe: <EEEVibe />, icon: <Zap /> },
    civil: { fullName: "Civil Engineering", vibe: <CivilVibe />, icon: <HardHat /> },
    all: { fullName: "General Arena", vibe: <CSEVibe />, icon: <Zap /> }
};

export default function DepartmentDetail() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const info = hodMetadata[id] || hodMetadata.all;

    useEffect(() => {
        const fetchDeptEvents = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://ornate-evkf.onrender.com/api/events`);
                const filtered = res.data.filter(ev => ev.dept === id || ev.dept === 'all');
                setEvents(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeptEvents();
    }, [id]);

    // Spotify-style chunking
    const eventRows = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < events.length; i += 10) {
            chunks.push(events.slice(i, i + 10));
        }
        return chunks;
    }, [events]);

    return (
        <div className="relative pt-32 pb-20 bg-[#030014] min-h-screen overflow-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {info.vibe}
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 px-4 md:px-10 max-w-full mx-auto">
                <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12 hover:gap-4 transition-all w-fit group">
                    <ArrowLeft size={16} /> Back to Arena
                </Link>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 px-2"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-violet-600/20 rounded-3xl text-violet-500 border border-violet-500/20 backdrop-blur-xl">
                            {info.icon}
                        </div>
                        <div className="h-px w-20 bg-violet-500/30" />
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase">Department Arena</p>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-medium tracking-tighter italic text-white uppercase leading-[0.85]">
                        {info.fullName}<span className="text-violet-600">.</span>
                    </h1>
                </motion.div>

                {/* Spotify Rows */}
                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-32">
                        {eventRows.length > 0 ? (
                            eventRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="relative group/row">
                                    <div className="flex items-center justify-between mb-8 px-2">
                                        <h3 className="text-white/30 font-black text-[10px] uppercase tracking-[0.5em]">
                                            {info.fullName} Collection — 0{rowIndex + 1}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600 text-[9px] font-bold uppercase tracking-widest">
                                            Swipe <ChevronRight size={14} className="text-violet-500" />
                                        </div>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-12 no-scrollbar px-2">
                                        {row.map((event) => (
                                            <div key={event._id} className="min-w-[85vw] md:min-w-[500px] snap-start">
                                                <Link to={`/event/${event._id}`}>
                                                    <motion.div
                                                        whileHover={{ y: -10 }}
                                                        className="group relative h-full p-px rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-white/10 hover:bg-violet-600/30 transition-all duration-700 shadow-2xl"
                                                    >
                                                        <div className="relative h-full w-full bg-[#050508]/90 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-10 md:p-14 z-10 flex flex-col">
                                                            <div className="flex justify-between items-center mb-12">
                                                                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                                                    <Calendar size={12} className="text-violet-500" />
                                                                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{formatDate(event.date)}</span>
                                                                </div>
                                                                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                                                            </div>

                                                            <div className="mb-8">
                                                                <p className="text-violet-500 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 opacity-60">Featured Event</p>
                                                                <h3 className="text-3xl md:text-5xl font-medium italic text-white leading-[1.1] group-hover:text-violet-400 transition-colors">
                                                                    {event.name}
                                                                </h3>
                                                            </div>

                                                            <p className="text-gray-500 text-sm md:text-base italic leading-relaxed mb-12 line-clamp-3">
                                                                {event.description || "The convergence of innovation and culture..."}
                                                            </p>

                                                            <div className="mt-auto flex flex-wrap gap-4">
                                                                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl border border-white/5">
                                                                    <Clock size={16} className="text-violet-400" />
                                                                    <span className="text-[12px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl border border-white/5 max-w-[200px]">
                                                                    <MapPin size={16} className="text-violet-400" />
                                                                    <span className="text-[11px] text-gray-300 font-bold uppercase truncate">{event.venue}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem]">
                                <AlertCircle className="text-gray-800 mx-auto mb-6" size={60} />
                                <p className="text-gray-600 font-mono text-xs uppercase tracking-[0.5em]">Zero Events Published</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}