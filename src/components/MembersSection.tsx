"use client";

import { useState } from "react";
import Image from "next/image";
import { Member } from "../data/members";
import { Search, Shield, UserPlus, Globe, Sparkles, ExternalLink, Code2, Award } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./SocialIcons";

interface MembersSectionProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  onOpenRecruitModal: () => void;
}

export default function MembersSection({
  members,
  onSelectMember,
  onOpenRecruitModal,
}: MembersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Engineering",
    "Design",
    "Game Dev",
    "AI & ML",
    "Ops",
  ];

  const filteredMembers = members.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.handle.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.classTitle.toLowerCase().includes(q) ||
      m.skills.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="members" className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-zinc-300 text-xs font-mono mb-3">
              <Shield className="w-3.5 h-3.5 text-white" />
              <span>THE PARTY • GUILD ROSTER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Studio Members & Guild
            </h2>
            <p className="mt-3 text-zinc-400 max-w-xl text-base font-light">
              Meet the creators, engineers, and visionaries driving SideQuest projects. Filter by class specialization or recruit new members.
            </p>
          </div>

          {/* Action Button to Recruit (Monochrome) */}
          <button
            onClick={onOpenRecruitModal}
            className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-black bg-white rounded-xl hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all shadow-lg active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-black" />
            <span>Recruit New Member</span>
          </button>
        </div>

        {/* Filters Bar & Search (Monochrome) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/[0.02] border border-white/10 p-3 rounded-2xl backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member, skill, role..."
              className="w-full pl-10 pr-4 py-1.5 bg-black border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Member Cards Grid (Monochrome) */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.01] border border-white/5 rounded-2xl">
            <Shield className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No members found</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Try refining your search or add a new guild member.
            </p>
            <button
              onClick={onOpenRecruitModal}
              className="mt-4 px-4 py-2 text-xs font-bold text-black bg-white rounded-lg hover:bg-zinc-200"
            >
              Recruit Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member)}
                className="group relative bg-zinc-950/80 border border-white/10 hover:border-white/40 rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/5 cursor-pointer flex flex-col justify-between"
              >
                {/* Founder Badge */}
                {member.isFoundingMember && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/30 text-white text-[10px] font-mono">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>FOUNDER</span>
                  </div>
                )}

                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-center gap-4 mb-5">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 group-hover:border-white transition-colors shadow-lg">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-md bg-black border border-white/40 text-[9px] font-mono font-bold text-white shadow">
                        LVL {member.level}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 font-medium">
                        {member.classTitle}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-light mb-4">
                    {member.bio}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
                        +{member.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Stats & Social Links */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1 text-white">
                      <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                      {member.stats.commits} commits
                    </span>
                  </div>

                  {/* Social Icons */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                        title="Twitter / X"
                      >
                        <TwitterIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.website && (
                      <a
                        href={member.socials.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                        title="Personal Portfolio"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
