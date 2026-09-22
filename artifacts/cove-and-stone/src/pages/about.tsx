import { ArrowRight, Shield, Users, ClipboardCheck, HardHat } from 'lucide-react';
import { Link } from 'wouter';
import { THEME_CONFIG } from '@/config/theme';
import brandBoard from '@assets/B0C8B75A-36FB-47AE-A56D-4FE4ABFA6B52_1790116656470.png';

export default function About() {
  return (
    <div className="w-full pt-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl py-24">
        
        <div className="text-center mb-20">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">About Cove & Stone</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Jacksonville Outdoor Living, Reimagined.</h1>
          <div className="w-24 h-px bg-secondary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground leading-relaxed italic font-serif">
            "A pool should not be an afterthought placed in a yard. It should be the architectural anchor of the exterior environment."
          </p>
        </div>

        <figure className="mb-20 bg-primary p-3 md:p-5 shadow-2xl">
          <img
            src={brandBoard}
            alt="Cove & Stone brand direction board showing modern pools, water, fire, stone and outdoor living"
            className="w-full h-auto"
          />
          <figcaption className="px-3 pt-4 pb-1 text-center text-[10px] uppercase tracking-[0.25em] text-white/60">
            Brand direction · water, fire, stone, living
          </figcaption>
        </figure>

        <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-serif prose-headings:text-primary prose-p:leading-relaxed">
          <p>
            Cove & Stone was founded on a simple premise: Northeast Florida deserves better outdoor living. For too long, the local market has been dominated by volume builders offering identical, uninspired shapes with basic materials.
          </p>
          <p>
            Cove & Stone is a Jacksonville design-build house for modern custom pools and complete outdoor environments. We bring the planning, design, material decisions and construction coordination into one clear experience for homeowners across Northeast Florida.
          </p>

          <h3 className="text-2xl mt-12 mb-6">The Design-Build Advantage</h3>
          <p>
            The traditional model forces homeowners to act as intermediaries between a pool contractor, a landscaper, a hardscaper, and an outdoor kitchen vendor. This results in disjointed designs and chaotic schedules.
          </p>
          <p>
            Cove & Stone handles the entire exterior environment. We design it cohesively, price it as one coordinated proposal and manage the path through engineering, permitting and construction coordination as applicable.
          </p>

          <div className="my-12 p-8 bg-card border border-border flex items-start gap-6 not-prose">
            <Shield className="w-12 h-12 text-secondary shrink-0" />
            <div>
              <h4 className="text-xl font-serif text-primary mb-2">Construction support & coordination</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our in-house GC and construction structure, Urban Green Energy, LLC, supports construction coordination across the complete outdoor environment. Regulated pool work is coordinated with the appropriately licensed pool contractor or qualifier for the applicable scope.
              </p>
            </div>
          </div>

          <div className="not-prose mt-16">
            <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">The people behind the process</span>
            <h3 className="text-3xl md:text-4xl font-serif text-primary mb-8">A team organized around trust, clarity and execution.</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-8">
                <Users className="w-9 h-9 text-secondary mb-6" />
                <h4 className="text-xl font-serif text-primary mb-3">Design team</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Translates your address, photos, inspiration and priorities into a complete outdoor concept and photorealistic visualization.</p>
              </div>
              <div className="bg-card border border-border p-8">
                <ClipboardCheck className="w-9 h-9 text-secondary mb-6" />
                <h4 className="text-xl font-serif text-primary mb-3">Project management</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Keeps selections, proposal scope, engineering, permitting and construction communication aligned from phase to phase.</p>
              </div>
              <div className="bg-card border border-border p-8">
                <HardHat className="w-9 h-9 text-secondary mb-6" />
                <h4 className="text-xl font-serif text-primary mb-3">Construction support</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Urban Green Energy, LLC supports the in-house GC and construction structure. Regulated pool work is coordinated with the appropriately licensed pool contractor or qualifier for the applicable scope.</p>
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 mt-8 text-xs uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors">
              Meet us around your project <ArrowRight size={14} />
            </Link>
          </div>
          
          <h3 className="text-2xl mt-12 mb-6">Our Footprint</h3>
          <p>
            Our showroom is located in Jacksonville, but our canvas is Northeast Florida. We serve homeowners across the following communities and surrounding areas:
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
