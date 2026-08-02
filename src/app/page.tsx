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

import { INITIAL_MEMBERS, Member } from "../data/members";
import { PROJECTS, Project } from "../data/projects";
import { getStoredMembers, saveMembers, getStoredProjects } from "../utils/storage";

export default function Home() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Load persisted members & projects from storage
  useEffect(() => {
    setMembers(getStoredMembers());
    setProjects(getStoredProjects());
  }, []);

  // Save members to localStorage when modified via recruit modal
  const handleAddMember = (newMember: Member) => {
    const updated = [newMember, ...members];
    setMembers(updated);
    saveMembers(updated);
  };

  const totalStars = projects.reduce((acc, p) => acc + p.stars, 0);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black font-sans antialiased overflow-x-hidden">
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
