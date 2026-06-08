export const siteConfig = {
  name: "RentAI",
  description: "Smart vehicle rental powered by AI",
  url: "https://rentai.example.com",
} as const;

export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Vehicles", href: "/vehicles" },
  { title: "Booking", href: "/booking" },
  { title: "AI Assistant", href: "/assistant" },
];

export const footerNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Vehicles", href: "/vehicles" },
  { title: "Admin", href: "/admin" },
];
