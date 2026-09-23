"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useState } from "react";
import { applyDiscount } from "@/lib/discounts";

type Scenario = {
  title: string;
  where: string;
  howTo: string;
  action: { label: string; href?: string; run?: () => Promise<string> };
};

const scenarios: Scenario[] = [
  {
    title: "Product page crashes for a product with no reviews",
    where: "Server Component · /products/[id]",
    howTo: "Open the Trail Water Bottle. It has no reviews yet.",
    action: { label: "Open product", href: "/products/p-4" },
  },
  {
    title: "Search breaks on special characters",
    where: "Client Component · Shop search",
    howTo: "Search for “c++” (or anything with ( [ * + ?).",
    action: { label: "Search “c++”", href: "/?q=c%2B%2B" },
  },
  {
    title: "Discount codes are case-sensitive and crash on unknown codes",
    where: "Client event handler · Cart",
    howTo: "Add something to the cart, then apply “save20” in lowercase.",
    action: {
      label: "Apply “save20”",
      run: async () => {
        try {
          applyDiscount("save20", 100);
          return "No error. This one looks fixed.";
        } catch (error) {
          Sentry.captureException(error);
          return `Error: ${(error as Error).message}`;
        }
      },
    },
  },
  {
    title: "Checkout API fails for Oregon",
    where: "Route Handler · POST /api/checkout",
    howTo: "Check out with shipping state “OR”.",
    action: {
      label: "POST checkout (OR)",
      run: async () => {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ productId: "p-1", quantity: 1 }], state: "OR" }),
        });
        return response.ok
          ? "200 OK. This one looks fixed."
          : `HTTP ${response.status}. The server hit an error.`;
      },
    },
  },
  {
    title: "Orders page crashes on an order that hasn't been delivered",
    where: "Server Component · /orders",
    howTo: "Open the orders page. One order is still processing.",
    action: { label: "Open orders", href: "/orders" },
  },
];

export default function DebugPage() {
  const [results, setResults] = useState<Record<number, string>>({});

  async function runScenario(index: number, run: () => Promise<string>) {
    setResults((current) => ({ ...current, [index]: "Running…" }));
    const message = await run();
    setResults((current) => ({ ...current, [index]: message }));
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Debug scenarios</h1>
      <p className="mt-2 text-zinc-600">
        Each scenario triggers a real bug in the app. The error is contained and the rest of the
        app keeps working.
      </p>


      <ol className="mt-6 space-y-3">
        {scenarios.map((scenario, index) => (
          <li key={scenario.title} className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium">
                  {index + 1}. {scenario.title}
                </p>
                <p className="mt-0.5 font-mono text-xs text-zinc-500">{scenario.where}</p>
                <p className="mt-2 text-sm text-zinc-600">{scenario.howTo}</p>
              </div>
              {scenario.action.href ? (
                <Link
                  href={scenario.action.href}
                  className="rounded-md border border-zinc-900 px-3 py-1.5 text-sm font-medium"
                >
                  {scenario.action.label}
                </Link>
              ) : (
                <button
                  onClick={() => runScenario(index, scenario.action.run!)}
                  className="rounded-md border border-zinc-900 px-3 py-1.5 text-sm font-medium"
                >
                  {scenario.action.label}
                </button>
              )}
            </div>
            {results[index] && (
              <p className="mt-3 rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs">
                {results[index]}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
