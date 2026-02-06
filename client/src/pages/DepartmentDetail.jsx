import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Quote, AlertCircle, Calendar } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// Static Metadata for HODs (Since these don't change often)
const hodMetadata = {
    cse: {
        name: "MalliKarjuna Nandi",
        msg: "Coding is the modern-day sorcery. We invite the brightest minds to challenge our algorithms and build the future.",
        fullName: "Computer Science & Engineering"
    },
    mech: {
        name: "Prof. M. K. Varma",
        msg: "Precision is our tradition. Witness the symphony of gears and the roar of engines in our mechanical arena.",
        fullName: "Mechanical Engineering"
    },
    ece: {
        name: "Dr. P. Venkat Ramana",
        msg: "The world is connected by signals we master. Explore the depth of electronics and communication.",
        fullName: "Electronics & Communication"
    },
    eee: {
        name: "Dr. G. Madhusudhan",
        msg: "Powering the world requires vision. Join us to explore the core of electrical engineering.",
        fullName: "Electrical & Electronics"
    },
    civil: {
        name: "Prof. S. Narayana",
        msg: "Building the foundations of tomorrow. Stability and design meet in our civil engineering arena.",
        fullName: "Civil Engineering"
    },
    all:{
         name: "Ornate Committe",
        msg: "Building the foundations of tomorrow. Stability and design meet in our civil engineering arena.",
        fullName: "Common Events For All "
    },
};



export default function DepartmentDetail() {
    const { id } = useParams(); // Gets 'cse', 'mech', etc. from URL
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get HOD info from our static mapping
    const info = hodMetadata[id] || hodMetadata.cse;

    useEffect(() => {
        const fetchDeptEvents = async () => {
            setLoading(true);
            try {
                // 1. Fetch all events
                const res = await axios.get(`https://ornate-evkf.onrender.com/api/events`);

                // 2. Filter events that match the current ID OR match 'all'
                const filtered = res.data.filter(ev => ev.dept === id || ev.dept === 'all');

                setEvents(filtered);
            } catch (err) {
                console.error("Error fetching events", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeptEvents();
    }, [id]);

    return (
        <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Back Button */}
            <Link to="/" className="flex items-center gap-2 text-violet-500 font-bold uppercase text-[10px] tracking-widest mb-12 hover:gap-4 transition-all w-fit">
                <ArrowLeft size={16} /> Back to Arenas
            </Link>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-4">Departmental Arena</p>
                <h1 className="text-5xl md:text-4xl font-medium tracking-tighter italic text-reveal mb-20 uppercase">
                    {info.fullName}<span className="text-violet-600">.</span>
                </h1>
            </motion.div>

            {/* Dynamic Events List */}
            <div className="grid grid-cols-1 gap-6 mb-40">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Events </p>
                    <p className="text-[10px] font-bold text-violet-500 uppercase">{events.length} Events Found</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : events.length > 0 ? (
                    events.map((event, i) => (
                        // <--- WRAP WITH LINK COMPONENT --- >
                        <Link to={`/event/${event._id}`} key={event._id}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 glass-morphism rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:bg-white/[0.04] transition cursor-pointer" // Added cursor-pointer
                            >
                                <div className="max-w-xl">
                                    <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest block mb-2">{event.dept}</span>
                                    <h3 className="text-3xl font-medium mb-3">{event.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>
                                </div>

                                <div className="flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase text-violet-400 border-l border-white/10 pl-8 min-w-[150px]">
                                    <span className="flex items-center gap-3"><Calendar size={16} /> {formatDate(event.date)}</span>
                                    <span className="flex items-center gap-3"><Clock size={16} /> {event.time}</span>
                                    <span className="flex items-center gap-3"><MapPin size={16} /> {event.venue}</span>
                                </div>
                            </motion.div>
                        </Link>
                        // <--- END LINK WRAPPER --- >
                    ))
                ) : (
                    <div className="text-center py-20 glass-morphism rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center">
                        <AlertCircle className="text-gray-700 mb-4" size={40} />
                        <p className="text-gray-600 italic">No events have been published for this arena yet.</p>
                    </div>
                )}
            </div>

            {/* HOD Message (Using the static mapping above) */}
           
        </div>
    );
}