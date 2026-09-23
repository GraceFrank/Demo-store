"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/products";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  initialQuery?: string;
};

export function ProductGrid({ products, initialQuery = "" }: ProductGridProps) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchProducts(products, query);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 outline-none focus:border-zinc-900"
      />

      {results.length === 0 ? (
        <p className="mt-8 text-zinc-500">No products match “{query}”.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
