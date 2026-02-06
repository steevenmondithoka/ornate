import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New: Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // API call to your backend
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      // The backend response now includes: { token, admin: { name, email, role } }
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(res.data.admin));
      
      // Navigate to the dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      // Handle different error messages
      setError(err.response?.data?.message || "Authorization Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] px-6 selection:bg-violet-500/30">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-md w-full glass-morphism p-10 rounded-[3rem] border border-white/10 shadow-2xl"
      >
        <h1 className="text-3xl font-medium tracking-tighter italic mb-2 text-white">Admin Access.</h1>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">
          Enter credentials to manage <span className="text-violet-400">Ornate 2k26</span>
        </p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-violet-500 focus:bg-white/10 transition-all placeholder:text-gray-600" 
              placeholder="Admin Email" 
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-violet-500 focus:bg-white/10 transition-all placeholder:text-gray-600" 
              placeholder="Password" 
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-400 text-xs italic bg-red-400/10 p-3 rounded-xl border border-red-400/20"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-violet-600 text-white font-black rounded-2xl uppercase tracking-widest transition shadow-xl flex justify-center items-center
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-violet-500 active:scale-95'}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Authorize'
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
          Secure Encrypted Session
        </p>
      </motion.div>
    </div>
  );
}