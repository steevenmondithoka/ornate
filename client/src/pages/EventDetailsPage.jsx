import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
    ArrowLeft, MapPin, Clock, Calendar, AlertCircle, 
    Users, DollarSign, List, Trophy, ShieldCheck, Zap, 
    Share2, Phone, User, ChevronRight, Activity
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import RegistrationForm from '../pages/RegistrationForm';

const API_BASE = "https://ornate-evkf.onrender.com/api";

export default function EventDetailsPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`${API_BASE}/events/${eventId}`);
                setEvent(res.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchEvent();
    }, [eventId]);

    const handleRegistrationSuccess = () => {
        setRegistrationMessage('REGISTRATION SUCCESSFUL: Welcome to the Ornate.');
        setShowRegistrationForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <LoadingSpinner />;

    const isRegistrationOpen = event?.registrationOpen;

    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-violet-500 overflow-x-hidden">
            {/* --- IMMERSIVE BACKGROUND --- */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-violet-600/10 via-transparent to-black"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-violet-600/20 blur-[150px] rounded-full"></div>
            </div>

            <div className="relative z-10">
                {/* --- FLOATING HEADER --- */}
                <header className="relative top-16 w-full z-60 backdrop-blur-xl border-b border-white/5 bg-black/20">
                    <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link to={event?.dept ? `/department/${event.dept}` : '/'} className="flex items-center gap-3 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Back to Arena</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                                {event?.dept} // 2k26
                            </span>
                            <button className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-all"><Share2 size={16}/></button>
                        </div>
                    </div>
                </header>

                <main className="pt-24">
                    {/* --- HERO SECTION: FULL WIDTH IMPACT --- */}
                    <div className="relative h-[60vh] md:h-[80vh] w-full flex items-end px-6 pb-12 overflow-hidden">
                        <motion.img 
                            initial={{ scale: 1.2, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 0.6 }} 
                            transition={{ duration: 1.5 }}
                            src={event?.imageUrl} 
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        
                        <div className="relative max-w-screen-2xl mx-auto w-full">
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }} 
                                animate={{ y: 0, opacity: 1 }} 
                                transition={{ delay: 0.5 }}
                                className="max-w-4xl"
                            >
                                <h1 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] mb-6 uppercase">
                                    {event?.name}<span className="text-violet-600">.</span>
                                </h1>
                                <p className="text-xl md:text-3xl font-light text-gray-300 max-w-2xl border-l-4 border-violet-600 pl-6">
                                    {event?.tagline || "Redefining the boundaries of competitive dominance."}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* --- QUICK STATS BAR: HORIZONTAL SCROLL --- */}
                    <div className="bg-white/5 border-y border-white/5 py-8">
                        <div className="max-w-screen-2xl mx-auto px-6 flex flex-wrap gap-12 justify-between">
                            <Stat icon={<Calendar size={18}/>} label="DATE" value={formatDate(event?.date)} />
                            <Stat icon={<Clock size={18}/>} label="TIME" value={event?.time} />
                            <Stat icon={<MapPin size={18}/>} label="LOCATION" value={event?.venue} />
                            <Stat icon={<Users size={18}/>} label="TEAM" value={event?.teamSize} />
                            <Stat icon={<Activity size={18}/>} label="FEE" value={`₹${event?.fee}`} accent />
                        </div>
                    </div>

                    {/* --- CONTENT GRID --- */}
                    <div className="max-w-screen-2xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
                        
                        {/* LEFT: DESCRIPTION & RULES */}
                        <div className="lg:col-span-7 space-y-24">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-violet-500 mb-8 flex items-center gap-4">
                                    <div className="h-[1px] w-12 bg-violet-500"></div> The Mission
                                </h3>
                                <p className="text-2xl font-light leading-relaxed text-gray-300 italic">
                                    "{event?.description}"
                                </p>
                            </section>

                            {event?.rules?.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-violet-500 mb-8 flex items-center gap-4">
                                        <div className="h-[1px] w-12 bg-violet-500"></div> Protocol & Rules
                                    </h3>
                                    <div className="grid gap-4">
                                        {event.rules.map((rule, i) => (
                                            <motion.div 
                                                whileHover={{ x: 10 }}
                                                key={i} 
                                                className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 group hover:bg-violet-600/10 transition-all"
                                            >
                                                <span className="text-3xl font-black italic text-white/10 group-hover:text-violet-500/50 transition-colors">0{i+1}</span>
                                                <p className="text-gray-400 font-medium">{rule}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* RIGHT: REGISTRATION STICKY PANEL */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32 space-y-8">
                                <AnimatePresence mode="wait">
                                    {!showRegistrationForm ? (
                                        <motion.div 
                                            key="register-cta"
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                                            className="bg-violet-600 p-12 rounded-[3rem] text-center space-y-8 shadow-[0_20px_80px_rgba(124,58,237,0.3)]"
                                        >
                                            <Trophy size={60} className="mx-auto text-white" />
                                            <div>
                                                <h4 className="text-3xl font-black uppercase italic leading-none mb-2">Claim Your Spot</h4>
                                                <p className="text-violet-200 font-medium">Slots are filling fast. Initiate your entry now.</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowRegistrationForm(true)}
                                                disabled={!isRegistrationOpen}
                                                className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all
                                                    ${isRegistrationOpen 
                                                        ? 'bg-white text-black hover:scale-105 active:scale-95' 
                                                        : 'bg-black/20 text-white/50 cursor-not-allowed'
                                                    }`}
                                            >
                                                {isRegistrationOpen ? 'Register for the Event' : 'Event Closed'}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="register-form"
                                            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                            className="bg-zinc-900 border border-white/10 rounded-[3rem] p-2"
                                        >
                                            <RegistrationForm 
                                                event={event} 
                                                onClose={() => setShowRegistrationForm(false)} 
                                                onRegistrationSuccess={handleRegistrationSuccess} 
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Contact Mini-Card */}
                                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-black text-violet-500">
                                            {event?.contactPerson?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Organizer</p>
                                            <p className="text-sm font-bold">{event?.contactPerson}</p>
                                        </div>
                                    </div>
                                    <a href={`tel:${event?.contactNumber}`} className="p-4 bg-white/10 rounded-full hover:bg-violet-600 transition-all">
                                        <Phone size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Registration Success Overlay */}
            <AnimatePresence>
                {registrationMessage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 text-center"
                    >
                        <div className="space-y-6">
                            <div className="w-24 h-24 bg-violet-500 rounded-full mx-auto flex items-center justify-center text-black shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                                <Zap size={40} fill="currentColor" />
                            </div>
                            <h2 className="text-5xl font-black uppercase italic">{registrationMessage}</h2>
                            <button onClick={() => setRegistrationMessage(null)} className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full">Enter Ornate</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx="true">{`
                h1 {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    );
}

// Sub-components for cleaner structure
function Stat({ icon, label, value, accent }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <p className={`text-lg font-bold ${accent ? 'text-violet-500' : 'text-white'}`}>{value}</p>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-t-4 border-violet-600 rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-[0.5em] text-violet-500 animate-pulse">Loading Arena...</p>
            </div>
        </div>
    );
}