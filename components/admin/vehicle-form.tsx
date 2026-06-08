"use client";

import { useState } from "react";

import { VehicleImageUpload } from "@/components/admin/vehicle-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createEmptyVehicleForm,
  type VehicleFormErrors,
  type VehicleFormValues,
  validateVehicleForm,
} from "@/lib/vehicleStorage";
import type { FuelType, Transmission, VehicleType } from "@/types/vehicle";
import { cn } from "@/lib/utils";

type VehicleFormProps = {
  initialValues?: VehicleFormValues;
  submitLabel: string;
  onSubmit: (values: VehicleFormValues) => void;
  onCancel: () => void;
};

function FormSelect({
  id,
  label,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-background",
          error && "border-destructive"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export function VehicleForm({
  initialValues = createEmptyVehicleForm(),
  submitLabel,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const [values, setValues] = useState<VehicleFormValues>(initialValues);
  const [errors, setErrors] = useState<VehicleFormErrors>({});

  const update = (partial: Partial<VehicleFormValues>) => {
    setValues((current) => ({ ...current, ...partial }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateVehicleForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name *" error={errors.name}>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => update({ name: e.target.value })}
            className={errors.name ? "border-destructive" : ""}
          />
        </Field>

        <Field id="brand" label="Brand *" error={errors.brand}>
          <Input
            id="brand"
            value={values.brand}
            onChange={(e) => update({ brand: e.target.value })}
            className={errors.brand ? "border-destructive" : ""}
          />
        </Field>

        <Field id="model" label="Model *" error={errors.model}>
          <Input
            id="model"
            value={values.model}
            onChange={(e) => update({ model: e.target.value })}
            className={errors.model ? "border-destructive" : ""}
          />
        </Field>

        <FormSelect
          id="type"
          label="Type *"
          value={values.type}
          error={errors.type}
          options={[
            { value: "car", label: "Car" },
            { value: "motorcycle", label: "Motorcycle" },
          ]}
          onChange={(value) => update({ type: value as VehicleType })}
        />

        <VehicleImageUpload
          value={values.image}
          onChange={(image) => update({ image })}
        />

        <Field id="dailyRate" label="Daily rate (PHP) *" error={errors.dailyRate}>
          <Input
            id="dailyRate"
            type="number"
            min={1}
            value={values.dailyRate}
            onChange={(e) => update({ dailyRate: Number(e.target.value) || 0 })}
            className={errors.dailyRate ? "border-destructive" : ""}
          />
        </Field>

        <Field id="seats" label="Seats *" error={errors.seats}>
          <Input
            id="seats"
            type="number"
            min={1}
            value={values.seats}
            onChange={(e) => update({ seats: Number(e.target.value) || 0 })}
            className={errors.seats ? "border-destructive" : ""}
          />
        </Field>

        <FormSelect
          id="transmission"
          label="Transmission"
          value={values.transmission}
          options={[
            { value: "automatic", label: "Automatic" },
            { value: "manual", label: "Manual" },
          ]}
          onChange={(value) => update({ transmission: value as Transmission })}
        />

        <FormSelect
          id="fuelType"
          label="Fuel type"
          value={values.fuelType}
          options={[
            { value: "gasoline", label: "Gasoline" },
            { value: "diesel", label: "Diesel" },
            { value: "electric", label: "Electric" },
            { value: "hybrid", label: "Hybrid" },
          ]}
          onChange={(value) => update({ fuelType: value as FuelType })}
        />

        <Field id="rating" label="Rating (1–5) *" error={errors.rating}>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={values.rating}
            onChange={(e) => update({ rating: Number(e.target.value) || 0 })}
            className={errors.rating ? "border-destructive" : ""}
          />
        </Field>

        <Field id="location" label="Location" error={undefined}>
          <Input
            id="location"
            value={values.location}
            onChange={(e) => update({ location: e.target.value })}
          />
        </Field>

        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            id="availability"
            type="checkbox"
            checked={values.availability}
            onChange={(e) => update({ availability: e.target.checked })}
            className="h-4 w-4 rounded border-input"
          />
          <Label htmlFor="availability">Available for rental</Label>
        </div>

        <Field id="features" label="Features (comma-separated)" error={undefined}>
          <Input
            id="features"
            value={values.features.join(", ")}
            onChange={(e) =>
              update({
                features: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Bluetooth, GPS, Backup Camera"
          />
        </Field>

        <Field id="description" label="Description" error={undefined}>
          <textarea
            id="description"
            value={values.description}
            onChange={(e) => update({ description: e.target.value })}
            rows={3}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-background"
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
