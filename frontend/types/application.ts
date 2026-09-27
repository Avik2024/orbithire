export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Interviewing"
  | "Offered"
  | "Rejected";

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
}

export interface ApplicationUpdatePayload {
  status?: ApplicationStatus;
  notes?: string;
}