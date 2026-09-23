# Mini Store

A small Next.js storefront used to demo **self-healing software**: errors in production are
reported to Sentry, and Claude fixes them from the Sentry issue.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS · `@sentry/nextjs`.

## Getting started

```bash
cp .env.example .env.local   # fill in your Sentry DSN
npm install
npm run dev                  # http://localhost:3000
```

For a production-like run (recommended for the demo, since stack traces match what you deploy):

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
    debug/                 Demo scenario launcher
    api/checkout/route.ts  Checkout API
    error.tsx              Error boundaries keep failures scoped to one page
    global-error.tsx
  components/              UI components (cart state lives in CartProvider)
  lib/                     Business logic: pricing, discounts, search, formatting
  data/                    Mock product and order data (stands in for a database)
  types/                   Shared TypeScript types
  instrumentation.ts       Server-side Sentry setup + request error reporting
  instrumentation-client.ts Browser-side Sentry setup
```

## Sentry setup

1. Create a **Next.js** project in Sentry and copy its DSN.
2. Set `NEXT_PUBLIC_SENTRY_DSN` locally (`.env.local`) and in your hosting provider.
3. For readable stack traces in production, also set `SENTRY_ORG`, `SENTRY_PROJECT` and
   `SENTRY_AUTH_TOKEN` in the build environment so source maps are uploaded.
4. Open `/debug` and click **Send Sentry test event** to confirm the connection.

Errors are reported to Sentry and fixed automatically: see `.github/workflows/sentry-autofix.yml`.
