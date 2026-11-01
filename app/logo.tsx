/**
 * Doctors Divine's own logo — inspired by the signage in the hospital
 * photo, but a fully original design (not a copy of their artwork).
 * Idea: a cantaloupe-orange ring + a bold "D" in electric blue, with the
 * cross cut into the bowl as negative space (not pasted on top) — so it
 * stays crisp even at small sizes.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#FC734D" strokeWidth="3" />
      <path
        fill="#0287DE"
        fillRule="evenodd"
        d="M15 12h7a12 12 0 0 1 0 24h-7Z M23.25 17.5h3.5v5h5v3.5h-5v5h-3.5v-5h-5v-3.5h5Z"
      />
    </svg>
  );
}
