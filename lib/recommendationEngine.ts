import { vehicles as defaultVehicles } from "@/data/vehicles";
import { formatPHP, formatPHPPerDay } from "@/lib/currency";
import type {
  FuelType,
  Transmission,
  Vehicle,
  VehicleType,
} from "@/types/vehicle";

export type TripPurpose =
  | "business"
  | "family"
  | "adventure"
  | "city_commute"
  | "leisure"
  | "road_trip";

export type RecommendationInput = {
  budgetPerDay: number;
  passengers: number;
  vehicleType: VehicleType | "any";
  tripPurpose: TripPurpose;
  transmission: Transmission | "any";
  fuelPreference: FuelType | "any";
  rentalDuration: number;
};

export type ScoredRecommendation = {
  vehicle: Vehicle;
  score: number;
  matchPercent: number;
  estimatedTotalCost: number;
  highlights: string[];
  concerns: string[];
};

export type RecommendationResult = {
  best: ScoredRecommendation | null;
  alternatives: ScoredRecommendation[];
  explanation: string;
};

const MAX_SCORE = 100;

const TRIP_PURPOSE_LABELS: Record<TripPurpose, string> = {
  business: "business travel",
  family: "family trips",
  adventure: "adventure rides",
  city_commute: "city commuting",
  leisure: "leisure outings",
  road_trip: "road trips",
};

function scoreBudget(
  vehicle: Vehicle,
  budgetPerDay: number
): { points: number; highlight?: string; concern?: string } {
  if (budgetPerDay <= 0) {
    return { points: 0, concern: "Budget per day must be greater than zero." };
  }

  if (vehicle.dailyRate <= budgetPerDay) {
    const underBudgetRatio = (budgetPerDay - vehicle.dailyRate) / budgetPerDay;
    const points = 20 + Math.min(5, underBudgetRatio * 12);
    return {
      points,
      highlight:
        vehicle.dailyRate <= budgetPerDay * 0.85
          ? `Strong value at ${formatPHPPerDay(vehicle.dailyRate)} — well within your ${formatPHP(budgetPerDay)}/day budget.`
          : `Fits your budget at ${formatPHPPerDay(vehicle.dailyRate)}.`,
    };
  }

  const overRatio = (vehicle.dailyRate - budgetPerDay) / budgetPerDay;
  const points = Math.max(0, 22 - overRatio * 40);

  return {
    points,
    concern: `Daily rate of ${formatPHPPerDay(vehicle.dailyRate)} exceeds your ${formatPHP(budgetPerDay)}/day budget.`,
  };
}

function scorePassengers(
  vehicle: Vehicle,
  passengers: number
): { points: number; highlight?: string; concern?: string } {
  if (passengers <= 0) {
    return { points: 0, concern: "Passenger count must be at least one." };
  }

  if (vehicle.seats >= passengers) {
    return {
      points: 20,
      highlight: `Comfortably seats ${vehicle.seats} — enough for your group of ${passengers}.`,
    };
  }

  return {
    points: 0,
    concern: `Only ${vehicle.seats} seat${vehicle.seats === 1 ? "" : "s"} available — not enough for ${passengers} passengers.`,
  };
}

function scoreVehicleType(
  vehicle: Vehicle,
  vehicleType: VehicleType | "any"
): { points: number; highlight?: string; concern?: string } {
  if (vehicleType === "any") {
    return { points: 12, highlight: "Flexible on vehicle type." };
  }

  if (vehicle.type === vehicleType) {
    return {
      points: 15,
      highlight: `Matches your preferred ${vehicleType} type.`,
    };
  }

  return {
    points: 0,
    concern: `You asked for a ${vehicleType}, but this is a ${vehicle.type}.`,
  };
}

function scoreTripPurpose(
  vehicle: Vehicle,
  tripPurpose: TripPurpose
): { points: number; highlight?: string } {
  let points = 8;

  switch (tripPurpose) {
    case "business":
      if (vehicle.type === "car" && vehicle.transmission === "automatic") {
        points = 15;
      } else if (vehicle.type === "car") {
        points = 11;
      } else {
        points = 4;
      }
      break;
    case "family":
      if (vehicle.type === "car" && vehicle.seats >= 5) {
        points = 15;
      } else if (vehicle.type === "car") {
        points = 11;
      } else {
        points = 3;
      }
      break;
    case "adventure":
      if (vehicle.type === "motorcycle") {
        points = 15;
      } else if (vehicle.features.some((f) => /wheel|tour/i.test(f))) {
        points = 11;
      } else {
        points = 6;
      }
      break;
    case "city_commute":
      if (vehicle.dailyRate <= 3000) {
        points = 15;
      } else if (vehicle.dailyRate <= 4500) {
        points = 11;
      } else {
        points = 7;
      }
      break;
    case "leisure":
      if (vehicle.rating >= 4.8) {
        points = 15;
      } else if (vehicle.rating >= 4.6) {
        points = 12;
      } else {
        points = 9;
      }
      break;
    case "road_trip":
      if (
        vehicle.type === "motorcycle" &&
        vehicle.features.some((f) => /tour|saddlebag|windshield/i.test(f))
      ) {
        points = 15;
      } else if (vehicle.type === "car" && vehicle.seats >= 5) {
        points = 13;
      } else {
        points = 8;
      }
      break;
  }

  return {
    points,
    highlight: `Well suited for ${TRIP_PURPOSE_LABELS[tripPurpose]}.`,
  };
}

