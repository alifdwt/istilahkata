import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth/config";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/contribute/word", "/profile"];
  const authRoutes = ["/login", "/register"];

  // Redirect authenticated users away from auth pages
  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin-only routes
  if (
    pathname.startsWith("/admin") &&
    (!session || session.user.role !== "admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Moderator routes
  if (
    pathname.startsWith("/moderate") &&
    (!session || !["admin", "moderator"].includes(session.user.role!))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
