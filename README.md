# Doctors Divine — Live Booking + Dashboard Website

Doctors Divine Multispeciality Hospital, Nawada (Bihar) ki asli, live website:
ek hi web me **3 pages** — hospital showcase (Home), online appointment booking
(Book Appointment) aur password-locked doctor dashboard (Dashboard).

- **Home** — hospital ki jaankari: asli photos (building, team, surgery),
  doctors, 8 services, 3 specialist centres, lab tests, gallery, FAQs,
  timings aur address.
- **Book Appointment** — patient doctor, date aur time slot chunta hai, form
  bharta hai, booking database me save hoti hai aur **token number**
  (jaise `DD-7860`) turant milta hai.
- **Dashboard** — sirf doctor ke liye. Admin password se khulta hai. Bookings
  ki list (Today/All), counts (Today/Upcoming/Pending/Total), search + status
  filter, Confirm / Mark done / Cancel / Delete, har 5 second me auto-refresh,
  aur 3 email addresses par booking alerts.

**Isme kya NAHI hai (saaf-saaf):** online payment nahi hai, SMS alert nahi
hai, aur patient ka data kisi aur ko nahi dikhta — dashboard sirf password se
khulta hai.

---

## 1. Pehle samajh lein — kya-kya chahiye

| Cheez | Kahan se | Paisa |
|---|---|---|
| Supabase project (database) | https://supabase.com | Free tier — card nahi chahiye |
| Vercel account (website hosting) | https://vercel.com | Free tier — card nahi chahiye |
| Resend account (email alerts, optional) | https://resend.com | Free tier — card nahi chahiye |
| GitHub account (code rakhne ke liye, Vercel ke liye zaroori) | https://github.com | Free |

Poora system free tier par chalta hai. Free tier ki limits neeche “Free-tier
limits” me likhi hain.

---

## 2. Step 1 — NAYA Supabase project banayein (database)

> ⚠️ **Zaroori:** Hamesha **NAYA** project banayein. Kisi purane ya paused
> project ko haath mat lagayein — chahe wo aapka hi kyun na ho. Purana project
> kisi aur app ka ho sakta hai, aur usme ye tables daalne se wo app kharab ho
> sakta hai.

1. https://supabase.com kholein, sign in karein, **New project** dabayein.
2. Project ka naam dein, jaise `doctors-divine`. Database password apne paas
   safe jagah likh lein. Region apne sabse paas wala chunein (jaise
   `Mumbai / ap-south-1` dikhe to wahi).
3. Project banne ka wait karein (1–2 minute).
4. Left menu me **SQL Editor** kholein → **New query** → is repo ki file
   `supabase/schema.sql` ka **poora content** copy karke paste karein →
   **Run** dabayein.
   - Success aana chahiye. Isse 2 tables banengi: `bookings` (khali — koi
     sample booking nahi) aur `settings` (khali email row).
5. Ab keys copy karein: left menu me **Project Settings** (⚙️) → **API**:
   - **Project URL** — jaise `https://abcdefgh.supabase.co`
   - **service_role key** — lambi secret key, jo `eyJ...` se shuru hoti hai.
     ⚠️ Ye key **secret** hai. Ise kabhi browser me, kisi chat me, ya kisi
     public jagah paste mat karein. Sirf Vercel ke env var me daalni hai.

---

## 3. Step 2 — Admin password ka hash banayein

Dashboard ka password seedha kabhi kisi file ya env var me **nahi** likha
jata. Uske badle uska **bcrypt hash** banaya jata hai.

1. Is code ko apne computer par kholein aur terminal me ye chalyein:
   ```bash
   npm install
   npm run hash-password -- "ApnaMazbootPassword123"
   ```
   (Password apna rakhein, kam se kam 8 characters, aur aisa jo koi guess na
   kar sake.)
2. Terminal ek lambi line print karega jo `$2b$12$...` se shuru hoti hai.
   **Wahi hash** copy karein — password nahi.
3. Password ko safe jagah likh kar rakhein (diary/password manager).

> ⚠️ **Password recovery NAHI hai.** Password bhool gaye to dashboard se
> bookings nahi khulengi. Ek hi rasta hai: naya password lekar naya hash
> banayein, Vercel me `ADMIN_PASSWORD_HASH` update karein, redeploy karein
> (neeche “Admin password badalna ya bhool jana” dekhein).

---

## 4. Step 3 — Vercel par deploy karein (website live)

1. Is poore `doctors-divine-live` folder ko GitHub par ek **naye private
   repository** me daal dein (GitHub Desktop ya `git push` se — repo private
   rakhna hi kaafi hai, kyunki `.env` files git me nahi jayengi; `.gitignore`
   me wo pehle se blocked hain).
2. https://vercel.com kholein, sign in karein, **Add New → Project** →
   apna GitHub repo chunein → **Import**.
3. **Environment Variables** section me ye 5 values daalein (pehle wale steps
   se copy karke):

   | Variable | Value kahan se |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role key |
   | `ADMIN_PASSWORD_HASH` | Step 2 me bana hash (`$2b$12$...`) |
   | `ADMIN_SESSION_SECRET` | Koi lambi random line (password generator se) — optional, par daalna achha hai |
   | `RESEND_API_KEY` | Abhi khali chhod dein (email baad me Step 5 se on karna) |

4. **Deploy** dabayein. 1–2 minute me Vercel aapko ek public link dega,
   jaise `https://doctors-divine.vercel.app`. **Bas — website live hai.**
   - Home page: `https://.../`
   - Book Appointment: `https://.../book`
   - Dashboard: `https://.../dashboard`

