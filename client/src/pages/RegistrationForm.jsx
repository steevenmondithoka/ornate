import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Mail, Phone, Building, Users, 
    AlertCircle, CheckCircle, PlusCircle, XCircle 
} from 'lucide-react';

const API_BASE = "http://localhost:5000/api";

/**
 * Robust parsing for event.teamSize strings like:
 * "Individual", "2 members", "2-4 members", "up to 5 members"
 */
const parseTeamLimits = (str) => {
    const s = str ? str.toLowerCase() : 'individual';
    if (s.includes('individual')) return { min: 1, max: 1 };
    
    // Check for ranges like "2-4"
    const rangeMatch = s.match(/(\d+)-(\d+)/);
    if (rangeMatch) return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
    
    // Check for "up to X"
    const upToMatch = s.match(/up to (\d+)/);
    if (upToMatch) return { min: 1, max: parseInt(upToMatch[1]) };

    // Check for fixed numbers like "3 members"
    const fixedMatch = s.match(/(\d+)/);
    if (fixedMatch) return { min: parseInt(fixedMatch[1]), max: parseInt(fixedMatch[1]) };

    return { min: 1, max: 1 };
};

const RegistrationForm = ({ event, onClose, onRegistrationSuccess }) => {
    const { min: minTotal, max: maxTotal } = parseTeamLimits(event.teamSize);
    const isTeamEvent = maxTotal > 1;

    // Initial State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        department: '',
        year: '',
        teamName: '',
        // We store additional members (Member 2, Member 3...) here
        teamMembers: Array(minTotal > 1 ? minTotal - 1 : 0).fill({ name: '', email: '' }),
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ msg: '', type: '' });

    // Handle standard inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle dynamic member inputs
    const handleMemberChange = (index, e) => {
        const updated = [...formData.teamMembers];
        updated[index] = { ...updated[index], [e.target.name]: e.target.value };
        setFormData({ ...formData, teamMembers: updated });
    };

    const addMember = () => {
        if (formData.teamMembers.length + 1 < maxTotal) {
            setFormData({
                ...formData,
                teamMembers: [...formData.teamMembers, { name: '', email: '' }]
            });
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

        // Extra frontend validation for Team Name
        if (isTeamEvent && !formData.teamName.trim()) {
            setStatus({ msg: "Team Name is required!", type: "error" });
            setLoading(false);
            return;
        }

        try {
            const payload = {
                eventId: event._id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                department: formData.department,
                year: formData.year,
            };

            if (isTeamEvent) {
                payload.teamName = formData.teamName;
                payload.teamMembers = formData.teamMembers;
            }

            const res = await axios.post(`${API_BASE}/registrations`, payload);
            setStatus({ msg: res.data.message, type: 'success' });
            
            // Wait slightly before closing so user sees success message
            setTimeout(() => {
                onRegistrationSuccess();
            }, 2000);

        } catch (err) {
            setStatus({ 
                msg: err.response?.data?.message || "Registration failed. Try again.", 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-morphism rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/10"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-violet-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">Entry Portal</p>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                            {event.name}<span className="text-violet-600">.</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                        <XCircle size={24} />
                    </button>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                    {status.msg && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className={`flex items-center gap-3 p-4 mb-6 rounded-2xl border ${
                                status.type === 'success' 
                                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}
                        >
                            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <p className="text-sm font-bold">{status.msg}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION: MAIN PARTICIPANT */}
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500">
                            <User size={14} className="text-violet-500" /> 
                            {isTeamEvent ? "Team Leader Info" : "Participant Info"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="admin-input" name="name" placeholder="Full Name" required onChange={handleChange} />
                            <input className="admin-input" name="email" type="email" placeholder="Email" required onChange={handleChange} />
                            <input className="admin-input" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                            <input className="admin-input" name="college" placeholder="College Name" required onChange={handleChange} />
                            <input className="admin-input" name="department" placeholder="Branch / Dept" required onChange={handleChange} />
                            <input className="admin-input" name="year" placeholder="Year (e.g. 3rd Year)" required onChange={handleChange} />
                        </div>
                    </div>

                    {/* SECTION: TEAM DETAILS */}
                    {isTeamEvent && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 p-6 bg-violet-600/5 rounded-3xl border border-violet-500/20"
                        >
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400">
                                <Users size={14} /> Team Configuration ({minTotal}-{maxTotal} People)
                            </h4>
                            
                            <input 
                                className="admin-input border-violet-500/30 focus:border-violet-500 shadow-lg shadow-violet-500/5" 
                                name="teamName" 
                                placeholder="Team Name (Required)" 
                                required 
                                onChange={handleChange} 
                            />

                            <div className="space-y-3 mt-4">
                                {formData.teamMembers.map((member, idx) => (
                                    <div key={idx} className="relative group p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-gray-600 uppercase">Member {idx + 2}</span>
                                            {formData.teamMembers.length + 1 > minTotal && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeMember(idx)}
                                                    className="text-red-500/50 hover:text-red-500 transition-colors"
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input 
                                                className="admin-input py-3" 
                                                name="name" 
                                                placeholder="Name" 
                                                required 
                                                onChange={(e) => handleMemberChange(idx, e)} 
                                            />
                                            <input 
                                                className="admin-input py-3" 
                                                name="email" 
                                                placeholder="Email (Optional)" 
                                                onChange={(e) => handleMemberChange(idx, e)} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {formData.teamMembers.length + 1 < maxTotal && (
                                <button 
                                    type="button" 
                                    onClick={addMember}
                                    className="w-full py-4 border-2 border-dashed border-violet-500/20 rounded-2xl text-violet-400 text-[10px] font-black uppercase tracking-widest hover:bg-violet-500/10 hover:border-violet-500/40 transition-all flex items-center justify-center gap-2"
                                >
                                    <PlusCircle size={14} /> Add Team Member
                                </button>
                            )}
                        </motion.div>
                    )}

                    {/* Footer Buttons */}
                    <div className="pt-4 space-y-3">
                        <button 
                            disabled={loading} 
                            type="submit" 
                            className="admin-btn-primary w-full py-5 text-sm shadow-[0_10px_40px_rgba(124,58,237,0.3)]"
                        >
                            {loading ? "Establishing Link..." : `Confirm Registration ${event.fee > 0 ? `(₹${event.fee})` : ''}`}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] hover:text-white transition-colors"
                        >
                            Cancel and Return
                        </button>
                    </div>
                </form>

                {/* CSS Block */}
                <style jsx="true">{`
                    .glass-morphism {
                        background: rgba(3, 0, 20, 0.9);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                    }
                    .admin-input {
                        width: 100%;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 1.25rem;
                        padding: 1rem;
                        outline: none;
                        font-size: 0.875rem;
                        color: white;
                        transition: all 0.3s;
                    }
                    .admin-input:focus {
                        border-color: #7c3aed;
                        background: rgba(255, 255, 255, 0.06);
                        box-shadow: 0 0 20px rgba(124, 58, 237, 0.1);
                    }
                    .admin-btn-primary {
                        background: #7c3aed;
                        color: white;
                        border-radius: 1.25rem;
                        font-weight: 900;
                        text-transform: uppercase;
                        letter-spacing: 0.15em;
                        transition: all 0.3s;
                    }
                    .admin-btn-primary:hover {
                        background: #8b5cf6;
                        transform: translateY(-2px);
                    }
                    .admin-btn-primary:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    .registration-form-container::-webkit-scrollbar {
                        width: 4px;
                    }
                    .registration-form-container::-webkit-scrollbar-thumb {
                        background: #7c3aed;
                        border-radius: 10px;
                    }
                `}</style>
            </motion.div>
        </div>
    );
};

export default RegistrationForm;