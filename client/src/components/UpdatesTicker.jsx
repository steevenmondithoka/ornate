import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://ornate-evkf.onrender.com/api/updates";

export const UpdatesTicker = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(API_URL);
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching ticker updates:", error);
      }
    };
    fetchUpdates();
  }, []);

  if (!updates || updates.length === 0) return null;

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border-b border-violet-500/20 py-3 overflow-hidden flex items-center relative z-20">
      
      {/* --- CSS FOR SMOOTH SCROLL --- */}
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-track {
          animation: ticker-scroll 20s linear infinite; /* Adjust '40s' to change speed */
          width: fit-content;
          /* GPU Hardware Acceleration Hacks for Smoothness */
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .ticker-track:hover {
          animation-play-state: paused; /* Optional: Pause on hover */
        }
      `}</style>

      {/* Label (Static) */}
      <div className="absolute left-0 z-30 bg-violet-600 px-4 py-1 skew-x-[-15deg] ml-4 hidden md:block shadow-[0_0_15px_rgba(124,58,237,0.5)]">
        <span className="text-[10px] left-0 font-black text-white uppercase tracking-widest flex items-center gap-2 skew-x-[15deg]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative left-0 inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Live Updates
        </span>
      </div>

      {/* Scrolling Content Container */}
      {/* We add padding-left (pl) so the text doesn't start underneath the 'Live Updates' label immediately */}
      <div className="flex items-center w-full overflow-hidden pl-[20px] md:pl-[180px]">
        
        {/* The Moving Track */}
        <div className="ticker-track flex whitespace-nowrap gap-16 items-center">
          
          {/* List 1 (Original) */}
          {updates.map((item, index) => (
             <TickerItem key={`original-${item._id}-${index}`} text={item.text} />
          ))}

          {/* List 2 (Duplicate for Seamless Loop) */}
          {updates.map((item, index) => (
             <TickerItem key={`duplicate-${item._id}-${index}`} text={item.text} />
          ))}

        </div>
      </div>
    </div>
  );
};

// Extracted sub-component for cleaner code
const TickerItem = ({ text }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <span className="text-violet-500 font-mono text-xs">◆</span>
    <p className="text-white font-mono text-xs md:text-sm tracking-wider uppercase opacity-80 group-hover:opacity-100 group-hover:text-violet-400 transition-colors shadow-black drop-shadow-md">
      {text}
    </p>
  </div>
);