import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, GraduationCap, ChevronDown, ShieldCheck, User } from 'lucide-react';
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
        <nav className="fixed top-1 left-1/2 -translate-x-1/2 z-[1000] w-[100%] max-w-full">
            <div className="glass-morphism rounded-full px-4 py-3 md:px-6 flex items-center justify-between border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                {/* Left: Logo */}
                <Link to="/" className="group shrink-0 flex items-center" onClick={closeAllMenus}>
                    <motion.img src={logo} alt="Ornate Logo" className="h-9 md:h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-125" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex gap-6 items-center whitespace-nowrap text-sm">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path} 
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${location.pathname === link.path ? 'text-violet-500' : 'text-gray-400 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Registrations Dropdown */}
                    <div className="relative" ref={registrationsRef}>
                        <button onClick={() => setIsRegistrationsOpen(!isRegistrationsOpen)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white flex items-center gap-1">
                            Registrations <ChevronDown size={14} />
                        </button>
                        <AnimatePresence>
                            {isRegistrationsOpen && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full mt-2 left-0 bg-zinc-900 rounded-lg shadow-xl py-2 w-48 border border-white/10 z-50">
                                    <Link to="/stall-registration" className="block px-4 py-2 text-white/80 hover:bg-violet-600 text-[10px] font-bold uppercase" onClick={closeAllMenus}>Auction Registration</Link>
                                    <Link to="/tshirt-registration" className="block px-4 py-2 text-white/80 hover:bg-violet-600 text-[10px] font-bold uppercase" onClick={closeAllMenus}>T-shirt Registration</Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/alumni-registration" className="px-4 py-2 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-violet-500 transition-all flex items-center gap-1">
                        <GraduationCap size={12} /> Alumni Registration
                    </Link>

                    {/* Profile Dropdown at the Right */}
                    {isLoggedIn && (
                        <div className="relative border-l border-white/10 pl-4" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 p-1 pr-3 rounded-full transition-all border border-white/5"
                            >
                                <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                    {adminData?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Profile</span>
                                <ChevronDown size={12} className={`transition-transform text-gray-400 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full mt-2 right-0 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-4 w-64 z-[1001]"
                                    >
                                        {/* User Info Section */}
                                        <div className="flex flex-col gap-1 mb-3 pb-3 border-b border-white/5">
                                            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Logged in as</p>
                                            <p className="text-sm font-bold text-white truncate">{adminData?.name}</p>
                                            <p className="text-[10px] text-gray-400 truncate">{adminData?.email}</p>
                                            <div className="mt-2">
                                                <span className="text-[8px] bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full border border-violet-500/20 uppercase font-black">
                                                    {adminData?.role}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Navigation Links inside Dropdown */}
                                        <div className="flex flex-col gap-2">
                                            <Link to="/admin-dashboard" className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white py-1 uppercase tracking-widest transition-colors" onClick={closeAllMenus}>
                                                <LayoutDashboard size={14} /> Dashboard
                                            </Link>
                                            {isSuperAdmin && (
                                                <Link to="/manage-admins" className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white py-1 uppercase tracking-widest transition-colors" onClick={closeAllMenus}>
                                                    <ShieldCheck size={14} /> Manage Admins
                                                </Link>
                                            )}
                                            
                                            {/* Logout Button inside Dropdown */}
                                            <button 
                                                onClick={handleLogout} 
                                                className="flex items-center gap-2 text-[10px] font-bold text-red-400 hover:text-red-300 py-1 mt-1 border-t border-white/5 pt-3 uppercase tracking-widest transition-colors"
                                            >
                                                <LogOut size={14} /> Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900/95 backdrop-blur-xl rounded-3xl p-6 lg:hidden border border-white/10 shadow-2xl z-40">
                        
                        {isLoggedIn && (
                            <div className="bg-white/5 p-4 rounded-2xl mb-6 text-center border border-white/10">
                                <p className="text-[10px] text-violet-400 font-black uppercase tracking-widest mb-1">Authenticated Admin</p>
                                <p className="text-lg font-bold text-white">{adminData?.name}</p>
                                <p className="text-xs text-gray-400 mb-2">{adminData?.email}</p>
                                <span className="text-[10px] bg-violet-600 px-3 py-1 rounded-full uppercase font-black">{adminData?.role}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 text-center">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.path} className="text-sm font-bold uppercase tracking-[0.2em] text-gray-300" onClick={closeAllMenus}>{link.name}</Link>
                            ))}
                            
                            <button onClick={() => setIsMobileRegistrationsOpen(!isMobileRegistrationsOpen)} className="text-sm font-bold uppercase tracking-[0.2em] text-gray-300 flex items-center justify-center gap-2">
                                Registrations <ChevronDown size={16} />
                            </button>
                            
                            {isMobileRegistrationsOpen && (
                                <div className="flex flex-col gap-2 bg-black/20 p-3 rounded-xl">
                                    <Link to="/stall-registration" className="text-xs uppercase text-gray-400" onClick={closeAllMenus}>Auction</Link>
                                    <Link to="/tshirt-registration" className="text-xs uppercase text-gray-400" onClick={closeAllMenus}>T-shirt</Link>
                                </div>
                            )}

                            <Link to="/alumni-registration" className="bg-violet-600 py-3 rounded-full text-sm font-black uppercase tracking-widest" onClick={closeAllMenus}>Alumni Registration</Link>

                            {isLoggedIn && (
                                <>
                                    <Link to="/admin-dashboard" className="text-gray-400 uppercase text-xs font-bold pt-2" onClick={closeAllMenus}>Dashboard</Link>
                                    <button onClick={handleLogout} className="text-red-500 uppercase text-xs font-black pt-2">Logout</button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}