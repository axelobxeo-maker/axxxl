import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, Award, Wrench, Activity, Sparkles, Folder } from 'lucide-react';
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
        className="fixed inset-0 bg-black/60 z-[1000] transition-opacity"
      />
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white text-black z-[1001] border-r-4 border-black shadow-[6px_0_0_0_#000000] flex flex-col rounded-tr-2xl rounded-br-2xl overflow-hidden animate-fade-in">
        <div className="p-4 bg-[#A3FFD6] border-b-3 border-black flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-bold text-black text-sm">
            <Folder className="w-5 h-5 text-black" />
            <h2 className="font-syne font-extrabold text-base uppercase tracking-tight">Portal Menu</h2>
          </div>
          <Button
            variant="success"
            size="sm"
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-black p-0 min-w-0"
          >
            ✕
          </Button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 font-bold flex flex-col justify-between text-xs text-black">
          <div className="space-y-4">
            {/* Beranda Button */}
            <button
              onClick={() => {
                onSelectCategory('');
                onClose();
              }}
              className={`w-full text-left p-2.5 border-2 border-black rounded-lg transition-all flex items-center justify-between uppercase ${
                activeCategory === '' ? 'bg-[#FFD100] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-zinc-50 hover:bg-[#A3FFD6]/30'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Home className="w-4 h-4 text-black" />
                <span>Beranda / Semua Mod</span>
              </div>
              <span className="bg-black text-white px-2 py-0.5 text-[9px] border-2 border-black rounded">
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
                className={`w-full text-left p-2.5 border-2 border-black rounded-lg transition-all flex items-center justify-between uppercase ${
                  activeCategory === 'BOOKMARKED' ? 'bg-[#FFD100] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-yellow-50 hover:bg-yellow-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-yellow-600 animate-bounce" />
                  <span>Bookmark Anda</span>
                </div>
                <span className="bg-black text-white px-2 py-0.5 text-[9px] border-2 border-black rounded">
                  {favoritesCount}
                </span>
              </button>
            )}

            {/* Customizer Tema */}
            <Card variant="white" thickness="border-2" shadowSize="sm" hasHoverEffect={false} className="p-3 text-[10px]">
              <h4 className="uppercase font-extrabold mb-2 text-black flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Customizer Tema</span>
              </h4>
              <div className="space-y-2 text-[9px]">
                <div>
                  <span className="block font-bold text-gray-500 uppercase mb-1">Pilihan Warna Tema</span>
                  <div className="flex items-center gap-1.5 bg-white p-2 border border-black rounded-lg">
                    <button onClick={() => onChangeTheme('green')} className={`w-5 h-5 rounded-full bg-[#CCFF00] border-2 border-black cursor-pointer transition-transform ${theme === 'green' ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`} />
                    <button onClick={() => onChangeTheme('pink')} className={`w-5 h-5 rounded-full bg-[#FF71CD] border-2 border-black cursor-pointer transition-transform ${theme === 'pink' ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`} />
                    <button onClick={() => onChangeTheme('mint')} className={`w-5 h-5 rounded-full bg-[#B2F9FC] border-2 border-black cursor-pointer transition-transform ${theme === 'mint' ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`} />
                    <button onClick={() => onChangeTheme('dark')} className={`w-5 h-5 rounded-full bg-[#121214] border-2 border-black cursor-pointer transition-transform ${theme === 'dark' ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`} />
                    <button onClick={() => onChangeTheme('orange')} className={`w-5 h-5 rounded-full bg-[#FF8A08] border-2 border-black cursor-pointer transition-transform ${theme === 'orange' ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'}`} />
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-gray-500 uppercase mb-1">Sudut Kelengkungan (Border Radius)</span>
                  <div className="flex gap-1">
                    {['4px', '12px', '16px', '24px'].map((rad) => (
                      <button
                        key={rad}
                        onClick={() => onChangeBorderRadius(rad)}
                        className={`flex-1 py-1 font-bold border border-black rounded ${
                          borderRadius === rad ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                      >
                        {rad}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-gray-500 uppercase mb-1">Kedalaman Bayangan (Shadow Offset)</span>
                  <div className="flex gap-1">
                    {['3px', '6px', '9px', '12px'].map((shd) => (
                      <button
                        key={shd}
                        onClick={() => onChangeShadowOffset(shd)}
                        className={`flex-1 py-1 font-bold border border-black rounded ${
                          shadowOffset === shd ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                      >
                        {shd}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-gray-500 uppercase mb-1">Efek Layar Retro CRT</span>
                  <button
                    onClick={onToggleScanlines}
                    className={`w-full py-1.5 text-[8px] font-extrabold uppercase border border-black rounded-md cursor-pointer flex items-center justify-center gap-1 transition-colors ${
                      isScanlineActive ? 'bg-[#CCFF00] text-black border-2 border-black font-extrabold animate-pulse' : 'bg-white text-gray-400'
                    }`}
                  >
                    <span>{isScanlineActive ? '● CRT SCANLINES [ ON ]' : '○ CRT SCANLINES [ OFF ]'}</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Mini Game Tap Brutal */}
            <Card variant="white" thickness="border-2" shadowSize="sm" hasHoverEffect={false} className="p-3 text-center flex flex-col items-center">
              <h4 className="text-[10px] text-black font-extrabold uppercase mb-1 flex items-center gap-1.5 justify-center">
                <Activity className="w-3.5 h-3.5 text-black" />
                <span>Mini Game Tap Brutal</span>
              </h4>
              <div className="flex justify-between items-center w-full bg-zinc-50 p-1.5 border border-black rounded mb-2 text-[9px] gap-2">
                <span>Skor: <span className="font-extrabold text-[#2E8B6E]">{easterEggScore}</span></span>
                <span>High Score: <span className="text-pink-500">{easterEggHigh}</span></span>
              </div>
              <Button
                variant="yellow"
                size="sm"
                onClick={onEasterEggTap}
                className="w-full text-[9px]"
              >
                <span>Tap Disini!</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Button>
            </Card>
          </div>

          <div className="border-t-2 border-dashed border-black pt-3 mt-auto space-y-2">
            <Button
              variant={isAdminMode ? 'yellow' : 'white'}
              size="sm"
              fullWidth
              onClick={onToggleAdmin}
            >
              <span>{isAdminMode ? 'Kembali ke User Portal' : 'Masuk Admin Panel'}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
