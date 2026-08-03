"use client";

import { Code2, Compass, Cpu, Flame, Layers, Sparkles, Terminal } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: Terminal,
      title: "Open Source DNA",
      description: "Everything we build is designed with open architecture, clear documentation, and public accessibility for developers world-wide.",
    },
    {
      icon: Flame,
      title: "Midnight Sprints",
      description: "We work on what excites us. Unconstrained by corporate roadmaps, we build high-impact tools during passionate sidequest hours.",
    },
    {
      icon: Cpu,
      title: "Cutting-Edge Tech",
      description: "From Rust CLI engines to WebGL visual sandboxes and local AI agent pipelines, we push browser and system capabilities.",
    },
    {
      icon: Sparkles,
      title: "Craft & Aesthetics",
      description: "Design is not an afterthought. We build sleek, glassmorphic interfaces with rich micro-interactions and visual feedback.",
    },
  ];

  return (
    <section id="about" className="py-20 relative z-10 border-t border-slate-800 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>STUDIO MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The SideQuest Philosophy
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            SideQuest Studio was created to solve a universal developer dilemma: standard jobs build business logic, but sidequests build the future.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-950/60 border border-slate-800 hover:border-slate-500 rounded-2xl p-6 transition-all duration-300 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/40"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-black border border-slate-700 p-3 text-white mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-white transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-slate-500 group-hover:text-slate-200 transition-colors">
                  <span>PILLAR 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
