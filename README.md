# Doctors Divine — Hospital Website with Live Appointment Booking

The official website of **Doctors Divine Multispeciality Hospital, Nawada (Bihar)** — a single Next.js app that combines a hospital showcase, online appointment booking with an instant token number, a password-protected doctor dashboard, and an appointment reminder system.

- **Live website:** https://doctors-divine-live.vercel.app
- **GitHub repository:** https://github.com/02zenxbets-png/doctors-divine-live (private)
- **Stack:** Next.js 14 · React 18 · TypeScript · Tailwind CSS · Supabase (PostgreSQL) · Resend · Vercel

---

## What this website does

### 1. Home — the hospital showcase

Everything a patient needs before visiting: the hospital's real photos (building, team, surgery), both doctors and their specialities, 8 services, 3 specialist centres, lab tests with report times, a photo gallery, FAQs, OPD timings and the address. The hospital runs 24×7 for emergency and ICU care.

### 2. Book Appointment — online booking with an instant token

A patient chooses a doctor, a date and a time slot, fills in a short form (name, 10-digit mobile, age, area, problem), and the booking is saved to the database. A **token number** (for example `DD-7860`) is shown immediately — the patient shows this token at reception when they visit. No account, no login and no payment is needed to book.

### 3. Dashboard — for the doctor only

The dashboard is locked behind an admin password. Once unlocked it shows:

- **Live counts** — Today, Upcoming, Pending and Total bookings
- **Live list** — bookings for today or all bookings, auto-refreshed every 5 seconds
- **Search and filters** — search by name, mobile or token; filter by status
- **Actions on every booking** — Confirm, Mark done, Cancel, Delete
- **New-booking alerts** — a banner and a NEW badge appear the moment a booking arrives while the dashboard is open
- **Email alerts** — every new booking is emailed to up to 3 addresses (optional, via Resend)

### 4. Appointment reminders — built into the dashboard

Patients used to receive no confirmation or reminder at all — email alerts went only to the hospital. The Reminders section fixes that. It sorts bookings into five ready-to-send lists, using the Indian Standard Time date:

| List | When to send | Message |
|---|---|---|
| **New — confirm now** | Right after booking | Booking confirmation with token, doctor, date and time |
| **Today** | On the morning of the appointment | Same-day reminder |
| **Tomorrow** | The evening before | Day-before reminder |
| **No-show** | The day after a missed appointment | Reschedule message |
| **Follow-up** | The day after a completed visit | Recovery check-in message |

For every patient the dashboard shows the ready-written message and three actions: **Copy message**, **Open WhatsApp** (opens a chat with the patient on their saved mobile number) and **Mark sent**, so the same reminder is never sent twice. "Mark sent" is stored in that browser only.

Sending is **manual by design**: automated WhatsApp sending needs WhatsApp Business API approval and costs money, and bulk auto-sending risks getting the number banned — so the staff stays in control of every message. The reminders need no database change and no new credentials: they read the existing `bookings` table, where the mobile number is already saved.

---

## What this website does NOT do

Being honest about the limits, so nobody is surprised later:

- **No online payment.** Booking is free and payment (if any) happens at the hospital.
- **No SMS alerts to patients.** Reminders go through WhatsApp, sent manually from the dashboard (see above).
- **No real-time slot blocking.** Two patients can pick the same slot; bookings arrive as Pending and the staff confirms them from the dashboard.
- **No patient accounts.** There is no login for patients and no medical history stored here — only the booking itself.

---

## How it works

```
Patient (browser)
  → /book form → POST /api/bookings
  → validates name, mobile, doctor, date, slot
  → saves the booking in Supabase (status: pending)
  → best-effort email alert to the hospital (a failed email never fails the booking)
  → returns the token number to the patient

Doctor (browser)
  → /dashboard → enters the admin password once
  → signed session cookie, valid for 12 hours
  → GET /api/admin/bookings (auto-refresh every 5 seconds)
  → Confirm / Mark done / Cancel / Delete, retry a failed email
  → GET /api/admin/reminders for the five reminder lists
```

**Security, by design:**

