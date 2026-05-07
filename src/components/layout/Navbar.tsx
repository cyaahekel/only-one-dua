import { motion } from 'motion/react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { Page } from '../../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white dark:bg-black border-4 border-black neo-shadow h-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <div className="w-10 h-10 bg-black dark:bg-[#FFDE00] flex items-center justify-center border-2 border-black">
          <Download className="w-6 h-6 text-white dark:text-black" />
        </div>
        <span className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">
          Only One
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setCurrentPage(item.value)}
            className={`text-sm font-black uppercase px-4 py-2 border-2 border-transparent transition-all ${
              currentPage === item.value 
                ? 'bg-black text-white dark:bg-[#FFDE00] dark:text-black border-black' 
                : 'hover:border-black'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="p-3 bg-[#FF4911] dark:bg-[#FFDE00] border-2 border-black neo-shadow active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          {theme === 'light' ? <Moon size={18} className="text-white" /> : <Sun size={18} className="text-black" />}
        </button>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-3 bg-[#FF4911] dark:bg-[#FFDE00] border-2 border-black neo-shadow"
        >
          {theme === 'light' ? <Moon size={18} className="text-white" /> : <Sun size={18} className="text-black" />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white dark:bg-black border-2 border-black neo-shadow"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[calc(100%+16px)] left-0 right-0 bg-white dark:bg-black border-4 border-black neo-shadow py-6 px-6 flex flex-col gap-6"
        >
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setCurrentPage(item.value);
                setIsOpen(false);
              }}
              className={`text-xl font-black uppercase text-left p-4 border-2 border-black ${
                currentPage === item.value ? 'bg-black text-white dark:bg-[#FFDE00] dark:text-black' : 'bg-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
