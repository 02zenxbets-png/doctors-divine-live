/**
 * Ek hi style ke drawn SVG icons — emoji ki jagah.
 * Sab icons: 24×24 viewBox, stroke currentColor, stroke-width 2,
 * round caps/joins. Rang parent ke text color se aata hai, isliye
 * ye kisi bhi button ya heading ke saath ek jaise dikhte hain.
 */

type IconProps = {
  className?: string;
};

function Base({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Base>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Base>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Base>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="7" r="3" />
    </Base>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Base>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Base>
  );
}

export function BulbIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z" />
      <path d="M9 18h6M10 22h4" />
    </Base>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Base>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Base>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Base>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Base>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </Base>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Base>
  );
}

export function ScissorsIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </Base>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Base>
  );
}

export function FlaskIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M10 2v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2" />
      <path d="M8.5 2h7M7 15h10" />
    </Base>
  );
}

export function CapsuleIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m10.5 20.5-8-8a4.95 4.95 0 0 1 7-7l8 8a4.95 4.95 0 0 1-7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </Base>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </Base>
  );
}

export function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </Base>
  );
}

/** Services ke liye: data.ts me icon key se component chunta hai. */
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "target":
      return <TargetIcon className={className} />;
    case "scissors":
      return <ScissorsIcon className={className} />;
    case "heart":
      return <HeartIcon className={className} />;
    case "alert":
      return <AlertIcon className={className} />;
    case "flask":
      return <FlaskIcon className={className} />;
    case "capsule":
      return <CapsuleIcon className={className} />;
    case "person":
      return <PersonIcon className={className} />;
    case "clipboard":
      return <ClipboardCheckIcon className={className} />;
    default:
      return <HeartIcon className={className} />;
  }
}
