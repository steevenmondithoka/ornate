import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, MapPin, Sparkles, Target, Users } from 'lucide-react'; // Added Sparkles, Target, Users icons
import { UpdatesTicker } from '../components/UpdatesTicker'; // Assuming this component exists
import { Link } from 'react-router-dom'; // Assuming you have react-router-dom for navigation

export default function About() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // New transform for vertical movement
    const opacityFade = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]); // For a fade effect

    const mapLink = "https://www.google.com/maps/place/RGUKT+IIIT+ONGOLE/@15.537759,79.9299632,14z/data=!4m10!1m2!2m1!1srgukt+ongole!3m6!1s0x3a4b026c387b32f1:0x4b3fd97d72490b62!8m2!3d15.537759!4d79.968072!15sCgxyZ3VrdCBvbmdvbGWSAQp1bml2ZXJzaXR54AEA!16s%2Fg%2F11bccjvbhv?entry=ttu&g_ep=EgoyMDI2MDEyNy4wIKXMDSoASAFQAw%3D%3D";

    return (
        <div ref={containerRef} className="relative  bg-[#020202] text-white overflow-scroll pb-32">

            {/* 1. PARALLAX GHOST TEXT & Updates Ticker */}
            <div className="w-full relative py-12 overflow-hidden select-none pointer-events-none border-y border-white/[0.03] mt-4">
                <div className=''>
                    <UpdatesTicker />
                </div>
                <motion.div
                    style={{ x: xPos, y: yText }} // Added yText for subtle vertical parallax
                    className="flex whitespace-nowrap"
                >
                    <h2 className="ml-10 text-[8vw] font-extrabold uppercase tracking-tighter leading-none text-white/[0.18] pr-10"> {/* Slightly increased opacity */}
                        RGUKT ONGOLE • RGUKT ONGOLE • RGUKT ONGOLE •
                    </h2>
                </motion.div>
            </div>


            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10"> {/* Changed max-w-full to max-w-7xl */}

                {/* 2. THE MAIN NARRATIVE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-10 flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-violet-500/50"></span> The Narrative
                        </p>
                        <h1 className="text-4xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase">
                            BEYOND <br />
                            <span className="italic font-light text-violet-600">LIMITS.</span>
                        </h1>
                    </motion.div>

                    {/* Right Side: Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-lg"
                    >
                        Ornate 2k26 is the <span className="text-white">9th edition</span> of India's most avant-garde technical and cultural confluence. Hosted at the heart of excellence—RGUKT Ongole. We bring together brilliant minds, fostering an environment where innovation flourishes and creativity knows no bounds.
                    </motion.p>
                </div>

                {/* --- NEW SECTION: Our Vision & Mission --- */}
                <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-6 flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-violet-500/50"></span> Our Purpose
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter uppercase mb-8">
                            Crafting Futures, <br /> Inspiring Excellence.
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="border-l border-white/5 pl-8 py-2"
                        >
                            <Sparkles size={32} className="text-violet-500 mb-4" />
                            <h3 className="text-2xl font-bold mb-3 text-white">Vision</h3>
                            <p className="text-gray-400 leading-relaxed">
                                To be a beacon of innovation and learning, empowering the next generation of leaders and problem-solvers who will drive technological advancements and cultural enrichment globally.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="border-l border-white/5 pl-8 py-2"
                        >
                            <Target size={32} className="text-violet-500 mb-4" />
                            <h3 className="text-2xl font-bold mb-3 text-white">Mission</h3>
                            <p className="text-gray-400 leading-relaxed">
                                To provide an unparalleled platform for students to showcase their talents, engage with cutting-edge technology, celebrate diverse cultures, and build a vibrant community that fosters lifelong connections and growth.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* --- NEW SECTION: Event Highlights / Key Numbers --- */}
                <div className="mt-40">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-12 flex items-center gap-4"
                    >
                        <span className="w-12 h-[1px] bg-violet-500/50"></span> Our Impact
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { value: "50+", label: "Technical Events", icon: Sparkles },
                            { value: "3000+", label: "Attendees", icon: Users },
                            { value: "100+", label: "Projects Exhibited", icon: Target },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="bg-white/5 p-8 rounded-lg border border-white/10 flex flex-col items-start"
                            >
                                <stat.icon size={48} className="text-violet-500 mb-6" />
                                <h3 className="text-5xl font-extrabold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400 text-lg uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* 3. THE CINEMATIC COLLEGE IMAGE */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-40 relative group overflow-hidden rounded-sm border border-white/10"
                >
                    {/* Image Description */}
                    <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-[#020202]/80 to-transparent z-10">
                        <p className="text-lg text-gray-300 font-light max-w-2xl">
                     Our sprawling campus, nestled in the serene landscapes of Andhra Pradesh.
                        </p>
                    </div>

                    {/* Image Container with Ken Burns effect */}
                    <div className="aspect-video overflow-hidden">
                        <motion.img
                            src="https://www.rguktong.ac.in/svgs/carosel/ssn.png"
                            alt="RGUKT Ongole Campus"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 2 }}
                            className="w-full h-full object-cover transition-transform duration-[3000ms]"
                        />
                    </div>

                    {/* Cinematic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay" />

                    {/* Location Badge - Now wrapped in an <a> tag */}
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-8 left-8 flex items-center gap-4 cursor-pointer group"
                    >
                        <div className="p-3 mt-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] mt-3 font-bold tracking-[0.3em] text-gray-400 uppercase">Host Institute</p>
                            <p className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-violet-300 transition-colors">RGUKT Ongole Campus, AP</p>
                        </div>
                    </a>

                    {/* Top Right Label */}
                    <div className="absolute top-8 right-8 border border-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">EST. 2017</span>
                    </div>
                </motion.div>

                {/* 4. THE THREE PILLARS */}
                <div className="mt-32">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-violet-500 font-mono tracking-[0.5em] text-[10px] uppercase mb-12 flex items-center gap-4"
                    >
                        <span className="w-12 h-[1px] bg-violet-500/50"></span> Our Foundational Pillars
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Innovation", tag: "Tech", desc: "Pushing boundaries in Engineering, AI, and Design, fostering a culture of relentless exploration and creation.", link: "/innovation" },
                            { title: "Expression", tag: "Art & Culture", desc: "A vibrant stage for the bold and the creative souls, celebrating diverse arts, music, and cultural narratives.", link: "/expression" },
                            { title: "Legacy", tag: "Community & Impact", desc: "Building the foundations for tomorrow's leaders, fostering strong community bonds and creating lasting societal impact.", link: "/legacy" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group border-l border-white/5 pl-8 py-4 hover:border-violet-500 transition-colors"
                            >
                                <span className="text-violet-600 font-mono text-xs mb-4 block">0{i + 1}</span>
                                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-violet-500 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                                <Link to={item.link} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-violet-500">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">{item.tag}</span>
                                    <ArrowUpRight size={14} className="text-violet-500 group-hover:text-white transition-colors" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}