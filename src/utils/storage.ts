import { INITIAL_MEMBERS, Member } from "../data/members";
import { PROJECTS, Project } from "../data/projects";
import { MILESTONES, Milestone } from "../data/milestones";

export interface Application {
  id: string;
  name: string;
  email: string;
  roleInterest: string;
  questIdea: string;
  portfolioUrl?: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Archived";
}

export const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "app_1",
    name: "Samantha Wright",
    email: "samantha@dev.io",
    roleInterest: "Game Dev / WebGL",
    questIdea: "Building an open-source WebGL particle synth module for Next.js.",
    portfolioUrl: "https://github.com/samanthawright",
    submittedAt: "2026-08-01 14:32",
    status: "Pending",
  },
  {
    id: "app_2",
    name: "Liam O'Connor",
    email: "liam.oc@rustdev.org",
    roleInterest: "Rust / Systems",
    questIdea: "Creating a sub-millisecond local SQLite caching proxy for microservices.",
    portfolioUrl: "https://github.com/liam-oc",
    submittedAt: "2026-07-28 09:15",
    status: "Approved",
  },
];

const MEMBERS_KEY = "sidequest_members";
const PROJECTS_KEY = "sidequest_projects";
const MILESTONES_KEY = "sidequest_milestones";
const APPLICATIONS_KEY = "sidequest_applications";

export function getStoredMembers(): Member[] {
  if (typeof window === "undefined") return INITIAL_MEMBERS;
  try {
    const data = localStorage.getItem(MEMBERS_KEY);
    if (!data) return INITIAL_MEMBERS;
    const parsed: Member[] = JSON.parse(data);
    // Exclude old mock members that are out of the GitHub organization
    const legacyIds = new Set(["m1", "m2", "m3", "m4", "m5", "m6"]);
    const cleaned = parsed.filter((m) => !legacyIds.has(m.id));
    return cleaned.length > 0 ? cleaned : INITIAL_MEMBERS;
  } catch (e) {
    return INITIAL_MEMBERS;
  }
}

export function saveMembers(members: Member[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : PROJECTS;
  } catch (e) {
    return PROJECTS;
  }
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getStoredMilestones(): Milestone[] {
  if (typeof window === "undefined") return MILESTONES;
  try {
    const data = localStorage.getItem(MILESTONES_KEY);
    return data ? JSON.parse(data) : MILESTONES;
  } catch (e) {
    return MILESTONES;
  }
}

export function saveMilestones(milestones: Milestone[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MILESTONES_KEY, JSON.stringify(milestones));
}

export function getStoredApplications(): Application[] {
  if (typeof window === "undefined") return DEFAULT_APPLICATIONS;
  try {
    const data = localStorage.getItem(APPLICATIONS_KEY);
    return data ? JSON.parse(data) : DEFAULT_APPLICATIONS;
  } catch (e) {
    return DEFAULT_APPLICATIONS;
  }
}

export function saveApplications(apps: Application[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}
