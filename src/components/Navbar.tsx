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
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/80"
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
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-black border border-white/20 p-1 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
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
                SIDEQUEST <span className="text-zinc-400 font-light">STUDIO</span>
              </span>
              <span className="text-[10px] text-zinc-400 tracking-widest font-mono uppercase -mt-1">
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
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons (Monochrome) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all"
              title="Access Studio Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-zinc-300" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={onOpenRecruitModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 hover:border-white/40 hover:text-white transition-all shadow-sm"
              title="Add a new member to the studio party"
            >
              <UserPlus className="w-3.5 h-3.5 text-white" />
              <span>Recruit Member</span>
            </button>

            <button
              onClick={onOpenJoinModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white rounded-lg hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Join Studio</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
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
        <div className="md:hidden bg-zinc-950/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-400 hover:text-white py-1 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-zinc-300" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruitModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10"
            >
              <UserPlus className="w-4 h-4 text-white" />
              <span>Recruit Member</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-black bg-white rounded-lg hover:bg-zinc-200"
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
