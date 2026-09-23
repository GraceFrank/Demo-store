"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        addItem(productId);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white hover:bg-zinc-700"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
