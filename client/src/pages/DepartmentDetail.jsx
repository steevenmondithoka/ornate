import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Calendar, AlertCircle, Train, Rocket, Cpu, Zap, HardHat, Code } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// --- ANIMATION COMPONENTS FOR DEPT VIBES ---

const CSEVibe = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * 100 + "%" }}
                animate={{ y: '100vh' }}
                transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
                className="text-violet-500 font-mono text-xs whitespace-nowrap"
            >
                {"{ data: '010101', status: 'moving' }"}
            </motion.div>
        ))}
    </div>
);

const MechVibe = () => (
    <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-30 pointer-events-none">
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-2"
        >
            <div className="h-4 w-60 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full" />
            <Train size={40} className="text-white" />
            <div className="h-1 w-[2000px] bg-white/20" />
        </motion.div>
        <p className="text-[10px] text-white/40 ml-20 uppercase tracking-[1em] mt-2">Vande Bharat Express</p>
    </div>
);

const ECEVibe = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-20 right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" 
        />
        <motion.div
            initial={{ x: -100, y: 100, rotate: -45 }}
            animate={{ x: '110vw', y: -100 }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/40"
        >
            <Rocket size={40} />
            <p className="text-[8px] mt-2 tracking-widest uppercase">Chandrayaan-3</p>
        </motion.div>
    </div>
);

const EEEVibe = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: i }}
                className="absolute"
                style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}
            >
                <Zap size={100} className="text-blue-400" />
            </motion.div>
        ))}
    </div>
);

const CivilVibe = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center h-full"
        >
            <div className="border-l border-t border-white/20 w-80 h-40 relative">
                <div className="absolute bottom-0 right-0 border-r border-b border-white/20 w-40 h-20" />
            </div>
        </motion.div>
    </div>
);

// Metadata
const hodMetadata = {
    cse: { name: "MalliKarjuna Nandi", fullName: "Computer Science", vibe: <CSEVibe />, icon: <Code /> },
    mech: { name: "Prof. M. K. Varma", fullName: "Mechanical Engg", vibe: <MechVibe />, icon: <Train /> },
    ece: { name: "Dr. P. Venkat Ramana", fullName: "Electronics & Comm", vibe: <ECEVibe />, icon: <Cpu /> },
    eee: { name: "Dr. G. Madhusudhan", fullName: "Electrical Engg", vibe: <EEEVibe />, icon: <Zap /> },
    civil: { name: "Prof. S. Narayana", fullName: "Civil Engineering", vibe: <CivilVibe />, icon: <HardHat /> },
    all: { name: "Ornate Committee", fullName: "General Arena", vibe: <CSEVibe />, icon: <Zap /> }
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

    // Spotify-style chunking (Rows of 10)
    const eventRows = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < events.length; i += 10) {
            chunks.push(events.slice(i, i + 10));
        }
        return chunks;
    }, [events]);

    return (
        <div className="relative pt-32 pb-20 bg-[#030014] min-h-screen overflow-hidden">
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            
            {/* Background Vibe Layer */}
            {info.vibe}

            <div className="relative z-10 px-6 max-w-full mx-auto">
                <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-widest mb-12 hover:gap-4 transition-all w-fit group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                {/* Dept Header */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-violet-600/20 rounded-2xl text-violet-500 border border-violet-500/20">
                            {info.icon}
                        </div>
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase">Departmental Arena</p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tighter italic text-white mb-20 uppercase leading-none">
                        {info.fullName}<span className="text-violet-600">.</span>
                    </h1>
                </motion.div>

                {/* Event Rows (Spotify Style) */}
                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : eventRows.length > 0 ? (
                    <div className="space-y-24">
                        {eventRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="relative">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <h3 className="text-white/30 font-black text-[10px] uppercase tracking-[0.4em]">
                                        {info.fullName} Collection {rowIndex + 1}
                                    </h3>
                                    <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest animate-pulse">Swipe Right →</span>
                                </div>

                                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-10">
                                    {row.map((event) => (
                                        <Link 
                                            to={`/event/${event._id}`} 
                                            key={event._id}
                                            className="min-w-[85vw] md:min-w-[450px] snap-start"
                                        >
                                            <motion.div
                                                whileHover={{ y: -10 }}
                                                className="group relative h-full p-px rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white/10 hover:bg-violet-500/40 transition-all duration-500 shadow-2xl"
                                            >
                                                <div className="relative h-full w-full bg-[#050508]/90 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 z-10 flex flex-col">
                                                    <div className="flex justify-between items-center mb-10">
                                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={12} className="text-violet-500" />
                                                            <span className="text-[9px] text-white font-black uppercase tracking-widest">{formatDate(event.date)}</span>
                                                        </div>
                                                        <div className="text-[10px] font-mono text-violet-400">0{rowIndex + 1}</div>
                                                    </div>

                                                    <div className="mb-6">
                                                        <p className="text-violet-500 font-bold text-[10px] tracking-[0.4em] uppercase mb-2">{event.dept}</p>
                                                        <h3 className="text-3xl md:text-4xl font-medium italic text-white leading-tight group-hover:text-violet-400 transition-colors">
                                                            {event.name}
                                                        </h3>
                                                    </div>

                                                    <p className="text-gray-500 text-sm italic leading-relaxed mb-10 line-clamp-3">
                                                        {event.description || "The convergence of innovation and culture..."}
                                                    </p>

                                                    <div className="mt-auto flex flex-wrap gap-4">
                                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                                            <Clock size={14} className="text-violet-400" />
                                                            <span className="text-[12px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 max-w-[150px]">
                                                            <MapPin size={14} className="text-violet-400" />
                                                            <span className="text-[10px] text-gray-300 font-bold uppercase truncate">{event.venue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 glass-morphism rounded-[3rem] border border-dashed border-white/10">
                        <AlertCircle className="text-gray-700 mx-auto mb-4" size={48} />
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">No events published in this arena.</p>
                    </div>
                )}
            </div>
        </div>
    );
}