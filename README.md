# Mini Store

A small Next.js storefront with a handful of realistic bugs, used to practice setting up error
monitoring and automated fixes.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS.

## Getting started

```bash
npm install
npm run dev                  # http://localhost:3000
```

For a production-like run:

```bash
npm run build && npm start
```

## Project structure

```
src/
  app/
    page.tsx               Shop (product grid + search)
    products/[id]/         Product detail
    cart/                  Cart, discount codes, checkout
    orders/                Recent orders
    debug/                 Scenario launcher for triggering errors
    api/checkout/route.ts  Checkout API
    error.tsx              Error boundaries keep failures scoped to one page
    global-error.tsx
  components/              UI components (cart state lives in CartProvider)
  lib/                     Business logic: pricing, discounts, search, formatting
  data/                    Mock product and order data (stands in for a database)
  types/                   Shared TypeScript types
```
