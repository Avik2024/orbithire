import { Job } from "@/types/job";

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Backend Engineer",
    company: "Vertex Labs",
    companyLogo: "/logos/vertex.png",
    location: "London, UK · Hybrid",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description:
      "We are seeking an experienced Backend Engineer to architect and scale our real-time cloud data pipelines. You will design resilient Microservices using Node.js, Go, and PostgreSQL.",
    requirements: [
      "5+ years of software engineering experience in backend infrastructure",
      "Proficiency in Node.js, TypeScript, Go, or Python",
      "Strong database optimization skills with PostgreSQL or Redis",
      "Experience with cloud architectures on AWS, GCP, or Kubernetes",
    ],
    skills: ["TypeScript", "Node.js", "Go", "PostgreSQL", "AWS", "Docker"],
    postedDate: "2026-09-24T10:00:00.000Z",
    featured: true,
  },
  {
    id: "job-2",
    title: "Lead Product Designer",
    company: "Northstar Systems",
    companyLogo: "/logos/northstar.png",
    location: "Remote · Worldwide",
    type: "Remote",
    salary: "$120,000 - $150,000",
    description:
      "Join our product team to own the design system and end-to-end user workflows for our enterprise analytics dashboard platform. Strong proficiency in Figma and prototyping is required.",
    requirements: [
      "4+ years of product design experience for SaaS applications",
      "Deep expertise in Figma, tokenized design systems, and rapid prototyping",
      "Strong portfolio demonstrating intuitive user journey solutions",
    ],
    skills: ["Figma", "UI/UX", "Design Systems", "User Research", "Prototyping"],
    postedDate: "2026-09-22T14:30:00.000Z",
    featured: true,
  },
  {
    id: "job-3",
    title: "Full Stack Next.js Engineer",
    company: "Orbit Software",
    companyLogo: "/logos/orbit.png",
    location: "New York, USA · Hybrid",
    type: "Full-time",
    salary: "$140,000 - $175,000",
    description:
      "Build high-performance web applications using modern Next.js App Router, React Server Components, and Tailwind CSS. You will collaborate directly with product managers and backend developers.",
    requirements: [
      "3+ years working extensively with React, Next.js, and TypeScript",
      "Solid understanding of SSR, SSG, caching, and state management",
      "Experience with Tailwind CSS and responsive layout systems",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    postedDate: "2026-09-20T09:15:00.000Z",
    featured: false,
  },
  {
    id: "job-4",
    title: "DevOps & Cloud Engineer",
    company: "CloudScale Tech",
    companyLogo: "/logos/cloudscale.png",
    location: "San Francisco, CA · Remote",
    type: "Contract",
    salary: "$90 - $115 / hr",
    description:
      "Automate CI/CD workflows, manage multi-region Kubernetes clusters, and enforce security policies across AWS infrastructure.",
    requirements: [
      "Expertise with Terraform, Ansible, and Docker",
      "Proven track record managing Kubernetes production clusters",
      "Experience with Prometheus, Grafana, and CI/CD pipelines",
    ],
    skills: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"],
    postedDate: "2026-09-18T16:45:00.000Z",
    featured: false,
  },
];