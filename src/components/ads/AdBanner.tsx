import { motion } from 'motion/react';

export default function AdBanner() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full h-20 bg-white dark:bg-black border-4 border-black neo-shadow flex items-center justify-center overflow-hidden"
      >
        <div className="text-center">
          <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.3em] text-black dark:text-white font-black italic">
            • ADSTERRA NETWORK • SPONSORED •
          </div>
        </div>
      </motion.div>
    </div>
  );
}
