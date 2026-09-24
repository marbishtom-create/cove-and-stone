import { Link } from 'wouter';

export const Logo = ({
  className = "",
  variant = "default",
  imageClassName = "",
}: {
  className?: string;
  variant?: "default" | "light" | "dark" | "hero";
  imageClassName?: string;
}) => {
  const imageSource =
    variant === "dark"
      ? "/brand/cove-and-stone-approved-white.png"
      : "/brand/cove-and-stone-approved.png";

  return (
    <Link
      href="/"
      data-testid="site-logo"
      data-logo-variant={variant}
      className={`inline-flex shrink-0 items-center gap-2 group px-2 py-1 rounded-sm bg-transparent transition-colors duration-500 ${variant === "light" ? "bg-brand-ivory/95" : ""} ${className}`}
      aria-label="Cove & Stone Pools, Spas & Outdoor Living home"
    >
      <picture className={`block shrink-0 ${imageClassName || "w-[122px] md:w-[137px]"}`}>
        {variant === "hero" && (
          <source
            media="(min-width: 1024px)"
            srcSet="/brand/cove-and-stone-approved-white.png"
          />
        )}
        <img
          data-testid="site-logo-image"
          src={imageSource}
          alt="Cove & Stone Pools, Spas & Outdoor Living"
          className="block h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-85"
        />
      </picture>
    </Link>
  );
};
