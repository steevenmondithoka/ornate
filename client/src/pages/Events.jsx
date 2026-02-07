import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Heart, TrendingUp, Award, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundDesign from '../components/BackgroundDesign';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
            const enrichedEvents = res.data.map(ev => ({
                ...ev,
                likes: ev.likes || 0,
                isLiked: localStorage.getItem(`liked_${ev._id}`) === 'true'
            }));
            setEvents(enrichedEvents);
        } catch (err) {
            console.error("Error fetching events", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleLike = async (eventId) => {
        const eventToUpdate = events.find(e => e._id === eventId);
        if (!eventToUpdate) return;
        const wasAlreadyLiked = eventToUpdate.isLiked;

        setEvents(prev => prev.map(ev => {
            if (ev._id === eventId) {
                return {
                    ...ev,
                    likes: wasAlreadyLiked ? Math.max(0, ev.likes - 1) : ev.likes + 1,
                    isLiked: !wasAlreadyLiked
                };
            }
            return ev;
        }));

        try {
            const res = await axios.patch(`https://ornate-evkf.onrender.com/api/events/${eventId}/like`, {
                isUnlike: wasAlreadyLiked
            });
            if (wasAlreadyLiked) {
                localStorage.removeItem(`liked_${eventId}`);
            } else {
                localStorage.setItem(`liked_${eventId}`, 'true');
            }
            setEvents(prev => prev.map(ev =>
                ev._id === eventId ? { ...ev, likes: res.data.likes } : ev
            ));
        } catch (err) {
            console.error("Sync failed", err);
            setEvents(prev => prev.map(ev =>
                ev._id === eventId ? {
                    ...ev,
                    likes: wasAlreadyLiked ? ev.likes + 1 : ev.likes - 1,
                    isLiked: wasAlreadyLiked
                } : ev
            ));
        }
    };

    const trendingEvents = [...events].sort((a, b) => b.likes - a.likes).slice(0, 3);

    const filteredEvents = events
        .filter(e => {
            const matchesDept = filter === 'All' ? true : e.dept === filter;
            const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDept && matchesSearch;
        })
        .sort((a, b) => b.likes - a.likes);

    const departments = ['All', 'cse', 'mech', 'ece', 'eee', 'civil'];

    return (
        <div className="relative pt-16 md:pt-24 pb-20 px-4 md:px-10 max-w-full mx-auto min-h-screen bg-[#030014] overflow-hidden">
            <div className='relative mb-5'>
                <UpdatesTicker />
            </div>
            <BackgroundDesign />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* --- SECTION 1: TRENDING LEADERBOARD (Horizontal Scroll on Mobile) --- */}
                {!loading && (
                    <div className="mb-16 md:mb-24">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <TrendingUp className="text-violet-500" size={18} />
                            <h2 className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Trending Events</h2>
                        </div>
                        
                        {/* Scrollable Container */}
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar md:grid md:grid-cols-3 md:gap-6">
                            {trendingEvents.map((ev, i) => (
                                <motion.div
                                    key={ev._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="min-w-[85vw] md:min-w-0 snap-center p-5 md:p-6 bg-white/[0.02] border border-white/10 rounded-3xl flex items-center justify-between group backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-violet-500 font-mono text-xl font-bold opacity-50">0{i + 1}</span>
                                        <div className="min-w-0">
                                            <p className="text-white font-bold text-sm truncate w-40 md:w-32">{ev.name}</p>
                                            <p className="text-[9px] mt-1 text-violet-400 font-black uppercase tracking-[0.2em]">{ev.dept}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-full border border-fuchsia-500/20">
                                        <Heart size={12} className="fill-fuchsia-500 text-fuchsia-500" />
                                        <span className="text-[10px] font-black font-mono text-fuchsia-500">{ev.likes}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- SECTION 2: HEADER, SEARCH & FILTERS --- */}
                <div className="flex flex-col gap-8 md:gap-12 mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-2">
                        <div className="max-w-xl">
                            <p className="text-violet-500 font-mono tracking-[0.5em] text-[9px] md:text-[10px] uppercase mb-3">Discover Ornate 2026</p>
                            <h1 className="text-4xl md:text-7xl font-medium tracking-tighter italic text-white uppercase leading-[0.9]">
                                The Events<span className="text-violet-600">.</span>
                            </h1>
                        </div>

                        {/* Search Bar Container */}
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-500 transition-colors" size={16} />
                            <input 
                                type="text"
                                placeholder="SEARCH EVENTS..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all placeholder:text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Department Filters */}
                    <div className="flex gap-2 md:gap-4 border-b border-white/5 pb-2 overflow-x-auto w-full no-scrollbar px-2">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => setFilter(dept)}
                                className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-3 transition-all whitespace-nowrap rounded-t-lg ${filter === dept ? 'text-violet-500 border-b-2 border-violet-500 bg-violet-500/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- SECTION 3: EVENT GRID --- */}
                {loading ? (
                    <div className="flex justify-center py-40 animate-pulse text-violet-500 font-mono text-xs uppercase tracking-[0.5em]">Loading Events...</div>
                ) : (
                    <>
                        {filteredEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredEvents.map((event) => (
                                        <Link to={`/event/${event._id}`} key={event._id} className="block h-full">
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="group relative flex flex-col h-full p-px rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white/10 hover:bg-violet-500/40 transition-all duration-500"
                                            >
                                                <div className="relative flex flex-col h-full w-full bg-[#050508]/90 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-7 md:p-10 z-10">
                                                    
                                                    {/* Card Header Tags */}
                                                    <div className="flex justify-between items-center mb-8">
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={12} className="text-violet-500" />
                                                            <span className="text-[9px] text-white font-black uppercase tracking-widest">
                                                                {formatDate(event.date)}
                                                            </span>
                                                        </div>

                                                        <motion.button
                                                            whileTap={{ scale: 1.3 }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleToggleLike(event._id);
                                                            }}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${event.isLiked
                                                                ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-500'
                                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-fuchsia-500/50 hover:text-fuchsia-400'
                                                                }`}
                                                        >
                                                            <Heart size={13} className={event.isLiked ? 'fill-fuchsia-500' : ''} />
                                                            <span className="text-[10px] font-black font-mono">{event.likes}</span>
                                                        </motion.button>
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="mb-6">
                                                        <p className="text-violet-500 font-bold text-[10px] tracking-[0.3em] uppercase mb-2">{event.dept}</p>
                                                        <h3 className="text-2xl md:text-3xl font-medium italic text-white leading-tight group-hover:text-violet-400 transition-colors">
                                                            {event.name}
                                                        </h3>
                                                    </div>

                                                    <p className="text-gray-400 text-xs md:text-sm font-light italic leading-relaxed mb-8 line-clamp-2 md:line-clamp-3">
                                                        {event.description || "The convergence of innovation and culture at RGUKT Ongole..."}
                                                    </p>

                                                    {/* Card Footer Logistics */}
                                                    <div className="mt-auto flex flex-wrap gap-3">
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                                                            <Clock size={12} className="text-violet-400" />
                                                            <span className="text-[11px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 max-w-[150px]">
                                                            <MapPin size={12} className="text-violet-400" />
                                                            <span className="text-[9px] text-gray-300 font-bold uppercase truncate">{event.venue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center opacity-50">
                                <Search size={48} className="text-white mb-6 stroke-[1px]" />
                                <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em]">No matches found for "{searchTerm}"</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}