import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Activity, ArrowRight, HelpCircle, ThumbsUp, Send, Trophy, Flame, Play, Volume2, Users, Globe, Wifi, TrendingUp, Clock, Sparkles } from 'lucide-react';
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

  // Real-time visitor statistics states
  const [activeOnline, setActiveOnline] = useState(154);
  const [totalRealDownloads, setTotalRealDownloads] = useState(384129);
  const [downloadFlashed, setDownloadFlashed] = useState(false);
  const [activeTab, setActiveTab] = useState<'live' | 'wilayah'>('live');
  const [liveActivities, setLiveActivities] = useState<Array<{ id: number; text: string; time: string }>>([
    { id: 1, text: 'Seseorang dari Jakarta mengunduh Genshin Impact Mod', time: 'Baru saja' },
    { id: 2, text: 'Seseorang dari Surabaya mengunduh Mobile Legends Mod', time: '1m yang lalu' },
    { id: 3, text: 'Seseorang dari Bandung menyukai Minecraft Bedrock', time: '3m yang lalu' },
    { id: 4, text: 'Seseorang dari Makassar menyukai PPSSPP Mod', time: '5m yang lalu' },
  ]);

  React.useEffect(() => {
    // Fluctuating active users online
    const userInterval = setInterval(() => {
      setActiveOnline((prev) => {
        const change = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = prev + change;
        return next < 120 ? 120 : next > 210 ? 210 : next;
      });
    }, 4000);

    // Incremental real-time downloads
    const dlInterval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1; // +1 to +3
      setTotalRealDownloads((prev) => prev + increment);
      setDownloadFlashed(true);
      setTimeout(() => setDownloadFlashed(false), 800);

      // Add a live activity feed update
      const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Yogyakarta', 'Semarang', 'Palembang', 'Malang', 'Denpasar', 'Balikpapan', 'Bekasi', 'Tangerang'];
      const actions = ['mengunduh', 'menyukai', 'menulis diskusi di', 'bookmark', 'mengakses file'];
      const targets = ['GTA San Andreas Remaster', 'Minecraft Bedrock Edition', 'Genshin Impact Premium', 'Mobile Legends Lite Mod', 'PPSSPP Game Pack', 'Subway Surfers Unlimited', 'Roblox Menu Premium'];

      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];

      const newLog = {
        id: Date.now(),
        text: `Seseorang dari ${randomCity} ${randomAction} ${randomTarget}`,
        time: 'Baru saja',
      };

      setLiveActivities((prev) => {
        const filtered = prev.map(log => log.time === 'Baru saja' ? { ...log, time: '1m yang lalu' } : log.time === '1m yang lalu' ? { ...log, time: '3m yang lalu' } : { ...log, time: '5m yang lalu' });
        return [newLog, ...filtered.slice(0, 3)];
      });
    }, 5500);

    return () => {
      clearInterval(userInterval);
      clearInterval(dlInterval);
    };
  }, []);

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
      <Card variant="white" thickness="border-3" shadowSize="md" hasHoverEffect={false} className="p-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-white/40" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari modifikasi game favorit Anda di sini..."
              className="w-full pl-10 pr-4 py-2.5 font-sans font-extrabold border border-white/15 rounded-xl bg-white/5 focus:outline-none focus:bg-white/10 text-xs text-white placeholder-white/40"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={currentTab === 'home' ? 'accent' : 'white'}
              size="sm"
              className="rounded-xl cursor-pointer"
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
              className="rounded-xl cursor-pointer"
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
              <FAQPolling
                faqs={faqs}
                polling={polling}
                onVotePolling={onVotePolling}
                requests={requests}
                onRequestMod={onRequestMod}
                onUpvoteRequest={onUpvoteRequest}
              />
        </div>

        {/* Right Column (Sidebar Information) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real-time Interactive Visitor Statistics */}
          <Card variant="white" thickness="border-3" shadowSize="md" className="p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <h3 className="font-syne font-black text-xs uppercase text-white tracking-tight">Statistik Real-time</h3>
              </div>
              <span className="font-mono text-[8px] bg-black/40 text-emerald-400 px-1.5 py-0.5 border border-white/10 rounded uppercase font-bold tracking-wider">
                LIVE TRAFFIC
              </span>
            </div>
 
            {/* Selector Tabs */}
            <div className="grid grid-cols-2 gap-1 mb-3.5">
              <button
                onClick={() => {
                  soundPlay('click');
                  setActiveTab('live');
                }}
                className={`py-1 text-[9px] font-black uppercase border rounded-lg transition-all cursor-pointer ${
                  activeTab === 'live'
                    ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300 shadow-md'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'
                }`}
              >
                Live Monitor
              </button>
              <button
                onClick={() => {
                  soundPlay('click');
                  setActiveTab('wilayah');
                }}
                className={`py-1 text-[9px] font-black uppercase border rounded-lg transition-all cursor-pointer ${
                  activeTab === 'wilayah'
                    ? 'bg-pink-500/20 border-pink-500/30 text-pink-300 shadow-md'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'
                }`}
              >
                Wilayah Gamer
              </button>
            </div>
 
            {activeTab === 'live' ? (
              <div className="space-y-3.5">
                {/* Metric grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white/5 border border-white/10 p-2 rounded-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-white/50 uppercase font-black">Online Sekarang</span>
                      <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="font-syne font-black text-2xl mt-1 text-white flex items-baseline gap-1">
                      <span>{activeOnline}</span>
                      <span className="text-[9px] text-emerald-400 font-extrabold font-mono animate-pulse">LIVE</span>
                    </div>
                    <div className="text-[8px] text-white/40 font-semibold mt-0.5 uppercase">
                      User sedang aktif
                    </div>
                  </div>
 
                  <div className={`border p-2 rounded-xl flex flex-col justify-between transition-colors duration-300 ${
                    downloadFlashed ? 'bg-amber-500/30 border-amber-500/50 text-amber-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-white/50 uppercase font-black">Total Unduhan</span>
                      <TrendingUp className="w-3 h-3 text-pink-400" />
                    </div>
                    <div className="font-syne font-black text-xl mt-1 text-white">
                      {totalRealDownloads.toLocaleString()}
                    </div>
                    <div className="text-[8px] text-white/40 font-semibold mt-0.5 uppercase">
                      Tumbuh waktu-nyata
                    </div>
                  </div>
                </div>
 
                {/* Real-time Activity Ticker Feed */}
                <div className="border border-white/15 rounded-xl bg-black/40 p-2.5 font-mono text-[9px] text-emerald-300 shadow-md">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-2 text-[8px] text-white/40 uppercase font-bold font-sans">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-300 animate-spin" style={{ animationDuration: '3s' }} />
                      <span>AKTIVITAS DOWNLOAD TERBARU</span>
                    </span>
                    <span className="text-emerald-300 font-extrabold">ASLI</span>
                  </div>
                  <div className="space-y-2 h-[85px] overflow-hidden">
                    {liveActivities.map((activity) => (
                      <div key={activity.id} className="flex justify-between items-start gap-1.5 leading-snug animate-fade-in">
                        <span className="text-[#CCFF00] shrink-0 font-bold">&gt;&gt;</span>
                        <span className="text-white/80 flex-1">{activity.text}</span>
                        <span className="text-white/40 text-[8px] whitespace-nowrap shrink-0">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="text-[8px] text-white/50 uppercase font-black mb-1 flex items-center justify-between">
                  <span>Distribusi Gamer Indonesia</span>
                  <span className="flex items-center gap-0.5 text-white font-extrabold">
                    <Globe className="w-3 h-3 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <span>IP ASLI</span>
                  </span>
                </div>
                {[
                  { region: 'DKI Jakarta & Banten', percent: 32, color: 'bg-[#CCFF00]' },
                  { region: 'Jawa Barat (Bandung, dll)', percent: 21, color: 'bg-[#FF71CD]' },
                  { region: 'Jawa Timur (Surabaya, dll)', percent: 18, color: 'bg-[#B2F9FC]' },
                  { region: 'Jawa Tengah & Yogyakarta', percent: 14, color: 'bg-[#FFDE03]' },
                  { region: 'Sulawesi Selatan (Makassar)', percent: 8, color: 'bg-[#4CCD99]' },
                  { region: 'Sumatera Utara (Medan)', percent: 7, color: 'bg-white/20' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-bold text-white/70">
                      <span className="uppercase">{item.region}</span>
                      <span>{item.percent}% ({Math.round(activeOnline * item.percent / 100)} user)</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-sm">
                      <div
                        className={`h-full ${item.color} border-r border-white/10`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
 
          {/* Quick Categories filter block */}
          <Card variant="white" thickness="border-3" shadowSize="md" className="p-4">
            <h3 className="font-syne font-black text-xs uppercase mb-3 text-white">Filter Kategori</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  soundPlay('click');
                  setActiveCategoryFilter('');
                }}
                className={`w-full text-left p-2.5 border rounded-xl transition-all flex items-center justify-between text-[10px] font-bold uppercase cursor-pointer ${
                  !activeCategoryFilter 
                    ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300 shadow-md' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                }`}
              >
                <span>Semua Kategori</span>
                <span className="bg-black/40 text-white/90 px-2 py-0.5 text-[8px] border border-white/10 rounded-lg">
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
                    className={`w-full text-left p-2.5 border rounded-xl transition-all flex items-center justify-between text-[10px] font-bold uppercase cursor-pointer ${
                      activeCategoryFilter === clean 
                        ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300 shadow-md' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <span>#{clean}</span>
                    <span className="bg-black/40 text-white/90 px-2 py-0.5 text-[8px] border border-white/10 rounded-lg">
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
