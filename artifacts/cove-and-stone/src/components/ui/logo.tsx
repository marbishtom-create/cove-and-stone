import { Link } from 'wouter';

export const Logo = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "light" }) => {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2 group px-2 py-1 rounded-sm bg-transparent transition-colors duration-500 ${variant === "light" ? "bg-brand-ivory/95" : ""} ${className}`}
      aria-label="Cove & Stone Pools home"
    >
      <img
        src="/brand/cove-and-stone-monogram.png"
        alt=""
        aria-hidden="true"
        className="h-8 w-auto object-contain md:h-9 transition-opacity duration-300 group-hover:opacity-85"
      />
      <img
        src="/brand/cove-and-stone-wordmark-exact.png"
        alt="Cove & Stone Pools"
        className="w-[92px] h-auto object-contain md:w-[104px] transition-opacity duration-300 group-hover:opacity-85"
      />
    </Link>
  );
};
