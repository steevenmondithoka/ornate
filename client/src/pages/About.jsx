import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowUpRight, MapPin, Target, Users, Zap, Cpu, Music, ShieldCheck
} from 'lucide-react';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef(null);

    // Optimized Scroll Tracking (Only for the big parallax text)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    // Using simple transforms (fastest for GPU)
    const textMove = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/";

    // Animation Variants for re-use (Memory efficient)
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div ref={containerRef} className="relative bg-[#020202] text-white overflow-x-hidden pt-16">
            
            {/* --- PERFORMANCE OPTIMIZED BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Static Grid (Low CPU usage) */}
                <div className="absolute inset-0 opacity-[0.1]" 
                     style={{ backgroundImage: `radial-gradient(#1e1b4b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                
                {/* Simplified Orbs - No Blur on mobile to prevent lag */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/5 rounded-full hidden md:block blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/5 rounded-full hidden md:block blur-[100px]" />
            </div>

            {/* --- UPDATES TICKER --- */}
            <div className="relative z-50 border-y border-white/5 bg-black/80">
                <UpdatesTicker />
            </div>

            <main className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
                
                {/* 1. HERO SECTION - Uses whileInView for performance */}
                <section className="min-h-[70vh] flex flex-col justify-center py-16 md:py-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-10 bg-violet-500" />
                            <span className="text-violet-500 font-mono text-[10px] uppercase tracking-[0.4em]">Est. 2017 // Phase IX</span>
                        </div>
                        <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8 will-change-transform">
                            BEYOND <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 italic">LIMITS.</span>
                        </h1>
                        <p className="max-w-xl text-gray-400 text-base md:text-xl font-light leading-relaxed border-l-2 border-violet-500/20 pl-6">
                            The 9th edition of India's most avant-garde technical confluence. Hosted at RGUKT Ongole.
                        </p>
                    </motion.div>
                </section>

                {/* 2. STATS GRID */}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
                    <GlassStat icon={<Users size={18}/>} value="3000+" label="Peers" />
                    <GlassStat icon={<Zap size={18}/>} value="50+" label="Events" />
                    <GlassStat icon={<Cpu size={18}/>} value="12" label="Talks" />
                    <GlassStat icon={<ShieldCheck size={18}/>} value="9" label="Editions" />
                </section>

                {/* 3. PARALLAX TEXT (GPU Accelerated) */}
                <div className="relative w-full py-12 md:py-20 overflow-hidden pointer-events-none bg-white/[0.02] rounded-3xl mb-32">
                    <motion.div style={{ x: textMove }} className="flex whitespace-nowrap will-change-transform">
                        <h2 className="text-[10vw] font-black uppercase text-white/[0.05] flex gap-10">
                            <span>RGUKT ONGOLE</span> <span>•</span> <span>ORNATE 2K26</span> <span>•</span> <span>INNOVATE</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 4. OPTIMIZED COLLEGE IMAGE */}
                <section className="mb-32">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group rounded-[2rem] overflow-hidden border border-white/10 aspect-video md:aspect-[21/9] will-change-transform"
                    >
                        <img
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
                            alt="Venue"
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        
                        <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                            <div className="max-w-2xl">
                                <h3 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter mb-2">THE ARENA.</h3>
                                <p className="text-gray-300 text-xs md:text-base mb-6 opacity-80">RGUKT Ongole transforms into a high-tech sanctuary for the leaders of tomorrow.</p>
                                <a
                                    href={mapLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-transform active:scale-95"
                                >
                                    <MapPin size={14} /> Locate Campus
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 5. PILLARS */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PillarCard index="01" title="Innovation" desc="Where code meets physical form. AI models to heavy-duty robotics." />
                    <PillarCard index="02" title="Expression" desc="Celebrating the soul. Culturals, music festivals, and arts." />
                    <PillarCard index="03" title="Legacy" desc="Building a community that lasts beyond the final curtain call." />
                </section>

            </main>
        </div>
    );
}

/* --- OPTIMIZED SUB-COMPONENTS --- */

function GlassStat({ icon, value, label }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center md:text-left transition-colors hover:bg-white/[0.06]"
        >
            <div className="text-violet-500 mb-3 flex justify-center md:justify-start">{icon}</div>
            <div className="text-2xl md:text-4xl font-black tracking-tighter">{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{label}</div>
        </motion.div>
    );
}

function PillarCard({ index, title, desc }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-[#080808] border border-white/5 rounded-[2rem] relative overflow-hidden group"
        >
            <span className="text-violet-600 font-mono text-[10px] mb-4 block tracking-widest">{index} // PHASE</span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-3 transition-colors group-hover:text-violet-400">
                {title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{desc}</p>
            <Link to="/events" className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                Explore <ArrowUpRight size={12} className="text-violet-500" />
            </Link>
            {/* Minimal background flair */}
            <div className="absolute -right-4 -bottom-4 text-7xl font-black text-white/[0.02] pointer-events-none group-hover:text-violet-500/[0.03] transition-colors">
                {index}
            </div>
        </motion.div>
    );
}