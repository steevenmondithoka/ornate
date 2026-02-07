import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Calendar, AlertCircle, Train, Rocket, Cpu, Zap, HardHat, Code, ChevronRight, Settings } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// --- ADVANCED PURE ANIMATION SCENERY ---

const CSEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(139,92,246,0.1)_0%,_transparent_50%)]" />
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                animate={{ 
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-1 h-1 bg-violet-500 rounded-full shadow-[0_0_10px_#8b5cf6]"
            />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-20">
            <motion.path
                d="M0 100 L200 300 L400 100 L600 500 L800 200 L1200 600"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity }}
            />
        </svg>
    </div>
);

const MechVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-30">
        <div className="relative w-full h-full">
            {/* Rotating Large Gear */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -bottom-20 text-white/10"
            >
                <Settings size={600} strokeWidth={0.5} />
            </motion.div>
            
            {/* Interlocking Small Gear */}
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute right-[400px] -bottom-10 text-violet-500/20"
            >
                <Settings size={300} strokeWidth={1} />
            </motion.div>

            {/* Piston Animation */}
            <div className="absolute left-20 bottom-0 flex gap-4">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [100, 300, 100] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="w-8 bg-gradient-to-t from-violet-600/40 to-transparent rounded-t-full"
                    />
                ))}
            </div>
        </div>
    </div>
);

const ECEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-blue-500/5 rounded-full" />
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] -translate-x-1/2 -translate-y-1/2"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Rocket className="text-blue-400/40 rotate-45" size={40} />
                <div className="w-1 h-20 bg-gradient-to-t from-blue-500/20 to-transparent" />
            </div>
        </motion.div>
        {/* Pulsing signal waves */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-blue-400/30 rounded-full"
            />
        ))}
    </div>
);

const EEEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-40">
        <motion.div
            animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative"
        >
            <div className="w-80 h-80 rounded-full border-4 border-cyan-500/10 shadow-[0_0_100px_rgba(6,182,212,0.1)] flex items-center justify-center">
                <div className="w-60 h-60 rounded-full border-2 border-cyan-400/20 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            {/* Plasma Spark Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        x: [0, (Math.random() - 0.5) * 400], 
                        y: [0, (Math.random() - 0.5) * 400],
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 shadow-[0_0_8px_cyan]"
                />
            ))}
        </motion.div>
    </div>
);

const CivilVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full">
            {/* Grid Floor */}
            <pattern id="civilGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#civilGrid)" />

            {/* Skyscrapers Growing */}
            {[100, 300, 500, 700, 900].map((x, i) => (
                <motion.path
                    key={i}
                    d={`M ${x} 1000 L ${x} ${400 + Math.random() * 300} L ${x + 60} ${400 + Math.random() * 300} L ${x + 60} 1000`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
            ))}
        </svg>
    </div>
);

const hodMetadata = {
    cse: { fullName: "Computer Science", vibe: <CSEVibe />, icon: <Code /> },
    mech: { fullName: "Mechanical Engg", vibe: <MechVibe />, icon: <Settings /> },
    ece: { fullName: "Electronics & Comm", vibe: <ECEVibe />, icon: <Rocket /> },
    eee: { fullName: "Electrical Engg", vibe: <EEEVibe />, icon: <Zap /> },
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
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchDeptEvents();
    }, [id]);

    const eventRows = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < events.length; i += 10) {
            chunks.push(events.slice(i, i + 10));
        }
        return chunks;
    }, [events]);

    return (
        <div className="relative pt-24 md:pt-32 pb-20 bg-[#030014] min-h-screen overflow-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Background Animation Layer */}
            <AnimatePresence mode="wait">
                <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0">
                    {info.vibe}
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 px-4 md:px-10 max-w-full mx-auto">
                <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12 hover:gap-4 transition-all w-fit group">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 md:mb-32">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-violet-600/10 rounded-[2rem] text-violet-500 border border-violet-500/20 backdrop-blur-xl">
                            {info.icon}
                        </div>
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[9px] md:text-[11px] uppercase">Department Arena</p>
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
                                        <div className="flex items-center gap-2 text-gray-600 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">
                                            Swipe <ChevronRight size={14} className="text-violet-500" />
                                        </div>
                                    </div>

                                    {/* Horizontal Scrolling Area */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-12 no-scrollbar px-2">
                                        {row.map((event) => (
                                            <div key={event._id} className="min-w-[85vw] md:min-w-[500px] snap-start">
                                                <Link to={`/event/${event._id}`}>
                                                    <motion.div
                                                        whileHover={{ y: -10, scale: 1.02 }}
                                                        className="group relative h-full p-px rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-white/10 hover:bg-violet-600/30 transition-all duration-700 shadow-2xl"
                                                    >
                                                        <div className="relative h-full w-full bg-[#050508]/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-10 md:p-14 z-10 flex flex-col border border-white/5">
                                                            <div className="flex justify-between items-center mb-10">
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
                                                                {event.description || "The convergence of innovation and excellence..."}
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
                            <div className="text-center py-40 border border-white/5 rounded-[4rem]">
                                <AlertCircle className="text-gray-800 mx-auto mb-6" size={60} />
                                <p className="text-gray-600 font-mono text-sm uppercase tracking-[0.5em]">No Events Found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}