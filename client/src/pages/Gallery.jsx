import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Trash2, Camera, Film, X,
    Download, AlertCircle, ChevronRight, ChevronLeft, Maximize2, Sparkles
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

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

    // --- AUTO-PLAY LOGIC FOR CAROUSEL ---
    useEffect(() => {
        if (!loading && years.length > 0) {
            const featuredItems = groupedData[years[0]]?.photo?.slice(0, 5) || [];
            if (featuredItems.length > 0) {
                const timer = setInterval(() => {
                    setCarouselIndex((prev) => (prev + 1) % featuredItems.length);
                }, 4000);
                return () => clearInterval(timer);
            }
        }
    }, [loading, years, groupedData]);

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
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Delete this memory?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://ornate-evkf.onrender.com/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchGallery();
        } catch (err) { alert("Delete failed."); }
    };

    const getVideoSrc = (inputUrl) => {
        if (!inputUrl) return "";
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        const id = (match && match[8].length === 11) ? match[8] : null;
        return id ? `https://www.youtube.com/embed/${id}` : inputUrl;
    };

    const downloadImage = async (e, url) => {
        e.stopPropagation();
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Ornate_Archive_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) { window.open(url, '_blank'); }
    };

    // Helper for Carousel Rendering
    const featuredPhotos = years.length > 0 ? (groupedData[years[0]]?.photo?.slice(0, 5) || []) : [];

    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-x-hidden">
            <BackgroundDesign />
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Content Container */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="relative z-10 pt-28 md:pt-32 pb-20 px-4 md:px-10 max-w-[1600px] mx-auto"
            >
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="text-violet-500 animate-pulse" size={16} />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-400">Visual Legacy</p>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                            Archives<span className="text-violet-600">.</span>
                        </h1>
                    </motion.div>

                    {/* Toggle Buttons */}
                    <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10 w-full md:w-auto">
                        {['photo', 'video'].map((type) => (
                            <button
                                key={type}
                                onClick={() => { setActiveType(type); setCarouselIndex(0); }}
                                className={`flex-1 md:flex-none relative px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeType === type ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {activeType === type && (
                                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-violet-600 rounded-xl" />
                                )}
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {type === 'photo' ? <Camera size={14} /> : <Film size={14} />} {type}s
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-500">Syncing Memories...</p>
                    </div>
                ) : (
                    <div className="space-y-24">
                        
                        {/* --- AUTOMATIC FEATURED CAROUSEL --- */}
                        {activeType === 'photo' && featuredPhotos.length > 0 && (
                            <div className="relative h-[300px] md:h-[500px] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={carouselIndex}
                                        src={featuredPhotos[carouselIndex].url}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
                                <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 max-w-lg">
                                    <p className="text-violet-500 font-black text-[10px] uppercase tracking-widest mb-2">Featured Edition</p>
                                    <h2 className="text-3xl md:text-5xl font-bold italic text-white mb-4 line-clamp-1">{featuredPhotos[carouselIndex].caption}</h2>
                                    <button 
                                        onClick={() => setSelectedImage(featuredPhotos[carouselIndex])}
                                        className="px-6 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-violet-600 hover:text-white transition-all"
                                    >
                                        Enlarge <Maximize2 size={14} />
                                    </button>
                                </div>
                                {/* Progress Indicators */}
                                <div className="absolute bottom-12 right-12 flex gap-2">
                                    {featuredPhotos.map((_, idx) => (
                                        <div key={idx} className={`h-1 transition-all duration-500 rounded-full ${idx === carouselIndex ? 'w-8 bg-violet-500' : 'w-2 bg-white/20'}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- ARCHIVE ROWS (Spotify Style) --- */}
                        {years.map((year) => {
                            const items = groupedData[year][activeType];
                            if (items.length === 0) return null;
                            return (
                                <section key={year} className="relative">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-12 bg-violet-600" />
                                            <h3 className="text-2xl md:text-4xl font-medium italic text-white uppercase">{year} <span className="text-violet-500">Edition</span></h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] hidden md:flex">
                                            Scroll <ChevronRight size={14} />
                                        </div>
                                    </div>

                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-6 px-2">
                                        {items.map((item) => (
                                            <div 
                                                key={item._id}
                                                className={`snap-start ${activeType === 'photo' ? 'min-w-[75vw] md:min-w-[400px]' : 'min-w-[85vw] md:min-w-[550px]'}`}
                                            >
                                                {activeType === 'photo' ? (
                                                    <motion.div 
                                                        whileHover={{ y: -10 }}
                                                        onClick={() => setSelectedImage(item)}
                                                        className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer bg-white/[0.02] shadow-2xl group"
                                                    >
                                                        <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                                                            <p className="text-white font-bold italic mb-4">{item.caption || "Untilted"}</p>
                                                            <div className="flex gap-2">
                                                                <button onClick={(e) => downloadImage(e, item.url)} className="flex-1 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">Download</button>
                                                                {isAdmin && (
                                                                    <button onClick={(e) => handleDelete(e, item._id)} className="p-3 bg-red-600 text-white rounded-xl"><Trash2 size={16}/></button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 bg-black relative group shadow-2xl">
                                                        <iframe
                                                            className="w-full h-full"
                                                            src={getVideoSrc(item.url)}
                                                            title={item.caption}
                                                            frameBorder="0"
                                                            allowFullScreen
                                                        />
                                                        {isAdmin && (
                                                            <button 
                                                                onClick={(e) => handleDelete(e, item._id)}
                                                                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                                                            >
                                                                <Trash2 size={16} />
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
            </motion.div>

            {/* --- LIGHTBOX (Safe from Navbar) --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-[#030014]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
                    >
                        {/* Control Bar - Positioned to never hit Top Navbar */}
                        <div className="absolute top-10 right-10 flex gap-4 z-[210]">
                            <button onClick={(e) => downloadImage(e, selectedImage.url)} className="p-4 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all border border-white/10">
                                <Download size={24} />
                            </button>
                            <button onClick={() => setSelectedImage(null)} className="p-4 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-full transition-all border border-red-500/20">
                                <X size={24} />
                            </button>
                        </div>

                        <motion.img
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                            src={selectedImage.url}
                            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                        />

                        <div className="mt-12 text-center max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white mb-2 leading-tight">{selectedImage.caption}</h2>
                            <p className="text-violet-500 font-mono text-xs uppercase tracking-[0.5em]">{selectedImage.year} Memory</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}