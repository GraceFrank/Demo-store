import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Vercel sets this to "production" or "preview"; anything else is a local run.
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  tracesSampleRate: 1.0,
  // Only keep a replay when an error happens (the minute or so leading up to it).
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
});

// Give each browser an anonymous visitor ID so Sentry counts distinct users. The cookie
// lets server-side errors (see instrumentation.ts) be tagged with the same ID.
function getVisitorId(): string {
  const existing = document.cookie.match(/(?:^|;\s*)visitor_id=([^;]+)/)?.[1];
  if (existing) return existing;

  const id = crypto.randomUUID();
  document.cookie = `visitor_id=${id}; path=/; max-age=31536000; SameSite=Lax`;
  return id;
}

Sentry.setUser({ id: getVisitorId() });

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
