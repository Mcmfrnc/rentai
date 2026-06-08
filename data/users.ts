import type { User } from "@/types/user";

export const users: User[] = [
  {
    id: "usr-001",
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    phone: "+1 (206) 555-0142",
    licenseNumber: "WA-RV4829103",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    role: "customer",
    createdAt: "2025-11-12T09:30:00.000Z",
  },
  {
    id: "usr-002",
    name: "Jordan Kim",
    email: "jordan.kim@email.com",
    phone: "+1 (206) 555-0287",
    licenseNumber: "WA-KM7391045",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    role: "customer",
    createdAt: "2025-12-03T14:15:00.000Z",
  },
  {
    id: "usr-003",
    name: "Morgan Patel",
    email: "morgan.patel@rentai.com",
    phone: "+1 (206) 555-0391",
    licenseNumber: "WA-PT8821047",
    avatar: null,
    role: "admin",
    createdAt: "2025-08-01T08:00:00.000Z",
  },
];
