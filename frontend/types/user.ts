export type User = {
  id: string;
  name: string;
  email: string;
  role: "candidate" | "employer";
  avatarUrl?: string;
  title?: string;
  bio?: string;
};