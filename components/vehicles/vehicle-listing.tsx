"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { VehicleFilter } from "@/components/vehicles/vehicle-filter";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import {
  defaultVehicleFilters,
  filterAndSortVehicles,
  getPriceBounds,
  getUniqueSeats,
} from "@/lib/vehicle-filters";
import { getVehicles, VEHICLES_UPDATED_EVENT } from "@/lib/vehicleStorage";
import type { Vehicle } from "@/types/vehicle";

export function VehicleListing() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState(defaultVehicleFilters);

  const refreshVehicles = useCallback(() => {
    setVehicles(getVehicles());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refreshVehicles();
    const handleUpdate = () => refreshVehicles();
    window.addEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
    return () =>
      window.removeEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
  }, [refreshVehicles]);

  const seatOptions = useMemo(() => getUniqueSeats(vehicles), [vehicles]);
  const priceBounds = useMemo(() => getPriceBounds(vehicles), [vehicles]);

  const filteredVehicles = useMemo(
    () => filterAndSortVehicles(vehicles, filters),
    [vehicles, filters]
  );

  if (!isLoaded) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Vehicles"
          description="Browse our fleet of cars and motorcycles. Filter by type, price, and features to find your perfect ride."
        />
        <p className="text-sm text-muted-foreground">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Vehicles"
        description="Browse our fleet of cars and motorcycles. Filter by type, price, and features to find your perfect ride."
        badge={`${filteredVehicles.length} of ${vehicles.length} vehicles`}
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <VehicleFilter
          filters={filters}
          onChange={setFilters}
          seatOptions={seatOptions}
          priceMin={priceBounds.min}
          priceMax={priceBounds.max}
          className="lg:w-72 lg:shrink-0"
        />

        <div className="min-w-0 flex-1 space-y-4">
          <p className="text-sm text-muted-foreground">
            {filteredVehicles.length === vehicles.length
              ? "Showing all vehicles"
              : `Showing ${filteredVehicles.length} matching vehicle${filteredVehicles.length === 1 ? "" : "s"}`}
          </p>
          <VehicleGrid
            vehicles={filteredVehicles}
            onClearFilters={() => setFilters(defaultVehicleFilters)}
          />
        </div>
      </div>
    </div>
  );
}
