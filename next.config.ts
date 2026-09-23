import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Source maps are uploaded only when SENTRY_AUTH_TOKEN is set (e.g. in CI or on Vercel).
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  silent: !process.env.CI,
});
