import * as Sentry from "@sentry/nextjs";
import type { Instrumentation } from "next";

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

// Reports errors thrown in Server Components, route handlers and server actions,
// tagged with the visitor ID the browser stored in the visitor_id cookie.
export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  const cookie = request.headers.cookie;
  const cookieHeader = Array.isArray(cookie) ? cookie.join("; ") : cookie;
  const visitorId = cookieHeader?.match(/(?:^|;\s*)visitor_id=([^;]+)/)?.[1];

  Sentry.withScope((scope) => {
    if (visitorId) scope.setUser({ id: visitorId });
    Sentry.captureRequestError(error, request, context);
  });
};
