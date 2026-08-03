"use client";

import Image from "next/image";
import { MessageSquare, Mail, Heart, Sparkles, Activity } from "lucide-react";
import { GithubIcon, TwitterIcon, DiscordIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-black border border-slate-700/80 p-1">
                <Image
                  src="/logo.png"
                  alt="SideQuest Studio Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-wider text-white">
                SIDEQUEST <span className="text-slate-400 font-light">STUDIO</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              An independent guild of developers, designers, and creators crafting open-source developer tools, 3D web experiences, and AI engines during midnight sidequest sprints.
            </p>

            {/* Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>All SideQuest Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Studio Manifesto
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Active Quests
                </a>
              </li>
              <li>
                <a href="#members" className="hover:text-white transition-colors">
                  Guild Roster
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-white transition-colors">
                  Studio Tech Stack
                </a>
              </li>
              <li>
                <a href="#milestones" className="hover:text-white transition-colors">
                  Quest Log & Timeline
                </a>
              </li>
              <li>
                <a href="/admin" className="text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 pt-1">
                  <span>⚙️ Studio Admin Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4">
              Connect With Guild
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/sidequest-studio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>GitHub Organization</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <TwitterIcon className="w-4 h-4 text-white" />
                <span>Twitter / X</span>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <DiscordIcon className="w-4 h-4 text-white" />
                <span>Community Discord</span>
              </a>

              <a
                href="mailto:contact@sidequest-studio.dev"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>contact@sidequest-studio.dev</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} SideQuest Studio. Open Source under MIT License.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-white fill-white inline" /> by SideQuest Members.
          </p>
        </div>

      </div>
    </footer>
  );
}
