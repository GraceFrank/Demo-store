"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 text-sm">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Mini Store
        </Link>
        <Link href="/" className="text-zinc-600 hover:text-zinc-900">
          Shop
        </Link>
        <Link href="/orders" className="text-zinc-600 hover:text-zinc-900">
          Orders
        </Link>
        <Link href="/debug" className="text-zinc-600 hover:text-zinc-900">
          Debug
        </Link>
        <Link
          href="/cart"
          className="ml-auto rounded-full bg-zinc-900 px-4 py-1.5 font-medium text-white"
        >
          Cart ({itemCount})
        </Link>
      </nav>
    </header>
  );
}
