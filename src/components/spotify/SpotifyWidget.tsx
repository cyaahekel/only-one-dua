import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Search, X, Play, Volume2, Disc } from 'lucide-react';
import axios from 'axios';
import { cn } from '../../lib/utils';

export default function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchTracks = async (q: string) => {
    if (!q) return;
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`/api/spotify/search?q=${encodeURIComponent(q)}`);
      setTracks(response.data.tracks.items);
    } catch (err) {
      console.error('Spotify Search Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && tracks.length === 0) {
      searchTracks('Viral TikTok');
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 left-4 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[320px] bg-white border-4 border-black neo-shadow-lg overflow-hidden flex flex-col h-[400px]"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black">
              <div className="flex items-center gap-2">
                <Music className="text-[#1DB954]" size={20} />
                <span className="font-black uppercase text-xs tracking-widest">SPOTIFY GRABBER</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-red-500 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 bg-gray-100 border-b-2 border-black flex items-center gap-2">
              <Search size={16} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="SEARCH SOUNDTRACKS..."
                className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase w-full outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchTracks(query)}
              />
            </div>

            {/* Track List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-grid">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Disc className="animate-spin" size={32} />
                  <p className="text-[10px] font-black uppercase">SYNCING STREAMS...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-[10px] font-black uppercase text-red-500">CREDENTIALS MISSING IN .ENV</p>
                  <p className="text-[8px] font-bold mt-2">SETUP SPOTIFY_CLIENT_ID IN SETTINGS</p>
                </div>
              ) : (
                tracks.map((track) => (
                  <div 
                    key={track.id} 
                    className="flex items-center gap-3 p-2 bg-white border-2 border-black hover:bg-[#1DB954] hover:text-white transition-colors group cursor-pointer"
                    onClick={() => window.open(track.external_urls.spotify, '_blank')}
                  >
                    <img src={track.album.images[0]?.url} className="w-10 h-10 border-2 border-black object-cover" alt="" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] font-black uppercase truncate">{track.name}</p>
                      <p className="text-[8px] font-bold opacity-60 truncate">{track.artists.map((a: any) => a.name).join(', ')}</p>
                    </div>
                    <Play size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2 bg-black flex justify-center">
              <div className="flex gap-4">
                <Volume2 size={12} className="text-[#1DB954]" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ repeat: Infinity, duration: 0.5 + Math.random(), delay: i * 0.1 }}
                      className="w-1 bg-[#1DB954]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-16 h-16 rounded-full border-4 border-black flex items-center justify-center neo-shadow transition-all group overflow-hidden",
          isOpen ? "bg-red-500 rotate-90" : "bg-[#1DB954]"
        )}
      >
        {isOpen ? (
          <X size={32} className="text-white" />
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
             <div className="absolute inset-0 bg-transparent flex items-center justify-center">
               <Music size={32} className="text-white group-hover:scale-125 transition-transform" />
             </div>
             {/* Styled Bars to mimic Spotify logo rings */}
             <svg viewBox="0 0 100 100" className="w-12 h-12 opacity-50">
               <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="50 50" />
               <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="30 70" />
               <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 90" />
             </svg>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
