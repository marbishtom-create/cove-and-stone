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
