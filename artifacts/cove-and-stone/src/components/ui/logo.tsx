import { Link } from 'wouter';

export const Logo = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "light" }) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center group ${variant === "light" ? "bg-brand-ivory/95 px-2 py-1 rounded-sm" : ""} ${className}`}
      aria-label="Cove & Stone Pools home"
    >
      <img
        src="/brand/cove-and-stone-approved.png"
        alt="Cove & Stone Pools"
        className="w-[92px] h-auto md:w-[104px] transition-opacity duration-300 group-hover:opacity-85"
      />
    </Link>
  );
};
