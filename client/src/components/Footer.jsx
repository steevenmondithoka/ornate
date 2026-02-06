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
    <footer className="relative mt-40 border-t border-white/5 bg-[#030014] pt-24 pb-10 overflow-hidden ">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block group">
              <motion.img
                src={logo}
                alt="Ornate Logo"
                // Changed: h-20 (80px) and w-auto (keeps aspect ratio)
                // You can use h-16 (64px), h-20 (80px), or h-24 (96px) depending on need
                className="h-20 w-auto object-contain transition-all duration-300 group-hover:brightness-125"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              The flagship technical and cultural extravaganza of <span className="text-gray-300 font-medium">RGUKT Ongole</span>.
              A confluence of engineering excellence and avant-garde creativity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500 transition-all duration-300 shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:translate-x-2 transition-all flex items-center group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-violet-500 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500">Connect</h4>
            <div className="space-y-4">
              <a href="mailto:support@ornatefest.com" className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                  <Mail size={14} className="text-violet-400" />
                </div>
                <span className="text-gray-400 text-xs font-bold  tracking-widest group-hover:text-white transition-colors">ornate@rguktong.ac.in</span>
              </a>
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={14} className="text-violet-400" />
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  RGUKT Ongole Campus,<br />Santhanuthalapadu(M),Prakasam(dt),<br /> Andhra Pradesh, India
                </span>
              </div>
            </div>
          </div>

          {/* Quick Registration Card */}
          <div className="lg:col-span-3">
            <div className="glass-morphism p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-white font-bold tracking-tight italic mb-4 relative z-10">Ready to join the legacy?</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black mb-6 relative z-10">Registrations are live</p>
              <Link to="/stall-registration" className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2 relative z-10">
                Register for Stall Auction <Rocket size={14} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 order-2 md:order-1">


          </div>

          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] order-1 md:order-2">
            &copy; {currentYear} Ornate RGUKT Ongole
          </p>

          <div className="flex gap-6 order-3">
            <a href="#" className="text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-violet-400 transition">Privacy</a>
            <a href="#" className="text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-violet-400 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}