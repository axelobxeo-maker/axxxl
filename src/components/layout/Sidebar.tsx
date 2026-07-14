import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, Wrench, Activity, Sparkles, Folder, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  modsCount: number;
  favoritesCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  theme: string;
  onChangeTheme: (theme: string) => void;
  borderRadius: string;
  onChangeBorderRadius: (rad: string) => void;
  shadowOffset: string;
  onChangeShadowOffset: (shd: string) => void;
  isScanlineActive: boolean;
  onToggleScanlines: () => void;
  easterEggScore: number;
  easterEggHigh: number;
  onEasterEggTap: () => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

// IconWrapper: Sleek glassmorphic tile for sidebar icons
const IconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white/15 border border-white/25 p-1.5 rounded-lg shadow-sm flex items-center justify-center shrink-0">
      {children}
    </div>
  );
};

export default function Sidebar({
  isOpen,
  onClose,
  modsCount,
  favoritesCount,
  activeCategory,
  onSelectCategory,
  theme,
  onChangeTheme,
  borderRadius,
  onChangeBorderRadius,
  shadowOffset,
  onChangeShadowOffset,
  isScanlineActive,
  onToggleScanlines,
  easterEggScore,
  easterEggHigh,
  onEasterEggTap,
  isAdminMode,
  onToggleAdmin,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] transition-opacity"
      />
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-black/30 backdrop-blur-2xl border-r border-white/20 shadow-2xl z-[1001] flex flex-col rounded-tr-2xl rounded-br-2xl overflow-hidden animate-fade-in text-white">
        <div className="p-4 bg-white/10 border-b border-white/15 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <IconWrapper>
              <Folder strokeWidth={2.5} className="w-4 h-4 text-white" />
            </IconWrapper>
            <h2 className="font-sans font-bold text-base uppercase tracking-tight">Portal Menu</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 font-bold flex flex-col justify-between text-xs text-white">
          <div className="space-y-4">
            {/* Beranda Button */}
            <button
              onClick={() => {
                onSelectCategory('');
                onClose();
              }}
              className={`w-full text-left p-2 border rounded-xl transition-all duration-200 flex items-center justify-between uppercase hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-md ${
                activeCategory === '' 
                  ? 'bg-amber-400/20 border-amber-400/45 text-amber-300 shadow-amber-400/5' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <IconWrapper>
                  <Home strokeWidth={2.5} className="w-4 h-4 text-white" />
                </IconWrapper>
                <span>Beranda / Semua Mod</span>
              </div>
              <span className="bg-white/15 text-white px-2 py-0.5 text-[9px] border border-white/20 rounded">
                {modsCount}
              </span>
            </button>

            {/* Bookmark Button */}
            {favoritesCount > 0 && (
              <button
                onClick={() => {
                  onSelectCategory('BOOKMARKED');
                  onClose();
                }}
                className={`w-full text-left p-2 border rounded-xl transition-all duration-200 flex items-center justify-between uppercase hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer shadow-md ${
                  activeCategory === 'BOOKMARKED' 
                    ? 'bg-amber-400/20 border-amber-400/45 text-amber-300 shadow-amber-400/5' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconWrapper>
                    <Trophy strokeWidth={2.5} className="w-4 h-4 text-white" />
                  </IconWrapper>
                  <span>Bookmark Anda</span>
                </div>
                <span className="bg-white/15 text-white px-2 py-0.5 text-[9px] border border-white/20 rounded">
                  {favoritesCount}
                </span>
              </button>
            )}

            {/* Customizer Tema */}
            <Card variant="white" thickness="border-2" shadowSize="sm" hasHoverEffect={false} className="p-3 text-[10px]">
              <h4 className="uppercase font-bold mb-3 text-white flex items-center gap-2">
                <IconWrapper>
                  <Wrench strokeWidth={2.5} className="w-4 h-4 text-white" />
                </IconWrapper>
                <span>Customizer Tema</span>
              </h4>
              <div className="space-y-3.5 text-[9px]">
                <div>
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Pilihan Warna Tema</span>
                  <div className="flex items-center gap-2 bg-white/5 p-2 border border-white/15 rounded-xl">
                    <button onClick={() => onChangeTheme('green')} className={`w-5 h-5 rounded-full bg-[#CCFF00] border border-white/30 cursor-pointer transition-all duration-200 ${theme === 'green' ? 'scale-125 ring-2 ring-[#CCFF00] ring-offset-2 ring-offset-black shadow-lg shadow-[#CCFF00]/40' : 'hover:scale-110'}`} title="Green" />
                    <button onClick={() => onChangeTheme('pink')} className={`w-5 h-5 rounded-full bg-[#FF71CD] border border-white/30 cursor-pointer transition-all duration-200 ${theme === 'pink' ? 'scale-125 ring-2 ring-[#FF71CD] ring-offset-2 ring-offset-black shadow-lg shadow-[#FF71CD]/40' : 'hover:scale-110'}`} title="Pink" />
                    <button onClick={() => onChangeTheme('mint')} className={`w-5 h-5 rounded-full bg-[#B2F9FC] border border-white/30 cursor-pointer transition-all duration-200 ${theme === 'mint' ? 'scale-125 ring-2 ring-[#B2F9FC] ring-offset-2 ring-offset-black shadow-lg shadow-[#B2F9FC]/40' : 'hover:scale-110'}`} title="Mint" />
                    <button onClick={() => onChangeTheme('dark')} className={`w-5 h-5 rounded-full bg-[#121214] border border-white/30 cursor-pointer transition-all duration-200 ${theme === 'dark' ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black shadow-lg shadow-white/10' : 'hover:scale-110'}`} title="Dark" />
                    <button onClick={() => onChangeTheme('orange')} className={`w-5 h-5 rounded-full bg-[#FF8A08] border border-white/30 cursor-pointer transition-all duration-200 ${theme === 'orange' ? 'scale-125 ring-2 ring-[#FF8A08] ring-offset-2 ring-offset-black shadow-lg shadow-[#FF8A08]/40' : 'hover:scale-110'}`} title="Orange" />
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Sudut Kelengkungan (Border Radius)</span>
                  <div className="flex gap-1.5 bg-white/5 p-1 border border-white/15 rounded-xl">
                    {['4px', '12px', '16px', '24px'].map((rad) => (
                      <button
                        key={rad}
                        onClick={() => onChangeBorderRadius(rad)}
                        className={`flex-1 py-1 font-bold border rounded-lg text-[8px] cursor-pointer transition-all duration-200 ${
                          borderRadius === rad 
                            ? 'bg-white/20 border-white/30 text-white shadow-md' 
                            : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {rad}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Kedalaman Bayangan (Shadow Offset)</span>
                  <div className="flex gap-1.5 bg-white/5 p-1 border border-white/15 rounded-xl">
                    {['3px', '6px', '9px', '12px'].map((shd) => (
                      <button
                        key={shd}
                        onClick={() => onChangeShadowOffset(shd)}
                        className={`flex-1 py-1 font-bold border rounded-lg text-[8px] cursor-pointer transition-all duration-200 ${
                          shadowOffset === shd 
                            ? 'bg-white/20 border-white/30 text-white shadow-md' 
                            : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {shd}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Efek Layar Retro CRT</span>
                  <button
                    onClick={onToggleScanlines}
                    className={`w-full py-1.5 text-[8px] font-bold uppercase border rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                      isScanlineActive 
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-lg shadow-amber-400/5 font-bold' 
                        : 'bg-white/5 text-white/50 border-white/10'
                    }`}
                  >
                    <span>{isScanlineActive ? '● CRT SCANLINES [ ON ]' : '○ CRT SCANLINES [ OFF ]'}</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Mini Game Tap Liquid Glass */}
            <Card variant="white" thickness="border-2" shadowSize="sm" hasHoverEffect={false} className="p-3 text-center flex flex-col items-center">
              <h4 className="text-[10px] text-white font-bold uppercase mb-2 flex items-center gap-2 justify-center">
                <IconWrapper>
                  <Activity strokeWidth={2.5} className="w-4 h-4 text-white" />
                </IconWrapper>
                <span>Game Tap Liquid Glass</span>
              </h4>
              <div className="flex justify-between items-center w-full bg-white/5 p-1.5 border border-white/10 rounded-xl mb-2 text-[9px] gap-2">
                <span>Skor: <span className="font-bold text-emerald-300">{easterEggScore}</span></span>
                <span>High Score: <span className="text-pink-400 font-bold">{easterEggHigh}</span></span>
              </div>
              <Button
                variant="accent"
                size="sm"
                onClick={onEasterEggTap}
                className="w-full text-[9px] flex items-center justify-center gap-1.5"
              >
                <span>Tap Disini!</span>
                <Sparkles strokeWidth={2.5} className="w-3.5 h-3.5 text-white" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
