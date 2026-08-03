"use client";

import { useState, useEffect } from "react";
import BackgroundCanvas from "../components/BackgroundCanvas";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import MembersSection from "../components/MembersSection";
import ProjectsSection from "../components/ProjectsSection";
import TechStack from "../components/TechStack";
import Milestones from "../components/Milestones";
import Footer from "../components/Footer";
import AddMemberModal from "../components/AddMemberModal";
import MemberDetailModal from "../components/MemberDetailModal";
import ProjectDetailModal from "../components/ProjectDetailModal";
import JoinModal from "../components/JoinModal";

import { Member, INITIAL_MEMBERS } from "../data/members";
import { PROJECTS, Project } from "../data/projects";
import { getStoredMembers, saveMembers, getStoredProjects, isMembersCacheFresh, updateMembersFetchTime } from "../utils/storage";

export default function Home() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Stream members chunk-by-chunk from /api/members?stream=true with 10-minute caching
  useEffect(() => {
    async function streamMembersList() {
      const stored = getStoredMembers();
      setMembers(stored);
      setProjects(getStoredProjects());

      // Skip background fetch if local cache is fresh (< 10 mins)
      if (isMembersCacheFresh() && stored.length > 0) {
        return;
      }

      try {
        const res = await fetch("/api/members?stream=true");
        if (res.ok && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim()) continue;
              try {
                const chunk: Member = JSON.parse(line);
                setMembers((prev) => {
                  const exists = prev.some((m) => m.id === chunk.id);
                  const updated = exists
                    ? prev.map((m) => (m.id === chunk.id ? chunk : m))
                    : [...prev, chunk];
                  saveMembers(updated);
                  return updated;
                });
              } catch (e) {
                console.error("Error parsing member chunk:", e);
              }
            }
          }

          if (buffer.trim()) {
            try {
              const chunk: Member = JSON.parse(buffer);
              setMembers((prev) => {
                const exists = prev.some((m) => m.id === chunk.id);
                const updated = exists
                  ? prev.map((m) => (m.id === chunk.id ? chunk : m))
                  : [...prev, chunk];
                saveMembers(updated);
                return updated;
              });
            } catch (e) {}
          }
          updateMembersFetchTime();
          return;
        }
      } catch (err) {
        console.error("Failed to stream /api/members:", err);
      }
    }

    streamMembersList();
  }, []);

  // Save members to localStorage when modified via recruit modal
  const handleAddMember = (newMember: Member) => {
    const updated = [newMember, ...members];
    setMembers(updated);
    saveMembers(updated);
  };

  const totalStars = projects.reduce((acc, p) => acc + p.stars, 0);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-slate-200 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      {/* Background Interactive Particle Canvas */}
      <BackgroundCanvas />

      {/* Navbar */}
      <Navbar
        onOpenRecruitModal={() => setIsRecruitModalOpen(true)}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        memberCount={members.length}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          memberCount={members.length}
          projectCount={projects.length}
          totalStars={totalStars}
          onOpenRecruitModal={() => setIsRecruitModalOpen(true)}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        {/* Studio Philosophy / Manifesto */}
        <About />

        {/* Guild Members Section */}
        <MembersSection
          members={members}
          onSelectMember={(m) => setSelectedMember(m)}
          onOpenRecruitModal={() => setIsRecruitModalOpen(true)}
        />

        {/* Active Quests / Projects Showcase */}
        <ProjectsSection
          projects={projects}
          members={members}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* Tech Stack & Arsenal */}
        <TechStack />

        {/* Milestones & Timeline */}
        <Milestones />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AddMemberModal
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        onAddMember={handleAddMember}
      />

      <MemberDetailModal
        member={selectedMember}
        allProjects={projects}
        onClose={() => setSelectedMember(null)}
      />

      <ProjectDetailModal
        project={selectedProject}
        members={members}
        onClose={() => setSelectedProject(null)}
        onSelectMember={(m) => setSelectedMember(m)}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
