"use client";

import { useCallback, useEffect, useState } from "react";

import { VehicleManagement } from "@/components/admin/vehicle-management";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";
import { bookings } from "@/data/bookings";
import { formatPHP } from "@/lib/currency";
import { getVehicles, VEHICLES_UPDATED_EVENT } from "@/lib/vehicleStorage";

const activeRevenue = bookings
  .filter((booking) => booking.status !== "cancelled")
  .reduce((sum, booking) => sum + booking.totalAmount, 0);

export function AdminDashboard() {
  const [vehicleCount, setVehicleCount] = useState(0);

  const refreshCount = useCallback(() => {
    setVehicleCount(getVehicles().length);
  }, []);

  useEffect(() => {
    refreshCount();
    const handleUpdate = () => refreshCount();
    window.addEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
    return () =>
      window.removeEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
  }, [refreshCount]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Manage vehicles, bookings, and fleet overview."
        badge="Admin"
      />

      <p className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground dark:bg-muted/10">
        Admin access is simulated for portfolio purposes. Real authentication
        and database storage are planned as future improvements.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PlaceholderCard
          title="Total Vehicles"
          description={`${vehicleCount} vehicle${vehicleCount === 1 ? "" : "s"} in the fleet.`}
        />
        <PlaceholderCard
          title="Active Bookings"
          description="Current reservations placeholder."
        />
        <PlaceholderCard
          title="Revenue"
          description={`${formatPHP(activeRevenue)} in booking revenue (placeholder).`}
        />
        <PlaceholderCard
          title="Utilization"
          description="Fleet usage metrics placeholder."
        />
      </div>

      <VehicleManagement />

      <PlaceholderCard
        title="Recent Activity"
        description="Bookings and fleet changes table placeholder."
      />
    </div>
  );
}
