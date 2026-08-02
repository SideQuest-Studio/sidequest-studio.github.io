export interface Milestone {
  id: string;
  quarter: string;
  year: string;
  title: string;
  description: string;
  badge: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "ms1",
    quarter: "Q1",
    year: "2024",
    title: "Genesis of SideQuest Studio",
    description: "Founded by passionate developers seeking an environment to turn midnight projects into production-grade open source software.",
    badge: "Origin"
  },
  {
    id: "ms2",
    quarter: "Q2",
    year: "2024",
    title: "Nexus CLI Launch & 1k Stars",
    description: "Released Nexus CLI for local workspace orchestration, surpassing 1,000 GitHub stars within the first 3 weeks.",
    badge: "Milestone"
  },
  {
    id: "ms3",
    quarter: "Q4",
    year: "2024",
    title: "Global AI Hackathon Champions",
    description: "Won 1st place overall for Aegis Agent at the International AI Open Source Summit.",
    badge: "Award"
  },
  {
    id: "ms4",
    quarter: "Q2",
    year: "2025",
    title: "Guild Expansion",
    description: "Expanded core member party to 6 specialist engineers, designers, and game developers.",
    badge: "Growth"
  },
  {
    id: "ms5",
    quarter: "Q1",
    year: "2026",
    title: "SideQuest Engine v2.0",
    description: "Launched the complete portfolio & studio showcase platform for the global developer ecosystem.",
    badge: "Latest"
  }
];
