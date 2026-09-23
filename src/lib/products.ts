import productData from "@/data/products.json";
import type { Product } from "@/types";

const products = productData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function searchProducts(items: Product[], query: string): Product[] {
  if (!query.trim()) return items;

  const pattern = new RegExp(query, "i");
  return items.filter(
    (product) => pattern.test(product.name) || pattern.test(product.description),
  );
}

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" },
];

const SORTERS: Record<string, (a: Product, b: Product) => number> = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-high-low": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export function sortProducts(items: Product[], sortBy: string): Product[] {
  const compare = SORTERS[sortBy];
  return [...items].sort((a, b) => compare(a, b));
}
