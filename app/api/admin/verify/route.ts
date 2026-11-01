import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionValue,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/auth";

/**
 * POST /api/admin/verify — unlock the dashboard.
 * Body: { password }. On success sets an httpOnly signed session cookie
 * (12 hours). The password itself is never stored anywhere — only its bcrypt
 * hash lives in ADMIN_PASSWORD_HASH.
 */
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin password is not configured yet. Set ADMIN_PASSWORD_HASH (see README)." },
      { status: 503 }
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const password = String(body.password ?? "");
  const ok = await verifyAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "Galat password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return res;
}
