import { Link } from 'wouter';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70dvh] w-full flex items-center justify-center bg-background px-6 py-32">
      <section className="w-full max-w-2xl border border-border bg-card p-10 text-center shadow-sm md:p-16">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-secondary">Cove & Stone Pools</p>
        <h1 className="mb-6 font-serif text-5xl text-primary md:text-7xl">That page is not here.</h1>
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
          The address may be outdated or the page may have moved. Start with our main collection of pool and outdoor-living design services.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-secondary"
        >
          <Home size={16} />
          Return home
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
