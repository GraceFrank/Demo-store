import { applyDiscount } from "@/lib/discounts";
import { getProduct } from "@/lib/products";
import type { CartItem } from "@/types";

export const SHIPPING_STATES = ["CA", "NY", "TX", "WA", "FL", "OR"] as const;
export type ShippingState = (typeof SHIPPING_STATES)[number];

const TAX_RATES: Record<string, { rate: number }> = {
  CA: { rate: 0.0725 },
  NY: { rate: 0.04 },
  TX: { rate: 0.0625 },
  WA: { rate: 0.065 },
  FL: { rate: 0.06 },
  OR: { rate: 0 },
};

const FREE_SHIPPING_THRESHOLD = 75;
const FLAT_SHIPPING = 7.5;

export type CheckoutTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

const round = (n: number) => Math.round(n * 100) / 100;

export function calculateSubtotal(items: CartItem[]): number {
  return round(
    items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      if (!product) throw new Error(`Unknown product: ${item.productId}`);
      return sum + product.price * item.quantity;
    }, 0),
  );
}

export function calculateTotals(
  items: CartItem[],
  state: string,
  discountCode?: string,
): CheckoutTotals {
  const subtotal = calculateSubtotal(items);

  let discount = 0;
  if (discountCode) {
    const result = applyDiscount(discountCode, subtotal);
    if (result.ok) discount = result.amount;
  }

  const discounted = subtotal - discount;
  const shipping = discounted >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const taxEntry = TAX_RATES[state];
  if (!taxEntry) throw new Error(`No tax rate configured for state: ${state}`);
  const tax = round(discounted * taxEntry.rate);

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total: round(discounted + shipping + tax),
  };
}
