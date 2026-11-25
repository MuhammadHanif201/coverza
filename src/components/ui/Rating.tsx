import { Icon } from "./Icon";

export function Rating({ value, count, size = "sm" }: { value: number; count: number; size?: "sm" | "lg" }) {
  if (size === "sm") {
    return (
      <p className="flex items-center gap-1 text-xs font-medium text-muted">
        <Icon name="star" size={13} filled className="text-amber-500" />
        <span>{value}</span>
        <span>({count})</span>
        <span className="sr-only">out of 5 stars from {count} reviews</span>
      </p>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex text-amber-500" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size={16} filled={i < Math.round(value)} />
        ))}
      </span>
      <span className="font-semibold">{value}</span>
      <span className="text-muted">({count} reviews)</span>
      <span className="sr-only">Rated {value} out of 5</span>
    </div>
  );
}
