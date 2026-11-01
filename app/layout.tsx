import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { HOSPITAL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Doctors Divine Multispeciality Hospital — Nawada | 24×7 Emergency",
  description:
    "Doctors Divine Multispeciality Hospital, Navin Nagar, Nawada — surgery, maternity, 24×7 emergency & ICU, in-house lab & pharmacy. Book an appointment online and get a token instantly.",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        <header className="sticky top-0 z-40 border-b border-brand-line bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-darkred text-xl font-extrabold text-white">
                D
              </span>
              <span className="leading-tight">
                <span className="block text-base font-extrabold text-brand-ink">
                  Doctors Divine
                </span>
                <span className="block text-[11px] font-semibold tracking-wide text-brand-muted">
                  MULTISPECIALITY HOSPITAL · NAWADA
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/book">Book Appointment</NavLink>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <a
                href={`tel:${HOSPITAL.phoneHref}`}
                className="ml-1 hidden rounded-lg bg-brand-ink px-3 py-2 text-sm font-bold text-white sm:block"
              >
                ☎ Call
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-brand-line bg-gray-50">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
            <div>
              <p className="text-base font-extrabold">Doctors Divine</p>
              <p className="mt-1 text-sm text-brand-muted">
                Multispeciality Hospital — your health is our responsibility.
                Serving Navin Nagar, Nawada — aur aas-paas ke har gaon ko —
                since 2020.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Quick Links</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/book" className="text-brand-red hover:underline">Book Appointment</Link></li>
                <li><Link href="/#services" className="text-brand-red hover:underline">Services</Link></li>
                <li><Link href="/#doctors" className="text-brand-red hover:underline">Our Doctors</Link></li>
                <li><Link href="/#faqs" className="text-brand-red hover:underline">FAQs</Link></li>
                <li><Link href="/#visit" className="text-brand-red hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">Contact</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                <li>☎ <a href={`tel:${HOSPITAL.phoneHref}`} className="hover:underline">{HOSPITAL.phoneDisplay}</a></li>
                <li>☎ <a href={`tel:${HOSPITAL.phoneAltHref}`} className="hover:underline">{HOSPITAL.phoneAltDisplay}</a></li>
                <li>✉ {HOSPITAL.email}</li>
                <li>📍 {HOSPITAL.addressShort}</li>
                <li>🌐 {HOSPITAL.website}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-line py-4 text-center text-xs text-brand-muted">
            © {new Date().getFullYear()} Doctors Divine Multispeciality Hospital, Nawada. All rights reserved. · 24×7 Emergency: {HOSPITAL.phoneDisplay}
          </div>
        </footer>

        {/* Mobile sticky Call / WhatsApp / Book bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-line bg-white sm:hidden">
          <a href={`tel:${HOSPITAL.phoneHref}`} className="flex-1 py-3 text-center text-sm font-bold">☎ Call</a>
          <a href={HOSPITAL.whatsappHref} target="_blank" rel="noreferrer" className="flex-1 border-x border-brand-line py-3 text-center text-sm font-bold text-green-700">💬 WhatsApp</a>
          <Link href="/book" className="flex-1 bg-brand-darkred py-3 text-center text-sm font-bold text-white">Book Appointment</Link>
        </div>
        {/* Spacer so the sticky bar never covers footer content on mobile */}
        <div className="h-12 sm:hidden" />
      </body>
    </html>
  );
}
