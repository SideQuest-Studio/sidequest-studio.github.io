"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPlus, Sparkles, Menu, X, Shield, Lock } from "lucide-react";

interface NavbarProps {
  onOpenRecruitModal: () => void;
  onOpenJoinModal: () => void;
  memberCount: number;
}

export default function Navbar({
  onOpenRecruitModal,
  onOpenJoinModal,
  memberCount,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Guild Members", href: "#members" },
    { name: "Tech Stack", href: "#stack" },
    { name: "Milestones", href: "#milestones" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Studio Branding */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-black border border-slate-700/60 p-1 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              <Image
                src="/logo.png"
                alt="SideQuest Studio Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-white flex items-center gap-2">
                SIDEQUEST <span className="text-slate-400 font-light">STUDIO</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest font-mono uppercase -mt-1">
                {memberCount} Active Members
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons (Monochrome & Slate Accent) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700 rounded-lg transition-all"
              title="Access Studio Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={onOpenRecruitModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900/80 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all shadow-sm"
              title="Add a new member to the studio party"
            >
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span>Recruit Member</span>
            </button>

            <button
              onClick={onOpenJoinModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white rounded-lg hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Join Studio</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-400 hover:text-white py-1 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-slate-300" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruitModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800"
            >
              <UserPlus className="w-4 h-4 text-white" />
              <span>Recruit Member</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-black bg-white rounded-lg hover:bg-slate-200"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Join Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
