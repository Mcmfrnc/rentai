export type DamageSeverity = "minor" | "moderate" | "severe";

export type DamageReportStatus = "open" | "in_review" | "resolved";

export type DamageReport = {
  id: string;
  vehicleId: string;
  bookingId: string | null;
  reportedBy: string;
  severity: DamageSeverity;
  description: string;
  images: string[];
  status: DamageReportStatus;
  createdAt: string;
  resolvedAt: string | null;
};