- Row Level Security is **enabled** on both tables (`bookings`, `settings`) with **no policies** for the browser roles — nobody can read or write the database from the browser, even with the public anon key.
- The app only touches the database from the server (Next.js API routes) using the **service-role key**, which is kept server-only and never starts with `NEXT_PUBLIC_`.
- The admin password is never stored as plain text — only its **bcrypt hash** is stored as an environment variable, and there is **no password recovery**. If the password is forgotten, a new hash must be generated and deployed (see "Changing the admin password" below).
- The dashboard session is a signed cookie that expires after 12 hours, and **Lock now** ends it immediately.

---

## Getting started

You need four free accounts: [Supabase](https://supabase.com) (database), [Vercel](https://vercel.com) (hosting), [GitHub](https://github.com) (code, required by Vercel) and, optionally, [Resend](https://resend.com) (email alerts). No credit card is needed for any of them. The whole system runs on their free tiers.

### Step 1 — Create a NEW Supabase project (the database)

> ⚠️ **Always create a NEW project.** Never reuse an old or paused project — even your own. It may belong to another app, and adding these tables to it could break that app.

1. Open https://supabase.com, sign in, and click **New project**.
2. Give it a name, for example `doctors-divine`. Write the database password down somewhere safe. Pick the region closest to you (for example `Mumbai / ap-south-1` if shown).
3. Wait 1–2 minutes for the project to be created.
4. In the left menu open **SQL Editor** → **New query** → copy the **entire contents** of `supabase/schema.sql` from this repository, paste it, and click **Run**. On success it creates two tables: `bookings` (empty — no sample bookings) and `settings` (one empty email row).
5. Now copy the keys: left menu → **Project Settings** (⚙️) → **API**:
   - **Project URL** — for example `https://abcdefgh.supabase.co`
   - **service_role key** — a long secret key starting with `eyJ...`. ⚠️ This key is **secret**. Never paste it in a browser, a chat or a public place. It goes only into a Vercel environment variable.

### Step 2 — Create the admin password hash

The dashboard password is never written in a file or an environment variable. Instead, a **bcrypt hash** of it is stored.

```bash
npm install
npm run hash-password -- "YourStrongPassword123"
```

Use your own password — at least 8 characters, and not something anyone could guess. The terminal prints a long line starting with `$2b$12$...`. **Copy that hash** — not the password. Write the password down somewhere safe (a diary or a password manager).

> ⚠️ **There is no password recovery.** If the password is forgotten, the dashboard cannot be opened. The only fix is to create a new password and hash, update `ADMIN_PASSWORD_HASH` in Vercel, and redeploy (see "Changing the admin password" below).

### Step 3 — Deploy on Vercel (go live)

1. Push this folder to a **new private repository** on GitHub (GitHub Desktop or `git push`). Keeping the repo private is enough — `.env` files are already blocked by `.gitignore`, so secrets never reach Git.
2. Open https://vercel.com, sign in, click **Add New → Project**, select the GitHub repository, and click **Import**.
3. In the **Environment Variables** section, add these values (copied from the steps above):

   | Variable | Where the value comes from |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role key |
   | `ADMIN_PASSWORD_HASH` | The hash created in Step 2 (`$2b$12$...`) |
   | `ADMIN_SESSION_SECRET` | Any long random string (from a password generator) — optional, but recommended |
   | `RESEND_API_KEY` | Leave empty for now (email is switched on in Step 5) |

4. Click **Deploy**. In 1–2 minutes Vercel gives you a public link, for example `https://doctors-divine.vercel.app`. **That is it — the website is live.**
   - Home: `https://.../`
   - Book Appointment: `https://.../book`
   - Dashboard: `https://.../dashboard`

If you later change the code and push to GitHub, Vercel redeploys automatically.

### Step 4 — How the doctor opens the dashboard

1. Open `https://.../dashboard` in a browser.
2. Enter the **admin password** (the one whose hash was created in Step 2) and click **Unlock bookings**.
3. Inside you will see the LIVE bar (auto-refresh every 5 seconds), the counts, the Today/All toggle, search and status filter, and Confirm / Mark done / Cancel / Delete on every booking — plus the Reminders section below the counts.
4. When finished, click **Lock now** — the dashboard locks immediately. The session also expires on its own after 12 hours.
5. If a new booking arrives while the dashboard is open, a green banner appears — "New booking just arrived" — and that booking carries a **NEW** badge.

### Step 5 — Switch on email alerts (optional, via Resend)

Until this step is done, email alerts stay **OFF** — bookings still save normally, and the dashboard simply shows "Email off". That is normal, not an error.

1. Create a free account at https://resend.com.
2. Go to **API Keys** → **Create API Key** and copy the key.
3. In Vercel, open the project → **Settings → Environment Variables** → put the key in `RESEND_API_KEY` (leave `RESEND_FROM` at its default) → **Redeploy** (Deployments → latest → ⋯ → Redeploy).
4. Open the dashboard → scroll to **Booking email alerts** → enter up to 3 email addresses and click **Save emails**.
5. From now on, every new booking is emailed to all three addresses. Each booking shows its email status: `off / sending / sent / failed`. If an email fails, the **Retry email** button sends it again.

> **One Resend free-tier limit to know:** until you verify your own domain, Resend only sends to the email address that owns the Resend account. So if alerts must reach 3 different addresses, verify your domain in Resend (Dashboard → Domains → add your domain and set the DNS records), then change `RESEND_FROM` to an address on your domain, for example `Doctors Divine <alerts@doctorsdivine.com>`. Without a verified domain, delivery to 3 different addresses is not guaranteed.

---

## Running locally (for testing — not required)

```bash
npm install
cp .env.example .env.local   # then fill in the real values in .env.local
npm run dev                  # open http://localhost:3000
```

To check the production build:

```bash
npm run build
npm start
```

---

## Environment variables — full list

| Variable | Required? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | The Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side database access (secret — never in the browser) |
| `ADMIN_PASSWORD_HASH` | Yes | The bcrypt hash of the dashboard password (never the password itself) |
| `ADMIN_SESSION_SECRET` | No (recommended) | Secret used to sign the dashboard session cookie |
| `RESEND_API_KEY` | No | Email alerts; empty means alerts are OFF |
| `RESEND_FROM` | No | Sender address on alert emails (default: Resend's onboarding address) |

`.env.example` contains placeholder values only — never put real keys or passwords in a file. Use `.env.local` locally and Vercel's environment variables for the live site.

---

## Free-tier limits (stated honestly)

- **Supabase free tier:** 500 MB database — plenty for this hospital's booking volume. A project left inactive for 7 days may be **paused**; resume it with one click from the Supabase dashboard.
- **Vercel free tier:** free for personal projects, with limits on bandwidth and build minutes — more than enough for a hospital website.
- **Resend free tier:** 100 emails/day, 3,000/month. Each booking sends 3 emails, so roughly 33 bookings a day fit in the free tier.

---

## Changing the admin password (or if it is forgotten)

1. Choose a new password.
2. Create a new hash: `npm run hash-password -- "YourNewPassword123"`.
3. In Vercel → Settings → Environment Variables, replace the value of `ADMIN_PASSWORD_HASH` → Redeploy.
4. Old sessions end automatically; sign in with the new password.

---

## Photo honesty note

The team, building and surgery photos on the home page are the hospital's **real** photos (from doctorsdivine.com). The other facility photos (operation theatre, ICU, maternity, pharmacy) are **illustrative** — they explain a facility, not a real room — and the gallery labels them as "illustrative". Get the hospital's permission before using its real photos in official material, because those photos belong to the hospital.

---

## Project structure

```
app/
  page.tsx            Home (showcase)
  book/page.tsx       Book Appointment form
  dashboard/page.tsx  Password-locked dashboard (live polling + reminders)
  api/
    bookings/route.ts        Public booking create (+ email attempt)
    admin/
      status/route.ts        Locked/unlocked check
      verify/route.ts        Password -> session cookie
      logout/route.ts        Lock now
      bookings/route.ts      List + counts (admin only)
      bookings/[id]/route.ts Status change / delete (admin only)
      settings/route.ts      3 alert emails (admin only)
      retry-email/route.ts   Re-send booking email (admin only)
      reminders/route.ts     Reminder lists (admin only)
lib/
  reminders.ts   Reminder messages + wa.me links + IST dates
  data.ts        Hospital content (doctors, services, lab, FAQs, gallery)
  supabase.ts    Server-only Supabase client (service-role key)
  auth.ts        Bcrypt check + signed session cookie
  email.ts       Resend send + recipients read
  admin.ts       Admin-session guard for API routes
supabase/schema.sql           Tables + RLS (run once in a NEW project)
scripts/generate-hash.mjs     Admin password hash generator
public/images/                Hospital photos (real ones + labeled illustrative ones)
```
