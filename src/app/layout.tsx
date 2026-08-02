import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sidequest-studio.github.io"),
  title: "SideQuest Studio | Independent Developer Guild & Organizational Portfolio",
  description: "An independent guild of engineers, designers, game creators, and AI researchers crafting open-source developer tools, 3D web sandboxes, and autonomous AI engines.",
  keywords: ["SideQuest Studio", "Developer Guild", "Open Source", "Developer Portfolio", "Software Studio", "Web3", "AI Agents", "Rust CLI"],
  openGraph: {
    title: "SideQuest Studio | Where Side Quests Become Main Quests",
    description: "Explore open-source developer tools, audio-reactive 3D visualizers, local AI agent pipelines, and guild member profiles.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
