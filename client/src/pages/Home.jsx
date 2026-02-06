import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Countdown from '../components/Countdown';
import { Cpu, Settings, Zap, Building2, Radio, Quote, ArrowUpRight, Calendar, MapPin, Sparkles, FileText, Download, Clock } from 'lucide-react';
import Sponsors from './Sponsors';
import leaveLetter from '../assets/Steeven_Leave_letter.pdf';
import { UpdatesTicker } from '../components/UpdatesTicker';
import logo from '../assets/ornate.png';
import { formatDate } from '../utils/formatDate';

// Update your metadata array at the top of Home.jsx
const deptMetadata = [
    { id: "all", name: "Common Events", icon: <Sparkles />, color: "from-violet-500/20" },
    { id: "cse", name: "Computer Science", icon: <Cpu />, color: "from-blue-500/20" },
    { id: "mech", name: "Mechanical", icon: <Settings />, color: "from-red-500/20" },
    { id: "ece", name: "ECE", icon: <Radio />, color: "from-purple-500/20" },
    { id: "eee", name: "EEE", icon: <Zap />, color: "from-yellow-500/20" },
    { id: "civil", name: "Civil", icon: <Building2 />, color: "from-green-500/20" }
];

export default function Home() {
    const [dbEvents, setDbEvents] = useState([]);
    // New state to manage which departments have their events expanded
    const [expandedDepartments, setExpandedDepartments] = useState({});

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    // Fetch all events from the backend to display them on the home page
    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get('https://ornate-evkf.onrender.com/api/events');
                setDbEvents(res.data);
            } catch (err) {
                console.error("Backend not connected or error fetching events", err);
            }
        };
        fetchAllEvents();
    }, []);

    const adminUpdates = [
        "Registrations for 'Hack-A-Thon' are now live!",
        "Cultural Night guest list announced — stay tuned.",
        "Early bird passes sold out. Standard passes available.",
        "Workshop on Generative AI starting in 48 hours.",
        "Prize pool for technical events upgraded to 50k INR."
    ];

    // Function to toggle the expanded state for a specific department
    const toggleShowAll = (deptId) => {
        setExpandedDepartments(prevState => ({
            ...prevState,
            [deptId]: !prevState[deptId] // Toggle the boolean value for that deptId
        }));
    };

    return (
        <div className="pt-20 max-w-full">
            {/* 1. HERO SECTION */}
            <section className="min-h-[100vh] flex flex-col justify-center px-4 sm:px-8 md:px-20 relative overflow-hidden bg-[#050505] text-white py-20">

                {/* --- TOP RIGHT FEST IMAGE START --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute top-10 -right-10 md:right-10 lg:right-20 w-48 md:w-72 lg:w-96 aspect-[4/5] z-0 hidden sm:block"
                >
                    {/* Animated Frame */}
                    <div className="relative w-7xl h-full rotate-6 group">
                        {/* Glow behind image */}
                        <div className="absolute -inset-4 bg-violet-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition duration-1000" />

                        {/* The Image Container */}
                        <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000"
                                alt="Fest Mood"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                            />
                            {/* Violet Color Grade Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-600/20 to-transparent mix-blend-color" />

                            {/* Cinematic Noise/Grain Overlay (Optional) */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                        </div>

                        {/* Decorative Badge on Image */}
                        <div className="absolute -bottom-4 -left-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl rotate-[-12deg]">
                            <p className="text-[10px] font-black tracking-widest uppercase text-violet-400">Live the Night</p>
                        </div>
                    </div>
                </motion.div>
                {/* --- TOP RIGHT FEST IMAGE END --- */}

                {/* --- FULL SECTION BACKGROUND IMAGE --- */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* The Image */}
                    <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }} // Lower opacity (0.4) keeps it premium
                        transition={{ duration: 2, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000"
                        alt="Fest Background"
                        className="w-full h-7xl object-cover object-center grayscale hover:grayscale-0 transition-all duration-[3000ms]"
                    />

                    {/* 1. The "Scrub" Gradient: Blacks out the left side for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 sm:via-[#050505]/60 to-transparent z-10" />

                    {/* 2. Bottom Fade: Blends the image into the next section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 z-10" />

                    {/* 3. Violet Tint: Forces the image to match your color theme */}
                    <div className="absolute inset-0 bg-violet-900/10 mix-blend-color z-10" />
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="absolute top-0 left-0 w-full z-[100]">
                    <UpdatesTicker />
                </div>
                <div className="max-w-full mx-auto w-full relative z-20"> {/* z-20 keeps content above background */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full"
                    >



                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] sm:text-xs md:text-sm uppercase mb-4 md:mb-8">
                            RGUKT ONGOLE PRESENTS
                        </p>

                        <h1 className="text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[12rem] font-black tracking-[-0.08em] leading-[0.75] mb-8 md:mb-12 uppercase">
                            <span className="block flex text-white">
                                ORNATE
                            </span>
                            <span className="block text-violet-600 opacity-90 transition-all hover:tracking-[0.1em] duration-700 cursor-default">
                                2K26
                            </span>
                        </h1>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mt-4 md:mt-10">
                        {/* Description Box */}
                        <div className="max-w-full sm:max-w-sm border-l-2 border-violet-500/50 pl-4 md:pl-8 backdrop-blur-[2px]">
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                A premium intersection of high-end technical innovation and avant-garde cultural expressions.
                                <span className="block mt-4 text-violet-400 font-mono text-xs tracking-widest uppercase">
                                    March 28 — 30
                                </span>
                            </p>

                            <div className="flex flex-col items-start gap-6 mt-8">
                                <motion.a
                                    href={leaveLetter}
                                    download="Ornate 2K26.pdf"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group/btn cursor-pointer"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-30 group-hover/btn:opacity-100 transition duration-500" />
                                    <div className="relative flex items-center gap-4 bg-violet-600 text-white px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all">
                                        Download Brochure <Download size={18} className="animate-bounce" />
                                    </div>
                                </motion.a>


                            </div>
                        </div>

                        {/* Countdown */}
                        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                            <div className="scale-75 sm:scale-90 md:scale-100 origin-center lg:origin-right backdrop-blur-md bg-black/20 p-6 rounded-[2rem] border border-white/5">
                                <Countdown />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle Decorative Line */}
                <div className="hidden md:block absolute bottom-10 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent z-10" />
            </section>

            {/* 2. ABOUT SECTION */}
            <section className="py-40 px-6 border-y border-white/5">
                <div className="max-w-full mx-auto flex flex-col md:flex-row gap-20">
                    <div className="flex-1">
                        <h2 className="text-4xl font-light italic tracking-tight mb-8 text-reveal">The Philosophy of Ornate.</h2>
                    </div>
                    <div className="flex-1 space-y-6 text-gray-400 font-light leading-loose">
                        <p>Ornate is not just a fest; it's an ecosystem of excellence. We curate events that challenge the intellectual boundaries of engineering students across India.</p>
                        <p>From deep-tech robotics to the most expressive art forms, we create a space where discipline meets creativity.</p>
                    </div>

                </div>
                <section className="py-20 px-6 relative overflow-hidden">
                    {/* Subtle Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-full mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-morphism p-10 md:p-16 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group"
                        >
                            {/* Animated Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
                                    <FileText size={12} /> Institutional Guide
                                </div>
                                <h2 className="text-4xl md:text-5xl font-medium tracking-tighter italic leading-tight">
                                    Access the <br /> <span className="text-violet-500 text-reveal uppercase not-italic font-bold">Blueprint.</span>
                                </h2>
                                <p className="text-gray-500 text-sm md:text-base font-light max-w-md leading-relaxed">
                                    Download the official Ornate 2k26 brochure for comprehensive event guidelines, prize structures, and the detailed rulebook.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                {/* The Motion Link - Replaces <a> and <button> nesting */}
                                <motion.a
                                    href={leaveLetter}
                                    download="Ornate 2K26.pdf"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group/btn cursor-pointer"
                                >
                                    {/* The Glow Background Effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-30 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200" />

                                    {/* The Visual Button Content */}
                                    <div className="relative flex items-center gap-4 bg-violet-600 text-white px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all">
                                        Download Brochure <Download size={18} className="animate-bounce" />
                                    </div>
                                </motion.a>

                                {/* Info text */}
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em] flex items-center gap-2">
                                    PDF Format <span className="w-1 h-1 bg-gray-800 rounded-full" />
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section >
            </section >

            {/* 3. DEPARTMENTAL NAVIGATION (Grid) */}
            <section section className="py-40 px-6 max-w-full mx-auto" >
                <div className="flex justify-between items-center mb-24">
                    <h2 className="text-5xl tracking-tighter uppercase font-medium">Departmental <span className="ml-2 text-violet-500 italic">Events</span></h2>
                    <div className="hidden md:block w-40 h-[1px] bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deptMetadata.map((dept, i) => (
                        <Link key={dept.id} to={`/department/${dept.id}`}>
                            <motion.div whileHover={{ y: -10 }} className="p-10 border border-white/5 bg-white/[0.02] rounded-[3rem] hover:bg-white/[0.04] transition-all group relative overflow-hidden h-full">
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${dept.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-500 w-fit mb-8">{dept.icon}</div>
                                <h3 className="text-3xl font-medium mb-2 group-hover:text-violet-400 transition-colors">{dept.name}</h3>
                                <div className="flex items-center gap-2 text-violet-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-8">
                                    Enter Arena <ArrowUpRight size={14} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section >

            {/* 4. THE EVENT DIRECTORY (Rendering Details Here) */}
            <section className="py-20 bg-white/[0.01]" >
                <div className="max-w-full mx-auto px-6">
                    <h2 className="text-xs font-black tracking-[0.5em] uppercase text-gray-600 mb-20 text-center">Full Event Directory</h2>

                    <div className="space-y-32">
                        {deptMetadata.map((dept) => {
                            const filteredEvents = dbEvents.filter(ev => ev.dept === dept.id);

                            if (filteredEvents.length === 0) return null; // Don't render if no events

                            // Determine which events to show
                            const eventsToShow = expandedDepartments[dept.id] ? filteredEvents : filteredEvents.slice(0, 1);
                            const remainingEventsCount = filteredEvents.length - eventsToShow.length;

                            return (
                                <div key={dept.id} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-1">
                                        <h3 className="text-4xl font-medium italic mb-4">{dept.name}</h3>
                                        <p className="text-gray-500 text-sm">Explore the specialized challenges and workshops curated by the {dept.name} core team.</p>
                                    </div>

                                    <div className="lg:col-span-2 space-y-4">
                                        {eventsToShow.map((ev) => (
                                            <div key={ev._id} className="p-8 glass-morphism rounded-[2rem] border border-white/5 hover:border-violet-500/30 transition group">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-violet-400 transition">{ev.name}</h4>
                                                    </div>
                                                    <div className="flex gap-6 text-[10px] font-bold text-violet-500 uppercase tracking-widest">
                                                        <span className="flex items-center gap-2 text-white"><Calendar size={14} />{formatDate(ev.date)}</span> |
                                                        <span className="flex items-center gap-2 text-white"><Clock size={14} /> {ev.time}</span>|
                                                        <span className="flex items-center gap-2 text-white"><MapPin size={14} /> {ev.venue}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Show More/Less Button */}
                                        {filteredEvents.length > 5 && (
                                            <button
                                                onClick={() => toggleShowAll(dept.id)}
                                                className="mt-8 px-6 py-3 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
                                            >
                                                {expandedDepartments[dept.id] ? "Show Less" : `Show More (${remainingEventsCount} Events)`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section >

            {/* 5. SPONSORS */}
            < Sponsors />

            {/* 6. DIRECTOR'S MESSAGE */}
            <section className="relative py-40 px-6 max-w-7xl mx-auto text-center overflow-hidden">

                {/* Background Decorative Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />

                {/* Top Quote Icon with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative">
                        <Quote size={60} className="text-violet-500/30" />
                        <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
                    </div>
                </motion.div>

                {/* The Quote Text */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-5xl font-medium italic leading-[1.4] mb-16 text-white tracking-tight"
                    >
                        "Ornate 2k26 represents the <span className="text-violet-500">pinnacle of student ingenuity</span>. It is not just a festival; it is a declaration of our institute's commitment to excellence."
                    </motion.h2>
                </div>

                {/* Director's Profile Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    {/* Profile Image with Glow Ring */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-violet-500 rounded-full blur-md opacity-20 scale-110" />
                        <div className="relative w-28 h-28 rounded-full p-[2px] bg-gradient-to-b from-violet-500/50 to-transparent">
                            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-white/10">
                                <img
                                    src="https://rguktong.ac.in/images/gupta%20sir.jpeg"
                                    alt="Director"
                                    className="w-full h-full object-cover  transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name & Title */}
                    <div className="space-y-2">
                        <h3 className="text-white font-black tracking-[0.3em] uppercase text-sm md:text-base">
                            Dr. A V S S Kumara Swami Gupta
                        </h3>

                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[1px] w-8 bg-violet-500/40" />
                            <p className="text-violet-400 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase">
                                Director, RGUKT ONGOLE
                            </p>
                            <div className="h-[1px] w-8 bg-violet-500/40" />
                        </div>
                    </div>
                </motion.div>

                {/* Decorative bottom line */}
                <div className="mt-40 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>



        </div >
    );
}