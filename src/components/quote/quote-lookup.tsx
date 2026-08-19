"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { openQuote } from "@/components/quote/actions";

export function QuoteLookup() {
  const [state, formAction, pending] = useActionState(openQuote, { error: false });

  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-lg border border-border bg-surface p-6 text-center shadow-sm bp-corners md:p-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary md:tracking-[0.2em]">
        Chemic Home
      </p>
      <h1 className="font-display mt-3 text-2xl leading-snug tracking-tight text-slate-800 sm:text-3xl md:text-4xl">
        Enter provided code
      </h1>
      <form action={formAction} className="mt-8 w-full space-y-4">
        <label className="sr-only" htmlFor="quote-code">
          Quote code
        </label>
        <input
          id="quote-code"
          name="code"
          type="text"
          autoComplete="off"
          spellCheck={false}
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-center font-mono text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        {state.error ? (
          <p className="text-sm text-secondary">No quote found for that code.</p>
        ) : null}
        <Button
          type="submit"
          disabled={pending}
          className="w-full font-mono text-xs uppercase tracking-widest"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
