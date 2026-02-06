import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '../components/Timeline';
import BackgroundDesign from '../components/BackgroundDesign';
import { UpdatesTicker } from '../components/UpdatesTicker';

const festDates = [
    { day: "Day 1", date: "2026-03-28", label: "March 28" },
    { day: "Day 2", date: "2026-03-29", label: "March 29" },
    { day: "Day 3", date: "2026-03-30", label: "March 30" },
];

export default function Schedule() {
    const [events, setEvents] = useState([]);
    const [activeDate, setActiveDate] = useState("2026-03-28");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching schedule", err);
        } finally {
            setLoading(false);
        }
    };

    const getMinutesFromTime = (timeStr) => {
        if (!timeStr) return 0;
        const str = timeStr.trim().toUpperCase();
        // Regex to extract hours, minutes and AM/PM
        const match = str.match(/(\d+):(\d+)\s*(AM|PM)/);
        
        if (!match) return 0;

        let [_, hours, minutes, period] = match;
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return hours * 60 + minutes;
    };

    
    const filteredEvents = events
        .filter(event => {
            if (!event.date) return false;
            const dbDate = event.date.toString().trim().slice(0, 10);
            const selectedDate = activeDate.toString().trim().slice(0, 10);
            return dbDate === selectedDate;
        })
        .sort((a, b) => {
            return getMinutesFromTime(a.time) - getMinutesFromTime(b.time);
        });

    return (
        <div className="pt-20 pb-20 px-6 max-w-full mx-auto min-h-screen bg-[#030014]">
             <div className='mb-2'>
                                <UpdatesTicker />
                            </div>
            <div className="mb-20">
                <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-4">The Grand Itinerary</p>
                <h1 className="text-5xl md:text-6xl font-medium tracking-tighter italic text-reveal">TIMELINE<span className="text-violet-600">.</span></h1>
            </div>
           

            {/* Day Selector Tabs */}
            <div className="flex flex-wrap gap-4 md:gap-10 mb-24 border-b border-white/5 pb-6">
                {festDates.map((d) => (
                    <button
                        key={d.date}
                        onClick={() => setActiveDate(d.date)}
                        className="group relative"
                    >
                        <div className={`transition-all duration-500 ${activeDate === d.date ? 'text-violet-500 scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">{d.day}</p>
                            <h3 className="text-2xl md:text-4xl font-medium tracking-tighter italic">{d.label}</h3>
                        </div>
                        {activeDate === d.date && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-6 left-0 w-full h-[2px] bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="relative">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredEvents.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                                    <p className="text-gray-600 uppercase text-[10px] font-bold tracking-widest">No Events published for this date yet.</p>
                                </div>
                            ) : (
                                <Timeline events={filteredEvents} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}