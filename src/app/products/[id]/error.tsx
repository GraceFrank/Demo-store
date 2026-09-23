"use client";

import { ErrorFallback } from "@/components/ErrorFallback";

export default function Error(props: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorFallback {...props} title="We couldn't load this product" />;
}