> Agar baad me code me kuch badlein aur GitHub par push karein, Vercel apne
> aap dobara deploy kar dega.

---

## 5. Step 4 — Doctor dashboard kaise kholega

1. Browser me `https://.../dashboard` kholein.
2. Pehli baar page bolega ki password set hai — **admin password** daalein
   (wahi password jiska hash Step 2 me banaya tha) → **Unlock bookings**.
3. Andar: upar LIVE bar (har 5 second me auto-refresh), counts, Today/All
   toggle, search aur status filter, aur har booking par Confirm / Mark done /
   Cancel / Delete buttons.
4. Kaam khatam ho to **Lock now** dabayein — dashboard turant lock ho jayega.
   Session waise bhi 12 ghante me apne aap khatam ho jata hai.
5. Nayi booking aate hi dashboard khula ho to green banner aayega —
   “New booking just arrived” — aur us booking par **NEW** badge lagega.

---

## 6. Step 5 — Email alerts on karein (optional, Resend se)

Jab tak ye step na karein, email alerts **OFF** rahenge — bookings phir bhi
save hongi, dashboard me “Email off” dikhega. Ye normal hai, koi error nahi.

1. https://resend.com par free account banayein.
2. **API Keys** → **Create API Key** → key copy karein.
3. Vercel me project kholein → **Settings → Environment Variables** →
   `RESEND_API_KEY` me key daalein (aur `RESEND_FROM` default rehne dein) →
   **Redeploy** karein (Deployments → latest → ⋯ → Redeploy).
4. Dashboard kholein → neeche **Booking email alerts** me 3 email addresses
   daal kar **Save emails** dabayein.
5. Ab har nayi booking ki details teeno addresses par email se jayegi. Har
   booking par email ka status dikhega: `off / sending / sent / failed`.
   Failed ho to **Retry email** button se dobara bhej sakte hain.

> **Resend free tier ki ek limit jaan lein:** jab tak aap apna domain verify
> nahi karte, Resend sirf usi email par bhejta hai jo Resend account ka
> owner hai. Isliye agar 3 alag addresses par alert chahiye to Resend me apna
> domain verify karna hoga (Resend dashboard → Domains → apna domain add
> karein aur DNS records lagayein), phir `RESEND_FROM` ko apne domain wale
> address par badlein, jaise `Doctors Divine <alerts@doctorsdivine.com>`.
> Domain verify kiye bina 3 alag addresses par mail jaana guarantee nahi hai.

---

## 7. Local me chalana (test karne ke liye, zaroori nahi)

```bash
npm install
cp .env.example .env.local   # phir .env.local me asli values bharein
npm run dev                  # http://localhost:3000 kholein
```

Production build check karne ke liye:

```bash
npm run build
npm start
```

---

## 8. Environment variables — poori list

| Variable | Zaroori? | Kaam |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Haan | Supabase project ka URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Haan | Server se database access (secret, kabhi browser me nahi) |
| `ADMIN_PASSWORD_HASH` | Haan | Dashboard password ka bcrypt hash (password kabhi nahi) |
| `ADMIN_SESSION_SECRET` | Nahi (recommended) | Dashboard session cookie sign karne ka secret |
| `RESEND_API_KEY` | Nahi | Email alerts ke liye; khali = alerts OFF |
| `RESEND_FROM` | Nahi | Alert emails ka sender address (default: Resend onboarding address) |

`.env.example` me sirf placeholder values hain — asli keys kabhi kisi file
me mat daalein, sirf `.env.local` (local) ya Vercel ke env vars (live) me.

---

## 9. Free-tier limits (imaandari se)

- **Supabase free tier:** 500 MB database, 50,000 monthly active users tak
  theek hai; project 7 din inactive rahe to **pause** ho sakta hai — Supabase
  dashboard se Resume karna padta hai (ek click). Is hospital ke booking
  volume ke liye ye kaafi hai.
- **Vercel free tier:** personal projects ke liye free; bandwidth aur build
  minutes ki limit hoti hai, par ek hospital website ke liye kaafi hai.
- **Resend free tier:** 100 emails/day, 3,000/month. Har booking par 3 emails
  jati hain, to roz ~33 bookings tak free me chal jayega.

---

## 10. Admin password badalna ya bhool jana

1. Naya password soch lein.
2. `npm run hash-password -- "NayaPassword123"` se naya hash banayein.
3. Vercel → Settings → Environment Variables → `ADMIN_PASSWORD_HASH` ki
   value badal dein → Redeploy karein.
4. Purane sessions apne aap khatam ho jayenge; naya password se login karein.

---

## 11. Photo honesty note

Home page ki gallery me team, building aur surgery ki photos hospital ki
**asli** photos hain (doctorsdivine.com se). Baaki facility photos
(OT, ICU, maternity, pharmacy) **illustrative** hain — suvidha samjhane ke
liye — aur gallery me un par “illustrative” label laga hai. Official use se
pehle hospital ki permission le lena achha rahega, kyunki asli photos unhi
ki hain.

---

## 12. Project structure

```
app/
  page.tsx            Home (showcase)
  book/page.tsx       Book Appointment form
  dashboard/page.tsx  Password-locked dashboard (live polling)
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
lib/
  data.ts      Hospital content (doctors, services, lab, FAQs, gallery)
  supabase.ts  Server-only Supabase client (service-role key)
  auth.ts      Bcrypt check + signed session cookie
  email.ts     Resend send + recipients read
  admin.ts     Admin-session guard for API routes
supabase/schema.sql   Tables + RLS (run once in a NEW project)
scripts/generate-hash.mjs   Admin password hash generator
public/images/        Hospital photos (real ones + labeled illustrative ones)
```
