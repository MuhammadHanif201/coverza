import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/lib/site";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartButton } from "./CartButton";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <div className="flex items-center gap-3 lg:gap-12">
            <MobileMenu />
            <Logo />
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex gap-7 text-[15px] font-medium">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={"highlight" in l ? "text-sale hover:opacity-80" : "hover:text-muted"}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SearchBox className="hidden w-[270px] md:block" />
            <CartButton />
          </div>
        </Container>
        <Container className="pb-3 md:hidden">
          <SearchBox id="site-search-mobile" />
        </Container>
      </header>
    </>
  );
}
