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
