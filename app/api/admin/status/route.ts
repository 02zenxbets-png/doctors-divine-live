import { NextResponse } from "next/server";
import { isAdminConfigured } from "@/lib/auth";
import { isAdminRequest } from "@/lib/admin";

/** GET /api/admin/status — does the dashboard have a password, and is this browser unlocked? */
export async function GET() {
  return NextResponse.json({
    configured: isAdminConfigured(),
    unlocked: isAdminRequest(),
  });
}
