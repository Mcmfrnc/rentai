import type { Metadata } from "next";

import { RecommendationAssistant } from "@/components/recommendations/recommendation-assistant";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "AI Assistant",
};

export default function AssistantPage() {
  return (
    <Container className="py-10 sm:py-16">
      <RecommendationAssistant />
    </Container>
  );
}
