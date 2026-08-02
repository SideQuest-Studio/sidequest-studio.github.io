"use client";

import { MILESTONES } from "../data/milestones";
import { Flag, Sparkles, Terminal, Trophy, Users, Rocket } from "lucide-react";

export default function Milestones() {
  return (
    <section id="milestones" className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-zinc-300 text-xs font-mono mb-3">
            <Flag className="w-3.5 h-3.5 text-white" />
            <span>QUEST LOG • MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Studio Achievements & History
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl text-base font-light">
            A chronological timeline of SideQuest Studio milestones, major open-source releases, and community hackathon victories.
          </p>
        </div>

        {/* Timeline (Monochrome) */}
        <div className="relative border-l-2 border-white/15 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-32">
          {MILESTONES.map((ms) => {
            return (
              <div key={ms.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-black border-2 border-white text-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                {/* Quarter / Year timestamp on left for larger screens */}
                <div className="sm:absolute sm:-left-32 sm:top-2 text-xs font-mono font-bold text-zinc-300 mb-1 sm:mb-0 sm:w-24 sm:text-right">
                  {ms.quarter} {ms.year}
                </div>

                {/* Card Container */}
                <div className="bg-white/[0.02] border border-white/10 group-hover:border-white/40 rounded-2xl p-6 transition-all duration-300 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {ms.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-zinc-300 uppercase">
                      {ms.badge}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {ms.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
