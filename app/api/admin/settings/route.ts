import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceClient } from "@/lib/supabase";

function cleanEmail(v: unknown): string | null {
  const s = String(v ?? "").trim();
  return s && s.includes("@") ? s : null;
}

/** GET /api/admin/settings — current 3 alert email addresses (admin only). */
export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("settings")
    .select("email_1, email_2, email_3")
    .eq("id", 1)
    .maybeSingle();
  return NextResponse.json({
    email_1: data?.email_1 ?? "",
    email_2: data?.email_2 ?? "",
    email_3: data?.email_3 ?? "",
    emailConfigured: Boolean(process.env.RESEND_API_KEY),
  });
}

/** POST /api/admin/settings — save the 3 alert email addresses (admin only). */
export async function POST(req: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const supabase = getServiceClient();
  const { error } = await supabase.from("settings").upsert({
    id: 1,
    email_1: cleanEmail(body.email_1),
    email_2: cleanEmail(body.email_2),
    email_3: cleanEmail(body.email_3),
  });
  if (error) {
    return NextResponse.json({ error: "Settings could not be saved." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
