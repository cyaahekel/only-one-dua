import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ delay: 2.5, duration: 1, ease: [0.87, 0, 0.13, 1] }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-[#FFDE00] flex flex-col items-center justify-center border-b-8 border-black overflow-hidden"
    >
      {/* Anime-style Speed Lines/Blocks */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-150%', skewX: -45 }}
            animate={{ x: '250%' }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.1, 
              repeat: Infinity, 
              repeatDelay: 0.5,
              ease: "linear"
            }}
            className="absolute h-8 bg-black opacity-10"
            style={{ top: `${i * 20}%`, width: '40%' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10"
      >
        <div className="w-32 h-32 bg-black flex items-center justify-center border-4 border-black neo-shadow-lg mb-8 animate-neo-bounce">
          <Download className="w-16 h-16 text-[#FFDE00]" />
        </div>
        
        <motion.div 
          animate={{ rotate: [-12, 12, -12] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-4 -right-12 bg-[#FF4911] text-white px-6 py-2 border-4 border-black neo-shadow font-black uppercase text-xl"
        >
          WAIT!!
        </motion.div>
      </motion.div>

      <div className="flex flex-col items-center gap-2 z-10">
        <h1 className="text-8xl font-black uppercase tracking-tighter italic border-b-8 border-black">ONLY ONE</h1>
        <div className="w-80 h-10 bg-white border-4 border-black neo-shadow p-1 mt-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "circIn" }}
            className="h-full bg-black flex items-center justify-end px-2"
          >
             <span className="text-[8px] font-black text-white">SYNCING...</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 flex gap-8 font-black uppercase text-sm italic z-10 bg-black text-white px-4 py-2 border-2 border-white -rotate-2">
        <span>TikTok</span>
        <span>•</span>
        <span>Instagram</span>
        <span>•</span>
        <span>No Watermark</span>
      </div>
    </motion.div>
  );
}
