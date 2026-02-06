import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
// Added Search icon
import { Clock, MapPin, Calendar, Heart, TrendingUp, Award, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundDesign from '../components/BackgroundDesign';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { formatDate } from '../utils/formatDate';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState(''); // NEW: Search state
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

    // UPDATED: Combined Filter and Search logic
    const filteredEvents = events
        .filter(e => {
            const matchesDept = filter === 'All' ? true : e.dept === filter;
            const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDept && matchesSearch;
        })
        .sort((a, b) => b.likes - a.likes);

    const departments = ['All', 'cse', 'mech', 'ece', 'eee', 'civil'];

    return (
        <div className="relative pt-20 pb-20 px-6 max-w-full mx-auto min-h-screen bg-[#030014] overflow-hidden">
            <div className='relative mb-5'>
                <UpdatesTicker />
            </div>
            <BackgroundDesign />

            <div className="relative z-10 max-w-full mx-auto">

                {/* --- SECTION 1: TRENDING LEADERBOARD --- */}
                {!loading && (
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="text-violet-500" size={20} />
                            <h2 className="text-white font-black uppercase tracking-[0.3em] text-xs">Trending Events</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {trendingEvents.map((ev, i) => (
                                <motion.div
                                    key={ev._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-violet-500 font-mono text-lg font-bold">0{i + 1}</span>
                                        <div>
                                            <p className="text-white font-bold text-sm truncate w-32">{ev.name}</p>
                                            <p className="text-[10px] mt-1 text-white uppercase tracking-widest">{ev.dept}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-fuchsia-500">
                                        <Heart size={14} className="fill-fuchsia-500" />
                                        <span className="text-xs font-black font-mono">{ev.likes}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- SECTION 2: HEADER, SEARCH & FILTERS --- */}
                <div className="flex flex-col gap-10 mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-4">Discover the Orante Events</p>
                            <h1 className="text-5xl md:text-5xl font-medium tracking-tighter italic text-white uppercase leading-none">
                                The Events<span className="text-violet-600">.</span>
                            </h1>
                        </div>

                        {/* Search Bar Container */}
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-500 transition-colors" size={18} />
                            <input 
                                type="text"
                                placeholder="SEARCH EVENTS..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Department Filters */}
                    <div className="flex gap-4 border-b border-white/5 pb-2 overflow-x-auto w-full no-scrollbar">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => setFilter(dept)}
                                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 transition-all whitespace-nowrap ${filter === dept ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- SECTION 3: EVENT GRID --- */}
                {loading ? (
                    <div className="flex justify-center py-40 animate-pulse text-violet-500 font-mono uppercase tracking-[0.5em]">Loading Please Wait...</div>
                ) : (
                    <>
                        {filteredEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredEvents.map((event, i) => (
                                        <Link to={`/event/${event._id}`} key={event._id}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="group relative flex flex-col p-px rounded-[3rem] overflow-hidden bg-white/10 hover:bg-violet-500/40 transition-all duration-700"
                                            >
                                                {/* Card Content (Existing code remains same) */}
                                                <div className="relative flex flex-col h-full w-full bg-[#050508]/90 backdrop-blur-3xl rounded-[3rem] p-10 z-10">
                                                    <div className="absolute top-8 left-10 right-10 flex justify-between items-center z-20">
                                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                                            <Calendar size={14} className="text-violet-500" />
                                                            <span className="text-[10px] text-white font-black uppercase tracking-widest">
                                                                {formatDate(event.date)}
                                                            </span>
                                                        </div>

                                                        <motion.button
                                                            whileTap={{ scale: 1.4 }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleToggleLike(event._id);
                                                            }}
                                                            className={`group/like relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${event.isLiked
                                                                ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-fuchsia-500/50 hover:text-fuchsia-400'
                                                                }`}
                                                        >
                                                            <Heart size={15} className={`${event.isLiked ? 'fill-fuchsia-500 animate-pulse' : 'group-hover/like:scale-110 transition-transform'}`} />
                                                            <span className="text-[11px] font-black font-mono tracking-tighter">{event.likes.toLocaleString()}</span>
                                                        </motion.button>
                                                    </div>

                                                    <div className="mt-12 mb-8">
                                                        <p className="text-white font-bold text-[13px] tracking-[0.4em] uppercase mb-2">{event.dept} </p>
                                                        <h3 className="text-3xl font-medium italic text-white leading-tight pr-10">{event.name}</h3>
                                                    </div>

                                                    <p className="text-gray-500 text-sm font-light italic leading-relaxed mb-10 line-clamp-3">
                                                        {event.description || "The convergence of innovation and culture..."}
                                                    </p>

                                                    <div className="mt-auto flex flex-wrap gap-4">
                                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                                            <Clock size={14} className="text-violet-500" />
                                                            <span className="text-[13px] text-gray-300 font-bold uppercase">{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                                            <MapPin size={14} className="text-violet-500" />
                                                            <span className="text-[10px] text-gray-300 font-bold uppercase truncate max-w-[100px]">{event.venue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Search size={40} className="text-white/10 mb-4" />
                                <p className="text-gray-500 font-mono uppercase tracking-[0.2em]">No events found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}