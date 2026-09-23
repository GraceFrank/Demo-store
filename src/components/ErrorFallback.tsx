"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  retry: () => void;
  title?: string;
};

export function ErrorFallback({ error, retry, title = "Something went wrong" }: ErrorFallbackProps) {
  useEffect(() => {
    // Server errors (which carry a digest) are already reported by onRequestError.
    if (!error.digest) Sentry.captureException(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-900">{title}</h2>
      <p className="mt-1 text-sm text-red-800">
        This part of the page failed to load. The rest of the store still works.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-red-700">Reference: {error.digest}</p>
      )}
      <button
        onClick={() => retry()}
        className="mt-4 rounded-md bg-red-900 px-3 py-1.5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
