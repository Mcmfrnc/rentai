import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { footerNavItems, siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 dark:bg-muted/10">
      <Container className="py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold">{siteConfig.name}</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Portfolio project.
        </p>
      </Container>
    </footer>
  );
}
