import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Trash2, Camera, Film, X,
    Download, AlertCircle, ChevronRight, Maximize2, Sparkles
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

// --- COSMIC BACKGROUND ---
const CosmicBackground = () => {
    const stars = useMemo(() => [...Array(80)].map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 0.5,
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        duration: Math.random() * 3 + 2,
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#030014]">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: star.duration, repeat: Infinity }}
                    className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
                    style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
                />
            ))}
        </div>
    );
};

export default function Gallery() {
    const [groupedData, setGroupedData] = useState({});
    const [years, setYears] = useState([]);
    const [activeType, setActiveType] = useState('photo');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        fetchGallery();
        if (localStorage.getItem('adminToken')) setIsAdmin(true);
    }, []);

    // --- AUTO-PLAY FOR PHOTO CAROUSEL ---
    useEffect(() => {
        if (!loading && activeType === 'photo' && years.length > 0) {
            const featured = groupedData[years[0]]?.photo?.slice(0, 5) || [];
            if (featured.length > 0) {
                const timer = setInterval(() => {
                    setCarouselIndex((prev) => (prev + 1) % featured.length);
                }, 4000);
                return () => clearInterval(timer);
            }
        }
    }, [loading, activeType, years, groupedData]);

    const fetchGallery = async () => {
        try {
            const res = await axios.get('https://ornate-evkf.onrender.com/api/gallery');
            const organized = {};
            res.data.forEach(item => {
                const y = item.year ? item.year.toString() : "Archives";
                if (!organized[y]) organized[y] = { photo: [], video: [] };
                if (item.type === 'photo' || item.type === 'video') {
                    organized[y][item.type].push(item);
                }
            });
            const sortedYears = Object.keys(organized).sort((a, b) => b - a);
            setGroupedData(organized);
            setYears(sortedYears);
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    // --- CRITICAL FIX: YOUTUBE EMBED LOGIC ---
    const getVideoSrc = (inputUrl) => {
        if (!inputUrl) return "";
        let videoId = "";

        if (inputUrl.includes('v=') || inputUrl.includes('watch?v=')) {
            videoId = inputUrl.split('v=')[1]?.split('&')[0];
        } else if (inputUrl.includes('youtu.be/')) {
            videoId = inputUrl.split('youtu.be/')[1]?.split('?')[0];
        } else if (inputUrl.includes('shorts/')) {
            videoId = inputUrl.split('shorts/')[1]?.split('?')[0];
        } else if (inputUrl.includes('embed/')) {
            return inputUrl; // Already in embed format
        } else {
            videoId = inputUrl; // Assume it's a raw ID
        }
        
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    };

    const downloadImage = async (e, url) => {
        e.stopPropagation();
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Ornate_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) { window.open(url, '_blank'); }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Delete memory?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://ornate-evkf.onrender.com/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchGallery();
        } catch (err) { alert("Fail"); }
    };

    const featuredPhotos = years.length > 0 ? (groupedData[years[0]]?.photo?.slice(0, 5) || []) : [];

    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-x-hidden pt-28 md:pt-32">
            <CosmicBackground />
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="relative z-10 px-4 md:px-10 max-w-[1600px] mx-auto pb-20">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="text-violet-500 animate-pulse" size={18} />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-400">Memory Matrix</p>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                            Archives<span className="text-violet-600">.</span>
                        </h1>
                    </motion.div>

                    <div className="flex bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 w-full md:w-auto shadow-2xl">
                        {['photo', 'video'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`flex-1 md:flex-none relative px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeType === type ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {activeType === type && (
                                    <motion.div layoutId="tabMarker" className="absolute inset-0 bg-violet-600 rounded-xl" />
                                )}
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {type === 'photo' ? <Camera size={14} /> : <Film size={14} />} {type}s
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-6">
                        <div className="w-16 h-16 border-t-2 border-violet-500 rounded-full animate-spin" />
                        <p className="text-violet-500 font-mono text-[10px] tracking-[0.8em] uppercase">Decrypting...</p>
                    </div>
                ) : (
                    <div className="space-y-32">
                        {/* --- FEATURED PHOTO CAROUSEL (ONLY FOR PHOTOS) --- */}
                        {activeType === 'photo' && featuredPhotos.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="relative h-[350px] md:h-[550px] w-full rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={carouselIndex}
                                        src={featuredPhotos[carouselIndex].url}
                                        initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.2 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent" />
                                <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-2xl">
                                    <p className="text-violet-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">Latest Snapshots</p>
                                    <h2 className="text-4xl md:text-6xl font-bold italic text-white mb-6 line-clamp-1">{featuredPhotos[carouselIndex].caption}</h2>
                                    <button onClick={() => setSelectedImage(featuredPhotos[carouselIndex])} className="px-8 py-3.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all">Expand Moment</button>
                                </div>
                            </motion.div>
                        )}

                        {/* --- ARCHIVE ROWS (SPOTIFY STYLE) --- */}
                        {years.map((year) => {
                            const items = groupedData[year][activeType];
                            if (items.length === 0) return null;
                            return (
                                <section key={year} className="relative">
                                    <div className="flex items-center justify-between mb-10 px-2">
                                        <div className="flex items-center gap-6">
                                            <div className="h-[2px] w-16 bg-violet-600 shadow-[0_0_15px_#8b5cf6]" />
                                            <h3 className="text-3xl md:text-5xl font-medium italic text-white uppercase">{year} <span className="text-violet-500">Archives</span></h3>
                                        </div>
                                        <div className="hidden md:flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">Swipe <ChevronRight size={16}/></div>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 no-scrollbar pb-10 px-2">
                                        {items.map((item) => (
                                            <div key={item._id} className={`snap-start ${activeType === 'photo' ? 'min-w-[80vw] md:min-w-[450px]' : 'min-w-[90vw] md:min-w-[600px]'}`}>
                                                {activeType === 'photo' ? (
                                                    <motion.div 
                                                        whileHover={{ y: -12 }}
                                                        onClick={() => setSelectedImage(item)}
                                                        className="aspect-[3/4] relative rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl group"
                                                    >
                                                        <img src={item.url} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100" alt="" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
                                                            <p className="text-white text-xl font-bold italic mb-6">{item.caption}</p>
                                                            <div className="flex gap-3">
                                                                <button onClick={(e) => downloadImage(e, item.url)} className="flex-1 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest">Download</button>
                                                                {isAdmin && <button onClick={(e) => handleDelete(e, item._id)} className="p-4 bg-red-600 rounded-2xl text-white"><Trash2 size={20}/></button>}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    /* --- VIDEO IFRAME --- */
                                                    <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-[#000] relative group shadow-2xl">
                                                        <iframe
                                                            className="w-full h-full"
                                                            src={getVideoSrc(item.url)}
                                                            title={item.caption}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:bg-black/20 transition-all" />
                                                        {isAdmin && (
                                                            <button onClick={(e) => handleDelete(e, item._id)} className="absolute top-6 right-6 p-3 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all z-30 shadow-2xl">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* --- LIGHTBOX (PHOTO ONLY) --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 md:p-12"
                    >
                        {/* Control Bar - Safe distance from Top Navbar */}
                        <div className="absolute top-12 md:top-16 right-6 md:right-16 flex gap-4 z-[510]">
                            <button onClick={(e) => downloadImage(e, selectedImage.url)} className="p-4 bg-white/10 hover:bg-white hover:text-black rounded-full transition-all border border-white/10">
                                <Download size={24} />
                            </button>
                            <button onClick={() => setSelectedImage(null)} className="p-4 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-full transition-all border border-red-500/20">
                                <X size={24} />
                            </button>
                        </div>

                        <motion.img
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                            src={selectedImage.url}
                            className="max-w-full max-h-[70vh] object-contain rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        />

                        <div className="mt-12 text-center max-w-3xl">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white mb-3">{selectedImage.caption}</h2>
                            <p className="text-violet-500 font-mono text-[10px] font-black uppercase tracking-[0.6em]">{selectedImage.year} Memory</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}