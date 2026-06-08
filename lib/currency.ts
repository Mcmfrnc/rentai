export function formatPHP(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { maximumFractionDigits: 0 })}`;
}

export function formatPHPPerDay(amount: number): string {
  return `${formatPHP(amount)}/day`;
}

export function formatPHPRange(min: number, max: number): string {
  return `${formatPHP(min)} – ${formatPHP(max)}`;
}
