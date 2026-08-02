"use client";

import Image from "next/image";
import { ArrowRight, Code, Sparkles, UserPlus, Shield, Terminal, Star, Layers, Activity } from "lucide-react";

interface HeroProps {
  memberCount: number;
  projectCount: number;
  totalStars: number;
  onOpenRecruitModal: () => void;
  onOpenJoinModal: () => void;
}

export default function Hero({
  memberCount,
  projectCount,
  totalStars,
  onOpenRecruitModal,
  onOpenJoinModal,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Pure White Glow Ambient Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Logo Badge Header */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/20 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.08)] group hover:border-white transition-all">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
              SideQuest Studio • Autonomous Developer Collective
            </span>
          </div>

          {/* Central Logo Display with Glowing Halo */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/30 via-zinc-400/30 to-white/30 rounded-3xl opacity-30 blur-2xl group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-black border border-white/30 p-5 flex items-center justify-center shadow-2xl backdrop-blur-3xl group-hover:scale-105 group-hover:border-white transition-transform duration-500">
              <Image
                src="/logo.png"
                alt="SideQuest Studio Logo"
                width={120}
                height={120}
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                priority
              />
            </div>
          </div>

          {/* Main Title (Monochrome Gradient) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
            Where Passion{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 underline decoration-white/30 underline-offset-8">
              Side Quests
            </span>{" "}
            Become Main Quests
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
            We are an independent guild of engineers, game creators, AI researchers, and designers crafting open-source developer tools, interactive visual environments, and next-generation web apps.
          </p>

          {/* CTA Button Row (Monochrome) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3.5 text-sm font-bold text-black bg-white rounded-xl hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Explore Active Quests</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#members"
              className="px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 hover:border-white/40 hover:text-white transition-all flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-white" />
              <span>Meet the Party</span>
            </a>

            <button
              onClick={onOpenRecruitModal}
              className="px-6 py-3.5 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-white/20 rounded-xl hover:bg-zinc-800 hover:text-white hover:border-white/40 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-white" />
              <span>Recruit Member</span>
            </button>
          </div>

          {/* Live Stats Cards Grid (Monochrome) */}
          <div className="mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/40 transition-all group">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider">Guild Party</span>
                <Shield className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{memberCount}</div>
              <p className="text-xs text-zinc-500 mt-1">Active Studio Members</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/40 transition-all group">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider">Side Quests</span>
                <Layers className="w-4 h-4 text-zinc-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{projectCount}+</div>
              <p className="text-xs text-zinc-500 mt-1">Shipped & Active Projects</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/40 transition-all group">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider">GitHub Stars</span>
                <Star className="w-4 h-4 text-zinc-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{(totalStars / 1000).toFixed(1)}k+</div>
              <p className="text-xs text-zinc-500 mt-1">Community Stars</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-white/40 transition-all group">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs uppercase font-mono tracking-wider">Uptime / Build</span>
                <Activity className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">99.9%</div>
              <p className="text-xs text-zinc-500 mt-1">Operational Health</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
