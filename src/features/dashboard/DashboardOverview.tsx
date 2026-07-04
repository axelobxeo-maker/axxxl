import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Activity, ArrowRight, HelpCircle, ThumbsUp, Send, Trophy, Flame, Play, Volume2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ModItem, FAQItem, PollingTopic, RequestMod } from '../../types';
import ModCard from '../../components/ModCard';
import FAQPolling from '../../components/FAQPolling';

interface DashboardOverviewProps {
  webTitle: string;
  mods: ModItem[];
  faqs: FAQItem[];
  polling: PollingTopic;
  requests: RequestMod[];
  favorites: number[];
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  currentTab: 'home' | 'mods';
  setCurrentTab: (tab: 'home' | 'mods') => void;
  onLikeMod: (index: number) => void;
  onAddComment: (index: number, name: string, text: string) => void;
  onRateMod: (index: number, score: number) => void;
  onReportBroken: (index: number) => void;
  onToggleFavorite: (index: number) => void;
  onVotePolling: (optionId: string) => void;
  onRequestMod: (name: string, category: string) => void;
  onUpvoteRequest: (id: string) => void;
  triggerSafelink: (index: number, url: string, isDownload: boolean) => void;
  soundPlay: (type: 'click' | 'success' | 'delete') => void;
}

export default function DashboardOverview({
  webTitle,
  mods,
  faqs,
  polling,
  requests,
  favorites,
  activeCategoryFilter,
  setActiveCategoryFilter,
  currentTab,
  setCurrentTab,
  onLikeMod,
  onAddComment,
  onRateMod,
  onReportBroken,
  onToggleFavorite,
  onVotePolling,
  onRequestMod,
  onUpvoteRequest,
  triggerSafelink,
  soundPlay
}: DashboardOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle local searching
  const getFilteredMods = () => {
    let list = [...mods];
    if (activeCategoryFilter === 'BOOKMARKED') {
      list = list.filter((_, idx) => favorites.includes(idx));
    } else if (activeCategoryFilter) {
      list = list.filter(m => m.tag.toUpperCase().includes(activeCategoryFilter.toUpperCase()));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(term) || m.desc.toLowerCase().includes(term) || m.tag.toLowerCase().includes(term));
    }
    return list;
  };

  const filteredMods = getFilteredMods();
  const displayedMods = currentTab === 'home' ? filteredMods.slice(0, 3) : filteredMods;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Search Bar Block */}
      <Card variant="white" thickness="border-3" shadowSize="md" hasHoverEffect={false} className="p-4 bg-white">
        <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-500" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari modifikasi game favorit Anda di sini..."
              className="w-full pl-10 pr-4 py-2.5 font-sans font-bold border-2 border-black rounded-xl bg-zinc-50 focus:outline-none focus:bg-[#FFD100]/10 text-xs text-black"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={currentTab === 'home' ? 'accent' : 'white'}
              size="sm"
              onClick={() => {
                soundPlay('click');
                setCurrentTab('home');
              }}
            >
              Beranda
            </Button>
            <Button
              variant={currentTab === 'mods' ? 'accent' : 'white'}
              size="sm"
              onClick={() => {
                soundPlay('click');
                setCurrentTab('mods');
              }}
            >
              Semua Mod
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Bento Notification */}
          <Card variant="accent" thickness="border-3" shadowSize="sm" className="p-4 bg-[#4CCD99] text-black">
            <div className="flex gap-3 items-start">
              <Bell className="w-5 h-5 text-black shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="font-syne font-black text-xs uppercase mb-0.5">Informasi Penting</h4>
                <p className="text-[10px] sm:text-xs font-bold leading-normal text-black">
                  Gunakan tombol 'Lapor Mati' jika Anda mendeteksi link unduhan rusak atau file mod tidak dapat diinstal agar segera diperbaiki oleh tim AXELUF.
                </p>
              </div>
            </div>
          </Card>

          {/* Mod Items Grid */}
          <div className="space-y-6">
            {displayedMods.length === 0 ? (
              <Card variant="white" thickness="border-3" shadowSize="md" className="p-8 text-center flex flex-col items-center">
                <Activity className="w-12 h-12 text-gray-400 mb-2 animate-pulse" />
                <h4 className="font-syne font-extrabold text-sm uppercase">Modifikasi Tidak Ditemukan</h4>
                <p className="text-[10px] text-gray-400 font-normal mt-1 leading-normal max-w-sm">
                  Cobalah mengetikkan kata kunci lain, bersihkan filter pencarian, atau berikan usulan request mod di bagian bawah halaman.
                </p>
              </Card>
            ) : (
              displayedMods.map((item, idx) => {
                const globalIndex = mods.findIndex(m => m.id === item.id);
                const actualIndex = globalIndex !== -1 ? globalIndex : idx;
                return (
                  <motion.div
                    key={item.id || actualIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ModCard
                      mod={item}
                      cardIndex={actualIndex}
                      onLike={onLikeMod}
                      onAddComment={onAddComment}
                      onRate={onRateMod}
                      onReportBroken={onReportBroken}
                      onSelectCategory={(tag) => {
                        setActiveCategoryFilter(tag);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      isFavorited={favorites.includes(actualIndex)}
                      onToggleFavorite={onToggleFavorite}
                      triggerSafelink={triggerSafelink}
                      soundPlay={soundPlay}
                    />
                  </motion.div>
                );
              })
            )}

            {currentTab === 'home' && filteredMods.length > 3 && (
              <div className="text-center pt-2">
                <Button
                  variant="yellow"
                  size="md"
                  fullWidth
                  onClick={() => {
                    soundPlay('success');
                    setCurrentTab('mods');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Lihat {filteredMods.length - 3} Mod Lainnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Community FAQ & Polling */}
          {currentTab === 'home' && (
            <FAQPolling
              faqs={faqs}
              polling={polling}
              onVotePolling={onVotePolling}
              requests={requests}
              onRequestMod={onRequestMod}
              onUpvoteRequest={onUpvoteRequest}
            />
          )}
        </div>

        {/* Right Column (Sidebar Information) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Info Box */}
          <Card variant="white" thickness="border-3" shadowSize="md" className="p-4">
            <h3 className="font-syne font-black text-xs uppercase mb-3 text-black">Statistik Pengunjung</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-zinc-50 border-2 border-black p-2 rounded-xl">
                <div className="text-[9px] text-gray-500 uppercase font-bold">Total Unduhan</div>
                <div className="font-syne font-black text-lg mt-0.5">384,129</div>
              </div>
              <div className="bg-zinc-50 border-2 border-black p-2 rounded-xl">
                <div className="text-[9px] text-gray-500 uppercase font-bold">Member Aktif</div>
                <div className="font-syne font-black text-lg mt-0.5">14,920</div>
              </div>
            </div>
          </Card>

          {/* Quick Categories filter block */}
          <Card variant="white" thickness="border-3" shadowSize="md" className="p-4">
            <h3 className="font-syne font-black text-xs uppercase mb-3 text-black">Filter Kategori</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  soundPlay('click');
                  setActiveCategoryFilter('');
                }}
                className={`w-full text-left p-2.5 border-2 border-black rounded-lg transition-all flex items-center justify-between text-[10px] font-bold uppercase ${
                  !activeCategoryFilter ? 'bg-theme-accent text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-zinc-50 hover:bg-zinc-100 text-black'
                }`}
              >
                <span>Semua Kategori</span>
                <span className="bg-black text-white px-2 py-0.5 text-[8px] border border-black rounded">
                  {mods.length}
                </span>
              </button>

              {Array.from(new Set(mods.map(m => m.tag.split(',')).flat())).map((t, i) => {
                const clean = t.trim().toUpperCase();
                if (!clean) return null;
                const count = mods.filter(m => m.tag.toUpperCase().includes(clean)).length;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      soundPlay('click');
                      setActiveCategoryFilter(clean);
                    }}
                    className={`w-full text-left p-2.5 border-2 border-black rounded-lg transition-all flex items-center justify-between text-[10px] font-bold uppercase ${
                      activeCategoryFilter === clean ? 'bg-theme-accent text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-zinc-50 hover:bg-zinc-100 text-black'
                    }`}
                  >
                    <span>#{clean}</span>
                    <span className="bg-black text-white px-2 py-0.5 text-[8px] border border-black rounded">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
