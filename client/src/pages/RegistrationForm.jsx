import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Mail, Phone, Building, Users, 
    AlertCircle, CheckCircle, PlusCircle, XCircle,
    Zap, ShieldCheck, ChevronRight
} from 'lucide-react';

const API_BASE = "https://ornate-evkf.onrender.com/api";

const parseTeamLimits = (str) => {
    const s = str ? str.toLowerCase() : 'individual';
    if (s.includes('individual')) return { min: 1, max: 1 };
    const rangeMatch = s.match(/(\d+)-(\d+)/);
    if (rangeMatch) return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
    const upToMatch = s.match(/up to (\d+)/);
    if (upToMatch) return { min: 1, max: parseInt(upToMatch[1]) };
    const fixedMatch = s.match(/(\d+)/);
    if (fixedMatch) return { min: parseInt(fixedMatch[1]), max: parseInt(fixedMatch[1]) };
    return { min: 1, max: 1 };
};

const RegistrationForm = ({ event, onClose, onRegistrationSuccess }) => {
    const { min: minTotal, max: maxTotal } = parseTeamLimits(event.teamSize);
    const isTeamEvent = maxTotal > 1;

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', college: '', department: '', year: '', teamName: '',
        teamMembers: Array(minTotal > 1 ? minTotal - 1 : 0).fill({ name: '', email: '' }),
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ msg: '', type: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleMemberChange = (index, e) => {
        const updated = [...formData.teamMembers];
        updated[index] = { ...updated[index], [e.target.name]: e.target.value };
        setFormData({ ...formData, teamMembers: updated });
    };

    const addMember = () => {
        if (formData.teamMembers.length + 1 < maxTotal) {
            setFormData({ ...formData, teamMembers: [...formData.teamMembers, { name: '', email: '' }] });
        }
    };

    const removeMember = (index) => {
        if (formData.teamMembers.length + 1 > minTotal) {
            const updated = formData.teamMembers.filter((_, i) => i !== index);
            setFormData({ ...formData, teamMembers: updated });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ msg: '', type: '' });

        if (isTeamEvent && !formData.teamName.trim()) {
            setStatus({ msg: "Team Name is required!", type: "error" });
            setLoading(false);
            return;
        }

        try {
            const payload = {
                eventId: event._id,
                name: formData.name, email: formData.email, phone: formData.phone,
                college: formData.college, department: formData.department, year: formData.year,
            };
            if (isTeamEvent) {
                payload.teamName = formData.teamName;
                payload.teamMembers = formData.teamMembers;
            }
            const res = await axios.post(`${API_BASE}/registrations`, payload);
            setStatus({ msg: res.data.message, type: 'success' });
            setTimeout(() => onRegistrationSuccess(), 2000);
        } catch (err) {
            setStatus({ msg: err.response?.data?.message || "Registration failed.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4 py-6 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl flex flex-col bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-full"
            >
                {/* --- STICKY HEADER --- */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#0a0a0a] rounded-t-[2.5rem] sticky top-0 z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                            <p className="text-violet-500 font-black text-[9px] tracking-[0.3em] uppercase">Secure Registration</p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tight">
                            {event.name}<span className="text-violet-600">.</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-all">
                        <XCircle size={22} />
                    </button>
                </div>

                {/* --- SCROLLABLE CONTENT --- */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                    
                    {/* Status Message */}
                    <AnimatePresence>
                        {status.msg && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-3 p-4 rounded-2xl border ${
                                    status.type === 'success' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}
                            >
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                <p className="text-xs font-bold uppercase tracking-wider">{status.msg}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form id="reg-form" onSubmit={handleSubmit} className="space-y-10">
                        
                        {/* SECTION: PRIMARY INFO */}
                        <div className="space-y-5">
                            <SectionTitle icon={<User size={14}/>} title={isTeamEvent ? "Lead Info" : "Participant Info"} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="Full Name" name="name" onChange={handleChange} required />
                                <InputField label="Email Address" name="email" type="email" onChange={handleChange} required />
                                <InputField label="WhatsApp Number" name="phone" onChange={handleChange} required />
                                <InputField label="College / Institution" name="college" onChange={handleChange} required />
                                <InputField label="Branch" name="department" placeholder="e.g. CSE" onChange={handleChange} required />
                                <InputField label="Current Year" name="year" placeholder="e.g. 3rd Year" onChange={handleChange} required />
                            </div>
                        </div>

                        {/* SECTION: TEAM CONFIG */}
                        {isTeamEvent && (
                            <div className="space-y-5">
                                <SectionTitle icon={<Users size={14}/>} title={`Team Detail (${minTotal}-${maxTotal} Pax)`} />
                                <div className="p-1px bg-gradient-to-br from-violet-500/20 to-transparent rounded-3xl">
                                    <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-6">
                                        <InputField label="Assigned Team Name" name="teamName" placeholder="Enter a cool name" onChange={handleChange} required highlight />
                                        
                                        <div className="space-y-4">
                                            {formData.teamMembers.map((member, idx) => (
                                                <motion.div 
                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                    key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 relative group"
                                                >
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em]">Member 0{idx + 2}</span>
                                                        <button type="button" onClick={() => removeMember(idx)} className="text-gray-600 hover:text-red-500 transition-colors">
                                                            <XCircle size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <input className="sub-input" name="name" placeholder="Full Name" required onChange={(e) => handleMemberChange(idx, e)} />
                                                        <input className="sub-input" name="email" placeholder="Email Address" onChange={(e) => handleMemberChange(idx, e)} />
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {formData.teamMembers.length + 1 < maxTotal && (
                                                <button 
                                                    type="button" 
                                                    onClick={addMember}
                                                    className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 text-[10px] font-black uppercase tracking-widest hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/5 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <PlusCircle size={14} /> Add Additional Member
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* --- STICKY FOOTER --- */}
                <div className="p-6 md:p-8 border-t border-white/5 bg-[#0a0a0a] rounded-b-[2.5rem]">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            form="reg-form"
                            disabled={loading} 
                            type="submit" 
                            className="flex-[2] py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl transition-all shadow-xl shadow-violet-900/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? <Zap size={14} className="animate-spin" /> : <ShieldCheck size={16} />}
                            {loading ? "Authenticating..." : `Finalize Registration ${event.fee > 0 ? `(₹${event.fee})` : ''}`}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>

                <style jsx="true">{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.3); border-radius: 10px; }
                    .p-1px { padding: 1px; }
                    .sub-input {
                        width: 100%;
                        background: rgba(0,0,0,0.2);
                        border: 1px solid rgba(255,255,255,0.05);
                        border-radius: 12px;
                        padding: 0.75rem 1rem;
                        font-size: 0.75rem;
                        color: white;
                        outline: none;
                        transition: all 0.2s;
                    }
                    .sub-input:focus { border-color: #7c3aed; background: rgba(0,0,0,0.4); }
                `}</style>
            </motion.div>
        </div>
    );
};

// Internal Helper Components
const SectionTitle = ({ icon, title }) => (
    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
        <span className="p-1.5 rounded-lg bg-white/5 text-violet-500">{icon}</span>
        {title}
    </h4>
);

const InputField = ({ label, highlight, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">{label}</label>
        <input 
            {...props}
            className={`w-full bg-white/[0.03] border ${highlight ? 'border-violet-500/30 bg-violet-500/5' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-gray-700 outline-none focus:border-violet-500 focus:bg-white/[0.06] transition-all`}
            placeholder={props.placeholder || `Enter ${label}`}
        />
    </div>
);

export default RegistrationForm;