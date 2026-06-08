"use client";

import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { VehicleForm } from "@/components/admin/vehicle-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPHPPerDay } from "@/lib/currency";
import {
  addVehicle,
  deleteVehicle,
  generateVehicleId,
  getVehicles,
  resetVehicles,
  updateVehicle,
  vehicleToFormValues,
  VEHICLES_UPDATED_EVENT,
  type VehicleFormValues,
} from "@/lib/vehicleStorage";
import type { Vehicle } from "@/types/vehicle";

type FormMode =
  | { type: "closed" }
  | { type: "add" }
  | { type: "edit"; vehicleId: string };

export function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [formMode, setFormMode] = useState<FormMode>({ type: "closed" });

  const refreshVehicles = useCallback(() => {
    setVehicles(getVehicles());
  }, []);

  useEffect(() => {
    refreshVehicles();

    const handleUpdate = () => refreshVehicles();
    window.addEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
    return () =>
      window.removeEventListener(VEHICLES_UPDATED_EVENT, handleUpdate);
  }, [refreshVehicles]);

  const editingVehicle =
    formMode.type === "edit"
      ? vehicles.find((vehicle) => vehicle.id === formMode.vehicleId)
      : undefined;

  const handleAdd = (values: VehicleFormValues) => {
    addVehicle({ id: generateVehicleId(), ...values });
    setFormMode({ type: "closed" });
  };

  const handleUpdate = (values: VehicleFormValues) => {
    if (formMode.type !== "edit" || !editingVehicle) return;
    updateVehicle(formMode.vehicleId, { ...editingVehicle, ...values });
    setFormMode({ type: "closed" });
  };

  const handleDelete = (vehicle: Vehicle) => {
    const confirmed = window.confirm(
      `Delete ${vehicle.name}? This cannot be undone.`
    );
    if (!confirmed) return;
    deleteVehicle(vehicle.id);
    if (formMode.type === "edit" && formMode.vehicleId === vehicle.id) {
      setFormMode({ type: "closed" });
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset all vehicles to the default mock fleet? Your custom vehicles will be removed."
    );
    if (!confirmed) return;
    resetVehicles();
    setFormMode({ type: "closed" });
  };

  return (
    <Card className="border-border dark:bg-card">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Vehicle Management</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the fleet stored in your browser. Changes appear on the
            Vehicles page immediately.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setFormMode({ type: "add" })}
          >
            <Plus className="h-4 w-4" />
            Add vehicle
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
            Reset to defaults
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {formMode.type === "add" ? (
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-4 font-medium">Add new vehicle</h3>
            <VehicleForm
              submitLabel="Add vehicle"
              onSubmit={handleAdd}
              onCancel={() => setFormMode({ type: "closed" })}
            />
          </div>
        ) : null}

        {formMode.type === "edit" && editingVehicle ? (
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-4 font-medium">Edit vehicle</h3>
            <VehicleForm
              initialValues={vehicleToFormValues(editingVehicle)}
              submitLabel="Save changes"
              onSubmit={handleUpdate}
              onCancel={() => setFormMode({ type: "closed" })}
            />
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b bg-muted/50 dark:bg-muted/30">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Rate</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No vehicles in the fleet. Add one or reset to defaults.
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.brand} {vehicle.model}
                      </p>
                    </td>
                    <td className="px-4 py-3 capitalize">{vehicle.type}</td>
                    <td className="px-4 py-3">
                      {formatPHPPerDay(vehicle.dailyRate)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={vehicle.availability ? "default" : "outline"}
                        className={
                          vehicle.availability
                            ? "bg-emerald-600 text-white hover:bg-emerald-600"
                            : undefined
                        }
                      >
                        {vehicle.availability ? "Available" : "Unavailable"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() =>
                            setFormMode({
                              type: "edit",
                              vehicleId: vehicle.id,
                            })
                          }
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(vehicle)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
