import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { formatDate } from "../utils/formatDate";

export default function Timeline({ events }) {
  if (!events || events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center rounded-[3rem] border border-dashed border-white/15 bg-white/5 backdrop-blur-xl"
      >
        <p className="text-gray-200 uppercase text-[11px] font-semibold tracking-[0.28em]">
          No events scheduled for this arena yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto px-4 md:px-6">
      {/* central line */}
      <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-violet-400/20 to-transparent" />

      <div className="space-y-14 md:space-y-16">
        {events.map((event, i) => {
          const isRight = i % 2 === 0;
          return (
            <motion.div
              key={event._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                isRight ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* dot */}
              <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(124,58,237,0.9)] z-10 border-[5px] border-[#030014]" />

              {/* card */}
              <div
                className={`w-full md:w-[48%] pl-12 md:pl-0 ${
                  isRight ? "md:text-left" : "md:text-right"
                }`}
              >
                <div className="relative p-7 md:p-9 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-violet-400/40 hover:bg-white/8 backdrop-blur-2xl transition-all duration-500 group shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
                  {/* glow accent */}
                  <div className="pointer-events-none absolute -inset-px rounded-[2.6rem] bg-gradient-to-br from-violet-500/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* time */}
                  <div
                    className={`relative flex items-center gap-2 text-violet-300 font-mono text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-4 ${
                      isRight ? "" : "md:justify-end"
                    }`}
                  >
                    <Clock size={14} />
                    <span>
                      {formatDate(event.date)} · {event.time}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="relative text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-violet-200 transition-colors">
                    {event.name}
                  </h3>

                  {/* description */}
                  <p className="relative text-gray-200 text-sm md:text-base font-normal leading-relaxed mb-6 italic">
                    {event.description ||
                      "Experience the pinnacle of innovation at Ornate 2k26."}
                  </p>

                  {/* venue */}
                  <div
                    className={`relative flex items-center gap-2 text-[12px] md:text-[13px] font-semibold text-gray-100 uppercase tracking-[0.18em] ${
                      isRight ? "" : "md:justify-end"
                    }`}
                  >
                    <MapPin size={14} className="text-violet-400" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>

              {/* spacer */}
              <div className="hidden md:block w-[48%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
