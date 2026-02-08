import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import axios from 'axios';
import {
    Trash2, Camera, Film, X,
    Download, AlertCircle, ChevronRight, ChevronLeft, Maximize2
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
    const carouselRef = useRef(null);

    useEffect(() => {
        fetchGallery();
        if (localStorage.getItem('adminToken')) setIsAdmin(true);
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await axios.get('https://ornate-evkf.onrender.com/api/events'); // Adjusted to your endpoint if gallery exists there
            // Note: Keeping your actual logic for gallery processing below
            const galleryRes = await axios.get('https://ornate-evkf.onrender.com/api/gallery');
            const organized = {};

            galleryRes.data.forEach(item => {
                const y = item.year ? item.year.toString() : "Archives";
                if (!organized[y]) organized[y] = { photo: [], video: [] };
                if (item.type === 'photo' || item.type === 'video') {
                    organized[y][item.type].push(item);
                }
            });

            const sortedYears = Object.keys(organized).sort((a, b) => b - a);
            setGroupedData(organized);
            setYears(sortedYears);
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
            await axios.delete(`https://ornate-evkf.onrender.com/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchGallery();
        } catch (err) {
            alert("Delete failed.");
        }
    };

    const getVideoSrc = (inputUrl) => {
        if (!inputUrl) return "";
        if (inputUrl.includes('http') || inputUrl.includes('youtu')) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#&?]*).*/;
            const match = inputUrl.match(regExp);
            const id = (match && match[8].length === 11) ? match[8] : null;
            return id ? `https://www.youtube.com/embed/${id}` : inputUrl;
        }
        return `https://www.youtube.com/embed/${inputUrl}`;
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
    const featuredItems = activeYear ? groupedData[activeYear]['photo'].slice(0, 5) : [];

    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden selection:bg-violet-500">
            <BackgroundDesign />
            
            {/* Custom Cursor/Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 pt-28 pb-20 px-4 md:px-10 max-w-[1800px] mx-auto">
                
                {/* --- HERO SECTION --- */}
                <div className="mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12"
                    >
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-px w-12 bg-violet-500" />
                                <p className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.5em]">The Visual Legacy</p>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
                                ARCHIVES<span className="text-violet-600">.</span>
                            </h1>
                        </div>

                        {/* Animated Type Toggle */}
                        <div className="flex bg-white/5 backdrop-blur-2xl p-1 rounded-2xl border border-white/10 shadow-2xl">
                            {['photo', 'video'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveType(type)}
                                    className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        activeType === type ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {activeType === type && (
                                        <motion.div layoutId="navType" className="absolute inset-0 bg-violet-600 rounded-xl z-0" />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {type === 'photo' ? <Camera size={14} /> : <Film size={14} />} {type}s
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- FEATURED CAROUSEL --- */}
                    {!loading && activeType === 'photo' && featuredItems.length > 0 && (
                        <div className="relative group mb-20">
                            <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <Sparkles size={12} className="text-yellow-500" /> Featured Moments {activeYear}
                            </div>
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-4">
                                {featuredItems.map((item, i) => (
                                    <motion.div 
                                        key={item._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="min-w-[85vw] md:min-w-[600px] h-[350px] md:h-[450px] snap-center relative rounded-[2rem] overflow-hidden group/card"
                                    >
                                        <img src={item.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-8 left-8">
                                            <p className="text-white text-2xl font-bold italic">{item.caption}</p>
                                            <button 
                                                onClick={() => setSelectedImage(item)}
                                                className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors"
                                            >
                                                View in Fullscreen <Maximize2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-16 h-16 border-t-2 border-violet-500 rounded-full animate-spin mb-4" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-violet-500">Decrypting Archives...</p>
                    </div>
                ) : (
                    <>
                        {/* --- HIGH-END YEAR SELECTOR --- */}
                        <div className="sticky top-24 z-40 bg-[#030014]/80 backdrop-blur-xl border-y border-white/5 py-4 mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar">
                            <div className="flex gap-4 md:gap-8 items-center min-w-max">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mr-4">Timeline</p>
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setActiveYear(year)}
                                        className={`px-6 py-2 rounded-full text-xs font-mono transition-all border ${
                                            activeYear === year
                                                ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                                                : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                                        }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- CONTENT GRID --- */}
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {currentItems.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="relative group"
                                    >
                                        {item.type === 'photo' ? (
                                            <div
                                                onClick={() => setSelectedImage(item)}
                                                className="aspect-[4/5] relative overflow-hidden rounded-3xl bg-white/5 border border-white/5 cursor-pointer shadow-2xl"
                                            >
                                                <img
                                                    src={item.url}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                    alt={item.caption}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6">
                                                    <p className="text-white text-sm font-bold truncate mb-4">{item.caption || "Untitled Memory"}</p>
                                                    <div className="flex gap-2">
                                                        <button onClick={(e) => downloadImage(e, item.url)} className="flex-1 py-2 bg-white/10 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all">
                                                            Download
                                                        </button>
                                                        {isAdmin && (
                                                            <button onClick={(e) => handleDelete(e, item._id)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/5 relative group/video shadow-2xl">
                                                <iframe
                                                    className="w-full h-full pointer-events-auto"
                                                    src={getVideoSrc(item.url)}
                                                    title={item.caption}
                                                    frameBorder="0"
                                                    allowFullScreen
                                                />
                                                {isAdmin && (
                                                    <button
                                                        onClick={(e) => handleDelete(e, item._id)}
                                                        className="absolute top-4 right-4 p-2 bg-red-600 rounded-full text-white opacity-0 group-hover/video:opacity-100 transition-opacity z-20"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Empty State */}
                        {currentItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
                                <AlertCircle size={48} className="text-white/10 mb-6" />
                                <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Section Empty</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* --- IMMERSIVE LIGHTBOX --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#030014]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4"
                    >
                        <div className="absolute top-10 right-10 flex gap-4">
                            <button onClick={(e) => downloadImage(e, selectedImage.url)} className="p-4 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all">
                                <Download size={24} />
                            </button>
                            <button onClick={() => setSelectedImage(null)} className="p-4 bg-red-500/10 hover:bg-red-500 text-white rounded-full transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <motion.img
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            src={selectedImage.url}
                            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.2)]"
                        />

                        <div className="mt-12 text-center">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white mb-2">{selectedImage.caption}</h2>
                            <p className="text-violet-500 font-mono text-[10px] uppercase tracking-[0.5em]">Edition {selectedImage.year}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}