import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import type { Vehicle } from "@/types/vehicle";

type VehicleGridProps = {
  vehicles: Vehicle[];
  onClearFilters?: () => void;
};

export function VehicleGrid({ vehicles, onClearFilters }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No vehicles found</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Try adjusting your search or filters to find what you&apos;re looking
          for.
        </p>
        {onClearFilters ? (
          <Button variant="outline" className="mt-6" onClick={onClearFilters}>
            Clear all filters
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
