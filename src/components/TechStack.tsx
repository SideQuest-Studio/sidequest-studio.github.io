"use client";

import { Cpu, Code, Layers, Terminal, Sparkles, Database, Boxes } from "lucide-react";

export default function TechStack() {
  const stackCategories = [
    {
      name: "Core Web & Frontend",
      icon: Code,
      items: [
        { name: "Next.js 16", desc: "App Router & SSR" },
        { name: "React 19", desc: "Server Components & Hooks" },
        { name: "TypeScript", desc: "Strict type safety" },
        { name: "Tailwind CSS v4", desc: "Utility-first design" },
        { name: "Zustand", desc: "Lightweight state" },
      ],
    },
    {
      name: "Systems & Infrastructure",
      icon: Terminal,
      items: [
        { name: "Rust", desc: "High performance CLI tools" },
        { name: "Docker", desc: "Containerized environments" },
        { name: "Supabase", desc: "PostgreSQL & Auth" },
        { name: "Kubernetes", desc: "Orchestration & Uptime" },
        { name: "Cloudflare Workers", desc: "Edge functions" },
      ],
    },
    {
      name: "AI & Neural Pipelines",
      icon: Cpu,
      items: [
        { name: "PyTorch", desc: "Neural network training" },
        { name: "Python", desc: "Data & Agent scripting" },
        { name: "Local LLMs", desc: "Ollama & Llama 3" },
        { name: "Vector Databases", desc: "RAG & Semantic Search" },
        { name: "LangChain", desc: "Agentic tool calling" },
      ],
    },
    {
      name: "3D & Creative Media",
      icon: Boxes,
      items: [
        { name: "Three.js", desc: "3D Browser graphics" },
        { name: "WebGL / GLSL", desc: "Custom pixel shaders" },
        { name: "WebAudio API", desc: "FFT Sound visualizers" },
        { name: "WebAssembly", desc: "Wasm compute modules" },
        { name: "Blender", desc: "3D Asset modeling" },
      ],
    },
  ];

  return (
    <section id="stack" className="py-24 relative z-10 border-t border-white/10 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 text-zinc-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>STUDIO ARSENAL • TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Built With Modern Tech
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl text-base font-light">
            We leverage cutting-edge frameworks, systems languages, and AI toolchains to turn ambitious side projects into high-performance realities.
          </p>
        </div>

        {/* Stack Grid (Monochrome) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 hover:border-white/40 rounded-2xl p-6 transition-all duration-300 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-black border border-white/20 text-white">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-3 rounded-xl bg-black border border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold font-mono text-zinc-200 block">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-light">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
