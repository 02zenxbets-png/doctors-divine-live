/**
 * Doctors Divine ka apna logo — hospital ki photo me lagi signage se
 * prerit, par poori tarah naya design (unki artwork ki copy nahi).
 * Soch: signage jaisa orange ring + site ke red me ek bold "D", jiske
 * bowl me cross negative space me kata hai (upar chipkaya nahi) —
 * isliye chhote size par bhi saaf dikhta hai.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
      <path
        fill="#b91c1c"
        fillRule="evenodd"
        d="M15 12h7a12 12 0 0 1 0 24h-7Z M23.25 17.5h3.5v5h5v3.5h-5v5h-3.5v-5h-5v-3.5h5Z"
      />
    </svg>
  );
}
