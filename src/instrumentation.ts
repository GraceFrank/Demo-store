import * as Sentry from "@sentry/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      // Vercel sets this to "production" or "preview"; anything else is a local run.
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
      tracesSampleRate: 1.0,
    });
  }
}

// Reports errors thrown in Server Components, route handlers and server actions.
export const onRequestError = Sentry.captureRequestError;
