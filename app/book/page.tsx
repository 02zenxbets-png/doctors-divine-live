"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DOCTORS, EVENING_SLOTS, HOSPITAL, MORNING_SLOTS } from "@/lib/data";

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
    if (!name.trim()) return setError("Patient ka naam zaroori hai.");
    if (!mobileOk) return setError("Sahi 10-digit mobile number daalein.");
    if (!date) return setError("Date chunein.");
    if (!slot) return setError("Time slot chunein.");
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
        setError(json.error || "Booking save nahi ho payi. Dobara try karein.");
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
      setError("Network problem. Dobara try karein ya hospital ko call karein.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    const waText = encodeURIComponent(
      `Namaste, meri booking confirm hui hai — Token ${done.token}, ${done.patientName}, ${done.doctor}, ${done.date}, ${done.timeSlot}.`
    );
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-5xl">✓</p>
        <h1 className="mt-4 text-2xl font-extrabold">Booking ho gayi!</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Hospital aate waqt ye token number reception par dikhayein.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-brand-line bg-brand-bg p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Your Token Number</p>
          <p className="tnum mt-1 text-4xl font-extrabold text-brand-darkred">{done.token}</p>
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
            className="btn-secondary"
          >
            💬 WhatsApp par confirm karein
          </a>
          <a href={`tel:${HOSPITAL.phoneHref}`} className="btn-secondary">
            ☎ Hospital ko call karein
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
          className="mt-6 text-sm font-bold text-brand-red hover:underline"
        >
          Ek aur booking
        </button>
        <p className="mt-6 text-xs text-brand-muted">
          Emergency hai to booking ka wait na karein — seedha hospital aayein ya{" "}
          {HOSPITAL.phoneDisplay} par call karein. Hospital 24×7 khula hai.
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
      className={`rounded-lg px-3 py-2 text-sm font-bold ${
        slot === s
          ? "bg-brand-darkred text-white"
          : "bg-gray-100 text-brand-ink hover:bg-gray-200"
      }`}
    >
      {s}
    </button>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold">Book Appointment</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Doctor aur time slot khud chunein — booking turant confirm, token number
        ke saath. Bina call, bina line.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-6 rounded-2xl border border-brand-line p-5 sm:p-6">
        <div>
          <p className="text-sm font-bold">Step 1 — Doctor chunein</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[...DOCTORS.map((d) => d.name), "Other"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDoctor(d)}
                aria-pressed={doctor === d}
                className={`rounded-lg px-3 py-2 text-sm font-bold ${
                  doctor === d ? "bg-brand-darkred text-white" : "bg-gray-100 text-brand-ink"
                }`}
              >
                {d === "Other" ? "Koi aur / pata nahi" : d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Step 2 — Date aur time slot</p>
          <input
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
            required
          />
          <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-brand-muted">☀️ Morning OPD</p>
          <div className="mt-2 flex flex-wrap gap-2">{MORNING_SLOTS.map(slotBtn)}</div>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-brand-muted">🌙 Evening OPD</p>
          <div className="mt-2 flex flex-wrap gap-2">{EVENING_SLOTS.map(slotBtn)}</div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold">Step 3 — Patient ki details</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient ka naam *"
            className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
            required
          />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number * (10-digit)"
            inputMode="numeric"
            className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              inputMode="numeric"
              className="rounded-lg border border-brand-line px-3 py-2 text-sm"
            />
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Gaon / Area"
              className="rounded-lg border border-brand-line px-3 py-2 text-sm"
            />
          </div>
          <input
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Takleef (problem)"
            className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full btn-primary"
        >
          {saving ? "Booking save ho rahi hai…" : "✓ Confirm Booking"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-brand-muted">
        Help chahiye? Call karein{" "}
        <a href={`tel:${HOSPITAL.phoneHref}`} className="font-bold text-brand-red">{HOSPITAL.phoneDisplay}</a>{" "}
        ya WhatsApp par message karein.
      </p>
      <p className="mt-2 text-center text-sm">
        <Link href="/" className="font-bold text-brand-red hover:underline">← Hospital website par wapas</Link>
      </p>
    </div>
  );
}
