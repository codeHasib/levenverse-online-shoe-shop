import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const sessionCookie = getSessionCookie(request);

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/api/auth");

  const isProductApi = pathname.startsWith("/api/products");
  const isOrderApi = pathname.startsWith("/api/orders");
  const isCategoryApi = pathname.startsWith("/api/categories");
  const isReviewApi = pathname.startsWith("/api/reviews");

  const isWriteMethod =
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE";

  // ✅ NEVER block auth
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // 🔐 protect only WRITE actions
  if (
    isWriteMethod &&
    (isProductApi || isOrderApi || isCategoryApi || isReviewApi)
  ) {
    if (!sessionCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  // 🔐 protect dashboard (all methods)
  if (isDashboard && !sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/categories",
    "/api/reviews/:path*",
    "/api/auth/:path*",
  ],
};
