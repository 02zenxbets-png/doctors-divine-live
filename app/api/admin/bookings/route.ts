import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";

export type BookingRow = {
  id: string;
  token: string;
  patient_name: string;
  mobile: string;
  doctor: string;
  date: string;
  time_slot: string;
  problem: string | null;
  age: number | null;
  area: string | null;
  status: string;
  email_status: string;
  email_error: string | null;
  created_at: string;
};

function todayISO(): string {
  // Asia/Kolkata date, because the hospital runs on IST.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(
    new Date()
  );
}

/**
 * GET /api/admin/bookings — dashboard data (admin session required).
 * Query: scope=today|all, status=pending|confirmed|done|cancelled, q=search text.
 * Returns the filtered list plus counts. Poll this every few seconds for
 * the dashboard's auto-refresh.
 */
export async function GET(req: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Locked. Admin password daalein." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }
  const params = req.nextUrl.searchParams;
  const scope = params.get("scope") === "all" ? "all" : "today";
  const statusFilter = params.get("status") ?? "";
  const q = (params.get("q") ?? "").trim();

  const supabase = getServiceClient();
  const today = todayISO();

  let listQuery = supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(500);
  if (scope === "today") listQuery = listQuery.eq("date", today);
  if (["pending", "confirmed", "done", "cancelled"].includes(statusFilter)) {
    listQuery = listQuery.eq("status", statusFilter);
  }
  if (q) {
    const like = `%${q.replace(/[%_]/g, "")}%`;
    listQuery = listQuery.or(
      `patient_name.ilike.${like},mobile.ilike.${like},token.ilike.${like}`
    );
  }
  const { data: bookings, error } = await listQuery;
  if (error) {
    return NextResponse.json({ error: "Bookings load nahi ho payi." }, { status: 500 });
  }

  // Counts (independent of the list filter, except scope "today" is separate).
  const { count: todayCount } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("date", today);
  const { count: upcomingCount } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .gte("date", today)
    .in("status", ["pending", "confirmed"]);
  const { count: pendingCount } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");
  const { count: totalCount } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true });

  return NextResponse.json({
    bookings: (bookings ?? []) as BookingRow[],
    counts: {
      today: todayCount ?? 0,
      upcoming: upcomingCount ?? 0,
      pending: pendingCount ?? 0,
      total: totalCount ?? 0,
    },
    today,
  });
}
