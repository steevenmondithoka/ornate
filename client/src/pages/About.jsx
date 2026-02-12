import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowUpRight, MapPin, Sparkles, Target, Users, 
  ChevronRight, Zap, Globe, Cpu, Music 
} from 'lucide-react';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/";

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-white overflow-hidden pt-[64px]">
            
            {/* 1. UPDATES TICKER (Immediate below Navbar) */}
            <div className="sticky top-[64px] z-[40] bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
                <UpdatesTicker />
            </div>

            {/* BACKGROUND DECORATION: CYBER GRID */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10 pb-32">
                
                {/* 2. HERO SECTION */}
                <div className="pt-20 lg:pt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100px" }}
                            className="h-[2px] bg-violet-500 mb-8"
                        />
                        <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase mb-6">
                            LIMITLESS <br />
                            <span className="italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                                VISION.
                            </span>
                        </h1>
                        <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">
                            / / RGUKT ONGOLE • VOL IX
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed">
                            Ornate 2k26 isn't just a fest; it's a <span className="text-white font-semibold">digital uprising</span>. 
                            We bridge the gap between abstract code and physical reality at the heart of Andhra Pradesh.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <FeatureBadge icon={<Zap size={14}/>} text="Innovation Driven" />
                            <FeatureBadge icon={<Globe size={14}/>} text="Pan-India Reach" />
                        </div>
                    </motion.div>
                </div>

                {/* 3. PARALLAX GHOST TEXT */}
                <div className="w-full relative py-20 overflow-hidden select-none pointer-events-none">
                    <motion.div style={{ x: xPos, rotateZ: rotate }} className="flex whitespace-nowrap">
                        <h2 className="text-[18vw] font-black uppercase tracking-tighter leading-none text-white/[0.03] italic">
                            ENGINEERING THE FUTURE • CREATE • INSPIRE • 
                        </h2>
                    </motion.div>
                </div>

                {/* 4. THE EXPERIENCE GRID (New Feature) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                    <ExperienceCard icon={<Cpu />} title="Tech" desc="Robotics & AI hackathons" color="from-blue-500" />
                    <ExperienceCard icon={<Music />} title="Vibe" desc="Pro-shows & EDM nights" color="from-fuchsia-500" />
                    <ExperienceCard icon={<Target />} title="Gaming" desc="E-Sports arenas" color="from-violet-500" />
                    <ExperienceCard icon={<Users />} title="Network" desc="Connect with 3k+ peers" color="from-amber-500" />
                </div>

                {/* --- IMPACT STATS --- */}
                <div className="mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
                        <Stat value="50+" label="Challenges" />
                        <Stat value="3000+" label="Participants" />
                        <Stat value="100+" label="Prototypes" />
                    </div>
                </div>

                {/* 5. CINEMATIC VENUE SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-40 relative group rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                >
                    <div className="h-[600px] w-full">
                        <img
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
                            alt="RGUKT Ongole"
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[3s]"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">The Arena</h3>
                            <p className="text-gray-400 text-lg">Located in the historic city of Ongole, our campus serves as a 100-acre sandbox for the leaders of tomorrow.</p>
                        </div>
                        <motion.a
                            href={mapLink}
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs"
                        >
                            <MapPin size={18} /> Locate Campus
                        </motion.a>
                    </div>
                </motion.div>

                {/* 6. PILLARS WITH HOVER DEPTH */}
                <div className="mt-40">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-violet-500 font-mono text-xs tracking-widest uppercase">/ / Foundations</span>
                            <h2 className="text-5xl font-black uppercase tracking-tighter mt-2">Core Pillars</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PillarCard index="01" title="Innovation" tag="Tech" desc="Pushing boundaries in Engineering and AI, fostering a culture of creation." link="/innovation" />
                        <PillarCard index="02" title="Expression" tag="Arts" desc="A stage for creative souls, celebrating music and cultural narratives." link="/expression" />
                        <PillarCard index="03" title="Legacy" tag="Impact" desc="Building foundations for tomorrow's leaders and strong community bonds." link="/legacy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function FeatureBadge({ icon, text }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-violet-300">
            {icon} {text}
        </div>
    );
}

function ExperienceCard({ icon, title, desc, color }) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all"
        >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {icon}
            </div>
            <h4 className="text-xl font-bold uppercase mb-2">{title}</h4>
            <p className="text-gray-500 text-sm">{desc}</p>
        </motion.div>
    );
}

function Stat({ value, label }) {
    return (
        <div className="p-12 text-center bg-[#080808] hover:bg-violet-600/5 transition-colors">
            <h3 className="text-6xl font-black mb-2 tracking-tighter italic">{value}</h3>
            <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.3em]">{label}</p>
        </div>
    );
}

function PillarCard({ index, title, tag, desc, link }) {
    return (
        <div className="group relative p-10 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl font-black italic">{index}</span>
            </div>
            <div className="relative z-10">
                <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                <h3 className="text-3xl font-bold uppercase tracking-tighter mt-6 mb-4">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{desc}</p>
                <Link to={link} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                    Explore <ArrowUpRight size={16} className="text-violet-500" />
                </Link>
            </div>
        </div>
    );
}