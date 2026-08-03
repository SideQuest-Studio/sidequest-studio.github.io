"use client";

import { Member } from "../data/members";
import { Project } from "../data/projects";
import { X, Shield, Code2, Award, ExternalLink, Globe, Sparkles, Layers } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./SocialIcons";

interface MemberDetailModalProps {
  member: Member | null;
  allProjects: Project[];
  onClose: () => void;
}

export default function MemberDetailModal({
  member,
  allProjects,
  onClose,
}: MemberDetailModalProps) {
  if (!member) return null;

  const memberProjects = allProjects.filter(
    (p) => p.contributors.includes(member.id) || member.projects.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Slate Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-black border border-slate-600 font-mono text-xs font-bold text-white shadow">
              LVL {member.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              {member.isFoundingMember && (
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-600 text-white text-[10px] font-mono">
                  FOUNDER
                </span>
              )}
            </div>
            <p className="text-sm font-mono text-slate-300 font-medium mt-0.5">
              {member.classTitle} • {member.handle}
            </p>
            <p className="text-xs text-slate-400 mt-1">{member.role}</p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-3">
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {member.socials.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Guild Bio
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {member.bio}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">
              Total Commits
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {member.stats.commits}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">
              Quests Done
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {member.stats.questsCompleted}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">
              Discipline
            </span>
            <span className="text-xs font-bold font-mono text-slate-200 truncate block mt-1">
              {member.category}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Primary Skills & Arsenal
          </h3>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Contributed */}
        {memberProjects.length > 0 && (
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>Contributed Quests</span>
            </h3>
            <div className="space-y-2">
              {memberProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-400">{proj.tagline}</p>
                  </div>
                  <span className="text-xs font-mono text-white bg-black px-2.5 py-0.5 rounded-md border border-slate-700">
                    {proj.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
