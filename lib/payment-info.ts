// File: lib/payment-info.ts
//
// SERVER-ONLY. Do NOT import this file from any "use client" component —
// doing so would bake these values into the public JS bundle where anyone
// (or any crawler) could read them straight out of page source.
//
// Instead, the client fetches these details on demand from
// /api/blog/payment-details, which is a server route that reads this file
// and responds with Cache-Control: no-store.
//
// For real production use, move these into environment variables
// (e.g. process.env.BH_BANK_ACCOUNT_NUMBER) instead of hardcoding them here,
// so the raw numbers never live in source control at all.

export const BANK_TRANSFER_DETAILS = {
  accountName: "Muhammad Bin Asif",
  accountNumber: "30000001230312",
  routingNumber: "028000024",
  bankName: "JPMorgan Chase Bank, N.A.",
  bankAddress: "270 Park Avenue, New York, NY 10017",
  accountType: "Checking (Current)",
  bankCountry: "United States",
} as const;

export type PublishOption = "exchange" | "paid";
export type PaidPlan = "advance" | "after_live";

export const PAYMENT_PLANS: Record<
  string,
  { label: string; amountUsd: number }
> = {
  exchange: { label: "Reciprocal Link Exchange", amountUsd: 0 },
  paid_advance: { label: "Paid — Pay in Advance", amountUsd: 10 },
  paid_after_live: { label: "Paid — Pay After Live", amountUsd: 12 },
};

export function resolveAmountUsd(
  publishOption: string,
  paidPlan: string
): number {
  if (publishOption === "exchange") return PAYMENT_PLANS.exchange.amountUsd;
  if (publishOption === "paid" && paidPlan === "advance")
    return PAYMENT_PLANS.paid_advance.amountUsd;
  if (publishOption === "paid" && paidPlan === "after_live")
    return PAYMENT_PLANS.paid_after_live.amountUsd;
  return 0;
}
