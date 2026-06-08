import type { Vehicle } from "@/types/vehicle";

export const vehicles: Vehicle[] = [
  {
    id: "veh-001",
    name: "Toyota Camry SE",
    brand: "Toyota",
    model: "Camry",
    type: "car",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    dailyRate: 2800,
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    rating: 4.7,
    location: "Downtown Seattle",
    availability: true,
    features: [
      "Apple CarPlay",
      "Android Auto",
      "Backup Camera",
      "Bluetooth",
      "Cruise Control",
    ],
    description:
      "Reliable midsize sedan ideal for city driving and business trips. Comfortable interior with excellent fuel economy.",
  },
  {
    id: "veh-002",
    name: "BMW X5 xDrive40i",
    brand: "BMW",
    model: "X5",
    type: "car",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    dailyRate: 7500,
    seats: 5,
    transmission: "automatic",
    fuelType: "gasoline",
    rating: 4.9,
    location: "Bellevue Hub",
    availability: true,
    features: [
      "Panoramic Sunroof",
      "Leather Seats",
      "Navigation System",
      "Heated Seats",
      "All-Wheel Drive",
    ],
    description:
      "Premium luxury SUV with spacious cabin and powerful performance. Perfect for family trips and weekend getaways.",
  },
  {
    id: "veh-003",
    name: "Harley-Davidson Street Glide",
    brand: "Harley-Davidson",
    model: "Street Glide",
    type: "motorcycle",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    dailyRate: 4200,
    seats: 2,
    transmission: "manual",
    fuelType: "gasoline",
    rating: 4.8,
    location: "Pike Place Station",
    availability: true,
    features: [
      "Touring Windshield",
      "Saddlebags",
      "Cruise Control",
      "ABS Brakes",
      "Infotainment System",
    ],
    description:
      "Iconic touring motorcycle built for open-road adventures. Classic Harley style with modern touring comfort.",
  },
  {
    id: "veh-004",
    name: "Honda CB500F",
    brand: "Honda",
    model: "CB500F",
    type: "motorcycle",
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80",
    dailyRate: 1950,
    seats: 2,
    transmission: "manual",
    fuelType: "gasoline",
    rating: 4.6,
    location: "Capitol Hill Depot",
    availability: false,
    features: [
      "LED Lighting",
      "Digital Display",
      "ABS Brakes",
      "Lightweight Frame",
      "Fuel Efficient",
    ],
    description:
      "Versatile naked sport bike suited for urban commutes and scenic coastal rides. Easy handling for intermediate riders.",
  },
];
