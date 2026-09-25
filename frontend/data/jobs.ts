import { Job } from "@/types/job";

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Backend Engineer",
    company: "Vertex Labs",
    location: "London, UK · Hybrid",
    type: "Full-time",
    salary: "£95,000 - £125,000",
    description: "Looking for an experienced Go/Node.js backend engineer to scale high-throughput infrastructure.",
    requirements: ["5+ years Go/Node", "Kubernetes & AWS", "Distributed Systems"],
    skills: ["Go", "Node.js", "AWS", "Kubernetes"],
    postedDate: "2 days ago",
    featured: true,
  },
  {
    id: "job-2",
    title: "Lead Product Designer",
    company: "Northstar Systems",
    location: "Remote · Worldwide",
    type: "Remote",
    salary: "$120,000 - $150,000",
    description: "Build user-centric workflows and system visual designs for our cloud dashboard platform.",
    requirements: ["4+ years Figma", "Strong Portfolio", "Design System Ownership"],
    skills: ["Figma", "Design Systems", "UI/UX", "Prototyping"],
    postedDate: "1 week ago",
    featured: true,
  },
];