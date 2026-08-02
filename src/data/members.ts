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

export const INITIAL_MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Alex Vance",
    handle: "@vance_coder",
    role: "Lead Architect & Founder",
    classTitle: "System Sorcerer",
    category: "Engineering",
    bio: "Obsessed with high-throughput backend systems, low-latency microservices, and crafting pixel-perfect web apps during midnight sprints.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    skills: ["Next.js", "TypeScript", "Rust", "Distributed Systems", "GraphQL"],
    projects: ["p1", "p3"],
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      website: "https://alexvance.dev"
    },
    level: 99,
    stats: {
      commits: 1420,
      questsCompleted: 24,
      speciality: "Distributed Architecture"
    },
    isFoundingMember: true
  },
  {
    id: "m2",
    name: "Elena Rostova",
    handle: "@elena_design",
    role: "Head of Product & Design",
    classTitle: "Pixel Paladin",
    category: "Design",
    bio: "Turning complex developer concepts into breathtaking visual experiences, sleek design systems, and fluid micro-animations.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    skills: ["Figma", "UI/UX", "Tailwind CSS", "3D Motion", "Design Systems"],
    projects: ["p1", "p2", "p5"],
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
    level: 88,
    stats: {
      commits: 890,
      questsCompleted: 19,
      speciality: "Micro-Interactions"
    },
    isFoundingMember: true
  },
  {
    id: "m3",
    name: "Marcus Chen",
    handle: "@marcus_ai",
    role: "AI / ML Researcher",
    classTitle: "Neural Alchemist",
    category: "AI & ML",
    bio: "Building local LLM pipelines, autonomous multi-agent loops, and multimodal generative tools that turn prompt ideas into reality.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    skills: ["PyTorch", "Python", "LangChain", "Transformers", "CUDA"],
    projects: ["p4", "p6"],
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com"
    },
    level: 94,
    stats: {
      commits: 1105,
      questsCompleted: 16,
      speciality: "Agentic Workflows"
    },
    isFoundingMember: true
  },
  {
    id: "m4",
    name: "Sophia Martinez",
    handle: "@sophia_games",
    role: "Creative Game Dev",
    classTitle: "Dimension Sculptor",
    category: "Game Dev",
    bio: "Crafting immersive WebGL visualizers, indie game mechanics, and Three.js 3D web environments that push browser limits.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    skills: ["Three.js", "WebGL", "Unity", "Shader Code", "Blender"],
    projects: ["p2", "p5"],
    socials: {
      github: "https://github.com",
      website: "https://sophiam.io"
    },
    level: 82,
    stats: {
      commits: 740,
      questsCompleted: 12,
      speciality: "GLSL Shaders"
    }
  },
  {
    id: "m5",
    name: "Devon Reed",
    handle: "@devon_ops",
    role: "DevOps & Infrastructure Lead",
    classTitle: "Cloud Warden",
    category: "Ops",
    bio: "Guaranteeing 99.99% uptime for SideQuest projects with automated CI/CD pipelines, Kubernetes clusters, and edge caching.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    skills: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Cloudflare"],
    projects: ["p1", "p3", "p4"],
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com"
    },
    level: 91,
    stats: {
      commits: 1280,
      questsCompleted: 21,
      speciality: "Zero-Downtime Deploy"
    }
  },
  {
    id: "m6",
    name: "Kai Takahashi",
    handle: "@kai_frontend",
    role: "Frontend Engineer",
    classTitle: "DOM Wizard",
    category: "Engineering",
    bio: "Specializing in fast client-side state engines, dynamic UI components, and rich interactive web tools.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    skills: ["React", "TypeScript", "Zustand", "Tailwind", "Vite"],
    projects: ["p3", "p6"],
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com"
    },
    level: 76,
    stats: {
      commits: 620,
      questsCompleted: 9,
      speciality: "State Management"
    }
  }
];
