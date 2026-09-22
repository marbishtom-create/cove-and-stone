import { Link } from 'wouter';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      {/* Tall oval emblem: Abstract limestone & aqua water */}
      <div className="relative w-8 h-12 rounded-full overflow-hidden border border-primary/20 shrink-0 group-hover:border-secondary transition-colors duration-500">
        <div className="absolute inset-0 bg-muted transform origin-bottom skew-y-12"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-secondary/80 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border border-primary/10"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-xl md:text-2xl font-medium tracking-wide text-primary leading-none uppercase">
          Cove & Stone
        </span>
        <span className="font-sans text-[0.6rem] md:text-xs tracking-[0.2em] text-muted-foreground mt-1 uppercase">
          Pools • Spas • Outdoor Living
        </span>
      </div>
    </Link>
  );
};
