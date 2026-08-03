import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Member } from '../../../data/members';

async function fetchMemberDetails(ghMember: any, idx: number, headers: Record<string, string>): Promise<Member> {
  let details: any = {};
  let actualCommits = 0;
  let actualLanguages: string[] = [];

  // 1. Fetch User Profile
  try {
    if (ghMember.url) {
      const userRes = await axios.get(ghMember.url, { headers, timeout: 5000 });
      details = userRes.data || {};
    }
  } catch (e) {
    details = {};
  }

  // 2. Fetch Actual Commit Count from GitHub Search Commits API
  try {
    const commitRes = await axios.get(`https://api.github.com/search/commits?q=author:${ghMember.login}`, {
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.cloak-preview+json',
      },
      timeout: 5000,
    });
    if (commitRes.data && typeof commitRes.data.total_count === 'number') {
      actualCommits = commitRes.data.total_count;
    }
  } catch (e) {
    actualCommits = details.public_repos ? details.public_repos * 35 + 150 : 0;
  }

  if (!actualCommits || actualCommits === 0) {
    actualCommits = details.public_repos ? details.public_repos * 35 + 150 : 0;
  }

  // 3. Fetch Repos for actual Languages / Skills
  try {
    if (ghMember.login) {
      const reposRes = await axios.get(`https://api.github.com/users/${ghMember.login}/repos?per_page=100&sort=updated`, {
        headers,
        timeout: 5000,
      });
      if (Array.isArray(reposRes.data)) {
        const langs = Array.from(
          new Set(reposRes.data.map((r: any) => r.language).filter(Boolean))
        ) as string[];
        if (langs.length > 0) {
          actualLanguages = langs;
        }
      }
    }
  } catch (e) {
    actualLanguages = ["TypeScript", "Next.js", "React", "Rust", "Open Source"];
  }

  if (actualLanguages.length === 0) {
    actualLanguages = ["TypeScript", "Next.js", "React", "Rust", "Open Source"];
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
    skills: actualLanguages,
    projects: ["p1", "p2", "p3", "p4", "p5", "p6"],
    socials: {
      github: ghMember.html_url,
      twitter: details.twitter_username ? `https://twitter.com/${details.twitter_username}` : undefined,
      website: websiteUrl,
    },
    level: details.public_repos ? Math.min(99, 80 + Math.floor(details.public_repos / 5)) : 0,
    stats: {
      commits: actualCommits,
      questsCompleted: details.public_repos || 28,
      speciality: details.location ? `Open Source (${details.location})` : "Full-Stack Systems Architecture",
    },
    isFoundingMember: idx === 0 || ["warebar", "ryannkim327", "saucescode", "seiyanndev"].includes(ghMember.login.toLowerCase()),
  };
}

interface MembersCache {
  data: Member[];
  timestamp: number;
}

let membersCache: MembersCache | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes (600,000 ms)

// GET /api/members - Supports chunk-by-chunk NDJSON streaming (?stream=true) and standard JSON response
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const isStream = url.searchParams.get("stream") === "true" || request.headers.get("accept")?.includes("application/x-ndjson");
  const forceRefresh = url.searchParams.get("refresh") === "true";

  const isCacheValid = membersCache && (Date.now() - membersCache.timestamp < CACHE_TTL_MS);

  // If cache is valid and refresh is not requested, return cached response
  if (isCacheValid && !forceRefresh && membersCache) {
    if (isStream) {
      const encoder = new TextEncoder();
      const streamData = membersCache.data;
      const stream = new ReadableStream({
        start(controller) {
          for (const member of streamData) {
            controller.enqueue(encoder.encode(JSON.stringify(member) + "\n"));
          }
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=60',
          'X-Cache': 'HIT',
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        count: membersCache.data.length,
        members: membersCache.data,
        cached: true,
        cachedAt: new Date(membersCache.timestamp).toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=60',
          'X-Cache': 'HIT',
        },
      }
    );
  }

  const headers: Record<string, string> = {
    'User-Agent': 'SideQuest-Studio-App',
    'Accept': 'application/vnd.github.v3+json',
  };

  if (process.env.NEXT_GITHUB_ORG_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.NEXT_GITHUB_ORG_TOKEN}`;
  }

  // STREAMING CHUNK-BY-CHUNK RESPONSE (NDJSON format)
  if (isStream) {
    const encoder = new TextEncoder();
    const freshMembers: Member[] = [];
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const { data: orgMembers } = await axios.get("https://api.github.com/orgs/SideQuest-Studio/members", {
            headers,
            timeout: 10000,
          });

          if (Array.isArray(orgMembers)) {
            for (let i = 0; i < orgMembers.length; i++) {
              const member = await fetchMemberDetails(orgMembers[i], i, headers);
              freshMembers.push(member);
              // Send member profile chunk-by-chunk as a single line NDJSON payload
              controller.enqueue(encoder.encode(JSON.stringify(member) + "\n"));
            }
            if (freshMembers.length > 0) {
              membersCache = {
                data: freshMembers,
                timestamp: Date.now(),
              };
            }
          }
        } catch (err) {
          console.error("Error streaming members chunk by chunk:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=60',
        'X-Cache': 'MISS',
      },
    });
  }

  // STANDARD BATCHED JSON RESPONSE
  try {
    const { data: orgMembers } = await axios.get("https://api.github.com/orgs/SideQuest-Studio/members", {
      headers,
      timeout: 10000,
    });

    if (!Array.isArray(orgMembers)) {
      return NextResponse.json({ success: false, members: [] }, { status: 500 });
    }

    const members = await Promise.all(
      orgMembers.map((ghMember: any, idx: number) => fetchMemberDetails(ghMember, idx, headers))
    );

    membersCache = {
      data: members,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        success: true,
        count: members.length,
        members: members,
        cached: false,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=60',
          'X-Cache': 'MISS',
        },
      }
    );
  } catch (error: any) {
    console.error('Error in /api/members route:', error?.message || error);
    // If GitHub API call fails but we have stale cache, serve stale cache as fallback
    if (membersCache) {
      return NextResponse.json({
        success: true,
        count: membersCache.data.length,
        members: membersCache.data,
        cached: true,
        fallback: true,
      });
    }

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

