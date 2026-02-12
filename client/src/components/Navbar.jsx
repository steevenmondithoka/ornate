import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import logo from "../assets/ornate.png";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Timeline", path: "/schedule" },
  { name: "Lineup", path: "/proshows" },
  { name: "Archives", path: "/gallery" },
  { name: "Sponsors", path: "/sponsors" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
  const [isMobileRegistrationsOpen, setIsMobileRegistrationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const registrationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const info = JSON.parse(localStorage.getItem("adminInfo"));
    setIsLoggedIn(!!token);
    setAdminData(info);
    
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
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] w-full">
      {/* Top Neon Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

      <div className="bg-[#050505]/90 border-b border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          
          {/* LEFT: LOGO & BRANDING */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logo}
              alt="Ornate Logo"
              className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:rotate-[-5deg]"
            />
            <div className="flex flex-col justify-center border-l border-white/10 pl-3">
              <span className="text-sm md:text-base font-black tracking-tighter italic uppercase bg-gradient-to-r from-white via-violet-200 to-purple-400 bg-clip-text text-transparent leading-none">
                ORNATE
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-violet-400/80 tracking-[0.4em] uppercase leading-none mt-1">
                2k26
              </span>
            </div>
          </Link>

          {/* CENTER/RIGHT: DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                    active ? "text-white" : "text-gray-400 hover:text-violet-300"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
                    />
                  )}
                </Link>
              );
            })}

            {/* Registrations Dropdown */}
            <div className="relative" ref={registrationsRef}>
              <button
                onClick={() => setIsRegistrationsOpen(!isRegistrationsOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                  isRegistrationsOpen ? "text-white" : "text-gray-400 hover:text-violet-300"
                }`}
              >
                Registrations
                <ChevronDown size={14} className={`transition-transform ${isRegistrationsOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isRegistrationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-52 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 backdrop-blur-2xl"
                  >
                    <PortalLink to="/stall-registration" label="Stall Auction" icon={<Sparkles size={14} />} />
                    <PortalLink to="/tshirt-registration" label="Merch Drop" icon={<Sparkles size={14} />} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Alumni Button */}
            <Link
              to="/alumni-registration"
              className="ml-2 flex items-center gap-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-900/20 transition-all hover:scale-105 active:scale-95"
            >
              <GraduationCap size={14} />
              Alumni
            </Link>

            {/* Admin Console */}
            {isLoggedIn && (
              <div className="relative ml-4 pl-4 border-l border-white/10" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                    {adminData?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-200">Console</span>
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-full right-0 mt-3 w-60 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-4"
                    >
                      <p className="text-[9px] font-bold text-violet-400 uppercase tracking-widest mb-1">{adminData?.role}</p>
                      <p className="text-xs font-bold text-white mb-4 truncate border-b border-white/5 pb-2">{adminData?.name}</p>
                      <AdminMenuLink to="/admin-dashboard" label="Dashboard" icon={<LayoutDashboard size={14} />} />
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-[10px] font-bold text-red-400 hover:bg-red-500/10 rounded-lg mt-2 uppercase tracking-widest">
                        <LogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#050505] border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-center uppercase tracking-widest text-gray-200">
                    {link.name}
                  </Link>
                ))}
              </div>
              <button onClick={() => setIsMobileRegistrationsOpen(!isMobileRegistrationsOpen)} className="w-full py-4 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-200 border border-white/5 flex justify-center items-center gap-2">
                Registrations <ChevronDown size={14} className={isMobileRegistrationsOpen ? "rotate-180" : ""} />
              </button>
              {isMobileRegistrationsOpen && (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/stall-registration" onClick={() => setIsOpen(false)} className="py-3 bg-violet-600/10 text-violet-400 text-center rounded-lg text-[10px] font-bold uppercase tracking-widest">Auction</Link>
                  <Link to="/tshirt-registration" onClick={() => setIsOpen(false)} className="py-3 bg-violet-600/10 text-violet-400 text-center rounded-lg text-[10px] font-bold uppercase tracking-widest">Merch</Link>
                </div>
              )}
              <Link to="/alumni-registration" onClick={() => setIsOpen(false)} className="w-full bg-violet-600 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center text-white">
                Alumni Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Sub-components for cleaner code
function PortalLink({ to, label, icon }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-gray-300 hover:text-white hover:bg-violet-600/20 transition-all uppercase tracking-widest">
      <span className="text-violet-400">{icon}</span> {label}
    </Link>
  );
}

function AdminMenuLink({ to, label, icon }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-3 py-2 text-[10px] font-bold text-gray-300 hover:bg-white/5 rounded-lg uppercase tracking-widest">
      <span className="text-violet-400">{icon}</span> {label}
    </Link>
  );
}