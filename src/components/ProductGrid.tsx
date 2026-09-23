"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SORT_OPTIONS, searchProducts, sortProducts } from "@/lib/products";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  initialQuery?: string;
};

export function ProductGrid({ products, initialQuery = "" }: ProductGridProps) {
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("featured");
  const results = sortProducts(searchProducts(products, query), sortBy);

  return (
    <div>
      <div className="flex gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 outline-none focus:border-zinc-900"
        />
        <select
          aria-label="Sort by"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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
