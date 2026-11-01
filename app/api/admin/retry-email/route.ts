import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceClient } from "@/lib/supabase";
import { getEmailRecipients, sendBookingEmails } from "@/lib/email";

/**
 * POST /api/admin/retry-email — re-send a booking's email alerts (admin only).
 * Body: { id }. Updates the booking's email_status to sent/failed/off.
 */
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
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", String(body.id ?? ""))
    .maybeSingle();
  if (error || !booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  const recipients = await getEmailRecipients(supabase);
  if (!process.env.RESEND_API_KEY || recipients.length === 0) {
    await supabase
      .from("bookings")
      .update({ email_status: "off", email_error: null })
      .eq("id", booking.id);
    return NextResponse.json({ ok: true, emailStatus: "off" });
  }
  await supabase
    .from("bookings")
    .update({ email_status: "sending" })
    .eq("id", booking.id);
  const result = await sendBookingEmails(
    {
      patientName: booking.patient_name,
      mobile: booking.mobile,
      doctor: booking.doctor,
      date: booking.date,
      timeSlot: booking.time_slot,
      token: booking.token,
      problem: booking.problem,
    },
    recipients
  );
  const emailStatus = result.sent ? "sent" : "failed";
  await supabase
    .from("bookings")
    .update({
      email_status: emailStatus,
      email_error: result.sent ? null : result.reason ?? "Email send failed",
    })
    .eq("id", booking.id);
  return NextResponse.json({ ok: true, emailStatus });
}
