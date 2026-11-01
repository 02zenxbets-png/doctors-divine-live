import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceClient } from "@/lib/supabase";

const STATUSES = ["pending", "confirmed", "done", "cancelled"];

/** PATCH /api/admin/bookings/[id] — change a booking's status (admin only). */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const status = String(body.status ?? "");
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: "Status could not be updated." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** DELETE /api/admin/bookings/[id] — delete a booking (admin only). */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  const supabase = getServiceClient();
  const { error } = await supabase.from("bookings").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: "Booking could not be deleted." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
