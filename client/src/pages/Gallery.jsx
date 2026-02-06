import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Trash2, Camera, Film, X,
    Download, AlertCircle
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

export default function Gallery() {
    const [groupedData, setGroupedData] = useState({});
    const [years, setYears] = useState([]);
    const [activeYear, setActiveYear] = useState(null);
    const [activeType, setActiveType] = useState('photo');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchGallery();
        if (localStorage.getItem('adminToken')) setIsAdmin(true);
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/gallery');
            const organized = {};

            res.data.forEach(item => {
                // Handle missing year by defaulting to "Archives"
                const y = item.year ? item.year.toString() : "Archives";

                if (!organized[y]) organized[y] = { photo: [], video: [] };

                if (item.type === 'photo' || item.type === 'video') {
                    organized[y][item.type].push(item);
                }
            });

            // Sort years descending (newest first)
            const sortedYears = Object.keys(organized).sort((a, b) => b - a);
            setGroupedData(organized);
            setYears(sortedYears);

            // Set default active year
            if (sortedYears.length > 0) setActiveYear(sortedYears[0]);

        } catch (err) {
            console.error("Error fetching gallery:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Permanently delete this memory?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchGallery();
        } catch (err) {
            alert("Delete failed.");
        }
    };

    /**
     * SMART VIDEO SOURCE HELPER
     * Handles both full URLs (https://youtube.com/...) AND raw IDs (dQw4w9WgXcQ)
     */
    const getVideoSrc = (inputUrl) => {
        if (!inputUrl) return "";

        // 1. If it contains "http" or "youtube", treat as URL and extract ID
        if (inputUrl.includes('http') || inputUrl.includes('youtu')) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#&?]*).*/;
            const match = inputUrl.match(regExp);
            const id = (match && match[8].length === 11) ? match[8] : null;
            return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : inputUrl;
        }

        // 2. Otherwise, assume the input is ALREADY the YouTube ID
        return `https://www.youtube.com/embed/${inputUrl}?rel=0&modestbranding=1`;
    };

    const downloadImage = async (e, url) => {
        e.stopPropagation();
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Ornate_Memory_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            window.open(url, '_blank');
        }
    };

    const currentItems = activeYear ? groupedData[activeYear][activeType] : [];

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            <BackgroundDesign />
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-[1600px] mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-white/5 pb-10">
                    <div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                            <p className="font-mono text-xs text-violet-400 tracking-[0.4em] uppercase">Visual Archives</p>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-5xl font-bold tracking-tighter italic leading-none">
                            GALLERY<span className="text-violet-600">.</span>
                        </motion.h1>
                    </div>

                    {/* Type Toggles */}
                    <div className="flex bg-zinc-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                        {['photo', 'video'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`relative px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeType === type ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {activeType === type && (
                                    <motion.div layoutId="typeBg" className="absolute inset-0 bg-violet-600 rounded-xl shadow-lg shadow-violet-500/20" />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {type === 'photo' ? <Camera size={14} /> : <Film size={14} />} {type}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* --- YEAR SELECTOR --- */}
                        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
                            <div className="flex gap-4 min-w-max">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setActiveYear(year)}
                                        className={`px-8 py-3 rounded-full border transition-all text-sm font-mono tracking-widest ${activeYear === year
                                                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                                : 'bg-transparent text-gray-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- MASONRY GRID --- */}
                        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {currentItems.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="break-inside-avoid relative group"
                                    >
                                        {/* --- PHOTO ITEM --- */}
                                        {item.type === 'photo' ? (
                                            <div
                                                onClick={() => setSelectedImage(item)}
                                                className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 cursor-zoom-in"
                                            >
                                                <img
                                                    src={item.url}
                                                    loading="lazy"
                                                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                    alt={item.caption}
                                                />
                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                                    <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        <p className="text-white font-medium line-clamp-1 text-sm">{item.caption || "Untitled"}</p>
                                                        <div className="flex gap-2">
                                                            <button onClick={(e) => downloadImage(e, item.url)} className="p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg transition-colors backdrop-blur-md">
                                                                <Download size={16} />
                                                            </button>
                                                            {isAdmin && (
                                                                <button onClick={(e) => handleDelete(e, item._id)} className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors backdrop-blur-md">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* --- VIDEO ITEM (IFRAME) --- */
                                            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={getVideoSrc(item.url)}
                                                    title={item.caption || "Video"}
                                                    frameBorder="0"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                ></iframe>

                                                {/* Admin Delete for Video */}
                                                {isAdmin && (
                                                    <button
                                                        onClick={(e) => handleDelete(e, item._id)}
                                                        className="absolute top-3 right-3 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full backdrop-blur-md shadow-lg transition-colors z-20"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}

                                                {/* Minimal Caption Bar */}
                                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                                                    <p className="text-white/80 text-xs font-mono truncate">{item.caption}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Empty State */}
                        {currentItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-32 border border-white/5 rounded-3xl bg-white/[0.02]">
                                <AlertCircle size={48} className="text-white/20 mb-4" />
                                <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">No Archives Found</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* --- LIGHTBOX (Photos Only) --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <div className="absolute top-6 right-6 flex gap-4 z-50">
                            <button onClick={(e) => downloadImage(e, selectedImage.url)} className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-colors">
                                <Download size={20} />
                            </button>
                            <button onClick={() => setSelectedImage(null)} className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <motion.img
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            src={selectedImage.url}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-violet-900/20"
                            alt="Full View"
                        />

                        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
                            <p className="text-white text-xl font-light italic">{selectedImage.caption}</p>
                            <p className="text-violet-400 text-xs font-mono uppercase tracking-widest mt-2">Edition {selectedImage.year}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}