"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="relative p-1" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
      <Icon name="bag" size={22} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sale px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
