import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { VehicleListing } from "@/components/vehicles/vehicle-listing";

export const metadata: Metadata = {
  title: "Vehicles",
};

export default function VehiclesPage() {
  return (
    <Container className="py-10 sm:py-16">
      <VehicleListing />
    </Container>
  );
}
