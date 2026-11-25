import { ButtonLink } from "@/components/ui/Button";
import { Case } from "@/components/ui/CaseArt";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <Container className="pt-4 lg:pt-8">
      <section
        aria-labelledby="hero-title"
        className="relative grid overflow-hidden rounded-[20px] bg-ink text-white md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:rounded-[28px]"
      >
        <div className="flex flex-col items-start gap-3 p-6 sm:p-10 lg:gap-4 lg:p-16">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-zinc-400 lg:text-[13px]">NEW ARRIVALS · 2026</p>
          <h1 id="hero-title" className="text-[28px] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[52px]">
            Premium iPhone &amp; Samsung Covers in Pakistan
          </h1>
          <p className="max-w-md text-sm text-zinc-300 sm:text-base lg:text-lg">
            Clear, MagSafe, silicone &amp; shockproof cases from Rs 999. Cash on Delivery all over Pakistan.
          </p>
          <div className="mt-2 flex flex-wrap gap-3 lg:mt-3">
            <ButtonLink href="/covers" variant="light" pill iconRight="chevron-right">Shop Now</ButtonLink>
            <ButtonLink href="/brand/iphone" variant="ghost" pill className="hidden sm:inline-flex">Choose your phone</ButtonLink>
          </div>
        </div>
        <div aria-hidden="true" className="hidden items-center justify-center self-center md:flex md:h-[340px] lg:h-[440px]">
          <Case color="#93A8BF" className="h-[62%] translate-y-6" />
          <Case color="#C7D9E8" className="z-10 -mx-6 h-[76%] -translate-y-3 lg:-mx-8" />
          <Case color="#E4ECF2" className="h-[58%] translate-y-8" />
        </div>
      </section>
    </Container>
  );
}
