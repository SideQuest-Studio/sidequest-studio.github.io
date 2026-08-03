"use client";

import { useState } from "react";
import { X, Sparkles, Check, Send, Code } from "lucide-react";
import { getStoredApplications, saveApplications, Application } from "../utils/storage";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleInterest: "Frontend / Full-Stack",
    questIdea: "",
    portfolioUrl: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApp: Application = {
      id: `app_${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      roleInterest: formData.roleInterest,
      questIdea: formData.questIdea.trim() || "Interested in joining SideQuest Studio.",
      portfolioUrl: formData.portfolioUrl.trim() || undefined,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "Pending",
    };

    const current = getStoredApplications();
    saveApplications([newApp, ...current]);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: "",
        email: "",
        roleInterest: "Frontend / Full-Stack",
        questIdea: "",
        portfolioUrl: "",
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slate Glow halo */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Join SideQuest Studio</h2>
            <p className="text-xs text-slate-400">
              Submit your profile or propose a new side quest project.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-400 flex items-center justify-center text-white animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Quest Proposal Received!</h3>
            <p className="text-sm text-slate-400">
              We will review your submission and ping you on GitHub/email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="jordan@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Primary Interest
                </label>
                <select
                  value={formData.roleInterest}
                  onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400"
                >
                  <option value="Frontend / Full-Stack">Frontend / Full-Stack</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Game Dev / WebGL">Game Dev / WebGL</option>
                  <option value="Rust / Systems">Rust / Systems</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  GitHub / Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Your Side Quest Proposal / Message
              </label>
              <textarea
                rows={3}
                placeholder="What project or tool do you want to collaborate on with SideQuest Studio?"
                value={formData.questIdea}
                onChange={(e) => setFormData({ ...formData, questIdea: e.target.value })}
                className="w-full px-3.5 py-2 bg-black border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-slate-400 placeholder-slate-500"
              />
            </div>

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
                className="px-6 py-2.5 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-xl font-bold flex items-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
