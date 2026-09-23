import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { averageRating } from "@/lib/reviews";

export default async function ProductPage(props: PageProps<"/products/[id]">) {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) notFound();

  const rating = averageRating(product.reviews);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-white text-9xl shadow-sm">
        {product.emoji}
      </div>

      <div>
        <p className="text-sm uppercase tracking-wide text-zinc-500">{product.category}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
        <p className="mt-2 text-zinc-600">
          ★ {rating} · {product.reviews.length} reviews
        </p>
        <p className="mt-6 text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="mt-4 text-zinc-700">{product.description}</p>
        <p className="mt-2 text-sm text-zinc-500">{product.stock} in stock</p>
        <div className="mt-6">
          <AddToCartButton productId={product.id} />
        </div>

        <h2 className="mt-10 font-semibold">Reviews</h2>
        <ul className="mt-3 space-y-3">
          {product.reviews.map((review) => (
            <li key={review.author} className="rounded-lg border border-zinc-200 bg-white p-4">
              <p className="text-sm font-medium">
                {review.author} · {"★".repeat(review.rating)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
