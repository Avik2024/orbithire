import { Company } from "@/types/company";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-1",
    name: "Vertex Labs",
    logo: "/logos/vertex.png",
    website: "https://vertexlabs.example.com",
    location: "London, UK",
    industry: "Cloud Infrastructure & Data Systems",
    size: "250-500 employees",
    description:
      "Vertex Labs develops high-throughput cloud automation and data infrastructure tools for modern engineering organizations.",
    foundedYear: 2018,
    openJobsCount: 12,
  },
  {
    id: "comp-2",
    name: "Northstar Systems",
    logo: "/logos/northstar.png",
    website: "https://northstarsystems.example.com",
    location: "San Francisco, CA",
    industry: "Enterprise SaaS & Analytics",
    size: "100-250 employees",
    description:
      "Northstar Systems builds real-time workflow automation and user journey analytics platforms for global teams.",
    foundedYear: 2020,
    openJobsCount: 6,
  },
  {
    id: "comp-3",
    name: "Orbit Software",
    logo: "/logos/orbit.png",
    website: "https://orbithire.dev",
    location: "New York, NY",
    industry: "Developer Tools & Tech Recruiting",
    size: "50-100 employees",
    description:
      "Orbit Software builds modern web platforms that connect top software talent with high-impact engineering teams worldwide.",
    foundedYear: 2022,
    openJobsCount: 4,
  },
  {
    id: "comp-4",
    name: "CloudScale Tech",
    logo: "/logos/cloudscale.png",
    website: "https://cloudscale.example.com",
    location: "Austin, TX",
    industry: "DevOps & Cloud Security",
    size: "500+ employees",
    description:
      "CloudScale Tech provides cloud security monitoring, Kubernetes management, and CI/CD automation at enterprise scale.",
    foundedYear: 2015,
    openJobsCount: 18,
  },
];