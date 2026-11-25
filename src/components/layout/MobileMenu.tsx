"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { mainNav, site, whatsappLink } from "@/lib/site";
import { categories } from "@/lib/data/categories";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-ml-1 p-1"
      >
        <Icon name="menu" size={24} />
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-5 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        inert={!open}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xl font-bold tracking-[0.12em]">COVERZA</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full bg-surf p-2">
            <Icon name="x" size={20} />
          </button>
        </div>
        <ul className="flex flex-col" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          {mainNav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`flex items-center justify-between border-b border-line py-3.5 text-base font-medium ${"highlight" in l ? "text-sale" : ""}`}
              >
                {l.label}
                <Icon name="chevron-right" size={18} className="text-zinc-400" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted">Categories</p>
        <ul className="flex flex-wrap gap-2" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} className="block rounded-full border border-line px-3.5 py-2 text-sm">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink("Assalam o Alaikum! I want to order a phone cover.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-wa py-3.5 text-sm font-semibold text-white"
        >
          <Icon name="message" size={18} /> Chat on WhatsApp · {site.whatsappDisplay}
        </a>
      </nav>
    </div>
  );
}
