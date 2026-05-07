import { motion } from 'motion/react';
import { Shield, Zap, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-16">
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          className="inline-block p-6 bg-[#FFDE00] border-4 border-black neo-shadow-lg text-black"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
          The <span className="bg-black text-[#FFDE00] px-4">Ultimate</span> <br />Experience.
        </h1>
        <p className="text-xl text-black dark:text-zinc-300 max-w-2xl mx-auto font-bold border-l-8 border-black pl-6 py-2">
          Only One was built with a simple mission: to provide the fastest, cleanest, and most reliable way to save your favorite social media moments.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "LIT SPEED", desc: "Our engine processes links in milliseconds, getting you to your content faster.", color: "bg-green-400" },
          { icon: Shield, title: "TOP SECURITY", desc: "We don't store your history or data. Your downloads are your business.", color: "bg-blue-400" },
          { icon: Sparkles, title: "HD QUALITY", desc: "Get the highest resolution possible, exactly like the original upload.", color: "bg-purple-400" }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn("p-8 border-4 border-black neo-shadow-lg space-y-4", feature.color)}
          >
            <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center text-black neo-shadow">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-black uppercase">{feature.title}</h3>
            <p className="text-black font-bold text-sm leading-tight">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
