import { CartView } from "@/components/CartView";

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
