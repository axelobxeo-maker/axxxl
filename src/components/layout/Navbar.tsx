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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center justify-between gap-3 bg-white border-4 border-black p-2 sm:p-3 rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] w-[90%] max-w-sm select-none animate-fade-in-up">
      {/* 3-lines menu (garis 3) */}
      <button
        onClick={onOpenSidebar}
        className="p-2.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer text-black shrink-0"
        title="Menu"
      >
        <Menu strokeWidth={2.5} className="w-5 h-5" />
      </button>

      {/* Navigation Items */}
      <div className="flex items-center gap-2.5 font-syne font-extrabold text-xs">
        {/* HOME TAB */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'bg-[#FFDE03] text-black shadow-[3px_3px_0px_0px_#000000] font-black translate-x-[-1px] translate-y-[-1px]'
              : 'bg-white text-zinc-500 hover:text-black hover:bg-zinc-50 hover:translate-y-[1px] hover:translate-x-[1px]'
          }`}
        >
          <Home strokeWidth={2.5} className="w-4 h-4" />
          <span>HOME</span>
        </button>

        {/* MODS TAB */}
        <button
          onClick={() => setCurrentTab('mods')}
          className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl transition-all cursor-pointer ${
            currentTab === 'mods'
              ? 'bg-[#4CCD99] text-black shadow-[3px_3px_0px_0px_#000000] font-black translate-x-[-1px] translate-y-[-1px]'
              : 'bg-white text-zinc-500 hover:text-black hover:bg-zinc-50 hover:translate-y-[1px] hover:translate-x-[1px]'
          }`}
        >
          <LayoutGrid strokeWidth={2.5} className="w-4 h-4" />
          <span>MODS</span>
        </button>
      </div>
    </div>
  );
}
