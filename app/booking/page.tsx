import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";
import { vehicles } from "@/data/vehicles";
import { formatPHP, formatPHPPerDay } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Booking",
};

const sampleVehicle = vehicles[0];

export default function BookingPage() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="space-y-8">
        <PageHeader
          title="Booking"
          description="Select dates, pickup location, and rental options for your vehicle."
          badge="Step 1"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <PlaceholderCard
            title="Rental Details"
            description="Date range, location, and add-ons placeholder."
          />
          <PlaceholderCard
            title="Selected Vehicle"
            description={`${sampleVehicle.name} — ${formatPHPPerDay(sampleVehicle.dailyRate)}. Estimated total: ${formatPHP(sampleVehicle.dailyRate * 3)} for 3 days.`}
          />
        </div>
      </div>
    </Container>
  );
}
