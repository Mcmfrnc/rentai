export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
};
