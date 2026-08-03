"use client";

import { Project } from "../data/projects";
import { Member } from "../data/members";
import { X, ExternalLink, Star, GitFork, CheckCircle2, Layers, Users } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectDetailModalProps {
  project: Project | null;
  members: Member[];
  onClose: () => void;
  onSelectMember: (member: Member) => void;
}

export default function ProjectDetailModal({
  project,
  members,
  onClose,
  onSelectMember,
}: ProjectDetailModalProps) {
  if (!project) return null;

  const contributors = project.contributors
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-slate-950 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Section */}
        <div className="relative h-60 w-full overflow-hidden bg-black">
          <img
            src={project.bannerUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-70 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-black/80 border border-slate-700 text-white hover:bg-black transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Status Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 rounded-xl bg-black/90 border border-slate-600 text-xs font-mono font-bold text-white uppercase backdrop-blur-md">
              {project.status}
            </span>
          </div>

          {/* Title & Tagline overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-extrabold text-white">{project.title}</h2>
            <p className="text-sm text-slate-300 font-mono mt-1">{project.tagline}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Stats & Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-6 font-mono text-sm">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Star className="w-4 h-4 text-white fill-white" />
                {project.stars} Stars
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <GitFork className="w-4 h-4 text-slate-400" />
                {project.forks} Forks
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white rounded-xl hover:bg-slate-200 shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Quest</span>
                </a>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Quest Briefing
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Key Features & Architectural Highlights
              </h3>
              <div className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 font-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contributing Party Members */}
          {contributors.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-white" />
                <span>Guild Members on this Quest</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contributors.map((contrib) => (
                  <div
                    key={contrib.id}
                    onClick={() => {
                      onClose();
                      onSelectMember(contrib);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 cursor-pointer transition-colors"
                  >
                    <img
                      src={contrib.avatar}
                      alt={contrib.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white hover:text-slate-200">
                        {contrib.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-400">
                        {contrib.classTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
