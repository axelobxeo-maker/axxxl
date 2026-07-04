export interface ChallengeData {
  id: string;
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
}

export const DUMMY_CHALLENGES: ChallengeData[] = [
  {
    id: "challenge-1",
    user: {
      name: "Rian Axel",
      username: "rianaxel",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      bio: "Lead Game Optimizer & Developer of AXELUF. Passionate about retro designs."
    },
    title: "Optimize MLBB Speedup Engine",
    difficulty: 4,
    participants: 1240,
    submissions: 342,
    statusText: "Starts in 2 days"
  },
  {
    id: "challenge-2",
    user: {
      name: "Siska Dev",
      username: "siskadevs",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      bio: "Android Security Specialist. Enjoys debugging and auditing malware."
    },
    title: "Secure Custom Anti-Cheat Hackathon",
    difficulty: 5,
    participants: 850,
    submissions: 198,
    statusText: "Starts in 5 days"
  },
  {
    id: "challenge-3",
    user: {
      name: "Tomy Retro",
      username: "tomyretro",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      bio: "Full-Stack Engineer & Neo-Brutalist design enthusiast. Making ugly code beautiful."
    },
    title: "Neo-Brutalist UI Redesign Sprint",
    difficulty: 3,
    participants: 2150,
    submissions: 920,
    statusText: "Active Now"
  }
];
