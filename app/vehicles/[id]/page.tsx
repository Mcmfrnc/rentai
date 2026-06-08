import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";
import { vehicles } from "@/data/vehicles";
import { formatPHPPerDay } from "@/lib/currency";

type VehicleDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: VehicleDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);

  return {
    title: vehicle?.name ?? `Vehicle ${id}`,
  };
}

export default async function VehicleDetailsPage({
  params,
}: VehicleDetailsPageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);

  if (!vehicle) {
    notFound();
  }

  return (
    <Container className="py-10 sm:py-16">
      <div className="space-y-8">
        <PageHeader
          title={vehicle.name}
          description="Detailed vehicle information, specs, and availability will be shown here."
          badge="Details"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <PlaceholderCard
            title="Gallery"
            description="Vehicle images placeholder."
            className="lg:col-span-2"
          />
          <PlaceholderCard
            title="Booking Summary"
            description={`From ${formatPHPPerDay(vehicle.dailyRate)}. Pricing and booking actions placeholder.`}
          />
          <PlaceholderCard
            title="Specifications"
            description="Make, model, features, and more."
            className="lg:col-span-2"
          />
          <PlaceholderCard
            title="Availability"
            description="Calendar and rental dates placeholder."
          />
        </div>
      </div>
    </Container>
  );
}
