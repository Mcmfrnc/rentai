import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatPHP, formatPHPPerDay } from "@/lib/currency";
import type { ScoredRecommendation } from "@/lib/recommendationEngine";
import { cn } from "@/lib/utils";

type RecommendationResultCardProps = {
  result: ScoredRecommendation;
  variant?: "best" | "alternative";
  rank?: number;
  className?: string;
};

export function RecommendationResultCard({
  result,
  variant = "alternative",
  rank,
  className,
}: RecommendationResultCardProps) {
  const { vehicle, matchPercent, estimatedTotalCost, highlights, concerns } =
    result;

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/60",
        variant === "best" && "border-primary/40 shadow-md ring-1 ring-primary/10",
        className
      )}
    >
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <div className="relative aspect-[16/10] bg-muted md:aspect-auto md:min-h-full">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="220px"
            className="object-cover"
          />
          {variant === "best" ? (
            <div className="absolute left-3 top-3">
              <Badge className="gap-1 bg-primary text-primary-foreground">
                <Trophy className="h-3 w-3" />
                Best match
              </Badge>
            </div>
          ) : rank ? (
            <div className="absolute left-3 top-3">
              <Badge variant="secondary">#{rank}</Badge>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <CardHeader className="space-y-3 pb-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {vehicle.brand}
                </p>
                <h3 className="text-xl font-semibold">{vehicle.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {matchPercent}%
                </p>
                <p className="text-xs text-muted-foreground">match score</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {vehicle.rating.toFixed(1)}
              </span>
              <span>·</span>
              <span>{formatPHPPerDay(vehicle.dailyRate)}</span>
              <span>·</span>
              <Badge
                variant={vehicle.availability ? "default" : "outline"}
                className={cn(
                  vehicle.availability &&
                    "bg-emerald-600 text-white hover:bg-emerald-600"
                )}
              >
                {vehicle.availability ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4 pb-4">
            <div>
              <p className="mb-2 text-sm font-medium">Why it matches</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {highlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {concerns.length > 0 ? (
              <div>
                <p className="mb-2 text-sm font-medium">Considerations</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {concerns.slice(0, 2).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-amber-500">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
              <p className="text-xs text-muted-foreground">Estimated rental cost</p>
              <p className="text-lg font-semibold">
                {formatPHP(estimatedTotalCost)}
              </p>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-muted/20 px-6 py-4 dark:bg-muted/10">
            <Button asChild className="gap-2">
              <Link href={`/vehicles/${vehicle.id}`}>
                View vehicle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
