import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-12 bg-white dark:bg-black border-4 border-black neo-shadow-lg m-4">
      <h1 className="text-5xl font-black uppercase tracking-tighter">Privacy Policy</h1>
      <div className="space-y-6 font-bold text-lg">
        <p className="border-l-4 border-black pl-4">1. No Logs: We don't store your download history.</p>
        <p className="border-l-4 border-black pl-4">2. Minimal Data: We only track total counts for server load balancing.</p>
        <p className="border-l-4 border-black pl-4">3. Third Party: Ads might use cookies to show you relevant stuff.</p>
        <p className="border-l-4 border-black pl-4">4. Security: Your privacy is our priority. We use encryption everywhere.</p>
      </div>
      <div className="bg-[#2D31FA] text-white p-6 border-4 border-black neo-shadow">
        <p className="font-black uppercase tracking-widest">YOUR DATA IS YOURS. PERIOD.</p>
      </div>
    </div>
  );
}
