"use client";

import Link from "next/link";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";

import { MainNav } from "@/components/layout/main-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/90">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Car className="h-5 w-5" aria-hidden />
            <span>{siteConfig.name}</span>
          </Link>

          <MainNav className="hidden md:flex" />

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/vehicles">Browse Vehicles</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t md:hidden",
            mobileOpen ? "max-h-96 pb-4" : "max-h-0 border-transparent"
          )}
        >
          <MainNav
            className="flex flex-col items-start pt-4"
            onNavigate={() => setMobileOpen(false)}
          />
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                Admin
              </Link>
            </Button>
            <Button asChild>
              <Link href="/vehicles" onClick={() => setMobileOpen(false)}>
                Browse Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
