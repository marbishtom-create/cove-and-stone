import { Wrench, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { Link } from 'wouter';
import { BeforeAfter } from '@/components/ui/before-after';
import beforeImg from '@assets/generated_images/matched-before-pool.jpg';
import afterImg from '@assets/generated_images/after-pool.jpg';

export default function Renovations() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-card py-20 md:py-32 border-b border-border text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Pool Renovations & Corrections</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary leading-tight">
            Resurrecting outdated pools <br className="hidden md:block"/> into modern architecture.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether repairing structural failures or undertaking a complete aesthetic transformation, we bring older pools up to contemporary luxury standards.
          </p>
        </div>
      </header>

      {/* Interactive transformation */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="shadow-2xl">
            {beforeImg && afterImg && (
              <BeforeAfter 
                beforeImage={beforeImg} 
                afterImage={afterImg} 
                beforeAlt="Illustrative unfinished yard at the same property"
                afterAlt="Concept visualization for a modern geometric renovation"
              />
            )}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Illustrative same-property transformation · drag to explore the design direction</p>
          </div>
        </div>
      </section>

      {/* Types of renovations */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            
            <div className="flex flex-col gap-4">
              <RefreshCw className="w-10 h-10 text-secondary mb-2" />
              <h3 className="text-2xl font-serif text-primary">Aesthetic Overhauls</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transform outdated curves into clean modern lines. We can add zero-edge features, build sun shelves, change the pool's footprint, and replace aging tiles and decking with premium stone and glass finishes.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <ShieldAlert className="w-10 h-10 text-secondary mb-2" />
              <h3 className="text-2xl font-serif text-primary">Structural Corrections</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fixing major issues left by time or previous contractors. We handle crack repair, beam replacements, sinking decks, and structural reinforcement to ensure your pool is sound for decades to come.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Zap className="w-10 h-10 text-secondary mb-2" />
              <h3 className="text-2xl font-serif text-primary">Equipment & Automation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upgrade to energy-efficient variable speed pumps, advanced heating, ozone/UV sanitation systems, and complete smartphone automation for effortless control.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Wrench className="w-10 h-10 text-secondary mb-2" />
              <h3 className="text-2xl font-serif text-primary">Plaster & Surface Renewal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Strip away chalky, rough plaster and apply premium quartz or pebble finishes that dramatically alter the water color to our signature muted aqua tones.
              </p>
            </div>

          </div>

          <nav aria-label="Continue exploring pool renovation and outdoor-living services" className="mt-16 pt-8 border-t border-border">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue exploring</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/pools/" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
              <Link href="/outdoor-living/" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
              <Link href="/design/" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
              <Link href="/showroom/" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
              <Link href="/financing/" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
              <Link href="/projects/" className="text-primary hover:text-secondary transition-colors">View projects</Link>
              <Link href="/contact/" className="text-primary hover:text-secondary transition-colors">Request an assessment</Link>
            </div>
          </nav>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">A considered transformation</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the next chapter.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Every renovation begins with the existing pool, the architecture around it and the way you want the space to work. These are the practical questions that help define the direction.
            </p>
          </div>
          <div className="border-t border-border">
            {[
              {
                question: "When is it time to consider a pool renovation?",
                answer: "Renovation can be considered when a pool has aging surfaces, damaged tile or coping, outdated equipment, structural concerns, or a layout that no longer suits the home or the way the space is used.",
              },
              {
                question: "What is the difference between resurfacing and a complete remodel?",
                answer: "Resurfacing renews the pool's interior finish. A broader remodel can coordinate surface work with tile, coping, decking, equipment, structural corrections, layout changes and additional water or outdoor-living features.",
              },
              {
                question: "Can a renovation add a spa, sun shelf or water feature?",
                answer: "A renovation concept may include a raised or integrated spa, sun shelf, zero-edge element, waterfall, sheer descent, bubbler or fire-and-water feature when the property and existing structure support the design.",
              },
              {
                question: "Can you update the pool's coping, tile and decking?",
                answer: "Yes. Aging tile, coping and decking can be reviewed as part of the renovation scope, with material selections such as glass tile, porcelain, marble, travertine, natural stone and other premium finishes.",
              },
              {
                question: "Can pool equipment and automation be upgraded?",
                answer: "Equipment planning can include variable-speed pumps, heating, ozone or UV sanitation systems, lighting and smartphone automation when those upgrades fit the existing system and renovation goals.",
              },
              {
                question: "Can I see a 3D redesign before renovation work begins?",
                answer: "The design studio can develop a photorealistic 3D visualization to review the proposed layout, materials and relationship to the home before construction begins.",
              },
              {
                question: "Can I select renovation materials at the Jacksonville showroom?",
                answer: "Yes. The Jacksonville design studio and showroom provides a place to review pool finishes, waterline tile, stone, pavers, coping, outdoor kitchens, fire and water features, and lighting.",
              },
              {
                question: "Does Cove & Stone coordinate renovation engineering and permitting?",
                answer: "Engineering coordination and permitting requirements are reviewed during project planning. Specific requirements depend on the existing pool, renovation scope, property and applicable local jurisdiction.",
              },
              {
                question: "Are financing options available for pool remodeling?",
                answer: "Financing options may be available through current lender programs and financing partners. Availability is subject to credit approval, lender terms and program requirements; Cove & Stone does not guarantee approval, rates, payments or loan terms.",
              },
            ].map(({ question, answer }) => (
              <details key={question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-serif text-primary marker:hidden">
                  {question}
                  <span className="text-secondary text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-6 pr-10 text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Is your pool ready for a revival?</h2>
          <Link 
            href="/contact/" 
            className="inline-block mt-8 bg-secondary text-secondary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
          >
            Request an Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
