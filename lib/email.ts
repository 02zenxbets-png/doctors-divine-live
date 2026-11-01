import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";

export type EmailTarget = {
  patientName: string;
  mobile: string;
  doctor: string;
  date: string;
  timeSlot: string;
  token: string;
  problem?: string | null;
};

/**
 * Send one booking's details to every configured recipient address.
 *
 * Returns { sent: true } only when Resend accepted the send for ALL
 * recipients. If RESEND_API_KEY is missing, or there are no recipients, this
 * returns { sent: false, reason: "off" } — the caller must record email
 * status as "off", never as "sent". Failures are returned, never thrown, so
 * a failed email can never break the booking itself.
 */
export async function sendBookingEmails(
  booking: EmailTarget,
  recipients: string[]
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Doctors Divine <onboarding@resend.dev>";
  if (!apiKey || recipients.length === 0) {
    return { sent: false, reason: "off" };
  }
  const resend = new Resend(apiKey);
  const subject = `New booking ${booking.token} — ${booking.patientName} (${booking.doctor})`;
  const text = [
    `New appointment booking — Doctors Divine Hospital, Nawada`,
    ``,
    `Token: ${booking.token}`,
    `Patient: ${booking.patientName}`,
    `Mobile: ${booking.mobile}`,
    `Doctor: ${booking.doctor}`,
    `Date: ${booking.date}`,
    `Time slot: ${booking.timeSlot}`,
    booking.problem ? `Problem: ${booking.problem}` : null,
    ``,
    `See the dashboard for the full list and to confirm / cancel this booking.`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  try {
    for (const to of recipients) {
      const { error } = await resend.emails.send({ from, to, subject, text });
      if (error) {
        return { sent: false, reason: error.message || "Resend rejected the send" };
      }
    }
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "Email send failed",
    };
  }
}

/** Read the 3 recipient addresses from the settings table (may be empty). */
export async function getEmailRecipients(
  supabase: SupabaseClient
): Promise<string[]> {
  const { data, error } = await supabase
    .from("settings")
    .select("email_1, email_2, email_3")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return [];
  return [data.email_1, data.email_2, data.email_3].filter(
    (e): e is string => typeof e === "string" && e.includes("@")
  );
}
