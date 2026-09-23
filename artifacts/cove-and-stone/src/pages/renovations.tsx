import { Wrench, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { Link } from 'wouter';
import { BeforeAfter } from '@/components/ui/before-after';
import beforeImg from '@assets/generated_images/matched-before-pool.jpg';
import afterImg from '@assets/generated_images/after-pool.jpg';

export default function Renovations() {
  return (
    <div className="w-full pt-24 lg:pt-20">
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
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Is your pool ready for a revival?</h2>
          <Link 
            href="/contact" 
            className="inline-block mt-8 bg-secondary text-secondary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
          >
            Request an Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
