import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shirt, 
  CreditCard, 
  Building2, 
  ArrowRight,
  RotateCw,
  Sparkles
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

// --- CONFIG ---
const API_URL = 'https://ornate-evkf.onrender.com/api/tshirts';
const IMAGES = {
  front: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  back: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"
};

export const TShirtRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('front');
  const [form, setForm] = useState({
    name: '', usn: '', email: '', phone: '', department: '', size: 'M'
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, form);
      alert("Drop Secured. Collect at venue.");
      setForm({ name: '', usn: '', email: '', phone: '', department: '', size: 'M' });
    } catch (error) {
      alert("Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 py-12 relative">
      <BackgroundDesign/>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#4c1d95 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* --- MAIN CARD CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row"
      >
        
        {/* --- LEFT SIDE: THE VISUAL (40%) --- */}
        <div className="lg:w-[45%] relative bg-zinc-900/50 flex flex-col justify-between overflow-hidden">
            
            {/* Header overlay on image */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 bg-gradient-to-b from-black/80 to-transparent">
               <h1 className="text-3xl font-black italic tracking-tighter text-white">
                 ORNATE <span className="text-violet-500">DROP</span>
               </h1>
               <p className="text-black-400 text-xs tracking-widest uppercase mt-1">Limited Edition Merch</p>
            </div>

            {/* The Image */}
            <div className="relative h-[400px] lg:h-full w-full">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={view}
                  src={IMAGES[view]} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
               <div>
                  <p className="text-white/60 text-xs mb-1">Select View</p>
                  <button 
                    onClick={() => setView(view === 'front' ? 'back' : 'front')}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/10"
                  >
                    <RotateCw size={14} />
                    {view === 'front' ? 'Show Back' : 'Show Front'}
                  </button>
               </div>
               <div className="text-right hidden sm:block">
                  <p className="text-violet-400 font-bold text-xl">₹499</p>
                  <p className="text-white/40 text-xs line-through">₹799</p>
               </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: THE FORM (60%) --- */}
        <div className="lg:w-[55%] p-6 md:p-10 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 mb-6 text-violet-500">
             <Sparkles size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">Priority Access</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div className="group">
              <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                  placeholder="Enter your full name" 
                />
              </div>
            </div>

            {/* 2 Cols: USN & Dept */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">USN / ID</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                  <input 
                    name="usn" 
                    value={form.usn} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                    placeholder="1MV..." 
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">DEPT</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                  <input 
                    name="department" 
                    value={form.department} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                    placeholder="CSE" 
                  />
                </div>
              </div>
            </div>

            {/* 2 Cols: Phone & Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">PHONE</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                    placeholder="999..." 
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">SIZE</label>
                <div className="relative">
                  <Shirt className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                  <select 
                    name="size" 
                    value={form.size} 
                    onChange={handleChange} 
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 outline-none text-white appearance-none cursor-pointer"
                  >
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="text-xs text-zinc-500 font-medium ml-1 mb-1 block">EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={18} />
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700"
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            {/* Action Button */}
            <button 
              disabled={loading}
              className="w-full mt-4 bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? "PROCESSING..." : "SECURE YOURS"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            
            <p className="text-center text-zinc-600 text-[10px] mt-4">
              By registering you agree to the event terms & conditions.
            </p>

          </form>
        </div>
      </motion.div>
    </div>
  );
};