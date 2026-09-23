import { ArrowRight, Box, Ruler, CheckCircle2, Droplet, Layers } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673.png';
import projectImage from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673.png';

export default function Pools() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      {/* Hero */}
      <header className="relative h-[60dvh] min-h-[500px] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Concept visualization of a modern Jacksonville waterfront pool" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          <div className="absolute bottom-6 right-6 border border-white/30 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
            Concept visualization
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-white">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">Custom Concrete Pools</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Water, sculpted to <br/>your lifestyle.
          </h1>
          <p className="text-lg text-white/80 max-w-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            From vanishing edges that blend into the horizon to geometric modern centerpieces, we engineer and construct exceptional bodies of water.
          </p>
        </div>
      </header>

      {/* Philosophy */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square relative">
              <img 
                src={projectImage} 
                alt="Concept visualization of a minimalist coastal pool detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 border border-white/30 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                Concept visualization
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-card border border-border p-8 flex flex-col justify-center hidden md:flex">
                <Droplet className="text-secondary w-8 h-8 mb-4" />
                <h4 className="font-serif text-xl mb-2">Purity of Form</h4>
                <p className="text-sm text-muted-foreground">Every angle, depth, and finish is calculated for aesthetic impact and hydraulic efficiency.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary">Uncompromising Construction.</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                   A Cove & Stone pool is built differently. We combine architectural design, thoughtful engineering coordination and premium materials such as porcelain, marble, natural stone and glass tile to create a pool that belongs to the home.
                </p>
                <p>
                  We don't build cookie-cutter shapes. Every pool is a custom architectural response to your home's geometry and your family's needs.
                </p>
              </div>

              <ul className="mt-10 space-y-4">
                {[
                  "Modern geometric pool construction",
                  "Infinity-edge, zero-edge and perimeter-overflow concepts",
                  "Raised spas and integrated sun shelves",
                  "Waterfalls, sheer descents, bubblers and fire-water features",
                  "Pool lighting, equipment upgrades and automation",
                  "Porcelain, marble, travertine and premium interior finishes"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary font-medium">
                    <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-16 text-primary">Signature Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-background p-10 border border-border hover:border-secondary transition-colors group">
              <Box className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-serif mb-4 text-primary">Geometric Modernism</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Clean lines, perfect 90-degree angles, and minimalist aesthetics. For clients who appreciate architectural rigor.
              </p>
            </div>
            <div className="bg-background p-10 border border-border hover:border-secondary transition-colors group">
              <Layers className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-serif mb-4 text-primary">Material Integration</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Seamless transitions from indoor flooring to outdoor decking using color-matched or identical luxury stones.
              </p>
            </div>
            <div className="bg-background p-10 border border-border hover:border-secondary transition-colors group">
              <Ruler className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-serif mb-4 text-primary">Custom Depths</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Expansive sun shelves for lounging, deep ends for diving, or uniform depths for sports—tailored exactly to how you swim.
              </p>
            </div>
          </div>

          <nav aria-label="Continue exploring pool and outdoor-living services" className="mt-16 pt-8 border-t border-border">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue exploring</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/design" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
              <Link href="/outdoor-living" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
              <Link href="/renovations" className="text-primary hover:text-secondary transition-colors">Pool renovations</Link>
              <Link href="/showroom" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
              <Link href="/financing" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
              <Link href="/projects" className="text-primary hover:text-secondary transition-colors">View projects</Link>
              <Link href="/contact" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
            </div>
          </nav>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">The details, considered</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the first line is drawn.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              A custom pool is shaped by the property, the architecture and the way you want to live outside. These are some of the practical questions we review together.
            </p>
          </div>
          <div className="border-t border-border">
            {[
              {
                question: "How does Cove & Stone approach custom pool design?",
                answer: "Each pool is developed as a custom architectural response to the home's geometry, the property and the way the space will be used. The design process coordinates the pool, surrounding materials and outdoor-living elements into one clear direction.",
              },
              {
                question: "Can a spa be integrated with a custom pool?",
                answer: "Yes. A pool concept can include an integrated or raised spa, sun shelves and other connected water elements when they fit the property and the overall design.",
              },
              {
                question: "What pool features can be included in a design?",
                answer: "Depending on the property and design direction, features may include infinity-edge, zero-edge or perimeter-overflow concepts, waterfalls, sheer descents, bubblers, fire-and-water features, lighting, equipment upgrades and automation.",
              },
              {
                question: "How are pool finishes and materials selected?",
                answer: "Selections are coordinated around the architecture and palette of the home. Options can include porcelain, marble, travertine, natural stone, glass tile and other premium interior, coping and decking finishes.",
              },
              {
                question: "Can I review a 3D visualization of my pool concept?",
                answer: "The design studio can develop a photorealistic 3D visualization so the layout, materials and relationship to the home can be reviewed before construction begins.",
              },
              {
                question: "Can I review pool materials at the Jacksonville showroom?",
                answer: "Yes. The Jacksonville design studio and showroom provides a place to review pool finishes, waterline tile, stone, pavers, coping, outdoor kitchens, fire and water features, and lighting.",
              },
              {
                question: "Does Cove & Stone coordinate engineering and permitting?",
                answer: "Engineering coordination and permitting requirements are reviewed as part of project planning. Specific requirements depend on the property, scope and applicable local jurisdiction.",
              },
              {
                question: "Are financing options available for a custom pool?",
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

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to break ground?</h2>
          <p className="text-lg text-white/70 mb-10 font-light">
            Schedule a consultation to discuss your vision and learn how we translate concepts into concrete.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
          >
            Start The Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
