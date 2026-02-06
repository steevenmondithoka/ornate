export default function Alumni() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-medium tracking-tighter mb-20 italic">The Legacy.</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {[1,2,3,4].map(i => (
          <div key={i} className="text-center group">
            <div className="aspect-square bg-white/5 rounded-full overflow-hidden mb-6 border border-white/10 grayscale group-hover:grayscale-0 transition duration-500">
              <img src={`https://i.pravatar.cc/300?u=${i}`} alt="Alumni" />
            </div>
            <h3 className="text-xl font-medium">Rahul Sharma</h3>
            <p className="text-violet-500 text-[10px] font-bold uppercase tracking-widest mt-1">Class of 2018</p>
            <p className="text-gray-600 text-xs mt-4 italic">"Ornate was the catalyst for my startup journey."</p>
          </div>
        ))}
      </div>
    </div>
  );
}