import { NextRequest, NextResponse } from "next/server";

// Security headers according to Checklist Item 11 & Security Requirements
export function middleware(request: NextRequest) {
  // Rate limiting check or CSRF/origin verification can also be hooked here
  const response = NextResponse.next();

  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  // Protect admin API routes from direct non-admin calls
  if (request.nextUrl.pathname.startsWith("/api/v1/admin")) {
    const authHeader = request.headers.get("authorization");
    const cookieToken = request.cookies.get("pc_access_token")?.value;
    if (!authHeader && !cookieToken) {
      return NextResponse.json(
        { error: "Unauthorized: Admin session token required" },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
