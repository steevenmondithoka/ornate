import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, GraduationCap, ChevronDown, ShieldCheck, User, Sparkles } from 'lucide-react';
import logo from '../assets/ornate.png';

const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Timeline', path: '/schedule' },
    { name: 'Lineup', path: '/proshows' },
    { name: 'Archives', path: '/gallery' },
    { name: 'Sponsors', path: '/sponsors' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
    const [isMobileRegistrationsOpen, setIsMobileRegistrationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [adminData, setAdminData] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const registrationsRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const info = JSON.parse(localStorage.getItem('adminInfo'));
        
        setIsLoggedIn(!!token);
        setAdminData(info);
        setIsSuperAdmin(info?.role === 'superadmin');
        
        setIsOpen(false);
        setIsRegistrationsOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (registrationsRef.current && !registrationsRef.current.contains(event.target)) {
                setIsRegistrationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsLoggedIn(false);
        setAdminData(null);
        navigate('/');
    };

    const closeAllMenus = () => {
        setIsOpen(false);
        setIsRegistrationsOpen(false);
        setIsProfileOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] w-full px-4 pt-4">
            <div className="max-w-7xl mx-auto relative">
                {/* --- MAIN NAV BAR --- */}
                <div className="bg-[#0a0a0a] rounded-full px-4 py-2.5 md:px-6 flex items-center justify-between border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative z-50">
                    
                    {/* Left: Logo */}
                    <Link to="/" className="group shrink-0 flex items-center gap-3" onClick={closeAllMenus}>
                        <motion.img 
                            src={logo} 
                            alt="Ornate Logo" 
                            className="h-8 md:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
                        />
                        <div className="h-6 w-[1px] bg-white/10 hidden sm:block mx-1"></div>
                        <span className="hidden sm:block text-[10px] font-black tracking-[0.3em] text-white uppercase italic">2k26</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex gap-8 items-center whitespace-nowrap">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 group
                                    ${location.pathname === link.path ? 'text-violet-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.span layoutId="activeNav" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full shadow-[0_0_10px_#7c3aed]" />
                                )}
                            </Link>
                        ))}

                        {/* Registrations Dropdown */}
                        <div className="relative" ref={registrationsRef}>
                            <button 
                                onClick={() => setIsRegistrationsOpen(!isRegistrationsOpen)} 
                                className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-colors
                                    ${isRegistrationsOpen ? 'text-violet-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                Register <ChevronDown size={14} className={`transition-transform duration-300 ${isRegistrationsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isRegistrationsOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }} 
                                        className="absolute top-full mt-4 -left-4 bg-[#0f0f0f] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] py-3 w-56 border border-white/10 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 mb-1 border-b border-white/5">
                                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Portal Access</p>
                                        </div>
                                        <DropdownLink to="/stall-registration" icon={<Sparkles size={12}/>} label="Auction Entry" onClick={closeAllMenus} />
                                        <DropdownLink to="/tshirt-registration" icon={<Sparkles size={12}/>} label="Merch Drop" onClick={closeAllMenus} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/alumni-registration" className="px-5 py-2.5 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/20 flex items-center gap-2 group">
                            <GraduationCap size={14} className="group-hover:rotate-12 transition-transform" /> Alumni
                        </Link>

                        {/* Profile Section */}
                        {isLoggedIn && (
                            <div className="relative border-l border-white/10 pl-6" ref={profileRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-full transition-all border border-white/10 group"
                                >
                                    <div className="w-7 h-7 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-violet-900/40">
                                        {adminData?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Admin Console</span>
                                    <ChevronDown size={12} className={`transition-transform text-gray-400 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute top-full mt-4 right-0 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-5 w-72 z-[1001]"
                                        >
                                            <div className="flex flex-col gap-1.5 mb-4 pb-4 border-b border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[9px] font-black text-violet-500 uppercase tracking-widest">Active Session</p>
                                                    <span className="text-[8px] bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/20 uppercase font-black tracking-tighter">
                                                        {adminData?.role}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-black text-white truncate">{adminData?.name}</p>
                                                <p className="text-[10px] text-gray-500 truncate font-mono">{adminData?.email}</p>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <ProfileLink to="/admin-dashboard" icon={<LayoutDashboard size={14}/>} label="Dashboard" onClick={closeAllMenus} />
                                                {isSuperAdmin && (
                                                    <ProfileLink to="/manage-admins" icon={<ShieldCheck size={14}/>} label="Master Control" onClick={closeAllMenus} />
                                                )}
                                                <button 
                                                    onClick={handleLogout} 
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black text-red-500 hover:bg-red-500/10 rounded-xl uppercase tracking-widest transition-all mt-1"
                                                >
                                                    <LogOut size={14} /> System Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors">
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* --- MOBILE OVERLAY (Solid) --- */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.95, y: -20 }} 
                            className="absolute top-full mt-3 left-0 right-0 bg-[#0f0f0f] rounded-[2rem] p-6 lg:hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-40"
                        >
                            {isLoggedIn && (
                                <div className="bg-white/5 p-5 rounded-2xl mb-8 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-lg font-black">{adminData?.name?.charAt(0)}</div>
                                        <div>
                                            <p className="text-base font-black text-white">{adminData?.name}</p>
                                            <p className="text-[10px] text-gray-500 font-mono tracking-tight">{adminData?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {navLinks.map((link) => (
                                    <Link key={link.name} to={link.path} className="py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center text-gray-300 border border-white/5" onClick={closeAllMenus}>{link.name}</Link>
                                ))}
                            </div>
                            
                            <div className="space-y-3">
                                <button onClick={() => setIsMobileRegistrationsOpen(!isMobileRegistrationsOpen)} className="w-full py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-300 flex items-center justify-center gap-2 border border-white/5">
                                    Registrations <ChevronDown size={16} className={isMobileRegistrationsOpen ? 'rotate-180' : ''} />
                                </button>
                                
                                <AnimatePresence>
                                    {isMobileRegistrationsOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="grid grid-cols-2 gap-3 overflow-hidden">
                                            <Link to="/stall-registration" className="py-3 bg-violet-600/10 text-violet-400 rounded-xl text-center text-[9px] font-black uppercase tracking-widest" onClick={closeAllMenus}>Auction</Link>
                                            <Link to="/tshirt-registration" className="py-3 bg-violet-600/10 text-violet-400 rounded-xl text-center text-[9px] font-black uppercase tracking-widest" onClick={closeAllMenus}>Merch</Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Link to="/alumni-registration" className="block w-full bg-violet-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-violet-900/20" onClick={closeAllMenus}>Alumni Portal</Link>

                                {isLoggedIn && (
                                    <div className="pt-4 grid grid-cols-2 gap-3">
                                        <Link to="/admin-dashboard" className="py-3 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-center text-gray-400" onClick={closeAllMenus}>Dashboard</Link>
                                        <button onClick={handleLogout} className="py-3 border border-red-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-center text-red-500">Logout</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function DropdownLink({ to, icon, label, onClick }) {
    return (
        <Link 
            to={to} 
            className="flex items-center gap-3 px-5 py-3 text-gray-400 hover:text-white hover:bg-violet-600/20 text-[10px] font-black uppercase tracking-widest transition-all" 
            onClick={onClick}
        >
            <span className="text-violet-500">{icon}</span> {label}
        </Link>
    );
}

function ProfileLink({ to, icon, label, onClick }) {
    return (
        <Link 
            to={to} 
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all" 
            onClick={onClick}
        >
            <span className="text-violet-500">{icon}</span> {label}
        </Link>
    );
}