function scoreTransmission(
  vehicle: Vehicle,
  transmission: Transmission | "any"
): { points: number; highlight?: string; concern?: string } {
  if (transmission === "any") {
    return { points: 8 };
  }

  if (vehicle.transmission === transmission) {
    return {
      points: 10,
      highlight: `${transmission.charAt(0).toUpperCase() + transmission.slice(1)} transmission as requested.`,
    };
  }

  return {
    points: 2,
    concern: `Has ${vehicle.transmission} transmission, not your preferred ${transmission}.`,
  };
}

function scoreFuel(
  vehicle: Vehicle,
  fuelPreference: FuelType | "any"
): { points: number; highlight?: string; concern?: string } {
  if (fuelPreference === "any") {
    return { points: 8 };
  }

  if (vehicle.fuelType === fuelPreference) {
    return {
      points: 10,
      highlight: `Uses your preferred ${fuelPreference} fuel type.`,
    };
  }

  return {
    points: 2,
    concern: `Runs on ${vehicle.fuelType}, not your preferred ${fuelPreference}.`,
  };
}

function scoreAvailability(vehicle: Vehicle): {
  points: number;
  highlight?: string;
  concern?: string;
} {
  if (vehicle.availability) {
    return { points: 5, highlight: "Currently available to book." };
  }

  return {
    points: 0,
    concern: "Currently unavailable — consider an alternative.",
  };
}

function scoreRating(vehicle: Vehicle): { points: number; highlight?: string } {
  const points = (vehicle.rating / 5) * 5;
  return {
    points,
    highlight: `Rated ${vehicle.rating.toFixed(1)} by renters.`,
  };
}

function scoreVehicle(
  vehicle: Vehicle,
  input: RecommendationInput
): ScoredRecommendation {
  const budget = scoreBudget(vehicle, input.budgetPerDay);
  const passengers = scorePassengers(vehicle, input.passengers);
  const type = scoreVehicleType(vehicle, input.vehicleType);
  const purpose = scoreTripPurpose(vehicle, input.tripPurpose);
  const transmission = scoreTransmission(vehicle, input.transmission);
  const fuel = scoreFuel(vehicle, input.fuelPreference);
  const availability = scoreAvailability(vehicle);
  const rating = scoreRating(vehicle);

  const score =
    budget.points +
    passengers.points +
    type.points +
    purpose.points +
    transmission.points +
    fuel.points +
    availability.points +
    rating.points;

  const highlights = [
    budget.highlight,
    passengers.highlight,
    type.highlight,
    purpose.highlight,
    transmission.highlight,
    fuel.highlight,
    availability.highlight,
    rating.highlight,
  ].filter((item): item is string => Boolean(item));

  const concerns = [
    budget.concern,
    passengers.concern,
    type.concern,
    transmission.concern,
    fuel.concern,
    availability.concern,
  ].filter((item): item is string => Boolean(item));

  return {
    vehicle,
    score,
    matchPercent: Math.round(Math.min(100, (score / MAX_SCORE) * 100)),
    estimatedTotalCost: vehicle.dailyRate * input.rentalDuration,
    highlights,
    concerns,
  };
}

function buildExplanation(
  best: ScoredRecommendation,
  input: RecommendationInput
): string {
  const { vehicle } = best;
  const purposeLabel = TRIP_PURPOSE_LABELS[input.tripPurpose];
  const topHighlights = best.highlights.slice(0, 3).join(" ");

  return [
    `Based on your ${purposeLabel} needs, ${formatPHPPerDay(input.budgetPerDay)} budget, and ${input.passengers} passenger${input.passengers === 1 ? "" : "s"}, we recommend the ${vehicle.name}.`,
    topHighlights,
    `For a ${input.rentalDuration}-day rental, your estimated total is ${formatPHP(best.estimatedTotalCost)}.`,
  ].join(" ");
}

export function getRecommendations(
  input: RecommendationInput,
  fleet: Vehicle[] = defaultVehicles
): RecommendationResult {
  const scored = fleet
    .map((vehicle) => scoreVehicle(vehicle, input))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.vehicle.availability !== b.vehicle.availability) {
        return a.vehicle.availability ? -1 : 1;
      }
      return b.vehicle.rating - a.vehicle.rating;
    });

  const best = scored[0] ?? null;
  const alternatives = scored.slice(1, 4);

  if (!best) {
    return {
      best: null,
      alternatives: [],
      explanation: "No vehicles are available to recommend.",
    };
  }

  return {
    best,
    alternatives,
    explanation: buildExplanation(best, input),
  };
}

export const defaultRecommendationInput: RecommendationInput = {
  budgetPerDay: 3500,
  passengers: 2,
  vehicleType: "any",
  tripPurpose: "leisure",
  transmission: "any",
  fuelPreference: "any",
  rentalDuration: 3,
};
