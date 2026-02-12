import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Rocket,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/ornate.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Arenas", path: "/events" },
    { name: "Lineup", path: "/proshows" },
    { name: "Archives", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Timeline", path: "/schedule" },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, url: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, url: "#", label: "LinkedIn" },
    { icon: <Twitter size={18} />, url: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative mt-20 lg:mt-32 border-t border-white/5 bg-[#030014] pt-12 lg:pt-20 pb-8 overflow-hidden text-white">
      {/* glow */}
      <div className="absolute bottom-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-violet-600/10 blur-[90px] lg:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <motion.img
                src={logo}
                alt="Ornate Logo"
                className="h-14 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:brightness-125 group-hover:scale-[1.02]"
                whileHover={{ rotate: -1.5 }}
              />
            </Link>
            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed max-w-sm font-light">
              The flagship technical and cultural extravaganza of{" "}
              <span className="font-medium">RGUKT Ongole</span>, where
              engineering excellence meets avant‑garde creativity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  aria-label={social.label}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-violet-500 hover:bg-violet-600/20 transition-all duration-300 shadow-sm hover:shadow-violet-900/40"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
                Navigation
              </h4>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 text-[10px] lg:text-xs font-semibold uppercase tracking-widest hover:text-white transition-all flex items-center group"
                    >
                      <ChevronRight
                        size={10}
                        className="mr-1 text-violet-400 group-hover:translate-x-1 transition-transform"
                      />
                      <span className="group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:ornate@rguktong.ac.in"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-violet-600/25 transition-colors">
                  <Mail
                    size={14}
                    className="text-violet-300 group-hover:text-violet-200"
                  />
                </div>
                <span className="text-gray-200 text-[10px] lg:text-xs font-semibold tracking-widest group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                  ornate@rguktong.ac.in
                </span>
              </a>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin
                    size={14}
                    className="text-violet-300 group-hover:text-violet-200"
                  />
                </div>
                <span className="text-gray-300 text-[10px] lg:text-xs font-semibold uppercase tracking-widest leading-normal group-hover:text-white transition-colors">
                  RGUKT Ongole Campus, AP, India
                </span>
              </div>
            </div>
          </div>

          {/* Registration card */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 p-6 rounded-[1.5rem] border border-white/8 relative overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-violet-600/40 to-purple-600/30 blur-3xl rounded-full" />
              <h4 className="text-sm font-bold tracking-tight italic mb-2 relative z-10">
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-violet-300 bg-clip-text text-transparent">
                  Join the legacy.
                </span>
              </h4>
              <p className="text-[9px] uppercase tracking-widest font-black text-gray-300 mb-4 relative z-10">
                Registrations are live
              </p>
              <Link
                to="/stall-registration"
                className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/45"
              >
                Stall Auction <Rocket size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-center md:text-left">
            &copy; {currentYear}{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              Ornate RGUKT Ongole
            </span>
          </p>

          <div className="flex gap-6">
            <button className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-gradient-to-r hover:from-violet-400 hover:via-purple-400 hover:to-violet-400 hover:bg-clip-text hover:text-transparent transition-colors">
              Privacy
            </button>
            <button className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-gradient-to-r hover:from-violet-400 hover:via-purple-400 hover:to-violet-400 hover:bg-clip-text hover:text-transparent transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
