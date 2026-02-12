import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Calendar,
  Heart,
  TrendingUp,
  Search,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundDesign from "../components/BackgroundDesign";
import { UpdatesTicker } from "../components/UpdatesTicker";
import { formatDate } from "../utils/formatDate";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://ornate-evkf.onrender.com/api/events"
      );
      const enrichedEvents = res.data.map((ev) => ({
        ...ev,
        likes: ev.likes || 0,
        isLiked: localStorage.getItem(`liked_${ev._id}`) === "true",
      }));
      setEvents(enrichedEvents);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async (eventId) => {
    const eventToUpdate = events.find((e) => e._id === eventId);
    if (!eventToUpdate) return;
    const wasAlreadyLiked = eventToUpdate.isLiked;

    setEvents((prev) =>
      prev.map((ev) =>
        ev._id === eventId
          ? {
              ...ev,
              likes: wasAlreadyLiked ? Math.max(0, ev.likes - 1) : ev.likes + 1,
              isLiked: !wasAlreadyLiked,
            }
          : ev
      )
    );

    try {
      const res = await axios.patch(
        `https://ornate-evkf.onrender.com/api/events/${eventId}/like`,
        {
          isUnlike: wasAlreadyLiked,
        }
      );
      if (wasAlreadyLiked) {
        localStorage.removeItem(`liked_${eventId}`);
      } else {
        localStorage.setItem(`liked_${eventId}`, "true");
      }
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === eventId ? { ...ev, likes: res.data.likes } : ev
        )
      );
    } catch (err) {
      // rollback
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === eventId
            ? {
                ...ev,
                likes: wasAlreadyLiked ? ev.likes + 1 : ev.likes - 1,
                isLiked: wasAlreadyLiked,
              }
            : ev
        )
      );
    }
  };

  const trendingEvents = [...events]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const filteredEvents = events
    .filter((e) => {
      const matchesDept = filter === "All" ? true : e.dept === filter;
      const matchesSearch = e.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesDept && matchesSearch;
    })
    .sort((a, b) => b.likes - a.likes);

  const eventRows = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredEvents.length; i += 10) {
      chunks.push(filteredEvents.slice(i, i + 10));
    }
    return chunks;
  }, [filteredEvents]);

  const departments = ["All", "cse", "mech", "ece", "eee", "civil"];

  return (
    <div className="relative pt-16 md:pt-24 pb-20 px-4 md:px-10 min-h-screen bg-[#030014] overflow-hidden text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative mb-5">
        <UpdatesTicker />
      </div>
      <BackgroundDesign />

      <div className="relative z-10 max-w-full mx-auto">
        {/* TRENDING */}
        {!loading && trendingEvents.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 px-2">
              <TrendingUp className="text-violet-400" size={20} />
              <h2 className="text-white font-bold uppercase tracking-[0.35em] text-[11px]">
                Trending Now
              </h2>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
              {trendingEvents.map((ev, i) => (
                <div
                  key={ev._id}
                  className="min-w-[280px] md:min-w-[350px] snap-center"
                >
                  <div className="p-5 bg-white/[0.04] border border-white/15 rounded-3xl flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-4">
                      <span className="text-violet-500 font-mono text-xl font-bold opacity-70">
                        0{i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate w-40">
                          {ev.name}
                        </p>
                        <p className="text-[10px] text-violet-300 font-semibold uppercase tracking-[0.2em]">
                          {ev.dept}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-fuchsia-400 bg-fuchsia-500/15 px-3 py-1 rounded-full border border-fuchsia-500/40">
                      <Heart size={13} className="fill-fuchsia-400" />
                      <span className="text-[11px] font-semibold">
                        {ev.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HEADER & SEARCH */}
        <div className="flex flex-col gap-8 mb-16 px-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-violet-300 font-mono tracking-[0.5em] text-[10px] uppercase mb-3">
                RGUKT Ongole Presents
              </p>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter italic text-white uppercase leading-[0.85]">
                Ornate<span className="text-violet-500">.</span>
              </h1>
            </div>

            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="SEARCH 100+ EVENTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white text-[11px] font-semibold tracking-[0.22em] uppercase focus:outline-none focus:border-violet-500/70 focus:bg-white/[0.08] transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex gap-4 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
            {departments.map((dept) => {
              const active = filter === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.22em] px-6 py-2 transition-all whitespace-nowrap ${
                    active
                      ? "text-violet-300 border-b-2 border-violet-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-40 animate-pulse text-violet-300 font-mono text-xs uppercase tracking-[0.5em]">
            Syncing Events...
          </div>
        ) : (
          <div className="space-y-20 md:space-y-32">
            {eventRows.length > 0 ? (
              eventRows.map((row, rowIndex) => (
                <div key={rowIndex} className="relative group/row">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-4">
                      <span className="h-px w-8 bg-violet-500/70 hidden md:block" />
                      <h3 className="text-white/70 font-semibold text-[11px] uppercase tracking-[0.35em]">
                        {filter === "All"
                          ? `Collection ${rowIndex + 1}`
                          : `${filter} Events`}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-300 uppercase tracking-[0.25em]">
                      Swipe
                      <ChevronRight size={12} className="text-violet-400" />
                    </div>
                  </div>

                  {/* Row */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-10 no-scrollbar px-2">
                    {row.map((event) => (
                      <div
                        key={event._id}
                        className="min-w-[80vw] md:min-w-[450px] snap-start"
                      >
                        <Link to={`/event/${event._id}`}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 14,
                            }}
                            className="group relative flex flex-col h-full p-px rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white/15 hover:bg-violet-600/40 transition-all duration-500 shadow-2xl"
                          >
                            <div className="relative flex flex-col h-full w-full bg-[#050508]/95 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 z-10">
                              <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/15 rounded-full">
                                  <Calendar
                                    size={13}
                                    className="text-violet-400"
                                  />
                                  <span className="text-[10px] text-white font-semibold uppercase tracking-[0.22em]">
                                    {formatDate(event.date)}
                                  </span>
                                </div>

                                <motion.button
                                  whileTap={{ scale: 1.4 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleToggleLike(event._id);
                                  }}
                                  className={`p-3 rounded-full border transition-all duration-500 ${
                                    event.isLiked
                                      ? "bg-fuchsia-500 border-fuchsia-500 text-white"
                                      : "bg-white/5 border-white/15 text-gray-300"
                                  }`}
                                >
                                  <Heart
                                    size={17}
                                    className={
                                      event.isLiked ? "fill-white" : ""
                                    }
                                  />
                                </motion.button>
                              </div>

                              <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                                  <p className="text-violet-300 font-semibold text-[10px] tracking-[0.35em] uppercase">
                                    {event.dept}
                                  </p>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold italic text-white leading-[1.1] group-hover:text-violet-300 transition-colors">
                                  {event.name}
                                </h3>
                              </div>

                              <p className="text-gray-200 text-sm md:text-[15px] font-normal leading-relaxed mb-12 line-clamp-2 md:line-clamp-3">
                                {event.description ||
                                  "Experience the fusion of talent and technology..."}
                              </p>

                              <div className="mt-auto flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/8 rounded-2xl border border-white/10 backdrop-blur-md">
                                  <Clock
                                    size={15}
                                    className="text-violet-300"
                                  />
                                  <span className="text-[12px] text-white font-semibold uppercase">
                                    {event.time}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2.5 bg-white/8 rounded-2xl border border-white/10 backdrop-blur-md max-w-[200px]">
                                  <MapPin
                                    size={15}
                                    className="text-violet-300"
                                  />
                                  <span className="text-[11px] text-white font-semibold uppercase truncate">
                                    {event.venue}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2.5 bg-violet-600/15 rounded-2xl border border-violet-400/40 ml-auto">
                                  <span className="text-[11px] text-violet-200 font-mono font-bold">
                                    LIKES: {event.likes}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center opacity-70">
                <Search size={60} className="text-white mb-6" />
                <p className="text-gray-200 font-mono text-sm uppercase tracking-[0.5em]">
                  No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
