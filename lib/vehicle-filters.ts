import type {
  FuelType,
  Transmission,
  Vehicle,
  VehicleType,
} from "@/types/vehicle";

export type SortOption = "price-asc" | "price-desc" | "rating-desc";

export type VehicleFilterState = {
  search: string;
  type: VehicleType | "all";
  fuelType: FuelType | "all";
  transmission: Transmission | "all";
  seats: number | "all";
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOption;
};

export const defaultVehicleFilters: VehicleFilterState = {
  search: "",
  type: "all",
  fuelType: "all",
  transmission: "all",
  seats: "all",
  minPrice: null,
  maxPrice: null,
  sort: "price-asc",
};

export function filterAndSortVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilterState
): Vehicle[] {
  const query = filters.search.trim().toLowerCase();

  const filtered = vehicles.filter((vehicle) => {
    if (query) {
      const searchable = [
        vehicle.name,
        vehicle.brand,
        vehicle.model,
        vehicle.location,
        vehicle.description,
        ...vehicle.features,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(query)) return false;
    }

    if (filters.type !== "all" && vehicle.type !== filters.type) return false;
    if (filters.fuelType !== "all" && vehicle.fuelType !== filters.fuelType)
      return false;
    if (
      filters.transmission !== "all" &&
      vehicle.transmission !== filters.transmission
    )
      return false;
    if (filters.seats !== "all" && vehicle.seats !== filters.seats)
      return false;
    if (filters.minPrice !== null && vehicle.dailyRate < filters.minPrice)
      return false;
    if (filters.maxPrice !== null && vehicle.dailyRate > filters.maxPrice)
      return false;

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-desc":
        return b.dailyRate - a.dailyRate;
      case "rating-desc":
        return b.rating - a.rating;
      case "price-asc":
      default:
        return a.dailyRate - b.dailyRate;
    }
  });
}

export function getUniqueSeats(vehicles: Vehicle[]): number[] {
  return [...new Set(vehicles.map((v) => v.seats))].sort((a, b) => a - b);
}

export function getPriceBounds(vehicles: Vehicle[]): {
  min: number;
  max: number;
} {
  if (vehicles.length === 0) {
    return { min: 0, max: 0 };
  }

  const rates = vehicles.map((v) => v.dailyRate);
  return {
    min: Math.min(...rates),
    max: Math.max(...rates),
  };
}

export function countActiveFilters(filters: VehicleFilterState): number {
  let count = 0;
  if (filters.type !== "all") count++;
  if (filters.fuelType !== "all") count++;
  if (filters.transmission !== "all") count++;
  if (filters.seats !== "all") count++;
  if (filters.minPrice !== null || filters.maxPrice !== null) count++;
  return count;
}

export function formatLabel(value: string): string {
  return value
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
