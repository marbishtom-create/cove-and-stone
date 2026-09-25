import { Building2, HardHat, FileCheck2, CalendarClock } from 'lucide-react';
import { Link } from 'wouter';

export default function Commercial() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-primary text-primary-foreground py-24 md:py-32 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Commercial Division</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Commercial pool & outdoor environment design
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Planning pool and outdoor environments with developers, HOAs and architects across Northeast Florida.
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
               <h2 className="text-3xl font-serif text-primary mb-6">Shared amenities, planned with clarity.</h2>
              <div className="space-y-6 text-muted-foreground mb-12">
                <p>
                   Commercial pools and outdoor environments involve engineering, plumbing, public-health and permitting requirements that depend on the property, scope and jurisdiction. Those coordination requirements can be reviewed alongside the visual direction for the amenity.
                </p>
                <p>
                  Our in-house GC and construction structure, Urban Green Energy, LLC, supports project coordination and delivery. Regulated pool work is aligned with the appropriately licensed pool contractor or qualifier for the applicable scope.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <FileCheck2 className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                     <h4 className="font-bold text-primary mb-1">Code and permitting coordination</h4>
                     <p className="text-sm text-muted-foreground">Florida Department of Health, engineering and permitting requirements are reviewed with the appropriate project participants and regulated professionals as applicable.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <HardHat className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1">Scope coordination</h4>
                   <p className="text-sm text-muted-foreground">Pool, hardscape, shade structures and related outdoor environments can be organized around one project scope, with regulated work aligned appropriately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Building2 className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                     <h4 className="font-bold text-primary mb-1">Amenity planning</h4>
                     <p className="text-sm text-muted-foreground">Potential scope may include pools, splash pads, clubhouses, hardscaping and connected outdoor areas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CalendarClock className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                     <h4 className="font-bold text-primary mb-1">Project phases</h4>
                     <p className="text-sm text-muted-foreground">Scope, design, engineering and permitting milestones are reviewed as the project develops.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-serif text-primary mb-6">Discuss a Development</h3>
              <p className="text-muted-foreground mb-8">
                Provide us with your civil drawings or preliminary plans for a comprehensive review and proposal.
              </p>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Company / Developer Name" className="w-full p-4 bg-background border border-border" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full p-4 bg-background border border-border" />
                </div>
                <div>
                  <input type="text" placeholder="Project Location" className="w-full p-4 bg-background border border-border" />
                </div>
                <div>
                  <textarea placeholder="Project Scope (e.g., 5,000 sq ft community pool)" className="w-full p-4 bg-background border border-border h-32"></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-colors">
                  Submit RFP Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <nav aria-label="Commercial project information" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/contact/" className="text-primary hover:text-secondary transition-colors">Discuss a development</Link>
            <Link href="/about/" className="text-primary hover:text-secondary transition-colors">About Cove & Stone</Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
