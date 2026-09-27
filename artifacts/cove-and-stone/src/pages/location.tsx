import { useParams, Link } from 'wouter';
import { MapPin, ArrowRight } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';
import { getRouteSeo } from '@/config/seo-routes';
import { LOCATION_PAGE_CONTENT } from '@/config/location-content';
import { trackEvent } from '@/lib/analytics';
import heroImg from '@assets/generated_images/hero-pool.jpg';
import NotFound from '@/pages/not-found';

const SERVICE_LINKS = [
  { label: 'Custom pools & spas', href: '/pools/' },
  { label: 'Pool renovations', href: '/renovations/' },
  { label: 'Outdoor living', href: '/outdoor-living/' },
  { label: 'Backyard design', href: '/design/' },
  { label: 'View projects', href: '/projects/' },
  { label: 'Visit the showroom', href: '/showroom/' },
];

export default function LocationPage() {
  const { slug } = useParams();
  const locationInfo = THEME_CONFIG.locations.find((location) => location.slug === slug);

  if (!locationInfo) {
    return <NotFound />;
  }

  const content = LOCATION_PAGE_CONTENT[locationInfo.slug];
  if (!content) {
    return <NotFound />;
  }

  const seo = getRouteSeo(`/locations/${locationInfo.slug}/`);

  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="relative flex min-h-[400px] items-center bg-primary py-20">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Design visualization of a modern pool and outdoor-living environment"
            className="h-full w-full object-cover opacity-40 grayscale-[30%]"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl px-6 text-center text-white">
          <MapPin className="mx-auto mb-6 h-12 w-12 text-secondary" aria-hidden="true" />
          <h1 className="mx-auto mb-6 max-w-5xl font-serif text-4xl leading-tight drop-shadow-lg md:text-6xl">
            {content.h1}
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-light text-white/90 drop-shadow-md">
            {content.hero}
          </p>
        </div>
      </header>

      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <article
            aria-labelledby={`location-intro-${locationInfo.slug}`}
            className="mx-auto mb-14 max-w-4xl"
          >
            <h2
              id={`location-intro-${locationInfo.slug}`}
              className="mb-8 text-center font-serif text-3xl text-primary md:text-5xl"
            >
              {content.introHeading}
            </h2>
            <div className="space-y-6 text-left text-lg leading-relaxed text-muted-foreground">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-4">
            {content.cards.map((card) => (
              <article key={card.title} className="border border-border bg-card p-7 md:p-8">
                <h3 className="mb-4 font-serif text-xl text-primary">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </article>
            ))}
          </div>

          <section
            aria-labelledby={`location-planning-${locationInfo.slug}`}
            className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-12 lg:grid-cols-2 lg:gap-12"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-secondary">
                Planning for {locationInfo.name}
              </p>
              <h2
                id={`location-planning-${locationInfo.slug}`}
                className="mb-5 font-serif text-2xl text-primary md:text-3xl"
              >
                {content.planningHeading}
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{content.planningText}</p>
              <ul className="space-y-3 text-muted-foreground">
                {content.planningItems.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {content.localReference && (
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {content.localReference.context}{' '}
                  <a
                    href={content.localReference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline decoration-border underline-offset-4 transition-colors hover:text-secondary"
                  >
                    {content.localReference.label}
                  </a>
                </p>
              )}
            </div>

            <aside className="border border-border bg-card p-7 md:p-8">
              <h2 className="mb-5 font-serif text-2xl text-primary">
                Review the complete design before construction.
              </h2>
              <p className="mb-5 leading-relaxed text-muted-foreground">
                A photorealistic 3D visualization can bring pool geometry, materials, circulation and
                outdoor rooms into one view. Engineering, permitting and construction requirements
                are confirmed for the specific property and jurisdiction; regulated pool work is
                coordinated with the appropriately licensed contractor or qualifier.
              </p>
              <p className="mb-7 leading-relaxed text-muted-foreground">
                Material selections can be reviewed at the Cove &amp; Stone Design Studio &amp;
                Showroom, 7662 Philips Hwy, Unit 32, Jacksonville, FL 32256.
              </p>
              <Link
                href={`/appointments/?location=${locationInfo.slug}`}
                onClick={() =>
                  trackEvent('appointment_cta_clicked', {
                    source: 'service_area_page',
                    location: locationInfo.slug,
                    placement: 'primary_cta',
                  })
                }
                className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-secondary"
              >
                Start a {locationInfo.name} consultation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </aside>
          </section>

          <nav
            aria-label={`Related pool and outdoor-living services for ${locationInfo.name}`}
            className="mt-16 border-t border-border pt-8"
          >
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Explore services
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/appointments/?location=${locationInfo.slug}`}
                onClick={() =>
                  trackEvent('appointment_cta_clicked', {
                    source: 'service_area_page',
                    location: locationInfo.slug,
                    placement: 'service_navigation',
                  })
                }
                className="text-primary transition-colors hover:text-secondary"
              >
                Start a consultation
              </Link>
            </div>
          </nav>

          {content.relatedLocations.length > 0 && (
            <nav
              aria-label={`Nearby Cove & Stone service areas related to ${locationInfo.name}`}
              className="mt-10 border-t border-border pt-8"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Nearby service areas
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {content.relatedLocations.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {content.relatedProjects && content.relatedProjects.length > 0 && (
            <nav
              aria-label={`Related Cove & Stone project examples for ${locationInfo.name}`}
              className="mt-10 border-t border-border pt-8"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Project examples
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {content.relatedProjects.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </section>

      {seo.faqs && seo.faqs.length > 0 && (
        <section
          aria-labelledby={`location-faq-heading-${locationInfo.slug}`}
          className="border-t border-border bg-card py-20 md:py-24"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="mb-10">
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-secondary">
                {locationInfo.name}, considered
              </p>
              <h2
                id={`location-faq-heading-${locationInfo.slug}`}
                className="mb-5 font-serif text-3xl text-primary md:text-5xl"
              >
                Questions about pool design in {locationInfo.name}
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                Answers depend on the property, project scope and applicable local review. Use these
                questions to prepare for a site-specific conversation.
              </p>
            </div>
            <div className="border-t border-border">
              {seo.faqs.map(({ question, answer }) => (
                <details key={question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-serif text-lg text-primary marker:hidden">
                    {question}
                    <span
                      className="text-2xl font-light text-secondary transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-muted-foreground">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}