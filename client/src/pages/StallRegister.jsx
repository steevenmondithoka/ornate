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
    LayoutGrid
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

    // Shared Tailwind classes for inputs
    const inputWrapperClass = "relative group";
    const iconClass = "absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors";
    const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600";
    const labelClass = "text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block ml-1";

    return (
        <div className=" relative top-4 min-h-screen bg-[#050505] text-white flex items-center justify-center p-3 md:p-6 relative overflow-hidden mt-9">
            <BackgroundDesign />
            {/* --- BACKGROUND FX --- */}
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4c1d95 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>
            {/* Ambient Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10"
            >
                {/* --- HEADER --- */}
                <div className="p-8 md:p-10 border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-transparent">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
                                    Partnership Portal
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">
                                Stall Auction <span className="text-violet-600">Registration</span>
                            </h1>
                            <p className="text-zinc-400 text-sm mt-2 max-w-md">
                                Showcase your brand at Ornate. Fill out the details below to reserve a spot in the arena.
                            </p>
                        </div>
                        <div className="hidden md:flex bg-zinc-900 border border-white/10 p-3 rounded-2xl text-violet-500 shadow-lg shadow-violet-900/20">
                            <Store size={32} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">

                    {/* Row 1: Name & College */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Applicant Name</label>
                            <div className="relative">
                                <Store className={iconClass} size={18} />
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
                            <label className={labelClass}>College / Org</label>
                            <div className="relative">
                                <Building2 className={iconClass} size={18} />
                                <input
                                    className={inputClass}
                                    placeholder="Institute of Technology"
                                    required
                                    value={formData.college}
                                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Email Address</label>
                            <div className="relative">
                                <Mail className={iconClass} size={18} />
                                <input
                                    type="email"
                                    className={inputClass}
                                    placeholder="contact@brand.com"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Phone Number</label>
                            <div className="relative">
                                <Phone className={iconClass} size={18} />
                                <input
                                    type="tel"
                                    className={inputClass}
                                    placeholder="+91 98765 43210"
                                    required
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Stall Type */}
                    <div className={inputWrapperClass}>
                        <label className={labelClass}>Stall Category</label>
                        <div className="relative">
                            <LayoutGrid className={iconClass} size={18} />
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                value={formData.stallType}
                                onChange={e => setFormData({ ...formData, stallType: e.target.value })}
                            >
                                <option value="Food" className="bg-[#0a0a0a]">Food & Beverage</option>
                                <option value="HHO" className="bg-[#0a0a0a]">Helping Hands Organization</option>

                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Description */}
                    <div className={inputWrapperClass}>
                        <label className={labelClass}>Concept Description</label>
                        <div className="relative">
                            <MessageSquare className={`${iconClass} top-4`} size={18} />
                            <textarea
                                className={`${inputClass} min-h-[120px] resize-none`}
                                placeholder="Describe what you plan to sell or display..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <span>SUBMIT APPLICATION</span>
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="flex justify-center items-center gap-2 text-zinc-600 text-[10px]">
                        <Sparkles size={12} />
                        <span>Approvals are subject to committee review</span>
                    </div>

                </form>
            </motion.div>
        </div>
    );
}