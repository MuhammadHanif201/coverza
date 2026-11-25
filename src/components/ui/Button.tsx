import Link from "next/link";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./Icon";

type Variant = "dark" | "light" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white hover:bg-black",
  light: "bg-white text-ink hover:bg-zinc-100",
  outline: "border border-line bg-white text-ink hover:border-ink",
  ghost: "border border-white/50 text-white hover:bg-white/10",
  whatsapp: "border border-wa bg-[#EAFBF1] text-[#128C4B] hover:bg-[#dcf7e7]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  pill?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classes({ variant = "dark", size = "md", pill, className }: CommonProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50",
    pill ? "rounded-full" : "rounded-2xl",
    variants[variant],
    sizes[size],
    className,
  );
}

function Inner({ icon, iconRight, children }: CommonProps) {
  return (
    <>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </>
  );
}

export function Button(props: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, size, icon, iconRight, pill, className, children, ...rest } = props;
  return (
    <button className={classes({ variant, size, pill, className, children })} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
    </button>
  );
}

export function ButtonLink(
  props: CommonProps & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
) {
  const { variant, size, icon, iconRight, pill, className, children, href, external, ...rest } = props;
  const cls = classes({ variant, size, pill, className, children });
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
    </Link>
  );
}
