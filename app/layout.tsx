import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { HOSPITAL } from "@/lib/data";
import { ChatIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { LogoMark } from "./logo";

export const metadata: Metadata = {
  title: "Doctors Divine Multispeciality Hospital — Nawada | 24×7 Emergency",
  description:
    "Doctors Divine Multispeciality Hospital, Navin Nagar, Nawada — surgery, maternity, 24×7 emergency & ICU, in-house lab & pharmacy. Book an appointment online and get a token instantly.",
};

function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-semibold text-brand-muted hover:bg-brand-surface ${className}`}
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-midnight/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="h-12 w-12 shrink-0" />
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
              <NavLink href="/" className="hidden sm:inline-block">Home</NavLink>
              <NavLink href="/book">Book Appointment</NavLink>
              <a
                href={`tel:${HOSPITAL.phoneHref}`}
                className="ml-1 hidden items-center gap-1.5 rounded-lg bg-brand-electric px-3 py-2 text-sm font-bold text-white sm:inline-flex"
              >
                <PhoneIcon className="h-4 w-4" /> Call
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-brand-line bg-brand-midnight">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
            <div>
              <p className="flex items-center gap-2 text-base font-extrabold"><LogoMark className="h-12 w-12 shrink-0" /> Doctors Divine</p>
              <p className="mt-1 text-sm text-brand-muted">
                Multispeciality Hospital — your health is our responsibility.
                Serving Navin Nagar, Nawada — and every village around —
                since 2020.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Quick Links</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/book" className="text-brand-electric hover:underline">Book Appointment</Link></li>
                <li><Link href="/#services" className="text-brand-electric hover:underline">Services</Link></li>
                <li><Link href="/#doctors" className="text-brand-electric hover:underline">Our Doctors</Link></li>
                <li><Link href="/#faqs" className="text-brand-electric hover:underline">FAQs</Link></li>
                <li><Link href="/#visit" className="text-brand-electric hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">Contact</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                <li><PhoneIcon className="mr-1 inline h-4 w-4 align-middle" /> <a href={`tel:${HOSPITAL.phoneHref}`} className="hover:underline">{HOSPITAL.phoneDisplay}</a></li>
                <li><PhoneIcon className="mr-1 inline h-4 w-4 align-middle" /> <a href={`tel:${HOSPITAL.phoneAltHref}`} className="hover:underline">{HOSPITAL.phoneAltDisplay}</a></li>
                <li><MailIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.email}</li>
                <li><PinIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.addressShort}</li>
                <li><GlobeIcon className="mr-1 inline h-4 w-4 align-middle" /> {HOSPITAL.website}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-line py-4 text-center text-xs text-brand-muted">
            © {new Date().getFullYear()} Doctors Divine Multispeciality Hospital, Nawada. All rights reserved. · 24×7 Emergency: {HOSPITAL.phoneDisplay}
          </div>
        </footer>

        {/* Mobile sticky Call / WhatsApp / Book bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-line bg-brand-surface sm:hidden">
          <a href={`tel:${HOSPITAL.phoneHref}`} className="flex-1 inline-flex items-center justify-center gap-1 py-3 text-center text-sm font-bold"><PhoneIcon className="h-4 w-4" /> Call</a>
          <a href={HOSPITAL.whatsappHref} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 border-x border-brand-line py-3 text-center text-sm font-bold text-brand-electric"><ChatIcon className="h-4 w-4" /> WhatsApp</a>
          <Link href="/book" className="flex-1 bg-brand-electricdark py-3 text-center text-sm font-bold text-white">Book Appointment</Link>
        </div>
        {/* Spacer so the sticky bar never covers footer content on mobile */}
        <div className="h-12 sm:hidden" />
      </body>
    </html>
  );
}
