import { motion } from 'framer-motion';
import { 
  ArrowUpRight, MapPin, Target, Users, Zap, Cpu, Music, ShieldCheck 
} from 'lucide-react';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { Link } from 'react-router-dom';

export default function About() {
    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/";
    const bgGif = "https://i.pinimg.com/originals/36/e4/d0/36e4d0b856694fc471344b644a1dd6e4.gif";

    // Animation presets for performance (GPU handled)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden pt-16 font-sans">
            
            {/* --- FIXED CINEMATIC BACKGROUND --- */}
            <div className="fixed inset-0 z-0">
                {/* The GIF Background */}
                <div 
                    className="absolute inset-0 opacity-[0.15] scale-110"
                    style={{ 
                        backgroundImage: `url(${bgGif})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'contrast(1.2) brightness(0.8)'
                    }}
                />
                {/* Vignette & Noise for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020202_100%)] opacity-70" />
            </div>

            {/* --- CONTENT WRAPPER --- */}
            <div className="relative z-10">
                
                {/* 1. UPDATES TICKER (Immediate) */}
                <div className="border-y border-white/5 bg-black/60 backdrop-blur-md">
                    <UpdatesTicker />
                </div>

                <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                    
                    {/* 2. HERO SECTION */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="py-20 md:py-32"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                            <span className="h-[2px] w-12 bg-violet-600 shadow-[0_0_10px_#7c3aed]" />
                            <span className="text-violet-400 font-mono text-xs uppercase tracking-[0.5em]">System.initialize(Ornate_2K26)</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-[14vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-12 will-change-transform">
                            BEYOND <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-400 to-purple-500 italic">
                                REALITY.
                            </span>
                        </motion.h1>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">
                                Ornate 2K26 is more than a festival—it's a <span className="text-white font-medium">digital frontier</span>. 
                                We are engineering an ecosystem where innovation, culture, and pure adrenaline collide.
                            </p>
                        </motion.div>
                    </motion.section>

                    {/* 3. PERFORMANCE-READY STATS GRID */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-32">
                        <StatCard icon={<Users />} value="3000+" label="Attendees" color="text-violet-500" />
                        <StatCard icon={<Zap />} value="50+" label="Events" color="text-fuchsia-500" />
                        <StatCard icon={<Cpu />} value="12" label="Workshops" color="text-blue-500" />
                        <StatCard icon={<ShieldCheck />} value="9" label="Editions" color="text-purple-500" />
                    </section>

                    {/* 4. CINEMATIC VENUE SECTION */}
                    <motion.section 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32 relative group rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[16/10] md:aspect-[21/9]"
                    >
                        <img 
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png" 
                            alt="College" 
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[1s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        {/* Interactive HUD Elements */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[10px] font-bold tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                                    VENUE: RGUKT ONGOLE
                                </div>
                            </div>
                            
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">The Mothership.</h2>
                                <a 
                                    href={mapLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 bg-violet-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/20"
                                >
                                    <MapPin size={16} /> Locate Campus
                                </a>
                            </div>
                        </div>
                    </motion.section>

                    {/* 5. PILLARS OF EXCELLENCE */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <Pillar 
                            index="01" 
                            title="Innovation" 
                            icon={<Cpu />} 
                            desc="The core engine. From AI breakthroughs to architectural marvels." 
                        />
                        <Pillar 
                            index="02" 
                            title="Expression" 
                            icon={<Music />} 
                            desc="The heartbeat. A stage for the musicians, dancers, and visual artists." 
                        />
                        <Pillar 
                            index="03" 
                            title="Legacy" 
                            icon={<Target />} 
                            desc="The impact. Creating bonds and memories that transcend the digital age." 
                        />
                    </section>

                </main>
            </div>
        </div>
    );
}

/* --- OPTIMIZED SUB-COMPONENTS --- */

function StatCard({ icon, value, label, color }) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm flex flex-col items-center md:items-start group transition-all"
        >
            <div className={`${color} mb-6 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className="text-3xl md:text-5xl font-black tracking-tighter mb-1">{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</div>
        </motion.div>
    );
}

function Pillar({ index, title, icon, desc }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-violet-600/10 hover:border-violet-500/30 transition-all relative overflow-hidden"
        >
            <div className="relative z-10">
                <div className="text-violet-500 mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-violet-500 group-hover:text-white transition-all">
                    {icon}
                </div>
                <span className="text-violet-500 font-mono text-[10px] mb-2 block tracking-widest">PHASE // {index}</span>
                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{desc}</p>
                <Link to="/events" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                    Initialize <ArrowUpRight size={14} className="text-violet-500" />
                </Link>
            </div>

            {/* Ghost Background Text */}
            <div className="absolute -right-4 -bottom-4 text-9xl font-black text-white/[0.01] pointer-events-none group-hover:text-violet-500/[0.03] transition-colors">
                {index}
            </div>
        </motion.div>
    );
}