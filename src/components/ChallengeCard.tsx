import React from 'react';
import { motion } from 'motion/react';
import { Star, Users, CheckSquare, Clock, Edit2, Share2 } from 'lucide-react';

export interface ChallengeProps {
  challenge: {
    id?: string;
    user: {
      name: string;
      username: string;
      avatarUrl: string;
      bio: string;
    };
    title: string;
    difficulty: number; // 1 to 5 stars
    participants: number;
    submissions: number;
    statusText: string; // e.g. "Starts in 2 days"
  };
  onEdit?: () => void;
  onShare?: () => void;
}

export default function ChallengeCard({
  challenge,
  onEdit,
  onShare
}: ChallengeProps) {
  const { user, title, difficulty, participants, submissions, statusText } = challenge;

  // Render difficulty stars using Lucide Star icon with thick stroke
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          strokeWidth={2.5}
          className={`w-4 h-4 ${
            i <= rating
              ? 'text-[#FFDE03] fill-[#FFDE03] stroke-black'
              : 'text-zinc-200 stroke-zinc-400'
          }`}
        />
      );
    }
    return <div className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 rounded-lg">{stars}</div>;
  };

  return (
    <div className="relative w-full bg-[#FFFFFF] border-[3px] border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000000] transition-all flex flex-col justify-between gap-4">
      {/* Header element: user profile */}
      <div className="flex items-start gap-3.5 pb-4 border-b-2 border-dashed border-black/20">
        <img
          src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
          alt={user.name}
          className="w-12 h-12 rounded-full border-3 border-black bg-[#00E5FF] object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="font-syne font-black text-sm tracking-tight text-black truncate">
              {user.name}
            </h4>
            <span className="font-mono text-[10px] font-extrabold text-black bg-[#FFDE03] border-2 border-black px-1.5 py-0.5 rounded-md w-fit uppercase">
              @{user.username}
            </span>
          </div>
          <p className="text-[10px] font-bold text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {user.bio}
          </p>
        </div>
      </div>

      {/* Challenge Details */}
      <div className="space-y-3.5">
        <h3 className="font-syne font-black text-base sm:text-lg leading-snug text-black tracking-tight uppercase line-clamp-2">
          {title}
        </h3>

        {/* Rating and status tag */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-extrabold text-gray-500 uppercase">DIFFICULTY</span>
            {renderStars(difficulty)}
          </div>

          <div className="flex items-center gap-1.5 bg-[#FF5252] text-white border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_0px_#000000]">
            <Clock strokeWidth={2.5} className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="font-syne font-black text-[9px] uppercase tracking-wider">{statusText}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 bg-[#ECE6D5]/40 border-2 border-black p-3 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <Users strokeWidth={2.5} className="w-4 h-4 text-black" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8px] font-mono font-bold text-gray-500 uppercase leading-none">PARTICIPANTS</span>
              <span className="font-syne font-black text-xs text-black">{participants.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <CheckSquare strokeWidth={2.5} className="w-4 h-4 text-black" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8px] font-mono font-bold text-gray-500 uppercase leading-none">SUBMISSIONS</span>
              <span className="font-syne font-black text-xs text-black">{submissions.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: pressed effect shadow shift */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <motion.button
          whileHover={{ y: 2, x: 2 }}
          whileTap={{ y: 4, x: 4 }}
          onClick={onEdit}
          className="w-full bg-[#FFDE03] text-black font-syne font-black text-[10px] sm:text-xs uppercase py-2.5 px-3 border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-[0px_0px_0px_0px_#000000] cursor-pointer flex items-center justify-center gap-1.5 select-none transition-shadow duration-100"
        >
          <Edit2 strokeWidth={2.5} className="w-3.5 h-3.5" />
          <span>EDIT</span>
        </motion.button>

        <motion.button
          whileHover={{ y: 2, x: 2 }}
          whileTap={{ y: 4, x: 4 }}
          onClick={onShare}
          className="w-full bg-[#00E5FF] text-black font-syne font-black text-[10px] sm:text-xs uppercase py-2.5 px-3 border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-[0px_0px_0px_0px_#000000] cursor-pointer flex items-center justify-center gap-1.5 select-none transition-shadow duration-100"
        >
          <Share2 strokeWidth={2.5} className="w-3.5 h-3.5" />
          <span>SHARE</span>
        </motion.button>
      </div>
    </div>
  );
}
