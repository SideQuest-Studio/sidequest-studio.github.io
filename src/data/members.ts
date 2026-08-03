export interface Member {
  id: string;
  name: string;
  handle: string;
  role: string;
  classTitle: string;
  category: "Engineering" | "Design" | "Game Dev" | "AI & ML" | "Ops";
  bio: string;
  avatar: string;
  skills: string[];
  projects: string[];
  socials: {
    github?: string;
    twitter?: string;
    website?: string;
    linkedin?: string;
  };
  level: number;
  stats: {
    commits: number;
    questsCompleted: number;
    speciality: string;
  };
  isFoundingMember?: boolean;
}

export const INITIAL_MEMBERS: Member[] = [];
