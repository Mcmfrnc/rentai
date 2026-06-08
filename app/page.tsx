import Link from "next/link";

import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderCard } from "@/components/shared/placeholder-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="space-y-12">
        <section className="space-y-6">
          <PageHeader
            badge="Portfolio Project"
            title="Rent smarter with AI-assisted vehicle rentals"
            description="Browse vehicles, manage bookings, and get help from an AI assistant — all in one modern rental experience."
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/vehicles">Explore Vehicles</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/assistant">Try AI Assistant</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PlaceholderCard
            title="Wide Selection"
            description="Sedans, SUVs, and more — placeholder for featured categories."
          />
          <PlaceholderCard
            title="Simple Booking"
            description="Streamlined rental flow from browse to confirmation."
          />
          <PlaceholderCard
            title="AI Guidance"
            description="Get recommendations and answers as you plan your trip."
          />
        </section>
      </div>
    </Container>
  );
}
