import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, GraduationCap, Building2, Briefcase, Factory, CalendarCheck, Lightbulb, ArrowRight
} from 'lucide-react';

const API_BASE = "http://localhost:5000/api";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());
const BRANCHES = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];

export default function AlumniRegistrationPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        passingYear: YEARS[0],
        branch: BRANCHES[0],
        currentOccupation: '',
        companyName: '',
        attendFest: 'yes',
        conductEvent: 'no',
        eventIdea: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const dataToSend = { ...form };
            if (form.conductEvent === 'no') {
                dataToSend.eventIdea = '';
            }
            if (form.attendFest === 'no') {
                dataToSend.currentOccupation = '';
                dataToSend.companyName = '';
            }

            const res = await axios.post(`${API_BASE}/alumni-registrations`, dataToSend);
            setMessage({ type: 'success', text: res.data.msg });
            setForm({
                fullName: '',
                email: '',
                phoneNumber: '',
                passingYear: YEARS[0],
                branch: BRANCHES[0],
                currentOccupation: '',
                companyName: '',
                attendFest: 'yes',
                conductEvent: 'no',
                eventIdea: ''
            });
        } catch (err) {
            console.error("Alumni registration error:", err);
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" relative top-12 min-h-screen bg-[#030014] text-white flex flex-col lg:flex-row font-sans overflow-y-auto">
            {/* --- LEFT SIDE: THE VISUAL (Full width on mobile, half on large, 45% on xl) --- */}
            <div className="relative w-full lg:w-1/2 xl:w-[45%] bg-zinc-900/50 flex-shrink-0
                        min-h-[280px] md:min-h-[350px] lg:min-h-0 lg:h-auto pb-20"> {/* Added min-h and pb-20 for mobile */}
                {/* Header overlay on image */}
                <div className="absolute top-0 left-0 w-full p-6 z-30 bg-gradient-to-b from-black/80 to-transparent">
                    <h1 className="text-3xl font-black italic tracking-tighter text-white">
                        RGUKT ONGOLE'S ALUMNI <span className="text-violet-500">CONNECT</span>
                    </h1>
                    <p className="text-white/60 text-xs tracking-widest uppercase mt-1">Join the network</p>
                </div>

                {/* The Image */}
                <div className="absolute inset-0 w-full h-full"> {/* Changed to absolute inset-0 */}
                    <img
                        src="https://spu.edu/-/media/administration/center-career-calling/page-features/alumni-grads-page-feature.ashx?iar=0&hash=6CFBD3AB47F790877406E9E1C8BF6927"
                        alt="Alumni gathering"
                        className="w-full h-full object-cover opacity-70"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-6 right-6 z-20"> {/* Adjusted bottom */}
                    <h2 className="text-white text-3xl font-bold italic mb-2">Reconnect with your roots.</h2>
                    <p className="text-white/80 text-sm max-w-md">
                        We're excited to invite our esteemed alumni back to campus for Ornate 2k26! Share your journey, inspire the next generation, and relive your college memories.
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: THE FORM (Full width on mobile, half on large, 55% on xl) --- */}
            <div className="w-full lg:w-1/2 xl:w-[55%] py-8 px-6 md:p-10 bg-[#0a0a0a] flex-grow"> {/* Adjusted padding and removed internal overflow */}
                {/* Form content wrapper with max-width and centering */}
                <div className="w-full max-w-lg mx-auto">
                    <div className="flex items-center gap-2 mb-6 text-violet-500">
                        <GraduationCap size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Alumni Registration</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Full Name */}
                        <div className="group">
                            <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">FULL NAME</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="group">
                            <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">EMAIL</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="group">
                            <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">PHONE NUMBER</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                <input
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                    placeholder="999-888-7777"
                                />
                            </div>
                        </div>

                        {/* 2 Cols: Passing Year & Branch */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">PASSING YEAR</label>
                                <div className="relative">
                                    <CalendarCheck className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                    <select
                                        name="passingYear"
                                        value={form.passingYear}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white appearance-none cursor-pointer"
                                    >
                                        {YEARS.map(year => <option key={year} value={year} className="bg-black">{year}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">BRANCH</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                    <select
                                        name="branch"
                                        value={form.branch}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white appearance-none cursor-pointer"
                                    >
                                        {BRANCHES.map(branch => <option key={branch} value={branch} className="bg-black">{branch}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-600">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attending Fest Question */}
                        <div className="group">
                            <label className="text-xs text-zinc-500 font-medium ml-1 mb-2 block">WILL YOU BE ATTENDING ORNATE 2K26?</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex items-center text-sm text-white cursor-pointer">
                                    <input
                                        type="radio"
                                        name="attendFest"
                                        value="yes"
                                        checked={form.attendFest === 'yes'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-violet-600 bg-zinc-800 border-zinc-600 focus:ring-violet-500"
                                    />
                                    <span className="ml-2">Yes, I'm coming!</span>
                                </label>
                                <label className="flex items-center text-sm text-white cursor-pointer">
                                    <input
                                        type="radio"
                                        name="attendFest"
                                        value="no"
                                        checked={form.attendFest === 'no'}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-violet-600 bg-zinc-800 border-zinc-600 focus:ring-violet-500"
                                    />
                                    <span className="ml-2">No, maybe next time.</span>
                                </label>
                            </div>
                        </div>

                        {form.attendFest === 'yes' && (
                            <>
                                {/* 2 Cols: Occupation & Company */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="group">
                                        <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">CURRENT OCCUPATION</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                            <input
                                                name="currentOccupation"
                                                value={form.currentOccupation}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                                placeholder="Software Engineer, Entrepreneur, etc."
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">COMPANY NAME</label>
                                        <div className="relative">
                                            <Factory className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                            <input
                                                name="companyName"
                                                value={form.companyName}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                                placeholder="Google, Your Startup, etc."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Conduct Event Question */}
                                <div className="group">
                                    <label className="text-xs text-zinc-500 font-medium ml-1 mb-2 block">INTERESTED IN CONDUCTING AN EVENT / WORKSHOP?</label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <label className="flex items-center text-sm text-white cursor-pointer">
                                            <input
                                                type="radio"
                                                name="conductEvent"
                                                value="yes"
                                                checked={form.conductEvent === 'yes'}
                                                onChange={handleChange}
                                                className="form-radio h-4 w-4 text-violet-600 bg-zinc-800 border-zinc-600 focus:ring-violet-500"
                                            />
                                            <span className="ml-2">Yes! I have an idea.</span>
                                        </label>
                                        <label className="flex items-center text-sm text-white cursor-pointer">
                                            <input
                                                type="radio"
                                                name="conductEvent"
                                                value="no"
                                                checked={form.conductEvent === 'no'}
                                                onChange={handleChange}
                                                className="form-radio h-4 w-4 text-violet-600 bg-zinc-800 border-zinc-600 focus:ring-violet-500"
                                            />
                                            <span className="ml-2">No, just attending.</span>
                                        </label>
                                    </div>
                                </div>

                                {form.conductEvent === 'yes' && (
                                    <div className="group">
                                        <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">YOUR EVENT / WORKSHOP IDEA</label>
                                        <div className="relative">
                                            <Lightbulb className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                                            <textarea
                                                name="eventIdea"
                                                value={form.eventIdea}
                                                onChange={handleChange}
                                                rows="3"
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                                                placeholder="Briefly describe your event or workshop idea."
                                                required={form.conductEvent === 'yes'}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Action Button */}
                        <button
                            disabled={loading}
                            className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? "SUBMITTING..." : "REGISTER AS ALUMNI"}
                            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-4 p-3 rounded-lg text-center text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        <p className="text-center text-zinc-600 text-[10px] mt-4">
                            Your data will be used to facilitate alumni connections and event planning.
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}