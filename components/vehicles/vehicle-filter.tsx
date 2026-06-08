"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPHP, formatPHPRange } from "@/lib/currency";
import {
  countActiveFilters,
  defaultVehicleFilters,
  formatLabel,
  type SortOption,
  type VehicleFilterState,
} from "@/lib/vehicle-filters";
import type { FuelType, Transmission, VehicleType } from "@/types/vehicle";
import { cn } from "@/lib/utils";

type VehicleFilterProps = {
  filters: VehicleFilterState;
  onChange: (filters: VehicleFilterState) => void;
  seatOptions: number[];
  priceMin: number;
  priceMax: number;
  className?: string;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating" },
];

const typeOptions: { value: VehicleType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "car", label: "Cars" },
  { value: "motorcycle", label: "Motorcycles" },
];

const fuelOptions: { value: FuelType | "all"; label: string }[] = [
  { value: "all", label: "All Fuel Types" },
  { value: "gasoline", label: "Gasoline" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

const transmissionOptions: {
  value: Transmission | "all";
  label: string;
}[] = [
  { value: "all", label: "All Transmissions" },
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

function FilterSelect({
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

function FilterPanel({
  filters,
  onChange,
  seatOptions,
  priceMin,
  priceMax,
}: Omit<VehicleFilterProps, "className">) {
  const update = (partial: Partial<VehicleFilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const lowThreshold = Math.ceil((priceMin + priceMax) / 3 / 50) * 50;
  const highThreshold = Math.ceil((2 * (priceMin + priceMax)) / 3 / 50) * 50;

  const priceRanges = [
    { label: "Any price", min: null, max: null },
    { label: `Under ${formatPHP(lowThreshold)}`, min: null, max: lowThreshold },
    {
      label: formatPHPRange(lowThreshold, highThreshold),
      min: lowThreshold,
      max: highThreshold,
    },
    { label: `Over ${formatPHP(highThreshold)}`, min: highThreshold, max: null },
  ];

  const currentPriceKey = `${filters.minPrice ?? ""}-${filters.maxPrice ?? ""}`;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="vehicle-search">Search</Label>
        <Input
          id="vehicle-search"
          type="search"
          placeholder="Search by name, brand, location..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <Separator />

      <FilterSelect
        id="vehicle-type"
        label="Type"
        value={filters.type}
        options={typeOptions}
        onChange={(value) =>
          update({ type: value as VehicleType | "all" })
        }
      />

      <FilterSelect
        id="vehicle-price"
        label="Price Range"
        value={currentPriceKey}
        options={priceRanges.map((range) => ({
          value: `${range.min ?? ""}-${range.max ?? ""}`,
          label: range.label,
        }))}
        onChange={(value) => {
          const [min, max] = value.split("-");
          update({
            minPrice: min === "" ? null : Number(min),
            maxPrice: max === "" ? null : Number(max),
          });
        }}
      />

      <FilterSelect
        id="vehicle-fuel"
        label="Fuel Type"
        value={filters.fuelType}
        options={fuelOptions}
        onChange={(value) =>
          update({ fuelType: value as FuelType | "all" })
        }
      />

      <FilterSelect
        id="vehicle-transmission"
        label="Transmission"
        value={filters.transmission}
        options={transmissionOptions}
        onChange={(value) =>
          update({ transmission: value as Transmission | "all" })
        }
      />

      <FilterSelect
        id="vehicle-seats"
        label="Seats"
        value={filters.seats}
        options={[
          { value: "all", label: "Any seats" },
          ...seatOptions.map((seats) => ({
            value: seats,
            label: `${seats} seats`,
          })),
        ]}
        onChange={(value) =>
          update({
            seats: value === "all" ? "all" : Number(value),
          })
        }
      />

      <Separator />

      <FilterSelect
        id="vehicle-sort"
        label="Sort By"
        value={filters.sort}
        options={sortOptions}
        onChange={(value) => update({ sort: value as SortOption })}
      />
    </div>
  );
}

export function VehicleFilter({
  filters,
  onChange,
  seatOptions,
  priceMin,
  priceMax,
  className,
}: VehicleFilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  const handleReset = () => {
    onChange({ ...defaultVehicleFilters, search: filters.search });
  };

  const handleClearAll = () => {
    onChange(defaultVehicleFilters);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <div className={cn("lg:hidden", className)}>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 ? (
              <Badge variant="secondary" className="ml-1">
                {activeCount}
              </Badge>
            ) : null}
          </Button>
          {activeCount > 0 ? (
            <Button variant="ghost" size="icon" onClick={handleClearAll}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear filters</span>
            </Button>
          ) : null}
        </div>

        {mobileOpen ? (
          <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
            <FilterPanel
              filters={filters}
              onChange={onChange}
              seatOptions={seatOptions}
              priceMin={priceMin}
              priceMax={priceMax}
            />
            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReset}
              >
                Reset filters
              </Button>
              <Button className="flex-1" onClick={() => setMobileOpen(false)}>
                Show results
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:block lg:sticky lg:top-24 lg:self-start",
          className
        )}
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:bg-card">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Filters</h2>
            {activeCount > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 py-1 text-xs"
                onClick={handleReset}
              >
                Reset
              </Button>
            ) : null}
          </div>
          <FilterPanel
            filters={filters}
            onChange={onChange}
            seatOptions={seatOptions}
            priceMin={priceMin}
            priceMax={priceMax}
          />
        </div>
      </aside>
    </>
  );
}
