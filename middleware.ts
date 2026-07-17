import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  authConfigured,
  roleAllowsApi,
  verifyRoleCookie,
  type DashboardRole,
} from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  if (!authConfigured()) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET!.trim();
  const session = await verifyRoleCookie(request.cookies.get(AUTH_COOKIE)?.value, secret);

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autenticado", login: "/login" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  const role = session.role as DashboardRole;
  if (pathname.startsWith("/api/") && !roleAllowsApi(role, pathname)) {
    return NextResponse.json(
      { error: "Forbidden para rol", role, path: pathname },
      { status: 403 }
    );
  }

  const res = NextResponse.next();
  res.headers.set("x-rr-role", role);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
