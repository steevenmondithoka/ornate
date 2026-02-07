import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Mail, MapPin, Rocket, ChevronRight } from 'lucide-react';
import logo from '../assets/ornate.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Arenas', path: '/events' },
    { name: 'Lineup', path: '/proshows' },
    { name: 'Archives', path: '/gallery' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Timeline', path: '/schedule' },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, url: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, url: '#', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, url: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative mt-20 lg:mt-32 border-t border-white/5 bg-[#030014] pt-12 lg:pt-20 pb-8 overflow-hidden">
      {/* Background Decorative Glow - Reduced size for mobile */}
      <div className="absolute bottom-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-violet-600/5 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <motion.img
                src={logo}
                alt="Ornate Logo"
                className="h-14 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:brightness-125"
              />
            </Link>
            <p className="text-gray-500 text-xs lg:text-sm leading-normal max-w-sm font-light">
              The flagship technical and cultural extravaganza of <span className="text-gray-300 font-medium">RGUKT Ongole</span>.
              Where engineering excellence meets avant-garde creativity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Side by Side on Mobile */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500 mb-4">Navigation</h4>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:text-white transition-all flex items-center group"
                    >
                      <ChevronRight size={10} className="text-violet-500 mr-1 opacity-50" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500 mb-4">Connect</h4>
            <div className="space-y-3">
              <a href="mailto:ornate@rguktong.ac.in" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                  <Mail size={14} className="text-violet-400" />
                </div>
                <span className="text-gray-400 text-[10px] lg:text-xs font-bold tracking-widest group-hover:text-white transition-colors">ornate@rguktong.ac.in</span>
              </a>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-violet-400" />
                </div>
                <span className="text-gray-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest leading-normal">
                  RGUKT Ongole Campus, AP, India
                </span>
              </div>
            </div>
          </div>

          {/* Quick Registration Card - Optimized for Mobile */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-violet-600/10 blur-2xl rounded-full" />
              <h4 className="text-white text-sm font-bold tracking-tight italic mb-2 relative z-10">Join the legacy.</h4>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black mb-4 relative z-10">Registrations are live</p>
              <Link to="/stall-registration" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-violet-900/20">
                Stall Auction <Rocket size={12} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Tightened Spacing */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] text-center md:text-left">
            &copy; {currentYear} Ornate RGUKT Ongole
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-violet-400 transition">Privacy</a>
            <a href="#" className="text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-violet-400 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}