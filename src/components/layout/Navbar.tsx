import React from 'react';
import { motion } from 'motion/react';
import { Menu, Home, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  webTitle: string;
  onOpenSidebar: () => void;
  currentTab: 'home' | 'mods';
  setCurrentTab: (tab: 'home' | 'mods') => void;
}

export default function Navbar({
  webTitle,
  onOpenSidebar,
  currentTab,
  setCurrentTab,
}: NavbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center justify-between gap-3 bg-white/10 dark:bg-black/25 backdrop-blur-xl saturate-[190%] border border-white/30 dark:border-white/15 p-2 sm:p-3 rounded-2xl shadow-2xl w-[90%] max-w-sm select-none animate-fade-in-up">
      {/* 3-lines menu (garis 3) */}
      <button
        onClick={onOpenSidebar}
        className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-all duration-200 cursor-pointer text-white shrink-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-md"
        title="Menu"
      >
        <Menu strokeWidth={2.5} className="w-5 h-5" />
      </button>

      {/* Navigation Items */}
      <div className="flex items-center gap-2.5 font-sans font-bold text-xs">
        {/* HOME TAB */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
            currentTab === 'home'
              ? 'bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-lg'
              : 'bg-transparent text-white/60 hover:text-white border-transparent hover:bg-white/5'
          }`}
        >
          <Home strokeWidth={2.5} className="w-4 h-4" />
          <span>HOME</span>
        </button>

        {/* MODS TAB */}
        <button
          onClick={() => setCurrentTab('mods')}
          className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
            currentTab === 'mods'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-lg'
              : 'bg-transparent text-white/60 hover:text-white border-transparent hover:bg-white/5'
          }`}
        >
          <LayoutGrid strokeWidth={2.5} className="w-4 h-4" />
          <span>MODS</span>
        </button>
      </div>
    </div>
  );
}
