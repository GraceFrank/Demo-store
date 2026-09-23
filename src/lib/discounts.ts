type Discount = {
  percent: number;
  minSubtotal: number;
};

const DISCOUNT_CODES: Record<string, Discount> = {
  SAVE20: { percent: 20, minSubtotal: 50 },
  WELCOME10: { percent: 10, minSubtotal: 0 },
};

export type DiscountResult =
  | { ok: true; code: string; amount: number }
  | { ok: false; reason: string };

export function applyDiscount(code: string, subtotal: number): DiscountResult {
  const discount = DISCOUNT_CODES[code];

  if (!discount) {
    return { ok: false, reason: `Invalid discount code: ${code}.` };
  }

  if (subtotal < discount.minSubtotal) {
    return { ok: false, reason: `Spend at least $${discount.minSubtotal} to use ${code}.` };
  }

  const amount = Math.round(subtotal * discount.percent) / 100;
  return { ok: true, code, amount };
}
