import Link from "next/link";

export function BackArrow({
  href,
  label = "પાછળ",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-b from-[#f24c4c] to-[#d92b2b] border-b-[3px] border-[#9b1c1c] text-white hover:brightness-110 active:translate-y-[1.5px] active:border-b-[1.5px] active:shadow-none transition-all duration-75 cursor-pointer shadow-[0_3px_8px_rgba(239,68,68,0.15)] shrink-0"
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4.5 w-4.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
      >
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </Link>
  );
}
