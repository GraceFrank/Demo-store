import { connection } from "next/server";
import orderData from "@/data/orders.json";
import type { Order } from "@/types";

const orders = orderData as Order[];

// Stands in for a database query, so it runs per request rather than at build time.
export async function getOrders(): Promise<Order[]> {
  await connection();
  return [...orders].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
  );
}
