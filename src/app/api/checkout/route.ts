import { calculateTotals } from "@/lib/checkout";
import type { CartItem } from "@/types";

type CheckoutRequest = {
  items: CartItem[];
  state: string;
  discountCode?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequest;

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return Response.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const totals = calculateTotals(body.items, body.state, body.discountCode);
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  return Response.json({ orderId, totals });
}
