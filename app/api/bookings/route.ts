import { NextRequest, NextResponse } from "next/server";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import { getEmailRecipients, sendBookingEmails } from "@/lib/email";

const DOCTORS = ["Dr. Ranvijay Bharti", "Dr. Ritu Verma", "Other"];

const ALL_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
];

async function generateToken(supabase: ReturnType<typeof getServiceClient>): Promise<string> {
  for (let i = 0; i < 12; i++) {
    const token = `DD-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data } = await supabase
      .from("bookings")
      .select("id")
      .eq("token", token)
      .maybeSingle();
    if (!data) return token;
  }
  // Extremely unlikely fallback: timestamp-based token.
  return `DD-${String(Date.now()).slice(-4)}`;
}

/**
 * POST /api/bookings — public booking form submission.
 * Body: { patientName, mobile, doctor, date, timeSlot, problem?, age?, area? }
 * Saves the booking to Supabase and returns its token. Email alerts are
 * best-effort: a failed email never fails the booking.
 */
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Booking system is not configured yet (Supabase env vars missing)." },
      { status: 503 }
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const patientName = String(body.patientName ?? "").trim();
  const mobile = String(body.mobile ?? "").replace(/\D/g, "").slice(-10);
  const doctor = String(body.doctor ?? "");
  const date = String(body.date ?? "");
  const timeSlot = String(body.timeSlot ?? "");
  const problem = String(body.problem ?? "").trim() || null;
  const ageRaw = Number(body.age);
  const age = Number.isFinite(ageRaw) && ageRaw > 0 ? Math.floor(ageRaw) : null;
  const area = String(body.area ?? "").trim() || null;

  if (!patientName) {
    return NextResponse.json({ error: "Patient name is required." }, { status: 400 });
  }
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit mobile number." },
      { status: 400 }
    );
  }
  if (!DOCTORS.includes(doctor)) {
    return NextResponse.json({ error: "Please choose a doctor." }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Please choose a date." }, { status: 400 });
  }
  if (!ALL_SLOTS.includes(timeSlot)) {
    return NextResponse.json({ error: "Please choose a time slot." }, { status: 400 });
  }

  const supabase = getServiceClient();
  const token = await generateToken(supabase);

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      token,
      patient_name: patientName,
      mobile,
      doctor,
      date,
      time_slot: timeSlot,
      problem,
      age,
      area,
      status: "pending",
      email_status: "off",
    })
    .select()
    .single();

  if (error || !booking) {
    return NextResponse.json(
      { error: "Booking could not be saved. Please try again or call the hospital." },
      { status: 500 }
    );
  }

  // Email alerts (best-effort, never blocks the booking response on failure
  // beyond this short attempt — see README "Email alerts" notes).
  const recipients = await getEmailRecipients(supabase);
  const emailOn = Boolean(process.env.RESEND_API_KEY) && recipients.length > 0;
  let finalEmailStatus: string = "off";
  if (emailOn) {
    await supabase
      .from("bookings")
      .update({ email_status: "sending" })
      .eq("id", booking.id);
    const result = await sendBookingEmails(
      {
        patientName,
        mobile,
        doctor,
        date,
        timeSlot,
        token,
        problem,
      },
      recipients
    );
    finalEmailStatus = result.sent ? "sent" : "failed";
    await supabase
      .from("bookings")
      .update({
        email_status: finalEmailStatus,
        email_error: result.sent ? null : result.reason ?? "Email send failed",
      })
      .eq("id", booking.id);
  }

  return NextResponse.json({
    ok: true,
    token,
    booking: {
      id: booking.id,
      token,
      patientName,
      mobile,
      doctor,
      date,
      timeSlot,
      status: "pending",
      emailStatus: finalEmailStatus,
    },
  });
}
