import { Link } from 'wouter';

export const Logo = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "light" }) => {
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`} aria-label="Cove & Stone Pools home">
      <img
        src={variant === "light" ? "/brand/cove-and-stone-wordmark-light.svg" : "/brand/cove-and-stone-wordmark.svg"}
        alt="Cove & Stone Pools"
        className="w-[196px] h-auto md:w-[232px] transition-opacity duration-300 group-hover:opacity-85"
      />
    </Link>
  );
};
