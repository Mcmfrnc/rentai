import { vehicles as defaultVehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";

const STORAGE_KEY = "rentai-vehicles";

export const VEHICLES_UPDATED_EVENT = "rentai-vehicles-updated";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function parseVehicles(data: string): Vehicle[] | null {
  try {
    const parsed: unknown = JSON.parse(data);
    if (!Array.isArray(parsed)) return null;
    return parsed as Vehicle[];
  } catch {
    return null;
  }
}

function notifyVehiclesUpdated() {
  if (!isClient()) return;
  window.dispatchEvent(new CustomEvent(VEHICLES_UPDATED_EVENT));
}

export function getVehicles(): Vehicle[] {
  if (!isClient()) {
    return [...defaultVehicles];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [...defaultVehicles];
  }

  const parsed = parseVehicles(stored);
  return parsed ?? [...defaultVehicles];
}

export function saveVehicles(vehicles: Vehicle[]): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  notifyVehiclesUpdated();
}

export function addVehicle(vehicle: Vehicle): void {
  saveVehicles([...getVehicles(), vehicle]);
}

export function updateVehicle(vehicleId: string, updatedVehicle: Vehicle): void {
  saveVehicles(
    getVehicles().map((vehicle) =>
      vehicle.id === vehicleId ? updatedVehicle : vehicle
    )
  );
}

export function deleteVehicle(vehicleId: string): void {
  saveVehicles(getVehicles().filter((vehicle) => vehicle.id !== vehicleId));
}

export function resetVehicles(): void {
  if (!isClient()) return;
  localStorage.removeItem(STORAGE_KEY);
  notifyVehiclesUpdated();
}

export function generateVehicleId(): string {
  return `veh-${Date.now().toString(36)}`;
}

export type VehicleFormValues = Omit<Vehicle, "id">;

export type VehicleFormErrors = Partial<
  Record<keyof VehicleFormValues | "features", string>
>;

export function validateVehicleForm(
  values: VehicleFormValues
): VehicleFormErrors {
  const errors: VehicleFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.brand.trim()) {
    errors.brand = "Brand is required.";
  }

  if (!values.model.trim()) {
    errors.model = "Model is required.";
  }

  if (values.dailyRate <= 0) {
    errors.dailyRate = "Daily rate must be greater than 0.";
  }

  if (values.type !== "car" && values.type !== "motorcycle") {
    errors.type = "Type must be car or motorcycle.";
  }

  if (values.seats < 1) {
    errors.seats = "Seats must be at least 1.";
  }

  if (values.rating < 1 || values.rating > 5) {
    errors.rating = "Rating must be between 1 and 5.";
  }

  return errors;
}

export function createEmptyVehicleForm(): VehicleFormValues {
  return {
    name: "",
    brand: "",
    model: "",
    type: "car",
    image: "",
    dailyRate: 2500,
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    rating: 4.5,
    location: "",
    availability: true,
    features: [],
    description: "",
  };
}

export function vehicleToFormValues(vehicle: Vehicle): VehicleFormValues {
  const { id: _id, ...values } = vehicle;
  return values;
}
