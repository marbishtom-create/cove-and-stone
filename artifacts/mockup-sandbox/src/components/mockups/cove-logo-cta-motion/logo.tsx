import './logo-motion.css';

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
      ? "/__mockup/images/cove-and-stone-approved-white.png"
      : "/__mockup/images/cove-and-stone-approved.png";

  return (
    <a
      href="/"
      data-testid="site-logo"
      data-logo-variant={variant}
      className={`inline-flex shrink-0 items-center gap-2 group px-2 py-1 rounded-sm bg-transparent transition-colors duration-500 ${variant === "light" ? "bg-brand-ivory/95" : ""} ${className}`}
      aria-label="Cove & Stone Pools, Spas & Outdoor Living home"
    >
      <picture
        data-logo-water-motion={variant === "dark" ? undefined : "active"}
        className={`logo-picture relative block shrink-0 ${imageClassName || "w-[159px] md:w-[178px]"}`}
      >
        {variant === "hero" && (
          <source
            media="(min-width: 1024px)"
            srcSet="/__mockup/images/cove-and-stone-approved-white.png"
          />
        )}
        <img
          data-testid="site-logo-image"
          src={imageSource}
          alt="Cove & Stone Pools, Spas & Outdoor Living"
          className="relative z-0 block h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-85"
        />
      </picture>
    </a>
  );
};
