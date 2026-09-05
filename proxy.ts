import { NextRequest, NextResponse } from "next/server";
import { markdownForPath, prefersMarkdown } from "@/lib/agent-markdown";

export function proxy(request: NextRequest) {
  if (!prefersMarkdown(request.headers.get("accept"))) return NextResponse.next();

  return new NextResponse(markdownForPath(request.nextUrl.pathname), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "X-Content-Type-Options": "nosniff",
      Link: `<${request.nextUrl.origin}/llms.txt>; rel="describedby"; type="text/plain"`,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$).*)"],
};
