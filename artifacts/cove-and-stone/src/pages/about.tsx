import { Shield } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';

export default function About() {
  return (
    <div className="w-full pt-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl py-24">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-primary">The House of Cove & Stone</h1>
          <div className="w-24 h-px bg-secondary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground leading-relaxed italic font-serif">
            "A pool should not be an afterthought placed in a yard. It should be the architectural anchor of the exterior environment."
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-serif prose-headings:text-primary prose-p:leading-relaxed">
          <p>
            Cove & Stone was founded on a simple premise: Northeast Florida deserves better outdoor living. For too long, the local market has been dominated by volume builders offering identical, uninspired shapes with basic materials.
          </p>
          <p>
            We are a boutique design-build firm. We accept a limited number of commissions each year to ensure that every project receives the obsessive attention to detail it requires. From the first 3D render to the final polishing of the glass tile, our team is relentlessly focused on quality.
          </p>

          <h3 className="text-2xl mt-12 mb-6">The Design-Build Advantage</h3>
          <p>
            The traditional model forces homeowners to act as intermediaries between a pool contractor, a landscaper, a hardscaper, and an outdoor kitchen vendor. This results in disjointed designs and chaotic schedules.
          </p>
          <p>
            Cove & Stone handles the entire exterior environment. We design it cohesively, and we build it cohesively.
          </p>

          <div className="my-12 p-8 bg-card border border-border flex items-start gap-6 not-prose">
            <Shield className="w-12 h-12 text-secondary shrink-0" />
            <div>
              <h4 className="text-xl font-serif text-primary mb-2">Licensed & Insured</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Construction operations are backed by our in-house General Contractor, Urban Green Energy LLC. This allows us to handle complex structural work, cabanas, and extensive hardscaping legally and safely, far beyond the scope of a standard pool license.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl mt-12 mb-6">Our Footprint</h3>
          <p>
            Our showroom is located in Jacksonville, but our canvas is the entire coastal region. We primarily serve the luxury residential markets of:
          </p>
          <ul className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {THEME_CONFIG.locations.map(loc => (
              <li key={loc.slug} className="text-primary font-medium border-l-2 border-secondary pl-3 py-1 bg-card">
                {loc.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
