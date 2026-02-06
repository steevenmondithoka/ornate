export default function EventCard({ event }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition">
      <img src={event.image} className="h-48 w-full object-cover group-hover:scale-105 transition duration-500" alt={event.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{event.name}</h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{event.description}</p>
        <button className="mt-4 w-full py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg hover:bg-amber-500 hover:text-black font-bold transition">View Details</button>
      </div>
    </div>
  );
}