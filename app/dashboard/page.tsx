"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Booking = {
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

type Counts = { today: number; upcoming: number; pending: number; total: number };

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  done: "Done",
  cancelled: "Cancelled",
};

const EMAIL_LABEL: Record<string, string> = {
  off: "Email off",
  sending: "Email sending…",
  sent: "Email sent",
  failed: "Email failed",
};

export default function DashboardPage() {
  const [phase, setPhase] = useState<"loading" | "not-configured" | "locked" | "open">("loading");
  const [password, setPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counts, setCounts] = useState<Counts>({ today: 0, upcoming: 0, pending: 0, total: 0 });
  const [scope, setScope] = useState<"today" | "all">("today");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loadError, setLoadError] = useState("");
  const [banner, setBanner] = useState<Booking | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const knownIds = useRef<Set<string>>(new Set());
  const firstLoad = useRef(true);

  // Debounce search input so typing doesn't hammer the API.
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const load = useCallback(async () => {
    const params = new URLSearchParams({ scope });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("q", search);
    try {
      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      if (res.status === 401) {
        setPhase("locked");
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setLoadError(json.error || "Bookings load nahi ho payi.");
        return;
      }
      const list: Booking[] = json.bookings ?? [];
      setCounts(json.counts ?? { today: 0, upcoming: 0, pending: 0, total: 0 });
      setLoadError("");
      if (firstLoad.current) {
        knownIds.current = new Set(list.map((b) => b.id));
        firstLoad.current = false;
      } else {
        const fresh = list.filter((b) => !knownIds.current.has(b.id));
        if (fresh.length > 0) {
          setBanner(fresh[0]);
          setNewIds((prev) => new Set([...prev, ...fresh.map((b) => b.id)]));
        }
        knownIds.current = new Set([...knownIds.current, ...list.map((b) => b.id)]);
      }
      setBookings(list);
      setLastUpdated(new Date());
    } catch {
      setLoadError("Network problem. Refresh now dabayein.");
    }
  }, [scope, statusFilter, search]);

  // Initial status check.
  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((j) => {
        if (!j.configured) setPhase("not-configured");
        else if (j.unlocked) setPhase("open");
        else setPhase("locked");
      })
      .catch(() => setPhase("locked"));
  }, []);

  // Polling: auto-refresh every 5 seconds while open and not paused.
  useEffect(() => {
    if (phase !== "open") return;
    load();
    if (paused) return;
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [phase, paused, load]);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setUnlockError("");
    setUnlocking(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setUnlockError(json.error || "Unlock nahi ho paya.");
        return;
      }
      setPassword("");
      firstLoad.current = true;
      knownIds.current = new Set();
      setPhase("open");
    } catch {
      setUnlockError("Network problem. Dobara try karein.");
    } finally {
      setUnlocking(false);
    }
  }

  async function lockNow() {
    await fetch("/api/admin/logout", { method: "POST" });
    setPhase("locked");
    setBookings([]);
  }

  async function act(id: string, action: "status" | "delete" | "retry", value?: string) {
    if (action === "delete" && !confirm("Ye booking delete kar dein?")) return;
    const url =
      action === "retry"
        ? "/api/admin/retry-email"
        : `/api/admin/bookings/${id}`;
    const res = await fetch(url, {
      method: action === "status" ? "PATCH" : action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: action === "retry" ? JSON.stringify({ id }) : action === "status" ? JSON.stringify({ status: value }) : undefined,
    });
    if (!res.ok && res.status === 401) setPhase("locked");
    load();
  }

  // ---- Email settings ----
  const [emails, setEmails] = useState({ email_1: "", email_2: "", email_3: "" });
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  useEffect(() => {
    if (phase !== "open") return;
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.email_1 !== undefined) {
          setEmails({ email_1: j.email_1 ?? "", email_2: j.email_2 ?? "", email_3: j.email_3 ?? "" });
          setEmailConfigured(Boolean(j.emailConfigured));
        }
      })
      .catch(() => {});
  }, [phase]);

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSettingsMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emails),
    });
    if (res.status === 401) return setPhase("locked");
    setSettingsMsg(res.ok ? "Emails save ho gaye." : "Save nahi ho paye.");
  }

  if (phase === "loading") {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-brand-muted">Loading…</div>;
  }

  if (phase === "not-configured") {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-extrabold">Dashboard locked — password set nahi hai</h1>
        <p className="mt-3 text-sm text-brand-muted">
          Dashboard ka admin password abhi set nahi hua hai. README me diye
          steps se <code className="bg-gray-100 px-1">ADMIN_PASSWORD_HASH</code>{" "}
          banayein aur Vercel me env var set karein, phir ye page kholein.
        </p>
      </div>
    );
  }

  if (phase === "locked") {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-3 text-2xl font-extrabold">Dashboard — Doctor only</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Bookings sirf doctor dekh sakta hai. Admin password daalein.
        </p>
        <form onSubmit={unlock} className="mt-6 space-y-3 rounded-2xl border border-brand-line p-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
            autoFocus
            required
          />
          {unlockError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{unlockError}</p>
          )}
          <button
            type="submit"
            disabled={unlocking}
            className="w-full btn-primary"
          >
            {unlocking ? "Checking…" : "Unlock bookings"}
          </button>
        </form>
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-xs text-amber-800">
          ⚠️ Password ka koi recovery/reset nahi hai — bhool gaye to bookings is
          dashboard se nahi khulengi. Password safe jagah likh kar rakho; reset
          ke liye Vercel me ADMIN_PASSWORD_HASH badalna hoga (README dekhein).
        </p>
      </div>
    );
  }

  const ago = lastUpdated
    ? Math.max(0, Math.round((Date.now() - lastUpdated.getTime()) / 1000))
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* LIVE bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gray-900 px-4 py-3 text-white">
        <p className="flex items-center gap-2 text-sm font-bold">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 ${paused ? "hidden" : "opacity-75"}`} />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${paused ? "bg-gray-400" : "bg-green-500"}`} />
          </span>
          {paused ? "LIVE paused" : "LIVE"}
          <span className="font-normal text-gray-300">
            · Last updated {ago === null ? "…" : ago === 0 ? "just now" : `${ago}s ago`} · auto-refresh every 5 sec
          </span>
        </p>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-900">Refresh now</button>
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-lg bg-gray-700 px-3 py-1.5 text-xs font-bold text-white"
          >
            {paused ? "Resume live" : "Pause live"}
          </button>
          <button onClick={lockNow} className="rounded-lg bg-brand-red px-3 py-1.5 text-xs font-bold text-white">
            Lock now
          </button>
        </div>
      </div>

      {banner && (
        <div className="mt-4 flex items-start justify-between gap-3 rounded-2xl bg-green-50 px-4 py-3">
          <p className="text-sm font-semibold text-green-800">
            🟢 New booking just arrived — {banner.patient_name}, token {banner.token}, {banner.date} · {banner.time_slot}
          </p>
          <button onClick={() => setBanner(null)} className="text-sm font-bold text-green-800">✕</button>
        </div>
      )}

      {/* Counts */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        {([
          ["Today", counts.today],
          ["Upcoming", counts.upcoming],
          ["Pending", counts.pending],
          ["Total", counts.total],
        ] as const).map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-brand-line bg-brand-bg p-4">
            <p className="text-2xl font-extrabold">{value}</p>
            <p className="text-xs font-semibold text-brand-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <div className="flex rounded-lg bg-gray-100 p-1">
          {(["today", "all"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`rounded-md px-3 py-1.5 text-sm font-bold ${scope === s ? "bg-gray-900 text-white" : "text-gray-700"}`}
            >
              {s === "today" ? "Today" : "All"}
            </button>
          ))}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-brand-line px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search naam / mobile / token…"
          className="min-w-[220px] flex-1 rounded-lg border border-brand-line px-3 py-2 text-sm"
        />
      </div>

      {loadError && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{loadError}</p>
      )}

      {/* List */}
      <div className="mt-4 space-y-3">
        {bookings.length === 0 && !loadError && (
          <p className="rounded-2xl border border-dashed border-brand-line p-8 text-center text-sm text-brand-muted">
            Koi booking nahi mili. Pehli asli booking Book Appointment page se aayegi.
          </p>
        )}
        {bookings.map((b) => (
          <article key={b.id} className="rounded-2xl border border-brand-line p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold">
                  {b.patient_name}
                  {newIds.has(b.id) && (
                    <span className="ml-2 rounded-full bg-green-600 px-2 py-0.5 text-[11px] font-bold text-white">NEW</span>
                  )}
                </p>
                <p className="text-sm text-brand-muted">
                  Token <b className="tnum text-brand-darkred">{b.token}</b> · {b.doctor} · {b.date} · {b.time_slot}
                </p>
                <p className="text-sm text-brand-muted">
                  📱 {b.mobile}
                  {b.age ? ` · Age ${b.age}` : ""}
                  {b.area ? ` · ${b.area}` : ""}
                  {b.problem ? ` · ${b.problem}` : ""}
                </p>
                <p className="mt-1 text-xs">
                  Status: <b>{STATUS_LABEL[b.status] ?? b.status}</b> · Email:{" "}
                  <b>{EMAIL_LABEL[b.email_status] ?? b.email_status}</b>
                  {b.email_error && <span className="text-red-600"> ({b.email_error})</span>}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {b.status !== "confirmed" && (
                  <button onClick={() => act(b.id, "status", "confirmed")} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-brand-ink ring-1 ring-inset ring-brand-line hover:bg-brand-bg">Confirm</button>
                )}
                {b.status !== "done" && (
                  <button onClick={() => act(b.id, "status", "done")} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-brand-ink ring-1 ring-inset ring-brand-line hover:bg-brand-bg">Mark done</button>
                )}
                {b.status !== "cancelled" && (
                  <button onClick={() => act(b.id, "status", "cancelled")} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-brand-ink ring-1 ring-inset ring-brand-line hover:bg-brand-bg">Cancel</button>
                )}
                {b.email_status === "failed" && (
                  <button onClick={() => act(b.id, "retry")} className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white">Retry email</button>
                )}
                <button onClick={() => act(b.id, "delete")} className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-bold text-white">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Email settings */}
      <section className="mt-8 rounded-2xl border border-brand-line p-5">
        <h2 className="font-extrabold">Booking email alerts</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Har nayi booking ki details in 3 email addresses par bheji jayegi.{" "}
          {emailConfigured
            ? "Email service (Resend) connected hai."
            : "Email service abhi OFF hai — RESEND_API_KEY set nahi hai, isliye koi email nahi bheja jayega (README dekhein)."}
        </p>
        <form onSubmit={saveSettings} className="mt-4 grid gap-2 sm:grid-cols-3">
          <input
            value={emails.email_1}
            onChange={(e) => setEmails({ ...emails, email_1: e.target.value })}
            placeholder="Email 1"
            type="email"
            className="rounded-lg border border-brand-line px-3 py-2 text-sm"
          />
          <input
            value={emails.email_2}
            onChange={(e) => setEmails({ ...emails, email_2: e.target.value })}
            placeholder="Email 2"
            type="email"
            className="rounded-lg border border-brand-line px-3 py-2 text-sm"
          />
          <input
            value={emails.email_3}
            onChange={(e) => setEmails({ ...emails, email_3: e.target.value })}
            placeholder="Email 3"
            type="email"
            className="rounded-lg border border-brand-line px-3 py-2 text-sm"
          />
          <button type="submit" className="btn-primary sm:col-span-3 sm:w-auto sm:justify-self-start">
            Save emails
          </button>
        </form>
        {settingsMsg && <p className="mt-2 text-sm font-semibold text-green-700">{settingsMsg}</p>}
      </section>

      {/* Admin password section */}
      <section className="mt-8 rounded-2xl border border-brand-line p-5">
        <h2 className="font-extrabold">Admin password — Doctor only</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Dashboard ka password Vercel ke env vars me <code className="bg-gray-100 px-1">ADMIN_PASSWORD_HASH</code> se
          set hota hai, is page se nahi. Password badalna ho to naya hash banakar
          Vercel me env var update karein aur redeploy karein (README: “Admin
          password badalna ya bhool jana”).
        </p>
      </section>
    </div>
  );
}
