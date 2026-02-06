import EventCard from '../components/EventCard';

export default function Workshops() {
  const workshops = [
    { name: "AI & ML Mastery", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", description: "Hands-on session with Neural Networks." },
    { name: "Stock Marketing", image: "https://images.unsplash.com/photo-1611974714024-4607a50ad6a0", description: "Learn to trade from the experts." }
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4 uppercase">Skill-Based <span className="text-amber-500">Workshops</span></h1>
      <p className="text-gray-400 mb-12">Upgrade your career with industry experts.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workshops.map((w, i) => <EventCard key={i} event={w} />)}
      </div>
    </div>
  );
}