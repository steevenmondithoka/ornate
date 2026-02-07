import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
    ArrowLeft, MapPin, Clock, Calendar, 
    Users, Trophy, Zap, Share2, Phone, 
    ChevronRight, ShieldCheck, Sparkles
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
        setRegistrationMessage('REGISTRATION SUCCESSFUL');
        setShowRegistrationForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <LoadingSpinner />;

    const isRegistrationOpen = event?.registrationOpen;

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30 overflow-x-hidden pt-20 md:pt-24">
            {/* --- BACKGROUND EFFECTS --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* --- BREADCRUMB / BACK ACTION --- */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-4">
                <Link 
                    to={event?.dept ? `/department/${event.dept}` : '/'} 
                    className="inline-flex items-center gap-2 group text-gray-400 hover:text-white transition-colors"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-violet-600 transition-all">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Arena</span>
                </Link>
            </div>

            <main className="relative z-10">
                {/* --- HERO SECTION --- */}
                <section className="relative w-full px-6 pt-10 pb-20">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="relative z-10 order-2 lg:order-1"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-bold tracking-widest uppercase">
                                    {event?.dept} // 2k26
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase mb-8">
                                {event?.name}<span className="text-violet-600">.</span>
                            </h1>
                            <p className="text-lg md:text-2xl font-light text-gray-400 max-w-xl border-l-4 border-violet-600 pl-6 mb-10">
                                {event?.tagline || "Redefining the boundaries of competitive dominance."}
                            </p>
                            
                            {/* Desktop Stats Row (Inside Hero for better alignment) */}
                            <div className="hidden md:flex flex-wrap gap-8 py-8 border-y border-white/5">
                                <QuickInfo label="Team" value={event?.teamSize} />
                                <QuickInfo label="Entry" value={`₹${event?.fee}`} accent />
                                <QuickInfo label="Location" value={event?.venue} />
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video lg:aspect-square rounded-[2rem] overflow-hidden border border-white/10 order-1 lg:order-2"
                        >
                            <img src={event?.imageUrl} className="w-full h-full object-cover" alt={event?.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </motion.div>
                    </div>
                </section>

                {/* --- MOBILE STATS BAR --- */}
                <div className="md:hidden grid grid-cols-2 gap-px bg-white/5 border-y border-white/10 mb-12">
                    <MobileStat label="DATE" value={formatDate(event?.date)} />
                    <MobileStat label="TIME" value={event?.time} />
                    <MobileStat label="FEE" value={`₹${event?.fee}`} accent />
                    <MobileStat label="TEAM" value={event?.teamSize} />
                </div>

                {/* --- CONTENT GRID --- */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
                    
                    {/* INFO & RULES */}
                    <div className="lg:col-span-7 space-y-16">
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-500 mb-6 flex items-center gap-4">
                                <div className="h-[1px] w-8 bg-violet-500"></div> The Mission
                            </h3>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                                {event?.description}
                            </p>
                        </section>

                        {event?.rules?.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-500 mb-6 flex items-center gap-4">
                                    <div className="h-[1px] w-8 bg-violet-500"></div> Protocol
                                </h3>
                                <div className="space-y-3">
                                    {event.rules.map((rule, i) => (
                                        <div key={i} className="group flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                                            <span className="text-violet-600 font-mono text-sm">0{i+1}</span>
                                            <p className="text-gray-400 text-sm md:text-base">{rule}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* REGISTRATION PANEL */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-6">
                            <AnimatePresence mode="wait">
                                {!showRegistrationForm ? (
                                    <motion.div 
                                        key="cta"
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="bg-violet-600 p-8 md:p-12 rounded-[2.5rem] text-center shadow-2xl shadow-violet-900/20"
                                    >
                                        <Trophy size={48} className="mx-auto mb-6 text-white/90" />
                                        <h4 className="text-2xl md:text-3xl font-black uppercase italic mb-2">Claim Your Spot</h4>
                                        <p className="text-violet-200 text-sm mb-8">Slots are limited. Secure yours now.</p>
                                        <button 
                                            onClick={() => setShowRegistrationForm(true)}
                                            disabled={!isRegistrationOpen}
                                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all
                                                ${isRegistrationOpen ? 'bg-white text-black hover:scale-[1.02]' : 'bg-black/20 text-white/40 cursor-not-allowed'}`}
                                        >
                                            {isRegistrationOpen ? 'Register Now' : 'Closed'}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-2"
                                    >
                                        <RegistrationForm 
                                            event={event} 
                                            onClose={() => setShowRegistrationForm(false)} 
                                            onRegistrationSuccess={handleRegistrationSuccess} 
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Contact Card */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center font-black">
                                        {event?.contactPerson?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Organizer</p>
                                        <p className="text-sm font-bold">{event?.contactPerson}</p>
                                    </div>
                                </div>
                                <a href={`tel:${event?.contactNumber}`} className="p-3 bg-white/5 rounded-full hover:bg-violet-600 transition-colors">
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Success Message Overlay */}
            <AnimatePresence>
                {registrationMessage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 text-center"
                    >
                        <div className="max-w-sm">
                            <Zap size={60} className="mx-auto text-violet-500 mb-6" fill="currentColor" />
                            <h2 className="text-3xl font-black uppercase italic mb-4">{registrationMessage}</h2>
                            <button onClick={() => setRegistrationMessage(null)} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl">Continue</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components
function QuickInfo({ label, value, accent }) {
    return (
        <div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-lg font-bold ${accent ? 'text-violet-500' : 'text-white'}`}>{value}</p>
        </div>
    );
}

function MobileStat({ label, value, accent }) {
    return (
        <div className="p-4 flex flex-col items-center justify-center border-r border-white/5 last:border-0">
            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-sm font-bold ${accent ? 'text-violet-500' : 'text-white'}`}>{value}</p>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-500">Loading Arena</p>
        </div>
    );
}