"use client";

import { useState } from "react";

import { RecommendationForm } from "@/components/recommendations/recommendation-form";
import { RecommendationResults } from "@/components/recommendations/recommendation-results";
import { PageHeader } from "@/components/shared/page-header";
import {
  defaultRecommendationInput,
  getRecommendations,
  type RecommendationInput,
  type RecommendationResult,
} from "@/lib/recommendationEngine";

export function RecommendationAssistant() {
  const [input, setInput] = useState<RecommendationInput>(
    defaultRecommendationInput
  );
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    setResult(getRecommendations(input));
    setHasSubmitted(true);
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="AI Assistant"
        description="Get personalized vehicle recommendations powered by our rule-based scoring engine — no external APIs, just smart matching."
        badge="Rule-based AI"
      />

      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <RecommendationForm
          values={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          className="xl:sticky xl:top-24 xl:self-start"
        />

        <div className="min-w-0">
          {hasSubmitted && result ? (
            <RecommendationResults result={result} />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center dark:bg-muted/10">
              <p className="max-w-md text-lg font-medium">
                Your recommendations will appear here
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Fill in your trip details and click Get recommendations to see
                your best match, top alternatives, and estimated rental cost.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
