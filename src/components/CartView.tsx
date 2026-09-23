"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { SHIPPING_STATES, calculateSubtotal, type CheckoutTotals } from "@/lib/checkout";
import { applyDiscount } from "@/lib/discounts";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/products";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; orderId: string; totals: CheckoutTotals }
  | { kind: "error"; message: string };

export function CartView() {
  const { items, updateQuantity, clear } = useCart();
  const [codeInput, setCodeInput] = useState("");
  const [discount, setDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);
  const [state, setState] = useState<string>(SHIPPING_STATES[0]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h2 className="font-semibold text-green-900">Order {status.orderId} placed 🎉</h2>
        <p className="mt-1 text-sm text-green-800">
          Charged {formatPrice(status.totals.total)} (incl. {formatPrice(status.totals.tax)} tax).
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium underline">
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-zinc-600">
        Your cart is empty.{" "}
        <Link href="/" className="font-medium underline">
          Browse products
        </Link>
      </p>
    );
  }

  const subtotal = calculateSubtotal(items);

  function handleApplyDiscount() {
    setDiscountMessage(null);
    try {
      const result = applyDiscount(codeInput, subtotal);
      if (result.ok) {
        setDiscount({ code: result.code, amount: result.amount });
        setDiscountMessage(`${result.code} applied.`);
      } else {
        setDiscount(null);
        setDiscountMessage(result.reason);
      }
    } catch (error) {
      console.error(error);
      setDiscount(null);
      setDiscountMessage("Something went wrong applying that code. Please try again.");
    }
  }

  async function handleCheckout() {
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, state, discountCode: discount?.code }),
      });

      if (!response.ok) {
        setStatus({ kind: "error", message: "Checkout failed. Please try again in a moment." });
        return;
      }

      const data = await response.json();
      clear();
      setStatus({ kind: "success", orderId: data.orderId, totals: data.totals });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection." });
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <ul className="space-y-3">
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <li
              key={item.productId}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <span className="text-3xl">{product.emoji}</span>
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-zinc-500">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="h-8 w-8 rounded-md border border-zinc-300"
                  aria-label={`Decrease ${product.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="h-8 w-8 rounded-md border border-zinc-300"
                  aria-label={`Increase ${product.name}`}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit space-y-4 rounded-xl border border-zinc-200 bg-white p-5">
        <div>
          <label htmlFor="discount" className="text-sm font-medium">
            Discount code
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="discount"
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              placeholder="e.g. SAVE20"
              className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
            />
            <button
              onClick={handleApplyDiscount}
              className="rounded-md border border-zinc-900 px-3 text-sm font-medium"
            >
              Apply
            </button>
          </div>
          {discountMessage && <p className="mt-1 text-xs text-zinc-600">{discountMessage}</p>}
        </div>

        <div>
          <label htmlFor="state" className="text-sm font-medium">
            Shipping state
          </label>
          <select
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
          >
            {SHIPPING_STATES.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </div>

        <dl className="space-y-1 border-t border-zinc-200 pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {discount && (
            <div className="flex justify-between text-green-700">
              <dt>Discount ({discount.code})</dt>
              <dd>−{formatPrice(discount.amount)}</dd>
            </div>
          )}
          <div className="flex justify-between text-zinc-500">
            <dt>Tax & shipping</dt>
            <dd>At checkout</dd>
          </div>
        </dl>

        <button
          onClick={handleCheckout}
          disabled={status.kind === "submitting"}
          className="w-full rounded-lg bg-zinc-900 py-2.5 font-medium text-white disabled:opacity-60"
        >
          {status.kind === "submitting" ? "Placing order…" : "Checkout"}
        </button>
        {status.kind === "error" && <p className="text-sm text-red-700">{status.message}</p>}
      </aside>
    </div>
  );
}
