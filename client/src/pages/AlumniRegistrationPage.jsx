import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, GraduationCap, Building2, Briefcase, 
    Factory, CalendarCheck, Lightbulb, ArrowRight, ChevronDown, Sparkles
} from 'lucide-react';

const API_BASE = "https://ornate-evkf.onrender.com/api";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());
const BRANCHES = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];

export default function AlumniRegistrationPage() {
    const [form, setForm] = useState({
        fullName: '', email: '', phoneNumber: '', passingYear: YEARS[0],
        branch: BRANCHES[0], currentOccupation: '', companyName: '',
        attendFest: 'yes', conductEvent: 'no', eventIdea: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const dataToSend = { ...form };
            if (form.conductEvent === 'no') dataToSend.eventIdea = '';
            if (form.attendFest === 'no') {
                dataToSend.currentOccupation = '';
                dataToSend.companyName = '';
            }

            const res = await axios.post(`${API_BASE}/alumni-registrations`, dataToSend);
            setMessage({ type: 'success', text: res.data.msg });
            setForm({
                fullName: '', email: '', phoneNumber: '', passingYear: YEARS[0],
                branch: BRANCHES[0], currentOccupation: '', companyName: '',
                attendFest: 'yes', conductEvent: 'no', eventIdea: ''
            });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Registration failed.' });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700";
    const labelClass = "text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block ml-1";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-500 transition-colors";

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pt-28 pb-12 lg:pt-36">
            
            {/* Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                >
                    {/* --- LEFT SIDE: IMAGE & INFO --- */}
                    <div className="lg:w-[40%] relative min-h-[350px] lg:min-h-full overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1523580494863-6f30312248fd?auto=format&fit=crop&q=80&w=1200" 
                            alt="Alumni" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent lg:bg-gradient-to-r" />
                        
                        <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 space-y-4">
                            <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest w-fit">
                                <Sparkles size={12} /> Global Network
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
                                Reconnect <br /> <span className="text-violet-500">Alumni.</span>
                            </h1>
                            <p className="text-zinc-400 text-sm max-w-xs font-medium leading-relaxed">
                                Join the Ornate 2k26 legacy. Share your journey and inspire the next generation of engineers.
                            </p>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: THE FORM --- */}
                    <div className="lg:w-[60%] p-8 lg:p-14 bg-[#0a0a0a]">
                        <div className="flex items-center gap-3 mb-10">
                           <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500">
                              <GraduationCap size={20} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black italic uppercase tracking-tighter">Registration Portal</h3>
                              <div className="h-1 w-8 bg-violet-600 rounded-full mt-1" />
                           </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="group">
                                <label className={labelClass}>Full Name</label>
                                <div className="relative">
                                    <User className={iconClass} size={16} />
                                    <input name="fullName" value={form.fullName} onChange={handleChange} required className={inputClass} placeholder="Alumni Name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className={labelClass}>Email Address</label>
                                    <div className="relative">
                                        <Mail className={iconClass} size={16} />
                                        <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className={labelClass}>WhatsApp Number</label>
                                    <div className="relative">
                                        <Phone className={iconClass} size={16} />
                                        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className={inputClass} placeholder="+91..." />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className={labelClass}>Passing Year</label>
                                    <div className="relative">
                                        <CalendarCheck className={iconClass} size={16} />
                                        <select name="passingYear" value={form.passingYear} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                                            {YEARS.map(year => <option key={year} value={year} className="bg-[#0a0a0a]">{year}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className={labelClass}>Academic Branch</label>
                                    <div className="relative">
                                        <Building2 className={iconClass} size={16} />
                                        <select name="branch" value={form.branch} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                                            {BRANCHES.map(branch => <option key={branch} value={branch} className="bg-[#0a0a0a]">{branch}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                                <label className="text-[10px] font-black text-violet-500 uppercase tracking-widest block">Are you attending Ornate 2k26?</label>
                                <div className="flex gap-6">
                                    {['yes', 'no'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" name="attendFest" value={opt} checked={form.attendFest === opt} onChange={handleChange} className="w-4 h-4 accent-violet-600" />
                                            <span className="text-xs font-bold uppercase text-zinc-400 group-hover:text-white transition-colors">{opt === 'yes' ? "I'm coming!" : "Maybe next time"}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence>
                                {form.attendFest === 'yes' && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="group">
                                                <label className={labelClass}>Current Occupation</label>
                                                <div className="relative">
                                                    <Briefcase className={iconClass} size={16} />
                                                    <input name="currentOccupation" value={form.currentOccupation} onChange={handleChange} className={inputClass} placeholder="e.g. Lead Engineer" />
                                                </div>
                                            </div>
                                            <div className="group">
                                                <label className={labelClass}>Current Company</label>
                                                <div className="relative">
                                                    <Factory className={iconClass} size={16} />
                                                    <input name="companyName" value={form.companyName} onChange={handleChange} className={inputClass} placeholder="Company Name" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                                            <label className="text-[10px] font-black text-violet-500 uppercase tracking-widest block">Conduct a workshop / session?</label>
                                            <div className="flex gap-6">
                                                {['yes', 'no'].map((opt) => (
                                                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                                        <input type="radio" name="conductEvent" value={opt} checked={form.conductEvent === opt} onChange={handleChange} className="w-4 h-4 accent-violet-600" />
                                                        <span className="text-xs font-bold uppercase text-zinc-400 group-hover:text-white transition-colors">{opt === 'yes' ? "Yes, I have an idea" : "Just attending"}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {form.conductEvent === 'yes' && (
                                            <div className="group">
                                                <label className={labelClass}>Your Session Idea</label>
                                                <div className="relative">
                                                    <Lightbulb className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-violet-500" size={16} />
                                                    <textarea name="eventIdea" value={form.eventIdea} onChange={handleChange} rows="3" className={`${inputClass} min-h-[100px] resize-none pt-3`} placeholder="Briefly describe your session proposal..." />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                disabled={loading}
                                className="w-full mt-4 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl transition-all shadow-xl shadow-violet-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {loading ? "PROCESSING..." : "REGISTER AS ALUMNI"}
                                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </button>

                            {message.text && (
                                <p className={`text-center text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {message.text}
                                </p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}