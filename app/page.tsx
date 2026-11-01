import Image from "next/image";
import Link from "next/link";
import {
  CENTRES,
  DOCTORS,
  FAQS,
  GALLERY,
  HOSPITAL,
  LAB_TESTS,
  SERVICES,
  TIMINGS,
} from "@/lib/data";
import {
  AlertIcon,
  BulbIcon,
  CalendarIcon,
  ChatIcon,
  ClockIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ServiceIcon,
} from "./icons";

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-extrabold text-brand-ink sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 text-sm text-brand-muted">{sub}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[420px] w-full sm:h-[520px]">
          <Image
            src="/images/building.jpg"
            alt="Doctors Divine Multispeciality Hospital building in Navin Nagar, Nawada with 24×7 Emergency entrance"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-white">
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Trusted care for every village of Nawada
          </h1>
          <p className="mt-3 max-w-xl text-sm text-brand-muted sm:text-base">
            Surgery, maternity and 24×7 emergency care — no need to go to Patna
            anymore. Book an appointment online in just 30 seconds — choose a
            doctor, choose a time slot, get your token number instantly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="btn-primary shadow inline-flex items-center gap-1.5"
            >
              <CalendarIcon className="h-4 w-4" /> Book Appointment
            </Link>
            <a
              href={`tel:${HOSPITAL.phoneHref}`}
              className="btn-secondary shadow inline-flex items-center gap-1.5"
            >
              <PhoneIcon className="h-4 w-4" /> {HOSPITAL.phoneDisplay}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-brand-surface/15 px-3 py-1">✓ 1,000+ surgeries</span>
            <span className="rounded-full bg-brand-surface/15 px-3 py-1">✓ In-house lab &amp; pharmacy</span>
            <span className="rounded-full bg-brand-surface/15 px-3 py-1">✓ MD / MS specialists</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-surface/15 px-3 py-1"><AlertIcon className="h-3.5 w-3.5" /> 24×7 Emergency</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 text-center sm:grid-cols-4">
        {[
          ["1,000+", "Surgeries performed"],
          ["24×7", "Emergency, ICU & OT ready"],
          ["10+", "Beds including ICU care"],
          ["2020", "Serving Nawada since"],
        ].map(([big, small]) => (
          <div key={small} className="rounded-2xl border border-brand-line bg-brand-midnight p-5">
            <p className="text-2xl font-extrabold text-brand-electricdark">{big}</p>
            <p className="mt-1 text-xs font-semibold text-brand-muted">{small}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          title="Everything a family needs, under one roof"
          sub="From OPD to surgery, delivery, lab and medicines — complete treatment at one place, in Navin Nagar."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-brand-line p-5">
              <ServiceIcon name={s.icon} className="h-8 w-8 text-brand-electricdark" />
              <h3 className="mt-3 font-bold text-brand-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-brand-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Centres */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          title="Specialist care centres"
          sub="Trusted care in Nawada since 2020 — the facilities you once had to travel to Patna for are now close to home."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {CENTRES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-brand-line bg-brand-midnight p-6">
              <h3 className="font-bold text-brand-ink">{c.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{c.desc}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {c.points.map((p) => (
                  <li key={p}>✓ {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          title="Doctors who understand you"
          sub="MD and MS specialists — right here in Nawada, no need to go to Patna."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOCTORS.map((d) => (
            <article key={d.name} className="rounded-2xl border border-brand-line p-6">
              <h3 className="text-lg font-extrabold">{d.name}</h3>
              <p className="text-sm font-semibold text-brand-electric">{d.title}</p>
              <p className="mt-1 text-xs text-brand-muted">{d.tagline}</p>
              <p className="mt-3 text-sm text-brand-muted">{d.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {d.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold">{s}</span>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-brand-muted">● {d.opd}</p>
              <div className="mt-4 flex gap-2">
                <Link href="/book" className="btn-primary inline-flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> Book Appointment</Link>
                <a
                  href={`https://wa.me/918797303540?text=${encodeURIComponent(`Hello, I would like to meet ${d.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex items-center gap-1.5"
                >
                  <ChatIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-brand-muted">
          Could not find a doctor? Call the hospital and we will connect you
          with the right specialist:{" "}
          <a href={`tel:${HOSPITAL.phoneHref}`} className="font-bold text-brand-electric">{HOSPITAL.phoneDisplay}</a>
        </p>
      </section>

      {/* Lab */}
      <section id="lab" className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          title="Book a lab test — from home"
          sub="The hospital's own lab — accurate reports, on time. 24-hour sample collection available. To book a test, WhatsApp or call us."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_TESTS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-brand-line p-5">
              <p className="font-bold text-brand-ink">{t.name}</p>
              <p className="mt-1 text-sm text-brand-muted">{t.desc}</p>
              <p className="mt-2 text-xs font-bold text-brand-electric">{t.report}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href={HOSPITAL.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 btn-secondary"
          >
            <ChatIcon className="h-4 w-4" /> Book a test on WhatsApp
          </a>
        </div>
      </section>

      {/* Gallery — honest labeling */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          title="See your hospital"
          sub="The team, building and surgery photos are the hospital's own real photos. The other facility photos are illustrative — to explain the facilities."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g) => (
            <figure key={g.src} className="overflow-hidden rounded-2xl border border-brand-line">
              <div className="relative h-52 w-full">
                <Image src={g.src} alt={g.caption} fill className="object-cover" />
              </div>
              <figcaption className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
                <span>{g.caption}</span>
                {!g.real && (
                  <span className="rounded-full bg-brand-surface px-2 py-0.5 text-[11px] text-brand-muted">
                    illustrative
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="mx-auto max-w-3xl px-4 py-12">
        <SectionTitle title="Frequently asked questions" />
        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-2xl border border-brand-line p-5">
              <summary className="cursor-pointer font-bold">{f.q}</summary>
              <p className="mt-2 text-sm text-brand-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Visit us */}
      <section id="visit" className="mx-auto max-w-6xl px-4 pt-12 pb-16">
        <SectionTitle title="Visit Us" />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-line p-6">
            <p className="font-bold"><PinIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.name}</p>
            {HOSPITAL.addressLines.map((l) => (
              <p key={l} className="text-sm text-brand-muted">{l}</p>
            ))}
            <p className="mt-4 text-sm"><PhoneIcon className="mr-1 inline h-4 w-4 align-middle" /> <a href={`tel:${HOSPITAL.phoneHref}`} className="font-bold text-brand-electric">{HOSPITAL.phoneDisplay}</a> — Emergency and appointments, 24×7</p>
            <p className="mt-1 text-sm"><PhoneIcon className="mr-1 inline h-4 w-4 align-middle" /> <a href={`tel:${HOSPITAL.phoneAltHref}`} className="font-bold text-brand-electric">{HOSPITAL.phoneAltDisplay}</a> — Appointments</p>
            <p className="mt-1 text-sm"><MailIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.email}</p>
            <p className="mt-1 text-sm"><GlobeIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.website}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/book" className="btn-primary inline-flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> Book Appointment</Link>
              <a href={HOSPITAL.whatsappHref} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center gap-1.5"><ChatIcon className="h-4 w-4" /> WhatsApp us</a>
            </div>
            <p className="mt-5 rounded-xl bg-brand-surface p-4 text-sm">
              <BulbIcon className="mr-1 inline h-4 w-4 align-middle" /> <b>Tip:</b> To avoid the crowd, book an online token
              before coming — you will meet the doctor as soon as your number comes.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-line p-6">
            <p className="font-bold"><ClockIcon className="mr-1 inline h-4 w-4 align-middle" /> Timings</p>
            <ul className="mt-3 space-y-2 text-sm">
              {TIMINGS.map((t) => (
                <li key={t.label} className="flex justify-between gap-4 border-b border-brand-line pb-2">
                  <span className="text-brand-muted">{t.label}</span>
                  <span className="text-right font-semibold">{t.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-brand-surface p-4 text-sm">
              <AlertIcon className="mr-1 inline h-4 w-4 align-middle" /> <b>What to do in an emergency?</b> Do not wait for a booking.
              Call <a href={`tel:${HOSPITAL.phoneHref}`} className="font-bold text-brand-electric">{HOSPITAL.phoneDisplay}</a> immediately to
              inform the hospital and come straight to the Navin Nagar hospital
              — the team will be ready.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
