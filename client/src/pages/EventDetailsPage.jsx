import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import { 
    ArrowLeft, MapPin, Clock, Calendar, 
    Users, Trophy, Zap, Share2, Phone, 
    ChevronRight, Info, ShieldCheck, Sparkles
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

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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
        <div className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30 selection:text-violet-400 overflow-x-hidden">
            {/* --- COSMIC BACKGROUND --- */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(124,58,237,0.15)_0%,_transparent_50%)]"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* --- NAV BAR --- */}
            <nav className="fixed top-0 w-full z-[100] backdrop-blur-md border-b border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to={event?.dept ? `/department/${event.dept}` : '/'} className="group flex items-center gap-2">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-violet-600/20 transition-colors">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hidden sm:block">Back to Arena</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">{event?.dept}</span>
                            <span className="text-[8px] text-white/40 font-mono">EST. 2026</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                        <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-90">
                            <Share2 size={16}/>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* --- HERO SECTION --- */}
                <section className="relative h-[85vh] flex items-end overflow-hidden">
                    <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                        <img src={event?.imageUrl} alt="" className="w-full h-full object-cover scale-110 opacity-40 grayscale-[0.2]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                    </motion.div>

                    <div className="max-w-7xl mx-auto px-6 w-full pb-16 md:pb-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-5xl"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
                                <Sparkles size={12} /> New Experience
                            </span>
                            <h1 className="text-[14vw] md:text-[9rem] font-black italic tracking-tighter leading-[0.85] uppercase mb-8">
                                {event?.name}
                                <span className="text-violet-600">.</span>
                            </h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <p className="text-lg md:text-2xl font-light text-gray-400 max-w-xl border-l-2 border-violet-600 pl-6 leading-relaxed">
                                    {event?.tagline || "Forge your path in the ultimate arena of digital excellence."}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- STATS GRID --- */}
                <section className="max-w-7xl mx-auto px-6 -mt-10 mb-20">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-px bg-white/5 p-4 md:p-0 rounded-[2rem] md:rounded-none border border-white/10 md:border-none backdrop-blur-xl">
                        <StatItem icon={<Calendar size={20}/>} label="Schedule" value={formatDate(event?.date)} />
                        <StatItem icon={<Clock size={20}/>} label="Timestamp" value={event?.time} />
                        <StatItem icon={<MapPin size={20}/>} label="Zone" value={event?.venue} />
                        <StatItem icon={<Users size={20}/>} label="Squad Size" value={event?.teamSize} />
                        <StatItem icon={<Zap size={20}/>} label="Entry Fee" value={`₹${event?.fee}`} accent />
                    </div>
                </section>

                {/* --- MAIN CONTENT --- */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-32">
                    
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-7 space-y-20">
                        {/* Description */}
                        <section>
                            <SectionHeading icon={<Info size={16}/>} title="The Mission" />
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300 first-letter:text-5xl first-letter:font-black first-letter:text-violet-500 first-letter:mr-3">
                                {event?.description}
                            </p>
                        </section>

                        {/* Rules */}
                        {event?.rules?.length > 0 && (
                            <section>
                                <SectionHeading icon={<ShieldCheck size={16}/>} title="Rules of Engagement" />
                                <div className="grid gap-3">
                                    {event.rules.map((rule, i) => (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            key={i} 
                                            className="group flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-600/[0.03] transition-all"
                                        >
                                            <span className="text-xs font-mono text-violet-500 mt-1">0{i+1}</span>
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors">{rule}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT SIDE: REGISTRATION PANEL */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 space-y-6">
                            <AnimatePresence mode="wait">
                                {!showRegistrationForm ? (
                                    <motion.div 
                                        key="cta"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 p-1px shadow-2xl shadow-violet-900/20"
                                    >
                                        <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl p-10 md:p-12 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
                                            {/* Decorative Background Elements */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl -mr-16 -mt-16"></div>
                                            
                                            <div className="mb-8 p-5 rounded-3xl bg-violet-500/10 border border-violet-500/20">
                                                <Trophy size={40} className="text-violet-500 animate-bounce" />
                                            </div>

                                            <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-3">Initiate Entry</h4>
                                            <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-[240px]">
                                                Secure your position in the upcoming challenge.
                                            </p>

                                            <button 
                                                onClick={() => setShowRegistrationForm(true)}
                                                disabled={!isRegistrationOpen}
                                                className={`group relative w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all
                                                    ${isRegistrationOpen 
                                                        ? 'bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]' 
                                                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                                    }`}
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {isRegistrationOpen ? (
                                                        <>Register Now <ChevronRight size={14} /></>
                                                    ) : 'Access Denied'}
                                                </span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="form"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-2 overflow-hidden"
                                    >
                                        <RegistrationForm 
                                            event={event} 
                                            onClose={() => setShowRegistrationForm(false)} 
                                            onRegistrationSuccess={handleRegistrationSuccess} 
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Organizer Card */}
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg">
                                        {event?.contactPerson?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-violet-500 uppercase tracking-widest mb-0.5">Contact Lead</p>
                                        <p className="text-sm font-bold text-gray-200">{event?.contactPerson}</p>
                                    </div>
                                </div>
                                <a 
                                    href={`tel:${event?.contactNumber}`} 
                                    className="p-3.5 rounded-xl bg-white/5 text-gray-400 hover:bg-violet-600 hover:text-white transition-all shadow-xl"
                                >
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Success Overlay */}
            <AnimatePresence>
                {registrationMessage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
                    >
                        <div className="max-w-md w-full text-center space-y-8">
                            <div className="relative inline-block">
                                <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center text-white mx-auto shadow-[0_0_60px_rgba(124,58,237,0.5)]"
                                >
                                    <Zap size={40} fill="currentColor" />
                                </motion.div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-black">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">Welcome to the Ornate.</h2>
                                <p className="text-gray-400 text-sm">Your clearance has been granted. Prepare for the challenge ahead.</p>
                            </div>
                            <button 
                                onClick={() => setRegistrationMessage(null)} 
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:scale-105 active:scale-95 transition-all"
                            >
                                Enter Workspace
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx="true">{`
                h1 {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.05);
                }
                .p-1px { padding: 1px; }
            `}</style>
        </div>
    );
}

function StatItem({ icon, label, value, accent }) {
    return (
        <div className="flex flex-col p-6 md:p-8 md:border-r border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 mb-4 text-gray-500">
                <span className={accent ? 'text-violet-500' : 'text-gray-400'}>{icon}</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <p className={`text-base md:text-lg font-bold tracking-tight ${accent ? 'text-violet-400' : 'text-white'}`}>
                {value || '---'}
            </p>
        </div>
    );
}

function SectionHeading({ icon, title }) {
    return (
        <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-violet-500 mb-10">
            <span className="p-2 rounded-lg bg-violet-500/10">{icon}</span>
            {title}
            <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/30 to-transparent ml-4"></div>
        </h3>
    );
}

function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-8">
            <div className="relative">
                <div className="w-20 h-20 border-[3px] border-violet-600/20 border-t-violet-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-violet-600/10 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-violet-500">Synchronizing</p>
                <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
                </div>
            </div>
        </div>
    );
}