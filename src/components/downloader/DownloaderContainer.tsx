import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, History, TrendingUp, X, AlertCircle } from 'lucide-react';
import { cn, getPlatform, isValidUrl } from '../../lib/utils';
import { fetchTikTokVideo, fetchInstagramVideo } from '../../services/downloaderService';
import VideoPreview from './VideoPreview';
import { VideoMetadata } from '../../types';

export default function DownloaderContainer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoMetadata | null>(null);
  const [history, setHistory] = useState<VideoMetadata[]>([]);
  const [accentColor, setAccentColor] = useState('#FFDE00');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchUrls, setBatchUrls] = useState('');

  const colors = [
    { name: 'Yellow', hex: '#FFDE00' },
    { name: 'Red', hex: '#FF4911' },
    { name: 'Blue', hex: '#2D31FA' },
    { name: 'Green', hex: '#4ADE80' },
    { name: 'Pink', hex: '#F472B6' },
    { name: 'Purple', hex: '#A78BFA' }
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  useEffect(() => {
    const saved = localStorage.getItem('download_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error('Failed to parse history'); }
    }
  }, []);

  const saveToHistory = (item: VideoMetadata) => {
    const newHistory = [item, ...history.filter(h => h.id !== item.id)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('download_history', JSON.stringify(newHistory));
  };

  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Establishing handshake...",
    "Bypassing watermarks...",
    "Scanning media streams...",
    "Packing pixels...",
    "Finalizing download..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep(s => (s + 1) % steps.length);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [loading]);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    const platform = getPlatform(url);
    if (platform === 'unknown') {
      setError('Unsupported platform. Only TikTok and Instagram are supported.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let data;
      if (platform === 'tiktok') {
        data = await fetchTikTokVideo(url);
      } else {
        data = await fetchInstagramVideo(url);
      }
      setResult(data);
      saveToHistory(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('download_history');
  };

  const exportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "grab_history.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const quotes = [
    "Steal like an artist, download like a pro.",
    "Your content, without the watermark baggage.",
    "Pixels are free. Memories are forever.",
    "Don't just watch it, keep it.",
    "Fast, Brutal, and 100% Free."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-2 sm:px-6 relative">
      {/* Theme Customizer Overlay */}
      <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2">
        <AnimatePresence>
          {showThemePicker && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white border-4 border-black p-4 neo-shadow grid grid-cols-3 gap-2"
            >
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    setAccentColor(c.hex);
                    setShowThemePicker(false);
                  }}
                  className="w-8 h-8 border-2 border-black neo-shadow hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="p-3 bg-black text-white border-4 border-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <div className="w-6 h-6 border-2 border-white rounded-full bg-grid" />
        </button>
      </div>

      <div className="text-center mb-10 space-y-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-black text-white font-black uppercase text-xs mb-4 neo-shadow accent-bg"
        >
          {randomQuote}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black dark:text-white leading-tight"
        >
          Grab The <br />
          <span className="accent-bg text-black px-4 neo-shadow border-4 border-black inline-block -rotate-2">
            Cool Stuff
          </span>
        </motion.h1>
      </div>

      <div className="flex gap-4 mb-8 justify-center">
        <button 
          onClick={() => setIsBatchMode(false)}
          className={cn(
            "px-6 py-2 border-4 border-black font-black uppercase text-xs neo-shadow transition-all",
            !isBatchMode ? "accent-bg -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white dark:bg-zinc-800"
          )}
        >
          Single
        </button>
        <button 
          onClick={() => setIsBatchMode(true)}
          className={cn(
            "px-6 py-2 border-4 border-black font-black uppercase text-xs neo-shadow transition-all",
            isBatchMode ? "accent-bg -translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white dark:bg-zinc-800"
          )}
        >
          Batch (BETA)
        </button>
      </div>

      {!isBatchMode ? (
        <form onSubmit={handleDownload} className="relative mb-16 px-2 sm:px-0">
          <div className="bg-white dark:bg-black border-4 border-black neo-shadow-lg flex flex-col sm:flex-row items-stretch p-2 gap-2">
            <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-900 border-2 border-black">
              <div className="pl-4 text-black dark:text-white">
                <Search size={22} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="PASTE LINK HERE..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-4 text-black dark:text-white placeholder:text-gray-500 font-black uppercase text-sm sm:text-lg outline-none"
              />
            </div>
            {/* Detected Platform Sticker */}
            <AnimatePresence>
              {url && (
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -20 }}
                  animate={{ opacity: 1, x: 0, rotate: -5 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className={cn(
                    "absolute -top-6 -left-2 px-3 py-1 font-black text-[10px] uppercase border-2 border-black neo-shadow z-20",
                    getPlatform(url) === 'tiktok' ? 'bg-red-400' : getPlatform(url) === 'instagram' ? 'bg-pink-400' : 'bg-gray-400'
                  )}
                >
                  {getPlatform(url) || 'Paste Link'} DETECTED
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={loading || !url}
              className="bg-[#FF4911] hover:accent-bg text-white hover:text-black px-8 py-4 border-2 border-black font-black uppercase tracking-widest transition-all active:translate-x-1 active:translate-y-1 active:shadow-none neo-shadow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'FETCH VIDEO'}
            </button>
          </div>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white dark:bg-black border-4 border-black neo-shadow flex items-center gap-4"
            >
              <div className="w-4 h-4 bg-[#FF4911] animate-ping" />
              <p className="font-black uppercase text-xs tracking-[0.2em]">{steps[loadingStep]}</p>
            </motion.div>
          )}
        </form>
      ) : (
        <div className="relative mb-16 px-2 sm:px-0">
          <div className="bg-white dark:bg-black border-4 border-black neo-shadow-lg p-6 space-y-4">
            <textarea
              value={batchUrls}
              onChange={(e) => setBatchUrls(e.target.value)}
              placeholder="PASTE MULTIPLE LINKS (ONE PER LINE)..."
              className="w-full h-40 bg-gray-100 dark:bg-zinc-900 border-4 border-black focus:border-[#FF4911] p-4 font-black uppercase text-sm placeholder:text-gray-500 outline-none transition-colors"
            />
            <button
              onClick={() => alert('Batch download coming soon!')}
              className="w-full py-6 bg-[#2D31FA] text-white border-4 border-black neo-shadow font-black uppercase tracking-[0.3em] hover:bg-[#FF4911] transition-colors"
            >
              INITIATE MASS GRAB
            </button>
            <p className="text-[10px] font-black uppercase text-center opacity-50 italic">Process up to 10 links at once</p>
          </div>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-red-100 border-4 border-black neo-shadow flex items-start gap-3 text-red-600 font-black uppercase text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {result && <VideoPreview result={result} />}
      </AnimatePresence>

      {!result && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20"
        >
          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-4 border-black pb-2">
              <div className="flex items-center gap-2">
                <History size={24} />
                <h3 className="text-xl font-black uppercase">Recent Grabs</h3>
              </div>
              <div className="flex gap-4">
                {history.length > 0 && (
                  <>
                    <button onClick={exportHistory} className="text-xs font-black uppercase underline hover:text-[#FF4911]">Export</button>
                    <button onClick={clearHistory} className="text-xs font-black uppercase underline hover:text-[#FF4911]">Clear</button>
                  </>
                )}
              </div>
            </div>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 p-3 bg-white dark:bg-black border-2 border-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
                    onClick={() => setResult(item)}
                  >
                    <img src={item.thumbnail} className="w-12 h-12 object-cover border-2 border-black" alt="" />
                    <div className="flex-1 overflow-hidden font-black uppercase">
                      <p className="text-xs truncate">{item.title}</p>
                      <p className="text-[10px] text-gray-500">@{item.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border-4 border-black border-dashed text-center opacity-50 bg-white/10">
                <p className="text-xs font-black">YOUR HISTORY IS EMPTY</p>
              </div>
            )}
          </div>

          {/* Trending Section (Mock) */}
          <div className="space-y-6">
            <div className="flex items-center border-b-4 border-black pb-2 gap-2">
              <TrendingUp size={24} className="text-[#FF4911]" />
              <h3 className="text-xl font-black uppercase">Viral Now</h3>
            </div>
            <div className="space-y-3">
              {[
                { title: "Epic Travel Reels", author: "travel_guru", color: "bg-green-400" },
                { title: "Insane Cooking Hacks", author: "chef_master", color: "bg-[#FFDE00]" },
                { title: "Cyberpunk Vibes 2026", author: "neo_junkie", color: "bg-purple-400" }
              ].map((trend, i) => (
                <div key={i} className={cn("p-4 border-4 border-black neo-shadow flex justify-between items-center group", trend.color)}>
                  <div>
                    <p className="font-black uppercase text-xs text-black">{trend.title}</p>
                    <p className="text-[10px] font-bold text-black/60">@{trend.author}</p>
                  </div>
                  <div className="text-[10px] font-black uppercase bg-white px-2 py-1 border-2 border-black group-hover:-rotate-3 transition-transform text-black">
                    TRENDING
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
