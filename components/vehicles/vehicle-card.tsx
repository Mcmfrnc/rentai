import Link from "next/link";
import {
  Bike,
  Car,
  Fuel,
  MapPin,
  Settings2,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { VehicleImage } from "@/components/vehicles/vehicle-image";
import { formatPHPPerDay } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { formatLabel } from "@/lib/vehicle-filters";
import type { Vehicle } from "@/types/vehicle";

type VehicleCardProps = {
  vehicle: Vehicle;
  className?: string;
};

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-primary/5",
        !vehicle.availability && "opacity-90",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <VehicleImage
          src={vehicle.image}
          alt={vehicle.name}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            {formatLabel(vehicle.type)}
          </Badge>
          <Badge
            variant={vehicle.availability ? "default" : "outline"}
            className={cn(
              vehicle.availability
                ? "bg-emerald-600 text-white hover:bg-emerald-600"
                : "bg-background/90 backdrop-blur-sm"
            )}
          >
            {vehicle.availability ? "Available" : "Unavailable"}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-sm font-medium backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {vehicle.rating.toFixed(1)}
        </div>
      </div>

      <CardHeader className="space-y-2 pb-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {vehicle.brand}
          </p>
          <h3 className="text-lg font-semibold leading-tight">{vehicle.name}</h3>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {vehicle.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" />
            {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 shrink-0" />
            {formatLabel(vehicle.transmission)}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 shrink-0" />
            {formatLabel(vehicle.fuelType)}
          </span>
          <span className="flex items-center gap-1.5">
            {vehicle.type === "motorcycle" ? (
              <Bike className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Car className="h-3.5 w-3.5 shrink-0" />
            )}
            {vehicle.model}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {vehicle.location}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-4 dark:bg-muted/20">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            {formatPHPPerDay(vehicle.dailyRate)}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
