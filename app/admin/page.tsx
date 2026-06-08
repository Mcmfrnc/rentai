import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <Container className="py-10 sm:py-16">
      <AdminDashboard />
    </Container>
  );
}
