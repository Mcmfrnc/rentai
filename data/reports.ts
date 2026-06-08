import type { DamageReport } from "@/types/damage-report";

export const damageReports: DamageReport[] = [
  {
    id: "rpt-001",
    vehicleId: "veh-003",
    bookingId: "bkg-003",
    reportedBy: "usr-003",
    severity: "minor",
    description:
      "Small scratch on the right saddlebag from a parking lot incident. No structural damage.",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80",
    ],
    status: "resolved",
    createdAt: "2026-05-30T18:45:00.000Z",
    resolvedAt: "2026-06-02T10:30:00.000Z",
  },
  {
    id: "rpt-002",
    vehicleId: "veh-001",
    bookingId: "bkg-005",
    reportedBy: "usr-003",
    severity: "moderate",
    description:
      "Dent on the rear bumper detected during return inspection. Paint chipped in a 3-inch area.",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    ],
    status: "in_review",
    createdAt: "2026-06-09T08:15:00.000Z",
    resolvedAt: null,
  },
  {
    id: "rpt-003",
    vehicleId: "veh-002",
    bookingId: null,
    reportedBy: "usr-003",
    severity: "minor",
    description:
      "Routine pre-rental inspection found a cracked side mirror cover. Vehicle flagged for maintenance.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    ],
    status: "open",
    createdAt: "2026-06-06T14:00:00.000Z",
    resolvedAt: null,
  },
];
