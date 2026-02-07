import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Calendar, AlertCircle, Train, Rocket, Cpu, Zap, HardHat, Code, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// --- ADVANCED IMMERSIVE SCENERY ---

const CSEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="grid grid-cols-12 gap-2 opacity-20 h-full w-full">
            {[...Array(48)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -20, 0] }}
                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    className="h-full w-px bg-gradient-to-b from-transparent via-violet-500 to-transparent"
                />
            ))}
        </div>
        <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://assets.skyfilabs.com/images/blog/best-winter-training-programs-for-computer-science.jpg')]" 
        />
    </div>
);

const MechVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 3D Perspective Track */}
        <div className="absolute bottom-0 w-full h-[40vh] bg-[#050508]" style={{ perspective: '1000px' }}>
            <motion.div 
                initial={{ rotateX: 60, y: 0 }}
                className="w-full h-full border-t-2 border-white/5 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)] bg-[length:100px_100px]"
            />
        </div>
        
        {/* Vande Bharat - High Fidelity Cutout */}
        <motion.div
            initial={{ x: "-150%", scale: 0.8 }}
            animate={{ x: "150%", scale: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeIn" }}
            className="absolute bottom-[10%] z-20"
        >
            <div className="relative group">
                <img 
                    src="https://m.economictimes.com/thumb/msid-125177690,width-1600,height-900,resizemode-4,imgsize-637057/pm-modi-flags-off-four-new-vande-bharat-express-trains-to-boost-regional-connectivity.jpg" 
                    alt="Vande Bharat" 
                    className="h-24 md:h-44 w-auto drop-shadow-[0_20px_50px_rgba(124,58,237,0.5)] blur-[0.5px]"
                    onError={(e) => { e.target.src = 'https://i.imgur.com/G5T833Q.png' }} // Fallback
                />
                <div className="absolute -bottom-2 left-0 w-full h-4 bg-violet-600/20 blur-xl animate-pulse" />
            </div>
        </motion.div>

        {/* Speed Blur Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-[#030014] z-10" />
    </div>
);

const ECEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Earth Horizon */}
        <div className="absolute -bottom-[50vh] left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] bg-blue-900/20 rounded-[100%] blur-[100px]" />
        
        {/* Orbiting Satellite */}
        <motion.div
            animate={{ 
                rotate: 360,
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2"
        >
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
            >
                <div className="relative">
                    <Rocket className="text-white/60 rotate-45" size={40} />
                    <div className="absolute inset-0 bg-blue-500/50 blur-2xl rounded-full scale-150" />
                </div>
            </motion.div>
        </motion.div>

        {/* Star Field */}
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: Math.random() }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                className="absolute w-px h-px bg-white rounded-full"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
        ))}
    </div>
);

const CivilVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-[0.03] grayscale" />
        
        {/* Modern wireframe lines */}
        <svg className="absolute inset-0 w-full h-full">
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <motion.path
                d="M 0 800 L 400 400 L 800 600 L 1200 200 L 1600 500"
                fill="none"
                stroke="url(#civilGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="civilGradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

const EEEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#0e1b35_0%,_#030014_100%)]" />
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
            />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent blur-sm" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm" />
        </div>
    </div>
);

const hodMetadata = {
    cse: { fullName: "Computer Science", vibe: <CSEVibe />, icon: <Code /> },
    mech: { fullName: "Mechanical Engg", vibe: <MechVibe />, icon: <Train /> },
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
            
            {/* Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {info.vibe}
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 px-4 md:px-10 max-w-full mx-auto">
                <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12 hover:gap-4 transition-all w-fit group">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>

                {/* Main Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 md:mb-32">
                    <div className="flex items-center gap-3 md:gap-6 mb-6">
                        <div className="p-4 md:p-6 bg-violet-600/10 rounded-[2rem] text-violet-500 border border-violet-500/20 backdrop-blur-3xl shadow-2xl">
                            {info.icon}
                        </div>
                        <div className="space-y-1">
                            <p className="text-violet-500 font-mono tracking-[0.5em] text-[9px] md:text-[11px] uppercase">Official Arena</p>
                            <h2 className="text-white/40 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">RGUKT Ongole</h2>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-medium tracking-tighter italic text-white uppercase leading-[0.85] drop-shadow-2xl">
                        {info.fullName}<span className="text-violet-600">.</span>
                    </h1>
                </motion.div>

                {/* Spotify-Style Horizontal Rows */}
                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-24 md:space-y-40">
                        {eventRows.length > 0 ? (
                            eventRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="relative group/row">
                                    <div className="flex items-center justify-between mb-8 md:mb-12 px-2">
                                        <div className="flex items-center gap-4">
                                            <span className="text-violet-500 font-mono font-bold">0{rowIndex + 1}</span>
                                            <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.3em]">
                                                {info.fullName} Collection
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            Swipe <ChevronRight size={14} className="text-violet-500" />
                                        </div>
                                    </div>

                                    {/* Horizontal Scrolling Area */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-12 pb-12 no-scrollbar px-2">
                                        {row.map((event) => (
                                            <div key={event._id} className="min-w-[85vw] md:min-w-[550px] snap-start">
                                                <Link to={`/event/${event._id}`}>
                                                    <motion.div
                                                        whileHover={{ y: -15, scale: 1.02 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                        className="group relative h-full p-px rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-white/5 hover:bg-violet-600/30 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                                                    >
                                                        {/* High-End Glassmorphism Card */}
                                                        <div className="relative h-full w-full bg-[#08080c]/80 backdrop-blur-[80px] rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 z-10 flex flex-col border border-white/5">
                                                            
                                                            <div className="flex justify-between items-center mb-12">
                                                                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full">
                                                                    <Calendar size={14} className="text-violet-500" />
                                                                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{formatDate(event.date)}</span>
                                                                </div>
                                                                <div className="flex flex-col items-end">
                                                                    <span className="text-[10px] font-black text-violet-500 uppercase">Live</span>
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" />
                                                                </div>
                                                            </div>

                                                            <div className="mb-10">
                                                                <p className="text-violet-400 font-bold text-[11px] tracking-[0.4em] uppercase mb-4">Department Featured</p>
                                                                <h3 className="text-4xl md:text-6xl font-medium italic text-white leading-[1] group-hover:text-violet-400 transition-colors">
                                                                    {event.name}
                                                                </h3>
                                                            </div>

                                                            <p className="text-gray-400 text-sm md:text-lg font-light italic leading-relaxed mb-14 line-clamp-3">
                                                                {event.description || "An immersive experience of engineering excellence and cultural heritage..."}
                                                            </p>

                                                            {/* Card Footer */}
                                                            <div className="mt-auto flex flex-wrap items-center gap-4">
                                                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                                                    <Clock size={16} className="text-violet-400" />
                                                                    <span className="text-[13px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                                                    <MapPin size={16} className="text-violet-400" />
                                                                    <span className="text-[11px] text-gray-300 font-bold uppercase truncate max-w-[150px]">{event.venue}</span>
                                                                </div>
                                                                <div className="ml-auto group-hover:translate-x-2 transition-transform hidden md:block">
                                                                    <div className="w-12 h-12 rounded-full border border-violet-500/50 flex items-center justify-center text-violet-500">
                                                                        <ChevronRight />
                                                                    </div>
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
                            <div className="text-center py-40 border border-white/5 bg-white/[0.01] rounded-[4rem] backdrop-blur-md">
                                <AlertCircle className="text-gray-800 mx-auto mb-6" size={64} />
                                <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.5em]">Arena Currently Empty</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}