import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowUpRight, MapPin, Sparkles, Target, Users, 
  ChevronRight, Zap, Globe, Cpu, Music, ShieldCheck
} from 'lucide-react';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef(null);

    // Smooth scroll physics
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Parallax transformations
    const textMove = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
    const imageScale = useTransform(smoothProgress, [0.3, 0.6], [0.8, 1.1]);
    const opacityFade = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/";

    return (
        <div ref={containerRef} className="relative bg-[#020202] text-white overflow-hidden">
            
            {/* --- ADVANCED BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Cyber Grid */}
                <div className="absolute inset-0 opacity-[0.15]" 
                     style={{ backgroundImage: `linear-gradient(#1e1b4b 1px, transparent 1px), linear-gradient(90deg, #1e1b4b 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
                
                {/* Floating Orbs (Filling empty space) */}
                <motion.div 
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-[20%] -left-20 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" 
                />
                <motion.div 
                    animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-[10%] -right-20 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full" 
                />
                
                {/* Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* --- TOP SECTION --- */}
            <div className="relative z-[100] pt-20">
                <div className="border-y border-white/5 bg-black/40 backdrop-blur-xl">
                    <UpdatesTicker />
                </div>
            </div>

            <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pb-32">
                
                {/* 1. HERO NARRATIVE */}
                <section className="min-h-[80vh] flex flex-col justify-center py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <span className="h-[1px] w-12 bg-violet-500" />
                                <span className="text-violet-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">The 9th Odyssey</span>
                            </motion.div>
                            <h1 className="text-[clamp(3rem,10vw,12rem)] font-black leading-[0.8] tracking-tighter uppercase mb-8">
                                BEYOND <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500 italic">LIMITS.</span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 pb-4">
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-gray-400 text-lg md:text-xl font-light leading-relaxed border-l-2 border-violet-500/30 pl-6"
                            >
                                Ornate 2k26 stands as a testament to human ingenuity. A three-day sanctuary for hackers, artists, and visionaries.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* 2. STATS AUTO-GRID (Responsive from 1 to 4 cols) */}
                <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-40">
                    <GlassStat icon={<Users size={20}/>} value="3000+" label="Peers" />
                    <GlassStat icon={<Zap size={20}/>} value="50+" label="Events" />
                    <GlassStat icon={<Cpu size={20}/>} value="12" label="Workshops" />
                    <GlassStat icon={<ShieldCheck size={20}/>} value="9" label="Years" />
                </section>

                {/* 3. PARALLAX STRIP */}
                <div className="relative w-full py-20 overflow-hidden pointer-events-none bg-violet-600/5 rounded-3xl mb-40">
                    <motion.div style={{ x: textMove }} className="flex whitespace-nowrap">
                        <h2 className="text-[12vw] font-black uppercase text-white/[0.04] flex gap-20">
                            <span>RGUKT ONGOLE</span>
                            <span className="text-violet-500/20">ORNATE 2K26</span>
                            <span>INNOVATE</span>
                            <span className="text-violet-500/20">EXCEL</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 4. CINEMATIC COLLEGE IMAGE (HUD STYLE) */}
                <section className="mb-40">
                    <motion.div 
                        style={{ scale: imageScale }}
                        className="relative group rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 aspect-[16/10] md:aspect-video"
                    >
                        {/* The Image */}
                        <img
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
                            alt="College Venue"
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-[2s]"
                        />
                        
                        {/* HUD Effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                        
                        {/* Overlay Content */}
                        <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live Feed: Venue
                                    </span>
                                </div>
                                <div className="hidden md:block text-right font-mono text-[10px] text-white/40">
                                    LAT: 15.537759 <br /> LONG: 79.968072
                                </div>
                            </div>

                            <div className="max-w-2xl">
                                <h3 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter mb-4">THE MAIN STAGE.</h3>
                                <p className="text-gray-300 text-sm md:text-lg mb-8">Located in the heart of Andhra Pradesh, our campus transforms into a futuristic arena for 72 hours of pure adrenaline.</p>
                                <motion.a
                                    href={mapLink}
                                    target="_blank"
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-colors"
                                >
                                    <MapPin size={16} /> Navigate to Campus
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 5. THE THREE PILLARS (Advanced Hover Cards) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                    <PillarCard index="01" title="Innovation" color="border-blue-500/20" 
                        desc="Where code meets physical form. From AI models to heavy-duty robotics." />
                    <PillarCard index="02" title="Expression" color="border-fuchsia-500/20" 
                        desc="Celebrating the soul. Culturals, music festivals, and artistic outbursts." />
                    <PillarCard index="03" title="Legacy" color="border-amber-500/20" 
                        desc="Building a community that lasts beyond the final curtain call." />
                </section>

            </main>
        </div>
    );
}

/* --- HELPER COMPONENTS --- */

function GlassStat({ icon, value, label }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="relative p-6 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden group"
        >
            <div className="absolute -right-4 -top-4 opacity-[0.05] group-hover:scale-125 transition-transform">
                {icon}
            </div>
            <div className="text-violet-500 mb-4">{icon}</div>
            <div className="text-3xl md:text-5xl font-black tracking-tighter mb-1">{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</div>
        </motion.div>
    );
}

function PillarCard({ index, title, desc, color }) {
    return (
        <motion.div 
            whileHover={{ y: -15 }}
            className={`relative p-8 md:p-12 bg-[#080808] border ${color} rounded-[2.5rem] overflow-hidden group transition-all duration-500`}
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.02] group-hover:text-violet-500/[0.05] transition-colors">
                {index}
            </div>

            <div className="relative z-10">
                <span className="text-violet-500 font-mono text-xs mb-6 block tracking-widest">{index} // PHASE</span>
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 group-hover:text-violet-400 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-[280px]">
                    {desc}
                </p>
                
                <Link to="/events" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    View Portfolio <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-violet-500" />
                </Link>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}