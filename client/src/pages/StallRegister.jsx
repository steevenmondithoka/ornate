import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Store,
    Building2,
    Mail,
    Phone,
    MessageSquare,
    Send,
    Sparkles,
    LayoutGrid,
    CheckCircle2,
    ChevronDown
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

export default function StallRegister() {
    const [formData, setFormData] = useState({
        applicantName: '', college: '', email: '', phone: '', stallType: 'Food', description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://ornate-evkf.onrender.com/api/stalls/register', formData);
            alert("Application Sent! We will contact you shortly.");
            setFormData({ applicantName: '', college: '', email: '', phone: '', stallType: 'Food', description: '' });
        } catch (err) {
            alert("Submission failed. Please try again.");
        } finally { setLoading(false); }
    };

    const inputWrapperClass = "relative group";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-500 transition-colors";
    const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600";
    const labelClass = "text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block ml-1";

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pt-28 pb-12 lg:pt-36">
            <BackgroundDesign />
            
            {/* Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                >
                    {/* --- LEFT SIDE: IMAGE & VISUAL --- */}
                    <div className="lg:w-[42%] relative min-h-[280px] lg:min-h-full overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80&w=1200" 
                            alt="Stall" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent lg:bg-gradient-to-r" />
                        
                        <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-bold uppercase tracking-widest w-fit">
                                <Sparkles size={12} /> Live Registration
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
                                Register For <br /> <span className="text-violet-500">Stall Auction.</span>
                            </h2>
                            <p className="text-zinc-400 text-sm max-w-xs font-medium leading-relaxed">
                                Join the Ornate ecosystem for Auction 2026.
                            </p>

                            <div className="hidden lg:grid gap-3 pt-6">
                                {["Prime Footfall Zones", "Full Logistics Support", "Digital Media Push"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                                        <CheckCircle2 size={14} className="text-violet-500" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: THE FORM --- */}
                    <div className="lg:w-[58%] p-8 lg:p-14">
                        <div className="mb-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                <Store className="text-violet-500" /> Application Portal
                            </h3>
                            <div className="h-1 w-12 bg-violet-600 mt-2 rounded-full" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Full Name</label>
                                    <div className="relative">
                                        <Store className={iconClass} size={16} />
                                        <input
                                            className={inputClass}
                                            placeholder="Jane Doe"
                                            required
                                            value={formData.applicantName}
                                            onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Organization</label>
                                    <div className="relative">
                                        <Building2 className={iconClass} size={16} />
                                        <input
                                            className={inputClass}
                                            placeholder="Brand/College"
                                            required
                                            value={formData.college}
                                            onChange={e => setFormData({ ...formData, college: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Email</label>
                                    <div className="relative">
                                        <Mail className={iconClass} size={16} />
                                        <input
                                            type="email"
                                            className={inputClass}
                                            placeholder="contact@email.com"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={inputWrapperClass}>
                                    <label className={labelClass}>Phone</label>
                                    <div className="relative">
                                        <Phone className={iconClass} size={16} />
                                        <input
                                            type="tel"
                                            className={inputClass}
                                            placeholder="+91..."
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Category</label>
                                <div className="relative">
                                    <LayoutGrid className={iconClass} size={16} />
                                    <select
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                        value={formData.stallType}
                                        onChange={e => setFormData({ ...formData, stallType: e.target.value })}
                                    >
                                        <option value="Food" className="bg-[#0a0a0a]">Food & Beverage (Canteen)</option>
                                        <option value="HHO" className="bg-[#0a0a0a]">HHO / NGO</option>
                                        <option value="General" className="bg-[#0a0a0a]">General Merchandise</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Proposal Description</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={16} />
                                    <textarea
                                        className={`${inputClass} min-h-[100px] resize-none pt-3`}
                                        placeholder="What will you sell or display?"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl transition-all shadow-xl shadow-violet-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Proposal <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}