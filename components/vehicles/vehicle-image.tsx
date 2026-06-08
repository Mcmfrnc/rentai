"use client";

import { useEffect, useState } from "react";

import {
  getVehiclePlaceholderImage,
  resolveVehicleImageSrc,
} from "@/lib/vehicleImage";
import { cn } from "@/lib/utils";

type VehicleImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
};

export function VehicleImage({ src, alt, className }: VehicleImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveVehicleImageSrc(src));

  useEffect(() => {
    setImgSrc(resolveVehicleImageSrc(src));
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setImgSrc(getVehiclePlaceholderImage())}
    />
  );
}
