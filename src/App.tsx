/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DownloaderContainer from './components/downloader/DownloaderContainer';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import AdBanner from './components/ads/AdBanner';
import { Page } from './types';
import { motion, AnimatePresence } from 'motion/react';

import LoadingScreen from './components/layout/LoadingScreen';
import SpotifyWidget from './components/spotify/SpotifyWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <DownloaderContainer />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      case 'feedback':
        return <Feedback />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <DownloaderContainer />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FFDE00] dark:bg-[#2D31FA] text-black dark:text-white transition-colors selection:bg-black selection:text-[#FFDE00] relative bg-dots">
        <AnimatePresence>
          {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
        </AnimatePresence>

        {/* Floating Stickers Decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block opacity-20">
          <div className="absolute top-[15%] left-[5%] neo-sticker bg-[#FF4911] text-white">NO WATERMARK</div>
          <div className="absolute top-[20%] right-[10%] neo-sticker bg-green-400 rotate-3">100% FREE</div>
          <div className="absolute bottom-[20%] left-[8%] neo-sticker bg-purple-400 -rotate-3">INSTANT</div>
          <div className="absolute bottom-[15%] right-[15%] neo-sticker bg-[#2D31FA] text-white rotate-12">QUALITY++</div>
        </div>

        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 relative z-10">
          {currentPage === 'home' && <AdBanner />}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <SpotifyWidget />
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </ThemeProvider>
  );
}

