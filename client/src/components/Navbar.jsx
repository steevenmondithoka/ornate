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
        <nav className="fixed top-0 left-0 right-0 z-[1000] w-full">
            {/* --- TOP ACCENT LINE --- */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-600 to-transparent opacity-50"></div>

            <div className="bg-[#080808] border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    
                    {/* Left: Logo Section */}
                    <Link to="/" className="flex items-center gap-4 group" onClick={closeAllMenus}>
                        <img 
                            src={logo} 
                            alt="Ornate Logo" 
                            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="hidden sm:block">
                            <p className="text-[12px] font-black text-white leading-none tracking-tighter italic">ORNATE</p>
                            <p className="text-[8px] font-bold text-violet-500 tracking-[0.4em] uppercase">2k26 Arena</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group
                                    ${location.pathname === link.path ? 'text-violet-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div layoutId="navIndicator" className="absolute bottom-0 left-4 right-4 h-[2px] bg-violet-500 shadow-[0_0_8px_#7c3aed]" />
                                )}
                            </Link>
                        ))}

                        {/* Dropdown for Registrations */}
                        <div className="relative ml-2" ref={registrationsRef}>
                            <button 
                                onClick={() => setIsRegistrationsOpen(!isRegistrationsOpen)}
                                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors
                                    ${isRegistrationsOpen ? 'text-violet-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                Portal <ChevronDown size={14} className={`transition-transform duration-300 ${isRegistrationsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isRegistrationsOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-52 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
                                    >
                                        <PortalLink to="/stall-registration" label="Stall Auction" icon={<Sparkles size={12}/>} onClick={closeAllMenus} />
                                        <PortalLink to="/tshirt-registration" label="Merch Drop" icon={<Sparkles size={12}/>} onClick={closeAllMenus} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Alumni Button */}
                        <Link to="/alumni-registration" className="ml-6 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-violet-900/20 flex items-center gap-2">
                            <GraduationCap size={14} /> Alumni
                        </Link>

                        {/* Admin Profile Section */}
                        {isLoggedIn && (
                            <div className="relative ml-6 pl-6 border-l border-white/10" ref={profileRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                                        {adminData?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Console</span>
                                </button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-4"
                                        >
                                            <div className="pb-3 mb-3 border-b border-white/5">
                                                <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1">{adminData?.role}</p>
                                                <p className="text-sm font-bold text-white truncate">{adminData?.name}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <AdminMenuLink to="/admin-dashboard" label="Dashboard" icon={<LayoutDashboard size={14}/>} onClick={closeAllMenus} />
                                                {isSuperAdmin && <AdminMenuLink to="/manage-admins" label="Master Controls" icon={<ShieldCheck size={14}/>} onClick={closeAllMenus} />}
                                                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-[10px] font-black text-red-500 hover:bg-red-500/10 rounded-lg transition-all uppercase tracking-widest mt-2 border-t border-white/5 pt-4">
                                                    <LogOut size={14} /> Exit System
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE FULL-WIDTH MENU --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden w-full bg-[#0a0a0a] border-b border-white/10 shadow-2xl px-6 py-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-3">
                                {navLinks.map((link) => (
                                    <Link key={link.name} to={link.path} className="py-4 bg-white/5 rounded-xl text-[10px] font-bold text-center uppercase tracking-[0.2em] text-gray-300 border border-white/5" onClick={closeAllMenus}>{link.name}</Link>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <button onClick={() => setIsMobileRegistrationsOpen(!isMobileRegistrationsOpen)} className="w-full py-4 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 flex items-center justify-center gap-2 border border-white/5">
                                    Registrations <ChevronDown size={16} className={isMobileRegistrationsOpen ? 'rotate-180' : ''} />
                                </button>
                                {isMobileRegistrationsOpen && (
                                    <div className="grid grid-cols-2 gap-3 px-2">
                                        <Link to="/stall-registration" className="py-3 bg-violet-600/10 text-violet-400 rounded-lg text-center text-[9px] font-bold uppercase" onClick={closeAllMenus}>Auction</Link>
                                        <Link to="/tshirt-registration" className="py-3 bg-violet-600/10 text-violet-400 rounded-lg text-center text-[9px] font-bold uppercase" onClick={closeAllMenus}>Merch</Link>
                                    </div>
                                )}
                                <Link to="/alumni-registration" className="block w-full bg-violet-600 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center" onClick={closeAllMenus}>Alumni Portal</Link>
                            </div>

                            {isLoggedIn && (
                                <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-3">
                                    <Link to="/admin-dashboard" className="text-center text-[10px] font-black uppercase text-gray-500 tracking-widest" onClick={closeAllMenus}>Admin Dashboard</Link>
                                    <button onClick={handleLogout} className="text-center text-[10px] font-black uppercase text-red-500 tracking-widest">Logout Session</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// --- HELPER COMPONENTS ---
function PortalLink({ to, label, icon, onClick }) {
    return (
        <Link to={to} onClick={onClick} className="flex items-center gap-3 px-5 py-3 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-violet-600 transition-all uppercase tracking-widest">
            <span className="text-violet-400 group-hover:text-white">{icon}</span> {label}
        </Link>
    );
}

function AdminMenuLink({ to, label, icon, onClick }) {
    return (
        <Link to={to} onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all uppercase tracking-widest">
            <span className="text-violet-500">{icon}</span> {label}
        </Link>
    );
}