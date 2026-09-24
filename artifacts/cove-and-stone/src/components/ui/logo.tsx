import { Link } from 'wouter';

export const Logo = ({
  className = "",
  variant = "default",
  imageClassName = "",
}: {
  className?: string;
  variant?: "default" | "light";
  imageClassName?: string;
}) => {
  return (
    <Link
      href="/"
      data-testid="site-logo"
      data-logo-variant={variant}
      className={`inline-flex shrink-0 items-center gap-2 group px-2 py-1 rounded-sm bg-transparent transition-colors duration-500 ${variant === "light" ? "bg-brand-ivory/95" : ""} ${className}`}
      aria-label="Cove & Stone Pools, Spas & Outdoor Living home"
    >
      <img
        data-testid="site-logo-image"
        src="/brand/cove-and-stone-approved.png"
        alt="Cove & Stone Pools, Spas & Outdoor Living"
        className={`block w-[92px] h-auto object-contain md:w-[104px] transition-opacity duration-300 group-hover:opacity-85 ${imageClassName}`}
      />
    </Link>
  );
};
