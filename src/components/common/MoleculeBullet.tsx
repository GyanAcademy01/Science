/** 🔗 points list આગળ મુકાતું નાનું molecule ચિહ્ન */
export function MoleculeBullet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      className={className}
      aria-hidden
    >
      <line x1="4" y1="14" x2="10" y2="6" stroke="var(--brand-1)" strokeWidth="1.4" />
      <line x1="10" y1="6" x2="16" y2="13" stroke="var(--brand-2)" strokeWidth="1.4" />
      <circle cx="10" cy="6" r="3.2" fill="var(--brand-2)" />
      <circle cx="4" cy="14" r="2.4" fill="var(--brand-1)" />
      <circle cx="16" cy="13" r="2.4" fill="var(--brand-3)" />
    </svg>
  );
}
