export type UserRole = "candidate" | "employer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  companyId?: string;
  createdAt: string;
}

export interface UserAuthSession {
  user: User | null;
  token?: string;
  isAuthenticated: boolean;
}