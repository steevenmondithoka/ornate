import { motion } from "framer-motion";
import { Music, Calendar, Sparkles } from "lucide-react";
import { UpdatesTicker } from "../components/UpdatesTicker";

const shows = [
  {
    name: "CULTURAL GALA",
    artist: "FLASHMOB",
    date: "28 MARCH",
    genre: "Vogue / Performance",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000",
    color: "from-pink-600/20",
  },
  {
    name: "CULTURAL EVENTS",
    artist: "CULTURAL EVENTS",
    date: "28,29 AND 30th MARCH",
    genre: "Electronic / Bass",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000",
    color: "from-violet-600/20",
  },
  {
    name: "LASER SHOW",
    artist: "THE LASER SHOW",
    date: "29 MARCH",
    genre: "Indie Rock / Alternative",
    img: "https://images.unsplash.com/photo-1459749411178-042180ce673c?q=80&w=2000",
    color: "from-blue-600/20",
  },
];

export default function Proshows() {
  return (
    <div className="bg-[#030014] text-white">
      <div className="relative mb-2 pt-16">
        <UpdatesTicker />
      </div>

      {/* Intro Header Section */}
      <section className="pt-10 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-violet-100 font-mono tracking-[0.5em] text-[20px] uppercase mb-4">
            The Main Stage
          </p>
          {/* gradient text like Home ORNATE */}
          <h1 className="text-5xl md:text-5xl font-bold tracking-tighter italic mb-8 uppercase bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
            HEADLINERS<span className="text-white">.</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Experience the sonic evolution. Three nights of legendary
            performances, cutting-edge production, and pure adrenaline.
          </p>
        </motion.div>
      </section>

      {/* Full Screen Artist Sections */}
      {shows.map((show, i) => (
        <section
          key={i}
          className="relative h-screen flex items-end overflow-hidden border-b border-white/5"
        >
          {/* Background */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={show.img}
              className="w-full h-full object-cover"
              alt={show.artist}
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${show.color} to-transparent opacity-40`}
          />

          {/* Artist Details */}
          <div className="relative z-10 p-10 md:p-24 w-full">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 rounded-full border border-violet-500/40 bg-violet-500/15 text-violet-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.25)]">
                    <Sparkles
                      size={10}
                      className="animate-pulse text-violet-300"
                    />{" "}
                    {show.name}
                  </span>
                  <span className="text-gray-200 font-mono text-[10px] tracking-widest uppercase">
                    {show.genre}
                  </span>
                </div>

                {/* gradient artist name similar to ORNATE */}
                <h2 className="text-5xl md:text-[5rem] font-bold tracking-tighter leading-[0.8] italic uppercase mb-8">
                  <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-violet-300 bg-clip-text text-transparent">
                    {show.artist.split(" ")[0]}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent ml-0 md:ml-32">
                    {show.artist.split(" ").slice(1).join(" ")}
                  </span>
                </h2>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20 mt-12">
                  <div className="flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs">
                    <Calendar className="text-violet-400" size={18} />
                    {show.date} — MAIN ARENA
                  </div>
                  <div className="flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs">
                    <Music className="text-violet-400" size={18} />
                    3:00 PM ONWARDS
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Numbering */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
            <span className="text-[15rem] font-black text-white/[0.03] leading-none select-none">
              0{i + 1}
            </span>
          </div>
        </section>
      ))}

      {/* Night Finale Info */}
      <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-violet-950/20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic mb-8 bg-gradient-to-r from-violet-300 via-purple-300 to-violet-300 bg-clip-text text-transparent">
            Ready for the Night?
          </h2>
          <p className="text-gray-200 text-sm max-w-xl mx-auto mb-12">
            Proshow entries are included with the All-Access Pass. Limited
            individual night tickets available at the registration desk.
          </p>
          <div className="flex justify-center gap-6">
            <div className="w-12 h-[1px] bg-violet-500 my-auto" />
            <p className="text-violet-300 font-black tracking-widest text-[10px] uppercase">
              Ornate 2k26 • Volume 09
            </p>
            <div className="w-12 h-[1px] bg-violet-500 my-auto" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
