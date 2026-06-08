"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  defaultRecommendationInput,
  type RecommendationInput,
  type TripPurpose,
} from "@/lib/recommendationEngine";
import type { FuelType, Transmission, VehicleType } from "@/types/vehicle";
import { cn } from "@/lib/utils";

type RecommendationFormProps = {
  values: RecommendationInput;
  onChange: (values: RecommendationInput) => void;
  onSubmit: () => void;
  className?: string;
};

function FormSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-background"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const tripPurposeOptions: { value: TripPurpose; label: string }[] = [
  { value: "business", label: "Business" },
  { value: "family", label: "Family" },
  { value: "adventure", label: "Adventure" },
  { value: "city_commute", label: "City Commute" },
  { value: "leisure", label: "Leisure" },
  { value: "road_trip", label: "Road Trip" },
];

export function RecommendationForm({
  values,
  onChange,
  onSubmit,
  className,
}: RecommendationFormProps) {
  const update = (partial: Partial<RecommendationInput>) => {
    onChange({ ...values, ...partial });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm dark:bg-card",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Your trip details</h2>
        <p className="text-sm text-muted-foreground">
          Tell us what you need and our rule-based engine will rank the best
          matches from our fleet.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget per day (PHP)</Label>
          <Input
            id="budget"
            type="number"
            min={500}
            step={50}
            value={values.budgetPerDay}
            onChange={(e) =>
              update({ budgetPerDay: Number(e.target.value) || 0 })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">Number of passengers</Label>
          <Input
            id="passengers"
            type="number"
            min={1}
            max={8}
            value={values.passengers}
            onChange={(e) =>
              update({ passengers: Number(e.target.value) || 1 })
            }
            required
          />
        </div>

        <FormSelect
          id="vehicle-type"
          label="Vehicle type"
          value={values.vehicleType}
          options={[
            { value: "any", label: "Any type" },
            { value: "car", label: "Car" },
            { value: "motorcycle", label: "Motorcycle" },
          ]}
          onChange={(value) =>
            update({ vehicleType: value as VehicleType | "any" })
          }
        />

        <FormSelect
          id="trip-purpose"
          label="Trip purpose"
          value={values.tripPurpose}
          options={tripPurposeOptions}
          onChange={(value) => update({ tripPurpose: value as TripPurpose })}
        />

        <FormSelect
          id="transmission"
          label="Preferred transmission"
          value={values.transmission}
          options={[
            { value: "any", label: "No preference" },
            { value: "automatic", label: "Automatic" },
            { value: "manual", label: "Manual" },
          ]}
          onChange={(value) =>
            update({ transmission: value as Transmission | "any" })
          }
        />

        <FormSelect
          id="fuel"
          label="Fuel preference"
          value={values.fuelPreference}
          options={[
            { value: "any", label: "No preference" },
            { value: "gasoline", label: "Gasoline" },
            { value: "diesel", label: "Diesel" },
            { value: "electric", label: "Electric" },
            { value: "hybrid", label: "Hybrid" },
          ]}
          onChange={(value) =>
            update({ fuelPreference: value as FuelType | "any" })
          }
        />

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="duration">Rental duration (days)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            max={30}
            value={values.rentalDuration}
            onChange={(e) =>
              update({ rentalDuration: Number(e.target.value) || 1 })
            }
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Get recommendations
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange(defaultRecommendationInput)}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
