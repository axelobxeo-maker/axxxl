import React from 'react';
import { motion } from 'motion/react';
import { Menu, Home, LayoutGrid, Users } from 'lucide-react';

interface NavbarProps {
  webTitle: string;
  onOpenSidebar: () => void;
  currentTab: 'home' | 'mods' | 'friends';
  setCurrentTab: (tab: 'home' | 'mods' | 'friends') => void;
}

export default function Navbar({
  webTitle,
  onOpenSidebar,
  currentTab,
  setCurrentTab,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black p-3 sm:p-4 select-none shadow-[0_4px_0_0_#000000]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3 justify-between w-full sm:w-auto">
          <button
            onClick={onOpenSidebar}
            className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <Menu strokeWidth={2.5} className="w-4 h-4 text-black" />
          </button>
          
          <div className="font-syne font-black text-base sm:text-xl uppercase tracking-tight text-black flex items-center">
            <span className="bg-[#FF6B6B] px-2.5 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000000]">
              {webTitle || 'AXELUF'}
            </span>
          </div>
          <div className="w-8 sm:hidden" /> {/* Spacer for balance on mobile */}
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2 font-syne font-extrabold text-[11px] sm:text-xs">
          {/* HOME TAB */}
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-lg transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#FFDE03] text-black shadow-[3px_3px_0px_0px_#000000] font-black translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-zinc-500 hover:text-black hover:bg-zinc-50 hover:translate-y-[1px] hover:translate-x-[1px]'
            }`}
          >
            <Home strokeWidth={2.5} className="w-4 h-4" />
            <span>HOME</span>
          </button>

          {/* DASHBOARD / MOD TAB */}
          <button
            onClick={() => setCurrentTab('mods')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-lg transition-all cursor-pointer ${
              currentTab === 'mods'
                ? 'bg-[#4CCD99] text-black shadow-[3px_3px_0px_0px_#000000] font-black translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-zinc-500 hover:text-black hover:bg-zinc-50 hover:translate-y-[1px] hover:translate-x-[1px]'
            }`}
          >
            <LayoutGrid strokeWidth={2.5} className="w-4 h-4" />
            <span>MODS</span>
          </button>

          {/* FRIENDS TAB */}
          <button
            onClick={() => setCurrentTab('friends')}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-lg transition-all cursor-pointer ${
              currentTab === 'friends'
                ? 'bg-[#FF71CD] text-black shadow-[3px_3px_0px_0px_#000000] font-black translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-zinc-500 hover:text-black hover:bg-zinc-50 hover:translate-y-[1px] hover:translate-x-[1px]'
            }`}
          >
            <Users strokeWidth={2.5} className="w-4 h-4" />
            <span>FRIENDS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
