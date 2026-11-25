import { cn } from "@/lib/format";

/**
 * CSS-drawn phone-case placeholder (no image download → fast).
 * Swap for real product photos once they are available.
 */
export function CaseArt({
  color,
  className,
  background = "bg-surf",
  caseClassName,
  label,
}: {
  color: string;
  className?: string;
  background?: string;
  caseClassName?: string;
  /** Accessible label; omit when the art is decorative. */
  label?: string;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", background, className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Case color={color} className={cn("h-[82%]", caseClassName)} />
    </div>
  );
}

export function Case({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("relative aspect-[1/2.05] rounded-[22%/10.7%] shadow-[0_8px_20px_rgba(0,0,0,0.14)]", className)}
      style={{ backgroundColor: color, ...style }}
    >
      <div className="absolute left-[10%] top-[4.9%] aspect-square w-[42%] rounded-[30%] bg-black/15">
        <span className="absolute left-[28%] top-[28%] aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50" />
        <span className="absolute left-[28%] top-[72%] aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50" />
        <span className="absolute left-[72%] top-[50%] aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50" />
      </div>
    </div>
  );
}
