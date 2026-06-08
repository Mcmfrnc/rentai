export type VehicleType = "car" | "motorcycle";

export type Transmission = "automatic" | "manual";

export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: VehicleType;
  image: string;
  dailyRate: number;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  rating: number;
  location: string;
  availability: boolean;
  features: string[];
  description: string;
};
