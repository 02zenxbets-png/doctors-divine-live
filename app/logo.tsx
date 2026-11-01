/**
 * Doctors Divine ka apna logo — hospital ki photo me lagi signage se
 * prerit, par poori tarah naya design (unki artwork ki copy nahi).
 * Soch: signage jaisa orange ring + site ke red me "D" + us par
 * safed medical cross. Ek hi mark header, footer aur favicon me.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#f97316" strokeWidth="3" />
      <path d="M17 13h5a11 11 0 0 1 0 22h-5Z" fill="#b91c1c" />
      <rect x="24.25" y="18" width="3.5" height="12" rx="1" fill="#ffffff" />
      <rect x="21" y="22.25" width="10" height="3.5" rx="1" fill="#ffffff" />
    </svg>
  );
}
