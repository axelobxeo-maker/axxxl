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
  wallpaper: string;
  onChangeWallpaper: (url: string) => void;
}

const WALLPAPERS = [
  { id: 'aurora', name: 'Midnight Aurora', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop', color: '#10B981' },
  { id: 'silk', name: 'Rose Silk', url: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=1920&auto=format&fit=crop', color: '#EC4899' },
  { id: 'lavender', name: 'Cosmic Lavender', url: 'https://images.unsplash.com/photo-1618005154425-4fc14dae6df3?q=80&w=1920&auto=format&fit=crop', color: '#8B5CF6' },
  { id: 'space', name: 'Deep Space', url: 'https://images.unsplash.com/photo-1752440093057-1c188e7137e9?q=80&w=1920&auto=format&fit=crop', color: '#3B82F6' },
  { id: 'sunset', name: 'Warm Sunset', url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1920&auto=format&fit=crop', color: '#F97316' }
];

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
  wallpaper,
  onChangeWallpaper,
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
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Pilihan Tema</span>
                  <div className="flex gap-2 bg-white/5 p-1 border border-white/15 rounded-xl">
                    <button
                      onClick={() => onChangeTheme('putih')}
                      className={`flex-1 py-1.5 font-bold border rounded-lg text-[10px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1 ${
                        theme === 'putih'
                          ? 'bg-white text-black shadow-md border-white'
                          : 'bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>☀️ Putih</span>
                    </button>
                    <button
                      onClick={() => onChangeTheme('dark')}
                      className={`flex-1 py-1.5 font-bold border rounded-lg text-[10px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-1 ${
                        theme === 'dark'
                          ? 'bg-white/20 border-white/30 text-white shadow-md'
                          : 'bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>🌙 Dark</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-white/60 uppercase mb-1.5">Pilihan Wallpaper / Background</span>
                  <div className="flex items-center gap-2 bg-white/5 p-2 border border-white/15 rounded-xl justify-between">
                    {WALLPAPERS.map((wp) => (
                      <button
                        key={wp.id}
                        onClick={() => onChangeWallpaper(wp.url)}
                        style={{ backgroundColor: wp.color }}
                        className={`w-6 h-6 rounded-full border cursor-pointer transition-all duration-200 ${
                          wallpaper === wp.url 
                            ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black shadow-lg shadow-white/20' 
                            : 'border-white/30 hover:scale-115'
                        }`}
                        title={wp.name}
                      />
                    ))}
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
