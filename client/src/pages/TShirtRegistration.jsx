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
  Sparkles,
  ChevronDown
} from 'lucide-react';
import BackgroundDesign from '../components/BackgroundDesign';

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

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-white transition-all placeholder:text-zinc-700";
  const labelClass = "text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block ml-1";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-500 transition-colors";

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pt-28 pb-12 lg:pt-36">
      <BackgroundDesign/>
      
      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >
          
          {/* --- LEFT SIDE: THE VISUAL --- */}
          <div className="lg:w-[42%] relative bg-zinc-900/50 min-h-[350px] lg:min-h-full flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={view}
                  src={IMAGES[view]} 
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              </AnimatePresence>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />

              <div className="relative p-8 lg:p-12 h-full flex flex-col justify-between">
                <div>
                   <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest">
                     Exclusive Merch
                   </span>
                   <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter text-white uppercase mt-4 leading-none">
                     Ornate <br /> <span className="text-violet-500">Drop.</span>
                   </h1>
                </div>

                <div className="flex justify-between items-end">
                  <button 
                    onClick={() => setView(view === 'front' ? 'back' : 'front')}
                    className="group flex items-center gap-2 bg-white/5 hover:bg-violet-600 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                  >
                    <RotateCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    Flip View
                  </button>
                  <div className="text-right">
                    <p className="text-violet-400 font-black text-2xl tracking-tighter">₹499</p>
                    <p className="text-white/30 text-[10px] line-through font-bold uppercase tracking-widest">₹799</p>
                  </div>
                </div>
              </div>
          </div>

          {/* --- RIGHT SIDE: THE FORM --- */}
          <div className="lg:w-[58%] p-8 lg:p-14 bg-[#0a0a0a]">
            <div className="flex items-center gap-3 mb-10">
               <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                  <Sparkles size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter">Secure Your Drop</h3>
                  <div className="h-1 w-8 bg-violet-600 rounded-full mt-1" />
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="group">
                <label className={labelClass}>Participant Name</label>
                <div className="relative">
                  <User className={iconClass} size={16} />
                  <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Full Name" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className={labelClass}>USN / Student ID</label>
                  <div className="relative">
                    <CreditCard className={iconClass} size={16} />
                    <input name="usn" value={form.usn} onChange={handleChange} required className={inputClass} placeholder="ID Number" />
                  </div>
                </div>
                <div className="group">
                  <label className={labelClass}>Department</label>
                  <div className="relative">
                    <Building2 className={iconClass} size={16} />
                    <input name="department" value={form.department} onChange={handleChange} required className={inputClass} placeholder="e.g. CSE" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone className={iconClass} size={16} />
                    <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91..." />
                  </div>
                </div>
                <div className="group">
                  <label className={labelClass}>Select Size</label>
                  <div className="relative">
                    <Shirt className={iconClass} size={16} />
                    <select name="size" value={form.size} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className={labelClass}>Official Email</label>
                <div className="relative">
                  <Mail className={iconClass} size={16} />
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="university@email.com" />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full mt-4 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl transition-all shadow-xl shadow-violet-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {loading ? "AUTHENTICATING..." : "SECURE MY DROP"}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
              
              <p className="text-center text-zinc-600 text-[9px] font-bold uppercase tracking-widest mt-6">
                * Pre-orders will be available for pickup during event days.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};