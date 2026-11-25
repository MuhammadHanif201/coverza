import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";

export type Step = { title: string; text: string };

/** `current` = index of the step in progress; earlier steps show as done. */
export function OrderTimeline({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-green-600 text-white" : active ? "border-2 border-green-600 bg-white" : "bg-surf",
                )}
              >
                {done && <Icon name="check" size={13} strokeWidth={3} />}
              </span>
              {i < steps.length - 1 && <span className={cn("my-1 w-0.5 flex-1 min-h-7", done ? "bg-green-600" : "bg-line")} />}
            </div>
            <div className="pb-5">
              <p className={cn("text-sm font-semibold sm:text-[15px]", !done && !active && "text-muted")}>{s.title}</p>
              <p className="text-xs text-muted sm:text-[13px]">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
