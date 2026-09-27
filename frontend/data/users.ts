import { User } from "@/types/user";
import { UserProfile } from "@/types/profile";

export const MOCK_USER: User = {
  id: "user_01",
  name: "Avik Mukherjee",
  email: "avik@orbithire.dev",
  role: "candidate",
  avatarUrl: "/images/avatars/avik.jpg",
  title: "Senior Full Stack Engineer",
  bio: "Building high-performance web applications with Next.js, React, and TypeScript.",
  createdAt: "2026-01-15T08:00:00.000Z",
};

export const MOCK_PROFILE: UserProfile = {
  userId: "user_01",
  headline: "Senior Full Stack & Cloud Systems Engineer",
  bio: "Passionate engineer with 6+ years of experience in distributed systems, modern frontend architectures, and developer tooling.",
  location: "London, UK · Hybrid",
  phone: "+44 7700 900077",
  website: "https://orbithire.dev",
  githubUrl: "https://github.com/Avik2024",
  linkedinUrl: "https://linkedin.com/in/avik-mukherjee",
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Go",
    "PostgreSQL",
    "AWS",
    "Docker",
  ],
  experience: [
    {
      id: "exp_1",
      company: "Vertex Labs",
      role: "Senior Full Stack Engineer",
      startDate: "2024-03",
      current: true,
      description: "Leading frontend architecture for multi-tenant cloud automation platforms.",
    },
    {
      id: "exp_2",
      company: "Northstar Systems",
      role: "Frontend Engineer",
      startDate: "2021-06",
      endDate: "2024-02",
      current: false,
      description: "Built scalable UI design systems and real-time dashboard analytics.",
    },
  ],
  education: [
    {
      id: "edu_1",
      institution: "Imperial College London",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startYear: "2017",
      endYear: "2021",
    },
  ],
  resumeUrl: "/docs/avik_resume.pdf",
  completionPercentage: 92,
};