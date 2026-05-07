import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-12 bg-white dark:bg-black border-4 border-black neo-shadow-lg m-4">
      <h1 className="text-5xl font-black uppercase tracking-tighter">Terms of Service</h1>
      <div className="space-y-6 font-bold text-lg">
        <p className="border-l-4 border-black pl-4">1. Acceptance of Terms: By using Only One, you agree to these legal terms.</p>
        <p className="border-l-4 border-black pl-4">2. Permitted Use: This tool is for personal, non-commercial use only. Respect copyright laws.</p>
        <p className="border-l-4 border-black pl-4">3. No Responsibility: We are not responsible for how you use the downloaded content.</p>
        <p className="border-l-4 border-black pl-4">4. Availability: We don't guarantee 100% uptime. Services may change without notice.</p>
      </div>
      <div className="bg-[#FFDE00] p-6 border-4 border-black neo-shadow">
        <p className="font-black uppercase">PLAY FAIR. DOWNLOAD RESPONSIBLY.</p>
      </div>
    </div>
  );
}
