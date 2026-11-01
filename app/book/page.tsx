"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DOCTORS, EVENING_SLOTS, HOSPITAL, MORNING_SLOTS } from "@/lib/data";
import { ChatIcon, CheckIcon, MoonIcon, PhoneIcon, SunIcon } from "../icons";

type Done = {
  token: string;
  patientName: string;
  doctor: string;
  date: string;
  timeSlot: string;
  emailStatus: string;
};

function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(
    new Date()
  );
}

export default function BookPage() {
  const [doctor, setDoctor] = useState<string>("Dr. Ranvijay Bharti");
  const [date, setDate] = useState<string>(todayISO());
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [problem, setProblem] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  const mobileOk = useMemo(() => /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, "").slice(-10)), [mobile]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const cleanMobile = mobile.replace(/\D/g, "").slice(-10);
    if (!name.trim()) return setError("Patient name is required.");
    if (!mobileOk) return setError("Please enter a valid 10-digit mobile number.");
    if (!date) return setError("Please choose a date.");
    if (!slot) return setError("Please choose a time slot.");
    setSaving(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: name.trim(),
          mobile: cleanMobile,
          doctor,
          date,
          timeSlot: slot,
          problem: problem.trim() || undefined,
          age: age ? Number(age) : undefined,
          area: area.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Booking could not be saved. Please try again.");
        return;
      }
      setDone({
        token: json.token,
        patientName: name.trim(),
        doctor,
        date,
        timeSlot: slot,
        emailStatus: json.booking?.emailStatus ?? "off",
      });
    } catch {
      setError("Network problem. Please try again or call the hospital.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    const waText = encodeURIComponent(
      `Hello, my booking is confirmed — Token ${done.token}, ${done.patientName}, ${done.doctor}, ${done.date}, ${done.timeSlot}.`
    );
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckIcon className="mx-auto h-12 w-12 text-brand-electric" />
        <h1 className="mt-4 text-2xl font-extrabold">Booking confirmed!</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Show this token number at the reception when you visit the hospital.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-brand-line bg-brand-midnight p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Your Token Number</p>
          <p className="tnum mt-1 text-4xl font-extrabold text-brand-electric">{done.token}</p>
          <p className="mt-3 text-sm">
            {done.patientName} · {done.doctor}
          </p>
          <p className="text-sm text-brand-muted">
            {done.date} · {done.timeSlot}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a
            href={`https://wa.me/918797303540?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-1.5"
          >
            <ChatIcon className="h-4 w-4" /> Confirm on WhatsApp
          </a>
          <a href={`tel:${HOSPITAL.phoneHref}`} className="btn-secondary inline-flex items-center gap-1.5">
            <PhoneIcon className="h-4 w-4" /> Call the hospital
          </a>
        </div>
        <button
          onClick={() => {
            setDone(null);
            setSlot("");
            setName("");
            setMobile("");
            setAge("");
            setArea("");
            setProblem("");
          }}
          className="mt-6 text-sm font-bold text-brand-electric hover:underline"
        >
          Book another appointment
        </button>
        <p className="mt-6 text-xs text-brand-muted">
          In an emergency, do not wait for a booking — come straight to the hospital or
          call {HOSPITAL.phoneDisplay}. The hospital is open 24×7.
        </p>
      </div>
    );
  }

  const slotBtn = (s: string) => (
    <button
      key={s}
      type="button"
      onClick={() => setSlot(s)}
      aria-pressed={slot === s}
      className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
        slot === s
          ? "bg-brand-electricdark text-white"
          : "bg-brand-surface text-brand-ink hover:bg-brand-line"
      }`}
    >
      {s}
    </button>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold">Book Appointment</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Choose the doctor and time slot yourself — booking confirmed instantly,
        with a token number. No calls, no queues.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-6 rounded-2xl border border-brand-line p-5 sm:p-6">
        <div>
          <p className="text-sm font-bold">Step 1 — Choose a doctor</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[...DOCTORS.map((d) => d.name), "Other"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDoctor(d)}
                aria-pressed={doctor === d}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                  doctor === d ? "bg-brand-electricdark text-white" : "bg-brand-surface text-brand-ink"
                }`}
              >
                {d === "Other" ? "Other / Not sure" : d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Step 2 — Date and time slot</p>
          <label htmlFor="book-date" className="mt-2 block text-xs font-bold text-brand-muted">Date</label>
          <input
            id="book-date"
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
            required
          />
          <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-brand-muted"><SunIcon className="mr-1 inline h-4 w-4 align-middle" /> Morning OPD</p>
          <div className="mt-2 flex flex-wrap gap-2">{MORNING_SLOTS.map(slotBtn)}</div>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-brand-muted"><MoonIcon className="mr-1 inline h-4 w-4 align-middle" /> Evening OPD</p>
          <div className="mt-2 flex flex-wrap gap-2">{EVENING_SLOTS.map(slotBtn)}</div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold">Step 3 — Patient details</p>
          <div>
            <label htmlFor="book-name" className="mb-1 block text-xs font-bold text-brand-muted">Patient name *</label>
            <input
              id="book-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
              required
            />
          </div>
          <div>
            <label htmlFor="book-mobile" className="mb-1 block text-xs font-bold text-brand-muted">Mobile number *</label>
            <input
              id="book-mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="book-age" className="mb-1 block text-xs font-bold text-brand-muted">Age</label>
              <input
                id="book-age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 45"
                inputMode="numeric"
                className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
              />
            </div>
            <div>
              <label htmlFor="book-area" className="mb-1 block text-xs font-bold text-brand-muted">Village / Area</label>
              <input
                id="book-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Hisua"
                className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
              />
            </div>
          </div>
          <div>
            <label htmlFor="book-problem" className="mb-1 block text-xs font-bold text-brand-muted">Problem / symptoms</label>
            <input
              id="book-problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. Fever, stomach pain"
              className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/40"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-brand-surface px-3 py-2 text-sm font-semibold text-brand-cantaloupe">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full btn-primary inline-flex items-center justify-center gap-1.5"
        >
          {saving ? "Saving booking…" : (<><CheckIcon className="h-4 w-4" /> Confirm Booking</>)}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-brand-muted">
        Need help? Call{" "}
        <a href={`tel:${HOSPITAL.phoneHref}`} className="font-bold text-brand-electric">{HOSPITAL.phoneDisplay}</a>{" "}
        or message us on WhatsApp.
      </p>
      <p className="mt-2 text-center text-sm">
        <Link href="/" className="font-bold text-brand-electric hover:underline">← Back to the hospital website</Link>
      </p>
    </div>
  );
}
