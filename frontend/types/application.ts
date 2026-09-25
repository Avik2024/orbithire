export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  appliedDate: string;
  status: "Submitted" | "Under Review" | "Interviewing" | "Offered" | "Rejected";
};