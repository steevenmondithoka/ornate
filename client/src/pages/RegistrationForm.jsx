import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Required for Portal
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Users, AlertCircle, CheckCircle, PlusCircle, XCircle,
    Zap, ShieldCheck
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

    // Prevent background scrolling when form is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

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

    // THE PORTAL RENDER
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-xl p-0 md:p-6">
            <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-t-[2.5rem] md:rounded-[2.5rem] border-x border-t md:border border-white/10 flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
                {/* Mobile Drag Handle */}
                <div className="md:hidden w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 mb-2" />

                <div className="flex justify-between items-center px-6 py-4 md:p-8 border-b border-white/5">
                    <div>
                        <p className="text-violet-500 font-black text-[9px] tracking-widest uppercase">Registration Portal</p>
                        <h2 className="text-xl md:text-2xl font-black text-white uppercase italic">{event.name}</h2>
                    </div>
                    <button onClick={onClose} className="p-2.5 bg-white/5 rounded-full text-gray-400 hover:text-white transition-all">
                        <XCircle size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                    <AnimatePresence>
                        {status.msg && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-2xl border text-xs font-bold ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                {status.msg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form id="reg-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Name" name="name" onChange={handleChange} required />
                        <InputField label="Email" name="email" type="email" onChange={handleChange} required />
                        <InputField label="Phone" name="phone" onChange={handleChange} required />
                        <InputField label="College" name="college" onChange={handleChange} required />
                        <InputField label="Dept" name="department" onChange={handleChange} required />
                        <InputField label="Year" name="year" onChange={handleChange} required />

                        {isTeamEvent && (
                            <div className="md:col-span-2 mt-6 space-y-4">
                                <h4 className="text-[10px] font-black text-violet-500 uppercase tracking-widest border-l-2 border-violet-600 pl-3">Team Configuration</h4>
                                <InputField label="Team Name" name="teamName" highlight onChange={handleChange} required />
                                
                                {formData.teamMembers.map((member, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                                        <div className="flex justify-between items-center text-[9px] font-black text-gray-500">
                                            <span>MEMBER 0{idx + 2}</span>
                                            <button type="button" onClick={() => removeMember(idx)} className="text-red-500">REMOVE</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <input className="sub-input" name="name" placeholder="Name" required onChange={(e) => handleMemberChange(idx, e)} />
                                            <input className="sub-input" name="email" placeholder="Email" onChange={(e) => handleMemberChange(idx, e)} />
                                        </div>
                                    </div>
                                ))}

                                {formData.teamMembers.length + 1 < maxTotal && (
                                    <button type="button" onClick={addMember} className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[9px] font-black uppercase text-gray-400 hover:text-violet-400 hover:border-violet-500/50 transition-all">
                                        + Add Team Member
                                    </button>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                <div className="p-6 md:p-8 border-t border-white/5 bg-black/40">
                    <button form="reg-form" disabled={loading} className="w-full py-4 bg-violet-600 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-violet-900/20 active:scale-95 transition-all">
                        {loading ? "Processing..." : `Confirm Entry ${event.fee > 0 ? `(₹${event.fee})` : ''}`}
                    </button>
                </div>

                <style jsx="true">{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #7c3aed33; border-radius: 10px; }
                    .sub-input { width: 100%; background: #000; border: 1px solid #ffffff10; border-radius: 10px; padding: 10px 14px; color: #fff; font-size: 13px; outline: none; }
                `}</style>
            </motion.div>
        </div>,
        document.body // This teleports it to the root of your HTML!
    );
};

const InputField = ({ label, highlight, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">{label}</label>
        <input 
            {...props}
            className={`w-full bg-white/[0.03] border ${highlight ? 'border-violet-500/40' : 'border-white/5'} rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 outline-none focus:border-violet-600 transition-all`}
            placeholder={`Your ${label}`}
        />
    </div>
);

export default RegistrationForm;