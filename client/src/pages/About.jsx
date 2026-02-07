import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, MapPin, Sparkles, Target, Users, ChevronRight } from 'lucide-react';
import { UpdatesTicker } from '../components/UpdatesTicker';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/@15.537759,79.9299632,14z/data=!4m10!1m2!2m1!1srgukt+ongole!3m6!1s0x3a4b026c387b32f1:0x4b3fd97d72490b62!8m2!3d15.537759!4d79.968072!15sCgxyZ3VrdCBvbmdvbGWSAQp1bml2ZXJzaXR54AEA!16s%2Fg%2F11bccjvbhv?entry=ttu&g_ep=EgoyMDI2MDEyNy4wIKXMDSoASAFQAw%3D%3D";

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-white overflow-x-hidden pt-24 lg:pt-32 pb-32">
            
            {/* 1. PARALLAX GHOST TEXT & TICKER */}
            <div className="w-full relative py-3 lg:py-12 overflow-hidden select-none pointer-events-none border-y border-white/[0.03]">
                <UpdatesTicker />
                <motion.div
                    style={{ x: xPos, y: yText }}
                    className="flex whitespace-nowrap mt-8"
                >
                    <h2 className="text-[15vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-none text-white/[0.05]">
                        RGUKT ONGOLE • RGUKT ONGOLE • RGUKT ONGOLE •
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* 2. THE MAIN NARRATIVE SECTION */}
                <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start lg:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-violet-500 font-mono tracking-[0.4em] text-[10px] uppercase mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-violet-500"></span> The Narrative
                        </p>
                        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                            BEYOND <br />
                            <span className="italic font-light text-violet-600">LIMITS.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl text-gray-400 font-light leading-relaxed max-w-lg"
                    >
                        Ornate 2k26 is the <span className="text-white font-medium">9th edition</span> of India's most avant-garde technical confluence. Hosted at <span className="text-violet-400">RGUKT Ongole</span>, we foster an environment where innovation flourishes and creativity knows no bounds.
                    </motion.p>
                </div>

                {/* --- VISION & MISSION --- */}
                <div className="mt-32 lg:mt-48 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                        <p className="text-violet-500 font-mono tracking-[0.4em] text-[10px] uppercase mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-violet-500"></span> Our Purpose
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter uppercase">
                            Crafting Futures, <br /> Inspiring Excellence.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-10">
                        <Pillar icon={<Sparkles />} title="Vision" desc="To be a beacon of innovation and learning, empowering the next generation of leaders driving technological advancements globally." />
                        <Pillar icon={<Target />} title="Mission" desc="To provide an unparalleled platform for students to engage with cutting-edge technology and celebrate diverse cultures." />
                    </div>
                </div>

                {/* --- IMPACT STATS --- */}
                <div className="mt-32 lg:mt-48">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Stat value="50+" label="Technical Events" icon={<Sparkles size={24}/>} />
                        <Stat value="3000+" label="Attendees" icon={<Users size={24}/>} />
                        <Stat value="100+" label="Exhibits" icon={<Target size={24}/>} />
                    </div>
                </div>

                {/* 3. CINEMATIC COLLEGE IMAGE - RESPONSIVE FIX */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-32 lg:mt-48 relative group rounded-2xl overflow-hidden border border-white/10"
                >
                    {/* The Image Container */}
                    <div className="h-[500px] lg:aspect-video w-full overflow-hidden">
                        <img
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
                            alt="RGUKT Ongole"
                            className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                        />
                    </div>

                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:via-transparent" />
                    <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 mb-2 block">The Venue</span>
                            <p className="text-xl lg:text-2xl text-white font-light leading-snug">
                                Sprawling campus nestled in the serene landscapes of Andhra Pradesh.
                            </p>
                        </div>

                        {/* Map Link Action */}
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 group/btn w-fit z-30"
                        >
                            <div className="p-4 bg-violet-600 rounded-full text-white shadow-xl group-hover/btn:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                <p className="text-[10px] font-bold tracking-widest text-violet-400 uppercase">Host Institute</p>
                                <p className="text-xs lg:text-sm font-black text-white uppercase flex items-center gap-2">
                                    RGUKT Ongole Campus <ChevronRight size={14} />
                                </p>
                            </div>
                        </a>
                    </div>

                    <div className="absolute top-8 right-8 border border-white/20 px-4 py-1 rounded-full backdrop-blur-sm hidden sm:block">
                        <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">EST. 2017</span>
                    </div>
                </motion.div>

                {/* 4. THE THREE PILLARS */}
                <div className="mt-32 lg:mt-48">
                    <p className="text-violet-500 font-mono tracking-[0.4em] text-[10px] uppercase mb-12 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-violet-500"></span> Foundational Pillars
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        <PillarCard index="01" title="Innovation" tag="Tech" desc="Pushing boundaries in Engineering and AI, fostering a culture of creation." link="/innovation" />
                        <PillarCard index="02" title="Expression" tag="Arts" desc="A stage for creative souls, celebrating music and cultural narratives." link="/expression" />
                        <PillarCard index="03" title="Legacy" tag="Impact" desc="Building foundations for tomorrow's leaders and strong community bonds." link="/legacy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Internal Helper Components
function Pillar({ icon, title, desc }) {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="border-l border-white/10 pl-8">
            <div className="text-violet-500 mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function Stat({ value, label, icon }) {
    return (
        <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors">
            <div className="text-violet-500 mb-6">{icon}</div>
            <h3 className="text-4xl font-black text-white mb-1 tracking-tighter">{value}</h3>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{label}</p>
        </div>
    );
}

function PillarCard({ index, title, tag, desc, link }) {
    return (
        <div className="group border-l border-white/5 pl-8 py-2 hover:border-violet-500 transition-colors">
            <span className="text-violet-600 font-mono text-xs mb-4 block">{index}</span>
            <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-violet-500 transition-colors">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
            <Link to={link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors">
                {tag} <ArrowUpRight size={14} />
            </Link>
        </div>
    );
}