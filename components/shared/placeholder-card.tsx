import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PlaceholderCardProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PlaceholderCard({
  title,
  description = "Content coming soon.",
  className,
}: PlaceholderCardProps) {
  return (
    <Card className={cn("border-dashed border-border dark:bg-card", className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-32 items-center justify-center rounded-lg bg-muted/50 text-sm text-muted-foreground dark:bg-muted/30">
          Placeholder
        </div>
      </CardContent>
    </Card>
  );
}
