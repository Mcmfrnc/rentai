import { Lightbulb } from "lucide-react";

import { RecommendationResultCard } from "@/components/recommendations/recommendation-result-card";
import type { RecommendationResult } from "@/lib/recommendationEngine";

type RecommendationResultsProps = {
  result: RecommendationResult;
};

export function RecommendationResults({ result }: RecommendationResultsProps) {
  if (!result.best) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center dark:bg-muted/10">
        <p className="text-muted-foreground">{result.explanation}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-primary/5 p-5 dark:bg-primary/10">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <Lightbulb className="h-4 w-4" />
          Recommendation summary
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">
          {result.explanation}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Best recommendation</h3>
        <RecommendationResultCard result={result.best} variant="best" />
      </div>

      {result.alternatives.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top alternatives</h3>
          <div className="space-y-4">
            {result.alternatives.map((alternative, index) => (
              <RecommendationResultCard
                key={alternative.vehicle.id}
                result={alternative}
                variant="alternative"
                rank={index + 2}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
