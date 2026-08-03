"use client";

import { useState } from "react";
import { Member } from "../data/members";
import { X, UserPlus, Sparkles, Check, Image as ImageIcon, Shield, Code } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (newMember: Member) => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onAddMember,
}: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    role: "",
    classTitle: "",
    category: "Engineering" as Member["category"],
    bio: "",
    avatar: "",
    skillsInput: "",
    github: "",
    twitter: "",
    website: "",
    speciality: "",
    level: 75,
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.classTitle.trim()) {
      setError("Please fill out Name, RPG Class Title, and Role.");
      return;
    }

    const defaultAvatar =
      formData.avatar.trim() ||
      `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80`;

    const parsedSkills = formData.skillsInput
      ? formData.skillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Next.js", "TypeScript", "UI/UX"];

    const newMember: Member = {
      id: `m_${Date.now()}`,
      name: formData.name.trim(),
      handle: formData.handle.startsWith("@") ? formData.handle.trim() : `@${formData.handle.trim() || formData.name.toLowerCase().replace(/\s+/g, "")}`,
      role: formData.role.trim(),
      classTitle: formData.classTitle.trim(),
      category: formData.category,
      bio: formData.bio.trim() || "Passionate builder creating new side quests and exploring next-gen tech.",
      avatar: defaultAvatar,
      skills: parsedSkills,
      projects: [],
      socials: {
        github: formData.github.trim() || undefined,
        twitter: formData.twitter.trim() || undefined,
        website: formData.website.trim() || undefined,
      },
      level: Number(formData.level) || 80,
      stats: {
        commits: Math.floor(Math.random() * 400) + 100,
        questsCompleted: Math.floor(Math.random() * 10) + 3,
        speciality: formData.speciality.trim() || "Full-Stack Development",
      },
    };

    onAddMember(newMember);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
      setFormData({
        name: "",
        handle: "",
        role: "",
        classTitle: "",
        category: "Engineering",
        bio: "",
        avatar: "",
        skillsInput: "",
        github: "",
        twitter: "",
        website: "",
        speciality: "",
        level: 75,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow halo (slate ambient) */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Recruit Guild Member
            </h2>
            <p className="text-xs text-slate-400">
              Add a new member to the SideQuest Studio party.
            </p>
          </div>
        </div>

        {successMsg ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-400 flex items-center justify-center text-white animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Guild Member Added!</h3>
            <p className="text-sm text-slate-400">
              {formData.name || "Member"} is now officially in the studio party.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono">
                {error}
              </div>
            )}

            {/* Grid row 1: Name & Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Handle / Username
                </label>
                <input
                  type="text"
                  placeholder="@mayacodes"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Grid row 2: RPG Class & Official Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  RPG Class Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shader Specialist, Code Alchemist"
                  value={formData.classTitle}
                  onChange={(e) => setFormData({ ...formData, classTitle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Studio Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Graphics Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Category & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Guild Discipline
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Member["category"],
                    })
                  }
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Game Dev">Game Dev</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Ops">Ops</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Level ({formData.level})
                </label>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                  className="w-full accent-white mt-2"
                />
              </div>
            </div>

            {/* Avatar URL & Bio */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Avatar Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Member Bio
              </label>
              <textarea
                rows={2}
                placeholder="Brief description of skills, passions, and background..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
              />
            </div>

            {/* Skills & Speciality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Rust, React, Three.js, Docker"
                  value={formData.skillsInput}
                  onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Speciality
                </label>
                <input
                  type="text"
                  placeholder="e.g. Low-level Shaders"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Socials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <input
                type="url"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="px-3 py-1.5 bg-black border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500"
              />
              <input
                type="url"
                placeholder="Twitter URL"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="px-3 py-1.5 bg-black border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500"
              />
              <input
                type="url"
                placeholder="Website URL"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="px-3 py-1.5 bg-black border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500"
              />
            </div>

            {/* Form Action */}
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 rounded-xl hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-xl shadow-lg"
              >
                Add Member to Party
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
