import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send } from 'lucide-react';

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-12 bg-white dark:bg-black border-4 border-black neo-shadow-lg m-4">
      <h1 className="text-5xl font-black uppercase tracking-tighter">Feedback Hub</h1>
      <p className="text-xl font-bold uppercase border-b-4 border-black pb-4">Help us make Only One even better.</p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="font-black uppercase tracking-widest text-sm">How much do you love us?</p>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button 
                key={s} 
                onClick={() => setRating(s)}
                className={`p-4 border-4 border-black neo-shadow transition-all ${rating >= s ? 'bg-[#FFDE00]' : 'bg-white'}`}
              >
                <Star size={32} fill={rating >= s ? "black" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-black uppercase tracking-widest text-sm">Any suggestions?</label>
          <textarea 
            className="w-full p-6 bg-gray-100 dark:bg-zinc-900 border-4 border-black neo-shadow outline-none font-bold placeholder:text-gray-500" 
            rows={5}
            placeholder="FEED YOUR MIND..."
          />
        </div>

        <button className="w-full py-6 bg-black text-white dark:bg-[#FFDE00] dark:text-black font-black uppercase border-4 border-black neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-4">
          <Send size={24} />
          SEND FEEDBACK
        </button>
      </div>
    </div>
  );
}
