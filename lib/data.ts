export interface Part {
  id: string;
  name: string;
  brand: string;
  carBrand: string;
  carModel: string;
  yearFrom: number;
  yearTo: number;
  category: "Engine" | "Brakes" | "Lighting" | "Electrical" | "Cooling" | "Suspension";
  type: "OEM" | "Aftermarket" | "Imported";
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  part: Part;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export const carData: Record<string, Record<string, number[]>> = {
  Toyota: {
    Corolla: [2018, 2019, 2020, 2021, 2022],
    Camry: [2019, 2020, 2021, 2022],
  },
  Hyundai: {
    Elantra: [2019, 2020, 2021, 2022],
    Tucson: [2020, 2021, 2022],
  },
  Kia: {
    Cerato: [2019, 2020, 2021, 2022],
    Sportage: [2020, 2021, 2022],
  },
  Nissan: {
    Sunny: [2018, 2019, 2020, 2021, 2022],
    "X-Trail": [2019, 2020, 2021, 2022],
  },
};

export const categories = [
  { name: "Engine", icon: "⚙️", description: "Engine components and filters" },
  { name: "Brakes", icon: "🛑", description: "Brake pads, discs, and calipers" },
  { name: "Lighting", icon: "💡", description: "Headlights, tail lights, and bulbs" },
  { name: "Electrical", icon: "⚡", description: "Batteries, alternators, and wiring" },
  { name: "Cooling", icon: "❄️", description: "Radiators, fans, and thermostats" },
  { name: "Suspension", icon: "🔧", description: "Shocks, struts, and joints" },
] as const;

export const egyptianCities = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Shubra El Kheima",
  "Port Said",
  "Suez",
  "Luxor",
  "Aswan",
  "Mansoura",
  "Tanta",
  "Ismailia",
  "Faiyum",
  "Zagazig",
  "Damietta",
  "Hurghada",
];

export function formatPrice(price: number): string {
  return `EGP ${price.toLocaleString("en-US")}`;
}

export function getBadgeClass(type: string): string {
  switch (type) {
    case "OEM":
      return "badge badge-oem";
    case "Aftermarket":
      return "badge badge-aftermarket";
    case "Imported":
      return "badge badge-imported";
    default:
      return "badge";
  }
}
