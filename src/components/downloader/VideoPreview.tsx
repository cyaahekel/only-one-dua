import { motion } from 'motion/react';
import { Download, Check, ExternalLink, Instagram, Music, Share2 } from 'lucide-react';
import { VideoMetadata } from '../../types';
import { cn } from '../../lib/utils';

interface VideoPreviewProps {
  result: VideoMetadata;
}

export default function VideoPreview({ result }: VideoPreviewProps) {
  const handleDownload = (hq: boolean = false) => {
    const downloadUrl = hq && result.hq_url ? result.hq_url : result.url;
    window.open(downloadUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: result.title,
        text: `Check out this video from ${result.author}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Thumbnail Card */}
      <div className="lg:col-span-5 aspect-[9/16] max-h-[500px] w-full bg-white border-4 border-black overflow-hidden relative group neo-shadow-lg">
        <img 
          src={result.thumbnail} 
          alt={result.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Platform Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white border-2 border-black neo-shadow text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <span className={cn(
              "w-2 h-2 rounded-none border border-black",
              result.platform === 'tiktok' ? "bg-red-500" : "bg-pink-500"
            )} />
            {result.platform === 'tiktok' ? 'TikTok' : 'Instagram'}
          </span>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 bg-[#FFDE00] border-4 border-black flex items-center justify-center neo-shadow">
             <Check className="w-8 h-8 text-black" />
          </div>
        </div>
      </div>

      {/* Details & Actions */}
      <div className="lg:col-span-7 space-y-6 pt-4">
        <div className="space-y-4 px-2 sm:px-0">
          <div className="flex items-center gap-2 text-black dark:text-white">
            <span className="text-xs font-black uppercase tracking-widest bg-white dark:bg-black p-1 border-2 border-black">Origin</span>
            <span className="text-sm font-bold uppercase tracking-widest">@{result.author}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-black dark:text-white leading-tight uppercase tracking-tighter">
            {result.title}
          </h3>
        </div>

        <div className="p-8 bg-white dark:bg-black border-4 border-black neo-shadow-lg space-y-8">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <span className="text-sm font-black uppercase tracking-widest">Select Quality</span>
            <span className="text-[10px] bg-green-400 text-black px-2 py-1 border-2 border-black font-black uppercase tracking-wider">
              No Watermark
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleDownload(true)}
              className="bg-[#2D31FA] text-white py-5 px-6 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FFDE00] hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none neo-shadow"
            >
              <Download size={20} />
              High Qual
            </button>
            <button
              onClick={() => handleDownload(false)}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white py-5 px-6 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none neo-shadow"
            >
              <Download size={20} />
              Standard
            </button>
            {result.music_url && (
              <button
                onClick={() => window.open(result.music_url, '_blank')}
                className="bg-purple-400 text-black py-5 px-6 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FFDE00] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none neo-shadow sm:col-span-2"
              >
                <Music size={20} />
                Extract MP3
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleShare}
              className="col-span-2 p-4 border-2 border-black flex items-center justify-center gap-3 bg-[#FF4911] text-white font-black uppercase tracking-widest neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Share2 size={20} />
              Spread the Word
            </button>
            <div className="p-4 border-2 border-black flex items-center gap-4 bg-gray-50 dark:bg-zinc-900">
              <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black">
                <ExternalLink size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-black dark:text-zinc-500 uppercase font-black tracking-widest mb-1">Format</p>
                <p className="text-xs font-black text-black dark:text-white">MP4</p>
              </div>
            </div>
            <div className="p-4 border-2 border-black flex items-center gap-4 bg-gray-50 dark:bg-zinc-900">
              <div className="w-10 h-10 bg-green-400 flex items-center justify-center border-2 border-black">
                <Check size={16} className="text-black" />
              </div>
              <div>
                <p className="text-[10px] text-black dark:text-zinc-500 uppercase font-black tracking-widest mb-1">Status</p>
                <p className="text-xs font-black text-black dark:text-white">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
