import { Mail, Instagram, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-6xl font-medium tracking-tighter italic mb-10 text-violet-600">Contact.</h1>
          <div className="space-y-6">
            <p className="text-gray-400 text-sm max-w-sm leading-loose">Reach out to our core team for sponsorship inquiries, event details, or general information regarding Ornate 2k26.</p>
            <div className="pt-10 space-y-4">
              <p className="flex items-center gap-4 text-gray-300 font-mono text-xs"><Mail size={16} className="text-violet-500"/> coordinator@ornatefest.com</p>
              <p className="flex items-center gap-4 text-gray-300 font-mono text-xs"><Instagram size={16} className="text-violet-500"/> @ornate_2k26</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          {[
            { name: "John Wick", role: "General Secretary" },
            { name: "Jane Doe", role: "Cultural Head" },
            { name: "Sam Alt", role: "Technical Head" },
            { name: "Lisa Ray", role: "PR & Media" }
          ].map((member, i) => (
            <div key={i} className="border-t border-white/5 pt-6">
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-violet-500 text-[10px] font-bold uppercase tracking-widest mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}