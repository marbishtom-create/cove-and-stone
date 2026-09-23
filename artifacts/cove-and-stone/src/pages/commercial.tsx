import { Building2, HardHat, FileCheck2, CalendarClock } from 'lucide-react';
import { Link } from 'wouter';

export default function Commercial() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-primary text-primary-foreground py-24 md:py-32 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Commercial Division</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Amenity centers that <br className="hidden md:block" />define the development.
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Partnering with developers, HOAs, and architects to construct commercial aquatics facilities across Northeast Florida.
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-6">Built for volume, designed for luxury.</h2>
              <div className="space-y-6 text-muted-foreground mb-12">
                <p>
                  Commercial pools require a fundamentally different approach to engineering, plumbing, and health department compliance. Our commercial division brings the aesthetic sensibility of our luxury residential work to large-scale community amenities.
                </p>
                <p>
                  Our in-house GC and construction structure, Urban Green Energy, LLC, supports project coordination and delivery. Regulated pool work is aligned with the appropriately licensed pool contractor or qualifier for the applicable scope.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <FileCheck2 className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1">DOH Compliance</h4>
                    <p className="text-sm text-muted-foreground">Expert navigation of Florida Department of Health codes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <HardHat className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                  <h4 className="font-bold text-primary mb-1">Construction support</h4>
                  <p className="text-sm text-muted-foreground">In-house GC coordination for complete outdoor environments, with regulated scopes aligned appropriately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Building2 className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1">Turnkey Amenity</h4>
                    <p className="text-sm text-muted-foreground">Pools, splash pads, clubhouses, and hardscaping.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CalendarClock className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary mb-1">Schedule Strict</h4>
                    <p className="text-sm text-muted-foreground">Reliable execution to align with your sales phases.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-serif text-primary mb-6">Discuss a Development</h3>
              <p className="text-muted-foreground mb-8">
                Provide us with your civil drawings or conceptual plans for a comprehensive review and proposal.
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
    </div>
  );
}
