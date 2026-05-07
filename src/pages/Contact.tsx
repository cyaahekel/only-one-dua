import { motion } from 'motion/react';
import { Mail, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-20">
      <section className="text-center space-y-8">
        <h1 className="text-6xl font-black tracking-tighter text-black dark:text-white uppercase">
          Say <span className="bg-[#FF4911] text-white px-4 border-4 border-black neo-shadow inline-block rotate-3">Hello.</span>
        </h1>
        <p className="text-xl text-black dark:text-zinc-300 font-bold max-w-lg mx-auto">
          Feedback? Bugs? Love letters? We take it all. Reach out below.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2D31FA] dark:text-white">Direct Line</h3>
            <div className="flex items-center gap-6 p-8 bg-green-400 border-4 border-black neo-shadow-lg">
              <div className="p-4 bg-white border-2 border-black neo-shadow">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-black/60">Email</p>
                <p className="text-xl font-black text-black break-all">support@onlyone.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FF4911] dark:text-white">Follow Us</h3>
            <div className="flex items-center gap-6 p-8 bg-pink-400 border-4 border-black neo-shadow-lg">
              <div className="p-4 bg-white border-2 border-black neo-shadow">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-black/60">Twitter / X</p>
                <p className="text-xl font-black text-black">@OnlyOneDownload</p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white dark:bg-black border-4 border-black p-10 space-y-8 neo-shadow-lg flex flex-col justify-center">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Your Name</label>
            <input type="text" className="w-full px-6 py-5 bg-gray-100 dark:bg-zinc-900 border-4 border-black focus:bg-[#FFDE00] focus:text-black transition-all outline-none font-bold uppercase" placeholder="NAME HERE..." />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Message</label>
            <textarea rows={4} className="w-full px-6 py-5 bg-gray-100 dark:bg-zinc-900 border-4 border-black focus:bg-[#FFDE00] focus:text-black transition-all outline-none font-bold uppercase" placeholder="WRITE SOMETHING..."></textarea>
          </div>
          <button className="w-full py-6 bg-black text-white dark:bg-[#FFDE00] dark:text-black font-black uppercase tracking-[0.2em] border-4 border-black neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-4">
            <Send size={24} />
            Dispatch
          </button>
        </form>
      </div>
    </div>
  );
}
