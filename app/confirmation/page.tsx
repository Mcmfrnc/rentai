import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";

export const metadata: Metadata = {
  title: "Booking Confirmation",
};

export default function ConfirmationPage() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <PageHeader
          title="Booking Confirmed"
          description="Your reservation has been placed. Confirmation details will appear here."
          badge="Success"
        />

        <PlaceholderCard
          title="Confirmation Details"
          description="Booking reference, pickup instructions, and receipt placeholder."
        />
      </div>
    </Container>
  );
}
