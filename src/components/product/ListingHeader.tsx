export function ListingHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-[15px]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
