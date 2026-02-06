export default function Stalls() {
  const auctions = [
    { item: "Central Food Court Stall A", winner: "Urban Cravings", amount: "₹ 18,500" },
    { item: "Technical Block Stall B", winner: "Byte Bites", amount: "₹ 12,000" },
    { item: "Main Arena Premium Space", winner: "Red Bull India", amount: "₹ 45,000" },
    { item: "Cultural Block Stall D", winner: "Creative Corner", amount: "₹ 9,500" }
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-medium tracking-tighter mb-4 italic">Auctions.</h1>
      <p className="text-gray-500 uppercase text-[10px] tracking-[0.4em] font-bold mb-20">Winning bids & stall allocations</p>
      
      <div className="space-y-4">
        {auctions.map((bid, i) => (
          <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition group">
            <div>
              <p className="text-violet-500 font-mono text-[9px] uppercase tracking-widest mb-1">Allocated to: {bid.winner}</p>
              <h3 className="text-xl font-medium">{bid.item}</h3>
            </div>
            <div className="mt-4 md:mt-0 text-3xl font-light italic text-white group-hover:text-violet-500 transition">
              {bid.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}