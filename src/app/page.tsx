import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function HomePage(props: PageProps<"/">) {
  const { q } = await props.searchParams;
  const initialQuery = typeof q === "string" ? q : "";

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
      <p className="mt-2 text-zinc-600">Small goods for desk, kitchen and home.</p>
      <div className="mt-8">
        <ProductGrid products={getProducts()} initialQuery={initialQuery} />
      </div>
    </div>
  );
}
