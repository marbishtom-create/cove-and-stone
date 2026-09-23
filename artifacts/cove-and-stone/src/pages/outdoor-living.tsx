import { Flame, Trees, ChefHat, Sofa } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673.png';
import projectImage from '@assets/0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673.png';

export default function OutdoorLiving() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="relative h-[60dvh] min-h-[500px] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Concept visualization of a dramatic Jacksonville outdoor living environment with fire and water features" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 right-6 border border-border bg-background/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            Concept visualization
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-foreground pt-32">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Complete Backyards</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-primary">
            Rooms without walls.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
            Expand your home's footprint. We design and build seamless outdoor environments featuring custom kitchens, architectural pergolas, fire features, and elite hardscaping.
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <ChefHat className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Summer Kitchens</h3>
              <p className="text-muted-foreground">
                Professional-grade outdoor culinary spaces with built-in grills, smokers, refrigeration, and weatherproof luxury cabinetry designed to withstand coastal weather.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Sofa className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Cabanas & Pergolas</h3>
              <p className="text-muted-foreground">
                Architectural shade structures ranging from automated louvered pergolas to fully roofed custom cabanas with integrated lighting, audio, and climate control.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Flame className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Fire & Ambiance</h3>
              <p className="text-muted-foreground">
                Custom linear fire pits, architectural fire bowls, and integrated landscape lighting that transforms the environment when the sun goes down.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Trees className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Hardscape & Turf</h3>
              <p className="text-muted-foreground">
                 Flawless installations of porcelain, travertine, marble, natural stone and concrete pavers, contrasted with artificial turf, turf between oversized pavers and putting-green or lifestyle-turf applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary">The cohesive approach.</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  A great backyard is not a collection of disparate parts. It is a single, cohesive design where the pool, the kitchen, the seating areas, and the landscaping speak the same visual language.
                </p>
                <p>
                  As a true design-build firm, we manage every element of the exterior. You have one designer, one project manager, and one vision from the front gate to the back fence.
                </p>
              </div>
              <Link 
                href="/projects" 
                className="inline-block mt-10 border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-secondary hover:border-secondary transition-colors"
              >
                View our complete environments
              </Link>
            </div>
            <div className="relative aspect-square">
              <img 
                src={projectImage} 
                alt="Concept visualization of a cohesive resort backyard"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 border border-white/30 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                Concept visualization
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
