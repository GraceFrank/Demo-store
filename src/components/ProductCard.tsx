import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-400"
    >
      <div className="flex h-28 items-center justify-center rounded-lg bg-zinc-100 text-5xl">
        {product.emoji}
      </div>
      <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500">{product.category}</p>
      <h3 className="mt-1 font-medium group-hover:underline">{product.name}</h3>
      <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
    </Link>
  );
}
