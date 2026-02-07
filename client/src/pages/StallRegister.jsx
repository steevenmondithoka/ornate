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
    ArrowRight
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
    const iconClass = "absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors";
    const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-zinc-600";
    const labelClass = "text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block ml-1";

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 md:p-8 relative overflow-x-hidden pt-24 pb-12">
            <BackgroundDesign />
            
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl w-full bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row"
            >
                {/* --- LEFT COLUMN: VISUAL/INFO --- */}
                <div className="lg:w-[40%] relative min-h-[300px] lg:min-h-auto overflow-hidden bg-zinc-900">
                    <img 
                        src="https://static.vecteezy.com/system/resources/thumbnails/038/525/278/small/ai-generated-competitive-bidding-in-a-crowded-auction-room-photo.jpeg" 
                        alt="Event Stall" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent lg:bg-gradient-to-r" />
                    
                    <div className="relative h-full flex flex-col justify-end lg:justify-start p-8 lg:p-12 space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest">
                                <Sparkles size={12} /> Live Auction 2026
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-none">
                                Claim Your <br /> <span className="text-violet-500">Spot.</span>
                            </h2>
                            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                                Join 50+ vendors in the ultimate technical arena. Showcase, sell, and network with over 10,000+ attendees.
                            </p>
                        </div>

                        {/* Feature List (Desktop Only) */}
                        <div className="hidden lg:block space-y-4 pt-8">
                            {[
                                "Premium High-Footfall Zones",
                                "Full Power & Logistics Support",
                                "Digital Brand Promotion"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                                    <div className="w-5 h-5 rounded-md bg-violet-500/20 flex items-center justify-center text-violet-500">
                                        <CheckCircle2 size={12} />
                                    </div>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: FORM --- */}
                <div className="lg:w-[60%] p-8 lg:p-14">
                    <div className="mb-10">
                        <h3 className="text-2xl font-black italic uppercase tracking-tight flex items-center gap-3">
                            <LayoutGrid className="text-violet-500" /> Application Details
                        </h3>
                        <div className="h-1 w-12 bg-violet-600 mt-2 rounded-full" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Applicant Name</label>
                                <div className="relative">
                                    <Store className={iconClass} size={18} />
                                    <input
                                        className={inputClass}
                                        placeholder="Enter your name"
                                        required
                                        value={formData.applicantName}
                                        onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Organization / College</label>
                                <div className="relative">
                                    <Building2 className={iconClass} size={18} />
                                    <input
                                        className={inputClass}
                                        placeholder="Where are you from?"
                                        required
                                        value={formData.college}
                                        onChange={e => setFormData({ ...formData, college: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Official Email</label>
                                <div className="relative">
                                    <Mail className={iconClass} size={18} />
                                    <input
                                        type="email"
                                        className={inputClass}
                                        placeholder="contact@example.com"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={inputWrapperClass}>
                                <label className={labelClass}>Contact Number</label>
                                <div className="relative">
                                    <Phone className={iconClass} size={18} />
                                    <input
                                        type="tel"
                                        className={inputClass}
                                        placeholder="+91 00000 00000"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Stall Category</label>
                            <div className="relative">
                                <LayoutGrid className={iconClass} size={18} />
                                <select
                                    className={`${inputClass} appearance-none cursor-pointer`}
                                    value={formData.stallType}
                                    onChange={e => setFormData({ ...formData, stallType: e.target.value })}
                                >
                                    <option value="Food" className="bg-[#0a0a0a]">Food & Beverage (Canteen)</option>
                                    <option value="HHO" className="bg-[#0a0a0a]">HHO / Non-Profit</option>
                                    <option value="General" className="bg-[#0a0a0a]">General Merchandise</option>
                                </select>
                                <div className="absolute right-4 top-4 pointer-events-none text-zinc-500">
                                    <ArrowRight size={14} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className={inputWrapperClass}>
                            <label className={labelClass}>Stall Description</label>
                            <div className="relative">
                                <MessageSquare className={`${iconClass} top-4`} size={18} />
                                <textarea
                                    className={`${inputClass} min-h-[100px] resize-none pt-3`}
                                    placeholder="Briefly explain your stall concept..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                disabled={loading}
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(124,58,237,0.2)] hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Proposal <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-center text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                            * Applications are reviewed within 48 hours of submission.
                        </p>
                    </form>
                </div>
            </motion.div>

            {/* Decorative Grid for background depth */}
            <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff22 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
        </div>
    );
}