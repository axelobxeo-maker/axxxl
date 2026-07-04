import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldAlert, Sparkles, Plus, Search, Filter } from 'lucide-react';
import ChallengeCard from '../../components/ChallengeCard';
import { DUMMY_CHALLENGES, ChallengeData } from '../challenges/constants';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface DashboardProps {
  onSoundPlay?: (type: 'click' | 'success' | 'delete') => void;
  onShowToast?: (message: string, type: 'success' | 'info' | 'error') => void;
}

export default function Dashboard({
  onSoundPlay = () => {},
  onShowToast = () => {}
}: DashboardProps) {
  const [challenges, setChallenges] = useState<ChallengeData[]>(DUMMY_CHALLENGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<number | 'all'>('all');
  
  // States for adding a new challenge
  const [isAddingChallenge, setIsAddingChallenge] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState(3);
  const [newStatusText, setNewStatusText] = useState('Starts in 3 days');

  const handleEdit = (id: string, title: string) => {
    onSoundPlay('click');
    onShowToast(`Editing Challenge: "${title}"`, 'info');
    
    // Simple prompt to edit title
    const updatedTitle = window.prompt("Edit judul tantangan:", title);
    if (updatedTitle !== null && updatedTitle.trim() !== "") {
      setChallenges(prev =>
        prev.map(c => c.id === id ? { ...c, title: updatedTitle.trim() } : c)
      );
      onSoundPlay('success');
      onShowToast("Tantangan berhasil diperbarui!", "success");
    }
  };

  const handleShare = (title: string) => {
    onSoundPlay('success');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Ayo ikuti tantangan Neo-Brutalist AXELUF: "${title}"!`);
      onShowToast("Link tantangan berhasil disalin ke clipboard!", "success");
    } else {
      onShowToast(`Membagikan tantangan: ${title}`, "info");
    }
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onSoundPlay('success');
    const newId = `challenge-${Date.now()}`;
    const newChallengeItem: ChallengeData = {
      id: newId,
      user: {
        name: "Developer Tamu",
        username: "devtamu",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        bio: "Seorang kontributor luar biasa yang menyukai tantangan coding Neo-Brutalist."
      },
      title: newTitle,
      difficulty: newDifficulty,
      participants: 0,
      submissions: 0,
      statusText: newStatusText
    };

    setChallenges(prev => [newChallengeItem, ...prev]);
    setIsAddingChallenge(false);
    setNewTitle('');
    setNewDifficulty(3);
    setNewStatusText('Starts in 3 days');
    onShowToast("Tantangan baru berhasil dibuat secara lokal!", "success");
  };

  // Filter challenges based on search query and difficulty
  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || c.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <Card variant="accent" thickness="border-3" shadowSize="md" className="p-6 bg-[#FFDE03] text-black">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy strokeWidth={2.5} className="w-6 h-6 text-black animate-bounce" />
              <span className="font-mono text-xs font-black bg-black text-[#FFDE03] px-2 py-0.5 rounded uppercase">
                COMMUNITY HUB
              </span>
            </div>
            <h1 className="font-syne font-black text-xl sm:text-3xl uppercase tracking-tight">
              Tantangan Neo-Brutalist
            </h1>
            <p className="text-xs sm:text-sm font-bold text-black/80 mt-1 max-w-2xl leading-relaxed">
              Uji kemampuan optimasi, pengembangan mod, dan keamanan Android Anda. Selesaikan tantangan untuk mendapatkan badge eksklusif di portal AXELUF.
            </p>
          </div>

          <Button
            variant="danger"
            size="md"
            onClick={() => {
              onSoundPlay('click');
              setIsAddingChallenge(!isAddingChallenge);
            }}
            className="shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>BUAT TANTANGAN</span>
          </Button>
        </div>
      </Card>

      {/* Interactive Form for Adding Challenge */}
      {isAddingChallenge && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <Card variant="white" thickness="border-3" shadowSize="md" className="p-5 bg-white">
            <h3 className="font-syne font-black text-sm uppercase mb-4 text-black border-b-2 border-black pb-2">
              Form Pembuatan Tantangan Baru (Lokal)
            </h3>
            <form onSubmit={handleCreateChallenge} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-black text-black uppercase mb-1">
                  Judul Tantangan
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Create custom Android overlay injector..."
                  className="w-full p-2.5 font-bold border-2 border-black rounded-lg bg-zinc-50 focus:outline-none focus:bg-[#FFDE03]/10 text-xs text-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-black text-black uppercase mb-1">
                    Tingkat Kesulitan (1 - 5 Bintang)
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(Number(e.target.value))}
                    className="w-full p-2.5 font-bold border-2 border-black rounded-lg bg-zinc-50 focus:outline-none text-xs text-black"
                  >
                    <option value={1}>1 Bintang (Sangat Mudah)</option>
                    <option value={2}>2 Bintang (Mudah)</option>
                    <option value={3}>3 Bintang (Menengah)</option>
                    <option value={4}>4 Bintang (Sulit)</option>
                    <option value={5}>5 Bintang (Sangat Sulit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-black text-black uppercase mb-1">
                    Status / Waktu Mulai
                  </label>
                  <input
                    type="text"
                    required
                    value={newStatusText}
                    onChange={(e) => setNewStatusText(e.target.value)}
                    placeholder="Contoh: Starts in 3 days atau Active Now"
                    className="w-full p-2.5 font-bold border-2 border-black rounded-lg bg-zinc-50 focus:outline-none text-xs text-black"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="white"
                  size="sm"
                  type="button"
                  onClick={() => {
                    onSoundPlay('click');
                    setIsAddingChallenge(false);
                  }}
                >
                  BATAL
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  type="submit"
                >
                  SIMPAN TANTANGAN
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Search & Filter Bar */}
      <Card variant="white" thickness="border-3" shadowSize="sm" className="p-4 bg-white">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-500" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tantangan berdasarkan judul atau kreator..."
              className="w-full pl-10 pr-4 py-2.5 font-sans font-bold border-2 border-black rounded-xl bg-zinc-50 focus:outline-none focus:bg-[#FFDE03]/10 text-xs text-black"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-black shrink-0 hidden sm:block" />
            <span className="text-[10px] font-mono font-black text-black uppercase shrink-0 hidden sm:block">DIFFICULTY:</span>
            
            <div className="flex gap-1">
              {['all', 1, 2, 3, 4, 5].map((level) => {
                const isSelected = difficultyFilter === level;
                return (
                  <button
                    key={level}
                    onClick={() => {
                      onSoundPlay('click');
                      setDifficultyFilter(level as any);
                    }}
                    className={`px-3 py-1.5 border-2 border-black rounded-lg font-syne font-black text-[10px] uppercase transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#00E5FF] text-black shadow-[2px_2px_0px_0px_#000000]' 
                        : 'bg-zinc-50 hover:bg-zinc-100 text-black'
                    }`}
                  >
                    {level === 'all' ? 'SEMUA' : `${level} ★`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Grid View */}
      {filteredChallenges.length === 0 ? (
        <Card variant="white" thickness="border-3" shadowSize="md" className="p-12 text-center flex flex-col items-center justify-center">
          <ShieldAlert strokeWidth={2.5} className="w-12 h-12 text-[#FF5252] mb-3 animate-pulse" />
          <h3 className="font-syne font-black text-sm uppercase text-black">Tantangan Tidak Ditemukan</h3>
          <p className="text-xs font-bold text-gray-500 mt-1 max-w-md">
            Gunakan kata kunci pencarian yang berbeda atau hapus filter difficulty untuk memunculkan kembali daftar tantangan.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChallengeCard
                challenge={challenge}
                onEdit={() => handleEdit(challenge.id, challenge.title)}
                onShare={() => handleShare(challenge.title)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
