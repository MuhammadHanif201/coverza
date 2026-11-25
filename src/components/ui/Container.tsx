import { cn } from "@/lib/format";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "section" | "nav" | "header" | "footer";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-5", className)}>{children}</Tag>;
}
