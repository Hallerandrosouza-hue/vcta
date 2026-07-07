import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: string;
  isCurrency?: boolean;
}

export function StatCard({ title, value, change, icon, isCurrency }: StatCardProps) {
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType || LucideIcons.Activity;
  
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  const displayValue = isCurrency && typeof value === 'number' 
    ? formatCurrency(value) 
    : value.toString();

  return (
    <Card className="hover:shadow-md transition-shadow group border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon size={20} />
          </div>
        </div>
        <div className="flex items-end justify-between pt-4">
          <div>
            <div className="text-3xl font-bold tracking-tight">{displayValue}</div>
          </div>
          <div
            className={cn(
              "flex items-center text-sm font-medium px-2 py-1 rounded-md",
              isPositive && "text-green-500 bg-green-500/10",
              isNegative && "text-red-500 bg-red-500/10",
              isNeutral && "text-muted-foreground bg-secondary"
            )}
          >
            {isPositive && <TrendingUp size={16} className="mr-1" />}
            {isNegative && <TrendingDown size={16} className="mr-1" />}
            {isNeutral && <Minus size={16} className="mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
