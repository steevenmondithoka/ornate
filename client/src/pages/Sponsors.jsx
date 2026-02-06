import React from 'react';
import { motion } from 'framer-motion';

// 1. DATA (High-quality logo links)
const PLATINUM_SPONSORS = [
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/1200px-Intel-logo.svg.png" },
  { name: "Red Bull", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_Racing_logo.svg/1200px-Red_Bull_Racing_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png" },
  { name: "Nvidia", logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1200px-Nvidia_logo.svg.png" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/1024px-Adobe_Corporate_Logo.svg.png" }
];

const GOLD_SPONSORS = [
  { name: "Monster Energy", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Monster_Energy_logo.svg/800px-Monster_Energy_logo.svg.png" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png" },
  { name: "Coca Cola", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png" },
  { name: "Starbucks", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" },
  { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/1200px-Pepsi_logo_2014.svg.png" }
];

// 2. Individual Sponsor Card (Clean Color Version)
const SponsorCard = ({ name, logo }) => (
  <div className="flex flex-col items-center justify-center min-w-[240px] md:min-w-[400px] px-8 group">
    <div className="w-32 h-32 md:w-56 md:h-56 glass-morphism rounded-[2.5rem] flex items-center justify-center p-12 border border-white/10 transition-all duration-500 bg-white/[0.03] shadow-2xl relative hover:bg-white/[0.08] hover:border-violet-500/30">
      
      {/* Logos are in full color and full opacity now */}
      <img 
        src={logo} 
        alt={name} 
        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Subtle purple glow that appears behind the logo on hover */}
      <div className="absolute inset-0 bg-violet-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
    
    <span className="mt-8 text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 group-hover:text-violet-400 transition-colors duration-500">
      {name}
    </span>
  </div>
);

// 3. Marquee Track
const MarqueeTrack = ({ sponsors, direction = "forward", speed = "40s" }) => {
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors];
  const animationClass = direction === "forward" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="relative overflow-hidden py-10 mask-horizontal">
      <div 
        className={`flex w-max ${animationClass}`}
        style={{ animationDuration: speed }}
      >
        {displaySponsors.map((s, i) => (
          <SponsorCard key={i} name={s.name} logo={s.logo} />
        ))}
      </div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <div className="pt-40 pb-20 min-h-screen overflow-hidden bg-[#030014]">
      {/* Page Header */}
      <div className="max-w-full mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-violet-500 font-mono tracking-[0.6em] text-[10px] uppercase mb-4">Establishing Excellence</p>
          <h1 className="text-5xl md:text-[3rem] font-medium tracking-tighter italic leading-none text-reveal">THE PARTNERS.</h1>
        </motion.div>
      </div>

      {/* Marquee Tracks */}
      <div className="space-y-32">
        

        <div className="space-y-6">
          <div className="max-w-full mx-auto px-6 flex flex-row-reverse items-center gap-4">
            <div className="w-12 h-[1px] bg-violet-600" />
            <p className="text-[12px] font-black text-gray-500 uppercase tracking-widest">Gold Tier Synergy</p>
          </div>
          <MarqueeTrack sponsors={GOLD_SPONSORS} speed="50s" direction="reverse" />
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-6 mt-48">
        <div className="glass-morphism p-16 md:p-32 rounded-[4rem] border border-white/5 text-center relative group overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/5 blur-[120px]" />
          <h2 className="text-5xl md:text-7xl font-medium mb-10 italic tracking-tighter relative z-10">
            Join the <span className="text-violet-500">Elite Network.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 text-sm md:text-lg font-light leading-relaxed relative z-10">
            Collaborate with the most anticipated fest of 2026. Empowering innovation and artistic brilliance.
          </p>
          <button className="px-16 py-6 bg-violet-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-2xl hover:scale-105 transition duration-500 relative z-10">
            Partnership Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}