"use client";

import { useState } from "react";
import { Project } from "../data/projects";
import { Member } from "../data/members";
import { Search, Layers, Star, GitFork, ExternalLink, Sparkles, Code2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectsSectionProps {
  projects: Project[];
  members: Member[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({
  projects,
  members,
  onSelectProject,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Dev Tools",
    "Games & Interactive",
    "AI & ML",
    "Web & Apps",
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const getContributors = (ids: string[]) => {
    return ids
      .map((id) =>
        members.find(
          (m) =>
            m.id === id ||
            m.handle.toLowerCase() === `@${id.toLowerCase()}` ||
            m.handle.toLowerCase().replace("@", "") === id.toLowerCase() ||
            m.name.toLowerCase() === id.toLowerCase()
        ) || members[0]
      )
      .filter(Boolean) as Member[];
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>ACTIVE QUESTS • PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Studio Projects & Quests
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-base font-light">
              Explore open-source developer tools, audio-reactive WebGL visualizers, local AI agent pipelines, and indie web applications built by SideQuest members.
            </p>
          </div>
        </div>

        {/* Filters Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-950/60 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quest or tech stack..."
              className="w-full pl-10 pr-4 py-1.5 bg-black border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const contributors = getContributors(project.contributors);

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-slate-950/80 border border-slate-800 hover:border-slate-500 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/50 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-black">
                    <img
                      src={project.bannerUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-70 group-hover:opacity-90 grayscale-100 group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Status Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-slate-600 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>

                    {/* Star Counters */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-slate-700 text-xs font-mono text-white">
                        <Star className="w-3.5 h-3.5 text-white fill-white" />
                        {project.stars}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-slate-200 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed font-light">
                      {project.tagline}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: Contributors & External Links */}
                <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                  {/* Contributor Avatars */}
                  <div className="flex items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase mr-2">
                      Party:
                    </span>
                    <div className="flex -space-x-2">
                      {contributors.map((contrib) => (
                        <img
                          key={contrib.id}
                          src={contrib.avatar}
                          alt={contrib.name}
                          title={`${contrib.name} (${contrib.classTitle})`}
                          className="w-7 h-7 rounded-full border-2 border-slate-950 object-cover"
                        />
                      ))}
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white transition-colors"
                        title="Live Quest Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
