// File: app/api/blog/payment-details/route.ts
//
// Returns the bank transfer details a guest-post contributor needs once
// they've chosen a paid placement. Kept behind a server route (instead of
// hardcoded in the client component) so the numbers never end up in the
// public JS bundle or static page source — only fetched when someone
// actually reaches the payment step of the form.

import { NextResponse } from "next/server";
import { BANK_TRANSFER_DETAILS } from "@/lib/payment-info";

export async function GET() {
  return NextResponse.json(BANK_TRANSFER_DETAILS, {
    headers: {
      // Never cache or let a shared/proxy cache store this response.
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
