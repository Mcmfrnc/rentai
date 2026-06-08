import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";
import { bookings } from "@/data/bookings";
import { formatPHP } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Checkout",
};

const sampleBooking = bookings[0];

export default function CheckoutPage() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="space-y-8">
        <PageHeader
          title="Checkout"
          description="Review your rental details and complete your reservation."
          badge="Step 2"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <PlaceholderCard
            title="Renter Information"
            description="Contact and driver details placeholder."
            className="lg:col-span-2"
          />
          <PlaceholderCard
            title="Order Summary"
            description={`Subtotal, taxes, and total due — sample total: ${formatPHP(sampleBooking.totalAmount)}.`}
          />
        </div>
      </div>
    </Container>
  );
}
