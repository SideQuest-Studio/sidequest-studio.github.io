import { NextResponse } from 'next/server';
import axios from 'axios';
import { Member } from '../../../data/members';

// GET /api/members - Fetch studio members list gathered from GitHub organization API
export async function GET() {
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'SideQuest-Studio-App',
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.NEXT_GITHUB_ORG_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.NEXT_GITHUB_ORG_TOKEN}`;
    }

    // 1. Fetch organization members list
    const { data: orgMembers } = await axios.get("https://api.github.com/orgs/SideQuest-Studio/members", {
      headers,
      timeout: 5000,
    });

    if (!Array.isArray(orgMembers)) {
      return NextResponse.json({ success: false, members: [] }, { status: 500 });
    }

    // 2. Gather full profile data for each GitHub organization member
    const members: Member[] = await Promise.all(
      orgMembers.map(async (ghMember: any, idx: number) => {
        let details: any = {};
        try {
          if (ghMember.url) {
            const userRes = await axios.get(ghMember.url, { headers, timeout: 3000 });
            details = userRes.data || {};
          }
        } catch (e) {
          details = {};
        }

        const bioText = details.bio || `SideQuest Studio developer (@${ghMember.login}).`;
        const websiteUrl = details.blog
          ? details.blog.startsWith("http")
            ? details.blog
            : `https://${details.blog}`
          : undefined;

        return {
          id: `gh_${ghMember.id}`,
          name: details.name || ghMember.login,
          handle: `@${ghMember.login}`,
          role: details.company ? `${details.company}` : "Lead Architect & Developer",
          classTitle: details.location ? `Architect (${details.location})` : "System Sorcerer",
          category: "Engineering" as const,
          bio: bioText,
          avatar: ghMember.avatar_url,
          skills: ["TypeScript", "Next.js", "React", "Rust", "Distributed Systems"],
          projects: ["p1", "p2", "p3", "p4", "p5", "p6"],
          socials: {
            github: ghMember.html_url,
            twitter: details.twitter_username ? `https://twitter.com/${details.twitter_username}` : undefined,
            website: websiteUrl,
          },
          level: details.public_repos ? Math.min(99, 80 + Math.floor(details.public_repos / 5)) : 99,
          stats: {
            commits: details.public_repos ? details.public_repos * 12 + 150 : 1420,
            questsCompleted: details.public_repos ? Math.min(50, Math.floor(details.public_repos / 4)) : 28,
            speciality: details.location ? `Open Source (${details.location})` : "Full-Stack Systems Architecture",
          },
          isFoundingMember: idx === 0,
        };
      })
    );

    return NextResponse.json({
      success: true,
      count: members.length,
      members: members,
    });
  } catch (error: any) {
    console.error('Error in /api/members route:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to fetch members from GitHub API',
        members: [],
      },
      { status: 500 }
    );
  }
}
