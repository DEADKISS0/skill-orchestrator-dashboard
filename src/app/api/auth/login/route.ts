import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  AUTH_MAX_AGE_SEC,
  authConfigured,
  resolveRoleFromPassword,
  signRole,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!authConfigured()) {
    return NextResponse.json({
      ok: true,
      openMode: true,
      role: "ops",
      message: "AUTH_SECRET no configurado — dashboard abierto (rol ops implícito).",
    });
  }

  const secret = process.env.AUTH_SECRET!.trim();
  let body: { password?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const password = String(body.password || "");
  if (!password) {
    return NextResponse.json({ ok: false, error: "password requerido" }, { status: 400 });
  }

  const role = resolveRoleFromPassword(password);
  if (!role) {
    return NextResponse.json({ ok: false, error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = await signRole(role, secret);
  const res = NextResponse.json({
    ok: true,
    role,
    forcesPitch: role === "pitch" || role === "client",
  });
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_MAX_AGE_SEC,
  });
  return res;
}
