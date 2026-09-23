import { formatDate, formatPrice } from "@/lib/format";
import { getOrders } from "@/lib/orders";

const STATUS_STYLES = {
  processing: "bg-amber-100 text-amber-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Recent orders</h1>
      <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Ship to</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Delivery</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3 font-mono">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">{formatDate(order.deliveredAt)}</td>
                <td className="px-4 py-3 text-right">{formatPrice(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
