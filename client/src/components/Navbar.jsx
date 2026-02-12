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
  const [isMobileRegistrationsOpen, setIsMobileRegistrationsOpen] =
    useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
    setIsSuperAdmin(info?.role === "superadmin");

    setIsOpen(false);
    setIsRegistrationsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        registrationsRef.current &&
        !registrationsRef.current.contains(event.target)
      ) {
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
    setAdminData(null);
    navigate("/");
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsRegistrationsOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] w-full">
      {/* TOP ACCENT LINE */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-70" />

      <div className="bg-[#080808]/95 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 group"
            onClick={closeAllMenus}
          >
            <img
              src={logo}
              alt="Ornate Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="hidden.sm:block">
              <p className="text-xs md:text-sm font-black.leading-none tracking-tight italic uppercase bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                ORNATE
              </p>
              <p className="text-[9px] md:text-[10px] font-semibold text-violet-300 tracking-[0.35em] uppercase">
                2k26
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.04, y: -1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group"
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all relative ${
                      active
                        ? "text-white"
                        : "text-gray-200/80 group-hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`pointer-events-none absolute left-4 right-4 bottom-0 h-[2px] origin-center transition-all duration-300 ${
                        active
                          ? "scale-x-100 bg-gradient-to-r from-violet-600 to-purple-600 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                          : "scale-x-0 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* Portal dropdown */}
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="relative ml-2"
              ref={registrationsRef}
            >
              <button
                onClick={() =>
                  setIsRegistrationsOpen((prev) => !prev)
                }
                className={`flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  isRegistrationsOpen
                    ? "text-white"
                    : "text-gray-200/80 hover:text-white"
                }`}
              >
                Registrations
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isRegistrationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isRegistrationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-[#050510]/95 border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl"
                  >
                    <PortalLink
                      to="/stall-registration"
                      label="Stall Auction"
                      icon={<Sparkles size={13} />}
                      onClick={closeAllMenus}
                    />
                    <PortalLink
                      to="/tshirt-registration"
                      label="Merch Drop"
                      icon={<Sparkles size={13} />}
                      onClick={closeAllMenus}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Alumni button with same gradient as leaveLetter */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                to="/alumni-registration"
                className="ml-5 inline-flex items-center gap-3 bg-gradient-to-r from-violet-900 to-purple-500 text-white px-7 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-shadow"
              >
                <GraduationCap size={15} />
                Alumni
              </Link>
            </motion.div>

            {/* Admin profile */}
            {isLoggedIn && (
              <div
                className="relative ml-6 pl-6 border-l.border-white/10"
                ref={profileRef}
              >
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-[11px] font-bold text-white">
                    {adminData?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-100">
                    Console
                  </span>
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-[#050510]/95 border border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-xl"
                    >
                      <div className="pb-3 mb-3 border-b border-white/5">
                        <p className="text-[10px] font-semibold text-violet-400 uppercase tracking-[0.2em] mb-1">
                          {adminData?.role}
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                          {adminData?.name}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <AdminMenuLink
                          to="/admin-dashboard"
                          label="Dashboard"
                          icon={<LayoutDashboard size={14} />}
                          onClick={closeAllMenus}
                        />
                        {isSuperAdmin && (
                          <AdminMenuLink
                            to="/manage-admins"
                            label="Master Controls"
                            icon={<ShieldCheck size={14} />}
                            onClick={closeAllMenus}
                          />
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2 text-[10px] font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all uppercase tracking-[0.2em] mt-2 border-t border-white/5 pt-4"
                        >
                          <LogOut size={14} /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden w-full bg-[#050510]/95 border-b border-white/10 shadow-2xl px-6 py-8 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeAllMenus}
                    className="py-4 bg-white/5 rounded-xl text-[11px] font-semibold text-center uppercase tracking-[0.18em] text-gray-100 border border-white/8"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    setIsMobileRegistrationsOpen((prev) => !prev)
                  }
                  className="w-full py-4 bg-white/5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-100 flex items-center justify-center gap-2 border border-white/8"
                >
                  Registrations
                  <ChevronDown
                    size={16}
                    className={
                      isMobileRegistrationsOpen ? "rotate-180" : ""
                    }
                  />
                </button>
                {isMobileRegistrationsOpen && (
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <Link
                      to="/stall-registration"
                      onClick={closeAllMenus}
                      className="py-3 bg-violet-600/15 text-violet-300 rounded-lg text-center text-[10px] font-semibold uppercase tracking-[0.16em]"
                    >
                      Auction
                    </Link>
                    <Link
                      to="/tshirt-registration"
                      onClick={closeAllMenus}
                      className="py-3 bg-violet-600/15 text-violet-300 rounded-lg text-center text-[10px] font-semibold uppercase tracking-[0.16em]"
                    >
                      Merch
                    </Link>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/alumni-registration"
                    onClick={closeAllMenus}
                    className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-center text-white shadow-md shadow-violet-500/40"
                  >
                    Alumni Portal
                  </Link>
                </motion.div>
              </div>

              {isLoggedIn && (
                <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-3">
                  <Link
                    to="/admin-dashboard"
                    onClick={closeAllMenus}
                    className="text-center text-[10px] font-semibold uppercase text-gray-300 tracking-[0.18em]"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-center text-[10px] font-semibold uppercase text-red-400 tracking-[0.2em]"
                  >
                    Logout Session
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Helpers

function PortalLink({ to, label, icon, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 text-[11px] font-semibold text-gray-100 hover:text-white hover:bg-violet-600/25 transition-all uppercase tracking-[0.2em]"
    >
      <span className="text-violet-400">{icon}</span>
      {label}
    </Link>
  );
}

function AdminMenuLink({ to, label, icon, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 text-[11px] font-semibold text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-all uppercase tracking-[0.2em]"
    >
      <span className="text-violet-400">{icon}</span>
      {label}
    </Link>
  );
}
