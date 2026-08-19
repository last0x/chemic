"use server";

import { redirect } from "next/navigation";

import { getQuote, normalizeQuoteId } from "@/components/quote/quotes";

export async function openQuote(
  _prev: { error: boolean },
  formData: FormData
): Promise<{ error: boolean }> {
  const id = normalizeQuoteId(String(formData.get("code") ?? ""));
  const quote = getQuote(id);
  if (!quote) {
    return { error: true };
  }
  redirect(`/home/quote/${quote.id}`);
}
