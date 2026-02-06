import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export default function Timeline({ events }) {
  // Handle empty state if no events are added for a specific day
  if (!events || events.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="py-20 text-center glass-morphism rounded-[3rem] border border-dashed border-white/10"
      >
        <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.3em]">
          No events scheduled for this arena yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      {/* Central Vertical Line - Elite Gradient */}
      <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet-600 via-violet-500/20 to-transparent" />

      <div className="space-y-12">
        {events.map((event, i) => (
          <motion.div
            key={event._id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* The Timeline Dot */}
            <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.8)] z-10 border-4 border-[#030014]" />

            {/* Content Card */}
            <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 hover:border-violet-500/30 transition-all duration-500 group">
                {/* Time Badge */}
                <div className={`flex items-center gap-2 text-violet-500 font-mono text-[13px] font-black tracking-widest uppercase mb-4 ${i % 2 === 0 ? '' : 'md:justify-end'}`}>
                  <Clock size={12} /> {formatDate(event.date)} at {event.time} 
                </div>

                <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {event.name}
                </h3>
                
                <p className="text-gray-500 text-xs font-light leading-relaxed mb-6 italic">
                  {event.description || "Experience the pinnacle of innovation at Ornate 2k26."}
                </p>

                {/* Venue Badge */}
                <div className={`flex items-center gap-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest ${i % 2 === 0 ? '' : 'md:justify-end'}`}>
                  <MapPin size={12} className="text-violet-600" />
                  {event.venue}
                </div>
              </div>
            </div>

            {/* Spacer for Desktop (Empty side of timeline) */}
            <div className="hidden md:block w-[45%]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}