import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * IMPORTANT: this uses the SERVICE-ROLE key, which bypasses Row Level Security
 * and has full database access. It must ONLY ever run on the server (API routes
 * and server components). Never import this file into a client component, and
 * never put the service-role key in a NEXT_PUBLIC_* variable.
 *
 * Public visitors never talk to Supabase directly: the booking form posts to
 * our own /api/bookings route, and the dashboard talks to /api/admin/* routes.
 * Both run on the server, where this client lives.
 */
export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** True when the server is configured to talk to Supabase at all. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
