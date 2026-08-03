export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Web & Apps" | "Dev Tools" | "AI & ML" | "Games & Interactive";
  status: "Featured Main Quest" | "Live" | "In Active Dev" | "Alpha Release";
  tags: string[];
  bannerUrl: string;
  stars: number;
  forks: number;
  githubUrl: string;
  liveUrl?: string;
  contributors: string[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "SideQuest Engine",
    tagline: "The high-performance open-source framework for developer portfolios & studio hubs.",
    description: "An end-to-end framework built for indie studios to showcase project timelines, developer guilds, live telemetry, and interactive web quests.",
    category: "Dev Tools",
    status: "Featured Main Quest",
    tags: ["Next.js", "TypeScript", "Tailwind v4", "Lucide", "Supabase"],
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    stars: 1420,
    forks: 185,
    githubUrl: "https://github.com/sidequest-studio/sidequest-engine",
    liveUrl: "https://sidequest-studio.github.io",
    contributors: ["gh_46703268"],
    highlights: [
      "Customizable RPG member progression matrix",
      "Built-in dynamic member onboarding flow",
      "Instant static export for GitHub Pages"
    ]
  },
  {
    id: "p2",
    title: "ChromaRealm 3D",
    tagline: "Interactive WebGL visual sandbox exploring generative shaders & spatial audio.",
    description: "A browser-based audio-reactive 3D universe that translates music frequencies into procedural landscapes and real-time lighting shaders.",
    category: "Games & Interactive",
    status: "Live",
    tags: ["Three.js", "WebGL", "WebAudio API", "GLSL", "React"],
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    stars: 840,
    forks: 92,
    githubUrl: "https://github.com/sidequest-studio/chromarealm-3d",
    liveUrl: "https://sidequest-studio.github.io/chromarealm",
    contributors: ["gh_46703268"],
    highlights: [
      "Real-time Audio FFT Spectrum Analyzer",
      "Custom Post-Processing Bloom & Vignette pipeline",
      "VR / WebXR Headset compatibility mode"
    ]
  },
  {
    id: "p3",
    title: "Nexus CLI",
    tagline: "Ultra-fast local dev workspace orchestrator written in Rust.",
    description: "One terminal command to clone, launch microservices, spin up dev databases, and manage environment variables across multi-repo projects.",
    category: "Dev Tools",
    status: "Live",
    tags: ["Rust", "CLI", "Docker API", "Tokio", "Terminal UI"],
    bannerUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    stars: 2150,
    forks: 310,
    githubUrl: "https://github.com/sidequest-studio/nexus-cli",
    liveUrl: "https://crates.io",
    contributors: ["gh_46703268"],
    highlights: [
      "Sub-millisecond startup times with zero dependencies",
      "Automated secret vault syncing across dev environments",
      "Interactive TUI dashboard with live log streaming"
    ]
  },
  {
    id: "p4",
    title: "Aegis Agent",
    tagline: "Autonomous security auditing & code synthesis agent powered by local LLMs.",
    description: "Scans pull requests for memory leaks, API secret leaks, and logic flaws before deploying to production.",
    category: "AI & ML",
    status: "In Active Dev",
    tags: ["Python", "PyTorch", "Ollama", "FastAPI", "VectorDB"],
    bannerUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    stars: 960,
    forks: 140,
    githubUrl: "https://github.com/sidequest-studio/aegis-agent",
    contributors: ["gh_46703268"],
    highlights: [
      "Zero-data leakage local LLM inference pipeline",
      "Automated pull request security patch generator",
      "Integrates directly into GitHub Actions & GitLab CI"
    ]
  },
  {
    id: "p5",
    title: "VaporPulse",
    tagline: "Retro-futuristic rhythm arcade game built for modern browsers.",
    description: "Dodge synthwave obstacles and sync your moves to procedural cyberpunk beats in a high-octane 60fps experience.",
    category: "Games & Interactive",
    status: "Alpha Release",
    tags: ["Canvas HTML5", "WebAssembly", "TypeScript", "Howler.js"],
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    stars: 430,
    forks: 48,
    githubUrl: "https://github.com/sidequest-studio/vaporpulse",
    liveUrl: "https://sidequest-studio.github.io/vaporpulse",
    contributors: ["gh_46703268"],
    highlights: [
      "Custom Wasm rhythm collision detector engine",
      "Global leaderboard powered by cryptographic hashes",
      "Full gamepad controller support"
    ]
  },
  {
    id: "p6",
    title: "OmniFlow Studio",
    tagline: "Visual node-based canvas for orchestrating AI workflows and API pipelines.",
    description: "Drag-and-drop nodes to connect REST APIs, LLMs, image generators, and database queries into automated serverless endpoints.",
    category: "Web & Apps",
    status: "In Active Dev",
    tags: ["Next.js", "React Flow", "Tailwind", "Zustand", "TRPC"],
    bannerUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    stars: 680,
    forks: 75,
    githubUrl: "https://github.com/sidequest-studio/omniflow",
    contributors: ["gh_46703268"],
    highlights: [
      "Interactive node graph canvas with custom sub-flows",
      "Instant API endpoint generator for saved graphs",
      "Collaborative multiplayer editing mode"
    ]
  }
];
