import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: "cash", title: "Cash on Delivery", text: "Pay when you receive" },
  { icon: "truck", title: "Fast Delivery", text: `${site.deliveryDays}, all Pakistan` },
  { icon: "rotate", title: `${site.returnDays}-Day Easy Return`, text: "Wrong model? Free exchange" },
  { icon: "shield", title: "Perfect Fit Guarantee", text: "Exact cut-outs for your model" },
];

export function TrustStrip({ className = "mt-14 lg:mt-20" }: { className?: string }) {
  return (
    <Container as="section" className={className}>
      <h2 className="sr-only">Why shop with Coverza</h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-[20px] bg-surf p-5 sm:p-8 lg:grid-cols-4 lg:px-10">
        {items.map((i) => (
          <li key={i.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-3.5 sm:text-left">
            <span className="rounded-full bg-white p-3">
              <Icon name={i.icon} size={22} />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px] font-semibold sm:text-[15px]">{i.title}</span>
              <span className="text-xs text-muted sm:text-[13px]">{i.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
