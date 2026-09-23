"use client";

import { useState } from "react";
import { validateSignupEmail } from "@/lib/newsletter";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const problem = validateSignupEmail(email);
    setMessage(problem ?? "Thanks! You're on the list.");
    if (!problem) setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 rounded-xl border border-zinc-200 bg-white p-6"
    >
      <h2 className="font-semibold">Get new arrivals first</h2>
      <p className="mt-1 text-sm text-zinc-600">One email a month. No spam.</p>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          aria-label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-zinc-900 px-4 text-sm font-medium text-white">
          Subscribe
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-zinc-700">{message}</p>}
    </form>
  );
}
