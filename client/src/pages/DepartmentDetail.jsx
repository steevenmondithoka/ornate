import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Calendar, AlertCircle, Train, Rocket, Cpu, Zap, HardHat, Code, ChevronRight, Settings, Globe } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// --- ADVANCED RESPONSIVE ANIMATIONS ---

const CSEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-around opacity-30">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ 
                    duration: Math.random() * 2 + 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 2 
                }}
                className="flex flex-col text-violet-500 font-mono text-[10px] md:text-sm"
                style={{ opacity: Math.random() * 0.5 + 0.2 }}
            >
                {Array(25).fill(0).map((_, j) => (
                    <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                ))}
                <span>System.out.println("RGUKT ONGOLE")</span>
                <span>EXEC</span>
            </motion.div>
        ))}
    </div>
);

const MechVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 text-white"
        >
            <Settings size={window.innerWidth < 768 ? 300 : 600} strokeWidth={0.5} />
        </motion.div>
        <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute right-20 top-20 text-violet-500"
        >
            <Settings size={window.innerWidth < 768 ? 150 : 300} strokeWidth={1} />
        </motion.div>
    </div>
);

const CivilVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full">
            <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <motion.path
                d="M 100 500 L 300 300 L 500 500 L 700 300 L 900 500"
                stroke="white"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            />
        </svg>
    </div>
);

const ECEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative w-full h-full">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] -translate-x-1/2 -translate-y-1/2 border border-blue-500/20 rounded-full"
            >
                <Rocket className="text-blue-400 absolute -top-5 left-1/2 -translate-x-1/2 rotate-45" size={32} />
            </motion.div>
        </div>
    </div>
);

const EEEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                animate={{ 
                    x: ["-10vw", "110vw"],
                    y: [`${20 * i}%`, `${20 * i + 10}%`, `${20 * i}%`] 
                }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                className="h-[2px] w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan]"
            />
        ))}
    </div>
);

const AllVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Prismatic Convergence */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.4, 0.1]
                    }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-dashed rounded-full"
                    style={{ 
                        width: `${(i + 1) * 15}vw`, 
                        height: `${(i + 1) * 15}vw`,
                        left: `-${((i + 1) * 15) / 2}vw`,
                        top: `-${((i + 1) * 15) / 2}vw`,
                        borderColor: i % 2 === 0 ? '#8b5cf6' : '#ec4899'
                    }}
                />
            ))}
        </div>
        <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030014_80%)]"
        />
    </div>
);

const hodMetadata = {
    cse: { fullName: "Computer Science", vibe: <CSEVibe />, icon: <Code /> },
    mech: { fullName: "Mechanical Engineering", vibe: <MechVibe />, icon: <Settings /> },
    ece: { fullName: "Electronics & Communication", vibe: <ECEVibe />, icon: <Rocket /> },
    eee: { fullName: "Electrical & Electronics", vibe: <EEEVibe />, icon: <Zap /> },
    civil: { fullName: "Civil Engineering", vibe: <CivilVibe />, icon: <HardHat /> },
    all: { fullName: "The General Arena", vibe: <AllVibe />, icon: <Globe /> }
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
            
            {/* Immersive Vibe Layer */}
            <AnimatePresence mode="wait">
                <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0">
                    {info.vibe}
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 px-4 md:px-10 max-w-full mx-auto">
                <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12 hover:gap-4 transition-all w-fit group">
                    <ArrowLeft size={16} /> Back to Arenas
                </Link>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 md:mb-32">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-violet-600/10 rounded-3xl text-violet-500 border border-violet-500/20 backdrop-blur-3xl shadow-2xl">
                            {info.icon}
                        </div>
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[9px] md:text-[11px] uppercase">Official Venue</p>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-medium tracking-tighter italic text-white uppercase leading-[0.85] drop-shadow-2xl">
                        {info.fullName}<span className="text-violet-600">.</span>
                    </h1>
                </motion.div>

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
                                        <div className="flex items-center gap-4">
                                            <span className="text-violet-500 font-mono font-bold">0{rowIndex + 1}</span>
                                            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em]">
                                                {info.fullName} Collection
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            Swipe <ChevronRight size={14} className="text-violet-500" />
                                        </div>
                                    </div>

                                    {/* Spotify Style Swiper */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-12 pb-12 no-scrollbar px-2">
                                        {row.map((event) => (
                                            <div key={event._id} className="min-w-[85vw] md:min-w-[500px] snap-start">
                                                <Link to={`/event/${event._id}`}>
                                                    <motion.div
                                                        whileHover={{ y: -15, scale: 1.02 }}
                                                        className="group relative h-full p-px rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-white/5 hover:bg-violet-600/30 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                                                    >
                                                        <div className="relative h-full w-full bg-[#050508]/90 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 z-10 flex flex-col border border-white/5">
                                                            <div className="flex justify-between items-center mb-10">
                                                                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full">
                                                                    <Calendar size={14} className="text-violet-500" />
                                                                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{formatDate(event.date)}</span>
                                                                </div>
                                                                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                                                            </div>

                                                            <div className="mb-10">
                                                                <p className="text-violet-400 font-bold text-[11px] tracking-[0.4em] uppercase mb-4 opacity-60">Featured Event</p>
                                                                <h3 className="text-4xl md:text-6xl font-medium italic text-white leading-[1] group-hover:text-violet-400 transition-colors">
                                                                    {event.name}
                                                                </h3>
                                                            </div>

                                                            <p className="text-gray-500 text-sm md:text-lg italic leading-relaxed mb-14 line-clamp-3">
                                                                {event.description || "The convergence of innovation and excellence..."}
                                                            </p>

                                                            <div className="mt-auto flex flex-wrap gap-4">
                                                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                                                    <Clock size={16} className="text-violet-400" />
                                                                    <span className="text-[13px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                                                                    <MapPin size={16} className="text-violet-400" />
                                                                    <span className="text-[11px] text-gray-300 font-bold uppercase truncate max-w-[150px]">{event.venue}</span>
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
                                <p className="text-gray-600 font-mono text-sm uppercase tracking-[0.5em]">No Events Published</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}