"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Member } from "../../data/members";
import { Project } from "../../data/projects";
import { Milestone } from "../../data/milestones";
import {
  getStoredMembers,
  saveMembers,
  getStoredProjects,
  saveProjects,
  getStoredMilestones,
  saveMilestones,
  getStoredApplications,
  saveApplications,
  Application,
} from "@/utils/storage";
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Key,
  Layers,
  Users,
  Flag,
  Inbox,
  CheckCircle2,
  XCircle,
  LogOut,
  ArrowLeft,
  Search,
  Sparkles,
  ExternalLink,
  Code2,
  Star,
  UserCheck,
} from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/SocialIcons";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");

  const [activeTab, setActiveTab] = useState<"members" | "projects" | "milestones" | "applications">("members");

  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Edit/Add Member Modal State
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Edit/Add Project Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Edit/Add Milestone Modal State
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("sidequest_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/members");
      if (res.ok) {
        const data = await res.json();
        if (data.members && Array.isArray(data.members) && data.members.length > 0) {
          const stored = getStoredMembers();
          const customLocalMembers = stored.filter((sm) => sm.id.startsWith("m_"));
          const merged = [
            ...customLocalMembers,
            ...data.members.filter((dm: Member) => !customLocalMembers.some((clm) => clm.id === dm.id)),
          ];
          setMembers(merged);
          setProjects(getStoredProjects());
          setMilestones(getStoredMilestones());
          setApplications(getStoredApplications());
          return;
        }
      }
    } catch (e) {
      console.error("Admin error fetching /api/members:", e);
    }
    setMembers(getStoredMembers());
    setProjects(getStoredProjects());
    setMilestones(getStoredMilestones());
    setApplications(getStoredApplications());
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin" || passcode === "sidequest" || passcode === "sidequest2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sidequest_admin_auth", "true");
      setPassError("");
      showToast("Access Granted: Welcome Studio Admin");
    } else {
      setPassError("Invalid passcode. Hint: Use 'sidequest' or click Demo Login.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("sidequest_admin_auth");
  };

  /* MEMBER CRUD */
  const handleSaveMember = (memberData: Partial<Member>) => {
    let updated: Member[];
    if (editingMember && editingMember.id) {
      updated = members.map((m) => (m.id === editingMember.id ? ({ ...m, ...memberData } as Member) : m));
      showToast(`Member '${memberData.name}' updated.`);
    } else {
      const newM: Member = {
        id: `m_${Date.now()}`,
        name: memberData.name || "New Member",
        handle: memberData.handle || "@newmember",
        role: memberData.role || "Developer",
        classTitle: memberData.classTitle || "Code Mage",
        category: memberData.category || "Engineering",
        bio: memberData.bio || "Studio member crafting side quests.",
        avatar: memberData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
        skills: memberData.skills || ["TypeScript"],
        projects: memberData.projects || [],
        socials: memberData.socials || {},
        level: memberData.level || 80,
        stats: memberData.stats || { commits: 150, questsCompleted: 5, speciality: "General" },
        isFoundingMember: memberData.isFoundingMember || false,
      };
      updated = [newM, ...members];
      showToast(`Member '${newM.name}' recruited into party.`);
    }
    setMembers(updated);
    saveMembers(updated);
    setIsMemberModalOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(`Remove member '${name}' from guild roster?`)) {
      const updated = members.filter((m) => m.id !== id);
      setMembers(updated);
      saveMembers(updated);
      showToast(`Member '${name}' removed.`, "error");
    }
  };

  /* PROJECT CRUD */
  const handleSaveProject = (projectData: Partial<Project>) => {
    let updated: Project[];
    if (editingProject && editingProject.id) {
      updated = projects.map((p) => (p.id === editingProject.id ? ({ ...p, ...projectData } as Project) : p));
      showToast(`Quest '${projectData.title}' updated.`);
    } else {
      const newP: Project = {
        id: `p_${Date.now()}`,
        title: projectData.title || "New Quest",
        tagline: projectData.tagline || "Awesome sidequest project.",
        description: projectData.description || "Detailed quest briefing.",
        category: projectData.category || "Dev Tools",
        status: projectData.status || "In Active Dev",
        tags: projectData.tags || ["TypeScript", "Next.js"],
        bannerUrl: projectData.bannerUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
        stars: projectData.stars || 10,
        forks: projectData.forks || 2,
        githubUrl: projectData.githubUrl || "https://github.com",
        liveUrl: projectData.liveUrl || undefined,
        contributors: projectData.contributors || [],
        highlights: projectData.highlights || ["Open source architecture"],
      };
      updated = [newP, ...projects];
      showToast(`New Quest '${newP.title}' added.`);
    }
    setProjects(updated);
    saveProjects(updated);
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Delete quest '${title}'?`)) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      showToast(`Quest '${title}' deleted.`, "error");
    }
  };

  /* MILESTONE CRUD */
  const handleSaveMilestone = (msData: Partial<Milestone>) => {
    let updated: Milestone[];
    if (editingMilestone && editingMilestone.id) {
      updated = milestones.map((m) => (m.id === editingMilestone.id ? ({ ...m, ...msData } as Milestone) : m));
      showToast(`Milestone '${msData.title}' updated.`);
    } else {
      const newMS: Milestone = {
        id: `ms_${Date.now()}`,
        quarter: msData.quarter || "Q1",
        year: msData.year || "2026",
        title: msData.title || "New Milestone",
        description: msData.description || "Achievement description.",
        badge: msData.badge || "Milestone",
      };
      updated = [...milestones, newMS];
      showToast(`Milestone '${newMS.title}' added.`);
    }
    setMilestones(updated);
    saveMilestones(updated);
    setIsMilestoneModalOpen(false);
    setEditingMilestone(null);
  };

  const handleDeleteMilestone = (id: string, title: string) => {
    if (confirm(`Delete milestone '${title}'?`)) {
      const updated = milestones.filter((m) => m.id !== id);
      setMilestones(updated);
      saveMilestones(updated);
      showToast(`Milestone '${title}' deleted.`, "error");
    }
  };

  /* APPLICATION STATUS */
  const handleApplicationStatus = (id: string, status: Application["status"]) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, status } : a));
    setApplications(updated);
    saveApplications(updated);
    showToast(`Application status set to ${status}`);
  };

  const handleApproveApplicationToMember = (app: Application) => {
    const newMember: Member = {
      id: `m_${Date.now()}`,
      name: app.name,
      handle: `@${app.name.toLowerCase().replace(/\s+/g, "")}`,
      role: app.roleInterest,
      classTitle: "Quest Recruit",
      category: "Engineering",
      bio: app.questIdea,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      skills: ["TypeScript", "Next.js"],
      projects: [],
      socials: { website: app.portfolioUrl },
      level: 70,
      stats: { commits: 50, questsCompleted: 1, speciality: app.roleInterest },
    };
    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);
    saveMembers(updatedMembers);

    handleApplicationStatus(app.id, "Approved");
    showToast(`Approved ${app.name} & added to Party Roster!`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow (monochrome white) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-slate-950 border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-black border border-white/30 p-3 flex items-center justify-center shadow-lg">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              <span>Studio Admin Portal</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authentication required to manage members, quests, and studio data.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {passError && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/30 text-white text-xs font-mono">
                {passError}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-black bg-white hover:bg-slate-200 rounded-xl transition-all shadow-lg"
            >
              Authenticate Admin Session
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setPasscode("sidequest");
                setIsAuthenticated(true);
                sessionStorage.setItem("sidequest_admin_auth", "true");
                showToast("Logged in as Studio Admin");
              }}
              className="text-xs font-mono text-slate-300 hover:text-white hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click for Quick Demo Access</span>
            </button>
          </div>

          <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white pt-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl text-xs font-mono flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-slate-900 border-white text-white"
              : "bg-slate-900 border-slate-500 text-slate-300"
          }`}
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10 backdrop-blur-xl py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-black border border-white/20 p-1 group-hover:border-white">
                <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <span className="font-bold text-sm text-white">
                SIDEQUEST <span className="text-slate-400 font-light">ADMIN</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-slate-300">
              Session Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white" />
              <span>View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/15 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Stats Bar (Monochrome) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-white/10 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-1 text-xs font-mono">
              <span>PARTY MEMBERS</span>
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{members.length}</div>
          </div>

          <div className="bg-slate-950 border border-white/10 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-1 text-xs font-mono">
              <span>ACTIVE QUESTS</span>
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{projects.length}</div>
          </div>

          <div className="bg-slate-950 border border-white/10 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-1 text-xs font-mono">
              <span>MILESTONES</span>
              <Flag className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{milestones.length}</div>
          </div>

          <div className="bg-slate-950 border border-white/10 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-1 text-xs font-mono">
              <span>APPLICATIONS</span>
              <Inbox className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{applications.length}</div>
          </div>
        </div>

        {/* Tab Selector & Controls (Monochrome) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 border border-white/10 p-3 rounded-2xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "members" ? "bg-white text-black font-bold shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Guild Party ({members.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "projects" ? "bg-white text-black font-bold shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Active Quests ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("milestones")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "milestones" ? "bg-white text-black font-bold shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Timeline ({milestones.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "applications" ? "bg-white text-black font-bold shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Applications ({applications.length})</span>
            </button>
          </div>

          {/* Action Trigger Buttons */}
          <div>
            {activeTab === "members" && (
              <button
                onClick={() => {
                  setEditingMember({} as Member);
                  setIsMemberModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-xl shadow-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Recruit Member</span>
              </button>
            )}

            {activeTab === "projects" && (
              <button
                onClick={() => {
                  setEditingProject({} as Project);
                  setIsProjectModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-xl shadow-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>New Quest</span>
              </button>
            )}

            {activeTab === "milestones" && (
              <button
                onClick={() => {
                  setEditingMilestone({} as Milestone);
                  setIsMilestoneModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-xl shadow-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>New Milestone</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: MEMBERS MANAGEMENT TABLE */}
        {activeTab === "members" && (
          <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.03] text-slate-400 uppercase border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Member</th>
                    <th className="py-3.5 px-4">RPG Class & Role</th>
                    <th className="py-3.5 px-4">Discipline</th>
                    <th className="py-3.5 px-4">Level</th>
                    <th className="py-3.5 px-4">Commits</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                          <div>
                            <span className="font-bold text-white block text-sm">{m.name}</span>
                            <span className="text-slate-400 text-[11px]">{m.handle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-white font-bold block">{m.classTitle}</span>
                        <span className="text-slate-400 text-[11px]">{m.role}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px]">
                          {m.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">LVL {m.level}</td>
                      <td className="py-3.5 px-4 text-slate-300">{m.stats?.commits || 0}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingMember(m);
                              setIsMemberModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.id, m.name)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT TABLE */}
        {activeTab === "projects" && (
          <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.03] text-slate-400 uppercase border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Quest Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Stars</th>
                    <th className="py-3.5 px-4">Contributors</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.bannerUrl} alt={p.title} className="w-12 h-8 rounded-lg object-cover border border-white/10 grayscale" />
                          <div>
                            <span className="font-bold text-white block text-sm">{p.title}</span>
                            <span className="text-slate-400 text-[11px] truncate max-w-xs block">{p.tagline}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-white text-[10px] uppercase">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-white font-bold">{p.stars} ★</td>
                      <td className="py-3.5 px-4">{p.contributors.length} members</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(p);
                              setIsProjectModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white"
                            title="Edit Quest"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id, p.title)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white"
                            title="Delete Quest"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MILESTONES MANAGEMENT TABLE */}
        {activeTab === "milestones" && (
          <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.03] text-slate-400 uppercase border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Quarter / Year</th>
                    <th className="py-3.5 px-4">Milestone Title</th>
                    <th className="py-3.5 px-4">Badge</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {milestones.map((ms) => (
                    <tr key={ms.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {ms.quarter} {ms.year}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{ms.title}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-white text-[10px]">
                          {ms.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 line-clamp-1 max-w-sm">{ms.description}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingMilestone(ms);
                              setIsMilestoneModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMilestone(ms.id, ms.title)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: APPLICATIONS INBOX */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-slate-950 border border-white/10 rounded-2xl">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No applications received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-slate-950 border border-white/10 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white">{app.name}</h4>
                        <span className="text-xs font-mono text-slate-300">{app.email}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                          app.status === "Approved"
                            ? "bg-white text-black font-bold border-white"
                            : app.status === "Pending"
                            ? "bg-white/10 text-white border-white/30"
                            : "bg-slate-900 text-slate-400 border-slate-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-light space-y-1">
                      <p><strong className="font-mono text-slate-400">Role Interest:</strong> {app.roleInterest}</p>
                      <p><strong className="font-mono text-slate-400">Quest Proposal:</strong> {app.questIdea}</p>
                      {app.portfolioUrl && (
                        <p>
                          <strong className="font-mono text-slate-400">Portfolio:</strong>{" "}
                          <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-white underline">
                            {app.portfolioUrl}
                          </a>
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">{app.submittedAt}</span>
                      <div className="flex items-center gap-2">
                        {app.status !== "Approved" && (
                          <button
                            onClick={() => handleApproveApplicationToMember(app)}
                            className="px-3 py-1 text-xs font-bold text-black bg-white hover:bg-slate-200 rounded-lg flex items-center gap-1"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-black" />
                            <span>Approve & Recruit</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleApplicationStatus(app.id, "Archived")}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* EDIT / CREATE MEMBER MODAL */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-white/20 rounded-3xl p-6 w-full max-w-xl shadow-2xl my-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingMember?.id ? "Edit Guild Member" : "Recruit New Member"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                handleSaveMember({
                  name: (form.elements.namedItem("name") as HTMLInputElement).value,
                  handle: (form.elements.namedItem("handle") as HTMLInputElement).value,
                  classTitle: (form.elements.namedItem("classTitle") as HTMLInputElement).value,
                  role: (form.elements.namedItem("role") as HTMLInputElement).value,
                  category: (form.elements.namedItem("category") as HTMLSelectElement).value as Member["category"],
                  level: Number((form.elements.namedItem("level") as HTMLInputElement).value),
                  bio: (form.elements.namedItem("bio") as HTMLTextAreaElement).value,
                  avatar: (form.elements.namedItem("avatar") as HTMLInputElement).value,
                  skills: (form.elements.namedItem("skills") as HTMLInputElement).value.split(",").map((s) => s.trim()),
                });
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Name</label>
                  <input name="name" defaultValue={editingMember?.name || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Handle</label>
                  <input name="handle" defaultValue={editingMember?.handle || "@"} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">RPG Class Title</label>
                  <input name="classTitle" defaultValue={editingMember?.classTitle || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Role</label>
                  <input name="role" defaultValue={editingMember?.role || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Discipline</label>
                  <select name="category" defaultValue={editingMember?.category || "Engineering"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white">
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Game Dev">Game Dev</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Ops">Ops</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Level</label>
                  <input name="level" type="number" defaultValue={editingMember?.level || 80} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Avatar Image URL</label>
                <input name="avatar" defaultValue={editingMember?.avatar || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Bio</label>
                <textarea name="bio" rows={2} defaultValue={editingMember?.bio || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Skills (comma separated)</label>
                <input name="skills" defaultValue={editingMember?.skills?.join(", ") || "TypeScript, Next.js"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsMemberModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-white text-black font-bold">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / CREATE PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-white/20 rounded-3xl p-6 w-full max-w-xl shadow-2xl my-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject?.id ? "Edit Quest / Project" : "Create New Quest"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                handleSaveProject({
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  tagline: (form.elements.namedItem("tagline") as HTMLInputElement).value,
                  category: (form.elements.namedItem("category") as HTMLSelectElement).value as Project["category"],
                  status: (form.elements.namedItem("status") as HTMLSelectElement).value as Project["status"],
                  stars: Number((form.elements.namedItem("stars") as HTMLInputElement).value),
                  githubUrl: (form.elements.namedItem("githubUrl") as HTMLInputElement).value,
                  liveUrl: (form.elements.namedItem("liveUrl") as HTMLInputElement).value || undefined,
                  bannerUrl: (form.elements.namedItem("bannerUrl") as HTMLInputElement).value,
                  description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                  tags: (form.elements.namedItem("tags") as HTMLInputElement).value.split(",").map((t) => t.trim()),
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-400 mb-1">Quest Title</label>
                <input name="title" defaultValue={editingProject?.title || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input name="tagline" defaultValue={editingProject?.tagline || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select name="category" defaultValue={editingProject?.category || "Dev Tools"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white">
                    <option value="Dev Tools">Dev Tools</option>
                    <option value="Games & Interactive">Games & Interactive</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Web & Apps">Web & Apps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingProject?.status || "Live"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white">
                    <option value="Featured Main Quest">Featured Main Quest</option>
                    <option value="Live">Live</option>
                    <option value="In Active Dev">In Active Dev</option>
                    <option value="Alpha Release">Alpha Release</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Stars</label>
                  <input name="stars" type="number" defaultValue={editingProject?.stars || 100} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Repo URL</label>
                  <input name="githubUrl" defaultValue={editingProject?.githubUrl || "https://github.com"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Live Quest URL (Optional)</label>
                <input name="liveUrl" defaultValue={editingProject?.liveUrl || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Banner Image URL</label>
                <input name="bannerUrl" defaultValue={editingProject?.bannerUrl || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea name="description" rows={2} defaultValue={editingProject?.description || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tech Stack Tags (comma separated)</label>
                <input name="tags" defaultValue={editingProject?.tags?.join(", ") || "Next.js, TypeScript"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-white text-black font-bold">Save Quest</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / CREATE MILESTONE MODAL */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-950 border border-white/20 rounded-3xl p-6 w-full max-w-lg shadow-2xl my-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingMilestone?.id ? "Edit Milestone" : "Add New Milestone"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                handleSaveMilestone({
                  quarter: (form.elements.namedItem("quarter") as HTMLInputElement).value,
                  year: (form.elements.namedItem("year") as HTMLInputElement).value,
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  badge: (form.elements.namedItem("badge") as HTMLInputElement).value,
                  description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                });
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Quarter (e.g. Q1)</label>
                  <input name="quarter" defaultValue={editingMilestone?.quarter || "Q1"} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Year (e.g. 2026)</label>
                  <input name="year" defaultValue={editingMilestone?.year || "2026"} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Title</label>
                <input name="title" defaultValue={editingMilestone?.title || ""} required className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Badge Label (e.g. Milestone, Award)</label>
                <input name="badge" defaultValue={editingMilestone?.badge || "Milestone"} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea name="description" rows={3} defaultValue={editingMilestone?.description || ""} className="w-full px-3 py-2 bg-black border border-white/15 rounded-xl text-white" />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsMilestoneModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-white text-black font-bold">Save Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
