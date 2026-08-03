export interface CommitRank {
  rank: string;
  badge: string;
  minCommits: number;
  maxCommits: number | null;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export const COMMIT_RANKS: CommitRank[] = [
  {
    rank: "Beginner",
    badge: "🌱",
    minCommits: 0,
    maxCommits: 200,
    description: "Starting the journey. Learning the ropes and making initial contributions.",
    colorClass: "text-slate-400",
    bgClass: "bg-slate-900/80",
    borderClass: "border-slate-700",
  },
  {
    rank: "Apprentice",
    badge: "🛠️",
    minCommits: 200,
    maxCommits: 500,
    description: "Building momentum. Regularly pushing code and contributing features.",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/40",
    borderClass: "border-blue-800/80",
  },
  {
    rank: "Developer",
    badge: "⚡",
    minCommits: 501,
    maxCommits: 1000,
    description: "Consistent builder. Writes clean code and delivers solid pull requests.",
    colorClass: "text-cyan-400",
    bgClass: "bg-cyan-950/40",
    borderClass: "border-cyan-800/80",
  },
  {
    rank: "Veteran",
    badge: "⚔️",
    minCommits: 1001,
    maxCommits: 2000,
    description: "Battle-tested contributor with extensive code contributions and reviews.",
    colorClass: "text-purple-400",
    bgClass: "bg-purple-950/40",
    borderClass: "border-purple-800/80",
  },
  {
    rank: "Pro",
    badge: "🏆",
    minCommits: 2001,
    maxCommits: 5000,
    description: "High-tier code wizard with thousands of commits under their belt.",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-950/40",
    borderClass: "border-amber-700/80",
  },
  {
    rank: "God",
    badge: "⚡",
    minCommits: 5001,
    maxCommits: 10000,
    description: "Legendary rank. Deploys whole ecosystems effortlessly.",
    colorClass: "text-rose-400",
    bgClass: "bg-rose-950/40",
    borderClass: "border-rose-700/80",
  },
  {
    rank: "Hackerman",
    badge: "🕶️",
    minCommits: 10001,
    maxCommits: null,
    description: "The ultimate coding deity. Transcends standard git limits.",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-950/40",
    borderClass: "border-emerald-600/80",
  },
];

/**
 * Get rank details based on commit count.
 */
export function getCommitRank(commits: number): CommitRank {
  const rank = COMMIT_RANKS.find((r) => {
    if (r.maxCommits === null) {
      return commits >= r.minCommits;
    }
    return commits >= r.minCommits && commits <= r.maxCommits;
  });

  return rank || COMMIT_RANKS[0];
}

/**
 * Assigns top 3 relative ranks (Hackerman #1, God #2, Pro #3) or falls back to threshold rank.
 */
export function getMemberCommitRank(commits: number): CommitRank {
  return getCommitRank(commits);
}
