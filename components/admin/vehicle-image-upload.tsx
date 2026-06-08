"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import {
  fileToDataUrl,
  validateImageFile,
} from "@/lib/vehicleImage";

type VehicleImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};

export function VehicleImageUpload({
  value,
  onChange,
}: VehicleImageUploadProps) {
  const [imageError, setImageError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setImageError(null);
      onChange(dataUrl);
    } catch {
      setImageError("Failed to read image file. Please try another image.");
    }
  };

  const handleUrlChange = (url: string) => {
    setImageError(null);
    onChange(url);
  };

  return (
    <div className="space-y-4 sm:col-span-2">
      <div className="space-y-2">
        <Label htmlFor="vehicle-image-upload">Vehicle image</Label>
        <Input
          id="vehicle-image-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium"
        />
        <p className="text-xs text-muted-foreground">
          Images are stored locally in your browser for this portfolio demo.
        </p>
        {imageError ? (
          <p className="text-xs text-destructive">{imageError}</p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-muted">
        <div className="aspect-[16/10] w-full">
          <VehicleImage
            src={value}
            alt="Vehicle preview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vehicle-image-url">Or paste image URL</Label>
        <Input
          id="vehicle-image-url"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://... or /images/vehicle.jpg"
        />
        <p className="text-xs text-muted-foreground">
          Supports uploaded images, public paths, and external URLs.
        </p>
      </div>

      {value ? (
        <Button type="button" variant="outline" size="sm" onClick={() => onChange("")}>
          Remove image
        </Button>
      ) : null}
    </div>
  );
}
