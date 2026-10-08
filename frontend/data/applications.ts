import { Application } from "@/types/application";

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Senior Backend Engineer",
    company: "Vertex Labs",
    companyLogo: "/logos/vertex.png",
    location: "London, UK · Hybrid",
    appliedDate: "2026-09-22T10:00:00.000Z",
    status: "Interviewing",
    notes: "Technical interview scheduled for next Tuesday with the VP of Engineering.",
  },
  {
    id: "app-102",
    jobId: "job-2",
    jobTitle: "Lead Product Designer",
    company: "Northstar Systems",
    companyLogo: "/logos/northstar.png",
    location: "Remote · Worldwide",
    appliedDate: "2026-09-20T14:30:00.000Z",
    status: "Under Review",
    notes: "Portfolio and initial questionnaire submitted successfully.",
  },
  {
    id: "app-103",
    jobId: "job-3",
    jobTitle: "Full Stack Next.js Engineer",
    company: "Orbit Software",
    companyLogo: "/logos/orbit.png",
    location: "New York, USA · Hybrid",
    appliedDate: "2026-09-18T09:15:00.000Z",
    status: "Submitted",
  },
];